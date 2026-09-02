const $ = (s) => document.querySelector(s);

const DEFAULT_BASE_URL = 'https://lgw.lovart.ai';
const LOVART_PREFIX = '/v1/openapi';
const MODEL_OPTIONS = [
  { value: 'generate_image_nano_banana_pro', label: 'banana pro' },
  { value: 'generate_image_nano_banana_2', label: 'banana2' },
  { value: 'generate_image_gpt_image_2_high', label: 'GPT image2 high' }
];
const DEFAULT_MODEL = 'generate_image_nano_banana_2';
const PUBLIC_READONLY_SKILLS = true;
const PUBLIC_BUILD_LABEL = 'PUBLIC · SKILLS READ ONLY';

function normalizeModel(value = '') {
  const v = String(value || '').trim();
  return MODEL_OPTIONS.some((x) => x.value === v) ? v : DEFAULT_MODEL;
}
function modelLabel(value = '') {
  return MODEL_OPTIONS.find((x) => x.value === value)?.label || 'banana2';
}
const DEFAULT_SKILLS = [
  {
    id: 'skill-rule-frame',
    name: '规则框生成器',
    category: 'UI / 规则框 / 模板',
    description: '固定模板图 + 用户风格参考图 + 多端口上传，用于生成不同风格的规则框。',
    cover: './covers/premium-ui.svg',
    promptTemplate: '生成一个画面，模板是（{{fixed:规则框尺寸模板图}}），风格是{{field:风格描述}}，角色参考：（{{field:角色参考图}}），特征描述：{{field:特征描述}}，场景参考：（{{field:场景参考图}}），场景描述：{{field:场景描述}}。请严格参考模板图的结构与尺寸关系，并综合参考图与文字描述完成设计。',
    fixedPrompt: 'Generate a game UI rules panel. Strictly follow the fixed template image for overall proportions, safe areas, inner layout logic and readability. Keep the frame structure complete, text area clear, title area prominent and the overall result readable at small sizes. Preserve clean visual hierarchy and production-ready game UI polish.',
    negativePrompt: 'messy linework, unreadable structure, cluttered frame, broken border, distorted proportions, low readability, random ornaments',
    style: 'rules-frame-ui',
    model: DEFAULT_MODEL,
    format: 'png',
    aspectRatio: '1:1',
    fixedReferences: [
      { id: 'rf-1', name: '规则框尺寸模板图', role: 'template', notes: '这是硬性结构模板，优先参考尺寸、边距、信息区分布。', src: '' }
    ],
    inputFields: [
      { id: 'f2', type: 'textarea', label: '风格描述', role: 'style-text', help: '例如：哥特吸血鬼风格，暗金与深红，干净高级。', required: true, multiple: false, maxItems: 1, placeholder: '输入风格描述…' },
      { id: 'f3', type: 'image', label: '角色参考图', role: 'character', help: '用户上传角色参考图；在这个示例里会对应图二。', required: true, multiple: false, maxItems: 1, placeholder: '' },
      { id: 'f33', type: 'textarea', label: '特征描述', role: 'instruction', help: '描述角色特征、服饰、表情或其他关键特征。', required: true, multiple: false, maxItems: 1, placeholder: '输入角色特征描述…' },
      { id: 'f4', type: 'image', label: '场景参考图', role: 'background', help: '用户上传场景参考图；在这个示例里会对应图三。', required: true, multiple: false, maxItems: 1, placeholder: '' },
      { id: 'f44', type: 'textarea', label: '场景描述', role: 'instruction', help: '描述场景氛围、光线、色彩或空间关系。', required: true, multiple: false, maxItems: 1, placeholder: '输入场景描述…' }
    ]
  },
  {
    id: 'skill-cinematic-gothic',
    name: '哥特吸血鬼电影海报',
    category: '电影海报 / 日漫CG',
    description: '高冲击力构图、非寻常视角、干净精致的哥特吸血鬼视觉。',
    cover: './covers/gothic-poster.svg',
    promptTemplate: '生成一个海报画面，角色参考：（{{field:角色参考图}}），场景参考：（{{field:场景参考图}}），风格描述：{{field:风格描述}}。',
    fixedPrompt: 'Create a cinematic 16:9 key visual in an elegant gothic vampire aesthetic. Premium Japanese anime CG finish, immaculate clean linework, refined materials, dramatic but controlled lighting, strong depth, unusual camera angle, dynamic body language and poster-level visual hierarchy. Keep the composition clean, avoid clutter, avoid noisy micro-details, preserve clear silhouettes and premium game key-art polish.',
    negativePrompt: 'messy linework, cluttered composition, low detail, muddy colors, flat pose, generic camera angle, excessive ornaments, visual noise',
    style: 'cinematic-gothic-anime',
    model: DEFAULT_MODEL,
    format: 'png',
    aspectRatio: '16:9',
    fixedReferences: [],
    inputFields: [
      { id: 'c1', type: 'image', label: '角色参考图', role: 'character', help: '上传角色参考图。', required: false, multiple: true, maxItems: 3, placeholder: '' },
      { id: 'c2', type: 'image', label: '场景参考图', role: 'background', help: '上传背景或氛围参考图。', required: false, multiple: true, maxItems: 3, placeholder: '' },
      { id: 'c3', type: 'textarea', label: '风格描述', role: 'style-text', help: '补充氛围、色调、材质要求。', required: false, multiple: false, maxItems: 1, placeholder: '例如：古早日漫、干净线条、红色大厅…' }
    ]
  },
  {
    id: 'skill-premium-ui',
    name: '高级哥特UI精修',
    category: 'UI / 材质精修',
    description: '保持结构和颜色，增强金属、宝石和高级完成度。',
    cover: './covers/premium-ui.svg',
    promptTemplate: '请精修这个 UI 素材，原始素材参考：（{{field:原始素材图}}），风格参考：（{{field:风格参考图}}），补充要求：{{field:补充精修要求}}。',
    fixedPrompt: 'Refine the provided game UI asset while preserving its original silhouette, proportions, color relationships and hierarchy. Make it production-ready with clean edges, restrained gothic vampire ornamentation, premium metal grain, controlled specular highlights, translucent gemstone depth, believable thickness and crisp material separation. Keep all surfaces clean and intentional rather than noisy.',
    negativePrompt: 'shape drift, color shift, over-decoration, scratched dirty surface, noisy highlights, blurry edges, random patterns',
    style: 'premium-gothic-ui',
    model: DEFAULT_MODEL,
    format: 'png',
    aspectRatio: '1:1',
    fixedReferences: [],
    inputFields: [
      { id: 'u1', type: 'image', label: '原始素材图', role: 'source', help: '上传需要精修的原图。', required: true, multiple: true, maxItems: 5, placeholder: '' },
      { id: 'u2', type: 'image', label: '风格参考图', role: 'style', help: '上传风格参考。', required: false, multiple: true, maxItems: 3, placeholder: '' },
      { id: 'u3', type: 'textarea', label: '补充精修要求', role: 'instruction', help: '例如：绿色宝石更通透，线条更干净。', required: false, multiple: false, maxItems: 1, placeholder: '填写补充精修要求…' }
    ]
  }
];

const skillList = $('#skillList');
const stage = $('#stage');
const world = $('#world');
const grid = $('#grid');
const emptyCanvas = $('#emptyCanvas');
const toastEl = $('#toast');
const dynamicFieldsHost = $('#dynamicFieldsHost');
const workspaceEl = document.querySelector('.workspace');

const state = {
  db: null,
  skills: [],
  selectedSkillId: null,
  selectedNodeId: null,
  selectedNodeIds: [],
  nodes: [],
  camera: { x: 0, y: 0, scale: 1 },
  settings: loadSettings(),
  editorId: null,
  coverDraft: '',
  lastResultUrl: '',
  panning: null,
  nodeResize: null,
  nodeDrag: null,
  selectionBox: null,
  referencePick: null,
  contextNodeId: null,
  spaceHeld: false,
  history: [],
  redoStack: [],
  historyRestoring: false,
  historyAssetPool: new Map(),
  historyAssetIndex: new Map(),
  saveTimer: null,
  runtimeInputs: {},
  editorFixedRefsDraft: [],
  editorFieldDefsDraft: [],
  composerCollapsed: false,
  armedImageField: null,
  editContext: null,
  followupModel: DEFAULT_MODEL
};

