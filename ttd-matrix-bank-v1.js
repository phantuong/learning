/* TTD Matrix Bank v1 — 30 visual matrix candidates */
(function(global){
  const shapes=['circle','square','triangle'],colors=['red','blue','green'];
  const q=[];
  function add(id,level,rule,grid,answer,question,options={}){q.push({id,type:'matrix',family:'matrix_reasoning',level,problem:{grid,rule,options},question,choices:options.choices||[],answer,explanation:'Quan sát quy luật theo hàng/cột rồi suy ra ô còn thiếu.'});}
  for(let i=0;i<10;i++){
    const a={shape:shapes[i%3],color:colors[i%3],count:1+(i%3)},b={shape:shapes[(i+1)%3],color:colors[(i+1)%3],count:1+((i+1)%3)};
    add(`MX_ADD_${String(i+1).padStart(2,'0')}`,2,'quantity_add',[[a,b,null]],{shape:a.shape,color:a.color,count:a.count+b.count},'Hai ô đầu gộp số lượng để tạo ô còn thiếu.',{choices:[{shape:a.shape,color:a.color,count:a.count+b.count},{shape:a.shape,color:a.color,count:a.count},{shape:b.shape,color:b.color,count:b.count},{shape:a.shape,color:b.color,count:a.count+b.count}]});
  }
  for(let i=0;i<10;i++){
    const a={shape:shapes[i%3],color:colors[0],count:1+(i%2)},b={shape:shapes[i%3],color:colors[0],count:a.count+1};
    add(`MX_SEQ_${String(i+1).padStart(2,'0')}`,2,'quantity_progression',[[a,b,null]],{shape:a.shape,color:a.color,count:b.count+1},'Số lượng hình tăng đều. Hình tiếp theo có bao nhiêu hình?',{choices:[{shape:a.shape,color:a.color,count:b.count+1},{shape:a.shape,color:a.color,count:b.count},{shape:a.shape,color:a.color,count:a.count},{shape:shapes[(i+1)%3],color:a.color,count:b.count+1}]});
  }
  for(let i=0;i<10;i++){
    const a={shape:shapes[i%3],color:colors[0],count:1},b={shape:shapes[(i+1)%3],color:colors[1],count:1};
    add(`MX_SHAPE_${String(i+1).padStart(2,'0')}`,3,'shape_cycle',[[a,b,null]],{shape:shapes[(i+2)%3],color:colors[1],count:1},'Hình tiếp theo tuân theo quy luật thay đổi hình.',{choices:[{shape:shapes[(i+2)%3],color:colors[1],count:1},{shape:a.shape,color:colors[1],count:1},{shape:shapes[(i+1)%3],color:colors[1],count:1},{shape:shapes[(i+2)%3],color:colors[2],count:1}],shapes});
  }
  global.TTD_MATRIX_BANK_V1=q;
})(window);
