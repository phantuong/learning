/* TTD Shape Pattern Grammar v2 — composable, model-first patterns */
(function(global){
 const SH=['circle','square','triangle','star']; const CO=['red','blue','green','yellow'];
 const item=(shape,color,size)=>({shape,color,size}); const cycle=(arr,n)=>arr[n%arr.length];
 function build(i,rule){
  const base=i%4,a=cycle(SH,base),b=cycle(SH,base+1),c=cycle(SH,base+2),ca=cycle(CO,base),cb=cycle(CO,base+1);let seq=[],answer;
  if(rule==='AB'){seq=[item(a,ca,'small'),item(b,cb,'small'),item(a,ca,'small'),item(b,cb,'small')];answer=item(a,ca,'small');}
  if(rule==='ABC'){seq=[item(a,ca,'small'),item(b,cb,'small'),item(c,cycle(CO,base+2),'small'),item(a,ca,'small'),item(b,cb,'small')];answer=item(c,cycle(CO,base+2),'small');}
  if(rule==='AAB'){seq=[item(a,ca,'small'),item(a,ca,'small'),item(b,cb,'small'),item(a,ca,'small'),item(a,ca,'small')];answer=item(b,cb,'small');}
  if(rule==='ABB'){seq=[item(a,ca,'small'),item(b,cb,'small'),item(b,cb,'small'),item(a,ca,'small'),item(b,cb,'small')];answer=item(b,cb,'small');}
  if(rule==='AABB'){seq=[item(a,ca,'small'),item(a,ca,'small'),item(b,cb,'small'),item(b,cb,'small'),item(a,ca,'small'),item(a,ca,'small')];answer=item(b,cb,'small');}
  if(rule==='SIZE_ALT'){seq=[item(a,ca,'small'),item(a,ca,'large'),item(b,cb,'small'),item(b,cb,'large'),item(a,ca,'small')];answer=item(a,ca,'large');}
  if(rule==='COLOR_ALT'){seq=[item(a,ca,'small'),item(a,cb,'small'),item(b,ca,'small'),item(b,cb,'small'),item(a,ca,'small')];answer=item(a,cb,'small');}
  if(rule==='SHAPE_COLOR_COMBO'){seq=[item(a,ca,'small'),item(b,ca,'small'),item(a,cb,'small'),item(b,cb,'small'),item(a,ca,'small'),item(b,ca,'small')];answer=item(a,cb,'small');}
  const wrong=[item(c,cycle(CO,base+3),'small'),item(b,ca,'large'),item(a,cycle(CO,base+2),'large')];
  return {id:`PAT2_${String(i+1).padStart(4,'0')}`,type:'shape_pattern',family:rule,level:['AB','AAB','ABB'].includes(rule)?1:['ABC','AABB','SIZE_ALT','COLOR_ALT'].includes(rule)?2:3,problem:{type:'shape_pattern',sequence:seq,rule},visual:{type:'shape_choices',choiceVisuals:[answer,...wrong],choiceVisualIds:['v0','v1','v2','v3'],answerVisualId:'v0'},choices:[answer,...wrong],answer:0,question:'Hình nào tiếp theo?',explanation:`Tìm quy luật ${rule} của hình, màu và kích thước.`};
 }
 const rules=['AB','ABC','AAB','ABB','AABB','SIZE_ALT','COLOR_ALT','SHAPE_COLOR_COMBO'];
 function generate(count=200){return Array.from({length:count},(_,i)=>build(i,rules[i%rules.length]));}
 global.TTD_SHAPE_PATTERN_GRAMMAR_V2={generate,build,rules};
})(window);
