(()=>{
'use strict';
const qEl=()=>document.querySelector('#question');
const visualEl=()=>document.querySelector('#visual');
const optionsEl=()=>document.querySelector('#options');
const feedbackEl=()=>document.querySelector('#feedback');
const explainEl=()=>document.querySelector('#explain');
const card=()=>document.querySelector('#questionCard');
function choices(ans){
  const pool=[ans-2,ans-1,ans+1,ans+2,ans-3,ans+3,ans+4];
  return [...new Set(pool.filter(n=>n>0))].slice(0,4);
}
function fixRelativeShapeProblem(){
  const q=qEl(), v=visualEl(), opts=optionsEl(), c=card();
  if(!q||!v||!opts||!c)return false;
  const text=q.textContent.trim();
  const m=text.match(/^Có (\d+) hình tam giác\. Số hình vuông nhiều hơn (\d+) là (\d+)\. Có tất cả bao nhiêu hình\?$/);
  if(!m)return false;
  const triangles=Number(m[1]), reference=Number(m[2]), diff=Number(m[3]);
  if(triangles!==reference)return false;
  const squares=triangles+diff;
  const total=triangles+squares;
  const oldAnswer=String(squares);
  const answers=choices(total);
  if(!answers.includes(total))answers[0]=total;
  answers.sort(()=>Math.random()-0.5);
  q.textContent=`Có ${triangles} hình tam giác. Số hình vuông nhiều hơn số hình tam giác là ${diff}. Có tất cả bao nhiêu hình?`;
  v.innerHTML=`<div class="visual-text"><span>🔺 × ${triangles}</span>　<span>🟦 × ${squares}</span></div>`;
  c.dataset.qualityFix='relative-shape-count';
  c.dataset.correctDisplay=String(total);
  c.dataset.legacyAnswer=oldAnswer;
  const buttons=[...opts.querySelectorAll('.option')];
  answers.forEach((n,i)=>{
    const btn=buttons[i];
    if(!btn)return;
    btn.textContent=String(n);
    btn.dataset.answer=String(n===total?oldAnswer:n);
    btn.classList.remove('correct','wrong');
    btn.disabled=false;
  });
  if(explainEl())explainEl().textContent=`Số hình vuông = ${triangles} + ${diff} = ${squares}. Tổng số hình = ${triangles} + ${squares} = ${total}.`;
  if(feedbackEl())feedbackEl().textContent='';
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    setTimeout(()=>{
      const fb=feedbackEl(), ex=explainEl();
      if(fb)fb.textContent=btn.dataset.answer===oldAnswer?'🎉 Chính xác!':`Chưa đúng. Đáp án là ${total}.`;
      if(ex){ex.textContent=`Số hình vuông = ${triangles} + ${diff} = ${squares}. Tổng số hình = ${triangles} + ${squares} = ${total}.`;ex.classList.add('show');}
    },0);
  },true));
  return true;
}
function run(){
  const c=card();
  if(!c)return;
  const current=qEl()?.textContent.trim()||'';
  if(c.dataset.qualitySource===current)return;
  c.dataset.qualitySource=current;
  fixRelativeShapeProblem();
}
const observer=new MutationObserver(()=>run());
function start(){
  const c=card();
  if(!c){setTimeout(start,50);return;}
  observer.observe(c,{subtree:true,childList:true,characterData:true});
  run();
}
start();
})();
