// Суп: fish 2, meat 2, veg 2 (итого 6)
// Главное блюдо: fish 2, meat 2, veg 2 (6)
// Салат/стартер: fish 1, meat 1, veg 4 (6)
// Напиток: cold 3, hot 3 (6)
// Десерт: small 3, medium 2, large 1 (6)

// URL API для загрузки блюд
const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

// Запасной список на случай недоступности API
const FALLBACK_DISHES = [ ];

// Рабочий массив, наполняется из API или из запасного списка
let DISHES = [];

// Загрузка блюд с сервера + нормализация полей под текущий UI
async function loadDishes() {
  try {
    const resp = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const raw = await resp.json();
    const normalized = raw.map(item => ({
      category: item.category,
      kind: item.kind,
      name: item.name,
      price: Number(item.price),
      weight: item.count,
      value: item.keyword,
      img: item.image,
    }));
    const allowed = new Set(CATEGORIES.map(c => c.key));
    DISHES = normalized.filter(d => allowed.has(d.category));
  } catch (e) {
    console.warn('Не удалось загрузить блюда по API, использую запасной список.', e);
    DISHES = FALLBACK_DISHES.slice();
  }
}


//  УТИЛИТЫ И КОНСТАНТЫ 
const rubFmt = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
const byName = (a, b) => a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const CATEGORIES = [
  { key: 'soup',        title: 'Суп' },
  { key: 'main-course', title: 'Главное блюдо' },
  { key: 'salad',       title: 'Салат или стартер' },
  { key: 'drink',       title: 'Напиток' },
  { key: 'dessert',     title: 'Десерт' },
];

// Состояние выбранных позиций (по одному блюду на раздел)
const selected = Object.fromEntries(CATEGORIES.map(c => [c.key, null]));

//  ИНИЦИАЛИЗАЦИЯ 
document.addEventListener('DOMContentLoaded', async () => {
  await loadDishes();
  renderAllCategories();
  wireFilters();
  wireOrder();
  updateSummary();
});

//  РЕНДЕР КАТЕГОРИЙ 
function renderAllCategories() {
  // В каждой .dishes-grid с data-category — рисуем карточки
  $$('.dishes-grid').forEach(grid => {
    const category = grid.dataset.category;
    const items = DISHES.filter(d => d.category === category).sort(byName);
    grid.innerHTML = '';
    items.forEach(dish => grid.appendChild(createDishCard(dish)));
  });
}

function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish-card';
  card.dataset.category = dish.category;
  card.dataset.kind = dish.kind;
  card.dataset.value = dish.value;

  card.innerHTML = `
    <img src="${dish.img}" alt="${escapeHtml(dish.name)}" class="dish-image">
    <p class="dish-price">${rubFmt.format(dish.price)}</p>
    <p class="dish-name">${escapeHtml(dish.name)}</p>
    <p class="dish-weight">${escapeHtml(dish.weight)}</p>
    <button class="add-btn" type="button">Добавить</button>
  `;

  $('.add-btn', card).addEventListener('click', () => addDishToOrder(dish));
  return card;
}

//  ФИЛЬТРЫ 
function wireFilters() {
  // Делегирование клика от контейнера .filters
  $$('.filters').forEach(filterBar => {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const category = filterBar.dataset.category;
      const kind = btn.dataset.kind; // 'all' | 'fish' | 'meat' | 'veg' | 'cold' | 'hot' | 'small' | 'medium' | 'large'

      // Переключаем активную кнопку
      $$('.filter-btn', filterBar).forEach(b => b.classList.toggle('active', b === btn));

      // Применяем фильтр к карточкам в нужной сетке
      const grid = $(`.dishes-grid[data-category="${CSS.escape(category)}"]`);
      if (!grid) return;

      const cards = $$('.dish-card', grid);
      cards.forEach(card => {
        const isMatch = (kind === 'all') || (card.dataset.kind === kind);
        card.hidden = !isMatch;
      });
    });
  });
}

//  ЗАКАЗ 
function addDishToOrder(dish) {
  selected[dish.category] = dish;
  updateSummary();
}

function wireOrder() {
  // Сброс
  const resetBtn = $('#reset-order');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Object.keys(selected).forEach(k => selected[k] = null);
      updateSummary();
    });
  }

  // Управление временем доставки
  const asap = $('#delivery-time-1');
  const specific = $('#delivery-time-2');
  const timeInput = $('#specific-time');
  const syncTime = () => { if (timeInput) timeInput.disabled = !(specific && specific.checked); };
  [asap, specific].forEach(el => el && el.addEventListener('change', syncTime));
  syncTime();
}

