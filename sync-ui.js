(function(){
  function addSyncUI(){
    if(!window.LearningSync||document.getElementById('syncPanel'))return;
    const css=document.createElement('style');css.textContent='.sync-box{margin:14px auto 0;max-width:900px;background:#fff;border:1px solid #ead9e2;border-radius:16px;padding:12px 14px;box-shadow:0 6px 18px #dca9c514}.sync-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.sync-input{flex:1;min-width:180px;padding:10px 12px;border:1px solid #dfd5dc;border-radius:10px;font-size:14px}.sync-btn{border:0;border-radius:10px;padding:10px 14px;font-weight:800;cursor:pointer;background:#29233f;color:#fff}.sync-status{font-size:13px;color:#77677a;margin-top:7px}.sync-ok{color:#087443}.sync-error{color:#b4232e}';document.head.appendChild(css);
    const box=document.createElement('section');box.id='syncPanel';box.className='sync-box';box.innerHTML='<div class="sync-row"><strong>☁️ Đồng bộ tiến độ</strong><input id="syncEmail" class="sync-input" type="email" placeholder="Email tài khoản học tập"><input id="syncPassword" class="sync-input" type="password" placeholder="Mật khẩu"><button id="syncLogin" class="sync-btn">Đăng nhập / Tạo tài khoản</button></div><div id="syncStatus" class="sync-status">Đang dùng dữ liệu trên thiết bị này.</div>';
    const host=document.querySelector('.wrap')||document.body;host.prepend(box);
    const status=document.getElementById('syncStatus');
    document.getElementById('syncLogin').onclick=async()=>{status.textContent='Đang kết nối...';status.className='sync-status';try{const email=document.getElementById('syncEmail').value.trim(),pw=document.getElementById('syncPassword').value;if(!email||pw.length<6){throw new Error('Nhập email và mật khẩu (ít nhất 6 ký tự).')}const r=await LearningSync.signInOrSignUp(email,pw);if(r.error)throw r.error;await LearningSync.sync({last_page:location.pathname});status.textContent='✓ Đã đồng bộ. Có thể mở app trên máy khác và đăng nhập cùng tài khoản.';status.className='sync-status sync-ok'}catch(e){status.textContent='Không thể đồng bộ: '+(e.message||e);status.className='sync-status sync-error'}};
    LearningSync.init().then(()=>{const p=LearningSync.getLocal();if(p.updated_at)status.textContent='☁️ Đã khôi phục tiến độ gần nhất trên thiết bị này.'});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addSyncUI);else addSyncUI();
})();
