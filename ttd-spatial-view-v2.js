/* TTD Spatial View Engine v2 — top/front/side projections + structural comparison */
(function(global){
  const normalize=cubes=>(cubes||[]).map(c=>({x:c[0]??c.x,y:c[1]??c.y,z:c[2]??c.z}));
  function project(cubes,view){
    const cs=normalize(cubes), map=new Map();
    for(const c of cs){
      const k=view==='top'?`${c.x},${c.z}`:view==='front'?`${c.x},${c.y}`:`${c.z},${c.y}`;
      const h=view==='top'?c.y+1:view==='front'?c.z+1:c.x+1;
      map.set(k,Math.max(map.get(k)||0,h));
    }
    return [...map.entries()].map(([k,h])=>{const [a,b]=k.split(',').map(Number);return{a,b,h};}).sort((p,q)=>p.a-q.a||p.b-q.b);
  }
  function signature(cubes,view){ return project(cubes,view).map(p=>`${p.a},${p.b}:${p.h}`).join('|'); }
  function sameStructure(a,b,view){ return signature(a,view)===signature(b,view); }
  function render(cubes,view,size=190){
    const p=project(cubes,view); const maxA=Math.max(0,...p.map(x=>x.a)),maxB=Math.max(0,...p.map(x=>x.b)), u=Math.min(32,120/Math.max(maxA+1,maxB+1));
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-label="${view} view"><rect width="100%" height="100%" rx="18" fill="#f7f9fc"/>`;
    const ox=(size-(maxA+1)*u)/2, oy=size-35;
    for(const q of p){ const x=ox+q.a*u,y=oy-(q.b+1)*u; svg+=`<rect x="${x}" y="${y}" width="${u-2}" height="${u-2}" rx="3" fill="#b9d5ff" stroke="#557a9f"/>`; if(q.h>1) svg+=`<text x="${x+u/2}" y="${y+u*.68}" text-anchor="middle" font-size="11" font-weight="700" fill="#243447">${q.h}</text>`; }
    return svg+'</svg>';
  }
  global.TTD_SPATIAL_VIEW_V2={project,signature,sameStructure,render};
})(window);
