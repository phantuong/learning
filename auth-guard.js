(function(){'use strict';
const AUTH_PAGE='auth.html';
function isAuthPage(){return /(^|\/)auth\.html$/i.test(location.pathname)}
function goAuth(){if(!isAuthPage())location.replace(AUTH_PAGE)}
async function boot(){
  if(!window.supabase||!window.SUPABASE_URL||!window.SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY==='YOUR_SUPABASE_PUBLISHABLE_KEY'){if(!isAuthPage())console.warn('Supabase auth is not configured yet. Set SUPABASE_ANON_KEY in supabase-config.js.');return}
  const sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  window.learningAuth=sb;
  const {data:{session}}=await sb.auth.getSession();
  if(!session){goAuth();return}
  window.learningUser=session.user;
  const side=document.querySelector('#sidebar,.sidebar,.nv-standard-sidebar,.nv-generated-sidebar');
  if(side&&!side.querySelector('[data-auth-logout]')){
    const wrap=document.createElement('div');wrap.setAttribute('data-auth-area','');wrap.style.cssText='margin-top:18px;padding-top:12px;border-top:1px solid #eadfe6';
    const email=document.createElement('div');email.textContent=session.user.email||'Tài khoản';email.style.cssText='padding:7px 10px;color:#98a2b3;font-size:11px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
    const btn=document.createElement('button');btn.type='button';btn.setAttribute('data-auth-logout','');btn.textContent='🚪 Đăng xuất';btn.style.cssText='width:100%;padding:10px;border:0;border-radius:10px;background:#fff1f2;color:#b42318;font:inherit;font-weight:800;text-align:left;cursor:pointer';
    btn.onclick=async()=>{btn.disabled=true;const {error}=await sb.auth.signOut();if(error){btn.disabled=false;alert(error.message);return}location.replace(AUTH_PAGE)};
    wrap.append(email,btn);side.appendChild(wrap);
  }
  sb.auth.onAuthStateChange((_event,newSession)=>{if(!newSession)goAuth()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
