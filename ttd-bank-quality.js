/* High-quality Grade 1 thinking-math bank: original questions inspired by the exercise types the parent shared. */
const TTD_QUALITY = [];
(()=>{
 const add=(topic,level,type,question,answer,options,explain,visual='')=>TTD_QUALITY.push({topic,level,type,question:String(question),answer:String(answer),options:options.map(String),explain,visual});
 const uniq=(a)=>[...new Set(a.map(String))];
 const opts=(ans,pool)=>{let a=uniq([ans,...pool]).filter(x=>x!==String(ans)); return [String(ans),...a.sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5)};
 const shapes=['🔺','🟦','🟠','⭐','⬟','❤️'];
 const arrows=['↑','→','↓','←'];
 const nums=[1,2,3,4,5,6,7,8,9,10];
 // 1. Missing figure: visual sequence with transformations, not just simple AB repetition.
 for(let level=1;level<=10;level++){
  for(let k=0;k<20;k++){
   const a=shapes[k%shapes.length], b=shapes[(k+1)%shapes.length], c=shapes[(k+2)%shapes.length];
   let seq,ans,rule;
   if(level<=3){seq=[a,b,a,b];ans=a;rule='Hai hình luân phiên A–B.'}
   else if(level<=5){seq=[a,b,c,a,b];ans=c;rule='Ba hình lặp lại theo thứ tự A–B–C.'}
   else if(level<=7){seq=[a,a,b,b,a,a];ans=b;rule='Mỗi hình xuất hiện hai lần liên tiếp.'}
   else {seq=[a,b,b,c,c,a];ans=b;rule='Mỗi nhóm gồm một hình đơn rồi hình kế tiếp lặp hai lần; tiếp tục chu kỳ.'}
   add('quy-luat-hinh',level,'tìm hình còn thiếu','Hình nào cần đặt vào ô ❓ để tiếp tục quy luật?',ans,opts(ans,shapes),rule,seq.join('  ')+'  ❓');
  }
  // rotation pattern
  for(let k=0;k<12;k++){
   const s=arrows[k%4], i=arrows.indexOf(s), step=level%3===0?2:1, ans=arrows[(i+step)%4];
   add('quy-luat-hinh',Math.max(4,level),'quy luật xoay','Mũi tên xoay đều. Hướng tiếp theo là gì?',ans,opts(ans,arrows),`Mỗi bước xoay ${step===1?'90°':'180°'} theo chiều kim đồng hồ.`,s+'  →  '+arrows[(i+step)%4]+'  →  ❓');
  }
 }
 // 2. Complex shape rules: simultaneous color/count/size attributes.
 const colors=['🔴','🔵','🟢','🟡'];
 for(let level=5;level<=10;level++) for(let k=0;k<24;k++){
  const c1=colors[k%4],c2=colors[(k+1)%4], n=2+(k%3), next=n+1;
  add('quy-luat-hinh',level,'nhiều thuộc tính',`Mỗi bước đổi màu ${c1} → ${c2} và tăng số lượng thêm 1. Nhóm tiếp theo có bao nhiêu hình ${c2}?`,next,opts(next,[n,n+2,n+3]),`Màu đổi sang ${c2} và số lượng tăng từ ${n} lên ${next}.`,`${c1} × ${n}  →  ${c2} × ${n+1}  →  ❓`);
 }
 // 3. Matrix: row/column rules, with unique missing cell.
 for(let level=1;level<=10;level++){
  for(let k=0;k<30;k++){
   const base=1+(k%4), step=level<=4?1:2, missing=(k+level)%3;
   const grid=[];
   for(let r=0;r<3;r++){let row=[];for(let c=0;c<3;c++)row.push(base+r*step+c*step)}
   const ans=grid[missing][2-missing%3]; const rr=missing,cc=2-missing%3;
   const v=grid.map((row,r)=>row.map((x,c)=>r===rr&&c===cc?'❓':x).join(' | ')).join('<br>');
   add('bang-so',level,'ma trận hàng/cột','Tìm số còn thiếu. Trong mỗi hàng và cột, số tăng đều theo cùng một quy luật.',ans,opts(ans,[ans-step,ans+step,ans+2*step,ans-1]),`Mỗi bước sang phải hoặc xuống dưới tăng ${step}.`,v);
  }
 }
 // 4. Combine/split shapes: composition and decomposition.
 for(let level=1;level<=10;level++) for(let k=0;k<24;k++){
  const total=4+(k%8), part=1+(k%Math.min(5,total-1)), other=total-part;
  const symbol=level%2?'🔵':'🔺';
  add('hinh-hoc',level,'ghép tách hình',`Có ${total} ${symbol}. Tách thành một nhóm ${part} ${symbol} và một nhóm. Nhóm còn lại có bao nhiêu?`,other,opts(other,[part,total,total-part+1]),`Tổng ${total} trừ nhóm ${part} bằng ${other}.`,`${symbol.repeat(part)}  +  ❓  =  ${symbol.repeat(total)}`);
 }
 // 5. Count shapes with distractors and conditions.
 for(let level=1;level<=10;level++) for(let k=0;k<30;k++){
  const target=shapes[k%shapes.length], count=2+(k%6), distract=2+(k%4);
  const arr=Array(count).fill(target).concat(Array.from({length:distract},(_,i)=>shapes[(k+i+2)%shapes.length]));
  add('quan-sat',level,'đếm hình','Có bao nhiêu hình cùng loại với hình mẫu?',count,opts(count,[count-1,count+1,distract]),'Chỉ đếm những hình giống hệt hình mẫu.',target+'  |  '+arr.sort(()=>Math.random()-.5).join(' '));
 }
 // 6. Multi-condition reasoning.
 const names=['An','Bình','Chi','Dũng'];
 for(let level=4;level<=10;level++) for(let k=0;k<30;k++){
  const a=names[k%4],b=names[(k+1)%4],c=names[(k+2)%4],d=names[(k+3)%4];
  if(k%3===0){
   const answer=c; add('logic',level,'suy luận nhiều điều kiện',`${a} cao hơn ${b}. ${b} cao hơn ${c}. ${c} cao hơn ${d}. Ai thấp nhất?`,d,opts(d,names),`Thứ tự từ cao đến thấp là ${a} → ${b} → ${c} → ${d}.`); 
  } else if(k%3===1){
   const answer=b; add('logic',level,'suy luận nhiều điều kiện',`${a} đứng trước ${b}. ${c} đứng sau ${b}. ${d} đứng trước ${a}. Ai chắc chắn đứng trước ${a}?`,d,opts(d,names),`${d} đứng trước ${a} theo điều kiện đã cho.`);
  } else {
   const x=2+(k%5), y=1+(k%3); add('logic',level,'suy luận nhiều điều kiện',`Có ${x} quả đỏ và ${y} quả xanh. Lấy đi 1 quả đỏ rồi thêm 2 quả xanh. Có tất cả bao nhiêu quả?`,x+y+1,opts(x+y+1,[x+y,x+y+2,x+y+3]),`Ban đầu có ${x+y}; lấy 1 rồi thêm 2 nên tăng thêm 1.`);
  }
 }
 // 7. Spatial reasoning: cube stacks, views, turns.
 for(let level=1;level<=10;level++) for(let k=0;k<24;k++){
  const bottom=2+(k%5), top=level<5?1+(k%2):2+(k%3), total=bottom+top;
  add('khong-gian',level,'ghép khối 3D',`Một tháp có ${bottom} khối ở tầng dưới và ${top} khối ở tầng trên. Có tất cả bao nhiêu khối?`,total,opts(total,[total-1,total+1,bottom]),'Đếm tất cả các khối ở hai tầng.',`🧊×${bottom}  +  🧊×${top}  →  ?`);
 }
 for(let level=5;level<=10;level++) for(let k=0;k<16;k++){
  const i=k%4, ans=arrows[(i+1)%4];
  add('khong-gian',level,'xoay vật thể','Một mặt có mũi tên hướng lên. Xoay vật thể 90° sang phải. Mũi tên sẽ hướng đâu?',ans,opts(ans,arrows),'Xoay 90° sang phải biến ↑ thành →.','↑  ↻ 90°  →  ❓');
 }
 // 8. Picture word problems: contextual, child-friendly.
 const contexts=[
  ['🐟','cá','Có 4 con cá trong bể. Mẹ thả thêm 3 con.','Có bao nhiêu con cá trong bể?'],
  ['🍎','quả táo','Có 8 quả táo. Bé ăn 2 quả.','Còn lại bao nhiêu quả táo?'],
  ['🚗','chiếc ô tô','Có 5 chiếc ô tô đỏ và 3 chiếc ô tô xanh.','Có tất cả bao nhiêu chiếc ô tô?'],
  ['🐰','con thỏ','Có 7 con thỏ. 2 con chạy vào chuồng.','Còn bao nhiêu con ở ngoài?'],
  ['🎈','quả bóng','Có 6 quả bóng. Bé tặng bạn 2 quả rồi nhận thêm 3 quả.','Bây giờ có bao nhiêu quả bóng?'],
  ['🌳','cây','Có 3 cây bên trái và 4 cây bên phải sân.','Có tất cả bao nhiêu cây?']
 ];
 for(let level=1;level<=10;level++) for(let k=0;k<36;k++){
  const [icon,noun,prefix,q]=contexts[k%contexts.length];
  let answer;
  if(k%contexts.length===0) answer=7; else if(k%contexts.length===1) answer=6; else if(k%contexts.length===2) answer=8; else if(k%contexts.length===3) answer=5; else if(k%contexts.length===4) answer=7; else answer=7;
  add('thu-thach',level,'bài toán hình ảnh',prefix+' '+q,answer,opts(answer,[answer-1,answer+1,answer+2]),'Dùng phép cộng hoặc trừ theo câu chuyện.',icon.repeat(Math.min(answer+1,8)));
 }
 // 9. Missing-piece / composition reasoning.
 for(let level=4;level<=10;level++) for(let k=0;k<20;k++){
  const total=6+(k%5), left=2+(k%3), right=total-left;
  add('hinh-hoc',level,'ghép hình tìm phần thiếu',`Hai mảnh ghép tạo thành ${total} ô. Một mảnh có ${left} ô. Mảnh còn thiếu có bao nhiêu ô?`,right,opts(right,[left,total,total-right+1]),`Tổng số ô trừ số ô của mảnh đã biết: ${total} − ${left} = ${right}.`,`🟦×${left}  +  ❓  =  🟦×${total}`);
 }
 // 10. Count composite shapes using simple decomposition.
 for(let level=4;level<=10;level++) for(let k=0;k<20;k++){
  const triangles=2+(k%4), squares=1+(k%3), ans=triangles+squares;
  add('hinh-hoc',level,'đếm hình ghép',`Hình ghép gồm ${triangles} tam giác và ${squares} hình vuông. Có tất cả bao nhiêu hình nhỏ?`,ans,opts(ans,[triangles,squares,ans+1]),`Cộng số tam giác và số hình vuông.`,`🔺×${triangles}  +  🟦×${squares}`);
 }
})();