function uid(prefix = 'node') {
  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${id}`;
}
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function getSkill(id) { return state.skills.find((s) => s.id === id) || null; }
function selectedSkill() { return getSkill(state.selectedSkillId); }
function nowISO() { return new Date().toISOString(); }
function deepClone(v) { return JSON.parse(JSON.stringify(v)); }
function bg(el, url) { el.style.backgroundImage = url ? `url(${JSON.stringify(url)})` : ''; }

function ratioFromResolution(value = '') {
  const m = String(value || '').match(/(\d+)\s*[x×:]\s*(\d+)/i);
  if (!m) return '';
  const w = Number(m[1]), h = Number(m[2]);
  if (!w || !h) return '';
  const r = w / h;
  const options = [['20:9',20/9],['16:9',16/9],['4:3',4/3],['1:1',1],['3:4',3/4],['9:16',9/16],['9:20',9/20]];
  options.sort((a,b) => Math.abs(a[1]-r)-Math.abs(b[1]-r));
  return options[0][0];
}
function skillAspectRatio(skill) {
  return String(skill?.aspectRatio || ratioFromResolution(skill?.resolution) || '16:9');
}
const RUN_ASPECT_RATIOS = ['16:9','20:9','9:16','9:20'];
function runAspectRatio(skill) {
  if (!skill) return '16:9';
  const bucket = ensureRuntimeSkill(skill.id);
  const saved = String(bucket.__aspectRatio || '');
  if (RUN_ASPECT_RATIOS.includes(saved)) return saved;
  const fallback = skillAspectRatio(skill);
  const normalized = RUN_ASPECT_RATIOS.includes(fallback) ? fallback : '16:9';
  bucket.__aspectRatio = normalized;
  return normalized;
}
function setRunAspectRatio(skill, value) {
  if (!skill) return;
  const next = RUN_ASPECT_RATIOS.includes(String(value)) ? String(value) : '16:9';
  ensureRuntimeSkill(skill.id).__aspectRatio = next;
  saveCanvasSoon();
  const label = $('#resolutionLabel');
  if (label) label.textContent = `比例 ${next}`;
}
function nodeHasImage(node) {
  return Boolean(node && (node.type === 'image' || node.type === 'result') && node.assetUrl);
}

function selectedIds() {
  return Array.isArray(state.selectedNodeIds) ? state.selectedNodeIds.filter((id) => state.nodes.some((n) => n.id === id)) : [];
}
function selectedNodes() {
  const ids = new Set(selectedIds());
  return state.nodes.filter((n) => ids.has(n.id));
}
function isNodeSelected(id) { return selectedIds().includes(id); }
function selectOnly(id) {
  state.selectedNodeIds = id ? [id] : [];
  state.selectedNodeId = id || null;
  renderSelectionPanels();
}
function toggleNodeSelection(id) {
  const ids = selectedIds();
  const idx = ids.indexOf(id);
  if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
  state.selectedNodeIds = ids;
  state.selectedNodeId = ids.length ? ids[ids.length - 1] : null;
  renderSelectionPanels();
}
function setSelection(ids = []) {
  const unique = [...new Set(ids)].filter((id) => state.nodes.some((n) => n.id === id));
  state.selectedNodeIds = unique;
  state.selectedNodeId = unique.length ? unique[unique.length - 1] : null;
  renderSelectionPanels();
}
function packHistoryValue(value) {
  if (typeof value === 'string' && value.startsWith('data:image/')) {
    let key = state.historyAssetIndex.get(value);
    if (!key) { key = `asset-${state.historyAssetPool.size + 1}`; state.historyAssetIndex.set(value, key); state.historyAssetPool.set(key, value); }
    return { __historyAsset: key };
  }
  if (Array.isArray(value)) return value.map(packHistoryValue);
  if (value && typeof value === 'object') { const out = {}; for (const [k,v] of Object.entries(value)) out[k] = packHistoryValue(v); return out; }
  return value;
}
function unpackHistoryValue(value) {
  if (Array.isArray(value)) return value.map(unpackHistoryValue);
  if (value && typeof value === 'object') {
    if (value.__historyAsset) return state.historyAssetPool.get(value.__historyAsset) || '';
    const out = {}; for (const [k,v] of Object.entries(value)) out[k] = unpackHistoryValue(v); return out;
  }
  return value;
}
function snapshotCanvasState() {
  return JSON.stringify(packHistoryValue({ nodes: state.nodes, runtimeInputs: state.runtimeInputs }));
}
function pushHistory() {
  if (state.historyRestoring) return;
  const snap = snapshotCanvasState();
  if (state.history[state.history.length - 1] === snap) return;
  state.history.push(snap);
  if (state.history.length > 30) state.history.shift();
  state.redoStack = [];
  updateUndoRedoButtons();
}
function restoreSnapshot(snapshot) {
  if (!snapshot) return;
  try {
    const parsed = unpackHistoryValue(JSON.parse(snapshot));
    state.historyRestoring = true;
    state.nodes = Array.isArray(parsed.nodes) ? parsed.nodes : [];
    state.runtimeInputs = parsed.runtimeInputs || {};
    setSelection([]);
    state.editContext = null;
    state.referencePick = null;
    state.armedImageField = null;
    renderComposer(); renderCanvas(); renderReferencePickBar();
    saveCanvasSoon();
  } finally { state.historyRestoring = false; }
}
function undoCanvas() {
  if (!state.history.length) return toast('没有可撤销的操作');
  const current = snapshotCanvasState();
  const prev = state.history.pop();
  state.redoStack.push(current);
  restoreSnapshot(prev);
  updateUndoRedoButtons();
  toast('已撤销');
}
function redoCanvas() {
  if (!state.redoStack.length) return toast('没有可重做的操作');
  const current = snapshotCanvasState();
  const next = state.redoStack.pop();
  state.history.push(current);
  restoreSnapshot(next);
  updateUndoRedoButtons();
  toast('已重做');
}
function updateUndoRedoButtons() {
  const u = $('#undoBtn'), r = $('#redoBtn');
  if (u) u.disabled = state.history.length === 0;
  if (r) r.disabled = state.redoStack.length === 0;
}

function loadSettings() {
  const fallback = {
    accessKey: '',
    secretKey: '',
    baseUrl: DEFAULT_BASE_URL,
    projectId: '',
    agentMode: 'fast',
    mock: false
  };
  try {
    const saved = JSON.parse(localStorage.getItem('skillCanvas.apiSettings') || '{}');
    return {
      ...fallback,
      ...saved,
      accessKey: String(saved.accessKey || ''),
      secretKey: String(saved.secretKey || ''),
      baseUrl: String(saved.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, ''),
      projectId: String(saved.projectId || ''),
      agentMode: saved.agentMode === 'thinking' ? 'thinking' : 'fast'
    };
  } catch {
    return fallback;
  }
}
function saveSettings() {
  localStorage.setItem('skillCanvas.apiSettings', JSON.stringify(state.settings));
}
function blockSkillMutation() {
  toast('公开版 Skill 为只读，无法新建、编辑、删除或导入覆盖。', true);
  return false;
}

function toast(message, error = false) {
  toastEl.textContent = message;
  toastEl.classList.toggle('error', error);
  toastEl.classList.add('show');
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

function normalizeRef(input = {}) {
  return {
    id: String(input.id || uid('ref')),
    name: String(input.name || '未命名参考图').trim().slice(0, 80),
    role: String(input.role || 'reference').trim().slice(0, 40),
    notes: String(input.notes || '').trim().slice(0, 500),
    src: String(input.src || '').trim()
  };
}

function normalizeField(input = {}) {
  const type = ['image', 'text', 'textarea'].includes(input.type) ? input.type : 'image';
  const multiple = type === 'image' ? Boolean(input.multiple) : false;
  return {
    id: String(input.id || uid('field')),
    type,
    label: String(input.label || '未命名字段').trim().slice(0, 80),
    role: String(input.role || (type === 'image' ? 'reference' : 'instruction')).trim().slice(0, 40),
    help: String(input.help || '').trim().slice(0, 500),
    required: Boolean(input.required),
    multiple,
    maxItems: type === 'image' ? clamp(Number(input.maxItems) || (multiple ? 3 : 1), 1, 12) : 1,
    placeholder: String(input.placeholder || '').trim().slice(0, 200)
  };
}

function cleanSkill(input = {}, existing = {}) {
  const t = nowISO();
  return {
    id: existing.id || input.id || uid('skill'),
    name: String(input.name || existing.name || '未命名 Skill').trim().slice(0, 80),
    category: String(input.category ?? existing.category ?? '').trim().slice(0, 80),
    description: String(input.description ?? existing.description ?? '').trim().slice(0, 300),
    cover: String(input.cover ?? existing.cover ?? '').trim(),
    promptTemplate: String(input.promptTemplate ?? existing.promptTemplate ?? '').trim(),
    fixedPrompt: String(input.fixedPrompt ?? existing.fixedPrompt ?? '').trim(),
    negativePrompt: String(input.negativePrompt ?? existing.negativePrompt ?? '').trim(),
    style: String(input.style ?? existing.style ?? '').trim().slice(0, 120),
    model: normalizeModel(input.model ?? existing.model ?? DEFAULT_MODEL),
    format: String(input.format ?? existing.format ?? 'png').trim().slice(0, 20),
    aspectRatio: String((input.aspectRatio ?? existing.aspectRatio ?? ratioFromResolution(input.resolution ?? existing.resolution)) || '16:9').trim().slice(0, 20),
    fixedReferences: (input.fixedReferences ?? existing.fixedReferences ?? []).map(normalizeRef),
    inputFields: (input.inputFields ?? existing.inputFields ?? []).map(normalizeField),
    createdAt: existing.createdAt || input.createdAt || t,
    updatedAt: t
  };
}

function ensureRuntimeSkill(skillId) {
  if (!state.runtimeInputs[skillId]) state.runtimeInputs[skillId] = {};
  return state.runtimeInputs[skillId];
}
function getFieldValue(skillId, field) {
  const bucket = ensureRuntimeSkill(skillId);
  if (!(field.id in bucket)) bucket[field.id] = field.type === 'image' ? [] : '';
  return bucket[field.id];
}
function setFieldValue(skillId, fieldId, value) {
  ensureRuntimeSkill(skillId)[fieldId] = value;
  saveCanvasSoon();
}

// ---------------- IndexedDB ----------------
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('aiSkillCanvasDB', 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('skills')) db.createObjectStore('skills', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB 打开失败'));
  });
}
function storeRequest(storeName, mode, operation) {
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    let request;
    try { request = operation(store); } catch (e) { reject(e); return; }
    if (request) {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } else {
      tx.oncomplete = () => resolve();
    }
    tx.onerror = () => reject(tx.error);
  });
}
async function dbGetAllSkills() { return storeRequest('skills', 'readonly', (s) => s.getAll()); }
async function dbPutSkill(skill) { if (PUBLIC_READONLY_SKILLS) return blockSkillMutation(); await storeRequest('skills', 'readwrite', (s) => s.put(skill)); }
async function dbDeleteSkill(id) { if (PUBLIC_READONLY_SKILLS) return blockSkillMutation(); await storeRequest('skills', 'readwrite', (s) => s.delete(id)); }
async function dbClearSkills() { if (PUBLIC_READONLY_SKILLS) return blockSkillMutation(); await storeRequest('skills', 'readwrite', (s) => s.clear()); }
async function dbGetMeta(key, fallback = null) {
  const row = await storeRequest('meta', 'readonly', (s) => s.get(key));
  return row ? row.value : fallback;
}
async function dbSetMeta(key, value) { await storeRequest('meta', 'readwrite', (s) => s.put({ key, value })); }

function saveCanvasSoon() {
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(async () => {
    try {
      await dbSetMeta('canvas', { nodes: state.nodes, camera: state.camera, runtimeInputs: state.runtimeInputs });
    } catch (e) {
      toast(`画布自动保存失败：${e.message}`, true);
    }
  }, 120);
}

async function seedIfNeeded() {
  if (PUBLIC_READONLY_SKILLS) {
    return DEFAULT_SKILLS.map((item) => cleanSkill(item));
  }
  const skills = await dbGetAllSkills();
  if (skills.length) return skills;
  for (const item of DEFAULT_SKILLS) await dbPutSkill(cleanSkill(item));
  return dbGetAllSkills();
}

// ---------------- Skills list + composer ----------------
function openSkillPicker() {
  renderSkills();
  $('#skillPickerModal')?.classList.remove('hidden');
  setTimeout(() => $('#skillSearch')?.focus(), 30);
}
function closeSkillPicker() {
  $('#skillPickerModal')?.classList.add('hidden');
}
function setActiveSkill(id, preserveEdit = false) {
  if (state.selectedSkillId !== id) state.armedImageField = null;
  if (!preserveEdit && state.editContext && state.editContext.skillId !== id) state.editContext = null;
  state.selectedSkillId = id;
  localStorage.setItem('skillCanvas.selectedSkillId', id || '');
  renderSkills();
  renderComposer();
}

function renderSkills() {
  const input = $('#skillSearch');
  const q = (input?.value || '').trim().toLowerCase();
  if (!skillList) return;
  skillList.replaceChildren();
  const filtered = state.skills.filter((s) => !q || `${s.name} ${s.category} ${s.description}`.toLowerCase().includes(q));
  for (const skill of filtered) {
    const row = document.createElement('div');
    row.className = `skill-picker-item${skill.id === state.selectedSkillId ? ' active' : ''}`;
    row.dataset.id = skill.id;

    const cover = document.createElement('div');
    cover.className = 'skill-picker-cover';
    bg(cover, skill.cover);

    const info = document.createElement('div');
    info.className = 'skill-picker-info';
    const name = document.createElement('div'); name.className = 'skill-picker-name'; name.textContent = skill.name;
    const desc = document.createElement('div'); desc.className = 'skill-picker-desc'; desc.textContent = skill.category || skill.description || 'Skill';
    info.append(name, desc);

    const selected = document.createElement('div');
    selected.className = 'skill-picker-selected';
    selected.textContent = skill.id === state.selectedSkillId ? '✓ 已选择' : '选择';

    const readonly = document.createElement('div');
    readonly.className = 'skill-picker-readonly';
    readonly.textContent = '只读';

    row.append(cover, info, readonly, selected);
    row.addEventListener('click', () => {
      setActiveSkill(skill.id);
      closeSkillPicker();
      toast(`已选择 Skill：${skill.name}`);
    });
    skillList.append(row);
  }
  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'skill-picker-empty';
    empty.textContent = '没有找到 Skill';
    skillList.append(empty);
  }
}

function renderComposer() {
  const skill = selectedSkill();
  const pill = $('#activeSkillPill');
  pill.textContent = skill ? `✦ ${skill.name}` : '未选择 Skill';
  pill.classList.toggle('active', Boolean(skill));
  $('#resolutionLabel').textContent = skill ? `比例 ${runAspectRatio(skill)}` : '—';
  $('#formatLabel').textContent = skill ? `${String(skill.format || 'png').toUpperCase()} · ${modelLabel(skill.model)}` : '—';
  const aspectWrap = $('#runtimeAspectRatioWrap');
  const aspectSelect = $('#runtimeAspectRatio');
  if (aspectWrap) aspectWrap.classList.toggle('hidden', !skill);
  if (aspectSelect && skill) aspectSelect.value = runAspectRatio(skill);
  $('#generateBtn').disabled = !skill;
  $('#connectionLabel').textContent = state.settings.mock ? 'Mock 模式' : (state.settings.accessKey && state.settings.secretKey ? 'AK/SK 已设置' : '未设置 AK/SK');
  const followWrap = $('#followupModelWrap');
  const followSelect = $('#followupModelSelect');
  $('#composerWrap')?.classList.toggle('edit-mode', Boolean(state.editContext));
  if (followSelect && !followSelect.options.length) MODEL_OPTIONS.forEach((m) => { const o = document.createElement('option'); o.value = m.value; o.textContent = m.label; followSelect.append(o); });
  if (followSelect) followSelect.value = normalizeModel(state.followupModel || skill?.model || DEFAULT_MODEL);
  if (followWrap) followWrap.classList.toggle('hidden', !state.editContext);
  renderRuntimeFields(skill);
  renderEditContext();
  setComposerCollapsed(false, false);
}

function setComposerCollapsed(collapsed, save = true) {
  state.composerCollapsed = false;
  const wrap = $('#composerWrap');
  if (!wrap) return;
  wrap.classList.remove('collapsed');
  const btn = $('#composerToggleBtn');
  if (btn) btn.textContent = '输入面板';
  if (save) localStorage.setItem('skillCanvas.composerCollapsed', '0');
}
function renderEditContext() {
  const badge = $('#editContextBadge');
  const title = $('#editContextTitle');
  const count = $('#generationCount');
  const countWrap = $('#generationCountWrap');
  const followWrap = $('#followupModelWrap');
  const followSelect = $('#followupModelSelect');
  const sourcePreview = $('#editSourcePreview');
  const sourceImage = $('#editSourceImage');
  const sourceName = $('#editSourceName');
  const sourceLabel = sourcePreview?.querySelector('.edit-source-label');
  const sourceHelp = sourcePreview?.querySelector('.edit-source-help');
  const editSelectedBtn = $('#editSelectedAssetBtn');
  const composerWrap = $('#composerWrap');
  if (!badge || !title) return;

  const editing = Boolean(state.editContext);
  composerWrap?.classList.toggle('edit-mode', editing);

  if (editing) {
    badge.classList.remove('hidden');
    title.textContent = state.editContext.title || '生成结果';
    $('#userPrompt').placeholder = '输入继续修改要求，例如：把背景改为夜晚、角色姿势不变、金属更亮…';
    if (count) { count.value = '1'; count.disabled = true; }
    if (countWrap) countWrap.classList.add('hidden');
    if (followSelect) followSelect.value = normalizeModel(state.followupModel || state.editContext.model || selectedSkill()?.model || DEFAULT_MODEL);
    if (followWrap) followWrap.classList.remove('hidden');
    if (sourcePreview) sourcePreview.classList.remove('hidden');
    if (sourceImage) sourceImage.src = state.editContext.assetUrl || '';
    if (sourceName) sourceName.textContent = state.editContext.title || '画布图片';
    if (sourceLabel) sourceLabel.textContent = '当前编辑图片';
    if (sourceHelp) sourceHelp.textContent = '直接在下面输入修改要求；只有点击生成时才会真正执行 AI 编辑。';
    if (editSelectedBtn) editSelectedBtn.classList.add('hidden');
  } else {
    badge.classList.add('hidden');
    title.textContent = '';
    $('#userPrompt').placeholder = '补充要求（可选）。例如：画面更华丽、结构更简洁、加强某部分质感…';
    if (count) count.disabled = false;
    if (countWrap) countWrap.classList.remove('hidden');
    if (followWrap) followWrap.classList.add('hidden');
    if (sourcePreview) sourcePreview.classList.add('hidden');
    if (sourceImage) sourceImage.removeAttribute('src');
    if (sourceName) sourceName.textContent = '';
    if (editSelectedBtn) editSelectedBtn.classList.add('hidden');
  }
}

function clearEditContext() {
  state.editContext = null;
  renderEditContext();
  renderRuntimeFields(selectedSkill());
  renderComposer();
  toast('已退出继续编辑模式');
}

async function appendFilesToImageField(skill, field, files) {
  const imageFiles = [...(files || [])].filter((f) => f && f.type && f.type.startsWith('image/'));
  if (!imageFiles.length) return false;
  const current = Array.isArray(getFieldValue(skill.id, field)) ? [...getFieldValue(skill.id, field)] : [];
  const maxLeft = Math.max(0, Number(field.maxItems || 1) - current.length);
  if (maxLeft <= 0) {
    toast(`「${field.label}」最多 ${field.maxItems} 张`, true);
    return true;
  }
  const selected = imageFiles.slice(0, maxLeft);
  const converted = [];
  for (const f of selected) converted.push({ id: uid('img'), name: f.name, src: await fileToDataURL(f) });
  setFieldValue(skill.id, field.id, current.concat(converted));
  renderRuntimeFields(skill);
  if (imageFiles.length > selected.length) toast(`已添加 ${selected.length} 张，超出上限的图片已忽略`, true);
  else toast(`已添加 ${selected.length} 张到「${field.label}」`);
  return true;
}
function setArmedImageField(skill, field, silent = false) {
  state.armedImageField = { skillId: skill.id, fieldId: field.id };
  state.referencePick = { skillId: skill.id, fieldId: field.id, nodeIds: [] };
  renderRuntimeFields(skill);
  renderReferencePickBar();
  renderCanvas();
  if (!silent) toast(`正在选择「${field.label}」参考图，选完后点击“完成”`);
}
function clearArmedImageFieldIfMatch(skillId, fieldId) {
  if (state.armedImageField?.skillId === skillId && state.armedImageField?.fieldId === fieldId) cancelReferencePick(false);
}
function renderReferencePickBar() {
  const bar = $('#referencePickBar');
  if (!bar) return;
  const pick = state.referencePick;
  if (!pick) { bar.classList.add('hidden'); return; }
  const skill = getSkill(pick.skillId);
  const field = skill?.inputFields?.find((f) => f.id === pick.fieldId);
  if (!skill || !field) { state.referencePick = null; state.armedImageField = null; bar.classList.add('hidden'); return; }
  bar.classList.remove('hidden');
  $('#referencePickTitle').textContent = `正在选择：${field.label}`;
  $('#referencePickCount').textContent = `已选 ${pick.nodeIds.length}/${field.maxItems}`;
}
function cancelReferencePick(showToast = true) {
  state.referencePick = null;
  state.armedImageField = null;
  renderReferencePickBar();
  renderRuntimeFields(selectedSkill());
  renderCanvas();
  if (showToast) toast('已取消参考图选择');
}
function finishReferencePick() {
  const pick = state.referencePick;
  if (!pick) return;
  const skill = getSkill(pick.skillId);
  const field = skill?.inputFields?.find((f) => f.id === pick.fieldId);
  if (!skill || !field) return cancelReferencePick(false);
  const nodes = pick.nodeIds.map((id) => state.nodes.find((n) => n.id === id)).filter(nodeHasImage);
  if (!nodes.length) return toast('请至少选择一张画布图片', true);
  pushHistory();
  let current = Array.isArray(getFieldValue(skill.id, field)) ? [...getFieldValue(skill.id, field)] : [];
  if (Number(field.maxItems || 1) <= 1) current = [];
  for (const node of nodes) {
    if (current.length >= field.maxItems) break;
    if (!current.some((x) => x.src === node.assetUrl)) current.push({ id: uid('img'), name: node.title || node.fileName || '画布图片', src: node.assetUrl, canvasNodeId: node.id });
  }
  setFieldValue(skill.id, field.id, current);
  state.referencePick = null; state.armedImageField = null;
  renderReferencePickBar(); renderRuntimeFields(skill); renderCanvas();
  toast(`已填入「${field.label}」`);
}

function renderRuntimeFields(skill) {
  dynamicFieldsHost.replaceChildren();
  if (!skill) return;
  if (state.editContext) {
    return;
  }
  if (!skill.inputFields.length) {
    const simple = document.createElement('div');
    simple.className = 'runtime-field full';
    simple.innerHTML = '<div class="runtime-title">这个 Skill 没有额外输入端口</div><div class="runtime-help">你只需要在下面输入补充要求，然后点击生成。</div>';
    dynamicFieldsHost.append(simple);
    return;
  }

  for (const field of skill.inputFields) {
    const wrap = document.createElement('div');
    const textLike = field.type === 'text' || field.type === 'textarea';
    wrap.className = `runtime-field${textLike ? ' full runtime-text-field' : ''}${field.type === 'textarea' ? ' runtime-textarea-field' : ''}`;
    const head = document.createElement('div');
    head.className = 'runtime-head';
    head.innerHTML = `<div><div class="runtime-title">${escapeHtml(field.label)} ${field.required ? '<span class="required-star">*</span>' : ''}</div><div class="runtime-help">${escapeHtml(field.help || '')}</div></div><div class="field-tag">${escapeHtml(field.role || field.type)}</div>`;
    wrap.append(head);

    if (field.type === 'image') {
      const value = getFieldValue(skill.id, field);
      const isArmed = state.armedImageField?.skillId === skill.id && state.armedImageField?.fieldId === field.id;
      wrap.classList.add('runtime-image-field');
      if (isArmed) wrap.classList.add('runtime-image-field-active');
      wrap.dataset.runtimeImageField = '1';
      wrap.addEventListener('click', (e) => {
        if (e.target.closest('button, input, label, textarea, .thumb-card')) return;
        setArmedImageField(skill, field, true);
      });
      wrap.addEventListener('dragover', (e) => {
        const hasFiles = [...(e.dataTransfer?.items || [])].some((it) => it.kind === 'file' && String(it.type || '').startsWith('image/'));
        if (!hasFiles) return;
        e.preventDefault();
        e.stopPropagation();
        wrap.classList.add('runtime-image-field-drop');
        e.dataTransfer.dropEffect = 'copy';
      });
      wrap.addEventListener('dragleave', (e) => {
        if (!wrap.contains(e.relatedTarget)) wrap.classList.remove('runtime-image-field-drop');
      });
      wrap.addEventListener('drop', async (e) => {
        const files = [...(e.dataTransfer?.files || [])].filter((f) => f.type?.startsWith('image/'));
        if (!files.length) return;
        e.preventDefault();
        e.stopPropagation();
        wrap.classList.remove('runtime-image-field-drop');
        await appendFilesToImageField(skill, field, files);
      });
      const actions = document.createElement('div');
      actions.className = 'image-uploader-actions';
      const fileLabel = document.createElement('label');
      fileLabel.className = 'secondary file-btn';
      fileLabel.textContent = field.multiple || field.maxItems > 1 ? '上传图片' : '上传图片';
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = field.multiple || field.maxItems > 1;
      input.hidden = true;
      input.addEventListener('change', async (e) => {
        const files = [...(e.target.files || [])];
        if (!files.length) return;
        await appendFilesToImageField(skill, field, files);
        e.target.value = '';
      });
      fileLabel.append(input);
      const urlBtn = document.createElement('button');
      urlBtn.className = 'secondary';
      urlBtn.textContent = '通过 URL 添加';
      urlBtn.addEventListener('click', () => {
        const url = prompt(`请输入「${field.label}」图片 URL`);
        if (!url) return;
        const current = Array.isArray(getFieldValue(skill.id, field)) ? [...getFieldValue(skill.id, field)] : [];
        if (current.length >= field.maxItems) return toast(`这个端口最多 ${field.maxItems} 张`, true);
        current.push({ id: uid('img'), name: `URL ${current.length + 1}`, src: String(url).trim() });
        setFieldValue(skill.id, field.id, current);
        renderRuntimeFields(skill);
      });
      const canvasBtn = document.createElement('button');
      canvasBtn.className = state.armedImageField?.skillId === skill.id && state.armedImageField?.fieldId === field.id ? 'secondary canvas-pick-active' : 'secondary';
      canvasBtn.textContent = state.armedImageField?.skillId === skill.id && state.armedImageField?.fieldId === field.id ? '选图中 · 顶部完成' : '从画布选图';
      canvasBtn.addEventListener('click', () => armCanvasImageField(skill, field));
      const cap = document.createElement('div');
      cap.className = 'runtime-help';
      cap.textContent = `最多 ${field.maxItems} 张 · “从画布选图”支持连续选择，选完后点击画布顶部“完成”`; 
      actions.append(fileLabel, urlBtn, canvasBtn, cap);
      wrap.append(actions);

      const grid = document.createElement('div');
      grid.className = 'thumb-grid';
      if (!value.length) {
        const empty = document.createElement('div');
        empty.className = 'port-empty';
        empty.textContent = '还没有上传图片';
        wrap.append(empty);
      } else {
        value.forEach((img, idx) => {
          const card = document.createElement('div'); card.className = 'thumb-card';
          const iv = document.createElement('div'); iv.className = 'thumb-image'; bg(iv, img.src);
          const body = document.createElement('div'); body.className = 'thumb-card-body';
          const nm = document.createElement('div'); nm.className = 'thumb-name'; nm.textContent = img.name || `${field.label} ${idx + 1}`;
          const role = document.createElement('div'); role.className = 'thumb-role'; role.textContent = field.role || 'reference';
          const acts = document.createElement('div'); acts.className = 'thumb-actions';
          const del = document.createElement('button'); del.textContent = '删除';
          del.addEventListener('click', () => {
            const current = [...getFieldValue(skill.id, field)];
            pushHistory(); current.splice(idx, 1); setFieldValue(skill.id, field.id, current); renderRuntimeFields(skill);
          });
          acts.append(del); body.append(nm, role, acts); card.append(iv, body); grid.append(card);
        });
        wrap.append(grid);
      }
    } else if (field.type === 'text') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'runtime-long-text-input';
      input.placeholder = field.placeholder || `填写${field.label}`;
      input.value = String(getFieldValue(skill.id, field) || '');
      input.addEventListener('input', (e) => setFieldValue(skill.id, field.id, e.target.value));
      wrap.append(input);
    } else {
      const textarea = document.createElement('textarea');
      textarea.rows = 6;
      textarea.className = 'runtime-description-textarea';
      textarea.placeholder = field.placeholder || `填写${field.label}`;
      textarea.value = String(getFieldValue(skill.id, field) || '');
      textarea.addEventListener('input', (e) => setFieldValue(skill.id, field.id, e.target.value));
      wrap.append(textarea);
    }

    dynamicFieldsHost.append(wrap);
  }
}

function armCanvasImageField(skill, field) {
  setArmedImageField(skill, field);
}
function assignCanvasNodeToField(node, skill, field) {
  if (!nodeHasImage(node)) return toast('请选择画布中的图片或生成结果', true);
  pushHistory();
  let current = Array.isArray(getFieldValue(skill.id, field)) ? [...getFieldValue(skill.id, field)] : [];
  if (Number(field.maxItems || 1) <= 1) current = [];
  if (!current.some((x) => x.src === node.assetUrl)) current.push({ id: uid('img'), name: node.title || node.fileName || '画布图片', src: node.assetUrl, canvasNodeId: node.id });
  current = current.slice(0, field.maxItems);
  setFieldValue(skill.id, field.id, current);
  renderRuntimeFields(skill);
}
function handleArmedCanvasPick(node) {
  const pick = state.referencePick;
  if (!pick || !nodeHasImage(node)) return false;
  const skill = getSkill(pick.skillId);
  const field = skill?.inputFields?.find((f) => f.id === pick.fieldId);
  if (!skill || !field) { cancelReferencePick(false); return false; }
  const ids = [...pick.nodeIds];
  const idx = ids.indexOf(node.id);
  if (idx >= 0) ids.splice(idx, 1);
  else {
    if (ids.length >= field.maxItems) return toast(`「${field.label}」最多选择 ${field.maxItems} 张`, true), true;
    ids.push(node.id);
  }
  state.referencePick.nodeIds = ids;
  renderReferencePickBar(); renderCanvas();
  return true;
}

// ---------------- Canvas ----------------
function applyCamera() {
  const c = state.camera;
  world.style.transform = `translate(${c.x}px, ${c.y}px) scale(${c.scale})`;
  world.style.setProperty('--canvas-ui-scale', String(1 / Math.max(c.scale, 0.001)));
  grid.style.backgroundSize = `${24 * c.scale}px ${24 * c.scale}px`;
  grid.style.backgroundPosition = `${c.x}px ${c.y}px`;
  $('#zoomLabel').textContent = `${Math.round(c.scale * 100)}%`;
}
function canvasCenterWorld() {
  const rect = stage.getBoundingClientRect();
  return { x: (rect.width / 2 - state.camera.x) / state.camera.scale, y: (rect.height / 2 - state.camera.y) / state.camera.scale };
}
function addSkillNode(skillId, at = null) {
  const skill = getSkill(skillId); if (!skill) return;
  const center = at || canvasCenterWorld();
  const count = state.nodes.filter((n) => n.type === 'skill').length;
  const node = { id: uid('skillnode'), type: 'skill', skillId, x: center.x - 170 + (count % 4) * 18, y: center.y - 135 + (count % 4) * 18 };
  pushHistory();
  state.nodes.push(node); selectOnly(node.id); saveCanvasSoon(); renderCanvas();
}
function resultNodePosition(skillId) {
  const lastResult = [...state.nodes].reverse().find((n) => n.type === 'result' && n.skillId === skillId);
  if (lastResult) return { x: lastResult.x + 425, y: lastResult.y };
  const existing = [...state.nodes].reverse().find((n) => n.type === 'skill' && n.skillId === skillId);
  if (existing) return { x: existing.x + 385, y: existing.y + 18 };
  const c = canvasCenterWorld(); return { x: c.x - 195, y: c.y - 170 };
}
async function addImageNode(src, title = '本地图片', at = null) {
  if (!src) return;
  const center = at || canvasCenterWorld();
  const count = state.nodes.filter((n) => n.type === 'image').length;
  const size = await getImageNaturalSize(src);
  const node = {
    id: uid('image'), type: 'image', assetUrl: src,
    title: title || '本地图片', fileName: title || '本地图片',
    imageWidth: size.width || 320, imageHeight: size.height || 240,
    x: center.x - (size.width || 320) / 2 + (count % 5) * 20,
    y: center.y - (size.height || 240) / 2 + (count % 5) * 20,
    createdAt: nowISO()
  };
  pushHistory();
  state.nodes.push(node); selectOnly(node.id); saveCanvasSoon(); renderCanvas();
  return node;
}
function getNodeImageScale(node) {
  return clamp(Number(node?.imageScale || 1), 0.1, 6);
}
function applyNodeImageSize(node, shellEl, mediaEl) {
  if (!node || !shellEl || !mediaEl) return;
  const w = Math.max(24, Math.round((Number(node.imageWidth) || 320) * getNodeImageScale(node)));
  const h = Math.max(24, Math.round((Number(node.imageHeight) || 240) * getNodeImageScale(node)));
  shellEl.style.width = `${w}px`;
  mediaEl.style.width = `${w}px`;
  mediaEl.style.height = `${h}px`;
}
function resizeImageNode(node, factor) {
  if (!nodeHasImage(node)) return;
  node.imageScale = clamp(getNodeImageScale(node) * factor, 0.1, 6);
  saveCanvasSoon();
  renderCanvas();
  toast(`图片缩放：${Math.round(node.imageScale * 100)}%`);
}
function getNodeDisplaySize(node, fallbackW = 320, fallbackH = 240) {
  return {
    width: Math.max(24, Math.round((Number(node?.imageWidth) || fallbackW) * getNodeImageScale(node))),
    height: Math.max(24, Math.round((Number(node?.imageHeight) || fallbackH) * getNodeImageScale(node)))
  };
}
function beginNodeResize(e, node, handle) {
  if (e.button !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  const size = getNodeDisplaySize(node, node.type === 'result' ? 390 : 320, node.type === 'result' ? 260 : 240);
  const anchor = { x: node.x, y: node.y };
  if (handle === 'nw') { anchor.x = node.x + size.width; anchor.y = node.y + size.height; }
  if (handle === 'ne') { anchor.x = node.x; anchor.y = node.y + size.height; }
  if (handle === 'sw') { anchor.x = node.x + size.width; anchor.y = node.y; }
  if (handle === 'se') { anchor.x = node.x; anchor.y = node.y; }
  if (node.locked) return toast('这个对象已锁定');
  pushHistory();
  selectOnly(node.id);
  state.nodeResize = {
    id: node.id,
    handle,
    anchorX: anchor.x,
    anchorY: anchor.y,
    baseWidth: Number(node.imageWidth) || size.width,
    baseHeight: Number(node.imageHeight) || size.height
  };
  window.document.body.style.userSelect = 'none';
  renderCanvas();
}
function appendImageSelectionUI(node, shellEl, mediaEl, actions = []) {
  const refIdx = state.referencePick?.nodeIds?.indexOf(node.id) ?? -1;
  if (refIdx >= 0) {
    const refBadge = document.createElement('div');
    refBadge.className = 'reference-order-badge';
    refBadge.textContent = String(refIdx + 1);
    mediaEl.append(refBadge);
  }
  if (!isNodeSelected(node.id) || selectedIds().length !== 1) return;
  const toolbar = document.createElement('div');
  toolbar.className = 'image-floating-toolbar';
  const makeTool = (label, onClick, extra = '') => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `image-tool-btn ${extra}`.trim();
    btn.textContent = label;
    btn.addEventListener('click', (e) => { e.stopPropagation(); onClick(e); });
    return btn;
  };
  actions.forEach((item) => {
    if (!item || !item.label || typeof item.onClick !== 'function') return;
    toolbar.append(makeTool(item.label, item.onClick, item.className || ''));
  });
  mediaEl.append(toolbar);

  if (!node.locked) ['nw','ne','sw','se'].forEach((handle) => {
    const grip = document.createElement('div');
    grip.className = `resize-handle resize-${handle}`;
    grip.title = '拖动调整图片大小';
    grip.addEventListener('pointerdown', (e) => beginNodeResize(e, node, handle));
    mediaEl.append(grip);
  });
}
function makeNodeShell(node, extra = '') {
  const el = document.createElement('article');
  const picked = state.referencePick?.nodeIds?.includes(node.id);
  el.className = `canvas-node ${extra}${isNodeSelected(node.id) ? ' selected' : ''}${picked ? ' reference-picked' : ''}${node.locked ? ' locked' : ''}`;
  el.dataset.nodeId = node.id;
  el.style.left = `${node.x}px`; el.style.top = `${node.y}px`;
  if ((node.type === 'image' || node.type === 'result') && node.imageWidth) el.style.width = `${Math.max(24, Math.round(node.imageWidth * getNodeImageScale(node)))}px`;
  el.addEventListener('pointerdown', (e) => beginNodeDrag(e, node));
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    stage.focus();
    if (handleArmedCanvasPick(node)) return;
    if (e.shiftKey) toggleNodeSelection(node.id); else selectOnly(node.id);
    renderCanvas();
  });
  el.addEventListener('dblclick', (e) => {
    if (!nodeHasImage(node)) return;
    e.stopPropagation();
    selectOnly(node.id); renderCanvas(); startContinueEdit(node);
  });
  el.addEventListener('contextmenu', (e) => { e.preventDefault(); e.stopPropagation(); if (!isNodeSelected(node.id)) selectOnly(node.id); openNodeContextMenu(node, e.clientX, e.clientY); renderCanvas(); });
  return el;
}

function renderSkillNode(node) {
  const skill = getSkill(node.skillId); if (!skill) return;
  const el = makeNodeShell(node, 'skill-node');
  const cover = document.createElement('div'); cover.className = 'node-cover'; bg(cover, skill.cover);
  const body = document.createElement('div'); body.className = 'node-body';
  const title = document.createElement('div'); title.className = 'node-title'; title.textContent = skill.name;
  const sub = document.createElement('div'); sub.className = 'node-sub'; sub.textContent = skill.description || skill.category || '固定提示词 Skill';
  const chips = document.createElement('div'); chips.className = 'node-meta-chips';
  chips.innerHTML = `<span class="node-chip">固定图 ${skill.fixedReferences.length}</span><span class="node-chip">端口 ${skill.inputFields.length}</span>`;
  const actions = document.createElement('div'); actions.className = 'node-actions';
  const use = document.createElement('button'); use.textContent = '设为当前 Skill';
  use.addEventListener('click', (e) => { e.stopPropagation(); setActiveSkill(skill.id); toast(`已选择：${skill.name}`); });
  actions.append(use); body.append(title, sub, chips, actions); el.append(cover, body); world.append(el);
}
function renderImageNode(node) {
  const el = makeNodeShell(node, 'image-node image-node-native');

  const media = document.createElement('div');
  media.className = 'node-image-media';
  const img = document.createElement('img');
  img.className = 'node-image-element';
  img.src = node.assetUrl;
  img.alt = node.title || '本地图片';
  img.draggable = false;
  img.addEventListener('load', () => {
    const w = img.naturalWidth || node.imageWidth || 320;
    const h = img.naturalHeight || node.imageHeight || 240;
    if (node.imageWidth !== w || node.imageHeight !== h) {
      node.imageWidth = w;
      node.imageHeight = h;
      saveCanvasSoon();
    }
    applyNodeImageSize(node, el, img);
  });
  media.append(img);
  applyNodeImageSize(node, el, img);

  const badge = document.createElement('div');
  badge.className = 'result-badge canvas-asset-badge';
  badge.textContent = 'CANVAS IMAGE';
  media.append(badge);

  el.append(media);
  appendImageSelectionUI(node, el, media, [
    { label: '编辑图片', onClick: () => startContinueEdit(node), className: 'primary' },
    { label: '作为参考图', onClick: () => quickUseAsReference(node) },
    { label: '下载', onClick: async () => { await downloadAsset(node.assetUrl, node.title || node.fileName || 'canvas-image'); } },
    { label: '···', onClick: (e) => openNodeContextMenu(node, e.clientX || 0, e.clientY || 0) }
  ]);
  world.append(el);
}


function renderResultNode(node) {
  const el = makeNodeShell(node, 'result-node image-node-native');

  const media = document.createElement('div');
  media.className = 'node-image-media';

  if (node.assetUrl) {
    const img = document.createElement('img');
    img.className = 'node-image-element';
    img.src = node.assetUrl;
    img.alt = node.title || '生成结果';
    img.draggable = false;
    img.addEventListener('load', () => {
      const w = img.naturalWidth || node.imageWidth || 390;
      const h = img.naturalHeight || node.imageHeight || 260;
      if (node.imageWidth !== w || node.imageHeight !== h) {
        node.imageWidth = w;
        node.imageHeight = h;
        saveCanvasSoon();
      }
      applyNodeImageSize(node, el, img);
    });
    media.append(img);
    applyNodeImageSize(node, el, img);
  } else {
    media.style.width = '390px';
    media.style.height = '260px';
    media.style.background = 'linear-gradient(135deg,#24182f,#111722)';
  }

  const badge = document.createElement('div');
  badge.className = `result-badge${node.mock ? ' mock' : ''}`;
  badge.textContent = node.mock ? 'MOCK RESULT' : 'AI RESULT';
  media.append(badge);

  el.append(media);
  appendImageSelectionUI(node, el, media, [
    { label: '继续编辑', onClick: () => startContinueEdit(node), className: 'primary' },
    { label: '作为参考图', onClick: () => quickUseAsReference(node) },
    { label: '下载', onClick: async () => { await downloadAsset(node.assetUrl, node.title || 'lovart-result'); } },
    { label: '···', onClick: (e) => openNodeContextMenu(node, e.clientX || 0, e.clientY || 0) }
  ]);
  world.append(el);
}

function renderCanvas() {
  world.replaceChildren();
  emptyCanvas.classList.toggle('hidden', state.nodes.length > 0);
  for (const node of state.nodes) {
    if (node.type === 'skill') renderSkillNode(node);
    else if (node.type === 'result') renderResultNode(node);
    else if (node.type === 'image') renderImageNode(node);
  }
  applyCamera();
  renderSelectionPanels();
}
async function setResultAsCover(node) {
  const skill = getSkill(node.skillId);
  if (!skill || !node.assetUrl) return toast('这条结果没有可用图片', true);
  try {
    const updated = cleanSkill({ ...skill, cover: node.assetUrl }, skill);
    await dbPutSkill(updated);
    state.skills = state.skills.map((s) => s.id === updated.id ? updated : s);
    state.lastResultUrl = node.assetUrl;
    renderSkills(); renderCanvas(); toast('已更新 Skill 封面');
  } catch (e) { toast(e.message, true); }
}

function startContinueEdit(node, options = {}) {
  if (!node?.assetUrl) return toast('这个结果没有可编辑图片', true);
  const { silent = false, preservePrompt = false } = options || {};
  selectOnly(node.id);
  state.editContext = {
    sourceNodeId: node.id,
    title: node.title || '生成结果',
    threadId: node.threadId || '',
    projectId: node.projectId || state.settings.projectId || '',
    assetUrl: node.assetUrl,
    skillId: node.skillId || state.selectedSkillId,
    model: normalizeModel(node.model || getSkill(node.skillId || state.selectedSkillId)?.model || DEFAULT_MODEL)
  };
  state.followupModel = state.editContext.model;
  if (node.skillId && getSkill(node.skillId)) setActiveSkill(node.skillId, true);
  if (!preservePrompt) $('#userPrompt').value = '';
  setComposerCollapsed(false);
  renderEditContext();
  renderRuntimeFields(selectedSkill());
  renderCanvas();
  if (!silent) {
    setTimeout(() => $('#userPrompt').focus(), 50);
    toast(node.threadId ? '已进入 Lovart 对话续编模式' : '已进入图片编辑模式');
  }
}

function beginNodeDrag(e, node) {
  if (e.button !== 0 || e.shiftKey || e.target.closest('button') || e.target.closest('.resize-handle') || e.target.closest('.image-floating-toolbar')) return;
  if (node.locked) return;
  e.stopPropagation();
  if (!isNodeSelected(node.id)) {
    if (e.shiftKey) toggleNodeSelection(node.id); else selectOnly(node.id);
  }
  pushHistory();
  e.currentTarget.setPointerCapture?.(e.pointerId);
  const ids = selectedIds();
  const bases = ids.map((id) => { const n = state.nodes.find((x) => x.id === id); return n ? { id, x: n.x, y: n.y } : null; }).filter(Boolean);
  state.nodeDrag = { ids, bases, startX: e.clientX, startY: e.clientY };
  renderCanvas();
}

stage.addEventListener('pointerdown', (e) => {
  closeContextMenu();
  const onNode = e.target.closest('.canvas-node');
  if (e.button === 1 || (e.button === 0 && state.spaceHeld)) {
    e.preventDefault();
    state.panning = { x: e.clientX, y: e.clientY, cx: state.camera.x, cy: state.camera.y };
    stage.classList.add('panning'); stage.setPointerCapture?.(e.pointerId); return;
  }
  if (e.button === 0 && state.referencePick && !onNode) return;
  if (e.button === 0 && !onNode && !e.target.closest('.composer-wrap,.zoom-controls,.topbar,.reference-pick-bar')) {
    const rect = stage.getBoundingClientRect();
    if (!e.shiftKey) setSelection([]);
    state.selectionBox = { startX: e.clientX - rect.left, startY: e.clientY - rect.top, currentX: e.clientX - rect.left, currentY: e.clientY - rect.top, additive: e.shiftKey };
    renderSelectionBox();
    stage.setPointerCapture?.(e.pointerId);
  }
});
stage.addEventListener('mousedown', (e) => {
  if (e.button === 1) e.preventDefault();
});
window.addEventListener('pointermove', (e) => {
  if (state.nodeResize) {
    const n = state.nodes.find((x) => x.id === state.nodeResize.id); if (!n) return;
    const rect = stage.getBoundingClientRect();
    const wx = (e.clientX - rect.left - state.camera.x) / state.camera.scale;
    const wy = (e.clientY - rect.top - state.camera.y) / state.camera.scale;
    const rawW = ['nw', 'sw'].includes(state.nodeResize.handle) ? (state.nodeResize.anchorX - wx) : (wx - state.nodeResize.anchorX);
    const rawH = ['nw', 'ne'].includes(state.nodeResize.handle) ? (state.nodeResize.anchorY - wy) : (wy - state.nodeResize.anchorY);
    const scaleW = rawW / state.nodeResize.baseWidth;
    const scaleH = rawH / state.nodeResize.baseHeight;
    const nextScale = clamp(Math.max(scaleW, scaleH, 0.08), 0.08, 8);
    n.imageScale = nextScale;
    const nextW = state.nodeResize.baseWidth * nextScale;
    const nextH = state.nodeResize.baseHeight * nextScale;
    if (state.nodeResize.handle === 'nw') { n.x = state.nodeResize.anchorX - nextW; n.y = state.nodeResize.anchorY - nextH; }
    if (state.nodeResize.handle === 'ne') { n.x = state.nodeResize.anchorX; n.y = state.nodeResize.anchorY - nextH; }
    if (state.nodeResize.handle === 'sw') { n.x = state.nodeResize.anchorX - nextW; n.y = state.nodeResize.anchorY; }
    if (state.nodeResize.handle === 'se') { n.x = state.nodeResize.anchorX; n.y = state.nodeResize.anchorY; }
    renderCanvas();
    saveCanvasSoon();
  } else if (state.nodeDrag) {
    const dx = (e.clientX - state.nodeDrag.startX) / state.camera.scale;
    const dy = (e.clientY - state.nodeDrag.startY) / state.camera.scale;
    for (const base of state.nodeDrag.bases) {
      const n = state.nodes.find((x) => x.id === base.id); if (!n || n.locked) continue;
      n.x = base.x + dx; n.y = base.y + dy;
      const el = world.querySelector(`[data-node-id="${CSS.escape(n.id)}"]`);
      if (el) { el.style.left = `${n.x}px`; el.style.top = `${n.y}px`; }
    }
    saveCanvasSoon();
  } else if (state.selectionBox) {
    const rect = stage.getBoundingClientRect();
    state.selectionBox.currentX = e.clientX - rect.left; state.selectionBox.currentY = e.clientY - rect.top;
    renderSelectionBox();
  } else if (state.panning) {
    state.camera.x = state.panning.cx + e.clientX - state.panning.x;
    state.camera.y = state.panning.cy + e.clientY - state.panning.y;
    applyCamera(); saveCanvasSoon();
  }
});
window.addEventListener('pointerup', () => {
  if (state.selectionBox) finishBoxSelection();
  state.nodeDrag = null; state.panning = null; state.nodeResize = null;
  stage.classList.remove('panning'); document.body.style.userSelect = '';
});
function renderSelectionBox() {
  const el = $('#selectionBox'); if (!el) return;
  const box = state.selectionBox;
  if (!box) { el.classList.add('hidden'); return; }
  const x = Math.min(box.startX, box.currentX), y = Math.min(box.startY, box.currentY);
  const w = Math.abs(box.currentX - box.startX), h = Math.abs(box.currentY - box.startY);
  el.classList.remove('hidden'); el.style.left = `${x}px`; el.style.top = `${y}px`; el.style.width = `${w}px`; el.style.height = `${h}px`;
}
function nodeScreenRect(node) {
  const rect = stage.getBoundingClientRect();
  const size = node.type === 'skill' ? { width: 340, height: 315 } : getNodeDisplaySize(node, node.type === 'result' ? 390 : 320, node.type === 'result' ? 260 : 240);
  return { left: rect.left + state.camera.x + node.x * state.camera.scale, top: rect.top + state.camera.y + node.y * state.camera.scale, right: rect.left + state.camera.x + (node.x + size.width) * state.camera.scale, bottom: rect.top + state.camera.y + (node.y + size.height) * state.camera.scale };
}
function finishBoxSelection() {
  const box = state.selectionBox; state.selectionBox = null; renderSelectionBox(); if (!box) return;
  const rect = stage.getBoundingClientRect();
  const sel = { left: rect.left + Math.min(box.startX, box.currentX), top: rect.top + Math.min(box.startY, box.currentY), right: rect.left + Math.max(box.startX, box.currentX), bottom: rect.top + Math.max(box.startY, box.currentY) };
  if ((sel.right - sel.left) < 4 && (sel.bottom - sel.top) < 4) { if (!box.additive) setSelection([]); renderCanvas(); return; }
  const hit = state.nodes.filter((n) => { const r = nodeScreenRect(n); return r.right >= sel.left && r.left <= sel.right && r.bottom >= sel.top && r.top <= sel.bottom; }).map((n) => n.id);
  setSelection(box.additive ? selectedIds().concat(hit) : hit); renderCanvas();
}
function renderSelectionPanels() {
  renderMultiSelectionToolbar();
  renderSelectedAssetPreview();
}
function renderSelectedAssetPreview() {
  const sourcePreview = $('#editSourcePreview');
  if (state.editContext) return renderEditContext();
  sourcePreview?.classList.add('hidden');
  $('#editSelectedAssetBtn')?.classList.add('hidden');
}

function renderMultiSelectionToolbar() {
  const bar = $('#multiSelectionToolbar'); if (!bar) return;
  const nodes = selectedNodes();
  if (nodes.length < 2) { bar.classList.add('hidden'); return; }
  bar.classList.remove('hidden'); $('#multiSelectionCount').textContent = `已选 ${nodes.length} 个`;
}
function alignSelected(mode) {
  const nodes = selectedNodes().filter((n) => !n.locked); if (nodes.length < 2) return;
  pushHistory();
  if (mode === 'left') { const x = Math.min(...nodes.map((n) => n.x)); nodes.forEach((n) => n.x = x); }
  if (mode === 'top') { const y = Math.min(...nodes.map((n) => n.y)); nodes.forEach((n) => n.y = y); }
  if (mode === 'h-distribute' && nodes.length > 2) { const sorted=[...nodes].sort((a,b)=>a.x-b.x); const min=sorted[0].x,max=sorted[sorted.length-1].x; const step=(max-min)/(sorted.length-1); sorted.forEach((n,i)=>n.x=min+step*i); }
  saveCanvasSoon(); renderCanvas();
}
async function downloadSelectedImages() { for (const n of selectedNodes().filter(nodeHasImage)) await downloadAsset(n.assetUrl, n.title || n.fileName || 'canvas-image'); }
function deleteSelectedNodes() { const ids = new Set(selectedIds()); if (!ids.size) return; pushHistory(); state.nodes = state.nodes.filter((n) => !ids.has(n.id)); setSelection([]); saveCanvasSoon(); renderCanvas(); }
function quickUseAsReference(node) {
  const skill = selectedSkill(); if (!skill) return toast('请先选择 Skill', true);
  const imageFields = skill.inputFields.filter((f) => f.type === 'image');
  if (!imageFields.length) return toast('当前 Skill 没有图片输入端口', true);
  if (imageFields.length === 1) { assignCanvasNodeToField(node, skill, imageFields[0]); toast(`已填入「${imageFields[0].label}」`); return; }
  toast('当前 Skill 有多个图片端口，请先在右侧点击具体端口的“从画布选图”');
}
function openNodeContextMenu(node, clientX, clientY) {
  const menu = $('#nodeContextMenu'); if (!menu) return;
  state.contextNodeId = node.id;
  const stageRect = stage.getBoundingClientRect();
  menu.innerHTML = '';
  const add = (label, fn, danger=false) => { const b=document.createElement('button'); b.type='button'; b.textContent=label; if(danger)b.classList.add('danger-item'); b.onclick=(e)=>{e.stopPropagation(); closeContextMenu(); fn();}; menu.append(b); };
  if (nodeHasImage(node)) { add(node.type === 'result' ? '继续编辑' : '编辑图片', () => startContinueEdit(node)); add('作为参考图', () => quickUseAsReference(node)); add('下载图片', () => downloadAsset(node.assetUrl, node.title || node.fileName || 'image')); }
  add(node.locked ? '解锁' : '锁定', () => { pushHistory(); node.locked=!node.locked; saveCanvasSoon(); renderCanvas(); });
  add('置于顶层', () => { pushHistory(); state.nodes=state.nodes.filter(n=>n.id!==node.id).concat(node); saveCanvasSoon(); renderCanvas(); });
  add('置于底层', () => { pushHistory(); state.nodes=[node].concat(state.nodes.filter(n=>n.id!==node.id)); saveCanvasSoon(); renderCanvas(); });
  if (node.type === 'result') add('设为 Skill 封面', () => setResultAsCover(node));
  add('删除', () => { if(!isNodeSelected(node.id)) selectOnly(node.id); deleteSelectedNodes(); }, true);
  menu.classList.remove('hidden');
  const x = Math.min(clientX - stageRect.left, stageRect.width - 210), y = Math.min(clientY - stageRect.top, stageRect.height - 320);
  menu.style.left=`${Math.max(8,x)}px`; menu.style.top=`${Math.max(8,y)}px`;
}
function closeContextMenu() { $('#nodeContextMenu')?.classList.add('hidden'); state.contextNodeId=null; }
function fitSelected() {
  const nodes = selectedNodes(); if (!nodes.length) return fitCanvas();
  const rect = stage.getBoundingClientRect(); let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for (const n of nodes) { const s=n.type==='skill'?{width:340,height:315}:getNodeDisplaySize(n,n.type==='result'?390:320,n.type==='result'?260:240); minX=Math.min(minX,n.x); minY=Math.min(minY,n.y); maxX=Math.max(maxX,n.x+s.width); maxY=Math.max(maxY,n.y+s.height); }
  const w=maxX-minX,h=maxY-minY,pad=120; const scale=clamp(Math.min((rect.width-460)/(w+pad*2),(rect.height-100)/(h+pad*2)),0.22,2.2); state.camera.scale=scale; state.camera.x=(rect.width-430)/2-((minX+maxX)/2)*scale; state.camera.y=rect.height/2-((minY+maxY)/2)*scale; applyCamera(); saveCanvasSoon();
}

async function addDroppedImagesToCanvas(files, clientX = null, clientY = null) {
  const imageFiles = [...(files || [])].filter((f) => f && f.type && f.type.startsWith('image/'));
  if (!imageFiles.length) return false;
  const rect = stage.getBoundingClientRect();
  const centerX = clientX == null ? rect.left + rect.width / 2 : clientX;
  const centerY = clientY == null ? rect.top + rect.height / 2 : clientY;
  const at = { x: (centerX - rect.left - state.camera.x) / state.camera.scale, y: (centerY - rect.top - state.camera.y) / state.camera.scale };
  let offset = 0;
  for (const file of imageFiles) {
    const src = await fileToDataURL(file);
    await addImageNode(src, file.name, { x: at.x + offset, y: at.y + offset });
    offset += 28;
  }
  toast(`已把 ${imageFiles.length} 张本地图片拖入画布`);
  return true;
}
if (workspaceEl) {
  workspaceEl.addEventListener('dragover', (e) => {
    const hasFiles = [...(e.dataTransfer?.items || [])].some((it) => it.kind === 'file' && String(it.type || '').startsWith('image/'));
    if (!hasFiles) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });
  workspaceEl.addEventListener('drop', async (e) => {
    const files = [...(e.dataTransfer?.files || [])].filter((f) => f.type?.startsWith('image/'));
    if (!files.length) return;
    if (e.target.closest('[data-runtime-image-field]')) return;
    e.preventDefault();
    await addDroppedImagesToCanvas(files, e.clientX, e.clientY);
  });
}
window.addEventListener('dragover', (e) => {
  const hasFiles = [...(e.dataTransfer?.items || [])].some((it) => it.kind === 'file' && String(it.type || '').startsWith('image/'));
  if (!hasFiles) return;
  e.preventDefault();
});
window.addEventListener('drop', (e) => {
  const hasFiles = [...(e.dataTransfer?.items || [])].some((it) => it.kind === 'file' && String(it.type || '').startsWith('image/'));
  if (!hasFiles) return;
  if (e.target.closest('.workspace')) return;
  e.preventDefault();
});

stage.addEventListener('wheel', (e) => {
  e.preventDefault();

  if (e.ctrlKey) {
    const rect = stage.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const oldScale = state.camera.scale;
    const nextScale = clamp(oldScale * Math.exp(-e.deltaY * 0.0012), 0.22, 2.7);
    const wx = (mx - state.camera.x) / oldScale;
    const wy = (my - state.camera.y) / oldScale;
    state.camera.scale = nextScale;
    state.camera.x = mx - wx * nextScale;
    state.camera.y = my - wy * nextScale;
    applyCamera();
    saveCanvasSoon();
    return;
  }

  // 普通滚轮只移动画布，不改变任何图片或画布缩放比例。
  state.camera.y -= e.deltaY;
  if (Math.abs(e.deltaX) > 0.01) state.camera.x -= e.deltaX;
  applyCamera();
  saveCanvasSoon();
}, { passive: false });
stage.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
stage.addEventListener('drop', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const rect = stage.getBoundingClientRect();
  const at = { x: (e.clientX - rect.left - state.camera.x) / state.camera.scale, y: (e.clientY - rect.top - state.camera.y) / state.camera.scale };
  const id = e.dataTransfer.getData('text/x-skill-id');
  if (id) { addSkillNode(id, at); return; }
  const files = [...(e.dataTransfer.files || [])].filter((f) => f.type?.startsWith('image/'));
  if (!files.length) return;
  await addDroppedImagesToCanvas(files, e.clientX, e.clientY);
});
window.addEventListener('paste', async (e) => {
  const items = [...(e.clipboardData?.items || [])];
  const files = items.filter((it) => it.type?.startsWith('image/')).map((it) => it.getAsFile()).filter(Boolean);
  if (!files.length) return;
  e.preventDefault();
  const center = canvasCenterWorld();
  let offset = 0;
  for (const file of files) {
    const src = await fileToDataURL(file);
    await addImageNode(src, file.name || `粘贴图片 ${offset + 1}`, { x: center.x + offset, y: center.y + offset });
    offset += 28;
  }
  toast(`已从剪贴板粘贴 ${files.length} 张图片到画布`);
});
function zoomBy(mult) {
  const rect = stage.getBoundingClientRect(), mx = rect.width / 2, my = rect.height / 2;
  const old = state.camera.scale, next = clamp(old * mult, 0.22, 2.7);
  const wx = (mx - state.camera.x) / old, wy = (my - state.camera.y) / old;
  state.camera.scale = next; state.camera.x = mx - wx * next; state.camera.y = my - wy * next;
  applyCamera(); saveCanvasSoon();
}
$('#zoomInBtn').onclick = () => zoomBy(1.15);
$('#zoomOutBtn').onclick = () => zoomBy(1 / 1.15);
$('#zoomResetBtn').onclick = () => { state.camera = { x: 0, y: 0, scale: 1 }; applyCamera(); saveCanvasSoon(); };
function fitCanvas() {
  if (!state.nodes.length) { state.camera = { x: 0, y: 0, scale: 1 }; applyCamera(); saveCanvasSoon(); return; }
  const rect = stage.getBoundingClientRect();
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of state.nodes) {
    const w = n.type === 'result' ? 390 : (n.type === 'image' ? (n.imageWidth || 320) : 340), h = n.type === 'result' ? 360 : (n.type === 'image' ? ((n.imageHeight || 240) + 96) : 315);
    minX = Math.min(minX, n.x); minY = Math.min(minY, n.y); maxX = Math.max(maxX, n.x + w); maxY = Math.max(maxY, n.y + h);
  }
  const pad = 150, contentW = maxX - minX + pad * 2, contentH = maxY - minY + pad * 2;
  const scale = clamp(Math.min(rect.width / contentW, (rect.height - 80) / contentH), 0.22, 1.25);
  state.camera.scale = scale;
  state.camera.x = rect.width / 2 - ((minX + maxX) / 2) * scale;
  state.camera.y = (rect.height - 40) / 2 - ((minY + maxY) / 2) * scale;
  applyCamera(); saveCanvasSoon();
}
$('#fitCanvasBtn').onclick = fitCanvas;
$('#clearCanvasBtn').onclick = () => {
  if (!state.nodes.length || confirm('清空画布上的所有节点？Skill 本身不会删除。')) { pushHistory(); state.nodes = []; setSelection([]); saveCanvasSoon(); renderCanvas(); }
};
window.addEventListener('keydown', (e) => {
  const editing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
  if (e.code === 'Space' && !editing) { state.spaceHeld = true; stage.classList.add('space-pan'); e.preventDefault(); }
  if (editing) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redoCanvas() : undoCanvas(); return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redoCanvas(); return; }
  if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds().length) { e.preventDefault(); deleteSelectedNodes(); return; }
  if (e.key === 'Escape') { if (state.referencePick) cancelReferencePick(); else { closeContextMenu(); setSelection([]); renderCanvas(); } return; }
  if (e.key.toLowerCase() === 'f') { e.preventDefault(); fitSelected(); return; }
  if (e.key === 'Tab') { const n=selectedNodes().filter(nodeHasImage); if(n.length===1){e.preventDefault();startContinueEdit(n[0]);} }
});
window.addEventListener('keyup', (e) => { if (e.code === 'Space') { state.spaceHeld=false; stage.classList.remove('space-pan'); } });

// ---------------- Prompt and generation ----------------
function collectTextInputSummary(skill) {
  const items = [];
  for (const field of skill.inputFields) {
    if (field.type === 'image') continue;
    const value = String(getFieldValue(skill.id, field) || '').trim();
    if (!value) continue;
    items.push({ label: field.label, role: field.role, value });
  }
  return items;
}
function toCnNum(n) {
  const d = ['零','一','二','三','四','五','六','七','八','九','十'];
  if (n <= 10) return d[n];
  if (n < 20) return `十${d[n - 10]}`;
  const tens = Math.floor(n / 10), ones = n % 10;
  return `${d[tens]}十${ones ? d[ones] : ''}`;
}
function collectReferences(skill) {
  const refs = [];
  for (const ref of skill.fixedReferences) {
    if (ref.src) refs.push({ source: 'fixed', name: ref.name, role: ref.role, notes: ref.notes, src: ref.src, refId: ref.id, fixedName: ref.name });
  }
  for (const field of skill.inputFields) {
    if (field.type !== 'image') continue;
    const list = Array.isArray(getFieldValue(skill.id, field)) ? getFieldValue(skill.id, field) : [];
    for (const item of list) refs.push({ source: 'user', name: item.name || field.label, role: field.role || field.label, notes: `${field.label}${field.help ? `：${field.help}` : ''}`, src: item.src, fieldId: field.id, fieldLabel: field.label });
  }
  refs.forEach((ref, idx) => { ref.figureLabel = `图${toCnNum(idx + 1)}`; });
  return refs;
}
function buildPromptContext(skill) {
  const refs = collectReferences(skill);
  const fixedMap = new Map();
  const fieldImageMap = new Map();
  refs.forEach((ref) => {
    if (ref.source === 'fixed') {
      fixedMap.set(ref.refId, ref.figureLabel);
      fixedMap.set(ref.fixedName, ref.figureLabel);
    }
    if (ref.fieldId) {
      const prev = fieldImageMap.get(ref.fieldId) || [];
      prev.push(ref.figureLabel);
      fieldImageMap.set(ref.fieldId, prev);
      const byName = fieldImageMap.get(ref.fieldLabel) || [];
      byName.push(ref.figureLabel);
      fieldImageMap.set(ref.fieldLabel, byName);
    }
  });
  const textMap = new Map();
  for (const field of skill.inputFields) {
    if (field.type === 'image') continue;
    const value = String(getFieldValue(skill.id, field) || '').trim();
    textMap.set(field.id, value);
    textMap.set(field.label, value);
  }
  return { refs, fixedMap, fieldImageMap, textMap };
}
function renderPromptTemplate(skill) {
  const template = String(skill.promptTemplate || '').trim();
  if (!template) return '';
  const ctx = buildPromptContext(skill);
  return template.replace(/\{\{\s*(fixed|fixedRef|field|text)\s*:\s*([^}]+?)\s*\}\}/g, (_, kind, rawKey) => {
    const key = String(rawKey || '').trim();
    if (kind === 'fixed' || kind === 'fixedRef') {
      return ctx.fixedMap.get(key) || `未提供固定图(${key})`;
    }
    if (ctx.fieldImageMap.has(key)) {
      const labels = ctx.fieldImageMap.get(key) || [];
      return labels.length ? labels.join('、') : `未上传图片(${key})`;
    }
    if (ctx.textMap.has(key)) {
      return ctx.textMap.get(key) || `未填写文本(${key})`;
    }
    return `未找到字段(${key})`;
  });
}
function validateSkillInputs(skill) {
  const template = String(skill.promptTemplate || '');
  const fixedTokens = [...template.matchAll(/\{\{\s*(?:fixed|fixedRef)\s*:\s*([^}]+?)\s*\}\}/g)].map((m) => String(m[1] || '').trim());
  for (const token of fixedTokens) {
    const ref = skill.fixedReferences.find((r) => r.id === token || r.name === token);
    if (!ref) return `提示词模板引用了不存在的固定参考图：${token}`;
    if (!ref.src) return `固定参考图「${ref.name || token}」还没有上传图片`;
  }
  for (const field of skill.inputFields) {
    const value = getFieldValue(skill.id, field);
    if (!field.required) continue;
    if (field.type === 'image' && (!Array.isArray(value) || !value.length)) return `${field.label} 为必填`;
    if (field.type !== 'image' && !String(value || '').trim()) return `${field.label} 为必填`;
  }
  return '';
}
function buildPrompt() {
  const skill = selectedSkill(); if (!skill) return '';
  const extraTask = $('#userPrompt').value.trim();
  const parts = [];
  const renderedTemplate = renderPromptTemplate(skill);
  if (renderedTemplate) parts.push(renderedTemplate);
  if (skill.fixedPrompt) parts.push(skill.fixedPrompt);
  if (!renderedTemplate && skill.fixedReferences.length) {
    const fixedText = skill.fixedReferences.map((r, i) => `${i + 1}. ${r.name || `固定参考图 ${i + 1}`} (${r.role || 'reference'})${r.notes ? ` - ${r.notes}` : ''}`).join('\n');
    parts.push(`[FIXED REFERENCES]\n${fixedText}`);
  }
  if (!renderedTemplate) {
    const inputTexts = collectTextInputSummary(skill);
    if (inputTexts.length) {
      parts.push(`[USER TEXT INPUTS]\n${inputTexts.map((x) => `- ${x.label}${x.role ? ` (${x.role})` : ''}: ${x.value}`).join('\n')}`);
    }
    const imageFieldNotes = skill.inputFields.filter((f) => f.type === 'image').map((f) => {
      const count = (Array.isArray(getFieldValue(skill.id, f)) ? getFieldValue(skill.id, f).length : 0);
      return count ? `- ${f.label} (${f.role || 'reference'}): ${count} image(s) attached${f.help ? `; ${f.help}` : ''}` : '';
    }).filter(Boolean);
    if (imageFieldNotes.length) parts.push(`[ATTACHED USER REFERENCE IMAGES]\n${imageFieldNotes.join('\n')}`);
  }
  if (extraTask) parts.push(`补充要求：${extraTask}`);
  if (skill.negativePrompt) parts.push(`负面约束：${skill.negativePrompt}`);
  return parts.join('\n\n');
}
function buildSummaryText(skill) {
  const textBits = collectTextInputSummary(skill).map((x) => `${x.label}: ${x.value}`);
  const extraTask = $('#userPrompt').value.trim();
  if (extraTask) textBits.unshift(extraTask);
  return textBits.join(' · ');
}
function mockImage(prompt, skillName, aspectRatio, refs = []) {
  const esc = (s) => String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
  const snippet = esc(prompt.replace(/\s+/g, ' ').slice(0, 160));
  const title = esc(skillName || 'AI Skill Canvas');
  const refsText = esc(`${refs.length} refs attached`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0d1018"/><stop offset=".5" stop-color="#28131f"/><stop offset="1" stop-color="#111624"/></linearGradient><radialGradient id="orb"><stop stop-color="#ff526f"/><stop offset=".4" stop-color="#b40f39"/><stop offset="1" stop-color="#4f071c"/></radialGradient></defs><rect width="1200" height="720" fill="url(#bg)"/><circle cx="560" cy="330" r="190" fill="#ff3156" opacity=".16"/><circle cx="560" cy="330" r="150" fill="url(#orb)"/><path d="M805 95 C980 75 1080 220 1010 370 C945 505 850 530 815 645 L650 645 C700 520 735 405 735 255 Z" fill="#171421" stroke="#b7a5b0" stroke-width="4"/><path d="M845 155 L715 545" stroke="#f2dde4" stroke-width="11" stroke-linecap="round"/><rect x="55" y="55" width="470" height="52" rx="26" fill="#ffffff" opacity=".08"/><text x="82" y="89" fill="#f7edf1" font-family="Arial,sans-serif" font-size="22" font-weight="700">${title}</text><text x="60" y="625" fill="#d7c4cc" font-family="Arial,sans-serif" font-size="18">MOCK PREVIEW · ${esc(aspectRatio || '16:9')}</text><text x="60" y="596" fill="#ba9aaa" font-family="Arial,sans-serif" font-size="16">${refsText}</text><foreignObject x="60" y="650" width="1050" height="52"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;color:#9f8f98;font-size:15px;line-height:1.35">${snippet}</div></foreignObject></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function findAsset(value, seen = new Set()) {
  if (value == null) return null;
  if (typeof value === 'string') {
    if (value.startsWith('data:image/')) return value;
    if (/^https?:\/\//i.test(value) && /\.(png|jpe?g|webp|gif|avif)(\?|#|$)/i.test(value)) return value;
    return null;
  }
  if (typeof value !== 'object' || seen.has(value)) return null;
  seen.add(value);
  if (Array.isArray(value)) { for (const item of value) { const f = findAsset(item, seen); if (f) return f; } return null; }
  const preferred = ['url', 'image_url', 'imageUrl', 'asset_url', 'assetUrl', 'output_url', 'outputUrl', 'result', 'output', 'data', 'assets', 'images'];
  for (const key of preferred) { if (key in value) { const candidate = value[key]; if (typeof candidate === 'string' && /^https?:\/\//i.test(candidate)) return candidate; const f = findAsset(candidate, seen); if (f) return f; } }
  for (const nested of Object.values(value)) { const f = findAsset(nested, seen); if (f) return f; }
  return null;
}
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function lovartSignHeaders(method, path) {
  if (!state.settings.accessKey || !state.settings.secretKey) throw new Error('请先填写 Access Key 和 Secret Key');
  const ts = String(Math.floor(Date.now() / 1000));
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(state.settings.secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${method}\n${path}\n${ts}`));
  return {
    'X-Access-Key': state.settings.accessKey,
    'X-Timestamp': ts,
    'X-Signature': bytesToHex(sig),
    'X-Signed-Method': method,
    'X-Signed-Path': path
  };
}

