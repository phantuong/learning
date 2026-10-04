/* TTD Matrix Patterns v4 — center/corner + composition patterns */
(function(global){
 const S=['circle','square','triangle'], C=['red','blue','green']; const q=[];
 const c=(shape,color,count=1)=>({shape,color,count});
 function add(id,level,pattern,grid,choices,answer,question){q.push({id,type:'matrix',family:pattern,level,problem:{grid,pattern,options:{shapes:S,colors:C}},question,choices,answer,explanation:'Quan sát đồng thời quy luật của hàng và cột để tìm ô còn thiếu.'});}
 // Missing center: each row/column cycles shape; center is forced by both directions.
 for(let i=0;i<8;i++){
   const a=S[i%3],b=S[(i+1)%3],d=S[(i+2)%3];
   const grid=[[c(a,C[0]),c(b,C[0]),c(d,C[0])],[c(b,C[1]),null,c(a,C[1])],[c(d,C[2]),c(a,C[2]),c(b,C[2])]];
   const ans=c(d,C[1]);
   add(`MX4_CENTER_${String(i+1).padStart(2,'0')}`,3,'missing_center',grid,[ans,c(a,C[1]),c(b,C[1]),c(d,C[0])],0,'Ô ở giữa còn thiếu hình nào?');
 }
 // Missing corner: row/column cycles, bottom-right is forced.
 for(let i=0;i<8;i++){
   const a=S[i%3],b=S[(i+1)%3],d=S[(i+2)%3];
   const grid=[[c(a,C[0]),c(b,C[0]),c(d,C[0])],[c(b,C[1]),c(d,C[1]),c(a,C[1])],[c(d,C[2]),c(a,C[2]),null]];
   const ans=c(b,C[2]);
   add(`MX4_CORNER_${String(i+1).padStart(2,'0')}`,3,'missing_corner',grid,[ans,c(a,C[2]),c(d,C[2]),c(b,C[1])],0,'Ô ở góc dưới bên phải còn thiếu hình nào?');
 }
 // Combination: first two cells determine the third by shape from first, color from second, count sum.
 for(let i=0;i<8;i++){
   const a=c(S[i%3],C[0],1+i%2),b=c(S[(i+1)%3],C[1],1),ans=c(a.shape,b.color,a.count+b.count);
   const grid=[[a,b,ans],[c(b.shape,C[2],1),c(a.shape,C[0],2),c(b.shape,C[1],1)],[c(a.shape,C[2],1),c(b.shape,C[0],1),c(a.shape,C[1],1)]];
   add(`MX4_COMBINE_${String(i+1).padStart(2,'0')}`,4,'combine_two_cells',grid,[ans,c(b.shape,b.color,ans.count),c(a.shape,a.color,ans.count),c(a.shape,b.color,Math.max(1,ans.count-1))],0,'Ô thứ ba được tạo từ hai ô đầu: giữ hình của ô đầu, lấy màu của ô thứ hai và cộng số lượng. Hình nào đúng?');
 }
 global.TTD_MATRIX_PATTERNS_V4=q;
})(window);
