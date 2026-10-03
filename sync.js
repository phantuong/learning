// Cloud progress sync for the personal Learning app.
// The publishable key is intended for frontend use; database access is protected by RLS.
const SUPABASE_URL='https://ksqfcwjcijflvzzopkko.supabase.co';
const SUPABASE_KEY='sb_publishable_3WEpXJJe1HEgNJ4mfwmhUw_4jV9pQqg';
const SYNC_STORAGE='learningProgressV1';
let supabaseClient=null,syncReady=false;
function localProgress(){try{return JSON.parse(localStorage.getItem(SYNC_STORAGE)||'{}')}catch(e){return {}}}
function saveLocalProgress(p){localStorage.setItem(SYNC_STORAGE,JSON.stringify(p))}
function mergeProgress(local,cloud){const l=local||{},c=cloud||{},out={...c,...l};if((c.updated_at||'')>(l.updated_at||''))Object.assign(out,c);return out}
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
async function ensureClient(){if(syncReady)return true;if(!window.supabase?.createClient){await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js')}if(!window.supabase?.createClient)return false;supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);syncReady=true;return true}
async function getUser(){if(!await ensureClient())return null;return(await supabaseClient.auth.getUser()).data.user||null}
async function signInOrSignUp(email,password){await ensureClient();let r=await supabaseClient.auth.signInWithPassword({email,password});if(r.error)r=await supabaseClient.auth.signUp({email,password});return r}
async function loadCloudProgress(){if(!await ensureClient())return null;const u=await getUser();if(!u)return null;const {data,error}=await supabaseClient.from('learning_progress').select('*').eq('user_id',u.id).maybeSingle();if(error)throw error;return data}
async function saveCloudProgress(p){if(!await ensureClient())return false;const u=await getUser();if(!u)return false;const row={user_id:u.id,last_page:p.last_page||location.pathname,last_subject:p.last_subject||'',last_course:p.last_course||'',reading_story_current:Number(p.reading_story_current||1),reading_completed:p.reading_completed||p.reading_story_completed||[],reading_answers:p.reading_answers||{},math_progress:p.math_progress||{},shapes_progress:p.shapes_progress||{}};const {error}=await supabaseClient.from('learning_progress').upsert(row,{onConflict:'user_id'});if(error)throw error;return true}
async function save(patch={}){const local={...localProgress(),...patch,updated_at:new Date().toISOString()};saveLocalProgress(local);try{const u=await getUser();if(!u)return local;const cloud=await loadCloudProgress();const merged=mergeProgress(local,cloud);merged.updated_at=new Date().toISOString();saveLocalProgress(merged);await saveCloudProgress(merged);window.dispatchEvent(new CustomEvent('learningProgressSynced',{detail:merged}));return merged}catch(e){console.warn('Learning cloud sync unavailable; continuing offline.',e);return local}}
async function load(){try{const cloud=await loadCloudProgress();if(!cloud)return localProgress();const merged=mergeProgress(localProgress(),cloud);saveLocalProgress(merged);return merged}catch(e){console.warn('Could not load cloud progress.',e);return localProgress()}}
async function initLearningSync(){await ensureClient();return load()}
window.LearningSync={init:initLearningSync,signInOrSignUp,getUser,loadCloudProgress,saveCloudProgress,sync:save,save,load,getLocal:localProgress};
window.learningSync={getUser,user:getUser,signInOrSignUp,load,save,sync:save,getLocal:localProgress};