function lovartErrorMessage(status, data, fallback = '') {
  const msg = data?.message || data?.error?.message || data?.error || fallback || `Lovart API 返回 ${status}`;
  if (status === 401) return `AK/SK 鉴权失败：${typeof msg === 'string' ? msg : JSON.stringify(msg)}`;
  if (status === 429) return 'Lovart 请求过于频繁，请稍后再试。';
  if (status === 409) return '当前 Lovart Thread 仍有任务在运行，请等它完成后再继续。';
  return typeof msg === 'string' ? msg : JSON.stringify(msg);
}

async function lovartRequest(method, path, { body = undefined, params = undefined, formData = undefined, idempotency = true } = {}) {
  const base = String(state.settings.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
  let url = `${base}${path}`;
  if (params && Object.keys(params).length) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') q.set(k, String(v));
    url += `?${q.toString()}`;
  }
  const headers = await lovartSignHeaders(method, path);
  headers['Accept'] = 'application/json';
  if (method === 'POST' && idempotency && !formData) headers['Idempotency-Key'] = crypto.randomUUID ? crypto.randomUUID().replaceAll('-', '') : `${Date.now()}${Math.random()}`.replace('.', '');
  const options = { method, headers };
  if (formData) {
    options.body = formData;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, options);
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error('浏览器无法直连 Lovart OpenAPI。若 AK/SK 正确，这通常是 Lovart 未允许浏览器 CORS 跨域请求。');
    }
    throw e;
  }

  const raw = await res.text();
  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = { message: raw }; }
  if (!res.ok) throw new Error(lovartErrorMessage(res.status, data));
  if (data && typeof data === 'object' && 'code' in data && data.code !== 0) {
    throw new Error(lovartErrorMessage(res.status, data, data.message || `Lovart code ${data.code}`));
  }
  return data?.data ?? data;
}

