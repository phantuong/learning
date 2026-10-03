const BANK_SOURCES = [
  {name:"LogicLab", url:"https://logiclab.edu.vn/1001-bai-toan-tu-duy-lop-1-phat-trien-tu-duy-logic/", note:"Tham khảo các dạng bài lớp 1: số, hình học, so sánh, sắp xếp, đo lường, phân loại, quy luật, tìm khác biệt và bài toán thực tế."},
  {name:"ILA Vietnam", url:"https://ila.edu.vn/toan-tu-duy-lop-1", note:"Tham khảo các nhóm bài: số còn thiếu, quy luật dãy số, so sánh/sắp xếp, tách-gộp và tìm số còn thiếu trong phép tính."},
  {name:"STEAM KIDS", url:"https://steamkids.com.vn/toan-tu-duy-dem-so-lop-1/", note:"Tham khảo nhóm bài đếm đối tượng, đếm tiến-lùi, chục-đơn vị, chẵn-lẻ và đếm-nối."},
  {name:"ToanTuDuy.org", url:"https://toantuduy.org/toan-tu-duy-lop-1/", note:"Tham khảo cách phân loại theo kỹ năng, mức độ và luyện tập tương tác."}
];

const TTD_BANK = (() => {
  const q=[];
  const add=(topic,level,type,question,answer,options,explain,visual="")=>q.push({topic,level,type,question:String(question),answer:String(answer),options:options.map(String),explain,visual});
  const opts=(ans,pool)=>[String(ans),...pool.filter(x=>String(x)!==String(ans)).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);

  for(let level=1;level<=10;level++){
    for(let s=0;s<20;s++){
      const start=level<=2?1+(s%8):level<=4?10+(s%8):1+(s%6);
      const step=level===1?1:level===2?2:level===3?-1:level===4?-2:level===5?3:level===6?-3:0;
      if(step){
        const a=[start,start+step,start+2*step,start+3*step],ans=start+4*step;
        add("quy-luat-so",level,"dãy tăng/giảm",`Số nào tiếp theo: ${a.join(" – ")} – … ?`,ans,opts(ans,[ans-2,ans-1,ans+1,ans+2,ans+3]),`Mỗi lần ${step>0?"thêm":"bớt"} ${Math.abs(step)}.`);
      }
    }
    for(let s=0;s<12;s++){
      if(level===7){const a=[1+s,3+s,2+s,4+s,3+s,5+s],ans=4+s;add("quy-luat-so",7,"xen kẽ",`Tìm số tiếp theo: ${a.join(" – ")} – …`,ans,opts(ans,[ans-2,ans-1,ans+1,ans+2]),"Quy luật xen kẽ +2, −1.");}
      if(level===8){const a=[1+s,2+s,3+s,5+s,8+s],ans=13+s;add("quy-luat-so",8,"cộng hai số trước",`Tìm số tiếp theo: ${a.join(" – ")} – …`,ans,opts(ans,[11+s,12+s,14+s,15+s]),"Mỗi số mới bằng tổng hai số đứng ngay trước.");}
      if(level===9){const a=[1+s,3+s,6+s,10+s],ans=15+s;add("quy-luat-so",9,"khoảng cách tăng",`Tìm số tiếp theo: ${a.join(" – ")} – …`,ans,opts(ans,[14+s,16+s,17+s,18+s]),"Các bước là +2, +3, +4, +5.");}
      if(level===10){const a=[1+s,2+s,4+s,7+s,11+s],ans=16+s;add("quy-luat-so",10,"thử thách",`Tìm số tiếp theo: ${a.join(" – ")} – …`,ans,opts(ans,[14+s,15+s,17+s,18+s]),"Các bước tăng lần lượt +1, +2, +3, +4, +5.");}
    }
    for(let n=1;n<=15;n++){
      add("quy-luat-so",Math.min(level,4),"số liền sau",`Số liền sau của ${n} là số nào?`,n+1,opts(n+1,[n,n+2,n+3]),"Số liền sau hơn số đã cho 1 đơn vị.");
      add("quy-luat-so",Math.min(level,4),"số liền trước",`Số liền trước của ${n} là số nào?`,n-1,opts(n-1,[n,n+1,n+2]),"Số liền trước kém số đã cho 1 đơn vị.");
    }
  }

  const shapes=["🔴","🔵","🟢","🟡","🔺","⭐","🟦","🟣"], fruit=["🍎","🍌","🍊","🍉","🍇","🥝"], dirs=["⬆️","➡️","⬇️","⬅️"];
  const patternTypes=[["AB",["🔴","🔵"]],["ABC",["🔺","🟢","⭐"]],["AAB",["🟡","🟡","🔵"]],["ABB",["🟣","🟢","🟢"]],["ABC",["🍎","🍌","🍊"]]];
  for(let level=1;level<=10;level++){
    for(const [type,base] of patternTypes) for(let k=0;k<8;k++){
      const len=level<=3?5:7,arr=Array.from({length:len},(_,i)=>base[(i+k)%base.length]),ans=base[(len+k)%base.length];
      add("quy-luat-hinh",level,type,"Hình nào tiếp theo?",ans,opts(ans,shapes.concat(fruit)),"Quan sát nhóm hình lặp lại.",`${arr.join("  ")}  ❓`);
    }
    for(let k=0;k<8;k++){
      const base=[dirs[k%4],dirs[(k+1)%4],dirs[(k+2)%4],dirs[(k+3)%4]],arr=base.slice(0,3),ans=base[3];
      add("quy-luat-hinh",Math.max(6,level),"xoay hướng","Mũi tên nào tiếp theo?",ans,opts(ans,dirs),"Mũi tên xoay đều 90° theo cùng một chiều.",`${arr.join("  ")}  ❓`);
    }
    for(let n=2;n<=6;n++){
      const ans=n+1;add("quy-luat-hinh",Math.min(10,Math.max(5,level)),"tăng số lượng","Nhóm tiếp theo cần bao nhiêu ngôi sao nếu mỗi bước thêm 1 ngôi sao?",ans,opts(ans,[n-1,n,n+2]),"Số lượng tăng đều 1.",`⭐ × ${n}  →  ⭐ × ?`);
    }
  }

  const people=["An","Bình","Chi","Dũng"];
  for(let level=1;level<=10;level++){
    for(let k=0;k<12;k++){
      const a=people[k%4],b=people[(k+1)%4],c=people[(k+2)%4];
      add("logic",level,"thứ tự",`${a} đứng trước ${b}. ${c} đứng sau ${b}. Ai đứng ở giữa?`,b,opts(b,people),"Người ở giữa phải đứng sau người đầu và trước người cuối.");
    }
    for(let k=0;k<12;k++){
      const base=2+2*k, answer=base+1;
      add("logic",Math.min(10,Math.max(2,level)),"loại trừ",`Số nào không cùng nhóm: ${base}, ${base+2}, ${base+4}, ${answer}?`,answer,opts(answer,[base,base+2,base+4]),"Ba số còn lại đều là số chẵn.");
    }
    for(let k=0;k<10;k++){
      const total=5+k%4,red=2+k%3;
      add("logic",Math.min(10,Math.max(3,level)),"đếm điều kiện",`Có ${total} quả bóng. ${red} quả màu đỏ, còn lại màu xanh. Có bao nhiêu quả xanh?`,total-red,opts(total-red,[red,total,total-red+1]),"Lấy tổng số bóng trừ số bóng đỏ.");
    }
  }

  const geo=[["🔺","tam giác",3],["🟦","hình vuông",4],["▭","hình chữ nhật",4],["⬟","lục giác",6]];
  for(let level=1;level<=10;level++){
    for(const [icon,name,sides] of geo) add("hinh-hoc",level,"nhận biết",`Hình nào có ${sides} cạnh?`,name,opts(name,geo.map(x=>x[1])),"Đếm số cạnh của từng hình.",icon);
    for(let n=3;n<=10;n++){
      const triangles=1+(n%4),other=n-triangles;
      add("hinh-hoc",Math.max(4,level),"đếm hình",`Có ${n} hình, trong đó ${triangles} là tam giác. Có bao nhiêu hình không phải tam giác?`,other,opts(other,[triangles,n,other+1]),"Lấy tổng số hình trừ số hình tam giác.",`🔺 × ${triangles}  +  🔷 × ${other}`);
    }
  }

  for(let level=1;level<=10;level++){
    for(let shift=0;shift<12;shift++){
      const n=3,grid=Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>(r+c+shift)%n+1)),r=shift%3,c=(shift*2)%3,ans=grid[r][c];
      const visual=grid.map((row,ri)=>row.map((x,ci)=>ri===r&&ci===c?"❓":x).join(" | ")).join("<br>");
      add("bang-so",level,"ma trận 3×3","Điền số còn thiếu.",ans,opts(ans,[1,2,3,4]),"Mỗi hàng và cột đi theo chu kỳ 1, 2, 3.",visual);
    }
    if(level>=7) for(let shift=0;shift<6;shift++){
      const n=4,grid=Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>(r+c+shift)%n+1)),r=shift%4,c=(shift+1)%4,ans=grid[r][c];
      const visual=grid.map((row,ri)=>row.map((x,ci)=>ri===r&&ci===c?"❓":x).join(" | ")).join("<br>");
      add("bang-so",level,"ma trận 4×4","Điền số còn thiếu.",ans,opts(ans,[1,2,3,4,5]),"Mỗi hàng và cột chứa chu kỳ 1–4.",visual);
    }
  }

  for(let level=1;level<=10;level++){
    for(let n=2;n<=10;n++){
      const visible=level<=4?3:level<=7?4:5,ans=n+visible;
      add("khong-gian",level,"đếm khối",`Một mô hình có ${n} khối ở tầng dưới và thêm ${visible} khối ở tầng trên. Có tất cả bao nhiêu khối?`,ans,opts(ans,[ans-1,ans+1,ans+2]),"Cộng số khối của hai tầng.",`🧊 × ${n}  +  🧊 × ${visible}`);
    }
    for(let r=0;r<8;r++){
      const start=dirs[r%4],ans=dirs[(r+1)%4];
      add("khong-gian",Math.max(5,level),"xoay hướng",`Một mũi tên đang chỉ ${start}. Xoay mũi tên 90° theo chiều kim đồng hồ. Mũi tên chỉ hướng nào?`,ans,opts(ans,dirs),"Xoay 90° theo chiều kim đồng hồ sẽ chuyển sang hướng kế tiếp.",start+"  ↻ 90°  →  ❓");
    }
  }

  const objects=["🍎","🍌","🍊","⭐","🔵","🔺","🟢","🟣"];
  for(let level=1;level<=10;level++){
    for(let k=0;k<20;k++){
      const target=objects[k%objects.length],count=2+(k%7),visual=Array.from({length:count},()=>target).concat([objects[(k+2)%objects.length],objects[(k+4)%objects.length]]).sort(()=>Math.random()-.5).join(" ");
      add("quan-sat",level,"đếm đối tượng",`Có bao nhiêu ${target} trong nhóm?`,count,opts(count,[count-1,count+1,count+2]),"Đếm từng đối tượng cùng loại.",visual);
    }
    for(let k=0;k<12;k++){
      const a=2+k%4,b=1+(k%3);add("quan-sat",Math.max(3,level),"thêm bớt",`Có ${a} quả táo, thêm ${b} quả nữa. Có tất cả bao nhiêu quả?`,a+b,opts(a+b,[a,b,a+b+1]),"Gộp hai nhóm lại rồi đếm.");
    }
  }

  for(let level=1;level<=10;level++) for(let k=0;k<20;k++){
    const a=2+k%7,b=1+k%5;
    if(k%4===0) add("thu-thach",level,"cộng trừ",`Bé có ${a} ngôi sao, tặng ${b} ngôi sao. Còn lại bao nhiêu?`,a-b,opts(a-b,[a-b+1,a,b]),"Lấy số ban đầu trừ số đã tặng.","⭐".repeat(a)+"  →  🎁 "+b);
    else if(k%4===1) add("thu-thach",level,"tách gộp",`${a+b} có thể tách thành ${a} và số nào?`,b,opts(b,[a,a+b,b+1]),"Số cần tìm là phần còn lại.");
    else if(k%4===2) add("thu-thach",level,"tình huống",`Có ${a} quả cam và ${b} quả táo. Có tất cả bao nhiêu quả?`,a+b,opts(a+b,[a,b,a+b+1]),"Cộng hai nhóm đồ vật.","🍊".repeat(a)+" + "+"🍎".repeat(b));
    else {const ans=(a%3)+1;add("thu-thach",level,"quy luật",`Dãy có ${a} bước. Mỗi bước thêm 1 chấm. Bước tiếp theo có mấy chấm?`,ans,opts(ans,[ans-1,ans+1,ans+2]),"Số lượng tăng đều 1.",`• × ${ans-1} → ❓`);}
  }
  return q;
})();
