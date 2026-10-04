/* TTD Spatial Choice Generator v2 */
(function(global){
  const models=[
    {id:'SP_VISUAL_TOP_001',family:'top_view',level:2,cubes:[[0,0,0],[0,1,0],[1,0,0],[1,1,0],[0,0,1]],correct:'top'},
    {id:'SP_VISUAL_FRONT_001',family:'front_view',level:2,cubes:[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[1,0,1]],correct:'front'},
    {id:'SP_VISUAL_SIDE_001',family:'side_view',level:2,cubes:[[0,0,0],[0,1,0],[0,0,1],[1,0,1],[0,2,0]],correct:'side'}
  ];
  function uniqueChoices(correct,views=['top','front','side']){
    const arr=[correct,...views.filter(v=>v!==correct)];
    return arr.map(v=>({type:'projection',view:v}));
  }
  const bank=models.map(m=>({id:m.id,type:'spatial',family:m.family,level:m.level,problem:{cubes:m.cubes,operation:'projection',view:m.correct},question:m.family==='top_view'?'Nhìn mô hình từ trên xuống. Hình nào đúng?':m.family==='front_view'?'Nhìn mô hình từ phía trước. Hình nào đúng?':'Nhìn mô hình từ bên cạnh. Hình nào đúng?',choices:uniqueChoices(m.correct).map(c=>({...c,cubes:m.cubes})),answer:0,explanation:'Chỉ một hình chiếu khớp với mô hình đã cho.'}));
  global.TTD_SPATIAL_VISUAL_BANK_V2=bank;
})(window);
