/* TTD Spatial Generator v1 — model-first visual cube questions */
(function(global){
  const variants=[];
  const models=[
    {id:'SP_COUNT_2X2X2',family:'cube_count',level:1,cubes:[[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[1,1,0],[0,1,1],[1,1,1]],question:'Có bao nhiêu khối lập phương?',answer:8,choices:[6,7,8,9]},
    {id:'SP_COUNT_STACK_1',family:'cube_count',level:2,cubes:[[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,1,0]],question:'Có tất cả bao nhiêu khối lập phương?',answer:5,choices:[4,5,6,7]},
    {id:'SP_HIDDEN_1',family:'hidden_cubes',level:2,cubes:[[0,0,0],[0,1,0],[0,0,1],[1,0,0],[1,0,1],[1,1,1]],question:'Có bao nhiêu khối có một khối khác nằm ngay phía trên?',answer:3,choices:[2,3,4,5]},
    {id:'SP_HIDDEN_2',family:'hidden_cubes',level:3,cubes:[[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,1,0],[1,0,1],[1,1,1],[2,0,0]],question:'Có bao nhiêu khối bị che bởi một khối ở phía trên?',answer:3,choices:[2,3,4,5]},
    {id:'SP_ROTATE_1',family:'rotation_invariant_count',level:2,cubes:[[0,0,0],[1,0,0],[0,0,1],[1,0,1],[0,1,0],[1,1,0]],question:'Sau khi xoay mô hình, số khối lập phương có thay đổi không?',answer:'Không, vẫn là 6',choices:['Không, vẫn là 6','Có, còn 5','Có, thành 7','Không, còn 4']}
  ];
  function visualChoice(value){
    if(typeof value==='number') return {type:'cube_count',value,label:String(value)};
    return {type:'text',value,label:value};
  }
  models.forEach(m=>variants.push({...m,type:'spatial',problem:{cubes:m.cubes,operation:m.family==='hidden_cubes'?'hidden':m.family==='rotation_invariant_count'?'rotate_count':'count'},choices:m.choices.map(visualChoice),answer:visualChoice(m.answer),explanation:`Đáp án đúng là ${m.answer}.`}));
  global.TTD_SPATIAL_GENERATED_V1=variants;
})(window);
