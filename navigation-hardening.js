(function(){
  'use strict';
  function install(){
    if(document.getElementById('learning-nav-hardening')) return;
    const s=document.createElement('style');
    s.id='learning-nav-hardening';
    s.textContent=`
      .nv-standard-sidebar,.nv-generated-sidebar{width:260px!important;max-width:260px!important;box-sizing:border-box!important}
      .nv-standard-sidebar .icon,.nv-generated-sidebar .icon{font-size:20px!important;line-height:1!important;width:auto!important;height:auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:none!important}
      .nv-standard-sidebar .nv-subject-btn .icon,.nv-generated-sidebar .nv-subject-btn .icon{width:24px!important;min-width:24px!important;font-size:20px!important;line-height:1!important}
      .nv-standard-sidebar .nv-course .icon,.nv-generated-sidebar .nv-course .icon{width:20px!important;min-width:20px!important;font-size:16px!important;line-height:1!important}
      #menuBtn,.menuBtn,.mobile-btn,.mobile,.menu-button,[data-menu-toggle],.nv-generated-menu{position:fixed!important;top:max(14px,env(safe-area-inset-top))!important;right:auto!important;bottom:auto!important;left:14px!important;transform:none!important;margin:0!important;z-index:1100!important;box-sizing:border-box!important}
      .nv-generated-menu,#menuBtn,.menuBtn,.mobile-btn,.mobile,.menu-button,[data-menu-toggle]{width:44px!important;height:44px!important;min-width:44px!important;max-width:44px!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important}
      .nv-standard-sidebar .nv-subject-btn,.nv-generated-sidebar .nv-subject-btn{font-size:14px!important;line-height:1.25!important}
      .nv-standard-sidebar .nv-course,.nv-generated-sidebar .nv-course{font-size:13px!important;line-height:1.25!important}
      @media(max-width:760px){.nv-standard-sidebar,.nv-generated-sidebar{width:270px!important;max-width:270px!important}.nv-standard-sidebar.open,.nv-generated-sidebar.open{transform:translateX(0)!important}}
    `;
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
})();
// Shared navigation hardening: fixed menu position and isolated icon sizing on every page.
