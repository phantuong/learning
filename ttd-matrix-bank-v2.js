/* TTD Matrix Bank v2 — 3x3 visual matrix candidates */
(function(global){
  const S=['circle','square','triangle'], C=['red','blue','green']; const bank=[];
  function cell(i){return {shape:S[i%3],color:C[i%3],count:1+(i%3)}}
  function add(id,level,rule,grid,choices,answer,options={}){bank.push({id,type:'matrix',family:'matrix_reasoning',level,problem:{grid,rule,options},question:'Ô có dấu ? còn thiếu hình nào?',choices,answer,explanation:'Tìm quy luật theo hàng và cột rồi chọn hình phù hợp.'});}
  for(let i=0;i<12;i++){
    const a=cell(i),b=cell(i+1),d=cell(i+2),e=cell(i+3),g=cell(i+4),h=cell(i+5),ans={shape:d.shape,color:d.color,count:a.count+b.count};
    add(`MX3_ADD_${String(i+1).padStart(2,'0')}`,2,'quantity_add',[[a,b,ans],[d,e,g],[h,a,b]],
      [ans,{...ans,count:ans.count-1},{...ans,count:ans.count+1},{shape:b.shape,color:a.color,count:ans.count}],0,{shapes:S,colors:C});
  }
  for(let i=0;i<12;i++){
    const a=cell(i%3),b=cell((i+1)%3),c=cell((i+2)%3),ans=cell((i+3)%3);
    add(`MX3_SHAPE_${String(i+1).padStart(2,'0')}`,3,'shape_cycle',[[a,b,c],[b,c,ans],[c,a,b]],
      [ans,{...ans,shape:a.shape},{...ans,color:C[(i+1)%3]},{...ans,count:2}],0,{shapes:S,colors:C});
  }
  global.TTD_MATRIX_BANK_V2=bank;
})(window);
