(function(){'use strict';
  if (!document.getElementById('storyList') || !window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return;
  if (window.__docHieuRemoteSync) return;
  window.__docHieuRemoteSync = true;
  const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  let user = null;
  const statusFor = (item, read) => {
    const el = item.querySelector('.story-item-status');
    if (!el) return;
    el.classList.toggle('read', !!read);
    el.textContent = read ? '✓ Đã đọc' : '○ Chưa đọc';
  };
  const sync = async () => {
    try {
      const s = await sb.auth.getSession();
      user = s.data.session && s.data.session.user;
      if (!user) return;
      const {data,error} = await sb.from('user_story_progress').select('story_id,is_read').eq('user_id',user.id).eq('is_read',true);
      if (error) { console.error('Đọc tiến độ từ Supabase thất bại:', error); return; }
      const read = new Set((data||[]).map(x => String(x.story_id)));
      document.querySelectorAll('#storyList .story-item').forEach((item,i)=>statusFor(item, read.has(String(i+1))));
      localStorage.setItem('docHieuReadV1', JSON.stringify([...read].map(Number).filter(Number.isFinite)));
    } catch (e) { console.error('Đồng bộ Đọc hiểu thất bại:', e); }
  };
  const mark = async (item) => {
    try {
      const s = await sb.auth.getSession();
      user = s.data.session && s.data.session.user;
      if (!user) return;
      const n = item ? [...document.querySelectorAll('#storyList .story-item')].indexOf(item) + 1 : 0;
      if (!n) return;
      const {error} = await sb.rpc('mark_story_read',{p_story_id:String(n)});
      if (error) {
        console.error('Lưu tiến độ lên Supabase thất bại:', error);
        return;
      }
      statusFor(item,true);
      sync();
    } catch (e) { console.error('Lưu tiến độ Đọc hiểu thất bại:', e); }
  };
  document.addEventListener('click', e => {
    const item = e.target && e.target.closest ? e.target.closest('#storyList .story-item') : null;
    if (item) setTimeout(() => mark(item), 0);
  }, true);
  sb.auth.onAuthStateChange((_event,session)=>{ user=session&&session.user; if(user) sync(); });
  sync();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});
  window.addEventListener('focus',sync);
  setInterval(sync,30000);
})();
