/* Cross-browser cloud sync for Learning Hub reading progress. */
(() => {
  'use strict';
  const CONFIG = window.LEARNING_SUPABASE_CONFIG || {};
  const URL = CONFIG.url || 'https://ksqfcwjcijflvzzopkko.supabase.co';
  const KEY = CONFIG.publishableKey || 'sb_publishable_3WEpXJJe1HEgNJ4mfwmhUw_4jV9pQqg';
  const LOCAL_KEY = 'learningProgressV2';
  let client = null;

  function local() {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function saveLocal(value) { localStorage.setItem(LOCAL_KEY, JSON.stringify(value || {})); }
  function newer(a, b) {
    const ta = Date.parse(a?.updated_at || '') || 0;
    const tb = Date.parse(b?.updated_at || '') || 0;
    return ta >= tb ? a : b;
  }
  async function ready() {
    if (client) return client;
    if (!window.supabase?.createClient) return null;
    client = window.supabase.createClient(URL, KEY);
    return client;
  }
  async function user() {
    const c = await ready();
    if (!c) return null;
    const { data } = await c.auth.getUser();
    return data?.user || null;
  }
  async function loadCloud() {
    const c = await ready();
    if (!c) return null;
    const u = await user();
    if (!u) return null;
    const { data, error } = await c.from('learning_progress').select('*').eq('user_id', u.id).maybeSingle();
    if (error) throw error;
    return data;
  }
  async function saveCloud(p) {
    const c = await ready();
    if (!c) return false;
    const u = await user();
    if (!u) return false;
    const row = {
      user_id: u.id,
      last_page: p.last_page || 'doc-hieu.html',
      last_subject: p.last_subject || 'Tiếng Việt',
      last_course: p.last_course || 'Đọc Hiểu',
      reading_story_current: Number(p.reading_story_current || 1),
      reading_completed: p.reading_completed || [],
      reading_answers: p.reading_answers || {},
      math_progress: p.math_progress || {},
      shapes_progress: p.shapes_progress || {},
      updated_at: p.updated_at || new Date().toISOString()
    };
    const { error } = await c.from('learning_progress').upsert(row, { onConflict: 'user_id' });
    if (error) throw error;
    return true;
  }
  async function signIn(email, password) {
    const c = await ready();
    if (!c) throw new Error('Không tải được dịch vụ đồng bộ.');
    const { data, error } = await c.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
    return data.user;
  }
  async function signUp(email, password) {
    const c = await ready();
    if (!c) throw new Error('Không tải được dịch vụ đồng bộ.');
    const { data, error } = await c.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: location.href.split('#')[0] }
    });
    if (error) throw error;
    return data;
  }
  async function signOut() {
    const c = await ready();
    if (c) await c.auth.signOut();
  }
  async function load() {
    const cloud = await loadCloud();
    const localValue = local();
    if (!cloud) return localValue;
    const winner = newer(cloud, localValue);
    saveLocal(winner);
    return winner;
  }
  async function save(patch = {}) {
    const next = { ...local(), ...patch, updated_at: new Date().toISOString() };
    saveLocal(next);
    try {
      const u = await user();
      if (!u) return { ...next, _cloud: false };
      const cloud = await loadCloud();
      const winner = newer(next, cloud || {});
      if (winner === next) await saveCloud(next);
      else saveLocal(winner);
      return { ...winner, _cloud: true };
    } catch (error) {
      console.warn('Cloud sync unavailable; using local progress.', error);
      return { ...next, _cloud: false, _error: error };
    }
  }
  window.learningSyncV2 = { ready, user, loadCloud, saveCloud, signIn, signUp, signOut, load, save, getLocal: local };
})();
