/* TTD Visual Renderer v1 — deterministic SVG visuals for shape-pattern choices. */
(function(global){
 const SH={circle:'<circle cx="50" cy="50" r="28"/>',square:'<rect x="22" y="22" width="56" height="56" rx="7"/>',triangle:'<polygon points="50,18 82,78 18,78"/>',star:'<polygon points="50,14 58,39 84,39 63,54 71,80 50,65 29,80 37,54 16,39 42,39"/>'};
 const CO={red:'#ef6675',blue:'#5b8def',green:'#43b77a',yellow:'#f2c94c'};
 function renderItem(x){if(!x||!SH[x.shape]||!CO[x.color])throw new Error('invalid_visual');const size=x.size==='large'?1.18:.82,fill=CO[x.color];return `<svg class="ttd-shape" viewBox="0 0 100 100" role="img" aria-label="${x.color} ${x.shape} ${x.size}"><g transform="translate(${50*(1-size)},${50*(1-size)}) scale(${size})" fill="${fill}" stroke="#3b3545" stroke-width="3">${SH[x.shape]}</g></svg>`;}
 function renderChoices(choices){return choices.map((c,i)=>`<button class="ttd-visual-choice" data-choice-id="${c.id||`choice-${i}`}" aria-label="Đáp án ${i+1}">${renderItem(c.visual||c)}</button>`).join('');}
 global.TTD_VISUAL_RENDERER_V1={renderItem,renderChoices};
})(window);