async function createLovartProject() {
  const result = await lovartRequest('POST', `${LOVART_PREFIX}/project/save`, {
    body: {
      project_id: '',
      canvas: '',
      project_cover_list: [],
      pic_count: 0,
      project_type: 3
    }
  });
  const projectId = String(result?.project_id || '');
  if (!projectId) throw new Error('Lovart 已返回创建项目结果，但没有 project_id');
  state.settings.projectId = projectId;
  saveSettings();
  return projectId;
}

async function ensureLovartProject() {
  if (state.settings.projectId) return state.settings.projectId;
  const btn = $('#generateBtn');
  if (btn) btn.innerHTML = '<span>✦</span> 创建 Lovart 项目…';
  const projectId = await createLovartProject();
  toast('已自动创建 Lovart Project，并保存到本机');
  return projectId;
}

function extFromMime(mime) {
  const map = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' };
  return map[mime] || 'png';
}

function dataUrlToFile(dataUrl, suggestedName = 'reference') {
  const [meta, payload] = String(dataUrl).split(',', 2);
  if (!meta || payload === undefined) throw new Error('无效的图片 Data URL');
  const mime = (meta.match(/^data:([^;]+)/) || [])[1] || 'application/octet-stream';
  const isBase64 = /;base64/i.test(meta);
  const binary = isBase64 ? atob(payload) : decodeURIComponent(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const safeBase = String(suggestedName || 'reference').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 60) || 'reference';
  return new File([bytes], `${safeBase}.${extFromMime(mime)}`, { type: mime });
}

