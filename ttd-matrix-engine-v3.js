/* TTD Matrix Engine v3 — true row/column rule composition */
(function(global){
  const clone=x=>JSON.parse(JSON.stringify(x));
  const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const addCount=(a,b)=>({...a,count:(a.count||1)+(b.count||1)});
  const cycle=(value,list,step=1)=>list[(list.indexOf(value)+step+list.length)%list.length];
  const applyRule=(cells,rule,opt={})=>{
    if(rule==='add_count') return addCount(cells[0],cells[1]);
    if(rule==='subtract_count') return {...cells[0],count:Math.max(1,(cells[0].count||1)-(cells[1].count||1))};
    if(rule==='shape_next') return {...cells[1],shape:cycle(cells[1].shape,opt.shapes||['circle','square','triangle'])};
    if(rule==='color_next') return {...cells[1],color:cycle(cells[1].color,opt.colors||['red','blue','green'])};
    if(rule==='combine_attributes') return {shape:cells[0].shape,color:cells[1].color,count:(cells[0].count||1)};
    return null;
  };
  function solve3x3(grid,rowRule,colRule,opt={}){
    const r=grid.map(row=>row.map(x=>x?clone(x):null));
    // Prefer the explicitly defined row rule for row completion, then verify with column rule.
    const rowKnown=r[2].slice(0,2); let candidate=applyRule(rowKnown,rowRule,opt);
    if(!candidate) return null;
    const colKnown=[r[0][2],r[1][2]].filter(Boolean);
    if(colKnown.length===2){const byCol=applyRule(colKnown,colRule,opt); if(byCol && !eq(candidate,byCol)) return {candidate,byColumn:byCol,consistent:false};}
    return {candidate,consistent:true};
  }
  function renderCell(cell,size=90){
    if(!cell)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90" height="90"><rect width="90" height="90" rx="12" fill="#f7f9fc"/><text x="45" y="55" text-anchor="middle" font-size="30" font-weight="700">?</text></svg>';
    const color=cell.color||'#9ec5ff',shape=cell.shape||'circle',count=Math.max(1,cell.count||1), cols=Math.min(3,count); let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" rx="12" fill="#f7f9fc"/>`;
    for(let i=0;i<count;i++){const x=14+(i%cols)*25,y=15+Math.floor(i/cols)*25;if(shape==='square')s+=`<rect x="${x}" y="${y}" width="18" height="18" rx="3" fill="${color}"/>`;else if(shape==='triangle')s+=`<path d="M${x+9} ${y}L${x+18} ${y+18}L${x} ${y+18}Z" fill="${color}"/>`;else s+=`<circle cx="${x+9}" cy="${y+9}" r="9" fill="${color}"/>`;} return s+'</svg>';
  }
  global.TTD_MATRIX_V3={solve3x3,applyRule,renderCell,eq};
})(window);
