/* TTD Counting Bank v1 — 24 model-first candidates */
(function(global){const q=[],C=['red','blue','green'];const obj=(type,color,x,y,layer=0)=>({type,color,x,y,layer});
function add(id,level,type,model,choices,answer,question){q.push({id,type:'counting',family:type,level,problem:model,choices,answer,question,explanation:'Đếm trực tiếp từ mô hình hình ảnh; không dùng dữ liệu ngoài hình.'});}
for(let i=0;i<8;i++){const n=4+i%4,objects=Array.from({length:n},(_,j)=>obj(j%2?'circle':'square',C[j%3],20+(j%4)*38,25+Math.floor(j/4)*50));add(`CNT_OBJ_${String(i+1).padStart(2,'0')}`,1,'objects',{type:'objects',objects},[n,n-1,n+1,n+2],`Có tất cả bao nhiêu hình?`)}
for(let i=0;i<8;i++){const target=C[i%3],objects=Array.from({length:7+i%3},(_,j)=>obj(j%3===0?'triangle':j%2?'circle':'square',C[j%3],20+(j%4)*38,25+Math.floor(j/4)*50));add(`CNT_TYPE_${String(i+1).padStart(2,'0')}`,2,'by_type',{type:'by_type',targetType:'triangle',objects},[objects.filter(o=>o.type==='triangle').length,2,3,4],`Có bao nhiêu hình tam giác?`)}
for(let i=0;i<8;i++){const heights=[1+(i%2),2+(i%2),1+(i%3)];const total=heights.reduce((a,b)=>a+b,0);add(`CNT_CUBE_${String(i+1).padStart(2,'0')}`,3,'cube_stack',{type:'cube_stack',heights},[total,total-1,total+1,heights.length*2],`Có tất cả bao nhiêu khối lập phương?`)}
global.TTD_COUNTING_BANK_V1=q;})(window);
