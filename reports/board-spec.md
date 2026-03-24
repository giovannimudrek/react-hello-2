# Especificação Técnica: Tela de Board (Kanban - Trello)

**Data**: 2026-03-24
**Versão**: 1.0
**Status**: Especificação Técnica Completa
**Figma**: [Ferramenta Trello](https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7) | Node ID: `1:2` (Frame 1)

---

## 1. Resumo Executivo

A tela de Board é uma aplicação de gerenciamento de tarefas no modelo Kanban (estilo Trello), construída com React 18, TypeScript e Tailwind CSS. A interface permite visualizar, criar, editar e mover tarefas entre colunas (Backlog → Pendentes → Concluídas), com suporte a busca, filtros, assignees, prioridades, labels, e drag-and-drop interativo.

**Componentes principais**:
- **Header** (76px): Logotipo, pesquisa, notificações, avatar do usuário
- **Sidebar** (224px): Menu de navegação com Home, Notificações, Tarefas, Analytics
- **Área de Conteúdo**: Três colunas Kanban (Backlog, Pendentes, Concluídas)
- **Cards**: Elementos arrastáveis com title, descrição, data, subtasks, tags, assignees, attachments, comments

---

## 2. Contexto e Objetivos

### 2.1 Por que essa tela existe

O Board resolve a necessidade de gerenciar tarefas em equipes através de um modelo visual e intuitivo inspirado em ferramentas populares como Trello. Os objetivos são:

1. **Visualizar status** de tarefas em tempo real (3 colunas: Backlog, Pendentes, Concluídas)
2. **Organizar trabalho** através de drag-and-drop entre colunas
3. **Colaborar** em equipe com assignees, comentários e attachments
4. **Priorizar** tarefas com labels de urgência/importância
5. **Rastrear progresso** com subtasks e datas de vencimento

### 2.2 Problema que resolve

Gestão manual/caótica de tarefas → Visualização clara e organização eficiente via board visual

---

## 3. Requisitos Funcionais

### 3.1 Visualização do Board

- **RF-001**: Exibir 3 colunas horizontais (Backlog, Pendentes, Concluídas)
- **RF-002**: Cada coluna mostra título + contador de tarefas (ex: "Backlog 10 tarefas")
- **RF-003**: Cada coluna possui botão "+Add" no header para criar nova tarefa
- **RF-004**: Cards exibem: título, descrição, data, badges de priority, assignees, subtasks, attachments, comments
- **RF-005**: Cards são arrastáveis entre colunas via @dnd-kit
- **RF-006**: Visualizar contador de tarefas atualizado em tempo real ao mover cards

### 3.2 Navegação e Filtros

- **RF-007**: Header com logo, campo de busca, notificações, avatar (menu dropdown)
- **RF-008**: Sidebar com menu: Home, Notificações, Tarefas, Analytics
- **RF-009**: Abas de filtro (Todos, Pendentes, Concluídas) — filtra cards por status
- **RF-010**: Campo de busca em tempo real (busca por título/descrição de cards)
- **RF-011**: Avatar group com +N indicator (ex: +5 assignees ocultos)

### 3.3 Operações CRUD

- **RF-012**: Criar card: botão "+Add" abre modal com campos (título, descrição, data, assignees, tags)
- **RF-013**: Editar card: clique no card abre modal com dados preenchidos
- **RF-014**: Deletar card: confirma via modal "Tem certeza?" antes de remover
- **RF-015**: Mover card: drag-and-drop entre colunas atualiza status

### 3.4 Dados e Metadados

- **RF-016**: Cada card armazena: id, title, description, dueDate, subtasks[], tags[], assignees[], attachmentCount, commentCount
- **RF-017**: Subtasks mostram progresso (ex: "4/12")
- **RF-018**: Tags/Labels com cores variadas (Urgente=red, Interno=yellow, Feature=green)
- **RF-019**: Assignees exibidos como avatares circulares com iniciais ou foto
- **RF-020**: Attachments e Comments com ícones + contadores

### 3.5 Estado e Persistência

- **RF-021**: State management via Zustand (boardStore + uiStore)
- **RF-022**: Cache de dados via TanStack Query (react-query)
- **RF-023**: Chamadas API para CRUD: GET /api/columns, GET /api/tasks, POST/PUT/DELETE /api/tasks
- **RF-024**: Otimistic updates: atualizar UI antes da resposta da API

### 3.6 Acessibilidade

