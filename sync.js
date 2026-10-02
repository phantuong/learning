// Cloud progress sync for the personal Learning app.
// Uses Supabase Auth + Postgres. The publishable/anon key is safe to ship in the frontend
// when Row Level Security is enabled (see supabase-schema.sql).
const SUPABASE_URL='https://ksqfcwjcijflvzzopkko.supabase.co';
const SUPABASE_KEY='sb_publishable_3WEpXJJe1HEgNJ4mfwmhUw_4jV9pQqg';
const SYNC_STORAGE='learningProgressV1';
let supabaseClient=null;
let syncReady=false;

function localProgress(){
  try{return JSON.parse(localStorage.getItem(SYNC_STORAGE)||'{}')}catch(e){return {}}
}
function saveLocalProgress(p){localStorage.setItem(SYNC_STORAGE,JSON.stringify(p))}
function mergeProgress(local,cloud){
  const out={...(cloud||{}),...(local||{})};
  // Keep the newest progress marker when both devices have data.
  if((cloud?.updated_at||'')>(local?.updated_at||'')){
    out.reading_story_current=cloud.reading_story_current??out.reading_story_current;
    out.reading_completed=cloud.reading_completed??out.reading_completed;
    out.reading_answers=cloud.reading_answers??out.reading_answers;
    out.math_progress=cloud.math_progress??out.math_progress;
    out.shapes_progress=cloud.shapes_progress??out.shapes_progress;
    out.last_page=cloud.last_page??out.last_page;
    out.last_subject=cloud.last_subject??out.last_subject;
    out.last_course=cloud.last_course??out.last_course;
  }
  return out;
}
async function ensureClient(){
  if(window.supabase&&window.supabase.createClient){
    supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    syncReady=true;
    return true;
  }
  return false;
}
async function signInOrSignUp(email,password){
  if(!syncReady)await ensureClient();
  let r=await supabaseClient.auth.signInWithPassword({email,password});
  if(r.error) r=await supabaseClient.auth.signUp({email,password});
  return r;
}
async function loadCloudProgress(){
  if(!syncReady)return null;
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(!user)return null;
  const {data,error}=await supabaseClient.from('learning_progress').select('*').eq('user_id',user.id).maybeSingle();
  if(error)throw error;
  return data;
}
async function saveCloudProgress(p){
  if(!syncReady)return;
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(!user)return;
  const row={user_id:user.id,last_page:p.last_page||location.pathname,last_subject:p.last_subject||'',last_course:p.last_course||'',reading_story_current:Number(p.reading_story_current||1),reading_completed:p.reading_completed||[],reading_answers:p.reading_answers||{},math_progress:p.math_progress||{},shapes_progress:p.shapes_progress||{}};
  const {error}=await supabaseClient.from('learning_progress').upsert(row,{onConflict:'user_id'});
  if(error)throw error;
}
async function syncProgress(patch={}){
  const local={...localProgress(),...patch,updated_at:new Date().toISOString()};
  saveLocalProgress(local);
  try{const cloud=await loadCloudProgress();const merged=mergeProgress(local,cloud);merged.updated_at=new Date().toISOString();saveLocalProgress(merged);await saveCloudProgress(merged);window.dispatchEvent(new CustomEvent('learningProgressSynced',{detail:merged}));return merged}catch(e){console.warn('Learning cloud sync unavailable; continuing offline.',e);return local}
}
async function initLearningSync(){
  const ok=await ensureClient();
  if(!ok)return;
  try{
    const cloud=await loadCloudProgress();
    if(cloud){const merged=mergeProgress(localProgress(),cloud);saveLocalProgress(merged)}
  }catch(e){console.warn('Could not load cloud progress.',e)}
}
window.LearningSync={init:initLearningSync,signInOrSignUp,loadCloudProgress,saveCloudProgress,sync:syncProgress,getLocal:localProgress};
