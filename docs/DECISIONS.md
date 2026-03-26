# Architectural Decisions

## 2026-03-26 — Arquivo HTML auto-contido para reports/board.html

**Decisao:** Gerar um unico arquivo `reports/board.html` com CSS e JS inline (sem arquivos externos referenciados), exceto Google Fonts via CDN.

**Razao:** A instrucao pede explicitamente um arquivo HTML completo e auto-contido. Isso facilita portabilidade, visualizacao direta no browser sem servidor, e simplicidade de entrega para o pipeline de auditoria (Figma Audit).

---

## 2026-03-26 — JavaScript Vanilla com IIFE modular

**Decisao:** Usar JavaScript Vanilla encapsulado em IIFE (Immediately Invoked Function Expression) com modulo BoardApp.

**Razao:** Sem necessidade de bundler/transpiler. O design nao exige framework. O padrao IIFE evita poluicao do escopo global e mantem o codigo organizado e testavel.

---

## 2026-03-26 — Drag & Drop HTML5 nativo

**Decisao:** Usar a API nativa de Drag & Drop do HTML5 (draggable, dragstart, dragover, drop).

**Razao:** Sem dependencias externas. Suporte nativo em todos os browsers modernos. Suficiente para o caso de uso de mover cards entre colunas.

---

## 2026-03-26 — Design tokens como CSS custom properties

**Decisao:** Todas as cores, tamanhos e espacamentos sao definidos como CSS custom properties no :root.

**Razao:** Permite reutilizacao consistente dos valores do Figma, facilita manutencao e theming futuro.