function updateSummary() {
  const itemsWrap = $('#order-items');
  const totalEl = $('#order-total');
  if (!itemsWrap || !totalEl) return;

  itemsWrap.innerHTML = '';
  let total = 0;

  CATEGORIES.forEach(({ key, title }) => {
    const dish = selected[key];
    if (!dish) return;

    total += dish.price;

    const row = document.createElement('div');
    row.className = 'order-item';
    row.innerHTML = `
      <div class="order-item-left">
        <strong>${escapeHtml(title)}:</strong> ${escapeHtml(dish.name)}
        <span style="opacity:.7">(${escapeHtml(dish.weight)})</span>
      </div>
      <div class="order-item-right">
        <span class="order-price">${rubFmt.format(dish.price)}</span>
        <button class="remove-btn" type="button" aria-label="Удалить">×</button>
      </div>
    `;

    $('.remove-btn', row).addEventListener('click', () => {
      selected[key] = null;
      updateSummary();
    });

    itemsWrap.appendChild(row);
  });

  totalEl.textContent = rubFmt.format(total);
}

//  ВСПОМОГАТЕЛЬНОЕ 
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// ===== ВАРИАНТЫ КОМБО-ЛАНЧЕЙ =====
const COMBOS = [
  { id: 1, name: 'Суп + Главное + Салат + Напиток', req: new Set(['soup','main-course','salad','drink']) },
  { id: 2, name: 'Суп + Главное + Напиток',         req: new Set(['soup','main-course','drink']) },
  { id: 3, name: 'Суп + Салат + Напиток',           req: new Set(['soup','salad','drink']) },
  { id: 4, name: 'Главное + Салат + Напиток',       req: new Set(['main-course','salad','drink']) },
  { id: 5, name: 'Главное + Напиток',               req: new Set(['main-course','drink']) },
];
let activeComboId = null;

// Для превью в карточках используем по одному изображению из каталога
const PREVIEWS = {
  'soup':        "https://avatars.mds.yandex.net/i?id=49a7614491b2065521e90a1f623d1ffd6746aff2-5042086-images-thumbs&n=13",
  'main-course': "https://avatars.mds.yandex.net/i?id=e49128b084dab05894d9593547df2d556218976e-5878173-images-thumbs&n=13",
  'salad':       "https://avatars.mds.yandex.net/i?id=45e4c7a81bd1abff026af4c30ac0e36db28a24c8-12540154-images-thumbs&n=13",
  'drink':       "https://avatars.mds.yandex.net/i?id=f0ed1bd22ba729e484aff4f1919434109dbfae17-4538830-images-thumbs&n=13",
};

document.addEventListener('DOMContentLoaded', () => {
  renderComboVariants();
  wireFormValidation();
});