async function uploadLovartReference(ref, index, total) {
  const src = String(ref.src || '').trim();
  if (!src) throw new Error(`${ref.figureLabel || `图${index + 1}`} 没有图片内容`);
  if (/^https?:\/\//i.test(src)) return src;

  const btn = $('#generateBtn');
  if (btn) btn.innerHTML = `<span>✦</span> 上传 ${ref.figureLabel || `图${index + 1}`} (${index + 1}/${total})…`;

  let file;
  if (src.startsWith('data:')) {
    file = dataUrlToFile(src, ref.name || ref.figureLabel || `reference-${index + 1}`);
  } else {
    let response;
    try { response = await fetch(src); } catch { throw new Error(`无法读取 ${ref.figureLabel || ref.name} 的图片内容`); }
    if (!response.ok) throw new Error(`无法读取 ${ref.figureLabel || ref.name}：HTTP ${response.status}`);
    const blob = await response.blob();
    const ext = extFromMime(blob.type || 'image/png');
    file = new File([blob], `${String(ref.name || 'reference').replace(/[\\/:*?"<>|]+/g, '_')}.${ext}`, { type: blob.type || 'application/octet-stream' });
  }

  const form = new FormData();
  form.append('file', file, file.name);
  const result = await lovartRequest('POST', `${LOVART_PREFIX}/file/upload`, { formData: form, idempotency: false });
  const url = String(result?.url || '');
  if (!url) throw new Error(`${ref.figureLabel || ref.name} 上传成功响应里没有 URL`);
  return url;
}

async function prepareLovartAttachments(refs) {
  const urls = [];
  for (let i = 0; i < refs.length; i++) {
    urls.push(await uploadLovartReference(refs[i], i, refs.length));
  }
  return urls;
}

async function lovartSendChat(prompt, projectId, attachments, existingThreadId = '', model = DEFAULT_MODEL) {
  const body = { prompt, project_id: projectId };
  const normalizedModel = normalizeModel(model);
  if (normalizedModel) {
    body.prefer_models = { IMAGE: [normalizedModel] };
  }
  if (attachments?.length) body.attachments = attachments;
  if (existingThreadId) body.thread_id = existingThreadId;
  if (state.settings.agentMode && !existingThreadId) body.mode = state.settings.agentMode;
  const result = await lovartRequest('POST', `${LOVART_PREFIX}/chat`, { body });
  const threadId = String(result?.thread_id || existingThreadId || '');
  if (!threadId) throw new Error('Lovart Chat 已创建，但没有返回 thread_id');
  return threadId;
}
async function lovartConfirm(threadId) {
  return lovartRequest('POST', `${LOVART_PREFIX}/chat/confirm`, { body: { thread_id: threadId } });
}

async function lovartStatus(threadId) {
  return lovartRequest('GET', `${LOVART_PREFIX}/chat/status`, { params: { thread_id: threadId }, idempotency: false });
}
async function lovartResult(threadId) {
  return lovartRequest('GET', `${LOVART_PREFIX}/chat/result`, { params: { thread_id: threadId }, idempotency: false });
}

async function pollLovart(threadId, timeoutMs = 360000) {
  const started = Date.now();
  let pollCount = 0;
  while (Date.now() - started < timeoutMs) {
    const statusData = await lovartStatus(threadId);
    const status = String(statusData?.status || 'running');
    pollCount += 1;
    const elapsed = Math.round((Date.now() - started) / 1000);
    const btn = $('#generateBtn');
    if (btn) btn.innerHTML = `<span>✦</span> Lovart ${status} · ${elapsed}s`;

    if (status === 'abort') throw new Error('Lovart 任务已中止');
    if (status === 'done') {
      await sleep(5000);
      const confirmStatus = await lovartStatus(threadId);
      if (String(confirmStatus?.status || '') === 'done' || String(confirmStatus?.status || '') === 'abort') {
        const result = await lovartResult(threadId);
        if (result?.pending_confirmation) return { status: 'pending_confirmation', result };
        return { status: String(confirmStatus.status), result };
      }
    }

    if (pollCount >= 7 && status === 'running' && pollCount % 3 === 0) {
      try {
        const partial = await lovartResult(threadId);
        if (partial?.pending_confirmation) return { status: 'pending_confirmation', result: partial };
      } catch { /* continue polling */ }
    }
    await sleep(3000);
  }
  const latest = await lovartResult(threadId).catch(() => ({}));
  return { status: 'timeout', result: latest };
}

function extractLovartArtifacts(result) {
  const out = [];
  const seen = new Set();
  const add = (type, url) => {
    if (!url || seen.has(url)) return;
    seen.add(url); out.push({ type: type || 'image', url });
  };
  for (const item of result?.items || []) {
    for (const artifact of item?.artifacts || []) add(artifact?.type, artifact?.content);
  }
  for (const artifact of result?.artifacts || []) add(artifact?.type, artifact?.content || artifact?.url);
  if (!out.length) {
    const fallback = findAsset(result);
    if (fallback) add('image', fallback);
  }
  return out;
}

function buildLovartPrompt(skill) {
  const prompt = buildPrompt();
  const specs = [];
  specs.push(`画面比例：${runAspectRatio(skill)}`);
  if (skill.format) specs.push(`输出格式：${String(skill.format).toUpperCase()}`);
  if (skill.model) specs.push(`优先模型：${modelLabel(skill.model)}（${skill.model}）`);
  if (skill.style) specs.push(`Skill Style：${skill.style}`);
  return specs.length ? `${prompt}\n\n输出规格：${specs.join('；')}。` : prompt;
}

async function finishLovartThread(threadId) {
  let polled = await pollLovart(threadId);
  if (polled.status === 'pending_confirmation') {
    const pc = polled.result?.pending_confirmation || {};
    const cost = pc.estimated_cost ?? pc.estimated_credits ?? pc.cost;
    const ok = window.confirm(`Lovart 要求确认高成本操作${cost !== undefined ? `，预计消耗约 ${cost} credits` : ''}。是否继续并确认扣费？`);
    if (!ok) throw new Error('已取消 Lovart 高成本操作确认');
    const btn = $('#generateBtn');
    if (btn) btn.innerHTML = '<span>✦</span> 已确认，继续生成…';
    await lovartConfirm(threadId);
    polled = await pollLovart(threadId);
  }
  if (polled.status === 'timeout') throw new Error('Lovart 任务超过 6 分钟仍未结束；任务可能仍在 Lovart 中运行。');
  if (polled.status === 'abort') throw new Error('Lovart 任务已中止');
  const artifacts = extractLovartArtifacts(polled.result);
  const images = artifacts.filter((a) => a.type === 'image' || /\.(png|jpe?g|webp|gif|avif)(\?|#|$)/i.test(a.url));
  const chosen = images[0] || artifacts[0];
  if (!chosen?.url) {
    const agentText = (polled.result?.items || []).filter((x) => x?.text).map((x) => x.text).join('\n\n');
    throw new Error(agentText ? `Lovart 没有生成图片：${agentText.slice(0, 300)}` : 'Lovart 任务完成，但没有返回可用的生成图片。');
  }
  return { assetUrl: chosen.url, raw: polled.result, artifacts };
}

function addGeneratedResultNode({ skill, assetUrl, prompt, refs, threadId = '', projectId = '', mock = false, artifacts = [], titleSuffix = '', model = '' }) {
  const pos = resultNodePosition(skill.id);
  const node = {
    id: uid('result'), type: 'result', skillId: skill.id,
    x: pos.x, y: pos.y, assetUrl,
    title: `${skill.name} · ${titleSuffix || '结果'}`, prompt,
    userPrompt: $('#userPrompt').value.trim(),
    summary: state.editContext ? `继续编辑：${$('#userPrompt').value.trim()}` : buildSummaryText(skill),
    mock: Boolean(mock), createdAt: nowISO(),
    referenceCount: refs.length,
    threadId, projectId,
    model: normalizeModel(model || skill.model || DEFAULT_MODEL),
    artifactCount: Array.isArray(artifacts) ? artifacts.length : 1
  };
  pushHistory();
  state.nodes.push(node);
  selectOnly(node.id);
  if (assetUrl) state.lastResultUrl = assetUrl;
  return node;
}

async function generate() {
  const skill = selectedSkill();
  if (!skill) return toast('请先选择一个 Skill', true);
  const isFollowUp = Boolean(state.editContext);
  if (!isFollowUp) {
    const missing = validateSkillInputs(skill);
    if (missing) return toast(missing, true);
  } else if (!$('#userPrompt').value.trim()) {
    return toast('请输入这次要继续修改什么', true);
  }
  if (!state.settings.mock && (!state.settings.accessKey || !state.settings.secretKey)) {
    toast('请先填写 Lovart Access Key 和 Secret Key'); openApiModal(); return;
  }
  if (!state.settings.mock && !/^https?:\/\//i.test(state.settings.baseUrl || '')) {
    toast('Lovart Base URL 格式不正确', true); openApiModal(); return;
  }

  const count = isFollowUp ? 1 : clamp(Number($('#generationCount')?.value || 1), 1, 4);
  const refs = isFollowUp ? [] : collectReferences(skill);
  const basePrompt = isFollowUp ? $('#userPrompt').value.trim() : buildLovartPrompt(skill);
  const chosenModel = normalizeModel(isFollowUp ? ($('#followupModelSelect')?.value || state.followupModel || skill.model) : skill.model);
  const btn = $('#generateBtn');
  btn.disabled = true; btn.innerHTML = '<span>✦</span> 准备生成…';

  try {
    let projectId = state.editContext?.projectId || state.settings.projectId || '';
    if (state.settings.mock) {
      for (let i = 0; i < count; i++) {
        await sleep(120);
        const mockPrompt = count > 1 ? `${basePrompt}\n\n这是第 ${i + 1}/${count} 个独立方案。` : basePrompt;
        addGeneratedResultNode({
          skill,
          assetUrl: mockImage(mockPrompt, skill.name, runAspectRatio(skill), refs),
          prompt: mockPrompt, refs, mock: true, model: chosenModel,
          titleSuffix: isFollowUp ? '编辑结果' : `方案 ${i + 1}`
        });
      }
    } else if (isFollowUp) {
      projectId = projectId || await ensureLovartProject();
      let attachments = [];
      let threadId = state.editContext.threadId || '';
      if (!threadId && state.editContext.assetUrl) {
        const sourceRef = { src: state.editContext.assetUrl, name: state.editContext.title || '编辑源图', figureLabel: '编辑源图' };
        attachments = [await uploadLovartReference(sourceRef, 0, 1)];
      }
      btn.innerHTML = '<span>✦</span> 继续 Lovart 对话…';
      threadId = await lovartSendChat(basePrompt, projectId, attachments, threadId, chosenModel);
      const result = await finishLovartThread(threadId);
      addGeneratedResultNode({ skill, assetUrl: result.assetUrl, prompt: basePrompt, refs: [], threadId, projectId, artifacts: result.artifacts, titleSuffix: '编辑结果', model: chosenModel });
    } else {
      projectId = await ensureLovartProject();
      const attachments = await prepareLovartAttachments(refs);
      const threadJobs = [];
      for (let i = 0; i < count; i++) {
        const variantPrompt = count > 1 ? `${basePrompt}\n\n请生成第 ${i + 1}/${count} 个独立方案，保持核心要求一致，但在细节表现上形成自然变化。` : basePrompt;
        btn.innerHTML = `<span>✦</span> 提交方案 ${i + 1}/${count}…`;
        const threadId = await lovartSendChat(variantPrompt, projectId, attachments, '', chosenModel);
        threadJobs.push({ threadId, prompt: variantPrompt, index: i });
      }
      for (let i = 0; i < threadJobs.length; i++) {
        const job = threadJobs[i];
        btn.innerHTML = `<span>✦</span> 等待方案 ${i + 1}/${count}…`;
        const result = await finishLovartThread(job.threadId);
        addGeneratedResultNode({ skill, assetUrl: result.assetUrl, prompt: job.prompt, refs, threadId: job.threadId, projectId, artifacts: result.artifacts, titleSuffix: count > 1 ? `方案 ${i + 1}` : '结果', model: chosenModel });
        renderCanvas();
      }
    }

    saveCanvasSoon(); renderCanvas();
    setComposerCollapsed(false);
    toast(state.settings.mock ? `已生成 ${count} 个 Mock 预览` : (isFollowUp ? 'Lovart 对话编辑完成' : `Lovart 已完成 ${count} 个方案`));
  } catch (e) {
    toast(e.message || '生成失败', true);
  } finally {
    btn.disabled = false; btn.innerHTML = '<span>✦</span> 生成';
  }
}
$('#generateBtn').onclick = generate;
$('#composerToggleBtn').onclick = () => setComposerCollapsed(!state.composerCollapsed);
$('#clearEditContextBtn').onclick = clearEditContext;
$('#userPrompt').addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') generate(); });
function openPromptModal() {
  const p = state.editContext ? $('#userPrompt').value.trim() : buildLovartPrompt(selectedSkill());
  if (!p) return toast(state.editContext ? '请输入继续修改要求' : '请先选择 Skill', true);
  $('#promptPreview').textContent = p; $('#promptModal').classList.remove('hidden');
}
$('#previewPromptBtn').onclick = openPromptModal;
$('#closePromptModal').onclick = () => $('#promptModal').classList.add('hidden');
$('#promptModal').addEventListener('click', (e) => { if (e.target.id === 'promptModal') $('#promptModal').classList.add('hidden'); });
$('#copyPromptBtn').onclick = async () => { await copyText($('#promptPreview').textContent); toast('最终提示词已复制'); };
$('#promptGenerateBtn').onclick = () => { $('#promptModal').classList.add('hidden'); generate(); };
$('#activeSkillPill').onclick = () => openSkillPicker();
$('#openSkillsBtn')?.addEventListener('click', () => openSkillPicker());
$('#closeSkillPickerBtn')?.addEventListener('click', () => closeSkillPicker());
$('#skillPickerModal')?.addEventListener('click', (e) => { if (e.target.id === 'skillPickerModal') closeSkillPicker(); });
$('#followupModelSelect')?.addEventListener('change', (e) => { state.followupModel = normalizeModel(e.target.value); });
$('#runtimeAspectRatio')?.addEventListener('change', (e) => {
  const skill = selectedSkill();
  if (!skill) return;
  setRunAspectRatio(skill, e.target.value);
});

// ---------------- Skill editor ----------------
function renderTemplateTokenHelp() {
  const host = $('#templateTokensHelp');
  if (!host) return;
  const fixedLines = state.editorFixedRefsDraft.map((r) => `固定图：{{fixed:${r.name || '固定参考图'}}}`);
  const fieldLines = state.editorFieldDefsDraft.map((f) => `字段：{{field:${f.label || '字段名'}}}`);
  const lines = fixedLines.concat(fieldLines);
  host.innerHTML = lines.length
    ? `可用占位符示例：<br>${lines.map((x) => escapeHtml(x)).join('<br>')}`
    : '你可以先添加固定参考图和用户输入端口，然后这里会显示可用占位符。';
}
function updateCoverPreview() {
  const p = $('#coverPreview'); bg(p, state.coverDraft); p.textContent = state.coverDraft ? '' : '封面示意图'; $('#coverUrl').value = state.coverDraft.startsWith('data:') ? '' : state.coverDraft;
}
function openSkillModal(id = null) {
  if (PUBLIC_READONLY_SKILLS) return blockSkillMutation();
  state.editorId = id;
  const skill = id ? getSkill(id) : null;
  state.coverDraft = skill?.cover || '';
  state.editorFixedRefsDraft = deepClone(skill?.fixedReferences || []);
  state.editorFieldDefsDraft = deepClone(skill?.inputFields || []);
  $('#modalTitle').textContent = skill ? '编辑 Skill' : '新建 Skill';
  $('#deleteSkillBtn').classList.toggle('hidden', !skill);
  $('#skillName').value = skill?.name || '';
  $('#skillCategory').value = skill?.category || '';
  $('#skillDescription').value = skill?.description || '';
  $('#skillPromptTemplate').value = skill?.promptTemplate || '';
  $('#skillFixedPrompt').value = skill?.fixedPrompt || '';
  $('#skillNegativePrompt').value = skill?.negativePrompt || '';
  $('#skillStyle').value = skill?.style || '';
  $('#skillModel').value = normalizeModel(skill?.model || DEFAULT_MODEL);
  $('#skillFormat').value = skill?.format || 'png';
  updateCoverPreview();
  renderFixedRefsEditor();
  renderFieldDefsEditor();
  renderTemplateTokenHelp();
  $('#skillModal').classList.remove('hidden');
  setTimeout(() => $('#skillName').focus(), 50);
}
function closeSkillModal() { state.editorId = null; $('#skillModal').classList.add('hidden'); }
$('#newSkillBtn').onclick = () => { if (PUBLIC_READONLY_SKILLS) return blockSkillMutation(); closeSkillPicker(); openSkillModal(); };
$('#closeSkillModal').onclick = closeSkillModal;
$('#cancelSkillBtn').onclick = closeSkillModal;
$('#skillModal').addEventListener('click', (e) => { if (e.target.id === 'skillModal') closeSkillModal(); });
$('#coverUrl').addEventListener('change', (e) => { state.coverDraft = e.target.value.trim(); updateCoverPreview(); });
$('#coverFile').addEventListener('change', async (e) => {
  const f = e.target.files?.[0]; if (!f) return;
  state.coverDraft = await fileToDataURL(f); updateCoverPreview(); e.target.value = '';
});
$('#useLastResultBtn').onclick = () => {
  if (!state.lastResultUrl) return toast('还没有可用的生成结果', true);
  state.coverDraft = state.lastResultUrl; updateCoverPreview();
};

function renderFixedRefsEditor() {
  const host = $('#fixedRefsList'); host.replaceChildren();
  if (!state.editorFixedRefsDraft.length) {
    const empty = document.createElement('div'); empty.className = 'port-empty'; empty.textContent = '还没有固定参考图'; host.append(empty); return;
  }
  state.editorFixedRefsDraft.forEach((ref, index) => {
    const card = document.createElement('div'); card.className = 'ref-card';
    const thumb = document.createElement('div'); thumb.className = 'ref-thumb tall'; bg(thumb, ref.src); thumb.textContent = ref.src ? '' : '固定参考图';
    const right = document.createElement('div');
    const row1 = document.createElement('div'); row1.className = 'two-inline';
    row1.append(
      fieldInput('参考图名称', ref.name, (v) => { ref.name = v; renderTemplateTokenHelp(); }),
      fieldSelect('角色/用途', ref.role, ['template','structure','brand','style','character','background','reference'], (v) => ref.role = v)
    );
    const note = fieldTextarea('说明', ref.notes, '例如：优先参考尺寸和信息布局。', (v) => ref.notes = v, 2);
    const actions = document.createElement('div'); actions.className = 'ref-actions';
    const upload = document.createElement('label'); upload.className = 'secondary file-btn'; upload.textContent = '上传图片';
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; input.hidden = true;
    input.addEventListener('change', async (e) => {
      const f = e.target.files?.[0]; if (!f) return; ref.src = await fileToDataURL(f); renderFixedRefsEditor(); renderTemplateTokenHelp(); e.target.value = '';
    }); upload.append(input);
    const urlField = document.createElement('label'); urlField.className = 'field';
    const sp = document.createElement('span'); sp.textContent = '图片 URL';
    const urlInput = document.createElement('input'); urlInput.value = ref.src.startsWith('data:') ? '' : ref.src; urlInput.placeholder = 'https://…';
    urlInput.addEventListener('change', (e) => { ref.src = e.target.value.trim(); renderFixedRefsEditor(); renderTemplateTokenHelp(); });
    urlField.append(sp, urlInput);
    const rowActions = document.createElement('div'); rowActions.className = 'row-actions';
    const copyToken = document.createElement('button'); copyToken.className = 'tiny-btn'; copyToken.textContent = '复制占位符'; copyToken.onclick = async () => { await copyText(`{{fixed:${ref.name || '固定参考图'}}}`); toast('已复制固定图占位符'); };
    const up = document.createElement('button'); up.className = 'tiny-btn'; up.textContent = '上移'; up.onclick = () => moveArrayItem(state.editorFixedRefsDraft, index, -1, () => { renderFixedRefsEditor(); renderTemplateTokenHelp(); });
    const down = document.createElement('button'); down.className = 'tiny-btn'; down.textContent = '下移'; down.onclick = () => moveArrayItem(state.editorFixedRefsDraft, index, 1, () => { renderFixedRefsEditor(); renderTemplateTokenHelp(); });
    const del = document.createElement('button'); del.className = 'tiny-btn'; del.textContent = '删除'; del.onclick = () => { state.editorFixedRefsDraft.splice(index, 1); renderFixedRefsEditor(); renderTemplateTokenHelp(); };
    rowActions.append(copyToken, up, down, del);
    actions.append(upload, urlField, rowActions);
    right.append(row1, note, actions);
    card.append(thumb, right);
    host.append(card);
  });
}

function renderFieldDefsEditor() {
  const host = $('#inputFieldsList'); host.replaceChildren();
  if (!state.editorFieldDefsDraft.length) {
    const empty = document.createElement('div'); empty.className = 'port-empty'; empty.textContent = '还没有用户输入端口'; host.append(empty); return;
  }
  state.editorFieldDefsDraft.forEach((field, index) => {
    const card = document.createElement('div'); card.className = 'field-def-card';
    const head = document.createElement('div'); head.className = 'field-def-head';
    head.innerHTML = `<div class="field-tag">${field.type === 'image' ? '图片端口' : (field.type === 'textarea' ? '多行文本' : '单行文本')}</div>`;
    const actions = document.createElement('div'); actions.className = 'row-actions';
    const copyToken = document.createElement('button'); copyToken.className = 'tiny-btn'; copyToken.textContent = '复制占位符'; copyToken.onclick = async () => { await copyText(`{{field:${field.label || '字段名'}}}`); toast('已复制字段占位符'); };
    const up = document.createElement('button'); up.className = 'tiny-btn'; up.textContent = '上移'; up.onclick = () => moveArrayItem(state.editorFieldDefsDraft, index, -1, () => { renderFieldDefsEditor(); renderTemplateTokenHelp(); });
    const down = document.createElement('button'); down.className = 'tiny-btn'; down.textContent = '下移'; down.onclick = () => moveArrayItem(state.editorFieldDefsDraft, index, 1, () => { renderFieldDefsEditor(); renderTemplateTokenHelp(); });
    const del = document.createElement('button'); del.className = 'tiny-btn'; del.textContent = '删除'; del.onclick = () => { state.editorFieldDefsDraft.splice(index, 1); renderFieldDefsEditor(); renderTemplateTokenHelp(); };
    actions.append(copyToken, up, down, del); head.append(actions); card.append(head);

    const row1 = document.createElement('div'); row1.className = 'three-inline';
    row1.append(
      fieldInput('端口名称', field.label, (v) => { field.label = v; renderTemplateTokenHelp(); }),
      fieldSelect('类型', field.type, ['image','text','textarea'], (v) => { field.type = v; if (v !== 'image') { field.multiple = false; field.maxItems = 1; } renderFieldDefsEditor(); renderTemplateTokenHelp(); }),
      fieldSelect('角色', field.role, ['character','background','style','template','effect','composition','source','instruction','reference','style-text'], (v) => field.role = v)
    );
    const row2 = document.createElement('div'); row2.className = 'two-inline';
    row2.append(
      fieldInput('占位提示 / placeholder', field.placeholder || '', (v) => field.placeholder = v),
      fieldTextarea('帮助说明', field.help || '', '告诉用户这里该上传/填写什么', (v) => field.help = v, 2)
    );
    const row3 = document.createElement('div'); row3.className = 'three-inline';
    row3.append(
      checkboxField('必填', field.required, (v) => field.required = v),
      checkboxField('允许多图', field.type === 'image' ? field.multiple : false, (v) => { field.multiple = v; if (!v) field.maxItems = 1; }, field.type !== 'image'),
      numberField('最多张数', field.maxItems || 1, (v) => field.maxItems = clamp(v, 1, 12), field.type !== 'image')
    );
    card.append(row1, row2, row3);
    host.append(card);
  });
}

$('#addFixedRefBtn').onclick = () => { state.editorFixedRefsDraft.push(normalizeRef({ name: '固定参考图', role: 'template' })); renderFixedRefsEditor(); renderTemplateTokenHelp(); };
$('#addImageFieldBtn').onclick = () => { state.editorFieldDefsDraft.push(normalizeField({ type: 'image', label: '图片端口', role: 'reference', multiple: true, maxItems: 3 })); renderFieldDefsEditor(); renderTemplateTokenHelp(); };
$('#addTextFieldBtn').onclick = () => { state.editorFieldDefsDraft.push(normalizeField({ type: 'text', label: '文本端口', role: 'instruction' })); renderFieldDefsEditor(); renderTemplateTokenHelp(); };
$('#addTextareaFieldBtn').onclick = () => { state.editorFieldDefsDraft.push(normalizeField({ type: 'textarea', label: '多行文本端口', role: 'instruction' })); renderFieldDefsEditor(); renderTemplateTokenHelp(); };

$('#saveSkillBtn').onclick = async () => {
  if (PUBLIC_READONLY_SKILLS) return blockSkillMutation();
  const name = $('#skillName').value.trim(); if (!name) return toast('请填写 Skill 名称', true);
  const payload = {
    name,
    category: $('#skillCategory').value.trim(),
    description: $('#skillDescription').value.trim(),
    cover: state.coverDraft,
    promptTemplate: $('#skillPromptTemplate').value.trim(),
    fixedPrompt: $('#skillFixedPrompt').value.trim(),
    negativePrompt: $('#skillNegativePrompt').value.trim(),
    style: $('#skillStyle').value.trim(),
    model: $('#skillModel').value,
    format: $('#skillFormat').value,
    fixedReferences: state.editorFixedRefsDraft.map(normalizeRef),
    inputFields: state.editorFieldDefsDraft.map(normalizeField)
  };
  try {
    if (state.editorId) {
      const old = getSkill(state.editorId);
      const updated = cleanSkill(payload, old);
      await dbPutSkill(updated);
      state.skills = state.skills.map((s) => s.id === updated.id ? updated : s);
      toast('Skill 已保存');
    } else {
      const created = cleanSkill(payload);
      await dbPutSkill(created);
      state.skills.unshift(created);
      state.selectedSkillId = created.id;
      localStorage.setItem('skillCanvas.selectedSkillId', created.id);
      toast('Skill 已创建');
    }
    closeSkillModal(); renderSkills(); renderCanvas(); renderComposer(); saveCanvasSoon();
  } catch (e) { toast(e.message, true); }
};
$('#deleteSkillBtn').onclick = async () => {
  if (PUBLIC_READONLY_SKILLS) return blockSkillMutation();
  const skill = getSkill(state.editorId);
  if (!skill || !confirm(`删除 Skill「${skill.name}」？画布上引用它的节点也会移除。`)) return;
  try {
    await dbDeleteSkill(skill.id);
    state.skills = state.skills.filter((s) => s.id !== skill.id);
    state.nodes = state.nodes.filter((n) => n.skillId !== skill.id);
    delete state.runtimeInputs[skill.id];
    if (state.selectedSkillId === skill.id) state.selectedSkillId = state.skills[0]?.id || null;
    saveCanvasSoon(); closeSkillModal(); renderSkills(); renderCanvas(); renderComposer(); toast('Skill 已删除');
  } catch (e) { toast(e.message, true); }
};

// ---------------- API settings ----------------
function renderApiStatus() {
  const dot = $('#apiDot'), label = $('#apiLabel'), sub = $('#apiSub');
  if (dot && label && sub) {
    if (state.settings.mock) {
      dot.className = 'status-dot mock'; label.textContent = 'Mock 演示模式'; sub.textContent = '当前不会调用 Lovart OpenAPI';
    } else if (state.settings.accessKey && state.settings.secretKey) {
      dot.className = 'status-dot ok'; label.textContent = 'Lovart AK / SK 已保存';
      const projectInfo = state.settings.projectId ? ` · Project ${state.settings.projectId.slice(0, 8)}…` : ' · 首次生成自动建 Project';
      try { sub.textContent = `${new URL(state.settings.baseUrl).host}${projectInfo}`; } catch { sub.textContent = `Lovart OpenAPI${projectInfo}`; }
    } else {
      dot.className = 'status-dot'; label.textContent = '未设置 Lovart AK / SK'; sub.textContent = '点击填写 Access Key + Secret Key';
    }
  }
  renderComposer();
}
function openApiModal() {
  $('#accessKeyInput').value = state.settings.accessKey || '';
  $('#secretKeyInput').value = state.settings.secretKey || '';
  $('#baseUrlInput').value = state.settings.baseUrl || DEFAULT_BASE_URL;
  $('#projectIdInput').value = state.settings.projectId || '';
  $('#agentModeInput').value = state.settings.agentMode || 'fast';
  $('#mockModeInput').checked = Boolean(state.settings.mock);
  $('#secretKeyInput').type = 'password'; $('#toggleSecretBtn').textContent = '显示';
  $('#apiModal').classList.remove('hidden');
}
function closeApiModal() { $('#apiModal').classList.add('hidden'); }
$('#apiSettingsBtn')?.addEventListener('click', openApiModal); $('#topApiSettingsBtn').onclick = openApiModal;
$('#closeApiModal').onclick = closeApiModal; $('#cancelApiBtn').onclick = closeApiModal;
$('#apiModal').addEventListener('click', (e) => { if (e.target.id === 'apiModal') closeApiModal(); });
$('#toggleSecretBtn').onclick = () => {
  const input = $('#secretKeyInput');
  input.type = input.type === 'password' ? 'text' : 'password';
  $('#toggleSecretBtn').textContent = input.type === 'password' ? '显示' : '隐藏';
};
$('#testApiBtn').onclick = async () => {
  const oldSettings = { ...state.settings };
  const accessKey = $('#accessKeyInput').value.trim();
  const secretKey = $('#secretKeyInput').value.trim();
  const baseUrl = ($('#baseUrlInput').value.trim() || DEFAULT_BASE_URL).replace(/\/$/, '');
  const projectId = $('#projectIdInput').value.trim();
  if (!accessKey || !secretKey) return toast('请先填写 Access Key 和 Secret Key', true);
  if (!/^https?:\/\//i.test(baseUrl)) return toast('Lovart Base URL 格式不正确', true);
  const btn = $('#testApiBtn');
  btn.disabled = true; btn.textContent = '测试中…';
  state.settings = { ...state.settings, accessKey, secretKey, baseUrl, projectId };
  try {
    const mode = await lovartRequest('POST', `${LOVART_PREFIX}/mode/query`, { body: {} });
    if (projectId) {
      const valid = await lovartRequest('GET', `${LOVART_PREFIX}/project/validate`, { params: { project_id: projectId }, idempotency: false });
      if (valid?.valid === false) return toast('AK/SK 验证成功，但这个 Project ID 无效', true);
    }
    const modeText = typeof mode?.unlimited === 'boolean' ? (mode.unlimited ? 'unlimited' : 'fast') : '可用';
    toast(`Lovart 连接成功 · 模式 ${modeText}`);
  } catch (e) {
    toast(e.message || 'Lovart 连接测试失败', true);
  } finally {
    state.settings = oldSettings;
    btn.disabled = false; btn.textContent = '测试连接';
  }
};

$('#saveApiBtn').onclick = () => {
  const accessKey = $('#accessKeyInput').value.trim();
  const secretKey = $('#secretKeyInput').value.trim();
  const baseUrl = ($('#baseUrlInput').value.trim() || DEFAULT_BASE_URL).replace(/\/$/, '');
  const projectId = $('#projectIdInput').value.trim();
  const agentMode = $('#agentModeInput').value === 'thinking' ? 'thinking' : 'fast';
  const mock = $('#mockModeInput').checked;
  if (!mock && !/^https?:\/\//i.test(baseUrl)) return toast('Lovart Base URL 必须以 http:// 或 https:// 开头', true);
  state.settings = { accessKey, secretKey, baseUrl, projectId, agentMode, mock };
  saveSettings(); renderApiStatus(); closeApiModal(); toast('Lovart AK / SK 已保存到本机浏览器');
};
$('#clearApiKeyBtn').onclick = () => {
  state.settings.accessKey = '';
  state.settings.secretKey = '';
  state.settings.projectId = '';
  saveSettings();
  $('#accessKeyInput').value = '';
  $('#secretKeyInput').value = '';
  $('#projectIdInput').value = '';
  renderApiStatus();
  toast('本机 Lovart AK / SK 和 Project ID 已清除');
};

// ---------------- Import/export ----------------
function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
$('#skillSearch').addEventListener('input', renderSkills);
$('#exportSkillsBtn').onclick = () => { downloadJson(`skill-canvas-skills-${new Date().toISOString().slice(0, 10)}.json`, state.skills); toast('Skills 已导出（不包含 Lovart AK / SK）'); };
$('#importSkillsBtn').onclick = () => { if (PUBLIC_READONLY_SKILLS) return blockSkillMutation(); $('#importSkillsInput').click(); };
$('#importSkillsInput').addEventListener('change', async (e) => {
  if (PUBLIC_READONLY_SKILLS) { e.target.value = ''; return blockSkillMutation(); }
  const f = e.target.files?.[0]; if (!f) return;
  try {
    const parsed = JSON.parse(await f.text());
    const arr = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.skills) ? parsed.skills : null);
    if (!arr) throw new Error('文件里没有找到 Skills；请导入 Skills JSON 或项目 JSON');
    let count = 0, firstImportedId = '';
    for (const raw of arr) {
      const created = cleanSkill({ ...raw, id: uid('skill'), createdAt: undefined });
      await dbPutSkill(created);
      state.skills.unshift(created);
      if (!firstImportedId) firstImportedId = created.id;
      count++;
    }
    if (firstImportedId) setActiveSkill(firstImportedId);
    renderSkills(); renderComposer();
    toast(`已导入 ${count} 个 Skills；已选中刚导入的第一个 Skill`);
  } catch (err) { toast(err.message, true); }
  finally { e.target.value = ''; }
});
$('#projectExportBtn').onclick = () => {
  const project = {
    type: 'ai-skill-canvas-project', version: 6, exportedAt: nowISO(), skills: PUBLIC_READONLY_SKILLS ? [] : state.skills,
    canvas: { nodes: state.nodes, camera: state.camera, runtimeInputs: state.runtimeInputs },
    selectedSkillId: state.selectedSkillId,
    api: { baseUrl: state.settings.baseUrl, agentMode: state.settings.agentMode, mock: state.settings.mock },
    note: 'Lovart Access Key, Secret Key and Project ID are intentionally excluded from export.'
  };
  downloadJson(`ai-skill-canvas-project-${new Date().toISOString().slice(0, 10)}.json`, project);
  toast('项目已导出，Lovart AK / SK 与 Project ID 未包含在文件中');
};
$('#projectImportBtn').onclick = () => $('#projectImportInput').click();
$('#projectImportInput').addEventListener('change', async (e) => {
  const f = e.target.files?.[0]; if (!f) return;
  try {
    const project = JSON.parse(await f.text());
    if (!project || !Array.isArray(project.skills) || !project.canvas) throw new Error('不是有效的 AI Skill Canvas 项目文件');
    if (!confirm('导入整个项目会替换当前 Skill 和画布。继续吗？')) return;
    await dbClearSkills();
    state.skills = project.skills.map((s) => cleanSkill(s, s));
    for (const skill of state.skills) await dbPutSkill(skill);
    state.nodes = Array.isArray(project.canvas.nodes) ? project.canvas.nodes : [];
    state.camera = project.canvas.camera || { x: 0, y: 0, scale: 1 };
    state.runtimeInputs = project.canvas.runtimeInputs || {};
    state.selectedSkillId = getSkill(project.selectedSkillId) ? project.selectedSkillId : state.skills[0]?.id || null;
    if (project.api?.baseUrl) state.settings.baseUrl = project.api.baseUrl;
    if (project.api?.agentMode === 'thinking' || project.api?.agentMode === 'fast') state.settings.agentMode = project.api.agentMode;
    if (typeof project.api?.mock === 'boolean') state.settings.mock = project.api.mock;
    saveSettings(); localStorage.setItem('skillCanvas.selectedSkillId', state.selectedSkillId || '');
    await dbSetMeta('canvas', { nodes: state.nodes, camera: state.camera, runtimeInputs: state.runtimeInputs });
    state.selectedNodeIds = state.selectedNodeId ? [state.selectedNodeId] : [];
    renderSkills(); renderComposer(); renderCanvas(); renderApiStatus(); renderReferencePickBar(); updateUndoRedoButtons(); toast('项目已导入；你的 Lovart AK / SK 和 Project ID 保持不变');
  } catch (err) { toast(err.message, true); }
  finally { e.target.value = ''; }
});

// ---------------- Helpers ----------------
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
  }
}
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
}
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = () => reject(r.error || new Error('读取文件失败')); r.readAsDataURL(file);
  });
}
function guessImageExtension(url = '') {
  const clean = String(url || '').split('?')[0].split('#')[0].toLowerCase();
  if (clean.endsWith('.png')) return 'png';
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return 'jpg';
  if (clean.endsWith('.webp')) return 'webp';
  return 'png';
}
async function downloadAsset(url, filename = '') {
  if (!url) return toast('没有可下载的图片', true);
  const ext = guessImageExtension(url);
  const safeName = (filename || `lovart-result-${Date.now()}`).replace(/[\/:*?"<>|]+/g, '_');
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`下载失败：${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = safeName.includes('.') ? safeName : `${safeName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    toast('开始下载图片');
  } catch (err) {
    console.warn(err);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('直链下载失败，已为你打开图片链接', true);
  }
}
function getImageNaturalSize(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || img.width || 0, height: img.naturalHeight || img.height || 0 });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = src;
  });
}
function moveArrayItem(arr, index, dir, done) {
  const to = index + dir; if (to < 0 || to >= arr.length) return;
  const [it] = arr.splice(index, 1); arr.splice(to, 0, it); done();
}
function fieldInput(label, value, onChange) {
  const wrap = document.createElement('label'); wrap.className = 'field';
  const sp = document.createElement('span'); sp.textContent = label;
  const input = document.createElement('input'); input.value = value || ''; input.addEventListener('input', (e) => onChange(e.target.value));
  wrap.append(sp, input); return wrap;
}
function fieldTextarea(label, value, placeholder, onChange, rows = 3) {
  const wrap = document.createElement('label'); wrap.className = 'field';
  const sp = document.createElement('span'); sp.textContent = label;
  const input = document.createElement('textarea'); input.rows = rows; input.value = value || ''; input.placeholder = placeholder || ''; input.addEventListener('input', (e) => onChange(e.target.value));
  wrap.append(sp, input); return wrap;
}
function fieldSelect(label, value, options, onChange) {
  const wrap = document.createElement('label'); wrap.className = 'field';
  const sp = document.createElement('span'); sp.textContent = label;
  const select = document.createElement('select');
  options.forEach((x) => { const o = document.createElement('option'); o.value = x; o.textContent = x; select.append(o); });
  select.value = value || options[0]; select.addEventListener('change', (e) => onChange(e.target.value));
  wrap.append(sp, select); return wrap;
}
function checkboxField(label, checked, onChange, disabled = false) {
  const wrap = document.createElement('label'); wrap.className = 'checkbox-row';
  const input = document.createElement('input'); input.type = 'checkbox'; input.checked = Boolean(checked); input.disabled = disabled; input.addEventListener('change', (e) => onChange(e.target.checked));
  const span = document.createElement('span'); span.textContent = label;
  wrap.append(input, span); return wrap;
}
function numberField(label, value, onChange, disabled = false) {
  const wrap = document.createElement('label'); wrap.className = 'field';
  const sp = document.createElement('span'); sp.textContent = label;
  const input = document.createElement('input'); input.type = 'number'; input.min = '1'; input.max = '12'; input.step = '1'; input.disabled = disabled; input.value = value || 1; input.addEventListener('input', (e) => onChange(Number(e.target.value) || 1));
  wrap.append(sp, input); return wrap;
}

