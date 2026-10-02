(function(){
'use strict';
if(window.__flatShapesV4)return; window.__flatShapesV4=true;
function boot(){
  const old=document.getElementById('startBtn');
  if(old){
    const clean=old.cloneNode(true);
    old.replaceWith(clean);
  }
  const s=document.createElement('script');
  s.src='hinh-phang-v3.js';
  s.async=false;
  document.body.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();