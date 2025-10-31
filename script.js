// Данные блюд (источники изображений и названия — как на странице)
const DISHES = [
  // Супы
  {
    category: 'soup',
    name: 'Крем-суп из белых грибов',
    price: 380,
    weight: '350 мл',
    value: 'cream-mushroom',
    img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    category: 'soup',
    name: 'Томатный суп с базиликом',
    price: 350,
    weight: '350 мл',
    value: 'tomato-basil',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    category: 'soup',
    name: 'Тыквенный крем-суп',
    price: 320,
    weight: '350 мл',
    value: 'pumpkin-cream',
    img: 'https://avatars.mds.yandex.net/i?id=b0be51786e159695d8f1f8444bd9ec8c_l-4882666-images-thumbs&n=13'
  },

  // Главные блюда
  {
    category: 'main-course',
    name: 'Тартар из мраморной говядины',
    price: 490,
    weight: '180 г',
    value: 'beef-tartare',
    img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    category: 'main-course',
    name: 'Равиоли с рикоттой и шпинатом',
    price: 450,
    weight: '250 г',
    value: 'ravioli-ricotta',
    img: 'https://avatars.mds.yandex.net/i?id=910ed199c794b5b402ba3936a5f18b5d_l-5433932-images-thumbs&n=13'
  },
  {
    category: 'main-course',
    name: 'Табуле с киноа и креветками',
    price: 420,
    weight: '220 г',
    value: 'quinoa-shrimp',
    img: 'https://aif-s3.aif.ru/images/010/276/a59e6711e96317fddf7a5ce3386760f6.jpg'
  },

  // Напитки
  {
    category: 'drink',
    name: 'Свежевыжатый апельсиновый сок',
    price: 180,
    weight: '250 мл',
    value: 'orange-juice',
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    category: 'drink',
    name: 'Матча латте',
    price: 220,
    weight: '300 мл',
    value: 'matcha-latte',
    img: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1y4RF0.img?w=630&h=630&m=6'
  },
  {
    category: 'drink',
    name: 'Минеральная вода',
    price: 120,
    weight: '500 мл',
    value: 'mineral-water',
    img: 'https://avatars.mds.yandex.net/i?id=ba4499164cb7781ef97890137f76cad26536dc11-10877393-images-thumbs&n=13'
  }
];

// Утилиты
const rubFmt = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
const byName = (a, b) => a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const CATEGORIES = [
  { key: 'soup', gridIndex: 0, selectId: 'soup', title: 'Суп' },
  { key: 'main-course', gridIndex: 1, selectId: 'main-course', title: 'Главное блюдо' },
  { key: 'drink', gridIndex: 2, selectId: 'drink', title: 'Напиток' }
];

// Состояние выбранных позиций
const selected = {
  'soup': null,
  'main-course': null,
  'drink': null
};

document.addEventListener('DOMContentLoaded', () => {
  // 1) Рендер карточек из JS-данных (с сортировкой по алфавиту)
  renderCards();

  // 2) Заполнить <select> опции (в алфавите)
  populateSelects();

  // 3) Вставить блок краткого заказа + общую сумму
  ensureOrderSummary();

  // 4) Навесить обработчики select'ов и кнопок формы
  wireUpForm();

  // 5) Стартовый пересчёт суммы
  updateSummary();
});

function renderCards() {
  const grids = $$('.dishes-grid'); // ожидается порядок: супы, главные, напитки
  CATEGORIES.forEach(({ key, gridIndex }) => {
    const grid = grids[gridIndex];
    if (!grid) return;

    // Очистить имеющееся и отрисовать заново
    grid.innerHTML = '';
    DISHES
      .filter(d => d.category === key)
      .sort(byName)
      .forEach(dish => {
        const card = createDishCard(dish);
        grid.appendChild(card);
      });
  });
}

function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish-card';
  card.dataset.category = dish.category;
  card.dataset.name = dish.name;
  card.dataset.price = String(dish.price);
  card.dataset.value = dish.value;

  card.innerHTML = `
    <img src="${dish.img}" alt="${escapeHtml(dish.name)}" class="dish-image">
    <p class="dish-price">${rubFmt.format(dish.price)}</p>
    <p class="dish-name">${escapeHtml(dish.name)}</p>
    <p class="dish-weight">${escapeHtml(dish.weight)}</p>
    <button class="add-btn" type="button">Добавить</button>
  `;

  const btn = $('.add-btn', card);
  btn.addEventListener('click', () => addDishToOrder(dish));

  return card;
}

