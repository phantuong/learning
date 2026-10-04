/* TTD Shape Pattern Generator v1 — model-first visual choices */
(function(global){
 const SHAPES=['circle','square','triangle','star'];
 const COLORS=['red','blue','green','yellow'];
 const SIZES=['small','large'];
 const item=(shape,color,size)=>({shape,color,size});
 function make(i){
  const rules=['ab','abc','aabb','color_size']; const rule=rules[i%rules.length]; let sequence;
  if(rule==='ab') sequence=[item(SHAPES[i%4],COLORS[i%4],SIZES[0]),item(SHAPES[(i+1)%4],COLORS[(i+1)%4],SIZES[0])];
  else if(rule==='abc') sequence=[item(SHAPES[i%4],COLORS[0],SIZES[0]),item(SHAPES[(i+1)%4],COLORS[1],SIZES[0]),item(SHAPES[(i+2)%4],COLORS[2],SIZES[0])];
  else if(rule==='aabb') sequence=[item('circle',COLORS[i%4],SIZES[0]),item('circle',COLORS[i%4],SIZES[0]),item('square',COLORS[(i+1)%4],SIZES[0]),item('square',COLORS[(i+1)%4],SIZES[0])];
  else sequence=[item('circle',COLORS[i%4],SIZES[0]),item('circle',COLORS[i%4],SIZES[1])];
  let answer;
  if(rule==='ab') answer=sequence[0]; else if(rule==='abc') answer=sequence[0]; else if(rule==='aabb') answer=sequence[0]; else answer=item('circle',COLORS[i%4],SIZES[0]);
  const choices=[answer,item(SHAPES[(i+1)%4],COLORS[(i+2)%4],SIZES[0]),item(SHAPES[(i+2)%4],COLORS[(i+3)%4],SIZES[1]),item(SHAPES[(i+3)%4],COLORS[i%4],SIZES[0])];
  return {id:`PAT1_${String(i+1).padStart(3,'0')}`,type:'shape_pattern',family:rule,level:rule==='ab'?1:rule==='abc'?2:3,problem:{type:'shape_pattern',sequence,rule},visual:{type:'shape_choices',choiceVisuals:choices,choiceVisualIds:['v0','v1','v2','v3'],answerVisualId:'v0'},choices,answer:0,question:'Hình nào tiếp theo?',explanation:'Tìm quy luật lặp lại của hình, màu và kích thước rồi chọn hình tiếp theo.'};
 }
 function generate(count=100){return Array.from({length:count},(_,i)=>make(i));}
 global.TTD_SHAPE_PATTERN_GENERATOR_V1={generate,make};
})(window);
