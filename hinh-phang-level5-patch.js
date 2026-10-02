(function(){
'use strict';
if(window.__flatShapesL5Patch)return; window.__flatShapesL5Patch=true;
const $=id=>document.getElementById(id);
const svg=c=>`<svg viewBox="0 0 720 300" role="img">${c}</svg>`;
const colors={tri:['#ffe6a8','#e3a72f'],sq:['#dce8ff','#6d88c7'],rect:['#d9f5e5','#35a874']};
const rect=(x,y,w,h,c='sq')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${colors[c][0]}" stroke="${colors[c][1]}" stroke-width="5"/>`;
const tri=(p)=>`<polygon points="${p}" fill="${colors.tri[0]}" stroke="${colors.tri[1]}" stroke-width="5" stroke-linejoin="round"/>`;
const options=a=>['hình vuông','hình tròn','hình tam giác','hình chữ nhật'].sort(()=>Math.random()-.5).map(x=>x===a?x:x);
function questions(){
 return [
  {id:'two-right-triangles-square',prompt:'🧩 Hai tam giác vuông cân bằng nhau ghép theo cạnh huyền sẽ tạo thành hình gì?',visual:svg(tri('220,230 220,70 380,230')+tri('380,70 380,230 220,70')+`<line x1="220" y1="70" x2="380" y2="230" stroke="#b77d18" stroke-width="4"/>`),answer:'hình vuông'},
  {id:'two-squares-horizontal',prompt:'🧩 Hai hình vuông giống nhau đặt cạnh nhau theo một cạnh sẽ tạo thành hình gì?',visual:svg(rect(185,75,150,150)+rect(335,75,150,150)),answer:'hình chữ nhật'},
  {id:'two-squares-vertical',prompt:'🧩 Hai hình vuông giống nhau xếp chồng theo một cạnh sẽ tạo thành hình gì?',visual:svg(rect(285,20,150,120)+rect(285,140,150,120)),answer:'hình chữ nhật'},
  {id:'four-squares-grid',prompt:'🧩 Bốn hình vuông giống nhau ghép thành một khối 2 × 2. Hình lớn bên ngoài là hình gì?',visual:svg(rect(285,35,75,75)+rect(360,35,75,75)+rect(285,110,75,75)+rect(360,110,75,75)),answer:'hình vuông'},
  {id:'three-squares-row',prompt:'🧩 Ba hình vuông giống nhau xếp thành một hàng. Đường bao bên ngoài là hình gì?',visual:svg(rect(210,90,100,100)+rect(310,90,100,100)+rect(410,90,100,100)),answer:'hình chữ nhật'},
  {id:'two-rectangles-horizontal',prompt:'🧩 Hai hình chữ nhật giống nhau đặt cạnh nhau theo cạnh ngắn. Hình bên ngoài là hình gì?',visual:svg(rect(175,90,185,100,'rect')+rect(360,90,185,100,'rect')),answer:'hình chữ nhật'},
  {id:'two-rectangles-vertical',prompt:'🧩 Hai hình chữ nhật giống nhau xếp chồng theo cạnh ngắn. Hình bên ngoài là hình gì?',visual:svg(rect(285,35,150,105,'rect')+rect(285,140,150,105,'rect')),answer:'hình chữ nhật'},
  {id:'square-diagonal-pieces',prompt:'🧩 Hai tam giác vuông được cắt từ một hình vuông theo đường chéo. Ghép đúng hai mảnh sẽ tạo lại hình gì?',visual:svg(rect(260,45,200,200)+`<line x1="260" y1="45" x2="460" y2="245" stroke="#b77d18" stroke-width="5"/>`),answer:'hình vuông'},
  {id:'rectangle-halves',prompt:'🧩 Hai mảnh hình chữ nhật bằng nhau được cắt từ một hình chữ nhật lớn. Ghép lại đúng vị trí sẽ tạo hình gì?',visual:svg(rect(250,45,100,200,'rect')+rect(350,45,100,200,'rect')+`<line x1="350" y1="45" x2="350" y2="245" stroke="#237a58" stroke-width="4"/>`),answer:'hình chữ nhật'},
  {id:'two-tall-rectangles-square',prompt:'🧩 Hai hình chữ nhật cao và hẹp giống nhau đặt cạnh nhau. Chúng vừa đủ tạo thành hình gì?',visual:svg(rect(260,45,100,200,'rect')+rect(360,45,100,200,'rect')),answer:'hình vuông'}
 ];
}
function startLevel5(e){if(e){e.preventDefault();e.stopImmediatePropagation();}const qs=questions().sort(()=>Math.random()-.5);let i=0,score=0,answered=false;const quiz=$('quiz');$('setup').classList.add('hide');quiz.classList.add('show');
 function render(){const q=qs[i];answered=false;quiz.innerHTML=`<div class="top"><span>Câu ${i+1}/10</span><span>⭐ ${score}</span></div><div class="bar"><i style="width:${i*10}%"></i></div><div class="question">${q.prompt}</div><div class="visual">${q.visual}</div><div class="answers">${options(q.answer).map((x,j)=>`<button type="button" class="ans" data-j="${j}">${x}</button>`).join('')}</div><div id="feedback" class="feedback"></div><button id="nextBtn" type="button" class="next">Tiếp theo →</button>`;quiz.querySelectorAll('.ans').forEach(b=>b.onclick=()=>answer(+b.dataset.j));$('nextBtn').onclick=next;}
 function answer(j){if(answered)return;answered=true;const bs=[...quiz.querySelectorAll('.ans')],q=qs[i],ok=bs[j].textContent===q.answer;bs.forEach(b=>b.disabled=true);bs[j].classList.add(ok?'correct':'wrong');const r=bs.find(b=>b.textContent===q.answer);if(r)r.classList.add('correct');if(ok){score++;$('feedback').textContent='🎉 Chính xác!';$('feedback').style.color='#087443';}else{$('feedback').textContent=`💪 Gần đúng! Đáp án là: ${q.answer}`;$('feedback').style.color='#b4232e';}$('nextBtn').classList.add('show');}
 function next(){i++;if(i>=10){quiz.innerHTML=`<div class="result"><div class="stars">${score>=8?'🌟🌟🌟':score>=5?'🌟🌟':'🌟'}</div><div class="badge">Hoàn thành Level 5</div><h2>Con đã làm ${score}/10 câu đúng!</h2><p>👏 Con đã luyện cách ghép các hình.</p><button id="againBtn" type="button" class="again">Luyện lại 🔄</button></div>`;$('againBtn').onclick=startLevel5;}else render();}
 render();quiz.scrollIntoView({behavior:'smooth',block:'start'});
}
function install(){const b=$('startBtn');if(!b)return;const old=b.onclick;const clone=b.cloneNode(true);b.replaceWith(clone);clone.addEventListener('click',function(e){let lvl=1;try{lvl=Number(localStorage.getItem('flatShapeLevel')||1)}catch(_){}if(lvl===5)startLevel5(e);else if(typeof old==='function')old.call(clone,e);});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else setTimeout(install,0);
})();
