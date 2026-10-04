/* Grade 1 Thinking Math — Generator v1
 * Generates new variants from reasoning families. It never copies source questions.
 * Every candidate is passed through TTD_ENGINE_V2.make before being published.
 */
const TTD_GENERATED_V1=(()=>{
 const q=[];
 const C={red:'#ef4444',blue:'#3b82f6',green:'#22c55e',yellow:'#eab308',purple:'#8b5cf6',orange:'#f97316'};
 const shapes=['circle','square','triangle','diamond'];
 const colors=Object.values(C);
 const sh=(shape,color)=>({type:'shape',shape,color});
 const A=(id,topic,level,type,kind,data,question,answer,explain,d)=>q.push(TTD_ENGINE_V2.make({id,topic,level,type,problem:{kind,...data},question,answer,explain,distractors:d}));
 const dShapes=(answer)=>{
  const pool=[];for(const s of shapes)for(const c of colors){const x=sh(s,c);if(JSON.stringify(x)!==JSON.stringify(answer))pool.push(x);}
  return pool.slice(0,3);
 };
 const seq=(id,level,pattern,topic='missing-shape')=>{
  const items=pattern.slice(0,-1),answer=pattern[pattern.length-1];
  A(id,topic,level,'visual-sequence','sequence',{items,missing:items.length,answer},'Hình nào tiếp theo?',answer,'Hãy tìm đơn vị lặp lại rồi xác định hình kế tiếp.',dShapes(answer));
 };
 // 12 missing-shape variants: AB / ABC / AAB / ABB / colour / size-like visual attributes.
 for(let i=0;i<3;i++){
  seq(`GEN_MS_AB_${i+1}`,1+i,[sh(shapes[i],colors[i]),sh(shapes[(i+1)%4],colors[(i+1)%6]),sh(shapes[i],colors[i]),sh(shapes[(i+1)%4],colors[(i+1)%6]),sh(shapes[i],colors[i])]);
 }
 for(let i=0;i<3;i++){
  seq(`GEN_MS_ABC_${i+1}`,2+i,[sh(shapes[i],colors[i]),sh(shapes[(i+1)%4],colors[(i+2)%6]),sh(shapes[(i+2)%4],colors[(i+3)%6]),sh(shapes[i],colors[i]),sh(shapes[(i+1)%4],colors[(i+2)%6]),sh(shapes[(i+2)%4],colors[(i+3)%6]),sh(shapes[i],colors[i])]);
 }
 for(let i=0;i<3;i++){
  const a=sh(shapes[i],colors[i]),b=sh(shapes[(i+2)%4],colors[(i+1)%6]);
  seq(`GEN_MS_AAB_${i+1}`,2+i,[a,a,b,a,a,b,a]);
 }
 for(let i=0;i<3;i++){
  const a=sh(shapes[i],colors[i]),b=sh(shapes[(i+1)%4],colors[(i+3)%6]);
  seq(`GEN_MS_ABB_${i+1}`,3+i,[a,b,b,a,b,b,a]);
 }
 // 16 complex shape-pattern variants: two independent attributes.
 for(let i=0;i<8;i++){
  const a=sh(shapes[i%4],colors[i%6]),b=sh(shapes[(i+1)%4],colors[(i+2)%6]),c=sh(shapes[(i+2)%4],colors[(i+4)%6]);
  seq(`GEN_SP_COLOR_SHAPE_${i+1}`,3+(i%3),[a,b,c,a,b,c,a],'shape-pattern');
 }
 for(let i=0;i<8;i++){
  const a=sh(shapes[i%4],colors[i%3]),b=sh(shapes[i%4],colors[(i+1)%3]),c=sh(shapes[(i+1)%4],colors[i%3]);
  seq(`GEN_SP_MIXED_${i+1}`,4+(i%3),[a,b,c,a,b,c,a],'shape-pattern');
 }
 // 12 number matrices: additive row/column rules, with different missing positions.
 const MD=(id,l,base,step,mr,mc)=>{
  const g=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>base+(r+c)*step));
  const ans=g[mr][mc];A(id,'matrix-reasoning',l,'numeric-matrix','matrix',{grid:g,mr,mc,answer:ans},'Điền số còn thiếu trong ma trận.',ans,`Mỗi bước sang phải hoặc xuống dưới tăng ${step}.`,[ans-step,ans+step,ans+2*step]);
 };
 for(let i=0;i<12;i++)MD(`GEN_MX_${String(i+1).padStart(2,'0')}`,2+(i%5),1+i%4,1+(i%3),Math.floor(i/3)%3,i%3);
 // 10 shape-composition variants: missing quantity is derived from a complete target.
 for(let i=0;i<10;i++){
  const total=6+(i%6),part=2+(i%4),ans=total-part;
  A(`GEN_CP_${String(i+1).padStart(2,'0')}`,'shape-composition',2+(i%5),'missing-part','compose',{total,part,symbol:'■',answer:ans},'Hai phần ghép lại thành tổng số ô trong hình. Phần còn thiếu có bao nhiêu ô?',ans,`${total} − ${part} = ${ans}.`,[ans-1,ans+1,total-part+2]);
 }
 // 12 counting variants. Numeric choices are appropriate because the question asks "how many".
 for(let i=0;i<12;i++){
  const target=2+(i%5),total=6+(i%5),items=[];
  for(let j=0;j<total;j++)items.push(j<target?'●':(j%2?'■':'▲'));
  A(`GEN_CT_${String(i+1).padStart(2,'0')}`,'counting-shapes',1+(i%5),'count-objects','count',{sample:'●',items,answer:target},'Có bao nhiêu hình tròn?',target,`Đếm tất cả các hình tròn: có ${target} hình.`,[target-1,target+1,target+2]);
 }
 // 10 multi-condition logic variants.
 const names=['An','Bình','Chi','Dũng'];
 for(let i=0;i<10;i++){
  const a=names[i%4],b=names[(i+1)%4],c=names[(i+2)%4];
  const answer=a;
  A(`GEN_LG_${String(i+1).padStart(2,'0')}`,'multi-condition-logic',3+(i%5),'ordering','logic',{entities:[a,b,c],answer},`${a} cao hơn ${b}. ${b} cao hơn ${c}. Ai cao nhất?`,answer,`${a} > ${b} > ${c}, nên ${a} cao nhất.`,[b,c,'Không biết'].filter(x=>x!==answer));
 }
 // 10 spatial counting variants. Kept numeric while the full 3D renderer is developed.
 for(let i=0;i<10;i++){
  const layers=[2+(i%4),1+(i%3),i%2],ans=layers.reduce((a,b)=>a+b,0);
  A(`GEN_SR_${String(i+1).padStart(2,'0')}`,'spatial-reasoning',3+(i%5),'cube-count','spatial',{layers,answer:ans},'Có tất cả bao nhiêu khối lập phương?',ans,`${layers.join(' + ')} = ${ans} khối.`,[ans-1,ans+1,ans+2]);
 }
 // 12 visual word-problem variants, all solved from the same action model.
 const icons=['🍎','🐟','🚗','🎈','🐰','⭐'];
 for(let i=0;i<12;i++){
  const initial=3+(i%6),x=1+(i%3),y=i%4===0?0:1+(i%2),actions=[{type:'add',value:x},{type:'remove',value:y}],ans=initial+x-y;
  A(`GEN_WP_${String(i+1).padStart(2,'0')}`,'visual-word-problem',1+(i%6),'two-step-story','word',{icon:icons[i%icons.length],initial,actions,answer:ans},`Có ${initial} đồ vật. Thêm ${x} rồi bớt ${y}. Còn lại bao nhiêu?`,ans,`${initial} + ${x} − ${y} = ${ans}.`,[ans-1,ans+1,ans+2]);
 }
 return q;
})();
