(function(){
  if(window.__flatShapesRuntime)return;
  window.__flatShapesRuntime=true;
  function load(){
    if(window.__flatShapesV3)return;
    const s=document.createElement('script');
    s.src='hinh-phang-v3.js';
    s.async=false;
    document.body.appendChild(s);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});
  else load();
})();