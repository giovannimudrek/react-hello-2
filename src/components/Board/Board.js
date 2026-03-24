/**
 * Board.js — Task View Board (Trello-style)
 *
 * Vanilla JS implementation fiel ao design Figma "Ferramenta Trello" node 1:2.
 * Inclui drag & drop nativo HTML5 entre colunas e dentro da mesma coluna.
 *
 * API publica: BoardApp.init(container)
 */

const BoardApp = (() => {
  /* ──────────────────────────────────────────
     STATE
  ────────────────────────────────────────── */
  let state = {
    activeTab: 'board',
    searchQuery: '',
    board: null,
    isLoading: true,
    draggingCardId: null,
    draggingFromColumnId: null,
    contextMenu: null,
  };

  let rootEl = null;

  /* ──────────────────────────────────────────
     DEEP CLONE utility
  ────────────────────────────────────────── */
  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  /* ──────────────────────────────────────────
     MEMBER LOOKUP
  ────────────────────────────────────────── */
  const getMember = (id) =>
    state.board.members.find((m) => m.id === id);

  /* ──────────────────────────────────────────
     SVG ICONS (inline, crisp, accessible)
  ────────────────────────────────────────── */
  const icons = {
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="rgba(255,255,255,0.6)"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="rgba(255,255,255,0.6)"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="rgba(255,255,255,0.3)"/>
    </svg>`,

    search: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 10L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    bell: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M8.5 16.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    home: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 7l6-5 6 5v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M6 14V9h4v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    notification: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5a5 5 0 0 0-5 5v2.5L1.5 11h13L13 9V6.5a5 5 0 0 0-5-5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,

    tasks: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3h12M2 8h8M2 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="13" cy="11" r="2.5" stroke="currentColor" stroke-width="1.3"/>
      <path d="M12 11l.8.8 1.4-1.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    analytics: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 13V9l3-3 3 3 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="4" r="1.2" fill="currentColor"/>
    </svg>`,

    board: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="12" rx="1" stroke="currentColor" stroke-width="1.4"/>
      <rect x="9" y="2" width="5" height="7" rx="1" stroke="currentColor" stroke-width="1.4"/>
      <rect x="9" y="11" width="5" height="3" rx="1" stroke="currentColor" stroke-width="1.4"/>
    </svg>`,

    list: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M2 8h12M2 12h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    check: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/>
      <path d="M5.5 8l2 2 3-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    plus: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,

    plusSm: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    calendar: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/>
      <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,

    subtask: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M2 8h8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M2 12h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M11 9l1.5 1.5L15 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    paperclip: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13 7.5l-5.5 5.5a3.5 3.5 0 0 1-5-5l6-6a2 2 0 0 1 2.8 2.8L5.8 10.3a.5.5 0 0 1-.7-.7L10 4.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    message: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5.5L2 14V3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>`,

    moreHorizontal: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="3" cy="8" r="1.3" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.3" fill="currentColor"/>
      <circle cx="13" cy="8" r="1.3" fill="currentColor"/>
    </svg>`,

    edit: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 2l2.5 2.5L4.5 12H2V9.5L9.5 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
    </svg>`,

    move: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M5 4l2-2 2 2M5 10l2 2 2-2M4 5l-2 2 2 2M10 5l2 2-2 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    copy: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
      <path d="M2 10V3a1 1 0 0 1 1-1h7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>`,

    trash: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4h10M5 4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4M11 4l-.8 7.5a1 1 0 0 1-1 .5H4.8a1 1 0 0 1-1-.5L3 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    close: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  };

  /* ──────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────── */
  const h = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else if (k === 'innerHTML') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else {
        el.setAttribute(k, v);
      }
    });
    children.forEach((child) => {
      if (!child && child !== 0) return;
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child instanceof Node) el.appendChild(child);
    });
    return el;
  };

  const svgEl = (svgString) => {
    const wrapper = document.createElement('span');
    wrapper.innerHTML = svgString;
    return wrapper.firstElementChild;
  };

  /* ──────────────────────────────────────────
     TOAST
  ────────────────────────────────────────── */
  const showToast = (message) => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = h('div', { className: 'toast-container' });
      document.body.appendChild(container);
    }
    const toast = h('div', { className: 'toast' }, message);
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  /* ──────────────────────────────────────────
     CONTEXT MENU
  ────────────────────────────────────────── */
  const closeContextMenu = () => {
    const existing = document.querySelector('.context-menu');
    if (existing) existing.remove();
    state.contextMenu = null;
  };

  const openContextMenu = (x, y, cardId, columnId) => {
    closeContextMenu();

    const items = [
      { label: 'Editar',      icon: icons.edit, action: () => showToast('Funcao de edicao em breve.') },
      { label: 'Mover para',  icon: icons.move, action: () => openMoveModal(cardId, columnId) },
      { label: 'Duplicar',    icon: icons.copy, action: () => duplicateCard(cardId, columnId) },
      { separator: true },
      { label: 'Excluir',     icon: icons.trash, action: () => deleteCard(cardId, columnId), danger: true },
    ];

    const menu = h('div', { className: 'context-menu' });

    items.forEach((item) => {
      if (item.separator) {
        menu.appendChild(h('div', { className: 'context-menu__separator' }));
        return;
      }
      const btn = h('div', {
        className: `context-menu__item${item.danger ? ' context-menu__item--danger' : ''}`,
        onclick: (e) => {
          e.stopPropagation();
          closeContextMenu();
          item.action();
        },
      });
      btn.innerHTML = item.icon;
      btn.querySelector('svg').style.cssText = 'width:14px;height:14px;flex-shrink:0;';
      btn.appendChild(document.createTextNode(' ' + item.label));
      menu.appendChild(btn);
    });

    document.body.appendChild(menu);

    // Position inside viewport
    const menuW = 160;
    const menuH = 180;
    const finalX = x + menuW > window.innerWidth ? x - menuW : x;
    const finalY = y + menuH > window.innerHeight ? y - menuH : y;
    menu.style.left = finalX + 'px';
    menu.style.top  = finalY + 'px';

    state.contextMenu = menu;
  };

  const openMoveModal = (cardId, fromColumnId) => {
    const otherColumns = state.board.columns.filter((c) => c.id !== fromColumnId);
    if (!otherColumns.length) { showToast('Nao ha outras colunas.'); return; }

    openModal(
      'Mover cartao para...',
      () => {
        const sel = document.getElementById('modal-column-select');
        if (!sel || !sel.value) return;
        moveCardToColumn(cardId, fromColumnId, sel.value);
        closeModal();
        showToast('Cartao movido com sucesso.');
      },
      (body) => {
        const field = h('div', { className: 'modal__field' });
        const lbl = h('label', { className: 'modal__label', for: 'modal-column-select' }, 'Coluna de destino');
        const sel = h('select', { id: 'modal-column-select', className: 'modal__input' });
        otherColumns.forEach((col) => {
          const opt = h('option', { value: col.id }, col.name);
          sel.appendChild(opt);
        });
        field.appendChild(lbl);
        field.appendChild(sel);
        body.appendChild(field);
      }
    );
  };

  const moveCardToColumn = (cardId, fromColId, toColId) => {
    const fromCol = state.board.columns.find((c) => c.id === fromColId);
    const toCol   = state.board.columns.find((c) => c.id === toColId);
    if (!fromCol || !toCol) return;

    const idx = fromCol.cards.findIndex((c) => c.id === cardId);
    if (idx === -1) return;
    const [card] = fromCol.cards.splice(idx, 1);
    card.columnId = toColId;
    toCol.cards.push(card);
    fromCol.taskCount = fromCol.cards.length;
    toCol.taskCount   = toCol.cards.length;
    render();
  };

  const duplicateCard = (cardId, columnId) => {
    const col = state.board.columns.find((c) => c.id === columnId);
    if (!col) return;
    const card = col.cards.find((c) => c.id === cardId);
    if (!card) return;
    const dup = clone(card);
    dup.id    = 'card-' + Date.now();
    dup.title = dup.title + ' (copia)';
    col.cards.push(dup);
    col.taskCount = col.cards.length;
    render();
    showToast('Cartao duplicado.');
  };

  const deleteCard = (cardId, columnId) => {
    const col = state.board.columns.find((c) => c.id === columnId);
    if (!col) return;
    col.cards = col.cards.filter((c) => c.id !== cardId);
    col.taskCount = col.cards.length;
    render();
    showToast('Cartao excluido.');
  };

  /* ──────────────────────────────────────────
     MODAL
  ────────────────────────────────────────── */
  const closeModal = () => {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.remove();
  };

  const openModal = (title, onConfirm, buildBody) => {
    closeModal();

    const overlay = h('div', {
      className: 'modal-overlay',
      onclick: (e) => { if (e.target === overlay) closeModal(); },
    });

    const modal = h('div', { className: 'modal' });

    // Header
    const hdr = h('div', { className: 'modal__header' });
    hdr.appendChild(h('h2', { className: 'modal__title' }, title));
    const closeBtn = h('button', {
      className: 'modal__close',
      onclick: closeModal,
      innerHTML: icons.close,
    });
    hdr.appendChild(closeBtn);
    modal.appendChild(hdr);

    // Body
    const body = h('div', { className: 'modal__body' });
    if (buildBody) buildBody(body);
    modal.appendChild(body);

    // Actions
    const actions = h('div', { className: 'modal__actions' });
    actions.appendChild(h('button', { className: 'btn btn--secondary', onclick: closeModal }, 'Cancelar'));
    actions.appendChild(h('button', { className: 'btn btn--primary', onclick: onConfirm }, 'Confirmar'));
    modal.appendChild(actions);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  };

  const openAddCardModal = (columnId) => {
    openModal(
      'Adicionar cartao',
      () => {
        const titleInput = document.getElementById('new-card-title');
        const descInput  = document.getElementById('new-card-desc');
        const title      = titleInput ? titleInput.value.trim() : '';
        if (!title) { titleInput && titleInput.focus(); return; }

        const col = state.board.columns.find((c) => c.id === columnId);
        if (!col) return;

        const newCard = {
          id: 'card-' + Date.now(),
          columnId,
          title,
          description: descInput ? descInput.value.trim() : '',
          dueDate: null,
          subtasks: { completed: 0, total: 0 },
          tags: [],
          assignees: [],
          attachmentCount: 0,
          commentCount: 0,
        };
        col.cards.push(newCard);
        col.taskCount = col.cards.length;
        closeModal();
        render();
        showToast('Cartao adicionado com sucesso.');
      },
      (body) => {
        const f1 = h('div', { className: 'modal__field' });
        f1.appendChild(h('label', { className: 'modal__label', for: 'new-card-title' }, 'Titulo *'));
        f1.appendChild(h('input', {
          id: 'new-card-title',
          className: 'modal__input',
          type: 'text',
          placeholder: 'Nome da tarefa',
        }));
        body.appendChild(f1);

        const f2 = h('div', { className: 'modal__field' });
        f2.appendChild(h('label', { className: 'modal__label', for: 'new-card-desc' }, 'Descricao'));
        f2.appendChild(h('textarea', {
          id: 'new-card-desc',
          className: 'modal__textarea',
          placeholder: 'Descreva a tarefa...',
        }));
        body.appendChild(f2);

        setTimeout(() => document.getElementById('new-card-title')?.focus(), 50);
      }
    );
  };

  /* ──────────────────────────────────────────
     DRAG & DROP (HTML5 native)
  ────────────────────────────────────────── */
  let dragSrcCardId   = null;
  let dragSrcColId    = null;
  let dragOverColId   = null;
  let dragOverCardId  = null;

  const onCardDragStart = (e, cardId, colId) => {
    dragSrcCardId  = cardId;
    dragSrcColId   = colId;
    e.currentTarget.classList.add('card--dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', cardId);
  };

  const onCardDragEnd = (e) => {
    e.currentTarget.classList.remove('card--dragging');
    // Remove all drag-over highlights
    document.querySelectorAll('.column--drag-over').forEach((el) =>
      el.classList.remove('column--drag-over')
    );
    dragSrcCardId  = null;
    dragSrcColId   = null;
    dragOverColId  = null;
    dragOverCardId = null;
  };

  const onColumnDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColId !== colId) {
      document.querySelectorAll('.column--drag-over').forEach((el) =>
        el.classList.remove('column--drag-over')
      );
      const colEl = document.querySelector(`[data-column-id="${colId}"]`);
      if (colEl) colEl.classList.add('column--drag-over');
      dragOverColId = colId;
    }
  };

  const onColumnDrop = (e, toColId) => {
    e.preventDefault();
    const colEl = document.querySelector(`[data-column-id="${toColId}"]`);
    if (colEl) colEl.classList.remove('column--drag-over');

    if (!dragSrcCardId || !dragSrcColId) return;
    if (dragSrcCardId === dragOverCardId) return;

    const fromCol = state.board.columns.find((c) => c.id === dragSrcColId);
    const toCol   = state.board.columns.find((c) => c.id === toColId);
    if (!fromCol || !toCol) return;

    const cardIdx = fromCol.cards.findIndex((c) => c.id === dragSrcCardId);
    if (cardIdx === -1) return;

    const [card] = fromCol.cards.splice(cardIdx, 1);
    card.columnId = toColId;

    // Insert before the hovered card if in same column
    if (dragOverCardId && toColId === dragSrcColId) {
      const overIdx = toCol.cards.findIndex((c) => c.id === dragOverCardId);
      if (overIdx !== -1) {
        toCol.cards.splice(overIdx, 0, card);
      } else {
        toCol.cards.push(card);
      }
    } else {
      toCol.cards.push(card);
    }

    fromCol.taskCount = fromCol.cards.length;
    toCol.taskCount   = toCol.cards.length;

    render();
    showToast(`Cartao movido para "${toCol.name}".`);
  };

  const onCardDragOver = (e, cardId) => {
    e.preventDefault();
    dragOverCardId = cardId;
  };

  /* ──────────────────────────────────────────
     BUILD: HEADER
  ────────────────────────────────────────── */
  const buildHeader = () => {
    const header = h('header', { className: 'header' });

    // Brand
    const brand = h('a', { className: 'header__brand', href: '#' });
    const logoBox = h('div', { className: 'header__logo', innerHTML: icons.logo });
    brand.appendChild(logoBox);
    brand.appendChild(h('span', { className: 'header__brand-name' }, 'Task View'));
    header.appendChild(brand);

    // Search
    const searchWrap = h('div', { className: 'header__search' });
    const searchIcon = h('span', { className: 'header__search-icon', innerHTML: icons.search });
    const searchInput = h('input', {
      className: 'header__search-input',
      type: 'search',
      placeholder: 'Buscar tarefas...',
      'aria-label': 'Buscar tarefas',
    });
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderBoard();
    });
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);
    header.appendChild(searchWrap);

    // Controls
    const controls = h('div', { className: 'header__controls' });
    const bellBtn = h('button', {
      className: 'header__bell-btn',
      'aria-label': 'Notificacoes',
      innerHTML: icons.bell,
      onclick: () => showToast('Nenhuma notificacao nova.'),
    });
    controls.appendChild(bellBtn);
    controls.appendChild(h('div', { className: 'header__avatar' }, 'UC'));
    header.appendChild(controls);

    return header;
  };

  /* ──────────────────────────────────────────
     BUILD: SIDEBAR
  ────────────────────────────────────────── */
  const buildSidebar = () => {
    const sidebar = h('nav', { className: 'sidebar', 'aria-label': 'Navegacao principal' });
    const nav = h('div', { className: 'sidebar__nav' });

    const navItems = [
      { label: 'Home',          icon: icons.home,         id: 'home' },
      { label: 'Notificacoes',  icon: icons.notification, id: 'notifications' },
      { label: 'Tarefas',       icon: icons.tasks,        id: 'tasks', active: true },
      { label: 'Analytics',     icon: icons.analytics,    id: 'analytics' },
    ];

    navItems.forEach((item) => {
      const link = h('a', {
        className: `sidebar__nav-item${item.active ? ' sidebar__nav-item--active' : ''}`,
        href: '#',
        'aria-current': item.active ? 'page' : undefined,
      });
      const iconEl = document.createElement('span');
      iconEl.innerHTML = item.icon;
      link.appendChild(iconEl);
      link.appendChild(document.createTextNode(item.label));

      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.sidebar__nav-item--active').forEach((el) =>
          el.classList.remove('sidebar__nav-item--active')
        );
        link.classList.add('sidebar__nav-item--active');
      });

      nav.appendChild(link);
    });

    sidebar.appendChild(nav);
    return sidebar;
  };

  /* ──────────────────────────────────────────
     BUILD: TOPBAR (Tabs + Members)
  ────────────────────────────────────────── */
  const buildTopbar = () => {
    const topbar = h('div', { className: 'topbar' });

    // Tabs
    const tabs = h('div', { className: 'tabs', role: 'tablist' });

    const tabDefs = [
      { id: 'board',      label: 'Board',     icon: icons.board },
      { id: 'pendentes',  label: 'Pendentes', icon: icons.list },
      { id: 'concluidas', label: 'Concluidas',icon: icons.check },
    ];

    tabDefs.forEach((td) => {
      const isActive = state.activeTab === td.id;
      const btn = h('button', {
        className: `tab${isActive ? ' tab--active' : ''}`,
        role: 'tab',
        'aria-selected': String(isActive),
        'data-tab': td.id,
      });
      const iconEl = document.createElement('span');
      iconEl.innerHTML = td.icon;
      btn.appendChild(iconEl);
      btn.appendChild(document.createTextNode(td.label));

      if (!isActive) {
        btn.addEventListener('click', () => {
          state.activeTab = td.id;
          renderTopbar();
          renderBoard();
        });
      }

      tabs.appendChild(btn);
    });

    topbar.appendChild(tabs);

    // Member group
    const memberGroup = h('div', { className: 'member-group' });
    const avatarStack = h('div', { className: 'avatar-stack' });
    const MAX_VISIBLE = 5;
    const members = state.board.members;

    members.slice(0, MAX_VISIBLE).forEach((m) => {
      const av = h('div', {
        className: 'avatar-stack__item',
        title: m.name,
        style: `background-color: ${m.color}`,
      }, m.initials);
      avatarStack.appendChild(av);
    });

    if (members.length > MAX_VISIBLE) {
      const overflow = h('div', {
        className: 'avatar-stack__overflow',
        title: `+${members.length - MAX_VISIBLE} membros`,
      }, `+${members.length - MAX_VISIBLE}`);
      avatarStack.appendChild(overflow);
    }

    memberGroup.appendChild(avatarStack);

    const addBtn = h('button', {
      className: 'member-group__add-btn',
      'aria-label': 'Adicionar membro',
      innerHTML: icons.plus,
      onclick: () => showToast('Funcao de adicionar membro em breve.'),
    });
    memberGroup.appendChild(addBtn);

    topbar.appendChild(memberGroup);
    return topbar;
  };

  /* ──────────────────────────────────────────
     BUILD: TAG
  ────────────────────────────────────────── */
  const buildTag = (tag) => {
    return h('span', { className: `tag tag--${tag.variant}` }, tag.label);
  };

  /* ──────────────────────────────────────────
     BUILD: CARD
  ────────────────────────────────────────── */
  const buildCard = (card, columnId) => {
    const cardEl = h('article', {
      className: 'card',
      draggable: 'true',
      'data-card-id': card.id,
      'data-column-id': columnId,
      'aria-label': card.title,
    });

    cardEl.addEventListener('dragstart', (e) => onCardDragStart(e, card.id, columnId));
    cardEl.addEventListener('dragend',   onCardDragEnd);
    cardEl.addEventListener('dragover',  (e) => onCardDragOver(e, card.id));

    /* Section 1: Tags + Menu */
    const top = h('div', { className: 'card__top' });
    const tagsEl = h('div', { className: 'card__tags' });
    card.tags.forEach((t) => tagsEl.appendChild(buildTag(t)));
    top.appendChild(tagsEl);

    const menuBtn = h('button', {
      className: 'card__menu-btn',
      'aria-label': 'Menu do cartao',
      innerHTML: icons.moreHorizontal,
    });
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = menuBtn.getBoundingClientRect();
      openContextMenu(rect.right + 4, rect.bottom, card.id, columnId);
    });
    top.appendChild(menuBtn);
    cardEl.appendChild(top);

    /* Section 2: Title + Description */
    const body = h('div', { className: 'card__body' });
    body.appendChild(h('h3', { className: 'card__title' }, card.title));
    if (card.description) {
      body.appendChild(h('p', { className: 'card__description' }, card.description));
    }
    cardEl.appendChild(body);

    /* Section 3: Metadata */
    if (card.dueDate || card.subtasks.total > 0) {
      const meta = h('div', { className: 'card__meta' });

      if (card.dueDate) {
        const dateItem = h('div', { className: 'card__meta-item' });
        dateItem.innerHTML = icons.calendar;
        dateItem.appendChild(document.createTextNode(card.dueDate));
        meta.appendChild(dateItem);
      }

      if (card.subtasks.total > 0) {
        const subItem = h('div', { className: 'card__meta-item' });
        subItem.innerHTML = icons.subtask;
        subItem.appendChild(
          document.createTextNode(`${card.subtasks.completed}/${card.subtasks.total}`)
        );
        meta.appendChild(subItem);
      }

      cardEl.appendChild(meta);
    }

    /* Section 4: Footer */
    const footer = h('div', { className: 'card__footer' });

    // Assignees
    const assigneesEl = h('div', { className: 'card__assignees' });
    card.assignees.slice(0, 5).forEach((memberId) => {
      const member = getMember(memberId);
      if (!member) return;
      const av = h('div', {
        className: 'card__assignee',
        title: member.name,
        style: `background-color: ${member.color}`,
      }, member.initials);
      assigneesEl.appendChild(av);
    });
    footer.appendChild(assigneesEl);

    // Counters
    const counters = h('div', { className: 'card__counters' });

    if (card.attachmentCount > 0) {
      const cl = h('div', { className: 'card__counter' });
      cl.innerHTML = icons.paperclip;
      cl.appendChild(document.createTextNode(String(card.attachmentCount)));
      counters.appendChild(cl);
    }

    if (card.commentCount > 0) {
      const cc = h('div', { className: 'card__counter' });
      cc.innerHTML = icons.message;
      cc.appendChild(document.createTextNode(String(card.commentCount)));
      counters.appendChild(cc);
    }

    footer.appendChild(counters);
    cardEl.appendChild(footer);

    return cardEl;
  };

  /* ──────────────────────────────────────────
     BUILD: COLUMN
  ────────────────────────────────────────── */
  const buildColumn = (column) => {
    const colEl = h('section', {
      className: 'column',
      'data-column-id': column.id,
      'aria-label': `Coluna ${column.name}`,
    });

    colEl.addEventListener('dragover', (e) => onColumnDragOver(e, column.id));
    colEl.addEventListener('drop',     (e) => onColumnDrop(e, column.id));

    // Header
    const header = h('div', { className: 'column__header' });
    const titleGroup = h('div', { className: 'column__title-group' });
    titleGroup.appendChild(h('h2', { className: 'column__title' }, column.name));
    titleGroup.appendChild(h('span', { className: 'column__count' }, `${column.taskCount} tarefas`));
    header.appendChild(titleGroup);

    const addBtn = h('button', {
      className: 'column__add-btn',
      'aria-label': `Adicionar cartao em ${column.name}`,
      innerHTML: icons.plus,
    });
    addBtn.addEventListener('click', () => openAddCardModal(column.id));
    header.appendChild(addBtn);
    colEl.appendChild(header);

    // Cards
    const cardsEl = h('div', { className: 'column__cards', role: 'list' });

    // Filter by search query
    const query = state.searchQuery.trim().toLowerCase();
    const filteredCards = query
      ? column.cards.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            (c.description || '').toLowerCase().includes(query)
        )
      : column.cards;

    if (filteredCards.length === 0) {
      const empty = h('div', { className: 'column__empty' });
      empty.appendChild(h('p', { className: 'column__empty-text' }, 'Nenhuma tarefa'));
      const emptyBtn = h('button', {
        className: 'column__empty-btn',
        innerHTML: icons.plusSm,
      });
      emptyBtn.appendChild(document.createTextNode(' Adicionar'));
      emptyBtn.addEventListener('click', () => openAddCardModal(column.id));
      empty.appendChild(emptyBtn);
      cardsEl.appendChild(empty);
    } else {
      filteredCards.forEach((card) => {
        const cardEl = buildCard(card, column.id);
        cardsEl.appendChild(cardEl);
      });
    }

    colEl.appendChild(cardsEl);
    return colEl;
  };

  /* ──────────────────────────────────────────
     SKELETON LOADER
  ────────────────────────────────────────── */
  const buildSkeletonCard = () => {
    const card = h('div', { className: 'skeleton-card' });
    card.appendChild(h('div', { className: 'skeleton skeleton-line skeleton-line--short' }));
    card.appendChild(h('div', { className: 'skeleton skeleton-line skeleton-line--medium' }));
    card.appendChild(h('div', { className: 'skeleton skeleton-line skeleton-line--full' }));
    card.appendChild(h('div', { className: 'skeleton skeleton-line skeleton-line--short' }));
    return card;
  };

  const buildSkeletonColumn = () => {
    const col = h('section', { className: 'column' });
    const hdr = h('div', { className: 'column__header' });
    hdr.appendChild(h('div', { className: 'skeleton skeleton-line skeleton-line--medium', style: 'height:20px;' }));
    col.appendChild(hdr);
    const cards = h('div', { className: 'column__cards' });
    cards.appendChild(buildSkeletonCard());
    cards.appendChild(buildSkeletonCard());
    col.appendChild(cards);
    return col;
  };

  /* ──────────────────────────────────────────
     RENDER FUNCTIONS
  ────────────────────────────────────────── */
  const renderTopbar = () => {
    const existing = rootEl.querySelector('.topbar');
    if (existing) {
      const newTopbar = buildTopbar();
      existing.replaceWith(newTopbar);
    }
  };

  const renderBoard = () => {
    const boardColumns = rootEl.querySelector('.board-columns');
    if (!boardColumns) return;

    boardColumns.innerHTML = '';

    if (state.isLoading) {
      [1, 2, 3].forEach(() => boardColumns.appendChild(buildSkeletonColumn()));
      return;
    }

    let columns = state.board.columns;

    // Filter columns based on active tab
    if (state.activeTab === 'pendentes') {
      columns = columns.filter((c) => c.id === 'col-pendentes');
    } else if (state.activeTab === 'concluidas') {
      columns = columns.filter((c) => c.id === 'col-concluidas');
    }

    columns.forEach((col) => boardColumns.appendChild(buildColumn(col)));
  };

  const render = () => {
    if (!rootEl) return;
    rootEl.innerHTML = '';

    // Header
    rootEl.appendChild(buildHeader());

    // Layout
    const layout = h('div', { className: 'layout' });
    layout.appendChild(buildSidebar());

    // Main
    const main = h('main', { className: 'main', id: 'main-content' });

    // Topbar
    main.appendChild(buildTopbar());

    // Board Area
    const boardArea = h('div', { className: 'board-area' });
    const boardColumns = h('div', { className: 'board-columns', role: 'list' });

    if (state.isLoading) {
      [1, 2, 3].forEach(() => boardColumns.appendChild(buildSkeletonColumn()));
    } else {
      let columns = state.board.columns;
      if (state.activeTab === 'pendentes') {
        columns = columns.filter((c) => c.id === 'col-pendentes');
      } else if (state.activeTab === 'concluidas') {
        columns = columns.filter((c) => c.id === 'col-concluidas');
      }
      columns.forEach((col) => boardColumns.appendChild(buildColumn(col)));
    }

    boardArea.appendChild(boardColumns);
    main.appendChild(boardArea);
    layout.appendChild(main);
    rootEl.appendChild(layout);

    // Close context menu on outside click
    document.addEventListener('click', (e) => {
      if (state.contextMenu && !state.contextMenu.contains(e.target)) {
        closeContextMenu();
      }
    }, { once: true });
  };

  /* ──────────────────────────────────────────
     SIMULATE LOADING
  ────────────────────────────────────────── */
  const loadBoard = () => {
    state.isLoading = true;
    render();

    // Simulate async fetch with 800ms delay
    setTimeout(() => {
      state.board     = clone(BOARD_DATA.board);
      state.isLoading = false;
      render();
    }, 800);
  };

  /* ──────────────────────────────────────────
     PUBLIC API
  ────────────────────────────────────────── */
  const init = (container) => {
    rootEl = container;
    loadBoard();
  };

  return { init };
})();
