/* TTD Spatial Engine v1 — deterministic cube models + orthographic SVG renderer */
(function(global){
  const COLORS = { top:'#e8f2ff', front:'#b9d5ff', side:'#8fb8e8', edge:'#557a9f', mark:'#243447' };
  function key(x,y,z){ return `${x},${y},${z}`; }
  function normalize(cubes){ return cubes.map(c=>({x:c[0],y:c[1],z:c[2]})); }
  function count(cubes){ return cubes.length; }
  function rotateY(cubes, turns){
    let t=((turns%4)+4)%4, a=normalize(cubes);
    while(t--) a=a.map(c=>({x:-c.z,y:c.y,z:c.x}));
    const minX=Math.min(...a.map(c=>c.x)), minZ=Math.min(...a.map(c=>c.z));
    return a.map(c=>({x:c.x-minX,y:c.y,z:c.z-minZ}));
  }
  function rotateX(cubes, turns){
    let t=((turns%4)+4)%4, a=normalize(cubes);
    while(t--) a=a.map(c=>({x:c.x,y:-c.z,z:c.y}));
    const minY=Math.min(...a.map(c=>c.y)), minZ=Math.min(...a.map(c=>c.z));
    return a.map(c=>({x:c.x,y:c.y-minY,z:c.z-minZ}));
  }
  function occupied(cubes){ return new Set(cubes.map(c=>key(c.x,c.y,c.z))); }
  function hidden(cubes){
    const s=occupied(cubes), out=[];
    for(const c of cubes){
      if(s.has(key(c.x,c.y,c.z+1))) out.push(c);
    }
    return out;
  }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function render(model, opts={}){
    const cubes=normalize(model.cubes||[]), size=opts.size||180, u=opts.unit||30;
    const sorted=[...cubes].sort((a,b)=>(a.x+a.z+a.y)-(b.x+b.z+b.y));
    const proj=c=>({x:size/2+(c.x-c.z)*u*0.72,y:size*0.72-(c.y)*u-(c.x+c.z)*u*0.36});
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-label="cube model">`;
    svg+=`<rect width="100%" height="100%" rx="18" fill="#f7f9fc"/>`;
    for(const c of sorted){ const p=proj(c), w=u*.72, h=u*.36, v=u;
      const top=`${p.x},${p.y} ${p.x+w},${p.y+h} ${p.x},${p.y+h*2} ${p.x-w},${p.y+h}`;
      const left=`${p.x-w},${p.y+h} ${p.x},${p.y+h*2} ${p.x},${p.y+h*2+v} ${p.x-w},${p.y+h+v}`;
      const right=`${p.x},${p.y+h*2} ${p.x+w},${p.y+h} ${p.x+w},${p.y+h+v} ${p.x},${p.y+h*2+v}`;
      svg+=`<polygon points="${top}" fill="${COLORS.top}" stroke="${COLORS.edge}"/>`;
      svg+=`<polygon points="${left}" fill="${COLORS.front}" stroke="${COLORS.edge}"/>`;
      svg+=`<polygon points="${right}" fill="${COLORS.side}" stroke="${COLORS.edge}"/>`;
      if(model.mark){ svg+=`<text x="${p.x}" y="${p.y+h*1.35}" text-anchor="middle" font-size="12" font-weight="700" fill="${COLORS.mark}">${esc(model.mark)}</text>`; }
    }
    svg+='</svg>'; return svg;
  }
  function solve(model){
    const cubes=normalize(model.cubes||[]);
    if(model.operation==='count') return count(cubes);
    if(model.operation==='hidden') return hidden(cubes).length;
    if(model.operation==='rotate_count') return rotateY(cubes,model.turns||1).length;
    return count(cubes);
  }
  global.TTD_SPATIAL_V1={count,rotateY,rotateX,hidden,render,solve};
})(window);
