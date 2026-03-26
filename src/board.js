/**
 * board.js
 * Trello-like board interactivity
 * - Drag and drop cards between columns
 * - Add card modal
 * - Add list functionality
 */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Drag and Drop
     ------------------------------------------------------------------------- */
  let draggedCard = null;

  function initDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.column-cards');

    cards.forEach(function (card) {
      card.setAttribute('draggable', 'true');

      card.addEventListener('dragstart', function (e) {
        draggedCard = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', card.id || '');
      });

      card.addEventListener('dragend', function () {
        card.classList.remove('dragging');
        draggedCard = null;
        columns.forEach(function (col) {
          col.classList.remove('drag-over');
        });
      });
    });

    columns.forEach(function (column) {
      column.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        column.classList.add('drag-over');

        var afterElement = getDragAfterElement(column, e.clientY);
        if (draggedCard) {
          if (afterElement == null) {
            column.appendChild(draggedCard);
          } else {
            column.insertBefore(draggedCard, afterElement);
          }
        }
      });

      column.addEventListener('dragleave', function (e) {
        if (!column.contains(e.relatedTarget)) {
          column.classList.remove('drag-over');
        }
      });

      column.addEventListener('drop', function (e) {
        e.preventDefault();
        column.classList.remove('drag-over');
        updateColumnCounts();
      });
    });
  }

  function getDragAfterElement(container, y) {
    var draggableElements = Array.from(
      container.querySelectorAll('.card:not(.dragging)')
    );

    return draggableElements.reduce(
      function (closest, child) {
        var box = child.getBoundingClientRect();
        var offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  /* -------------------------------------------------------------------------
     Column counts
     ------------------------------------------------------------------------- */
  function updateColumnCounts() {
    var columns = document.querySelectorAll('.board-column');
    columns.forEach(function (column) {
      var cardCount = column.querySelectorAll('.card').length;
      var countEl = column.querySelector('.column-count');
      if (countEl) {
        countEl.textContent = cardCount;
      }
    });
  }

  /* -------------------------------------------------------------------------
     Add Card
     ------------------------------------------------------------------------- */
  function initAddCardButtons() {
    var addBtns = document.querySelectorAll('.column-add-btn');
    addBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var column = btn.closest('.board-column');
        openAddCardModal(column);
      });
    });
  }

  function openAddCardModal(column) {
    var columnTitle = column.querySelector('.column-title');
    var columnName = columnTitle ? columnTitle.textContent : 'Coluna';

    var modal = document.getElementById('add-card-modal');
    var modalTitle = document.getElementById('modal-column-name');
    if (modalTitle) {
      modalTitle.textContent = columnName;
    }

    if (modal) {
      modal.classList.add('open');
      modal.dataset.targetColumn = column.id || '';
    }
  }

  function initModal() {
    var modal = document.getElementById('add-card-modal');
    if (!modal) return;

    var closeBtn = modal.querySelector('.modal-close');
    var cancelBtn = modal.querySelector('.modal-cancel-btn');
    var form = modal.querySelector('#add-card-form');

    function closeModal() {
      modal.classList.remove('open');
      if (form) form.reset();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var titleInput = form.querySelector('#card-title-input');
        var title = titleInput ? titleInput.value.trim() : '';
        if (!title) return;

        var targetColumnId = modal.dataset.targetColumn;
        var targetColumn = targetColumnId
          ? document.getElementById(targetColumnId)
          : document.querySelector('.board-column');

        if (targetColumn) {
          var cardsContainer = targetColumn.querySelector('.column-cards');
          var newCard = createCardElement(title);
          cardsContainer.appendChild(newCard);

          // Re-init drag on new card
          initCardDrag(newCard);
          updateColumnCounts();
        }

        closeModal();
      });
    }
  }

  function createCardElement(title) {
    var card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('draggable', 'true');
    card.innerHTML =
      '<div class="card-body">' +
      '<h3 class="card-title">' + escapeHtml(title) + '</h3>' +
      '</div>' +
      '<div class="card-footer">' +
      '<div class="card-footer-left">' +
      '<span class="card-meta-item">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1v4M11 1v4M2 7h12"/></svg>' +
      'Hoje' +
      '</span>' +
      '</div>' +
      '</div>';
    return card;
  }

  function initCardDrag(card) {
    card.setAttribute('draggable', 'true');

    card.addEventListener('dragstart', function (e) {
      draggedCard = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', function () {
      card.classList.remove('dragging');
      draggedCard = null;
      document.querySelectorAll('.column-cards').forEach(function (col) {
        col.classList.remove('drag-over');
      });
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* -------------------------------------------------------------------------
     Add Column
     ------------------------------------------------------------------------- */
  function initAddColumnButton() {
    var btn = document.querySelector('.add-column-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var columnName = prompt('Nome da nova coluna:');
      if (!columnName || !columnName.trim()) return;

      var board = document.querySelector('.board-kanban');
      var newColumn = createColumnElement(columnName.trim());
      board.insertBefore(newColumn, btn);

      // Re-init drag for new column
      var newCardsContainer = newColumn.querySelector('.column-cards');
      initColumnDragEvents(newCardsContainer);
      initAddCardButtons();
    });
  }

  function createColumnElement(title) {
    var id = 'col-' + Date.now();
    var col = document.createElement('section');
    col.className = 'board-column';
    col.id = id;
    col.innerHTML =
      '<div class="column-header">' +
      '<div class="column-header-left">' +
      '<svg class="column-header-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/></svg>' +
      '<span class="column-title">' + escapeHtml(title) + '</span>' +
      '<span class="column-count">0</span>' +
      '</div>' +
      '<div class="column-header-actions">' +
      '<button class="column-action-btn" title="Adicionar card">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10"/></svg>' +
      '</button>' +
      '<button class="column-action-btn" title="Mais opções">' +
      '<svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3.5" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="8" cy="12.5" r="1.25"/></svg>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="column-cards"></div>' +
      '<button class="column-add-btn">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10"/></svg>' +
      'Adicionar card' +
      '</button>';
    return col;
  }

  function initColumnDragEvents(column) {
    column.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      column.classList.add('drag-over');

      var afterElement = getDragAfterElement(column, e.clientY);
      if (draggedCard) {
        if (afterElement == null) {
          column.appendChild(draggedCard);
        } else {
          column.insertBefore(draggedCard, afterElement);
        }
      }
    });

    column.addEventListener('dragleave', function (e) {
      if (!column.contains(e.relatedTarget)) {
        column.classList.remove('drag-over');
      }
    });

    column.addEventListener('drop', function (e) {
      e.preventDefault();
      column.classList.remove('drag-over');
      updateColumnCounts();
    });
  }

  /* -------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initDragAndDrop();
    initAddCardButtons();
    initModal();
    initAddColumnButton();
  });
})();
