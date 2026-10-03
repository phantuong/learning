/* Curated pilot bank: 5 validated questions for each priority skill. */
const TTD_BANK_V2=(()=>{
 const q=[]; const add=x=>q.push(TTD_ENGINE_V2.make(x));
 // 1. Missing shape
 add({id:'MS_001',topic:'missing-shape',level:1,type:'AB pattern',problem:{kind:'sequence',items:['🔴','🔵','🔴','🔵'],missing:4,answer:'🔴'},question:'Hình nào cần đặt vào ô còn thiếu?',answer:'🔴',explain:'Hai hình luân phiên đỏ, xanh. Sau 🔵 là 🔴.',distractors:['🔵','🟢','⭐']});
 add({id:'MS_002',topic:'missing-shape',level:2,type:'ABC pattern',problem:{kind:'sequence',items:['🔺','🟢','⭐','🔺','🟢'],missing:5,answer:'⭐'},question:'Hình nào tiếp theo trong quy luật?',answer:'⭐',explain:'Chu kỳ là 🔺, 🟢, ⭐ rồi lặp lại.',distractors:['🔺','🟢','🟦']});
 add({id:'MS_003',topic:'missing-shape',level:3,type:'AAB pattern',problem:{kind:'sequence',items:['🟡','🟡','🔵','🟡','🟡'],missing:5,answer:'🔵'},question:'Điền hình còn thiếu.',answer:'🔵',explain:'Mỗi nhóm có hai hình vàng rồi một hình xanh.',distractors:['🟡','🔴','⭐']});
 add({id:'MS_004',topic:'missing-shape',level:4,type:'rotation',problem:{kind:'sequence',items:['↑','→','↓','←'],missing:4,answer:'↑'},question:'Mũi tên tiếp theo là gì?',answer:'↑',explain:'Mũi tên xoay 90° theo chiều kim đồng hồ ở mỗi bước.',distractors:['→','↓','←']});
 add({id:'MS_005',topic:'missing-shape',level:5,type:'count pattern',problem:{kind:'sequence',items:['🔵×1','🔵×2','🔵×3','🔵×4'],missing:4,answer:'🔵×5'},question:'Nhóm tiếp theo có bao nhiêu hình tròn xanh?',answer:'🔵×5',explain:'Số hình tăng thêm 1 ở mỗi bước.',distractors:['🔵×3','🔵×4','🔵×6']});
 // 2. Complex shape patterns
 add({id:'SP_001',topic:'shape-pattern',level:3,type:'color',problem:{kind:'sequence',items:['🔴 nhỏ','🔵 lớn','🔴 nhỏ','🔵 lớn'],missing:4,answer:'🔴 nhỏ'},question:'Hình nào tiếp theo? Hãy chú ý cả màu và kích thước.',answer:'🔴 nhỏ',explain:'Cả màu và kích thước cùng lặp theo cặp: 🔴 nhỏ, 🔵 lớn.',distractors:['🔵 nhỏ','🔴 lớn','🔵 lớn']});
 add({id:'SP_002',topic:'shape-pattern',level:4,type:'shape+color',problem:{kind:'sequence',items:['🔴●','🔵■','🟢●','🔴■','🔵●'],missing:5,answer:'🟢■'},question:'Hình tiếp theo phải có màu và hình nào?',answer:'🟢■',explain:'Màu lặp đỏ → xanh → xanh lá; hình luân phiên tròn → vuông.',distractors:['🟢●','🔴■','🔵■']});
 add({id:'SP_003',topic:'shape-pattern',level:5,type:'count+color',problem:{kind:'sequence',items:['🔴×1','🔵×2','🔴×3','🔵×4'],missing:4,answer:'🔴×5'},question:'Nhóm tiếp theo là gì?',answer:'🔴×5',explain:'Màu luân phiên đỏ/xanh và số lượng tăng 1.',distractors:['🔵×5','🔴×4','🔵×6']});
 add({id:'SP_004',topic:'shape-pattern',level:6,type:'three attributes',problem:{kind:'sequence',items:['🔴 nhỏ ↑','🔵 lớn →','🟢 nhỏ ↓','🔴 lớn ←'],missing:4,answer:'🔵 nhỏ ↑'},question:'Hãy tìm hình tiếp theo theo màu, kích thước và hướng.',answer:'🔵 nhỏ ↑',explain:'Mỗi thuộc tính có chu kỳ riêng: màu đỏ/xanh/xanh lá, kích thước nhỏ/lớn, hướng xoay từng bước.',distractors:['🔴 nhỏ ↑','🔵 lớn →','🟢 lớn ↓']});
 add({id:'SP_005',topic:'shape-pattern',level:7,type:'position',problem:{kind:'sequence',items:['● trái','■ giữa','● phải','■ giữa'],missing:4,answer:'● trái'},question:'Hình tiếp theo ở vị trí nào?',answer:'● trái',explain:'Hình tròn đi trái → phải, hình vuông luôn ở giữa.',distractors:['● phải','■ trái','■ phải']});
 // 3. Matrix reasoning
 const matrix=(id,level,grid,mr,mc,ans,explain,d)=>add({id,topic:'matrix-reasoning',level,type:'matrix',problem:{kind:'matrix',grid,mr,mc,answer:ans},question:'Điền số còn thiếu trong ma trận. Hãy quan sát quy luật theo hàng và cột.',answer:ans,explain,distractors:d});
 matrix('MX_001',2,[[1,2,3],[2,3,4],[3,4,5]],1,1,3,'Mỗi hàng và cột tăng 1 khi đi sang phải hoặc đi xuống.',[2,4,5]);
 matrix('MX_002',3,[[2,4,6],[4,6,8],[6,8,10]],2,1,8,'Mỗi bước sang phải hoặc xuống dưới tăng 2.',[6,7,9]);
 matrix('MX_003',4,[[1,2,3],[3,4,5],[5,6,7]],0,2,3,'Mỗi hàng tăng 1; hàng sau bắt đầu hơn hàng trước 2.',[2,4,5]);
 matrix('MX_004',5,[[1,2,1],[2,1,2],[1,2,1]],2,2,1,'Các số luân phiên 1, 2 theo cả hàng và cột.',[2,3,4]);
 matrix('MX_005',6,[[2,3,4],[3,4,5],[4,5,6]],1,0,3,'Mỗi hàng sau lớn hơn hàng trước 1 ở cùng cột.',[2,4,5]);
 // 4. Shape composition
 const comp=(id,level,total,part,ans,symbol='🟦')=>add({id,topic:'shape-composition',level,type:'missing-piece',problem:{kind:'compose',total,part,symbol,answer:ans},question:`Hai mảnh ghép tạo thành ${total} ô. Một mảnh có ${part} ô. Mảnh còn thiếu có bao nhiêu ô?`,answer:ans,explain:`Lấy tổng ${total} trừ ${part}: ${total} − ${part} = ${ans}.`,distractors:[part,total,ans+1].filter(x=>x!==ans)});
 comp('CP_001',2,6,2,4); comp('CP_002',3,7,3,4); comp('CP_003',4,9,5,4,'🔺'); comp('CP_004',5,10,6,4); comp('CP_005',6,12,7,5,'🟠');
 // 5. Counting shapes
 const count=(id,level,sample,items,ans,explain,d)=>add({id,topic:'counting-shapes',level,type:'count',problem:{kind:'count',sample,items,answer:ans},question:'Có bao nhiêu hình giống hệt hình mẫu?',answer:ans,explain,distractors:d});
 count('CT_001',1,'🔵',['🔴','🔵','🟢','🔵','🟡'],2,'Chỉ có hai hình tròn xanh.',[1,3,4]);
 count('CT_002',2,'🔺',['🔺','🟦','🔺','🔺','🟢','🟦'],3,'Đếm ba hình tam giác.',[2,4,5]);
 count('CT_003',3,'⭐',['⭐','🔵','⭐','🔺','🔵','⭐','🔴'],3,'Có ba ngôi sao.',[2,4,5]);
 count('CT_004',4,'🟦',['🟦','🟦','🔺','🟦','🔴','🔺','🟦'],4,'Có bốn hình vuông xanh.',[3,5,6]);
 count('CT_005',5,'●',['●','■','●','▲','■','●','◆','●'],4,'Có bốn hình tròn.',[3,5,6]);
 // 6. Multi-condition logic
 const logic=(id,level,question,entities,ans,explain,d)=>add({id,topic:'multi-condition-logic',level,type:'constraints',problem:{kind:'logic',entities,answer:ans},question,answer:ans,explain,distractors:d});
 logic('LG_001',4,'An cao hơn Bình. Bình cao hơn Chi. Ai thấp hơn Bình?',[{name:'An'},{name:'Bình'},{name:'Chi'}],'Chi','Chi thấp hơn Bình theo điều kiện thứ hai.',['An','Bình','Không biết']);
 logic('LG_002',4,'An đứng trước Bình. Chi đứng sau Bình. Ai đứng giữa An và Chi?',[{name:'An'},{name:'Bình'},{name:'Chi'}],'Bình','Bình đứng sau An và trước Chi.',['An','Chi','Không biết']);
 logic('LG_003',5,'Lan có quả đỏ. Mai có quả xanh. Hoa không có quả đỏ. Ai chắc chắn có quả đỏ?',[{name:'Lan'},{name:'Mai'},{name:'Hoa'}],'Lan','Điều kiện nói trực tiếp Lan có quả đỏ.',['Mai','Hoa','Không biết']);
 logic('LG_004',6,'Nam lớn hơn Minh. Minh lớn hơn An. Ai lớn nhất?',[{name:'Nam'},{name:'Minh'},{name:'An'}],'Nam','Thứ tự là Nam > Minh > An.',['Minh','An','Không biết']);
 logic('LG_005',7,'Có 5 quả đỏ và 3 quả xanh. Lấy đi 2 quả đỏ rồi thêm 1 quả xanh. Có tất cả bao nhiêu quả?',[{name:'đỏ'},{name:'xanh'}],'7','Ban đầu có 8 quả; bớt 2 còn 6, thêm 1 thành 7.',['6','8','9']);
 // 7. Spatial reasoning
 const spatial=(id,level,layers,ans,explain,d)=>add({id,topic:'spatial-reasoning',level,type:'cube-stack',problem:{kind:'spatial',layers,answer:ans},question:'Mô hình có các tầng khối như hình. Có tất cả bao nhiêu khối lập phương?',answer:ans,explain,distractors:d});
 spatial('3D_001',2,[3,1],4,'Tầng dưới có 3 khối và tầng trên có 1 khối: 3 + 1 = 4.',[3,5,6]);
 spatial('3D_002',3,[4,2],6,'Có 4 khối ở tầng dưới và 2 khối ở tầng trên.',[5,7,8]);
 spatial('3D_003',4,[4,3,1],8,'Cộng ba tầng: 4 + 3 + 1 = 8.',[7,9,10]);
 spatial('3D_004',5,[5,4,2],11,'Cộng số khối của từng tầng: 5 + 4 + 2 = 11.',[9,10,12]);
 spatial('3D_005',6,[6,4,3,1],14,'Cộng bốn tầng: 6 + 4 + 3 + 1 = 14.',[12,13,15]);
 // 8. Visual word problems
 const word=(id,level,icon,initial,actions,ans,qtext,d)=>add({id,topic:'visual-word-problem',level,type:'story',problem:{kind:'word',icon,initial,actions,answer:ans},question:qtext,answer:ans,explain:'Thực hiện lần lượt từng thay đổi theo câu chuyện.',distractors:d});
 word('WP_001',1,'🍎',4,[{type:'add',value:2}],6,'Có 4 quả táo, mẹ thêm 2 quả. Có tất cả bao nhiêu quả táo?',[5,7,8]);
 word('WP_002',2,'🐟',7,[{type:'remove',value:3}],4,'Có 7 con cá, 3 con bơi đi. Còn lại bao nhiêu con cá?',[3,5,6]);
 word('WP_003',3,'🚗',5,[{type:'add',value:3},{type:'remove',value:2}],6,'Có 5 chiếc xe, thêm 3 chiếc rồi bớt 2 chiếc. Còn bao nhiêu chiếc?',[5,7,8]);
 word('WP_004',4,'🎈',6,[{type:'remove',value:2},{type:'add',3}],7,'Có 6 quả bóng, tặng 2 quả rồi nhận thêm 3 quả. Bây giờ có bao nhiêu quả?',[5,6,8]);
 word('WP_005',5,'🐰',8,[{type:'remove',value:3},{type:'remove',value:2},{type:'add',value:1}],4,'Có 8 con thỏ, 3 con vào chuồng, 2 con chạy sang vườn rồi 1 con quay lại. Còn ngoài sân bao nhiêu con?',[3,5,6]);
 return q;
})();
