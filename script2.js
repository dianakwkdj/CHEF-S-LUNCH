// Суп: fish 2, meat 2, veg 2 (итого 6)
// Главное блюдо: fish 2, meat 2, veg 2 (6)
// Салат/стартер: fish 1, meat 1, veg 4 (6)
// Напиток: cold 3, hot 3 (6)
// Десерт: small 3, medium 2, large 1 (6)

const DISHES = [
  // СУПЫ (6)
  { category: 'soup', kind: 'fish', name: 'Уха с семгой', price: 360, weight: '350 мл', value: 'soup-salmon', img: 'https://avatars.mds.yandex.net/i?id=1d237c9f5df88f0abaa669fb32e5c4d0cbe7698c-9701297-images-thumbs&n=13' },
  { category: 'soup', kind: 'fish', name: 'Суп с треской и овощами', price: 340, weight: '350 мл', value: 'soup-cod-veg', img: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_686f7503d114f65cd15f8ae6_686f7509d114f65cd15f8ecd/scale_1200' },
  { category: 'soup', kind: 'meat', name: 'Борщ со сметаной', price: 330, weight: '350 мл', value: 'soup-borscht', img: 'https://avatars.mds.yandex.net/i?id=b2f75515b1af3b5d5a3bb12da2229c18ab771ff7-9122788-images-thumbs&n=13' },
  { category: 'soup', kind: 'meat', name: 'Солянка мясная', price: 390, weight: '350 мл', value: 'soup-solyanka', img: 'https://scdn.chibbis.ru/live/products/0ffb9319b6d53fdd4a500f7edaf0e064.jpeg' },
  { category: 'soup', kind: 'veg',  name: 'Томатный суп с базиликом', price: 350, weight: '350 мл', value: 'soup-tomato-basil', img: 'https://icdn.ensonhaber.com/crop/1200x675/resimler/diger/kok/2022/08/02/mutfaginizda-bulunmasi-gereken-10-aromatik-bitki_9151.jpg' },
  { category: 'soup', kind: 'veg',  name: 'Тыквенный крем-суп', price: 320, weight: '350 мл', value: 'soup-pumpkin', img: 'https://avatars.mds.yandex.net/i?id=7000f9ec180332e9795becd0d7622d3dcd03bcdf-15436088-images-thumbs&n=13' },

  //  ГЛАВНОЕ БЛЮДО (6) 
  { category: 'main-course', kind: 'fish', name: 'Запечённый лосось с рисом', price: 520, weight: '230 г', value: 'main-salmon-rice', img: 'https://foodhouse.md/files/styles/main_image/public/product/somon_copt_cu_orez.jpg' },
  { category: 'main-course', kind: 'fish', name: 'Треска на пару с овощами', price: 470, weight: '240 г', value: 'main-cod-steam', img: 'https://avatars.mds.yandex.net/i?id=b0aa0efad97ad7f78aa2f881d0c91d8008a2c2a5-5221636-images-thumbs&n=13' },
  { category: 'main-course', kind: 'meat', name: 'Стейк из говядины', price: 650, weight: '250 г', value: 'main-beef-steak', img: 'https://avatars.mds.yandex.net/i?id=508052342800cb4471d00c9a6f650d670db8aa39-5233531-images-thumbs&n=13' },
  { category: 'main-course', kind: 'meat', name: 'Куриная грудка гриль', price: 440, weight: '220 г', value: 'main-chicken-grill', img: 'https://avatars.mds.yandex.net/i?id=12004af0e760e19b5f9ed0d1ece8850f460cf02b-16434084-images-thumbs&n=13' },
  { category: 'main-course', kind: 'veg',  name: 'Равиоли с рикоттой и шпинатом', price: 450, weight: '250 г', value: 'main-ravioli-ricotta', img: 'https://avatars.mds.yandex.net/i?id=2a2c3bb017af661a94779b1b72f3a21e237cdcc8-16469413-images-thumbs&n=13' },
  { category: 'main-course', kind: 'veg',  name: 'Табуле с киноа и овощами', price: 420, weight: '220 г', value: 'main-tabouleh-quinoa', img: 'https://avatars.mds.yandex.net/i?id=489aefcd4175267f9b786221e1a72ac350b73a846f877a55-12611061-images-thumbs&n=13' },

  //  САЛАТЫ И СТАРТЕРЫ (6) 
  { category: 'salad', kind: 'fish', name: 'Салат с лососем и авокадо', price: 380, weight: '200 г', value: 'salad-salmon-avocado', img: 'https://avatars.mds.yandex.net/i?id=4ebd7a776949029e02729d4540c2e18ca013a419-12421170-images-thumbs&n=13' }, 
  { category: 'salad', kind: 'meat', name: 'Салат с курицей и грецким орехом', price: 340, weight: '200 г', value: 'salad-chicken-walnut', img: 'https://avatars.mds.yandex.net/i?id=eece0eca95cd48e163dfd66fd2783e454d84ce65-12187916-images-thumbs&n=13' }, 
  { category: 'salad', kind: 'veg',  name: 'Греческий салат', price: 310, weight: '200 г', value: 'salad-greek', img: 'https://avatars.mds.yandex.net/i?id=5020c4b470d8a9e5b22cc717fba402175a26e50e-4542725-images-thumbs&n=13' }, 
  { category: 'salad', kind: 'veg',  name: 'Капрезе', price: 330, weight: '200 г', value: 'salad-caprese', img: 'https://avatars.mds.yandex.net/i?id=cb6ee0081f16f4906d30d730b3d4c1b56eb8df92-5879173-images-thumbs&n=13' },
  { category: 'salad', kind: 'veg',  name: 'Хумус с лепёшкой (стартер)', price: 290, weight: '170 г', value: 'starter-hummus', img: 'https://avatars.mds.yandex.net/i?id=dd43d0e65ba3905e8f6d900a0349fa5b76eab2ee-7012067-images-thumbs&n=13' },
  { category: 'salad', kind: 'veg',  name: 'Брускетта с томатами (стартер)', price: 300, weight: '160 г', value: 'starter-bruschetta', img: 'https://avatars.mds.yandex.net/i?id=036d54c72c006108a63d49b27111c1370dcffe67-4168527-images-thumbs&n=13' },

  //  НАПИТКИ (6) 
  { category: 'drink', kind: 'cold', name: 'Свежевыжатый апельсиновый сок', price: 180, weight: '250 мл', value: 'drink-orange-juice', img: 'https://avatars.mds.yandex.net/i?id=8a504d32bc78c3f57c36a4bd182b9ebb703c1268-5291460-images-thumbs&n=13' },
  { category: 'drink', kind: 'cold', name: 'Лимонад домашний', price: 160, weight: '300 мл', value: 'drink-lemonade', img: 'https://avatars.mds.yandex.net/i?id=12c162f62a8696f001223d1deaf600d8200665ac-8326073-images-thumbs&n=13' },
  { category: 'drink', kind: 'cold', name: 'Минеральная вода', price: 120, weight: '500 мл', value: 'drink-mineral', img: 'https://avatars.mds.yandex.net/i?id=ad0c078bfb199400dd9a44782f11faf173ba1c7e-4836432-images-thumbs&n=13' },
  { category: 'drink', kind: 'hot',  name: 'Матча латте', price: 220, weight: '300 мл', value: 'drink-matcha', img: 'https://avatars.mds.yandex.net/i?id=000f4a062d81dff86a4223456a8e635ba6b52bf2-10636867-images-thumbs&n=13' },
  { category: 'drink', kind: 'hot',  name: 'Капучино', price: 190, weight: '250 мл', value: 'drink-cappuccino', img: 'https://avatars.mds.yandex.net/i?id=d1ce6e30f7df103cfbeb4467f72ef5ed7b2c4215-4430658-images-thumbs&n=13' },
  { category: 'drink', kind: 'hot',  name: 'Чай жасминовый', price: 150, weight: '300 мл', value: 'drink-tea-jasmine', img: 'https://avatars.mds.yandex.net/i?id=ec7d8354cacd6c378b8df7e3eeb4300edf491bd6-12684404-images-thumbs&n=13' },

  //  ДЕСЕРТЫ (6) 
  { category: 'dessert', kind: 'small',  name: 'Маффин шоколадный (мини)', price: 140, weight: '80 г',  value: 'dessert-muffin-mini', img: 'https://avatars.mds.yandex.net/i?id=6c42db59d349bf906c68d124837db5763b0923b8-10350562-images-thumbs&n=13' },
  { category: 'dessert', kind: 'small',  name: 'Эклер ванильный (мини)',     price: 150, weight: '70 г',  value: 'dessert-eclair-mini', img: 'https://avatars.mds.yandex.net/i?id=9dfcc2bfeb06323805f53f555f1627be6eb4227d-5450680-images-thumbs&n=13' },
  { category: 'dessert', kind: 'small',  name: 'Тарталетка с ягодами (мини)', price: 160, weight: '75 г',  value: 'dessert-berry-tart-mini', img: 'https://avatars.mds.yandex.net/i?id=9e4ccc39423af45a8843f62bdf53c5b82b13df5c-5312152-images-thumbs&n=13' },
  { category: 'dessert', kind: 'medium', name: 'Чизкейк классический',        price: 240, weight: '120 г', value: 'dessert-cheesecake', img: 'https://avatars.mds.yandex.net/i?id=035c6de7881877305c5f0418347769ece782d036-5664890-images-thumbs&n=13' },
  { category: 'dessert', kind: 'medium', name: 'Тирамису',                     price: 260, weight: '130 г', value: 'dessert-tiramisu', img: 'https://i.ytimg.com/vi/QxaZ-A7-4YE/maxresdefault.jpg' },
  { category: 'dessert', kind: 'large',  name: 'Медовик (большая порция)',     price: 320, weight: '180 г', value: 'dessert-honeycake-large', img: 'https://avatars.mds.yandex.net/i?id=8663f164479e1f9223a796df6b41af55c0281c74-10503674-images-thumbs&n=13' },
];

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
document.addEventListener('DOMContentLoaded', () => {
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
        <div class="lunch-note">Десерт можно добавить</div>
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
