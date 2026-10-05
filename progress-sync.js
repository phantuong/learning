(function(){
  'use strict';
  if (window.__docHieuRemoteSync) return;
  window.__docHieuRemoteSync = true;

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const setStatus = (text, bad) => {
    const el = document.getElementById('syncStatus');
    if (!el) return;
    el.textContent = text || '';
    el.style.color = bad ? 'var(--bad)' : 'var(--muted)';
  };

  async function boot(){
    // navigation-hardening.js can load this file before the Supabase SDK/config
    // has finished loading. Wait instead of returning permanently.
    for(let i=0;i<200;i++){
      if(document.getElementById('storyList') && window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) break;
      await sleep(50);
    }
    if(!document.getElementById('storyList') || !window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY){
      console.warn('Reading progress sync: Supabase was not ready.');
      setStatus('Không kết nối được dịch vụ đồng bộ.', true);
      return;
    }

    const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });

    const statusFor = (item, read) => {
      const el = item.querySelector('.story-item-status');
      if (!el) return;
      el.classList.toggle('read', !!read);
      el.textContent = read ? '✓ Đã đọc' : '○ Chưa đọc';
    };

    async function getCurrentUser(){
      const {data,error} = await sb.auth.getUser();
      if(error){
        console.error('Reading progress: getUser failed:', error);
        return null;
      }
      return data && data.user ? data.user : null;
    }

    async function sync(){
      try{
        const user = await getCurrentUser();
        if(!user){
          setStatus('Chưa đăng nhập để đồng bộ.', true);
          return;
        }
        setStatus('Đang tải tiến độ…');
        // RLS already restricts rows to auth.uid(). Do not add a client-side
        // user_id filter, which can become stale if the auth session changes.
        const {data,error} = await sb
          .from('user_story_progress')
          .select('story_id,is_read')
          .eq('is_read',true);
        if(error){
          console.error('Reading progress SELECT failed:', error);
          setStatus('Không tải được tiến độ đồng bộ: '+error.message, true);
          return;
        }
        const read = new Set((data||[]).map(x=>String(x.story_id)));
        document.querySelectorAll('#storyList .story-item').forEach((item,i)=>statusFor(item,read.has(String(i+1))));
        localStorage.setItem('docHieuReadV2',JSON.stringify([...read].map(Number).filter(Number.isFinite)));
        localStorage.setItem('docHieuReadV1',JSON.stringify([...read].map(Number).filter(Number.isFinite)));
        setStatus('✓ Đã đồng bộ '+read.size+' bài');
      }catch(e){
        console.error('Reading progress sync failed:',e);
        setStatus('Đồng bộ thất bại: '+(e.message||e),true);
      }
    }

    async function mark(item){
      try{
        const user = await getCurrentUser();
        if(!user){
          setStatus('Chưa đăng nhập để đồng bộ.',true);
          return;
        }
        const items=[...document.querySelectorAll('#storyList .story-item')];
        const n=items.indexOf(item)+1;
        if(!n) return;
        setStatus('Đang đồng bộ…');
        const {error}=await sb.rpc('mark_story_read',{p_story_id:String(n)});
        if(error){
          console.error('Reading progress RPC failed:',error);
          setStatus('Đồng bộ thất bại: '+error.message,true);
          return;
        }
        statusFor(item,true);
        await sync();
      }catch(e){
        console.error('Reading progress mark failed:',e);
        setStatus('Đồng bộ thất bại: '+(e.message||e),true);
      }
    }

    // Capture clicks before the page's own handler so the remote write is
    // independent of the reader implementation.
    document.addEventListener('click',e=>{
      const item=e.target && e.target.closest ? e.target.closest('#storyList .story-item') : null;
      if(item) setTimeout(()=>mark(item),0);
    },true);

    sb.auth.onAuthStateChange((_event,session)=>{
      if(session) sync();
      else setStatus('Chưa đăng nhập để đồng bộ.',true);
    });

    await sync();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});
    window.addEventListener('focus',sync);
    setInterval(sync,30000);
  }

  boot();
})();
