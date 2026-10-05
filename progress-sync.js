(function(){
  'use strict';
  if(window.__learningProgressSyncStarted) return;
  window.__learningProgressSyncStarted=true;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const status=(text,bad)=>{
    let el=document.getElementById('progressListSyncStatus');
    if(!el){const c=document.querySelector('.controls');if(!c)return;el=document.createElement('div');el.id='progressListSyncStatus';el.style.cssText='text-align:center;margin-top:8px;font-size:12px;font-weight:700;min-height:16px;';c.appendChild(el)}
    el.textContent=text||'';el.style.color=bad?'var(--bad)':'var(--good)';
  };
  async function boot(){
    for(let i=0;i<240;i++){if(document.getElementById('storyList')&&window.supabase&&window.SUPABASE_URL&&window.SUPABASE_ANON_KEY)break;await sleep(50)}
    if(!document.getElementById('storyList')||!window.supabase||!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY){status('Không kết nối được dịch vụ đồng bộ.',true);return}
    const sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    const render=read=>document.querySelectorAll('#storyList .story-item').forEach((item,i)=>{const el=item.querySelector('.story-item-status');if(!el)return;const ok=read.has(String(i+1));el.textContent=ok?'✓ Đã đọc':'○ Chưa đọc';el.classList.toggle('read',ok)});
    async function sync(){
      try{
        const {data:userData,error:userError}=await sb.auth.getUser();
        if(userError)throw userError;
        if(!userData?.user){status('Chưa đăng nhập để đồng bộ.',true);return}
        status('Đang tải tiến độ…');
        const {data,error}=await sb.from('user_story_progress').select('story_id,is_read').eq('is_read',true);
        if(error)throw error;
        const read=new Set((data||[]).map(x=>String(x.story_id)));
        render(read);
        const arr=[...read].map(Number).filter(Number.isFinite);
        localStorage.setItem('docHieuReadV2',JSON.stringify(arr));
        localStorage.setItem('docHieuReadV1',JSON.stringify(arr));
        status(`✓ Đã đồng bộ ${read.size} bài`);
      }catch(e){console.error('Reading progress sync failed:',e);status('Đồng bộ thất bại: '+(e.message||e),true)}
    }
    async function mark(item){
      try{
        const {data:userData}=await sb.auth.getUser();
        if(!userData?.user){status('Chưa đăng nhập để đồng bộ.',true);return}
        const items=[...document.querySelectorAll('#storyList .story-item')];const n=items.indexOf(item)+1;if(!n)return;
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
