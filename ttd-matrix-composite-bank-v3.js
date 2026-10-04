/* TTD Matrix Composite Bank v3 — 3x3 with independent row/column rules */
(function(global){
  const S=['circle','square','triangle'],C=['red','blue','green'];
  const q=[];
  const c=(shape,color,count)=>({shape,color,count});
  function add(id,level,grid,rowRule,colRule,choices,answer,question){q.push({id,type:'matrix',family:'matrix_composite',level,problem:{grid,rowRule,colRule,options:{shapes:S,colors:C}},question,choices,answer,explanation:'Giải theo quy luật của hàng và kiểm tra lại bằng quy luật của cột.'});}
  for(let i=0;i<8;i++){
    const a=c(S[i%3],C[0],1+i%2), b=c(S[i%3],C[1],1+i%2), d=c(S[(i+1)%3],C[0],1), e=c(S[(i+1)%3],C[1],1);
    const ans=c(S[(i+2)%3],C[2],a.count+b.count);
    const grid=[[a,b,c(S[i%3],C[2],a.count+b.count)],[d,e,c(S[(i+1)%3],C[2],2)],[c(S[(i+2)%3],C[0],a.count),c(S[(i+2)%3],C[1],b.count),null]];
    add(`MXC_COMB_${String(i+1).padStart(2,'0')}`,4,grid,'add_count','color_next',[ans,c(ans.shape,ans.color,Math.max(1,ans.count-1)),c(ans.shape,C[0],ans.count),c(S[i%3],ans.color,ans.count)],0,'Ô ? phải thỏa cả quy luật số lượng theo hàng và màu theo cột. Hình nào đúng?');
  }
  for(let i=0;i<8;i++){
    const a=c(S[i%3],C[i%3],1), b=c(S[(i+1)%3],C[(i+1)%3],1), x=c(S[(i+2)%3],C[(i+2)%3],1);
    const y=c(S[(i+1)%3],C[i%3],1), z=c(S[(i+2)%3],C[(i+1)%3],1);
    const ans=c(S[i%3],C[(i+2)%3],1);
    const grid=[[a,b,x],[y,z,a],[x,a,null]];
    add(`MXC_CYCLE_${String(i+1).padStart(2,'0')}`,4,grid,'shape_next','color_next',[ans,c(S[(i+1)%3],ans.color,1),c(ans.shape,C[i%3],1),c(S[(i+2)%3],C[(i+1)%3],1)],0,'Hình, màu và vị trí thay đổi theo hai quy luật. Chọn ô còn thiếu.');
  }
  global.TTD_MATRIX_COMPOSITE_BANK_V3=q;
})(window);
