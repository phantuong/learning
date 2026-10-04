/* TTD Matrix Engine v2 — model-first visual matrix reasoning */
(function(global){
  function clone(x){return JSON.parse(JSON.stringify(x));}
  function key(cell){return JSON.stringify(cell);}
  const RULES={
    quantity_add:(a,b)=>({shape:a.shape,color:a.color,count:a.count+b.count}),
    quantity_progression:(a,b)=>({shape:a.shape,color:a.color,count:b.count+(b.count-a.count)}),
    color_cycle:(a,b,colors)=>({shape:b.shape,color:colors[(colors.indexOf(b.color)+1)%colors.length],count:b.count}),
    shape_cycle:(a,b,shapes)=>({shape:shapes[(shapes.indexOf(b.shape)+1)%shapes.length],color:b.color,count:b.count}),
    same_row_count:(a)=>({shape:a.shape,color:a.color,count:a.count})
  };
  function solve(grid,rule,options={}){
    const g=clone(grid), rows=g.length, cols=g[0].length;
    if(rule==='quantity_add'){const a=g[0][0],b=g[0][1];return RULES.quantity_add(a,b);}
    if(rule==='quantity_progression'){return RULES.quantity_progression(g[0][0],g[0][1]);}
    if(rule==='color_cycle')return RULES.color_cycle(g[0][0],g[0][1],options.colors||['red','blue','green']);
    if(rule==='shape_cycle')return RULES.shape_cycle(g[0][0],g[0][1],options.shapes||['circle','square','triangle']);
    return null;
  }
  function renderCell(cell,size=90){const shape=cell.shape||'circle',color=cell.color||'#b9d5ff',count=cell.count||1;let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" rx="12" fill="#f7f9fc"/>`;const cols=Math.min(3,count);for(let i=0;i<count;i++){const x=20+(i%cols)*25,y=20+Math.floor(i/cols)*25;if(shape==='square')s+=`<rect x="${x}" y="${y}" width="18" height="18" rx="3" fill="${color}"/>`;else if(shape==='triangle')s+=`<path d="M${x+9} ${y} L${x+18} ${y+18} L${x} ${y+18} Z" fill="${color}"/>`;else s+=`<circle cx="${x+9}" cy="${y+9}" r="9" fill="${color}"/>`;}return s+'</svg>';}
  global.TTD_MATRIX_V2={solve,renderCell,RULES};
})(window);
