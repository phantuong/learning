/* TTD Matrix Engine v1 — deterministic row/column rule solver */
(function(global){
  const clone=x=>JSON.parse(JSON.stringify(x));
  function solve(grid){
    const g=clone(grid), n=g.length;
    const candidates=[];
    // Addition rule for numeric matrices: cell(r,c)=rowBase[r]+colBase[c].
    if(g.every(row=>row.every(v=>v===null||typeof v==='number'))){
      for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(g[r][c]!==null){
        for(let rr=0;rr<n;rr++) if(g[rr][c]!==null) candidates.push(g[r][c]-g[rr][c]);
      }
      // Simple diagonal/row progression fallback.
      const known=[]; for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(g[r][c]!==null) known.push(g[r][c]);
      const missing=[]; for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(g[r][c]===null) missing.push([r,c]);
      if(missing.length===1){
        const [r,c]=missing[0];
        if(c>0&&g[r][c-1]!=null&&r>0&&g[r-1][c]!=null&&g[r-1][c-1]!=null){
          return g[r][c-1]+g[r-1][c]-g[r-1][c-1];
        }
      }
    }
    return null;
  }
  function render(grid, renderer){
    const n=grid.length, cell=56, size=n*cell;
    let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-label="matrix">`;
    svg+=`<rect width="100%" height="100%" rx="16" fill="#f7f9fc"/>`;
    for(let r=0;r<n;r++) for(let c=0;c<n;c++){
      const x=c*cell,y=r*cell; svg+=`<rect x="${x+2}" y="${y+2}" width="${cell-4}" height="${cell-4}" rx="8" fill="white" stroke="#b7c3d0"/>`;
      const v=grid[r][c]; if(v!==null){
        if(renderer) svg+=renderer(v,x+cell/2,y+cell/2,cell);
        else svg+=`<text x="${x+cell/2}" y="${y+cell*.64}" text-anchor="middle" font-size="24" font-weight="700" fill="#243447">${v}</text>`;
      } else svg+=`<text x="${x+cell/2}" y="${y+cell*.64}" text-anchor="middle" font-size="26" font-weight="700" fill="#7c8b9a">?</text>`;
    }
    return svg+'</svg>';
  }
  global.TTD_MATRIX_V1={solve,render};
})(window);
