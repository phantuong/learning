/* TTD Multi-Condition Generator v2 — model-first + visual contract */
(function(global){
 const SHAPES=['circle','square','triangle','star'], COLORS=['red','blue','green','yellow'], POS=['top','middle','bottom'];
 function obj(id,shape,color,position,count){return{id,shape,color,position,count}}
 function mutate(a,v){const x={...a};if(v===1)x.color=COLORS[(COLORS.indexOf(x.color)+1)%4];if(v===2)x.shape=SHAPES[(SHAPES.indexOf(x.shape)+1)%4];if(v===3)x.position=POS[(POS.indexOf(x.position)+1)%3];if(v===4)x.count=x.count===1?2:1;return x}
 function make(id,level,template,i){
   const base=obj('target',SHAPES[i%4],COLORS[(i*2)%4],POS[(i+level)%3],1+(i%2));
   let conditions,question;
   if(template==='shape_color'){conditions=[{shape:base.shape},{color:base.color}];question='Hãy chọn hình thỏa mãn cả 2 điều kiện: đúng hình và đúng màu.'}
   else if(template==='shape_position'){conditions=[{shape:base.shape},{position:base.position}];question='Hãy chọn hình thỏa mãn cả 2 điều kiện: đúng hình và đúng vị trí.'}
   else if(template==='three_attributes'){conditions=[{shape:base.shape},{color:base.color},{position:base.position}];question='Hãy chọn hình thỏa mãn cả 3 điều kiện: đúng hình, đúng màu và đúng vị trí.'}
   else{conditions=[{shape:base.shape},{color:base.color},{position:base.position},{count:base.count}];question='Hãy chọn hình thỏa mãn tất cả 4 điều kiện.'}
   const choices=[base,mutate(base,1),mutate(base,2),mutate(base,3)];if(template==='count')choices[3]=mutate(base,4);
   const problem={objects:choices.map((x,n)=>({...x,id:'O'+n})),conditions};
   const visualChoices=choices.map((x,n)=>({id:`visual-${id}-${n}`,shape:x.shape,color:x.color,position:x.position,count:x.count}));
   const q={id,type:'multi_condition',family:template,level,problem,choices,answer:0,question,explanation:'Kiểm tra từng điều kiện lần lượt: hình, màu, vị trí và số lượng nếu có.',visual:{type:'attribute_choices',sourceModel:'problem.objects',choiceVisualIds:visualChoices.map(x=>x.id),renderedChoices:visualChoices,answerVisualId:visualChoices[0].id}};
   if(global.TTD_VISUAL_CONTRACT_V1)global.TTD_VISUAL_CONTRACT_V1.attach(q,q.visual);
   return q;
 }
 function generate(count=32){const t=['shape_color','shape_position','three_attributes','count'];return Array.from({length:count},(_,i)=>make(`MCL2_${String(i+1).padStart(3,'0')}`,i<8?2:i<16?3:i<24?4:5,t[i%4],i))}
 global.TTD_MULTICONDITION_GENERATOR_V2={generate,make};
})(window);
