(function(){
  if(window.__flatShapesRuntime)return;
  window.__flatShapesRuntime=true;
  function loadScript(src,done){
    const s=document.createElement('script');s.src=src;s.async=false;s.onload=done||null;document.body.appendChild(s);
  }
  function loadV2(){
    if(window.__flatShapesV2){loadQA();return;}
    loadScript('hinh-phang-v2.js',loadQA);
  }
  function loadQA(){
    if(window.__flatShapesQA)return;
    loadScript('hinh-phang-qa.js');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadV2,{once:true});
  else loadV2();
})();