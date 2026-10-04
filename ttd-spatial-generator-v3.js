/* TTD Spatial Generator v3 — model-first cube stacks and rotations + visual contract */
(function(global){
 function cube(id,x,y,z){return{id,x,y,z}}
 function attachVisual(q,renderedChoices){q.visual={type:q.problem.type==='cube_stack'?'cube_stack_3d':'cube_rotation_3d',sourceModel:'problem',choiceVisualIds:renderedChoices.map((_,i)=>`${q.id}-visual-${i}`),renderedChoices:renderedChoices.map((model,i)=>({id:`${q.id}-visual-${i}`,model})),answerVisualId:`${q.id}-visual-${q.answer}`});if(global.TTD_VISUAL_CONTRACT_V1)global.TTD_VISUAL_CONTRACT_V1.attach(q,q.visual);return q}
 function make(i,template){
   if(template==='stack'){
     const cells=[cube('C1',0,0,0),cube('C2',1,0,0),cube('C3',0,1,0),cube('C4',1,1,0)];
     if(i%3===0)cells.push(cube('C5',0,0,1));
     if(i%3===1)cells.push(cube('C5',1,1,1));
     const choices=[cells.length,cells.length+1,cells.length+2,cells.length-1];
     const q={id:`SP3_STACK_${String(i+1).padStart(3,'0')}`,type:'spatial_reasoning',family:'cube_stack',level:i%2?4:3,problem:{type:'cube_stack',cells},choices,answer:0,question:'Có tất cả bao nhiêu khối lập phương?',explanation:'Đếm từng vị trí lập phương trong mô hình.'};
     return attachVisual(q,choices);
   }
   const cubeModel={top:String((i%6)+1),bottom:String((i+3)%6+1),front:String((i+1)%6+1),back:String((i+4)%6+1),left:String((i+2)%6+1),right:String((i+5)%6+1)};
   const turns=(i%3)+1,axis=['x','y','z'][i%3];
   const expected=global.TTD_SPATIAL_CUBE_V2?global.TTD_SPATIAL_CUBE_V2.rotate(cubeModel,axis,turns):cubeModel;
   const choices=[expected,cubeModel,global.TTD_SPATIAL_CUBE_V2?global.TTD_SPATIAL_CUBE_V2.rotate(cubeModel,axis,(turns+1)%4):cubeModel,global.TTD_SPATIAL_CUBE_V2?global.TTD_SPATIAL_CUBE_V2.rotate(cubeModel,axis,(turns+2)%4):cubeModel];
   const q={id:`SP3_ROT_${String(i+1).padStart(3,'0')}`,type:'spatial_reasoning',family:'cube_rotation',level:4,problem:{type:'cube_rotation',cube:cubeModel,axis,turns},choices,answer:0,question:'Khối lập phương được xoay. Hình nào biểu diễn đúng vị trí mới?',explanation:'Các ký hiệu đi theo các mặt của khối khi xoay.'};
   return attachVisual(q,choices);
 }
 function generate(count=24){return Array.from({length:count},(_,i)=>make(i,i%3===0?'stack':'rotation'));}
 global.TTD_SPATIAL_GENERATOR_V3={generate,make};
})(window);
