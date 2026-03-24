# Implementation Notes: Board Kanban

**Data**: 2026-03-24
**Autor**: Claude (figma-to-code agent)
**Status**: Completo

---

## 1. Como Rodar o Projeto

```bash
# No diretório do worktree:
cd /private/var/folders/8x/xw49g0r57t3dbld3md376y7w0000gp/T/fusion-worktrees/run-38-1774382862296

# Instalar dependências (se necessário):
npm install

# Rodar em desenvolvimento:
npm run dev
```

Ou usar o projeto principal em:
```bash
cd /Users/user/fusion-projects/project-teste-lucas-local-2/react-hello-2
npm run dev
```

---

## 2. Estrutura de Arquivos Criados

```
src/
  components/
    board/
      BoardPage.tsx       ← componente raiz da tela, gerencia todo o estado
      BoardHeader.tsx     ← header com logo "Task View", search, bell, avatar
      BoardSidebar.tsx    ← sidebar 224px com Home/Notificação/Tarefas/Analytics
      KanbanColumn.tsx    ← coluna com header (dot, título, contador, +Add, ...)
      KanbanCard.tsx      ← card com tags, título, descrição, meta, avatares
      AddCardButton.tsx   ← botão "+ Add a card" no rodapé da coluna
    ui/
      Avatar.tsx          ← Avatar individual + AvatarGroup com -space-x overlap
      Badge.tsx           ← badge colorida (red/yellow/green/blue)
      Button.tsx          ← botão genérico com variantes primary/ghost/outline
  types/
    board.types.ts        ← interfaces TypeScript: Card, Column, Board, Member, Tag
  data/
    mockData.ts           ← 24 cards distribuídos em 3 colunas (10/8/6)
  App.tsx                 ← renderiza <BoardPage />
  main.tsx                ← entry point React + Tailwind
  index.css               ← @tailwind + Google Fonts Inter + custom vars
```

---

## 3. Decisões de Implementação

### 3.1 Estado Local (useState)
Optei por `useState` em vez de Zustand para manter o componente auto-suficiente neste worktree. O estado principal (`Board`) é gerenciado em `BoardPage.tsx` e passado via props. Para produção, migrar para Zustand conforme a spec.

### 3.2 Sem DnD nesta iteração
O `@dnd-kit` está disponível no package.json original, mas não foi incluído neste worktree para evitar dependências extras. A estrutura de dados suporta drag-and-drop: cada `Card` tem `columnId` e a função `handleMoveCard` pode ser implementada facilmente.

### 3.3 Filtros implementados
- **Aba "Todos"**: mostra todas as 3 colunas
- **Aba "Pendentes"**: mostra apenas a coluna `pendentes`
- **Aba "Concluídas"**: mostra apenas a coluna `concluidas`
- **Search**: filtra cards por título e descrição em tempo real (case-insensitive)

### 3.4 Modais inline
Os modais de Add/Edit/Delete foram implementados diretamente em `BoardPage.tsx` para simplicidade. A spec prevê componentes separados (`AddCardModal`, `EditCardModal`, `DeleteCardModal`) que podem ser extraídos facilmente.

### 3.5 Design tokens
Extraídos do Figma e da spec:
- Primary: `#7F56D9`
- Colunas: Purple (Backlog), Orange (Pendentes), Green (Concluídas)
- Cards: branco, sombra `0 1px 3px rgba(0,0,0,0.08)`, border-radius 8px
- Sidebar: 224px, border-right 1px `#E8EAED`
- Header: 76px, branco, border-bottom

### 3.6 Acessibilidade
- `role="tablist"` / `aria-selected` nos filtros
- `role="list"` / `role="listitem"` nas colunas
- `aria-label` em todos os botões de ícone
- `aria-modal` + `role="dialog"` nos modais
- `focus-visible` via Tailwind

---

## 4. Componentes e Responsabilidades

| Componente | Responsabilidade |
|---|---|
| `BoardPage` | Estado global, filtros, modais, layout raiz |
| `BoardHeader` | Logo, search input, bell icon, user avatar |
| `BoardSidebar` | Nav items com estado ativo |
| `KanbanColumn` | Header da coluna, lista scrollável de cards |
| `KanbanCard` | Renderização do card com todos os metadados |
| `AddCardButton` | Botão dashed para adicionar card |
| `Avatar` | Avatar individual com iniciais e cor |
| `AvatarGroup` | Grupo com overlap e contador "+N" |
| `Badge` | Pill colorida de tag/label |
| `Button` | Botão reutilizável com variantes |

---

## 5. Mock Data

24 cards distribuídos:
- **Backlog**: 10 cards (Customer Support Expert, Design System, API Integration...)
- **Pendentes**: 8 cards (UI Component Library, Kanban Board, Security Audit...)
- **Concluídas**: 6 cards (Project Setup, CI/CD Pipeline, Database Schema...)

6 membros mock com cores distintas: Ana Silva, Bruno Costa, Carla Dias, Diego Santos, Elena Rocha, Felipe Lima.
