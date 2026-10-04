/* TTD Spatial Question Families v2 */
(function(global){
  const C={
    A:[[0,0,0],[1,0,0],[0,1,0],[1,1,0]],
    B:[[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,1,0]],
    C:[[0,0,0],[1,0,0],[0,0,1],[0,1,0],[1,1,0],[0,1,1]]
  };
  const families=[
    {id:'SP_VIEW_TOP_001',family:'top_view',level:2,cubes:C.B,question:'Hình nhìn từ trên xuống của mô hình này là hình nào?',answer:'top'},
    {id:'SP_VIEW_FRONT_001',family:'front_view',level:2,cubes:C.C,question:'Hình nhìn từ phía trước của mô hình này là hình nào?',answer:'front'},
    {id:'SP_VIEW_SIDE_001',family:'side_view',level:2,cubes:C.C,question:'Hình nhìn từ bên cạnh của mô hình này là hình nào?',answer:'side'},
    {id:'SP_COMPARE_001',family:'projection_compare',level:3,cubes:C.A,question:'Hai mô hình có cùng hình nhìn từ trên xuống không?',answer:true},
    {id:'SP_MISSING_001',family:'missing_cube',level:3,target:[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1]],missing:[1,0,1],question:'Vị trí nào còn thiếu một khối để hoàn thành mô hình?',answer:[1,0,1]}
  ];
  global.TTD_SPATIAL_FAMILIES_V2=families;
})(window);
