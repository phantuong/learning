/* TTD Shape Composition Engine v1 */
(function(global){
  const COLORS={edge:'#52667a',fill:'#dce9f7',piece:'#b9d5ff'};
  function normalize(parts){ return (parts||[]).map(p=>({x:p.x||0,y:p.y||0,w:p.w||1,h:p.h||1})); }
  function bounds(parts){ const a=normalize(parts); return {minX:Math.min(...a.map(p=>p.x),0),minY:Math.min(...a.map(p=>p.y),0),maxX:Math.max(...a.map(p=>p.x+p.w),1),maxY:Math.max(...a.map(p=>p.y+p.h),1)}; }
  function solve(model){
    const target=normalize(model.target), given=normalize(model.given), missing=model.missing||null;
    if(missing) return missing;
    const b=bounds(target), cells=[];
    for(let y=b.minY;y<b.maxY;y++) for(let x=b.minX;x<b.maxX;x++) cells.push(`${x},${y}`);
    const covered=new Set(); for(const p of given) for(let y=p.y;y<p.y+p.h;y++) for(let x=p.x;x<p.x+p.w;x++) covered.add(`${x},${y}`);
    return cells.filter(c=>!covered.has(c)).map(c=>{const [x,y]=c.split(',').map(Number);return{x,y,w:1,h:1};});
  }
  function render(model,size=190){
    const target=normalize(model.target), given=normalize(model.given), b=bounds(target); const scale=Math.min(120/(b.maxX-b.minX),120/(b.maxY-b.minY));
    const ox=(size-(b.maxX-b.minX)*scale)/2-b.minX*scale, oy=(size-(b.maxY-b.minY)*scale)/2-b.minY*scale;
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-label="shape composition">`;
    svg+=`<rect width="100%" height="100%" rx="18" fill="#f7f9fc"/>`;
    for(const p of target) svg+=`<rect x="${ox+p.x*scale}" y="${oy+p.y*scale}" width="${p.w*scale}" height="${p.h*scale}" fill="${COLORS.fill}" stroke="${COLORS.edge}" stroke-width="2"/>`;
    for(const p of given) svg+=`<rect x="${ox+p.x*scale}" y="${oy+p.y*scale}" width="${p.w*scale}" height="${p.h*scale}" fill="${COLORS.piece}" stroke="${COLORS.edge}" stroke-width="2"/>`;
    return svg+'</svg>';
  }
  global.TTD_COMPOSITION_V1={solve,render};
})(window);