function populateSelects() {
  CATEGORIES.forEach(({ key, selectId }) => {
    const select = document.getElementById(selectId);
    if (!select) return;

    // Сохраняем первый option (плейсхолдер), затем обновляем список
    const placeholder = select.querySelector('option[value=""]')?.outerHTML || '';
    const optionsHtml = DISHES
      .filter(d => d.category === key)
      .sort(byName)
      .map(d => `<option value="${d.value}">${escapeHtml(d.name)}</option>`)
      .join('');

    select.innerHTML = placeholder + optionsHtml;
  });
}

function ensureOrderSummary() {
  // Вставляем блок под заголовком "Ваш заказ"
  const orderSection = [...$$('.form-section')].find(sec => /Ваш заказ/i.test(sec.textContent));
  if (!orderSection) return;

  if (!$('.order-summary', orderSection)) {
    const wrap = document.createElement('div');
    wrap.className = 'order-summary';
    wrap.innerHTML = `
      <div id="order-items"></div>
      <div class="order-total"><span>Итого:</span> <strong id="order-total">0 ₽</strong></div>
    `;
    // Вставим блок перед комментарием к заказу (если он есть), иначе в конец секции
    const comment = $('#comment')?.closest('.form-group');
    if (comment) {
      orderSection.insertBefore(wrap, comment);
    } else {
      orderSection.appendChild(wrap);
    }
  }
}

function wireUpForm() {
  // На выбор значения в select — обновляем состояние
  CATEGORIES.forEach(({ key, selectId }) => {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.addEventListener('change', () => {
      const val = select.value;
      const dish = DISHES.find(d => d.category === key && d.value === val) || null;
      selected[key] = dish;
      updateSummary();
    });
  });

  // Управление временем доставки (опционально — более дружественное поведение)
  const asap = document.getElementById('delivery-time-1');
  const specific = document.getElementById('delivery-time-2');
  const timeInput = document.getElementById('specific-time');
  if (asap && specific && timeInput) {
    const syncTimeInput = () => timeInput.disabled = !specific.checked;
    [asap, specific].forEach(r => r.addEventListener('change', syncTimeInput));
    syncTimeInput();
  }

  // Сброс формы
  const resetBtn = document.getElementById('reset-order') || $('button[type="reset"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      selected['soup'] = null;
      selected['main-course'] = null;
      selected['drink'] = null;
      CATEGORIES.forEach(({ selectId }) => {
        const select = document.getElementById(selectId);
        if (select) select.value = '';
      });
      updateSummary();
    });
  }
}

function addDishToOrder(dish) {
  // Обновляем состояние выбранной категории и синхронизируем select
  selected[dish.category] = dish;

  const catCfg = CATEGORIES.find(c => c.key === dish.category);
  if (catCfg) {
    const select = document.getElementById(catCfg.selectId);
    if (select) select.value = dish.value;
  }

  updateSummary();

  // Небольшой визуальный отклик на кнопке
  const selector = `.dish-card[data-value="${CSS.escape(dish.value)}"] .add-btn`;
  const btn = document.querySelector(selector);
  if (btn) {
    btn.disabled = true;
    setTimeout(() => (btn.disabled = false), 300);
  }
}

function updateSummary() {
  const itemsWrap = document.getElementById('order-items');
  const totalEl = document.getElementById('order-total');
  if (!itemsWrap || !totalEl) return;

  itemsWrap.innerHTML = '';

  let total = 0;

  CATEGORIES.forEach(({ key, title, selectId }) => {
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


    // Удаление позиции: чистим состояние и select
    $('.remove-btn', row).addEventListener('click', () => {
      selected[key] = null;
      const select = document.getElementById(selectId);
      if (select) select.value = '';
      updateSummary();
    });

    itemsWrap.appendChild(row);
  });

  totalEl.textContent = rubFmt.format(total);
}

// Безопасный вывод текстов в HTML
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
