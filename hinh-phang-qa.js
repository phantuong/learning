(function(){
  'use strict';
  if(window.__flatShapesQA)return;
  window.__flatShapesQA=true;
  function squareFromTwoRightTriangles(){
    return '<svg viewBox="0 0 720 300" role="img"><text x="30" y="55" font-size="34">😊</text><text x="645" y="260" font-size="34">⭐</text><rect x="260" y="45" width="210" height="210" rx="4" fill="#dce8ff" stroke="#6d88c7" stroke-width="5"/><path d="M260 45L470 255" stroke="#6d88c7" stroke-width="4"/><polygon points="260,45 470,45 470,255" fill="#ffe6a8" stroke="#e3a72f" stroke-width="4" stroke-linejoin="round"/><polygon points="260,45 260,255 470,255" fill="#ffe6a8" stroke="#e3a72f" stroke-width="4" stroke-linejoin="round"/><text x="365" y="285" text-anchor="middle" font-size="16" font-weight="800" fill="#6c6472">2 tam giác vuông ghép theo cạnh huyền</text></svg>';
  }
  function verifyComposition(){
    const q=document.querySelector('#quiz .question');
    const v=document.querySelector('#quiz .visual');
    if(!q||!v)return;
    if(q.textContent.includes('Hai hình tam giác vuông bằng nhau ghép theo cạnh huyền')){
      v.innerHTML=squareFromTwoRightTriangles();
    }
  }
  function init(){
    verifyComposition();
    const quiz=document.getElementById('quiz');
    if(!quiz)return;
    new MutationObserver(verifyComposition).observe(quiz,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();