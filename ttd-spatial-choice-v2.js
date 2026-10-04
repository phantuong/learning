/* TTD Spatial Choice Renderer v2 — projection choices are actual visual shapes */
(function(global){
  function renderProjection(cubes,view,size=130){
    const p=global.TTD_SPATIAL_VIEW_V2.project(cubes,view); const maxA=Math.max(0,...p.map(x=>x.a)), maxB=Math.max(0,...p.map(x=>x.b)); const u=Math.min(30,90/Math.max(maxA+1,maxB+1)); const ox=(size-(maxA+1)*u)/2, oy=size-22;
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-label="${view} projection">`;
    svg+=`<rect width="100%" height="100%" rx="14" fill="#f7f9fc"/>`;
    for(const q of p){const x=ox+q.a*u,y=oy-(q.b+1)*u; svg+=`<rect x="${x+1}" y="${y+1}" width="${u-3}" height="${u-3}" rx="3" fill="#b9d5ff" stroke="#557a9f"/>`; if(q.h>1) svg+=`<text x="${x+u/2}" y="${y+u*.65}" text-anchor="middle" font-size="11" font-weight="700" fill="#243447">${q.h}</text>`;}
    return svg+'</svg>';
  }
  function renderCubeModel(cubes,size=130){
    return global.TTD_SPATIAL_V1.render({cubes:cubes}, {size});
  }
  function render(choice,size=130){
    if(choice.type==='projection') return renderProjection(choice.cubes,choice.view,size);
    if(choice.type==='cube_model') return renderCubeModel(choice.cubes,size);
    return `<div class="ttd-visual-text">${choice.label||''}</div>`;
  }
  global.TTD_SPATIAL_CHOICE_V2={render,renderProjection,renderCubeModel};
})(window);
