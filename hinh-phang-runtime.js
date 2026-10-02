(function(){
  if(window.__flatShapesRuntime)return;
  window.__flatShapesRuntime=true;
  function load(src,done){
    const s=document.createElement('script');s.src=src;s.async=false;s.onload=done||null;document.body.appendChild(s);
  }
  function patch(){load('hinh-phang-level5-patch.js');}
  function start(){
    if(window.__flatShapesV3)patch();
    else load('hinh-phang-v3.js',patch);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
