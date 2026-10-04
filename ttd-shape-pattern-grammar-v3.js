/* TTD Shape Pattern Grammar v3 — parameterized structural diversity */
(function(global){
 const SH=['circle','square','triangle','star'],CO=['red','blue','green','yellow'],SZ=['small','large'];
 const item=(shape,color,size)=>({shape,color,size}), cycle=(a,n)=>a[((n%a.length)+a.length)%a.length];
 function familyPattern(i,kind){const b=i%4,a=cycle(SH,b),bb=cycle(SH,b+1),c=cycle(SH,b+2),ca=cycle(CO,b),cb=cycle(CO,b+1),cc=cycle(CO,b+2);let s=[],ans;
  if(kind==='AB'){const flip=i%2;s=[item(flip?a:bb,ca,'small'),item(flip?bb:a,cb,'small'),item(flip?a:bb,ca,'small'),item(flip?bb:a,cb,'small')];ans=s[0];}
  if(kind==='ABC'){const step=1+(i%2);s=[item(a,ca,'small'),item(cycle(SH,b+step),cb,'small'),item(cycle(SH,b+2*step),cc,'small'),item(a,ca,'small'),item(cycle(SH,b+step),cb,'small')];ans=s[2];}
  if(kind==='AAB'){s=[item(a,ca,'small'),item(a,ca,'small'),item(bb,cb,'small'),item(a,ca,'small'),item(a,ca,'small')];ans=item(bb,cb,'small');}
  if(kind==='ABB'){s=[item(a,ca,'small'),item(bb,cb,'small'),item(bb,cb,'small'),item(c,cc,'small'),item(c,cc,'small')];ans=item(a,ca,'small');}
  if(kind==='AABB'){s=[item(a,ca,'small'),item(a,ca,'small'),item(bb,cb,'small'),item(bb,cb,'small'),item(c,cc,'small'),item(c,cc,'small')];ans=item(a,ca,'small');}
  if(kind==='SIZE_ALT'){const shape2=cycle(SH,b+1);s=[item(a,ca,SZ[i%2]),item(a,ca,SZ[(i+1)%2]),item(shape2,cb,SZ[i%2]),item(shape2,cb,SZ[(i+1)%2])];ans=item(a,ca,SZ[i%2]);}
  if(kind==='COLOR_ALT'){s=[item(a,ca,'small'),item(a,cb,'small'),item(a,cc,'small'),item(bb,ca,'small'),item(bb,cb,'small')];ans=item(bb,cc,'small');}
  if(kind==='SHAPE_COLOR_GRID'){s=[item(a,ca,'small'),item(bb,ca,'small'),item(c,ca,'small'),item(a,cb,'small'),item(bb,cb,'small'),item(c,cb,'small')];ans=item(a,cc,'small');}
  return {sequence:s,answer:ans}; }
 const kinds=['AB','ABC','AAB','ABB','AABB','SIZE_ALT','COLOR_ALT','SHAPE_COLOR_GRID'];
 function build(i){const kind=kinds[i%kinds.length],p=familyPattern(i,kind),wrong=[item(cycle(SH,i+1),cycle(CO,i+3),'large'),item(cycle(SH,i+2),cycle(CO,i),'small'),item(cycle(SH,i+3),cycle(CO,i+2),'large')],choices=[p.answer,...wrong];return{id:`PAT3_${String(i+1).padStart(5,'0')}`,type:'shape_pattern',family:kind,level:['AB','AAB','ABB'].includes(kind)?1:['ABC','AABB','SIZE_ALT','COLOR_ALT'].includes(kind)?2:3,problem:{type:'shape_pattern',sequence:p.sequence,rule:kind,parameters:{variant:i%32,step:1+i%2}},visual:{type:'shape_choices',choiceVisuals:choices,choiceVisualIds:['v0','v1','v2','v3'],answerVisualId:'v0'},choices,answer:0,question:'Hình nào tiếp theo?',explanation:'Xác định quy luật về hình, màu hoặc kích thước rồi chọn hình tiếp theo.'};}
 function generate(count=1000){return Array.from({length:count},(_,i)=>build(i));}
 global.TTD_SHAPE_PATTERN_GRAMMAR_V3={generate,build,familyPattern,kinds};
})(window);
