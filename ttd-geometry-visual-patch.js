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

  // Simple shape-identification questions should not repeat the question
  // inside the visual area.  Show only the actual shape as a visual aid.
  // This also fixes the old wording bug: "Hình hình vuông...".
  const renderSimpleShape=(name)=>{
    const colors={
      'tam giác':'#f4c542',
      'hình vuông':'#6d9df5',
      'hình chữ nhật':'#62b38c'
    };
    const fill=colors[name]||'#6d9df5';
    let shape='';
    if(name==='tam giác'){
      shape=`<path d="M150 28 L255 178 L45 178 Z" fill="${fill}" stroke="#23304a" stroke-width="6" stroke-linejoin="round"/>`;
    }else if(name==='hình chữ nhật'){
      shape=`<rect x="55" y="48" width="190" height="120" rx="6" fill="${fill}" stroke="#23304a" stroke-width="6"/>`;
    }else{
      shape=`<rect x="65" y="35" width="170" height="170" rx="6" fill="${fill}" stroke="#23304a" stroke-width="6"/>`;
    }
    return `<svg class="diagram geometry-simple-shape" viewBox="0 0 300 235" role="img" aria-label="${name}">${shape}</svg>`;
  };

  const fix=()=>{
    const q=document.getElementById('question');
    const v=document.getElementById('visual');
    if(!q||!v)return;
    const text=(q.textContent||'').replace(/\s+/g,' ').trim();

    // Fix: "Hình hình vuông có bao nhiêu cạnh?" ->
    // "Hình vuông có bao nhiêu cạnh?" and remove the redundant text visual.
    const shapeMatch=text.match(/^Hình\s+hình\s+(tam giác|vuông|chữ nhật)\s+có bao nhiêu cạnh\?$/i);
    if(shapeMatch){
      const raw=shapeMatch[1].toLowerCase();
      const name=raw==='vuông'?'hình vuông':raw==='tam giác'?'tam giác':'hình chữ nhật';
      q.textContent=`${name==='tam giác'?'Hình tam giác':name[0].toUpperCase()+name.slice(1)} có bao nhiêu cạnh?`;
      v.innerHTML=renderSimpleShape(name);
      v.dataset.geometryVisualFixed='simple-shape';
      return;
    }

    const m=text.match(/^Có\s+(\d+)\s+hàng,\s+mỗi hàng\s+có\s+(\d+)\s+hình tròn\.?$/i);
    if(!m)return;
    const rows=Number(m[1]), each=Number(m[2]);
    if(!Number.isInteger(rows)||!Number.isInteger(each)||rows<1||each<1||rows>8||each>10)return;
    v.innerHTML=renderRows(rows,each);
    v.dataset.geometryVisualFixed='rows';
  };

  const start=()=>{
    fix();
    const card=document.getElementById('questionCard')||document.body;
    new MutationObserver(fix).observe(card,{subtree:true,childList:true,characterData:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
