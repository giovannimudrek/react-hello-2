/**
 * Ferramenta Trello - Board Script
 * Handles: Drag & Drop, Add Card, Add Column, Card Detail Modal
 */

'use strict';

// ============================================================
// State
// ============================================================
let dragSrcCard = null;
let dragSrcList = null;
let currentColumnId = null;
let selectedLabelColor = 'red';
let cardCounter = 100;
let currentCardElement = null;

// ============================================================
// DOM References
// ============================================================
const board = document.getElementById('board');
const addCardModal = document.getElementById('add-card-modal');
const cardDetailModal = document.getElementById('card-detail-modal');
const cardTitleInput = document.getElementById('card-title-input');
const modalSaveBtn = document.getElementById('modal-save-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const cardDetailClose = document.getElementById('card-detail-close');
const cardDetailTitle = document.getElementById('card-detail-title');
const cardDetailList = document.getElementById('card-detail-list');
const cardDetailCover = document.getElementById('card-detail-cover');
const addColumnBtn = document.getElementById('add-column-btn');
const addChecklistItemBtn = document.querySelector('.add-checklist-item-btn');

// ============================================================
// Drag & Drop
// ============================================================
function initDragAndDrop() {
  document.querySelectorAll('.card').forEach(attachCardDrag);
  document.querySelectorAll('.card-list').forEach(attachListDrop);
}

function attachCardDrag(card) {
  card.addEventListener('dragstart', onCardDragStart);
  card.addEventListener('dragend', onCardDragEnd);
}

function attachListDrop(list) {
  list.addEventListener('dragover', onListDragOver);
  list.addEventListener('drop', onListDrop);
  list.addEventListener('dragleave', onListDragLeave);
}

function onCardDragStart(e) {
  dragSrcCard = this;
  dragSrcList = this.closest('.card-list');
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.dataset.cardId);
  // Delay to allow the drag image to be captured before opacity change
  setTimeout(() => {
    this.classList.add('dragging');
  }, 0);
}

function onCardDragEnd() {
  this.classList.remove('dragging');
  document.querySelectorAll('.card-list').forEach(l => l.classList.remove('drag-active'));
  document.querySelectorAll('.column').forEach(c => c.classList.remove('drag-over'));
  removePlaceholders();
}

function onListDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

  const list = this;
  list.classList.add('drag-active');
  list.closest('.column').classList.add('drag-over');

  const afterElement = getDragAfterElement(list, e.clientY);
  const placeholder = getOrCreatePlaceholder();

  if (afterElement == null) {
    list.appendChild(placeholder);
  } else {
    list.insertBefore(placeholder, afterElement);
  }
}

function onListDragLeave(e) {
  const list = this;
  // Only remove if truly leaving the list (not entering a child)
  if (!list.contains(e.relatedTarget)) {
    list.classList.remove('drag-active');
    list.closest('.column').classList.remove('drag-over');
  }
}

function onListDrop(e) {
  e.preventDefault();
  if (!dragSrcCard) return;

  const list = this;
  const placeholder = document.querySelector('.drop-zone-placeholder');
  if (placeholder) {
    list.insertBefore(dragSrcCard, placeholder);
    placeholder.remove();
  } else {
    list.appendChild(dragSrcCard);
  }

  list.classList.remove('drag-active');
  list.closest('.column').classList.remove('drag-over');
  dragSrcCard = null;
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.card:not(.dragging):not(.drop-zone-placeholder)')
  ];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function getOrCreatePlaceholder() {
  let placeholder = document.querySelector('.drop-zone-placeholder');
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.classList.add('drop-zone-placeholder');
  }
  return placeholder;
}

function removePlaceholders() {
  document.querySelectorAll('.drop-zone-placeholder').forEach(p => p.remove());
}

// ============================================================
// Add Card Modal
// ============================================================
function openAddCardModal(columnId) {
  currentColumnId = columnId;
  cardTitleInput.value = '';
  selectedLabelColor = 'red';
  document.querySelectorAll('.label-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === 'red');
  });
  addCardModal.setAttribute('aria-hidden', 'false');
  addCardModal.classList.add('is-open');
  setTimeout(() => cardTitleInput.focus(), 100);
}

function closeAddCardModal() {
  addCardModal.setAttribute('aria-hidden', 'true');
  addCardModal.classList.remove('is-open');
  currentColumnId = null;
}

function saveCard() {
  const title = cardTitleInput.value.trim();
  if (!title) {
    cardTitleInput.focus();
    cardTitleInput.style.borderColor = '#EB5A46';
    setTimeout(() => { cardTitleInput.style.borderColor = ''; }, 1500);
    return;
  }

  const listId = `${currentColumnId}-list`;
  const list = document.getElementById(listId);
  if (!list) return;

  cardCounter++;
  const card = createCardElement(`card-${cardCounter}`, title, selectedLabelColor);
  list.appendChild(card);
  attachCardDrag(card);
  closeAddCardModal();
}