// ---------------- Init ----------------
async function init() {
  try {
    state.composerCollapsed = false;
    state.db = await openDB();
    if (PUBLIC_READONLY_SKILLS) {
      state.skills = DEFAULT_SKILLS.map((item) => cleanSkill(item));
    } else {
      state.skills = await seedIfNeeded();
      state.skills.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
    }
    const canvas = await dbGetMeta('canvas', null);
    if (canvas) {
      state.nodes = Array.isArray(canvas.nodes) ? canvas.nodes : [];
      state.camera = canvas.camera || { x: 0, y: 0, scale: 1 };
      state.runtimeInputs = canvas.runtimeInputs || {};
    }
    const newestResult = [...state.nodes].reverse().find((n) => n.type === 'result' && n.assetUrl);
    if (newestResult) state.lastResultUrl = newestResult.assetUrl;
    const savedSkillId = localStorage.getItem('skillCanvas.selectedSkillId');
    state.selectedSkillId = getSkill(savedSkillId) ? savedSkillId : state.skills[0]?.id || null;
    state.selectedNodeIds = state.selectedNodeId ? [state.selectedNodeId] : [];
    renderSkills(); renderComposer(); renderCanvas(); renderApiStatus(); renderReferencePickBar(); updateUndoRedoButtons();
  } catch (e) {
    if ($('#apiDot')) $('#apiDot').className = 'status-dot bad'; if ($('#apiLabel')) $('#apiLabel').textContent = '浏览器本地存储初始化失败'; if ($('#apiSub')) $('#apiSub').textContent = e.message || 'IndexedDB error'; toast(`初始化失败：${e.message}`, true);
  }
}

