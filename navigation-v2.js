(function(){'use strict';
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const p=new URLSearchParams(location.search),gurl=Number(p.get('grade')||0);
const map={
 'cong-tru-10.html':[1,'Toán','Công Trừ Phạm Vi 10'],
 'so-sanh.html':[1,'Toán','So Sánh'],
 'hinh-phang.html':[1,'Toán','Hình Phẳng'],
 'hinh-khoi.html':[1,'Toán','Hình Khối'],
 'doc-hieu.html':[1,'Tiếng Việt','Đọc Hiểu'],
 'doc-hieu-v5.html':[1,'Tiếng Việt','Đọc Hiểu'],
 'english.html':[1,'Tiếng Anh','Hoàn Thành Từ'],
 'vocabulary-list.html':[1,'Tiếng Anh','Danh Sách Từ Vựng'],
 'voca-scramble.html':[1,'Tiếng Anh','Sắp Xếp Câu']
};
const subs=['Toán','Tiếng Việt','Tiếng Anh','Toán Tư Duy','Math'];
const icons={'Toán':'🔢','Tiếng Việt':'📖','Tiếng Anh':'🔤','Toán Tư Duy':'🧠','Math':'🌎'};
const one={
 'Toán':[['Công Trừ Phạm Vi 10','cong-tru-10.html','➕'],['So Sánh','so-sanh.html','⚖️'],['Hình Phẳng','hinh-phang.html','🔷'],['Hình Khối',null,'🧊']],
 'Tiếng Việt':[['Đọc Hiểu','doc-hieu.html','📖'],['Hoàn Thành Từ',null,'✏️'],['Sắp Xếp Câu',null,'🧩']],
 'Tiếng Anh':[['Danh Sách Từ Vựng','vocabulary-list.html','📚'],['Hoàn Thành Từ','english.html','🔤'],['Sắp Xếp Câu','voca-scramble.html','🔀']],
 'Toán Tư Duy':[['Toán Tư Duy',null,'🧠']],
 'Math':[['Math',null,'🌎']]
};
function active(g,s,c){if(map[page])return map[page][0]===g&&map[page][1]===s&&map[page][2]===c;return Number(p.get('grade'))===g&&p.get('subject')===s&&p.get('course')===c}
function link(g,s,c,h){return h||`coming-soon.html?grade=${g}&subject=${encodeURIComponent(s)}&course=${encodeURIComponent(c)}`}
function courses(g,s){return g===1?one[s]:[[s,null,icons[s]||'📘']]}
function build(nav){
 const cg=map[page]?.[0]||gurl||1;let out='';
 for(let g=1;g<=12;g++){
  const open=g===cg;
  out+=`<div class="nv-grade"><button type="button" class="grade-toggle" data-grade="${g}"><span class="icon">${open?'📂':'📁'}</span><span>Lớp ${g}</span><span class="chev">${open?'⌃':'›'}</span></button><div class="nv-sub ${open?'open':''}" id="nv-g-${g}">`;
  subs.forEach(s=>{
   const cs=courses(g,s),co=cs.some(x=>active(g,s,x[0]));
   out+=`<div class="nv-subject"><button type="button" class="nv-subject-btn"><span class="icon">${icons[s]}</span><span>${s}</span><span class="chev">${co?'⌄':'›'}</span></button><div class="nv-courses ${co?'open':''}>`;
   cs.forEach(x=>{out+=`<a href="${link(g,s,x[0],x[1])}" class="nv-course ${active(g,s,x[0])?'active':''}"><span class="icon">${x[2]}</span><span>${x[0]}</span></a>`});
   out+='</div></div>';
  });
  out+='</div></div>';
 }
 nav.innerHTML=out;
 nav.querySelectorAll('.grade-toggle').forEach(b=>b.addEventListener('click',()=>document.getElementById('nv-g-'+b.dataset.grade)?.classList.toggle('open')));
 nav.querySelectorAll('.nv-subject-btn').forEach(b=>b.addEventListener('click',()=>b.nextElementSibling?.classList.toggle('open')));
}
function shell(){
 let nav=document.querySelector('#gradeNav,#nav,.nav');
 if(nav)return nav;
 let side=document.querySelector('#sidebar,.sidebar');
 if(!side){side=document.createElement('aside');side.id='sidebar';side.className='sidebar nv-created';side.innerHTML='<a class="brand" href="index.html?home=1">🎓 Learning Hub</a><div class="nav-label">Chương trình học</div><nav class="nav" id="gradeNav"></nav>';document.body.prepend(side)}
 nav=side.querySelector('.nav');
 let main=document.querySelector('.main,main');if(main)main.classList.add('nv-main');
 let btn=document.querySelector('#menuBtn,.mobile-btn');let ov=document.querySelector('#overlay,.overlay');
 if(btn&&ov){btn.addEventListener('click',()=>{side.classList.toggle('open');ov.classList.toggle('show')});ov.addEventListener('click',()=>{side.classList.remove('open');ov.classList.remove('show')})}
 return nav;
}
function css(){if(document.getElementById('nv2'))return;const s=document.createElement('style');s.id='nv2';s.textContent=`
.nv-sub{display:none!important;margin:2px 0 6px 15px!important;padding-left:13px!important;border-left:1px solid #f0dbe7!important}
.nv-sub.open{display:block!important}
.nv-subject{display:block!important;margin:0!important;padding:0!important}
.nv-subject-btn{display:flex!important;align-items:center!important;gap:9px!important;width:100%!important;padding:9px 9px!important;border:0!important;background:transparent!important;color:#475467!important;font:inherit!important;font-size:14px!important;font-weight:700!important;text-align:left!important;border-radius:10px!important;cursor:pointer!important;box-shadow:none!important}
.nv-subject-btn .icon{width:20px!important;min-width:20px!important;text-align:center!important}
.nv-subject-btn .chev{margin-left:auto!important}
.nv-courses{display:none!important;margin:0 0 5px 12px!important;padding-left:12px!important;border-left:1px dashed #ead9e3!important}
.nv-courses.open{display:block!important}
.nv-course{display:flex!important;align-items:center!important;gap:7px!important;width:auto!important;margin:2px 0!important;padding:8px 9px!important;border-radius:9px!important;text-decoration:none!important;color:#5e5969!important;font-size:13px!important;font-weight:700!important;line-height:1.25!important;background:transparent!important}
.nv-course .icon{font-size:15px!important;width:20px!important;min-width:20px!important;text-align:center!important}
.nv-course.active{background:#29243b!important;color:#fff!important}
.nv-course:hover{background:#f8faff!important}
.nv-course.active:hover{background:#29243b!important}
.nv-grade{display:block!important}
.grade-toggle{display:flex!important;align-items:center!important;gap:9px!important;width:100%!important;padding:8px 10px!important;border:0!important;background:transparent!important;color:#5e5969!important;font:inherit!important;font-weight:700!important;text-align:left!important;border-radius:12px!important;cursor:pointer!important;box-shadow:none!important}
.grade-toggle .chev{margin-left:auto!important}
.nv-main{margin-left:260px}
@media(max-width:760px){.nv-main{margin-left:0}}
`;document.head.appendChild(s)}
function init(){css();build(shell())}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();