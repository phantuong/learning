(function(){
  'use strict';
  if(window.__learningProgressSyncStarted) return;
  window.__learningProgressSyncStarted=true;

  // Keep synchronization running silently; the status indicator is intentionally hidden.
  if(!document.getElementById('hide-progress-sync-status')){
    const style=document.createElement('style');
    style.id='hide-progress-sync-status';
    style.textContent='#progressListSyncStatus{display:none!important}';
    document.head.appendChild(style);
  }

  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  function status(text,bad){
    // Status messages are intentionally not shown in the UI.
    const el=document.getElementById('progressListSyncStatus');
    if(el){el.textContent='';el.setAttribute('aria-hidden','true');}
  }
  async function getClient(){
    for(let i=0;i<240;i++){
      if(window.learningAuth) return window.learningAuth;
      if(window.supabase&&window.SUPABASE_URL&&window.SUPABASE_ANON_KEY){
        return window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      }
      await sleep(50);
    }
    return null;
  }
  async function boot(){
    if(!document.getElementById('storyList')){status('');return;}
    const sb=await getClient();
    if(!sb){status('Không kết nối được dịch vụ đồng bộ.',true);return;}
    async function sync(){
      try{
        const {data:userData,error:userError}=await sb.auth.getUser();
        if(userError)throw userError;
        if(!userData?.user){status('Chưa đăng nhập để đồng bộ.',true);return}
        status('Đang tải tiến độ…');
        const {data,error}=await sb.from('user_story_progress').select('story_id,is_read').eq('is_read',true);
        if(error)throw error;
        const read=new Set((data||[]).map(x=>String(x.story_id)));
        document.querySelectorAll('#storyList .story-item').forEach((item,i)=>{
          const el=item.querySelector('.story-item-status');
          if(!el)return;
          const ok=read.has(String(i+1));
          el.textContent=ok?'✓ Đã đọc':'○ Chưa đọc';
          el.classList.toggle('read',ok);
        });
        const arr=[...read].map(Number).filter(Number.isFinite);
        localStorage.setItem('docHieuReadV2',JSON.stringify(arr));
        localStorage.setItem('docHieuReadV1',JSON.stringify(arr));
        status(`✓ Đã đồng bộ ${read.size} bài`);
      }catch(e){console.error('Reading progress sync failed:',e);status('Đồng bộ thất bại: '+(e.message||e),true)}
    }
    async function mark(item){
      try{
        const {data:userData,error:userError}=await sb.auth.getUser();
        if(userError)throw userError;
        if(!userData?.user){status('Chưa đăng nhập để đồng bộ.',true);return}
        const items=[...document.querySelectorAll('#storyList .story-item')];
        const n=items.indexOf(item)+1;
        if(!n)return;
        status('Đang lưu tiến độ…');
        const {error}=await sb.rpc('mark_story_read',{p_story_id:String(n)});
        if(error)throw error;
        await sync();
      }catch(e){console.error('Reading progress save failed:',e);status('Đồng bộ thất bại: '+(e.message||e),true)}
    }
    document.addEventListener('click',e=>{const item=e.target?.closest?.('#storyList .story-item');if(item)setTimeout(()=>mark(item),100)},true);
    sb.auth.onAuthStateChange(()=>sync());
    await sync();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});
    window.addEventListener('focus',sync);
    setInterval(sync,10000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