function createCardElement(id, title, labelColor) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.draggable = true;
  card.dataset.cardId = id;
  card.innerHTML = `
    <div class="card-label card-label--${labelColor}"></div>
    <p class="card-title">${escapeHtml(title)}</p>
    <div class="card-footer">
      <div class="card-badges"></div>
      <div class="card-members"></div>
    </div>
  `;
  card.addEventListener('click', onCardClick);
  return card;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ============================================================
// Add Column
// ============================================================
function showAddColumnForm() {
  const addWrapper = document.querySelector('.add-column-wrapper');

  const form = document.createElement('div');
  form.classList.add('add-column-form');
  form.innerHTML = `
    <input type="text" class="add-column-input" placeholder="Insira o titulo da lista..." />
    <div class="add-column-form-actions">
      <button class="btn btn-primary add-column-submit">Adicionar lista</button>
      <button class="btn-icon-close add-column-cancel" aria-label="Cancelar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  `;

  board.insertBefore(form, addWrapper);
  const input = form.querySelector('.add-column-input');
  input.focus();

  form.querySelector('.add-column-submit').addEventListener('click', () => {
    const title = input.value.trim();
    if (!title) { input.focus(); return; }
    addNewColumn(title);
    form.remove();
  });

  form.querySelector('.add-column-cancel').addEventListener('click', () => {
    form.remove();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const title = input.value.trim();
      if (!title) return;
      addNewColumn(title);
      form.remove();
    }
    if (e.key === 'Escape') {
      form.remove();
    }
  });
}

function addNewColumn(title) {
  const columnId = `col-${Date.now()}`;
  const column = document.createElement('div');
  column.classList.add('column');
  column.dataset.columnId = columnId;
  const listId = `${columnId}-list`;

  column.innerHTML = `
    <div class="column-header">
      <h2 class="column-title" contenteditable="false">${escapeHtml(title)}</h2>
      <button class="column-menu-btn" aria-label="Menu da coluna" title="Menu">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="3.5" r="1.2" fill="currentColor"/>
          <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
          <circle cx="8" cy="12.5" r="1.2" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div class="card-list" id="${listId}"></div>
    <button class="add-card-btn" data-column="${columnId}">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      Adicionar cartao
    </button>
  `;

  const addWrapper = document.querySelector('.add-column-wrapper');
  board.insertBefore(column, addWrapper);

  const list = column.querySelector('.card-list');
  attachListDrop(list);

  column.querySelector('.add-card-btn').addEventListener('click', function () {
    openAddCardModal(this.dataset.column);
  });
}

// ============================================================
// Card Detail Modal
// ============================================================
function onCardClick(e) {
  // Don't open modal if dragging just ended
  if (dragSrcCard) return;
  currentCardElement = this;
  openCardDetail(this);
}

function openCardDetail(card) {
  const title = card.querySelector('.card-title').textContent;
  const column = card.closest('.column');
  const columnName = column ? column.querySelector('.column-title').textContent : '';

  cardDetailTitle.textContent = title;
  cardDetailList.textContent = columnName;

  // Cover
  const cover = card.querySelector('.card-cover');
  if (cover) {
    cardDetailCover.style.background = cover.style.background;
    cardDetailCover.style.height = '200px';
    cardDetailCover.classList.add('has-cover');
  } else {
    cardDetailCover.style.height = '0';
    cardDetailCover.classList.remove('has-cover');
    cardDetailCover.style.background = '';
  }

  cardDetailModal.setAttribute('aria-hidden', 'false');
  cardDetailModal.classList.add('is-open');
}

function closeCardDetail() {
  // Sync title back to card
  if (currentCardElement && cardDetailTitle.textContent.trim()) {
    const cardTitleEl = currentCardElement.querySelector('.card-title');
    if (cardTitleEl) {
      cardTitleEl.textContent = cardDetailTitle.textContent.trim();
    }
  }
  cardDetailModal.setAttribute('aria-hidden', 'true');
  cardDetailModal.classList.remove('is-open');
  currentCardElement = null;
}

// ============================================================
// Checklist
// ============================================================
function addChecklistItem() {
  const checklist = document.getElementById('card-checklist');
  const itemId = `check-${Date.now()}`;
  const item = document.createElement('div');
  item.classList.add('checklist-item');
  item.innerHTML = `
    <input type="checkbox" id="${itemId}" class="checklist-checkbox">
    <label for="${itemId}" class="checklist-label" contenteditable="true">Novo item...</label>
  `;
  checklist.appendChild(item);
  const label = item.querySelector('.checklist-label');
  label.focus();
  // Select all text in the new label
  const range = document.createRange();
  range.selectNodeContents(label);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// ============================================================
// Column Title Edit
// ============================================================
function initColumnTitleEdit() {
  document.querySelectorAll('.column-title').forEach(title => {
    title.addEventListener('click', function () {
      this.setAttribute('contenteditable', 'true');
      this.focus();
    });
    title.addEventListener('blur', function () {
      this.setAttribute('contenteditable', 'false');
      if (!this.textContent.trim()) {
        this.textContent = 'Sem titulo';
      }
    });
    title.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
      }
      if (e.key === 'Escape') {
        this.blur();
      }
    });
  });
}