- **RF-025**: ARIA labels em botões, inputs, abas, modals
- **RF-026**: Navegação via teclado (Tab, Arrow, Enter, Escape)
- **RF-027**: Focus visible e color contrast WCAG AA
- **RF-028**: Alt text em avatares e ícones

---

## 4. Regras de Negócio

### 4.1 Coluna e Status

- **RN-001**: Coluna "Backlog" = tarefas não iniciadas
- **RN-002**: Coluna "Pendentes" = tarefas em progresso
- **RN-003**: Coluna "Concluídas" = tarefas finalizadas
- **RN-004**: Mover card entre colunas altera status automaticamente
- **RN-005**: Contador de tasks na coluna atualiza em tempo real

### 4.2 Assignees

- **RN-006**: Card pode ter 0 a N assignees
- **RN-007**: Avatares mostram até 4 assignees; 5+ exibe "+N" com contagem
- **RN-008**: Clicar "+N" abre dropdown/modal mostrando todos

### 4.3 Tags/Labels

- **RN-009**: Cada card pode ter 0 a N tags
- **RN-010**: Tags têm cores semanticamente significativas:
  - "Urgente" = vermelho (#D92D20)
  - "Interno" = amarelo/laranja (#DC6803)
  - "Feature" ou "Interna" = verde (#039855)
- **RN-011**: Tags são clicáveis = filtram board por label

### 4.4 Subtasks

- **RN-012**: Exibe como "4/12" (completadas/total)
- **RN-013**: Clique em subtask abre detalhes em modal (editar, marcar como completo)
- **RN-014**: Card com subtask 100% pode ter badge visual

### 4.5 Datas

- **RN-015**: DueDate exibe em formato "DD Mon. YYYY" (ex: "4 Mar. 2026")
- **RN-016**: Cards com data passada = highlight vermelho ou warning visual
- **RN-017**: Cards próximos ao vencimento (7 dias) = highlight amarelo

### 4.6 Busca e Filtros

- **RN-018**: Busca é case-insensitive
- **RN-019**: Busca funciona em título + descrição dos cards
- **RN-020**: Filtro de abas (Todos/Pendentes/Concluídas) é OR logic com busca (E)
- **RN-021**: Limpar busca reset para estado padrão

### 4.7 Drag and Drop

- **RN-022**: Cards só podem ser movidos entre colunas válidas
- **RN-023**: Drop inválido = card retorna à coluna original (rollback visual)
- **RN-024**: Reorder dentro da mesma coluna = mantém ordem de prioridade (future)
- **RN-025**: Auto-scroll quando arrastar perto das bordas

---

## 5. Interface e UX

### 5.1 Layout Geral

```
┌─────────────────────────────────────────┐
│         Header (76px, branco)           │
├────────────┬──────────────────────────┤
│  Sidebar   │     Área de Conteúdo     │
│ (224px)    │  (Board + Columns)       │
│            │                          │
│  - Home    │  ┌──────────────┐        │
│  - Notif   │  │ Todos | Pend | Conc  │
│  - Tarefas │  │ [search]     │        │
│  - Analytics│ │              │        │
│            │  │ Backlog   |  │        │
│            │  │ [Cards]   |  │        │
│            │  └──────────────┘        │
└────────────┴──────────────────────────┘
```

### 5.2 Header (76px)

**Componentes**:
- **Logo/Brand** (esq): "Task View" com ícone roxa (#7F56D9)
- **Search** (centro): input placeholder "Pesquise suas tarefas", ícone lupa
- **Notificações** (dir): ícone bell, sem badge (grey)
- **Avatar** (dir): círculo com iniciais "DS", cor background roxa

**Layout**: Horizontal, space-between, padding 32px, altura hug

### 5.3 Sidebar (224px)

**Componentes**:
- **Menu items**: Home, Notificação, Tarefas, Analytics
- **Style**: Vertical list, padding 32px left, 20px top
- **Borders**: Right border 1px grey (#E8EAED)
- **Font**: Inter 14px, weight 500
- **Interaction**: Hover = background light grey, click = highlight active item

### 5.4 Área de Conteúdo

#### 5.4.1 Filter Tabs
- 3 botões: "Todos", "Pendentes", "Concluídas"
- **Ativo**: Background #7F56D9 (purple), text branco
- **Inativo**: Background white, text grey, border subtle
- **Spacing**: 10px entre abas

#### 5.4.2 Search Input
- Placeholder: "Pesquise suas tarefas"
- Icon: lupa cinza
- Border: 1px grey
- Height: 40px
- Border-radius: 8px
- Padding: 10px 16px

#### 5.4.3 Avatar Group
- Exibe up to 4 avatares com -10px overlap
- Cada avatar: círculo 40px, border 2px white
- +5 indicator: círculo cinzento com "+5" centrado

#### 5.4.4 Colunas Kanban

Cada coluna (Backlog, Pendentes, Concluídas) tem:

**Header**:
- Título + contador (ex: "Backlog 10 tarefas")
- Botão "+Add" (círculo purple, ícone +)
- Ações (menu "..." com opções)

**Conteúdo**:
- Lista scrollável de cards
- Min height: 600px, max scrollable
- Background: light grey (#F9FAFB)
- Padding: 16px

**Card**:
- Width: 100% (preenchimento coluna)
- Background: white
- Border-radius: 8px
- Shadow: 0 1px 3px rgba(0,0,0,0.08)
- Padding: 16px
- Border: 1px light grey
- Draggable: yes

**Card Anatomy**:
```
┌─────────────────────────────────────┐
│ [Urgente] [Interno] [Feature]  ... │
│                                   │
│ Customer Support Expert            │
│ Lorem ipsum dolor sit amet...     │
│                                   │
│ 📅 4 Mar. 2026    [4/12]           │
│ 👥 [Avatar][Avatar][Avatar] [+1]  │
│ 📎 8  💬 8                         │
└─────────────────────────────────────┘
```

**Card Elements** (top to bottom):
1. **Tags/Badges**: Cor-coded pills (red/orange/green)
2. **More menu**: "..." (3-dot button)
3. **Title**: Bold, 16px, Inter 600
4. **Description**: Grey text, 14px, Inter 400
5. **Meta row 1**: Calendar icon + date (14px), Subtask progress (14px right)
6. **Meta row 2**: Assignee avatars, Attachment count, Comment count

### 5.5 Estados de UX

#### 5.5.1 Loading
- Skeleton screens para cards
- Spinner no centro da coluna

#### 5.5.2 Empty State
- "Nenhuma tarefa" mensagem centrada
- Icon placeholder
- Botão "Criar tarefa"

#### 5.5.3 Error State
- Toast notification: "Erro ao carregar tarefas"
- Retry button
- Cards mantêm dados anteriores (graceful degradation)

#### 5.5.4 Drag Over
- Card sendo arrastado: opacity 0.5, rotação leve +2deg
- Drop zone: background highlight (#F3F4F6)
- Overlay com preview visual

#### 5.5.5 Success State
- Toast: "Tarefa movida com sucesso"
- Counter atualizado
- Transição suave (300ms)

### 5.6 Modais

#### 5.6.1 Add/Edit Card Modal

**Campos**:
- Título (text input, obrigatório)
- Descrição (textarea)
- Due Date (date picker)
- Assignees (multi-select dropdown)
- Tags (multi-select chips)
- Subtasks (adicionar/editar lista)

**Botões**: Cancel, Save

#### 5.6.2 Delete Confirmation Modal

**Conteúdo**: "Tem certeza que deseja deletar esta tarefa?"

**Botões**: Cancel, Delete (red)

#### 5.6.3 More Menu (Card ...)

**Opções**:
- Editar
- Deletar
- Copiar (future)
- Arquivar (future)

---

## 6. Design Tokens (Figma)

### 6.1 Paleta de Cores

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| Primary | #7F56D9 | (127, 86, 217) | Botões, badges ativas, links |
| Dark BG | #0A0D12 | (10, 13, 18) | Backgrounds dark (future theme) |
| White | #FFFFFF | (255, 255, 255) | Card background, Header |
| Border Light | #E8EAED | (232, 234, 237) | Borders, dividers |
| Text Dark | #1F2937 | (31, 41, 55) | Títulos, text primário |
| Text Grey | #6B7280 | (107, 114, 128) | Descrições, text secundário |
| Urgente/Red | #D92D20 | (217, 45, 32) | Badges "Urgente", warning |
| Interno/Orange | #DC6803 | (220, 104, 3) | Badges "Interno" |
| Feature/Green | #039855 | (3, 152, 85) | Badges "Feature", success |
| BG Light Grey | #F9FAFB | (249, 250, 251) | Column background |
| Hover Grey | #F3F4F6 | (243, 244, 246) | Hover states |
| Blue | #0086C9 | (0, 134, 201) | Future: info color |

### 6.2 Tipografia

| Elemento | Font | Weight | Size | Line Height | Letter Spacing |
|----------|------|--------|------|-------------|-----------------|
| Header Title | Inter | 600 | 20px | 28px | -0.4px |
| Card Title | Inter | 600 | 16px | 24px | 0px |
| Card Desc | Inter | 400 | 14px | 20px | 0.25px |
| Label/Badge | Inter | 500 | 12px | 16px | 0.5px |
| Sidebar Item | Inter | 500 | 14px | 20px | 0.25px |
| Input Placeholder | Inter | 400 | 14px | 20px | 0.25px |

### 6.3 Espaçamento

| Token | Value | Uso |
|-------|-------|-----|
| xs | 4px | Micro spacing |
| sm | 8px | Component padding |
| md | 16px | Container padding, spacing |
| lg | 24px | Section margin |
| xl | 32px | Header/Sidebar padding |

### 6.4 Border Radius

| Token | Value | Uso |
|-------|-------|-----|
| sm | 4px | Small UI elements |
| md | 8px | Cards, buttons, inputs |
| full | 9999px | Avatars, circles |

### 6.5 Shadows

| Token | Value | Uso |
|-------|-------|-----|
| card | 0 1px 3px rgba(0,0,0,0.08) | Cards no board |
| hover | 0 4px 6px rgba(0,0,0,0.1) | Hover state |
| modal | 0 20px 25px rgba(0,0,0,0.15) | Modals |

---

## 7. Estrutura de Componentes

### 7.1 Árvore de Componentes

```
App
├── Header
│   ├── Logo
│   ├── SearchInput
│   ├── NotificationBell
│   └── AvatarMenu
│
├── Sidebar
│   ├── SidebarItem (Home)
│   ├── SidebarItem (Notificação)
│   ├── SidebarItem (Tarefas)
│   └── SidebarItem (Analytics)
│
└── BoardingPage / BoardContainer
    ├── FilterTabs
    │   ├── TabButton (Todos)
    │   ├── TabButton (Pendentes)
    │   └── TabButton (Concluídas)
    │
    ├── SearchInput
    ├── AvatarGroup
    │
    └── KanbanBoard (DnD Container)
        ├── Column (Backlog)
        │   ├── ColumnHeader
        │   │   ├── Title + Counter
        │   │   ├── AddButton
        │   │   └── MoreMenu
        │   └── CardList
        │       ├── Card
        │       │   ├── TagBadges
        │       │   ├── MoreMenu
        │       │   ├── Title
        │       │   ├── Description
        │       │   ├── MetaRow (date, subtasks)
        │       │   ├── AssigneeAvatars
        │       │   ├── AttachmentIcon + Count
        │       │   └── CommentIcon + Count
        │       └── DragOverlay
        │
        ├── Column (Pendentes) [same structure]
        └── Column (Concluídas) [same structure]

Modals (Lazy loaded via Suspense):
├── AddCardModal
├── EditCardModal
└── DeleteCardModal
```

### 7.2 Props Interface Definitions

```typescript
// Card
interface Card {
  id: string;
  title: string;
  description: string;
  dueDate: string; // "4 Mar. 2026"
  subtasks: { completed: number; total: number };
  tags: Tag[];
  assignees: string[]; // member IDs
  attachmentCount: number;
  commentCount: number;
  columnId?: string; // Kanban status
}

// Tag
interface Tag {
  id: string;
  label: string;
  variant: 'red' | 'yellow' | 'green';
}

// Member
interface Member {
  id: string;
  name: string;
  initials: string;
  color: string; // hex
}

// Column
interface Column {
  id: string;
  name: string;
  taskCount: number;
  cards: Card[];
}

// Board
interface Board {
  id: string;
  name: string;
  columns: Column[];
  members: Member[];
}
```

### 7.3 Arquivos de Componentes a Criar/Atualizar

```
src/
├── components/
│   ├── Board/
│   │   ├── BoardLayout.tsx (new - layout principal)
│   │   ├── KanbanBoard.tsx (exists)
│   │   ├── Column.tsx (exists)
│   │   ├── Card.tsx (exists)
│   │   └── DragOverlay.tsx (new)
│   │
│   ├── Header/
│   │   ├── Header.tsx (exists)
│   │   ├── SearchInput.tsx (new)
│   │   ├── NotificationBell.tsx (new)
│   │   └── AvatarMenu.tsx (new)
│   │
│   ├── Sidebar/
│   │   ├── Sidebar.tsx (exists)
│   │   └── SidebarItem.tsx (new)
│   │
│   ├── FilterTabs/
│   │   ├── FilterTabs.tsx (exists)
│   │   └── TabButton.tsx (new)
│   │
│   ├── Modals/
│   │   ├── AddCardModal.tsx (exists)
│   │   ├── EditCardModal.tsx (exists)
│   │   ├── DeleteCardModal.tsx (exists)
│   │   └── ConfirmDialog.tsx (new)
│   │
│   ├── Common/
│   │   ├── Avatar.tsx (new)
│   │   ├── AvatarGroup.tsx (new)
│   │   ├── Badge.tsx (new)
│   │   ├── IconButton.tsx (new)
│   │   ├── Button.tsx (new)
│   │   ├── Input.tsx (new)
│   │   └── Tag.tsx (new)
│   │
│   └── Loading/
│       ├── Skeleton.tsx (new)
│       └── Spinner.tsx (new)
│
├── hooks/
│   ├── useBoardData.ts (new - TanStack Query)
│   ├── useDragDrop.ts (new - @dnd-kit logic)
│   ├── useSearch.ts (new - search filter)
│   └── useModal.ts (new - modal state)
│
├── store/
│   ├── boardStore.ts (exists)
│   └── uiStore.ts (new - modal, sidebar state)
│
├── api/
│   ├── client.ts (new - HTTP client)
│   ├── taskApi.ts (new - API queries)
│   ├── types.ts (new - API types)
│   └── mock.ts (new - mock server)
│
├── types/
│   ├── index.ts (exists, atualizar)
│   ├── board.ts (new)
│   └── api.ts (new)
│
├── utils/
│   ├── colors.ts (new - color mapping)
│   ├── date.ts (new - date formatting)
│   └── cn.ts (new - class name helper)
│
├── styles/
│   ├── globals.css (exists)
│   └── animations.css (new - drag animations)
│
├── App.tsx (update)
└── main.tsx (exists)
```

---

## 8. Stack Tecnológico

### 8.1 Dependências Principais

| Pacote | Versão | Propósito |
|--------|--------|----------|
| React | ^18.3.0 | UI framework |
| React DOM | ^18.3.0 | DOM rendering |
| TypeScript | ^5.3.0 | Type safety |
| Tailwind CSS | ^3.4.0 | Utility-first CSS |
| Zustand | ^4.4.0 | State management |
| @dnd-kit/core | ^6.3.1 | Drag & drop (accessible) |
| @dnd-kit/sortable | ^8.0.0 | Sortable drag & drop |
| @dnd-kit/utilities | ^3.2.2 | DnD utilities |
| clsx | ^2.0.0 | Conditional classnames |
| @tanstack/react-query | (add) | Data fetching & caching |
| axios | (add) | HTTP client |

### 8.2 Dev Dependencies

| Pacote | Versão | Propósito |
|--------|--------|----------|
| Vite | ^5.0.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | Vite React plugin |
| Tailwind CSS | ^3.4.0 | CSS framework |
| PostCSS | ^8.4.0 | CSS processor |
| Autoprefixer | ^10.4.0 | CSS prefixer |
| ESLint | (add) | Linting |
| Prettier | (add) | Code formatting |
| Vitest | (add) | Unit testing |
| @testing-library/react | (add) | Component testing |

### 8.3 Configurações

**Vite** (`vite.config.ts`):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

**Tailwind** (`tailwind.config.js`):
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7F56D9',
        urgent: '#D92D20',
        internal: '#DC6803',
        feature: '#039855',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
      },
    }
  }
}
```

**TypeScript** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 9. Fluxo de Dados

### 9.1 State Management (Zustand)

**boardStore.ts** (centraliza board state):
```typescript
type BoardStore = {
  // State
  board: Board | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterTab: 'all' | 'pendentes' | 'concluidas';

  // Actions
  fetchBoard: () => Promise<void>;
  addCard: (card: Card) => Promise<void>;
  updateCard: (id: string, card: Partial<Card>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  moveCard: (cardId: string, targetColumnId: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilterTab: (tab: FilterTab) => void;
};
```

**uiStore.ts** (UI state: modais, sidebar):
```typescript
type UIStore = {
  // Modals
  modals: {
    addCard: boolean;
    editCard: boolean;
    deleteCard: boolean;
    selectedCardId?: string;
  };

  // Actions
  openAddCardModal: () => void;
  closeAddCardModal: () => void;
  openEditCardModal: (cardId: string) => void;
  closeEditCardModal: () => void;
  openDeleteCardModal: (cardId: string) => void;
  closeDeleteCardModal: () => void;
};
```

### 9.2 Data Fetching (TanStack Query)

**useQuery** para GET:
```typescript
const { data: board, isLoading } = useQuery({
  queryKey: ['board'],
  queryFn: () => api.getBoard(),
  staleTime: 1000 * 60 * 5, // 5 min cache
});
```

**useMutation** para POST/PUT/DELETE:
```typescript
const mutation = useMutation({
  mutationFn: (card: Card) => api.createCard(card),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['board'] });
  }
});
```

### 9.3 Fluxo de Drag & Drop (@dnd-kit)

```
User drags Card
  ↓
@dnd-kit Sensor (5px threshold)
  ↓
DragOverlay renders preview
  ↓
User hovers over Column
  ↓
Column highlight active
  ↓
User drops Card
  ↓
@dnd-kit collects active/over IDs
  ↓
moveCard(cardId, targetColumnId) called
  ↓
Optimistic update in Zustand
  ↓
API call POST /api/tasks/:id/column
  ↓
On success: invalidate cache
On error: rollback UI
```

### 9.4 Fluxo de Busca

```
User tipos no SearchInput
  ↓
Input onChange → setSearchQuery(query)
  ↓
Zustand store atualiza searchQuery
  ↓
KanbanBoard component subscreve store
  ↓
useMemo filtra cards por título/descrição
  ↓
Re-render apenas cards que match
```

---

## 10. Comportamentos Interativos

### 10.1 Drag & Drop

**Drag Initiation**:
- PointerSensor com activationConstraint: 5px
- Previne drag acidental

**During Drag**:
- Card original: opacity 0.5, rotação +2deg
- DragOverlay mostra preview com shadow
- Over columns: background highlight #F3F4F6

**Drop**:
- Valid drop: moveCard() API call, spinner curto
- Invalid drop: card volta com transição 300ms
- Success toast: "Tarefa movida"

### 10.2 Modal Workflows

**Add Card Modal**:
1. Clique em "+Add" na coluna
2. Modal abre com campos vazios
3. User preenche title (obrigatório), descrição, data, assignees, tags
4. Clique em "Save"
5. useMutation chama POST /api/tasks
6. On success: modal fecha, toast exibe, coluna atualiza

**Edit Card Modal**:
1. Clique em card
2. Modal abre com dados preenchidos
3. User edita campos
4. Clique em "Save"
5. useMutation chama PUT /api/tasks/:id
6. On success: modal fecha, card atualiza em-place

**Delete Confirmation**:
1. Clique "..." em card → "Delete"
2. Modal: "Tem certeza?"
3. Clique em "Delete"
4. useMutation chama DELETE /api/tasks/:id
5. On success: card remove da coluna com fade-out

### 10.3 Search & Filter

**Search**:
1. User digita no input de busca
2. onChange dispara setSearchQuery
3. useMemo filtra cards em tempo real
4. Cards não-matching ficam hidden (className)

**Tab Filter**:
1. Clique em tab (Todos, Pendentes, Concluídas)
2. setFilterTab atualiza store
3. Cards filtram por columnId (backend) ou client-side

### 10.4 Pagination (Future)

Para boards com 100+ tasks:
- Infinite scroll com Intersection Observer
- ou Pagination com "Load more" button

---

## 11. Critérios de Aceitação

- [ ] **CA-001**: Header exibe logo, search, notificações, avatar com 76px height
- [ ] **CA-002**: Sidebar exibe 4 menu items (Home, Notif, Tarefas, Analytics) com 224px width
- [ ] **CA-003**: 3 colunas Kanban visíveis (Backlog, Pendentes, Concluídas) com cards
- [ ] **CA-004**: Cada card exibe: título, descrição, data, tags, assignees, subtasks, attachments, comments
- [ ] **CA-005**: Filter tabs (Todos, Pendentes, Concluídas) filtram cards corretamente
- [ ] **CA-006**: Search input filtra cards por título/descrição em tempo real
- [ ] **CA-007**: Cards são arrastáveis entre colunas via @dnd-kit
- [ ] **CA-008**: Mover card atualiza coluna e contador em tempo real
- [ ] **CA-009**: Clique em "+Add" abre modal com campos (title, desc, date, assignees, tags)
- [ ] **CA-010**: Clique em card abre modal de edição com dados preenchidos
- [ ] **CA-011**: Clique em "..." → "Delete" abre confirmação antes de deletar
- [ ] **CA-012**: Deletar card remove-o da coluna com animação fade-out
- [ ] **CA-013**: API calls: GET /api/board, POST/PUT/DELETE /api/tasks funcionam
- [ ] **CA-014**: Optimistic updates: UI atualiza antes da resposta API
- [ ] **CA-015**: Error handling: toast notifica erro, card rollback em caso de falha
- [ ] **CA-016**: Avatar group mostra até 4 avatares + "+N" indicator
- [ ] **CA-017**: Tags exibem com cores corretas (red/orange/green)
- [ ] **CA-018**: Subtasks exibem como "4/12" (completed/total)
- [ ] **CA-019**: Due date formata como "DD Mon. YYYY" (ex: "4 Mar. 2026")
- [ ] **CA-020**: Componentes acessíveis: ARIA labels, keyboard navigation, focus visible
- [ ] **CA-021**: Responsive design: mobile (<640px) = 1 col, tablet (640-1024px) = 2 col, desktop = 3 col
- [ ] **CA-022**: Loading state: skeleton screens ou spinners enquanto carregando
- [ ] **CA-023**: Empty state: "Nenhuma tarefa" + botão criar quando coluna vazia
- [ ] **CA-024**: Drag over visual feedback: highlight drop zone, preview com shadow
- [ ] **CA-025**: Success feedback: toast + smooth transitions (300ms)
- [ ] **CA-026**: Modais lazy-loaded via React.Suspense
- [ ] **CA-027**: TypeScript strict mode: zero errors com `tsc --noEmit`
- [ ] **CA-028**: Tailwind CSS styling (sem CSS-in-JS): cores, spacing, shadows
- [ ] **CA-029**: Zustand store + TanStack Query para state + data
- [ ] **CA-030**: No console errors ou warnings em production build

---

## 12. Fora do Escopo

- Edição em tempo real (real-time sync via WebSocket) — implementar POST-LAUNCH
- Comentários aninhados — MVP com flat list de comments
- Undo/Redo — armazenar em historyStore (future optimization)
- Virtual scrolling para 1000+ tasks — usar react-window (future)
- Dark mode — preparar com Tailwind theme switching, implementar depois
- Mobile app nativa (iOS/Android) — web-first, PWA (future)
- Analytics dashboard — criar página separada após MVP
- Integração com Google Calendar — future feature
- Webhooks para notificações — backend feature (future)
- Custom workflows — ciclo 2+ do produto

---

## 13. Decisões Arquiteturais

### 13.1 Por que Zustand + TanStack Query?

- **Zustand**: Simples, sem boilerplate, ideal para UI state (modal, sidebar)
- **TanStack Query**: Caching automático, retry logic, otimistic updates — reduz código de API
- Separação clara: TQ para dados remotos, Zustand para UI local

### 13.2 Por que @dnd-kit?

- Acessível (ARIA, keyboard support)
- Performático (sensors, animations)
- Flexível (customizable behavior)
- Community support
- Alternativas: react-beautiful-dnd (archived), react-dnd (complex)

### 13.3 Por que Tailwind CSS?

- Utility-first: rápido prototipagem
- Performance: CSS purging automático
- Consistência: design tokens centralizados
- Tailwind config = source of truth para colors, spacing, etc
- Sem runtime JS (vs styled-components)

### 13.4 Por que Vite?

- Bundle rápido: desenvolvimento ⚡
- Suporte nativo ESM
- HMR (hot module replacement) instantâneo
- Build otimizado com Rollup
- Melhor alternativa a CRA

### 13.5 Responsividade: Mobile-first ou Desktop-first?

- **Estratégia**: Desktop-first (design vem do Figma 1440px)
- **Breakpoints**:
  - Mobile: <640px (1 coluna, hamburger menu)
  - Tablet: 640-1024px (2 colunas, sidebar collapsa)
  - Desktop: ≥1024px (3 colunas, sidebar fixed)
- Implementação: Tailwind responsive classes (`sm:`, `md:`, `lg:`)

### 13.6 Estado do Modal: UI Store vs Board Store?

- **uiStore**: Guarda modals (which is open, selectedCardId para edit)
- **boardStore**: Guarda board data, search, filter
- **Separação**: Permite resetar UI sem resetar dados

---

## 14. Plano de Implementação (Sprint)

### Sprint 1: Setup & Base Components
- [ ] Criar estrutura de pastas (components, hooks, store, api, types)
- [ ] Setup Vite + Tailwind + Zustand + TanStack Query
- [ ] Implementar Header com Logo, Search, Notification, Avatar
- [ ] Implementar Sidebar com menu items
- [ ] Criar Board layout (flex: sidebar + content)
- [ ] Mock data com Zustand
- [ ] Tests básicos (Header, Sidebar renders)

### Sprint 2: Kanban Board
- [ ] Implementar 3 colunas (Backlog, Pendentes, Concluídas)
- [ ] Implementar Card component com metadata
- [ ] @dnd-kit setup: sensors, DragOverlay, listeners
- [ ] Drag & drop entre colunas (client-side state)
- [ ] Filter tabs (Todos, Pendentes, Concluídas)
- [ ] Tests para drag & drop, filtering

### Sprint 3: CRUD & Modals
- [ ] AddCardModal com form validation
- [ ] EditCardModal com pre-fill
- [ ] DeleteCardModal com confirmação
- [ ] API integration: POST /tasks, PUT /tasks/:id, DELETE /tasks/:id
- [ ] TanStack Query para mutations + optimistic updates
- [ ] Toast notifications (success, error)
- [ ] Tests para modals, mutations

### Sprint 4: Search, Filters & Polish
- [ ] Search input com debounce
- [ ] Avatar group com "+N" indicator
- [ ] Loading states (skeletons, spinners)
- [ ] Empty states
- [ ] Error handling
- [ ] Accessibility (ARIA, keyboard nav)
- [ ] Responsive design (mobile, tablet, desktop)

### Sprint 5: QA & Refinement
- [ ] End-to-end testing (Cypress/Playwright)
- [ ] Performance profiling
- [ ] Browser compatibility
- [ ] Accessibility audit (axe)
- [ ] Code review & cleanup
- [ ] Documentation

---

## 15. Observações e Notas

### 15.1 Mock Data

Usar Zustand com mock server (json-server ou MSW) para desenvolvimento sem backend.

```typescript
// mock.ts
const MOCK_BOARD = {
  id: 'board-1',
  name: 'Task View',
  members: [...],
  columns: [
    { id: 'col-backlog', name: 'Backlog', cards: [...] },
    ...
  ]
};
```

### 15.2 Performance Tips

- Memoizar cards com `React.memo` (expensive re-renders)
- Memoizar selectors em Zustand (`useShallow`)
- Debounce search input (300ms)
- Lazy load modals via `React.Suspense`
- Virtual scrolling se >100 tasks por coluna (future)

### 15.3 Testing Strategy

- **Unit**: Zustand actions, utility functions (Vitest)
- **Component**: Card, Header, Column (React Testing Library)
- **Integration**: Drag & drop, filter + search (RTL)
- **E2E**: Full workflows (Cypress/Playwright)
- **Target**: 80%+ coverage

### 15.4 API Contract (Backend)

Exemplo de contrato (JSON):

```json
GET /api/board → { board: Board }

POST /api/tasks → { card: Card }
{ title: string, description: string, dueDate: string, assignees: string[], tags: Tag[] }

PUT /api/tasks/:id → { card: Card }
{ ... }

DELETE /api/tasks/:id → { success: boolean }

PUT /api/tasks/:id/column → { card: Card }
{ columnId: string }
```

### 15.5 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MOCK_ENABLED=true  # true durante dev, false em prod
VITE_LOG_LEVEL=debug    # debug, info, warn, error
```

### 15.6 Deployment Checklist

- [ ] Build otimizado: `npm run build`
- [ ] No console errors em production
- [ ] Minification ativado (Vite default)
- [ ] Sourcemaps desativados ou private
- [ ] CORS headers corretos
- [ ] API endpoint apontando para prod
- [ ] Vitest + coverage report
- [ ] E2E tests passando
- [ ] Lighthouse score ≥90
- [ ] SEO: meta tags, Open Graph (se aplicável)

---

## 16. Referências e Links

- **Figma**: https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7
- **React Docs**: https://react.dev
- **Zustand**: https://github.com/pmndrs/zustand
- **TanStack Query**: https://tanstack.com/query
- **@dnd-kit**: https://docs.dndkit.com
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev

---

**Versão**: 1.0
**Autor**: AI Agent Spec Writer
**Data**: 2026-03-24
**Status**: COMPLETA - Pronta para Implementação
