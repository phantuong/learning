/* TTD Pattern Semantic v1 — canonical signatures for duplicate detection */
(function(global){
 function attrs(x){return `${x.shape}|${x.color}|${x.size}`}
 function signature(q){const p=q.problem||{};if(p.type!=='shape_pattern')return `${q.type}|${q.family||''}`;return `${q.family}|${(p.sequence||[]).map(attrs).join('>')}|answer:${attrs(q.choices[q.answer])}`}
 function structuralSignature(q){const p=q.problem||{};if(p.type!=='shape_pattern')return signature(q);const first={};let next=0;const norm=(x)=>{const k=attrs(x);if(first[k]===undefined)first[k]=`A${next++}`;return first[k]};return `${p.rule}|${(p.sequence||[]).map(norm).join('>')}|answer:${norm(q.choices[q.answer])}`}
 function similarity(a,b){const sa=structuralSignature(a),sb=structuralSignature(b);if(sa===sb)return 1;const aa=sa.split('|')[1]||'',bb=sb.split('|')[1]||'';const n=Math.max(aa.length,bb.length);if(!n)return 0;let same=0;for(let i=0;i<Math.min(aa.length,bb.length);i++)if(aa[i]===bb[i])same++;return same/n}
 function analyze(items){const exact=new Map(),structural=new Map();for(const q of items){const s=signature(q),ss=structuralSignature(q);if(!exact.has(s))exact.set(s,[]);exact.get(s).push(q.id);if(!structural.has(ss))structural.set(ss,[]);structural.get(ss).push(q.id)}const structuralDuplicates=[...structural.entries()].filter(([,ids])=>ids.length>1).map(([signature,ids])=>({signature,ids}));return{exactDuplicates:[...exact.values()].filter(x=>x.length>1),structuralDuplicates,uniqueStructural:structural.size};}
 global.TTD_PATTERN_SEMANTIC_V1={signature,structuralSignature,similarity,analyze};
})(window);
