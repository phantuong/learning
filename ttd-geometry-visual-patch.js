(()=>{
  'use strict';
  // Geometry question visual hardening.
  // If the question says "N rows, M circles per row", render exactly N real rows.
  const renderRows=(rows,each)=>{
    const cols=Math.max(1,each);
    const cellW=Math.min(70, 560/cols);
    const cellH=58;
    const width=Math.max(300,cols*cellW+40);
    const height=Math.max(180,rows*cellH+45);
    const startX=(width-(cols*cellW))/2 + cellW/2;
    const startY=28 + cellH/2;
    let circles='';
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const cx=startX+c*cellW;
        const cy=startY+r*cellH;
        circles += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="17" fill="#182033"/>`;
      }
    }
    return `<svg class="diagram geometry-rows-visual" viewBox="0 0 ${width} ${height}" role="img" aria-label="${rows} hàng, mỗi hàng ${each} hình tròn">${circles}</svg>`;
  };

  const fix=()=>{
    const q=document.getElementById('question');
    const v=document.getElementById('visual');
    if(!q||!v)return;
    const text=(q.textContent||'').replace(/\s+/g,' ').trim();
    const m=text.match(/^Có\s+(\d+)\s+hàng,\s+mỗi hàng\s+có\s+(\d+)\s+hình tròn\.?$/i);
    if(!m)return;
    const rows=Number(m[1]), each=Number(m[2]);
    if(!Number.isInteger(rows)||!Number.isInteger(each)||rows<1||each<1||rows>8||each>10)return;
    v.innerHTML=renderRows(rows,each);
    v.dataset.geometryVisualFixed='1';
  };

  const start=()=>{
    fix();
    const card=document.getElementById('questionCard')||document.body;
    new MutationObserver(fix).observe(card,{subtree:true,childList:true,characterData:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
