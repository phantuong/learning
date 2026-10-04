/* TTD Spatial Bank v5 — 30 projection questions, publish through validator */
(function(global){
  function mirror(cubes){const m=Math.max(...cubes.map(c=>c[0]));return cubes.map(c=>[m-c[0],c[1],c[2]]);}
  function remove(cubes,n){return cubes.slice(0,Math.max(1,cubes.length-n));}
  function add(cubes){const s=new Set(cubes.map(c=>c.join(',')));for(let x=0;x<5;x++){const p=[x,0,0];if(!s.has(p.join(',')))return cubes.concat([p]);}return cubes;}
  function choices(m){const base=m.cubes, variants=[base,mirror(base),remove(base,1),add(base)]; const seen=new Set(); return variants.map((c,i)=>({cubes:c,view:m.view,reason:['correct','mirror','missing_cube','extra_cube'][i]})).filter(c=>{const sig=TTD_SPATIAL_VIEW_V2.signature(c.cubes,c.view);if(seen.has(sig))return false;seen.add(sig);return true;});}
  const candidates=global.TTD_SPATIAL_FAMILIES_V5.map(m=>({id:m.id,type:'spatial',family:m.family,level:m.level,question:m.question,problem:m.problem,choices:choices(m),answer:0,explanation:'Quan sát vị trí và độ cao của các khối rồi chọn hình chiếu phù hợp.'})).filter(q=>q.choices.length===4);
  const validated=global.TTD_SPATIAL_VALIDATOR_V4.validateBank(candidates);
  global.TTD_SPATIAL_BANK_V5=validated.filter(q=>q.validation.valid);
  global.TTD_SPATIAL_BANK_V5_REJECTED=validated.filter(q=>!q.validation.valid);
})(window);
