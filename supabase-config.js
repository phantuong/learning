/* Supabase public client configuration. */
window.SUPABASE_URL='https://ksqfcwjcijflvzzopkko.supabase.co';
window.SUPABASE_ANON_KEY='sb_publishable_3WEpXJJe1HEgNJ4mfwmhUw_4jV9pQqg';

// Vocabulary games use the cloud-selected sources and vocabulary entries.
(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='english.html'&&page!=='voca-scramble.html')return;
  if(window.__vocabularyGamesBridgeLoader)return;
  window.__vocabularyGamesBridgeLoader=true;
  const s=document.createElement('script');
  s.src='vocabulary-games-source-bridge.js?v=20261006v5';
  s.async=false;
  s.onerror=e=>console.warn('Vocabulary game source bridge could not be loaded:',e);
  document.head.appendChild(s);
})();
