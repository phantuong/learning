/* TTD Spatial Bank v4 — publish only validated visual questions */
(function(global){
  const models=[
    {id:'SP_BANK_TOP_001',family:'top_view',level:2,cubes:[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1]],question:'Nhìn mô hình từ trên xuống. Hình nào đúng?',correct:'top'},
    {id:'SP_BANK_FRONT_001',family:'front_view',level:2,cubes:[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[1,0,1]],question:'Nhìn mô hình từ phía trước. Hình nào đúng?',correct:'front'},
    {id:'SP_BANK_SIDE_001',family:'side_view',level:2,cubes:[[0,0,0],[0,1,0],[0,0,1],[1,0,1],[0,2,0]],question:'Nhìn mô hình từ bên cạnh. Hình nào đúng?',correct:'side'},
    {id:'SP_BANK_TOP_002',family:'top_view',level:3,cubes:[[0,0,0],[1,0,0],[2,0,0],[0,1,0],[2,1,0],[1,0,1]],question:'Nhìn mô hình từ trên xuống. Hình nào đúng?',correct:'top'},
    {id:'SP_BANK_FRONT_002',family:'front_view',level:3,cubes:[[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,1,0],[2,0,0]],question:'Nhìn mô hình từ phía trước. Hình nào đúng?',correct:'front'}
  ];
  function makeChoices(m){
    const base=m.cubes, max=Math.max(...base.map(c=>c[0]));
    const mirror=base.map(c=>[max-c[0],c[1],c[2]]);
    const missing=base.slice(0,-1);
    const extra=base.concat([[max+1,0,0]]);
    const variants=[{cubes:base,view:m.correct},{cubes:mirror,view:m.correct},{cubes:missing,view:m.correct},{cubes:extra,view:m.correct}];
    return variants.map((v,i)=>({...v,reason:i===0?'correct':i===1?'mirror':i===2?'missing_cube':'extra_cube'}));
  }
  const candidates=models.map(m=>({id:m.id,type:'spatial',family:m.family,level:m.level,question:m.question,problem:{cubes:m.cubes,operation:'projection',view:m.correct},choices:makeChoices(m),answer:0,explanation:'Quan sát vị trí và chiều cao của các khối rồi chọn hình chiếu khớp với mô hình.'}));
  const validated=global.TTD_SPATIAL_VALIDATOR_V4.validateBank(candidates);
  global.TTD_SPATIAL_BANK_V4=validated.filter(q=>q.validation.valid);
  global.TTD_SPATIAL_BANK_V4_REJECTED=validated.filter(q=>!q.validation.valid);
})(window);