$('#undoBtn')?.addEventListener('click', undoCanvas);
$('#redoBtn')?.addEventListener('click', redoCanvas);
$('#referencePickDoneBtn')?.addEventListener('click', finishReferencePick);
$('#referencePickCancelBtn')?.addEventListener('click', () => cancelReferencePick());
$('#multiAlignLeftBtn')?.addEventListener('click', () => alignSelected('left'));
$('#multiAlignTopBtn')?.addEventListener('click', () => alignSelected('top'));
$('#multiDistributeBtn')?.addEventListener('click', () => alignSelected('h-distribute'));
$('#multiDownloadBtn')?.addEventListener('click', downloadSelectedImages);
$('#multiDeleteBtn')?.addEventListener('click', deleteSelectedNodes);
$('#multiClearBtn')?.addEventListener('click', () => { setSelection([]); renderCanvas(); });
$('#editSelectedAssetBtn')?.addEventListener('click', () => { const n=selectedNodes().filter(nodeHasImage); if(n.length===1) startContinueEdit(n[0]); });
stage.addEventListener('contextmenu', (e) => { if (!e.target.closest('.canvas-node')) { e.preventDefault(); closeContextMenu(); } });
window.addEventListener('pointerdown', (e) => { if (!e.target.closest('#nodeContextMenu')) closeContextMenu(); }, true);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#skillPickerModal')?.classList.contains('hidden')) closeSkillPicker(); });

init();
