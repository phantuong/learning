/* TTD Engine Tests v1 — deterministic regression suite for spatial/matrix/composition */
(function(global){
  const results=[];
  function test(name, fn){
    try{ const value=fn(); results.push({name,pass:value===true,error:value===true?'':String(value)}); }
    catch(e){ results.push({name,pass:false,error:e.message}); }
  }
  function eq(a,b){ return JSON.stringify(a)===JSON.stringify(b); }

  test('spatial count 2x2x2',()=>TTD_SPATIAL_V1.solve({type:'spatial',operation:'count',cubes:Array.from({length:8},(_,i)=>[i%2,Math.floor(i/4),Math.floor(i/2)%2])})===8);
  test('spatial hidden cube',()=>TTD_SPATIAL_V1.solve({type:'spatial',operation:'hidden',cubes:[[0,0,0],[0,0,1],[1,0,0]]})===1);
  test('spatial rotation preserves cube count',()=>TTD_SPATIAL_V1.solve({type:'spatial',operation:'rotate_count',turns:1,cubes:[[0,0,0],[1,0,0],[0,1,0]]})===3);
  test('spatial rotateY changes coordinates deterministically',()=>eq(TTD_SPATIAL_V1.rotateY([[0,0,0],[1,0,0]],1),[{x:0,y:0,z:0},{x:0,y:0,z:1}]));

  test('matrix missing cell arithmetic',()=>TTD_MATRIX_V1.solve({grid:[[1,2,3],[2,3,4],[3,4,null]]})===5);
  test('matrix does not solve ambiguous nonnumeric grid',()=>TTD_MATRIX_V1.solve({grid:[['circle','square',null],['square','circle','square'],['circle','square','circle']]})===null);

  test('composition missing single cell',()=>eq(TTD_COMPOSITION_V1.solve({target:[{x:0,y:0,w:2,h:1}],given:[{x:0,y:0,w:1,h:1}]}),[{x:1,y:0,w:1,h:1}]));
  test('composition full target has no missing cells',()=>eq(TTD_COMPOSITION_V1.solve({target:[{x:0,y:0,w:1,h:1}],given:[{x:0,y:0,w:1,h:1}]}),[]));

  global.TTD_ENGINE_TESTS_V1={run(){ return results; },summary(){ const passed=results.filter(x=>x.pass).length; return {passed,total:results.length,failed:results.length-passed}; }};
})(window);
