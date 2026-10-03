(()=>{
const TOPICS={
 'quy-luat-so':{title:'Quy luật số',icon:'🔢',desc:'Quan sát dãy số, tìm quy luật và chọn số tiếp theo.',levels:['+1','+2','−1','−2','+3','−3','xen kẽ','cộng 2 số','quy luật kép','thử thách']},
 'quy-luat-hinh':{title:'Quy luật hình',icon:'🎨',desc:'Tìm hình, màu sắc, kích thước hoặc số lượng tiếp theo.',levels:['AB','ABC','AAB','ABB','màu sắc','kích thước','số lượng','xoay hình','hai quy luật','thử thách']},
 'logic':{title:'Logic',icon:'🧩',desc:'Suy luận, loại trừ, sắp xếp và tìm điều còn thiếu.',levels:['so sánh','thứ tự','loại trừ','điều kiện','ai ở đâu','ai còn thiếu','đúng/sai','suy luận 2 bước','suy luận 3 bước','thử thách']},
 'hinh-hoc':{title:'Hình học',icon:'🔷',desc:'Nhận biết hình, đếm hình và suy luận từ đặc điểm.',levels:['nhận biết','cạnh','góc','đếm hình','phân loại','ghép hình','chia hình','quy luật hình','đếm nâng cao','thử thách']},
 'bang-so':{title:'Bảng số',icon:'📊',desc:'Điền số theo quy luật hàng, cột và ma trận.',levels:['3×3 dễ','3×3','3×3 nâng cao','hàng & cột','đường chéo','tổng bằng nhau','4×4','ma trận','ma trận kép','thử thách']},
 'khong-gian':{title:'Không gian 3D',icon:'🧊',desc:'Quan sát khối, hướng quay và cấu trúc không gian.',levels:['khối cơ bản','mặt khối','đếm khối','cao hơn','trái/phải','trước/sau','xoay','ghép khối','tưởng tượng 3D','thử thách']},
 'quan-sat':{title:'Quan sát & Đếm',icon:'🔎',desc:'Quan sát nhanh và tìm đồ vật theo điều kiện.',levels:['đếm đơn giản','màu sắc','hình dạng','đếm theo nhóm','tìm khác biệt','hai điều kiện','ba điều kiện','đếm nhanh','quan sát khó','thử thách']},
 'thu-thach':{title:'Thử thách tổng hợp',icon:'🏆',desc:'Trộn các dạng bài để bé vận dụng nhiều kỹ năng.',levels:['khởi động','dễ','dễ+','trung bình','trung bình+','khá','khá+','khó','rất khó','siêu thử thách']}
};
const $=s=>document.querySelector(s);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&bsol;','"':'&quot;'}[m]));
const key='mathThinkingProgressV1';
let topic=location.pathname.match(/ttd-([\w-]+)\.html$/)?.[1]||'quy-luat-so';
if(!TOPICS[topic])topic='quy-luat-so';
let level=Math.min(10,Math.max(1,Number(new URLSearchParams(location.search).get('level'))||Number(localStorage.getItem(key+'Level:'+topic))||1));
let qIndex=0,score=0,streak=0,answered=false,current=null,hintUsed=false;
function rnd(n=10){return Math.floor(Math.random()*n)}
function numOptions(answer,range=4){
 const s=new Set([Number(answer)]);
 let d=1;
 while(s.size<4){
  const candidates=[Number(answer)-d,Number(answer)+d,Number(answer)-d-1,Number(answer)+d+1];
  candidates.forEach(x=>{if(x>=0&&s.size<4)s.add(x)});d++;
 }
 return shuffle([...s]).map(String);
}
function seq(a){return `<div class="sequence">${a.map(x=>esc(x)).join(' → ')}</div>`}
function Q(question,answer,options,visual='',explain=''){return{question,answer:String(answer),options:shuffle(options.map(String)),visual,explain}}
function makeNumber(l){
 if(l===1){const s=1+rnd(5),a=[s,s+1,s+2,s+3];return Q('Số nào tiếp theo?',s+4,numOptions(s+4),seq([...a,'?']),'Mỗi lần thêm 1 đơn vị.')}
 if(l===2){const s=1+rnd(3),a=[s,s+2,s+4,s+6];return Q('Số nào tiếp theo?',s+8,numOptions(s+8),seq([...a,'?']),'Mỗi lần thêm 2 đơn vị.')}
 if(l===3){const s=7+rnd(4),a=[s,s-1,s-2,s-3];return Q('Số nào tiếp theo?',s-4,numOptions(s-4),seq([...a,'?']),'Mỗi lần bớt 1 đơn vị.')}
 if(l===4){const s=10+rnd(4),a=[s,s-2,s-4,s-6];return Q('Số nào tiếp theo?',s-8,numOptions(s-8),seq([...a,'?']),'Mỗi lần bớt 2 đơn vị.')}
 if(l===5){const s=1+rnd(3),a=[s,s+3,s+6,s+9];return Q('Số nào tiếp theo?',s+12,numOptions(s+12),seq([...a,'?']),'Mỗi lần thêm 3 đơn vị.')}
 if(l===6){const s=14+rnd(3),a=[s,s-3,s-6,s-9];return Q('Số nào tiếp theo?',s-12,numOptions(s-12),seq([...a,'?']),'Mỗi lần bớt 3 đơn vị.')}
 if(l===7){const s=1+rnd(3),a=[s,s+2,s+1,s+3,s+2,s+4];return Q('Số nào tiếp theo theo quy luật xen kẽ?',s+3,numOptions(s+3),seq([...a,'?']),'Lần lượt +2, −1, +2, −1, +2, −1.')}
 if(l===8){const a=[1+rnd(2),2+rnd(2)];a.push(a[0]+a[1],a[1]+a[2]);const answer=a[2]+a[3];return Q('Số nào tiếp theo? Mỗi số bằng tổng của hai số đứng trước.',answer,numOptions(answer,6),seq([...a,'?']),'Lấy hai số ngay trước cộng lại.')}
 if(l===9){const s=1+rnd(2),a=[s,s+2,s+5,s+9];return Q('Số nào tiếp theo? Khoảng cách giữa các số tăng dần.',s+14,numOptions(s+14,6),seq([...a,'?']),'Các bước là +2, +3, +4, rồi +5.')}
 const s=1+rnd(2),a=[s,s+1,s+3,s+6,s+10];return Q('Tìm số tiếp theo của dãy.',s+15,numOptions(s+15,7),seq([...a,'?']),'Các bước tăng lần lượt +1, +2, +3, +4, rồi +5.')
}
function makePattern(l){
 const pools=[['🔴','🔵'],['🔺','🟢','⭐'],['🟡','🟡','🔵'],['🟣','🟢','🟢'],['🍎','🍌'],['🔺','🔺','⚪'],['⭐','⭐','🌙'],['⬆️','➡️','⬇️','⬅️']];
 let base=pools[Math.min(l-1,pools.length-1)];
 let len=l<=2?6:l<=5?8:10;
 if(l===8){base=pools[7];len=8}
 if(l===9){base=['🔴','🔵','🟢'];len=9}
 if(l===10){base=['🔺','🟢','⭐','🟦'];len=12}
 const arr=Array.from({length:len},(_,i)=>base[i%base.length]);
 const answer=base[len%base.length];
 const all=['🔴','🔵','🟢','🟡','🔺','⭐','🟣','⚪','🍎','🍌','⬆️','➡️','⬇️','⬅️','🟦'];
 const opts=[answer,...shuffle(all.filter(x=>x!==answer)).slice(0,3)];
 const rule=l<=5?`Nhóm hình lặp lại theo mẫu ${base.length} phần tử.`:`Quan sát chu kỳ ${base.length} hình để tìm hình tiếp theo.`;
 return Q('Hình nào tiếp theo?',answer,opts,seq([...arr,'?']),rule)
}
function makeLogic(l){
 if(l<=2){const a=2+rnd(3),b=a+1,c=b+1;return Q('Ba bạn có tuổi lần lượt là '+a+', '+b+', '+c+'. Ai lớn tuổi nhất?','Bạn 3',['Bạn 1','Bạn 2','Bạn 3','Không biết'],`👧 Bạn 1: ${a} tuổi　👦 Bạn 2: ${b} tuổi　🧒 Bạn 3: ${c} tuổi`,'So sánh ba số tuổi, số lớn nhất là của Bạn 3.')}
 if(l<=4)return Q('An đứng trước Bình. Chi đứng sau Bình. Ai đứng ở giữa?','Bình',['An','Bình','Chi','Không biết'],'👧 An　→　👦 Bình　→　👧 Chi','Bình nằm giữa An và Chi.');
 if(l<=6)return Q('Hình nào không cùng nhóm với ba hình còn lại?','🐟',['🐶','🐱','🐰','🐟'],'🐶　🐱　🐰　🐟','Ba hình đầu là con vật sống chủ yếu trên cạn; cá sống dưới nước.');
 if(l<=8){const n=3+rnd(3);return Q(`Số ${n} vừa lớn hơn 2 vừa nhỏ hơn 6. Câu nào đúng?`,`Số ${n} lớn hơn 2 và nhỏ hơn 6`,[`Số ${n} nhỏ hơn 2`,`Số ${n} lớn hơn 6`,`Số ${n} lớn hơn 2 và nhỏ hơn 6`,`Không thể biết`],'🔎','Cả hai điều kiện đều đúng.')}
 return Q('Có 3 chiếc hộp: đỏ, xanh, vàng. Hộp đỏ không ở giữa. Hộp vàng đứng sau hộp xanh. Hộp nào có thể đứng giữa?','Hộp xanh',['Hộp đỏ','Hộp xanh','Hộp vàng','Không thể biết'],'🟥　🟦　🟨','Nếu vàng đứng sau xanh và đỏ không ở giữa, xanh có thể đứng giữa.')
}
function makeGeometry(l){
 const data=[['🔺','Hình tam giác','3 cạnh'],['🟦','Hình vuông','4 cạnh bằng nhau'],['▭','Hình chữ nhật','4 cạnh'],['⚪','Hình tròn','không có cạnh'],['⬟','Hình lục giác','6 cạnh']];
 if(l<=3){const d=pick(data);return Q(`Hình nào có đặc điểm: ${d[2]}?`,d[1],shuffle(data.map(x=>x[1])),d[0],`Đáp án là ${d[1]}.`)}
 if(l<=5){const d=pick(data.filter(x=>x[2].includes('cạnh')));return Q(`Hình nào có ${d[2].replace('cạnh bằng nhau','cạnh bằng nhau').replace('cạnh','cạnh')}?`,d[1],shuffle(data.map(x=>x[1])),d[0],`Quan sát số cạnh và đặc điểm của hình.`)}
 const count=l===6?6:l===7?8:l===8?9:10;const triangles=2+rnd(Math.max(2,count-2));const squares=count-triangles;return Q(`Có ${count} hình. Trong đó có ${triangles} hình tam giác. Có bao nhiêu hình còn lại?`,squares,numOptions(squares,3),`🔺`.repeat(triangles)+'　'+`🟦`.repeat(squares),'Lấy tổng số hình trừ số hình tam giác.')
}
function makeGrid(l){
 const n=l>=7?4:3;
 const grid=n===3?[[1,2,3],[2,3,1],[3,1,2]]:[[1,2,3,4],[2,3,4,1],[3,4,1,2],[4,1,2,3]];
 const r=rnd(n),c=rnd(n),answer=grid[r][c];
 const cells=grid.map((row,ri)=>row.map((x,ci)=>ri===r&&ci===c?'?':x).join('　')).join('<br>');
 return Q(`Điền số còn thiếu vào bảng ${n}×${n}.`,answer,numOptions(answer,n+2),`<div class="sequence">${cells}</div>`,`Mỗi hàng và mỗi cột đều chứa đủ các số ${n===3?'1, 2, 3':'1, 2, 3, 4'} theo cùng một quy luật.`)
}
function makeSpace(l){
 const count=l<=3?3+l:l<=6?5+l:7+rnd(4);
 const visual=`<div class="cube-scene"><div class="cube" id="miniCube"><div class="face front">1</div><div class="face backf">2</div><div class="face right">3</div><div class="face left">4</div><div class="face topf">5</div><div class="face bottom">6</div></div></div><div style="font-size:18px;color:#68738a">🧊 × ${count}</div>`;
 return Q('Có bao nhiêu khối lập phương?',count,numOptions(count,3),visual,'Mỗi biểu tượng đại diện cho một khối lập phương. Hãy đếm thật kỹ.');
}
function makeObserve(l){
 const colors=['🔴','🔵','🟢','🟡'];const animals=['🐶','🐱','🐰','🐼'];
 const pool=l<=3?colors:l<=6?animals:[...colors,...animals];
 const len=l<=3?8:l<=6?10:12;const target=pick(pool);let arr=Array.from({length:len},()=>pick(pool));
 if(!arr.includes(target))arr[rnd(len)]=target;
 const answer=arr.filter(x=>x===target).length;
 return Q(`Có bao nhiêu ${target} trong hình?`,answer,numOptions(answer,3),arr.join('　'),`Đếm từng ${target} từ trái sang phải và không bỏ sót.`)
}
function makeChallenge(l){
 const makers=[makeNumber,makePattern,makeLogic,makeGeometry,makeGrid,makeSpace,makeObserve];
 return makers[(l+rnd(makers.length))%makers.length](Math.max(1,l));
}
function makeQuestion(){
 if(topic==='quy-luat-so')return makeNumber(level);
 if(topic==='quy-luat-hinh')return makePattern(level);
 if(topic==='logic')return makeLogic(level);
 if(topic==='hinh-hoc')return makeGeometry(level);
 if(topic==='bang-so')return makeGrid(level);
 if(topic==='khong-gian')return makeSpace(level);
 if(topic==='quan-sat')return makeObserve(level);
 return makeChallenge(level);
}
function sound(ok){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const c=new A();const o=c.createOscillator(),g=c.createGain();o.type=ok?'sine':'sawtooth';o.frequency.value=ok?660:180;g.gain.value=.055;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+(ok?.18:.28));setTimeout(()=>c.close(),500)}catch(e){}}
function save(){let done=[];try{done=JSON.parse(localStorage.getItem(key+'Done:'+topic)||'[]')}catch(e){}if(score>=8&&!done.includes(level))done.push(level);try{localStorage.setItem(key+'Done:'+topic,JSON.stringify(done));localStorage.setItem(key+'Level:'+topic,String(level))}catch(e){}}
function renderLevels(){
 let done=[];try{done=JSON.parse(localStorage.getItem(key+'Done:'+topic)||'[]')}catch(e){}
 $('#levels').innerHTML=TOPICS[topic].levels.map((name,i)=>`<button class="${i+1===level?'on ':''}${done.includes(i+1)?'done':''}" data-l="${i+1}">${i+1}<br><small>${name}</small></button>`).join('');
 document.querySelectorAll('#levels button').forEach(b=>b.onclick=()=>{level=Number(b.dataset.l);try{localStorage.setItem(key+'Level:'+topic,String(level))}catch(e){}start()});
}
function render(){
 current=makeQuestion();answered=false;hintUsed=false;
 $('#qNo').textContent=`Câu ${qIndex+1}/10`;$('#score').textContent=`⭐ ${score}`;$('#streak').textContent=`🔥 ${streak}`;$('#progress').style.width=((qIndex)/10*100)+'%';
 $('#question').textContent=current.question;$('#visual').innerHTML=current.visual||'';$('#options').innerHTML=current.options.map(o=>`<button class="option" data-v="${esc(o)}">${esc(o)}</button>`).join('');
 $('#feedback').textContent='';$('#explain').classList.remove('show');$('#explain').textContent='';$('#next').classList.remove('show');
 document.querySelectorAll('.option').forEach(b=>b.onclick=()=>answer(b,b.dataset.v));
 if(topic==='khong-gian'){
  const cube=$('#miniCube');let sx=0,sy=0,rx=-22,ry=32;
  if(cube){cube.onpointerdown=e=>{sx=e.clientX;sy=e.clientY;cube.setPointerCapture(e.pointerId)};cube.onpointermove=e=>{if(!cube.hasPointerCapture(e.pointerId))return;ry+=e.clientX-sx;rx-=e.clientY-sy;sx=e.clientX;sy=e.clientY;cube.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`};cube.onpointerup=e=>cube.releasePointerCapture(e.pointerId);cube.onpointercancel=e=>cube.releasePointerCapture(e.pointerId)}
 }
}
function answer(btn,v){
 if(answered)return;const ok=String(v)===String(current.answer);
 if(ok){answered=true;score++;streak++;btn.classList.add('correct');document.querySelectorAll('.option').forEach(x=>x.disabled=true);$('#feedback').textContent=streak>=3?'🔥 Tuyệt vời! Chuỗi đúng '+streak+' câu!':'🎉 Chính xác!';$('#feedback').style.color='#087443';$('#explain').textContent=current.explain;$('#explain').classList.add('show');$('#next').classList.add('show');sound(true);save()}
 else{streak=0;btn.classList.add('wrong');$('#feedback').textContent='💪 Chưa đúng. Hãy thử lại nhé!';$('#feedback').style.color='#b4232e';if(hintUsed){$('#explain').textContent='💡 Gợi ý: '+current.explain;$('#explain').classList.add('show')}sound(false)}
}
function next(){if(!answered)return;qIndex++;if(qIndex>=10){finish();return}render()}
function finish(){
 save();$('#progress').style.width='100%';const msg=score===10?'🏆 Hoàn hảo!':score>=8?'🌟 Rất tốt!':score>=6?'👏 Bé làm tốt!':'💪 Cố gắng thêm nhé!';
 $('#questionCard').innerHTML=`<div class="finish"><div class="big">${score===10?'🏆':score>=8?'🌟':'🎯'}</div><h2>${msg}</h2><p>Bé đạt <strong>${score}/10</strong> điểm ở Level ${level}.</p><p>${score>=8?'Level này đã được đánh dấu hoàn thành. Bé có thể thử Level tiếp theo!':'Hãy chơi lại Level này để cải thiện điểm số nhé.'}</p><button onclick="start()">🔄 Chơi lại</button>${level<10&&score>=8?`<button onclick="goNextLevel()">Level ${level+1} →</button>`:''}</div>`;
 renderLevels();
}
function goNextLevel(){if(level<10){level++;start()}}
function hint(){if(answered)return;hintUsed=true;$('#explain').textContent='💡 Gợi ý: '+current.explain;$('#explain').classList.add('show')}
function start(){
 qIndex=0;score=0;streak=0;
 $('#questionCard').innerHTML='<div class="q-meta" id="qNo"></div><div class="question" id="question"></div><div class="visual" id="visual"></div><div class="options" id="options"></div><div class="feedback" id="feedback"></div><div class="actions"><button class="hint" id="hint">💡 Gợi ý</button><button class="next" id="next">Tiếp theo →</button></div><div class="explain" id="explain"></div>';
 $('#hint').onclick=hint;$('#next').onclick=next;renderLevels();render();
}
function init(){document.title=TOPICS[topic].title+' · Toán Tư Duy Lớp 1';$('#topicIcon').textContent=TOPICS[topic].icon;$('#topicTitle').textContent=TOPICS[topic].title;$('#topicDesc').textContent=TOPICS[topic].desc;start()}
window.goNextLevel=goNextLevel;window.start=start;document.addEventListener('DOMContentLoaded',init);
})();
