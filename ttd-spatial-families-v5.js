/* TTD Spatial Families v5 — diverse deterministic models, not number variants */
(function(global){
  const q=[];
  const add=(id,family,level,cubes,question,view)=>q.push({id,type:'spatial',family,level,problem:{cubes,operation:'projection',view},question,view,cubes});
  const shapes=[
    [[0,0,0],[1,0,0],[0,1,0],[0,0,1]],
    [[0,0,0],[1,0,0],[2,0,0],[0,1,0],[0,0,1]],
    [[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,0,1]],
    [[0,0,0],[1,0,0],[1,1,0],[1,0,1],[2,0,1]],
    [[0,0,0],[0,1,0],[1,1,0],[1,0,1],[1,1,1],[2,0,1]],
    [[0,0,0],[1,0,0],[2,0,0],[0,1,0],[2,1,0],[1,0,1],[1,1,1]],
    [[0,0,0],[0,1,0],[1,0,0],[1,1,0],[0,0,1],[0,1,1],[1,0,1]],
    [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[2,0,0],[2,1,0],[1,0,1],[1,1,1]],
    [[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,1,0],[2,0,0],[2,0,1]],
    [[0,0,0],[1,0,0],[1,1,0],[2,1,0],[2,1,1],[1,0,1]]
  ];
  shapes.forEach((c,i)=>{
    ['top','front','side'].forEach((v,j)=>add(`SP_V5_${String(i+1).padStart(2,'0')}_${v.toUpperCase()}`,`${v}_view`,j<1?2:3,c,`Nhìn mô hình từ ${v==='top'?'trên xuống':v==='front'?'phía trước':'bên cạnh'}. Hình nào đúng?`,v));
  });
  global.TTD_SPATIAL_FAMILIES_V5=q;
})(window);
