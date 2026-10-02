(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const links={
    english:['english.html','🔤🌈','Tiếng Anh'],
    vocab:['vocabulary-list.html','↳','Vocabulary List'],
    math:['math.html','➕','Toán'],
    addsub:['cong-tru-10.html','↳','Cộng Trừ Phạm Vi 10'],
    compare:['so-sanh.html','↳','So sánh']
  };
  function active(p){return current===p}
  function build(){
    const nav=document.querySelector('#gradeNav, #nav, .nav');
    if(!nav)return;
    const course=(href,label,icon)=>`<a href="${href}" class="${active(href)?'active':''}">${icon} ${label}</a>`;
    nav.innerHTML=`
      <div>
        <button type="button" class="grade-toggle grade" data-grade="1">📂 <span>Lớp 1</span><span class="chev">⌃</span></button>
        <div class="subnav sub open" id="shared-grade-1">
          ${course('english.html','Tiếng Anh','🔤🌈')}
          <div class="course-list courses">
            ${course('english.html','Vocabulary Games','↳')}
            ${course('vocabulary-list.html','Vocabulary List','↳')}
          </div>
          ${course('math.html','Toán','➕')}
          <div class="course-list courses">
            ${course('cong-tru-10.html','Cộng Trừ Phạm Vi 10','↳')}
            ${course('so-sanh.html','So sánh','↳')}
          </div>
          <a href="class.html?grade=1" class="${current==='class.html'?'active':''}">📚 Các môn học</a>
        </div>
      </div>
      ${Array.from({length:11},(_,i)=>{const g=i+2;return `<div><a href="class.html?grade=${g}">📁 Lớp ${g}</a></div>`}).join('')}`;
    const grade=nav.querySelector('[data-grade]');
    grade&&grade.addEventListener('click',()=>document.getElementById('shared-grade-1')?.classList.toggle('open'));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();