// ============================================================
// Label Picker
// ============================================================
function initLabelPicker() {
  document.querySelectorAll('.label-option').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.label-option').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedLabelColor = this.dataset.color;
    });
  });
}

// ============================================================
// Event Listeners
// ============================================================
function initEventListeners() {
  // Add card buttons
  document.querySelectorAll('.add-card-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      openAddCardModal(this.dataset.column);
    });
  });

  // Card clicks (existing cards)
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', onCardClick);
  });

  // Add card modal
  modalSaveBtn.addEventListener('click', saveCard);
  modalCancelBtn.addEventListener('click', closeAddCardModal);
  modalCloseBtn.addEventListener('click', closeAddCardModal);

  // Card title input enter key
  cardTitleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveCard();
    }
    if (e.key === 'Escape') {
      closeAddCardModal();
    }
  });

  // Card detail modal
  cardDetailClose.addEventListener('click', closeCardDetail);

  // Close modals on overlay click
  addCardModal.addEventListener('click', (e) => {
    if (e.target === addCardModal) closeAddCardModal();
  });
  cardDetailModal.addEventListener('click', (e) => {
    if (e.target === cardDetailModal) closeCardDetail();
  });

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (addCardModal.classList.contains('is-open')) closeAddCardModal();
      if (cardDetailModal.classList.contains('is-open')) closeCardDetail();
    }
  });

  // Add column button
  addColumnBtn.addEventListener('click', showAddColumnForm);

  // Checklist
  if (addChecklistItemBtn) {
    addChecklistItemBtn.addEventListener('click', addChecklistItem);
  }

  // Column menu button (prevent card click propagation)
  document.querySelectorAll('.column-menu-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showColumnMenu(e, btn.closest('.column'));
    });
  });
}

// ============================================================
// Column Context Menu
// ============================================================
function showColumnMenu(e, column) {
  removeExistingMenus();

  const menu = document.createElement('div');
  menu.classList.add('context-menu');
  menu.style.cssText = `
    position: fixed;
    z-index: 600;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(9,30,66,0.24);
    padding: 8px;
    min-width: 160px;
    font-size: 14px;
  `;

  const menuItems = [
    { label: 'Adicionar cartao', action: () => { openAddCardModal(column.dataset.columnId); menu.remove(); } },
    { label: 'Editar titulo', action: () => { const t = column.querySelector('.column-title'); t.setAttribute('contenteditable', 'true'); t.focus(); menu.remove(); } },
    { label: 'Arquivar lista', action: () => { column.style.opacity = '0'; column.style.transform = 'scale(0.9)'; column.style.transition = 'all 0.2s'; setTimeout(() => column.remove(), 200); menu.remove(); } },
  ];

  menuItems.forEach(item => {
    const btn = document.createElement('button');
    btn.style.cssText = `
      display: block;
      width: 100%;
      text-align: left;
      padding: 6px 12px;
      border-radius: 4px;
      color: #172b4d;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
    `;
    btn.textContent = item.label;
    btn.addEventListener('click', item.action);
    btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(9,30,66,0.08)'; });
    btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });
    menu.appendChild(btn);
  });

  const btnRect = e.currentTarget.getBoundingClientRect();
  menu.style.top = `${btnRect.bottom + 4}px`;
  menu.style.left = `${btnRect.left}px`;

  document.body.appendChild(menu);

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(ev) {
      if (!menu.contains(ev.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 0);
}

function removeExistingMenus() {
  document.querySelectorAll('.context-menu').forEach(m => m.remove());
}

// ============================================================
// Board Background Gradient Animation
// ============================================================
function initBoardBackground() {
  // Subtle animated gradient on the board background
  let hue = 210;
  const body = document.body;

  setInterval(() => {
    hue = (hue + 0.05) % 360;
    // Very subtle shift, stays blue
    const h = 210 + Math.sin(hue * 0.01) * 10;
    body.style.background = `hsl(${h}, 100%, 35%)`;
  }, 50);
}

// ============================================================
// Init
// ============================================================
function init() {
  initDragAndDrop();
  initColumnTitleEdit();
  initLabelPicker();
  initEventListeners();
  initBoardBackground();
}

document.addEventListener('DOMContentLoaded', init);
