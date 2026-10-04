/* TTD Shape Pattern Grammar v4 — combinatorial diversity with explicit templates. */
(function(global){
 const SH=['circle','square','triangle','star'],CO=['red','blue','green','yellow'],SZ=['small','large'];
 const item=(shape,color,size)=>({shape,color,size}); const at=(a,i)=>a[((i%a.length)+a.length)%a.length];
 const templates=[
  {family:'AB',level:1,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),ca=at(CO,i),cb=at(CO,i+1);return{sequence:[item(a,ca,'small'),item(b,cb,'small'),item(a,ca,'small'),item(b,cb,'small')],answer:item(a,ca,'small')}}},
  {family:'ABC',level:2,make:(i)=>{const step=i%2?2:1,a=at(SH,i),b=at(SH,i+step),c=at(SH,i+2*step),ca=at(CO,i),cb=at(CO,i+1),cc=at(CO,i+2);return{sequence:[item(a,ca,'small'),item(b,cb,'small'),item(c,cc,'small'),item(a,ca,'small'),item(b,cb,'small')],answer:item(c,cc,'small')}}},
  {family:'AAB',level:2,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),ca=at(CO,i),cb=at(CO,i+1);return{sequence:[item(a,ca,'small'),item(a,ca,'small'),item(b,cb,'small'),item(a,ca,'small'),item(a,ca,'small')],answer:item(b,cb,'small')}}},
  {family:'ABB',level:2,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),c=at(SH,i+2),ca=at(CO,i),cb=at(CO,i+1),cc=at(CO,i+2);return{sequence:[item(a,ca,'small'),item(b,cb,'small'),item(b,cb,'small'),item(c,cc,'small'),item(c,cc,'small')],answer:item(a,ca,'small')}}},
  {family:'AABB',level:3,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),c=at(SH,i+2),ca=at(CO,i),cb=at(CO,i+1),cc=at(CO,i+2);return{sequence:[item(a,ca,'small'),item(a,ca,'small'),item(b,cb,'small'),item(b,cb,'small'),item(c,cc,'small'),item(c,cc,'small')],answer:item(a,ca,'small')}}},
  {family:'SIZE_ALT',level:3,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),ca=at(CO,i),cb=at(CO,i+1),s=at(SZ,i);const t=s==='small'?'large':'small';return{sequence:[item(a,ca,s),item(a,ca,t),item(b,cb,s),item(b,cb,t)],answer:item(a,ca,s)}}},
  {family:'COLOR_ALT',level:3,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),c1=at(CO,i),c2=at(CO,i+1),c3=at(CO,i+2);return{sequence:[item(a,c1,'small'),item(a,c2,'small'),item(a,c3,'small'),item(b,c1,'small'),item(b,c2,'small')],answer:item(b,c3,'small')}}},
  {family:'SHAPE_COLOR_GRID',level:4,make:(i)=>{const a=at(SH,i),b=at(SH,i+1),c=at(SH,i+2),c1=at(CO,i),c2=at(CO,i+1),c3=at(CO,i+2);return{sequence:[item(a,c1,'small'),item(b,c1,'small'),item(c,c1,'small'),item(a,c2,'small'),item(b,c2,'small'),item(c,c2,'small')],answer:item(a,c3,'small')}}}
 ];
 function build(i){const t=templates[i%templates.length],p=t.make(i),wrong=[item(at(SH,i+1),at(CO,i+2),i%3?'small':'large'),item(at(SH,i+2),at(CO,i),i%2?'large':'small'),item(at(SH,i+3),at(CO,i+1),i%2?'small':'large')];return{id:`PAT4_${String(i+1).padStart(5,'0')}`,type:'shape_pattern',family:t.family,level:t.level,problem:{type:'shape_pattern',sequence:p.sequence,rule:t.family,parameters:{variant:i%128,template:i%templates.length}},visual:{type:'shape_choices',choiceVisuals:[p.answer,...wrong],choiceVisualIds:['v0','v1','v2','v3'],answerVisualId:'v0'},choices:[p.answer,...wrong],answer:0,question:'Hình nào tiếp theo?',explanation:`Tìm quy luật ${t.family} của dãy hình.`};}
 function generate(count=1000){return Array.from({length:count},(_,i)=>build(i));}
 global.TTD_SHAPE_PATTERN_GRAMMAR_V4={generate,build,templates};
})(window);
