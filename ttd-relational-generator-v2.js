/* TTD Relational Logic Generator v2 — structural relation templates */
(function(global){
 const COLORS=['red','blue','green','yellow'];
 const SHAPES=['circle','square','triangle','star'];
 const POS=['A','B','C','D'];
 function obj(id,shape,color){return{id,shape,color}}
 function make(i,template){
   const a=obj('A',SHAPES[i%4],COLORS[(i*3)%4]);
   const b=obj('B',SHAPES[(i+1)%4],COLORS[(i+1)%4]);
   const c=obj('C',SHAPES[(i+2)%4],COLORS[(i+2)%4]);
   let conditions,question,choices;
   if(template==='chain_position'){
     conditions=[{relation:'left_of',from:'A',to:'B'},{relation:'left_of',from:'B',to:'C'}];
     question='Trong ba hình, hình nào phải nằm bên trái cả hai hình còn lại?';
     choices=[{A:'left',B:'middle',C:'right'},{A:'middle',B:'left',C:'right'},{A:'right',B:'middle',C:'left'},{A:'left',B:'right',C:'middle'}];
   } else if(template==='same_color_relation'){
     conditions=[{relation:'same_color',from:'A',to:'C'},{relation:'different_color',from:'A',to:'B'}];
     question='Chọn phương án mô tả đúng quan hệ màu của A, B và C.';
     choices=[{A:a.color,B:b.color,C:a.color},{A:a.color,B:a.color,C:b.color},{A:b.color,B:a.color,C:a.color},{A:b.color,B:b.color,C:a.color}];
   } else if(template==='relative_count'){
     conditions=[{relation:'more_than',from:'A',to:'B'},{relation:'more_than',from:'B',to:'C'}];
     question='Hình nào có số lượng nhiều nhất?';
     choices=[{answer:'A'},{answer:'B'},{answer:'C'},{answer:'B và C'}];
   } else {
     conditions=[{relation:'same_shape',from:'A',to:'B'},{relation:'different_shape',from:'B',to:'C'},{relation:'same_color',from:'A',to:'C'}];
     question='Phương án nào thỏa mãn đồng thời cả ba điều kiện?';
     choices=[{shapePair:'A=B',colorPair:'A=C'},{shapePair:'A=C',colorPair:'A=B'},{shapePair:'B=C',colorPair:'A=B'},{shapePair:'A=B',colorPair:'B=C'}];
   }
   return {id:`REL2_${String(i+1).padStart(3,'0')}`,type:'relational_logic',family:template,level:template==='relative_count'?3:template==='chain_position'?2:4,problem:{objects:[a,b,c],conditions},choices,answer:0,question,explanation:'Kiểm tra từng quan hệ theo đúng thứ tự điều kiện.'};
 }
 function generate(count=32){const t=['chain_position','same_color_relation','relative_count','combined_relations'];return Array.from({length:count},(_,i)=>make(i,t[i%t.length]));}
 global.TTD_RELATIONAL_GENERATOR_V2={generate,make};
})(window);
