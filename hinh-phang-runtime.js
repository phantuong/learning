(function(){
  if(window.__flatShapesRuntime)return;
  window.__flatShapesRuntime=true;
  function loadV2(){
    if(window.__flatShapesV2)return;
    const s=document.createElement('script');
    s.src='hinh-phang-v2.js';
    s.async=false;
    document.body.appendChild(s);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadV2,{once:true});
  else loadV2();
})();