/* TTD Spatial Distractors v3 — misconception-based visual distractors */
(function(global){
  const clone=x=>JSON.parse(JSON.stringify(x));
  function shift(cubes,dx,dz){return cubes.map(c=>[c[0]+dx,c[1],c[2]+dz]);}
  function removeOne(cubes,index){return cubes.filter((_,i)=>i!==index);}
  function addOne(cubes){const s=new Set(cubes.map(c=>c.join(','))); for(const c of cubes){const p=[c[0]+1,c[1],c[2]];if(!s.has(p.join(',')))return cubes.concat([p]);} return cubes.concat([[99,0,0]]);}
  function mirrorX(cubes){const max=Math.max(...cubes.map(c=>c[0]));return cubes.map(c=>[max-c[0],c[1],c[2]]);}
  function wrongHeight(cubes){const a=clone(cubes); if(a.length)return a.map((c,i)=>i===a.length-1?[c[0],c[1]+1,c[2]]:c); return a;}
  function choices(model,correctView){
    const base=clone(model.cubes); const variants=[
      {id:'correct',cubes:base,view:correctView,reason:'correct'},
      {id:'mirror',cubes:mirrorX(base),view:correctView,reason:'mirror'},
      {id:'missing',cubes:removeOne(base,base.length-1),view:correctView,reason:'missing_cube'},
      {id:'extra',cubes:addOne(base),view:correctView,reason:'extra_cube'}
    ];
    const seen=new Set(); return variants.filter(v=>{const k=JSON.stringify(v.cubes)+'|'+v.view;if(seen.has(k))return false;seen.add(k);return true;});
  }
  const models=[
    {id:'SP_DISTRACTOR_001',family:'top_view',level:3,cubes:[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1]],correctView:'top'},
    {id:'SP_DISTRACTOR_002',family:'front_view',level:3,cubes:[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[1,0,1]],correctView:'front'},
    {id:'SP_DISTRACTOR_003',family:'side_view',level:3,cubes:[[0,0,0],[0,1,0],[0,0,1],[1,0,1],[0,2,0]],correctView:'side'}
  ];
  global.TTD_SPATIAL_DISTRACTOR_V3=models.map(m=>({...m,choices:choices(m,m.correctView)}));
})(window);