function renderComboVariants(){
  const wrap = document.getElementById('variants-grid');
  if(!wrap) return;

  wrap.innerHTML = '';
  COMBOS.forEach(combo => {
    const card = document.createElement('div');
    card.className = 'variant-card';
    card.dataset.comboId = String(combo.id);

    const itemsHtml = Array.from(combo.req).map(cat => `
      <div class="variant-item" data-cat="${cat}">
        <img src="${PREVIEWS[cat] || ''}" alt="${cat}">
        <div class="variant-caption">${CATEGORIES.find(c=>c.key===cat)?.title || cat}</div>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="variant-title">${combo.name}</div>
      <div class="variant-content">${itemsHtml}</div>
    `;

    // Клик по карточке или по её "строкам" выбирает вариант
    card.addEventListener('click', () => setActiveCombo(combo.id));

    wrap.appendChild(card);
  });
}

function setActiveCombo(id){
  activeComboId = id;
  // Подсветка
  document.querySelectorAll('.variant-card').forEach(c => c.classList.toggle('active', c.dataset.comboId == String(id)));
  applyComboFilter();
}

function applyComboFilter(){
  const combo = COMBOS.find(c=>c.id===activeComboId);
  const required = combo ? combo.req : null;

  // Управляем видимостью секций по категориям
  document.querySelectorAll('.dishes-grid').forEach(grid => {
    const cat = grid.dataset.category;
    const section = grid.closest('section');
    if(required){
      const shouldShow = required.has(cat) || cat === 'dessert'; // десерт всегда доступен
      if(section) section.hidden = !shouldShow;
      // если категория исключена — очищаем выбранное блюдо
      if(!shouldShow && selected[cat]){
        selected[cat] = null;
      }
    }else{
      if(section) section.hidden = false;
    }
  });

  updateSummary();
}

// ===== ПРОВЕРКА НА ОТПРАВКЕ ФОРМЫ =====
function wireFormValidation(){
  const form = document.getElementById('lunch-order-form');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    const ok = validateComboBeforeSubmit();
    if(!ok){
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

function selectedCategorySet(){
  // Без десерта — он опционален
  const set = new Set();
  Object.entries(selected).forEach(([k, v]) => { if(k!=='dessert' && v) set.add(k); });
  return set;
}

function equalsSet(a,b){
  if(a.size !== b.size) return false;
  for(const v of a){ if(!b.has(v)) return false; }
  return true;
}

function matchesAnyCombo(selSet){
  return COMBOS.find(c => equalsSet(selSet, c.req));
}

function validateComboBeforeSubmit(){
  const sel = selectedCategorySet();

  // Подготовим справочные булевы
  const hasSoup  = sel.has('soup');
  const hasMain  = sel.has('main-course');
  const hasSalad = sel.has('salad');
  const hasDrink = sel.has('drink');

  // НИЧЕГО НЕ ВЫБРАНО (кроме, возможно, десерта)
  if(sel.size === 0){
    showNotice('Ничего не выбрано. Выберите блюда для заказа');
    return false;
  }

  // Ровно совпадает с каким-либо комбо?
  const matched = matchesAnyCombo(sel);
  if(matched) return true; // всё ок

  // Частые варианты недобора — показываем специализированные уведомления
  // 1) Не выбран напиток, а остальное уже соответствует какому-то комбо без drink
  const noDrinkSet = new Set(Array.from(sel).filter(k => k !== 'drink'));
  const missingDrinkCandidate = COMBOS.some(c => {
    const withoutDrink = new Set(Array.from(c.req).filter(k => k !== 'drink'));
    return equalsSet(noDrinkSet, withoutDrink) && !hasDrink;
  });
  if(missingDrinkCandidate){
    showNotice('Выберите напиток');
    return false;
  }

  // 2) Выбран суп, но ни главное, ни салат/стартер не выбраны
  if(hasSoup && !hasMain && !hasSalad){
    showNotice('Выберите главное блюдо/салат/стартер');
    return false;
  }

  // 3) Выбран салат/стартер, но ни супа, ни главного нет
  if(hasSalad && !hasSoup && !hasMain){
    showNotice('Выберите суп или главное блюдо');
    return false;
  }

  // 4) Выбран только напиток (или напиток + десерт)
  if(hasDrink && !hasSoup && !hasMain && !hasSalad){
    showNotice('Выберите главное блюдо');
    return false;
  }

  // Если ничего из частных случаев не подошло — общее уведомление с подсказкой
  const need = inferMissingForClosestCombo(sel);
  const msg = need.length
    ? 'Для оформления не хватает: ' + need.map(humanizeCategory).join(', ')
    : 'Перечень блюд не соответствует ни одному варианту ланча';
  showNotice(msg);
  return false;
}

function inferMissingForClosestCombo(selSet){
  // находим ближайшее по включению комбо и возвращаем недостающие категории
  let best = null;
  let bestMissing = Infinity;
  COMBOS.forEach(c => {
    const missing = Array.from(c.req).filter(k => !selSet.has(k));
    const extra   = Array.from(selSet).filter(k => !c.req.has(k)); // не должно быть "лишних", но на будущее
    const score = missing.length + extra.length*2;
    if(score < bestMissing){
      bestMissing = score;
      best = missing;
    }
  });
  return best || [];
}

function humanizeCategory(cat){
  const map = {
    'soup':'суп',
    'main-course':'главное блюдо',
    'salad':'салат/стартер',
    'drink':'напиток',
    'dessert':'десерт'
  };
  return map[cat] || cat;
}

// ===== УВЕДОМЛЕНИЕ =====
function showNotice(text){
  // Удалим прежнее, если есть
  document.querySelectorAll('.notice-overlay').forEach(n => n.remove());

  const overlay = document.createElement('div');
  overlay.className = 'notice-overlay';

  const modal = document.createElement('div');
  modal.className = 'notice-modal';
  modal.innerHTML = `
    <h4>Проверьте заказ</h4>
    <p>${escapeHtml(text)}</p>
    <div class="notice-actions">
      <button type="button" class="notice-btn">Окей</button>
    </div>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  modal.querySelector('.notice-btn').addEventListener('click', () => {
    overlay.remove();
  });
}
