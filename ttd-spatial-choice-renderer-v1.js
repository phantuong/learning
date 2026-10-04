/* Visual answer renderer for spatial questions */
(function(global){
  function render(choice,size=120){
    if(choice && choice.type==='cube_count'){
      const n=Number(choice.value); let cubes='';
      const cols=Math.min(4,Math.max(1,n)), rows=Math.ceil(n/cols), u=18;
      for(let i=0;i<n;i++){ const x=18+(i%cols)*u*1.7, y=22+Math.floor(i/cols)*u*1.5; cubes+=`<rect x="${x}" y="${y}" width="${u}" height="${u}" rx="3" fill="#b9d5ff" stroke="#557a9f"/>`; }
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" rx="14" fill="#f7f9fc"/>${cubes}</svg>`;
    }
    return `<div class="ttd-visual-text">${String(choice?.label??'')}</div>`;
  }
  global.TTD_SPATIAL_CHOICE_RENDERER_V1={render};
})(window);
