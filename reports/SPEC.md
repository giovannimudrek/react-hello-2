# Board de Gerenciamento de Tasks - Especificação Técnica Completa

## Visão Geral

Este documento especifica a implementação de um **Board de Gerenciamento de Tasks** no formato Kanban, inspirado no Trello, com colunas arrastáveis, cards interativos, header global, sidebar de navegação e suporte a múltiplas ações.

**Status do Design**: Extraído do Figma (arquivo: Ferramenta Trello, node-id: 1:2)
**Data da Especificação**: 2026-03-24
**Stack Recomendada**: React 18 + TypeScript + Tailwind CSS + @dnd-kit + Zustand + TanStack Query + Vite

---

## 1. Visão Geral do Projeto

### 1.1 Objetivo
Criar uma interface visual funcional para gerenciar tasks em um formato Kanban com suporte a drag-and-drop, permitindo que usuários:
- Visualizem tasks em diferentes estados (Backlog, Pendentes, Concluídas)
- Arrastem cards entre colunas
- Realizem ações em tasks (editar, deletar, atualizar prioridade)
- Filtrem e busquem tasks via um campo de entrada no header

### 1.2 Escopo de Funcionalidades
- Exibição de board com layout grid de colunas
- Drag-and-drop de cards entre colunas
- Header com branding, campo de busca e controles de user
- Menu lateral (sidebar) com navegação e configurações
- Cards com informações de task (título, descrição, assignees, tags, labels)
- Estados visuais (hover, dragging, loading, empty)

---

## 2. Estrutura de Componentes

### 2.1 Componentes Principais

#### **BoardLayout** (Container Principal)
- **Tipo**: Componente container/página
- **Responsabilidade**: Orquestrar o layout principal (header + sidebar + conteúdo principal)
- **Props**:
  ```tsx
  interface BoardLayoutProps {
    children: React.ReactNode;
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
  }
  ```
- **Estado**: Controla visibilidade da sidebar
- **Estrutura**:
  ```
  BoardLayout
  ├── Header
  ├── Main Container (flex row)
  │   ├── Sidebar
  │   └── BoardContent
  ```

#### **Header** (Topo da Página)
- **Tipo**: Componente funcional
- **Dimensões**: Full width, height: 64px (relative to 1440px viewport)
- **Conteúdo**:
  - Logo/Brand (ícone + texto "Task View")
  - Input field para busca
  - Avatar Group (usuários assignees)
  - User menu
- **Background**: Branco com border inferior sutil
- **Props**:
  ```tsx
  interface HeaderProps {
    onSearch: (query: string) => void;
    searchValue: string;
    avatars: AvatarData[];
  }
  ```

#### **Sidebar** (Navegação Lateral)
- **Tipo**: Componente com estado
- **Dimensões**: 240px (fixed) em desktop, colapsável em mobile
- **Responsabilidade**: Menu de navegação principal
- **Conteúdo**:
  - Items de menu (Home, Projects, Teams, Settings)
  - User profile section
  - Logout action
- **Estados**:
  - Open (expandido)
  - Collapsed (ícones apenas)
  - Hidden (mobile)

#### **Board** (Área Principal)
- **Tipo**: Componente grid de colunas
- **Dimensões**: Flex-grow para ocupar espaço disponível
- **Responsabilidade**: Container para as colunas do kanban
- **Props**:
  ```tsx
  interface BoardProps {
    columns: Column[];
    onCardMove: (cardId: string, targetColumnId: string) => void;
    loading: boolean;
  }
  ```

#### **Column** (Coluna Kanban)
- **Tipo**: Componente com suporte a drag-and-drop
- **Dimensões**: Cada coluna tem 300-350px de largura
- **Responsabilidade**: Container para cards de um status
- **Dados**:
  ```tsx
  interface ColumnData {
    id: string;
    name: string; // Ex: "Backlog", "Pendentes", "Concluídas"
    cardCount: number;
    cards: Card[];
  }
  ```
- **Estrutura**:
  ```
  Column
  ├── Header
  │   ├── Title (Ex: "Backlog")
  │   ├── Count (Ex: "8 tasks")
  │   └── Actions (menu)
  └── Cards Container (droppable)
      └── Card[]
  ```

#### **Card** (Task Card)
- **Tipo**: Componente draggable + interactive
- **Dimensões**: ~280px width, ~90-140px height (variável)
- **Responsabilidade**: Representar uma task individual
- **Dados**:
  ```tsx
  interface CardData {
    id: string;
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    assignees: User[];
    labels: Label[];
    dueDate?: string;
    attachments?: number;
    comments?: number;
  }
  ```
- **Estados Visuais**:
  - **Padrão**: Card com shadow sutil
  - **Hover**: Elevation aumenta, pode mostrar ações
  - **Dragging**: Opacity reduzido, outline destacado
  - **Selected**: Border/background alterado
- **Estrutura**:
  ```
  Card
  ├── Card Header
  │   ├── Priority Badge
  │   ├── Title
  │   └── Menu (3 dots)
  ├── Card Body
  │   └── Description (truncado)
  ├── Card Metadata
  │   ├── Labels/Tags
  │   ├── Due Date
  │   └── Attachments count
  └── Card Footer
      ├── Avatar Group (assignees)
      ├── Comments count
      └── Actions (on hover)
  ```

#### **InputField** (Busca no Header)
- **Tipo**: Input text
- **Placeholder**: "Search tasks..."
- **Dimensions**: ~300px width, 40px height
- **Features**:
  - Ícone de lupa à esquerda
  - Ícone de limpar (X) à direita quando há valor
  - Debounced onChange
- **Props**:
  ```tsx
  interface InputFieldProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    icon?: React.ReactNode;
  }
  ```

#### **AvatarGroup** (Grupo de Avatares)
- **Tipo**: Componente de display
- **Responsabilidade**: Mostrar múltiplos avatares de usuários
- **Features**:
  - Exibe até 4 avatares visíveis
  - "+X" para avatares excedentes
  - Tooltip on hover mostrando nomes
- **Props**:
  ```tsx
  interface AvatarGroupProps {
    users: User[];
    maxVisible?: number; // default 4
    size?: 'small' | 'medium' | 'large';
  }
  ```

#### **Avatar** (Componente Individual)
- **Tipo**: Componente de display
- **Dimensões**: 32px x 32px (padrão)
- **Features**:
  - Imagem do usuário ou iniciais
  - Border circle
  - Tooltip com nome ao hover
- **Props**:
  ```tsx
  interface AvatarProps {
    src?: string;
    initials?: string;
    name: string;
    size?: 'small' | 'medium' | 'large';
    badge?: React.ReactNode;
  }
  ```

---

## 3. Paleta de Cores

### 3.1 Cores Primárias

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Primary** | #7F56D9 | rgb(127, 86, 217) | Botões, links, focus states |
| **Dark Background** | #0A0D12 | rgb(10, 13, 18) | Fundo dark mode (futuro) |
| **Dark Text** | #414651 | rgb(65, 70, 81) | Textos secundários |
| **Light Gray** | #F5F5F5 | rgb(245, 245, 245) | Fundo de colunas/cards |
| **Light Divider** | #E9EAEB | rgb(233, 234, 235) | Borders, separadores |
| **Medium Gray** | #D5D7DA | rgb(213, 215, 218) | Disabled states, placeholders |
| **White** | #FFFFFF | rgb(255, 255, 255) | Backgrounds principais, text light |

### 3.2 Cores Semânticas

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primary Action** | #7F56D9 | Botões principais, links |
| **Success** | #10B981 | Tags green, checkmarks (inferido de padrões) |
| **Warning** | #F59E0B | Labels orange (inferido) |
| **Danger** | #EF4444 | Delete, priority high (inferido) |
| **Info** | #3B82F6 | Info badges (inferido) |

### 3.3 Estados de Cores

- **Hover**: Aumentar opacidade ou escurecer em 10%
- **Active**: Escurecer em 20%
- **Disabled**: Usar 40% opacity
- **Focus**: Border primary + box-shadow

---

## 4. Tipografia

### 4.1 Fontes

**Primary Font**: Inter (Sans-serif)
- **Peso disponível**: Regular (400), Medium (500), Semi Bold (600), Bold (700)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### 4.2 Escalas Tipográficas

| Componente | Font | Size | Weight | Line Height | Uso |
|------------|------|------|--------|------------|-----|
| **Display** | Inter | 28px | 600 | 36px | Page titles |
| **Heading 1** | Inter | 24px | 600 | 32px | Section titles |
| **Heading 2** | Inter | 20px | 600 | 28px | Subsection titles |
| **Body Large** | Inter | 16px | 600 | 24px | Card titles, labels destacados |
| **Body Regular** | Inter | 14px | 500 | 20px | Card descriptions, metadata |
| **Caption** | Inter | 12px | 500 | 16px | Timestamps, helper text |

### 4.3 Hierarquia de Texto

```css
/* Body Large - Task titles, important labels */
font-family: Inter, sans-serif;
font-size: 16px;
font-weight: 600;
line-height: 24px;
color: #0A0D12;

/* Body Regular - Descriptions, metadata */
font-family: Inter, sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 20px;
color: #414651;

/* Caption - Secondary info */
font-family: Inter, sans-serif;
font-size: 12px;
font-weight: 500;
line-height: 16px;
color: #7F8590; /* adjusted gray */
```

---

## 5. Layout e Responsividade

### 5.1 Breakpoints

| Viewport | Width | Sidebar | Board Columns |
|----------|-------|---------|---------------|
| **Mobile** | < 640px | Hamburger menu (hidden by default) | 1 column, full width |
| **Tablet** | 640px - 1024px | Collapsed (icons only) | 2 columns |
| **Desktop** | 1024px - 1440px | 240px fixed | 3 columns |
| **Large Desktop** | > 1440px | 240px fixed | 3-4 columns com scroll |

### 5.2 Grid Layout

**Desktop Layout (1440px)**
```
┌─────────────────────────────────────┐
│            HEADER (64px)            │
├────────┬──────────────────────────────┤
│        │                              │
│ SIDEBAR│         BOARD (3 columns)    │
│ (240px)│ - Each col: ~300-350px       │
│        │ - Gap: 20px between cols     │
│        │ - Padding: 24px all sides    │
│        │                              │
└────────┴──────────────────────────────┘
```

**Responsive Behavior**
- **Desktop**: Sidebar fixed, Board scrollable horizontally se necessário
- **Tablet**: Sidebar colapsável, Board cards ajustam
- **Mobile**: Sidebar drawer/modal, Board single column

### 5.3 Espaçamento Padrão

| Elemento | Valor |
|----------|-------|
| **Header Height** | 64px |
| **Sidebar Width** | 240px |
| **Column Width** | 300-350px |
| **Column Gap** | 20px |
| **Card Margin** | 12px |
| **Card Padding** | 16px |
| **Grid Padding** | 24px |
| **Vertical Spacing** | 16px (M), 24px (L) |

---

## 6. Componentes e Padrões de Interação

### 6.1 Drag and Drop

**Comportamento**
- Cards são draggable entre colunas
- Visual feedback durante drag: opacity reduzida, transform leve
- Drop zone com outline dashed quando hovering
- Animação ao soltar (reordenação suave)

**Estados**
```
Normal → Hover (cursor grab) → Dragging (opacity 0.7, shadow) → Hover Drop Zone → Drop (animate to position)
```

**Implementação**: @dnd-kit (modern, accessible, performant)

### 6.2 Busca e Filtros

**Input Field**
- Localizado no Header
- Debounce 300ms
- Busca em: título, descrição, labels
- Clear button (X) quando há valor
- Placeholder: "Search tasks..."

**Resultado**
- Filtra cards em tempo real
- Mostra "No tasks match" se vazio
- Busca global em todas as colunas

### 6.3 Menu de Card

**Ações Disponíveis**
1. **Edit** - Abre modal de edição
2. **Delete** - Confirma exclusão
3. **Duplicate** - Cria cópia
4. **Change Priority** - Submenu com low/medium/high
5. **Assign to** - Adiciona usuário

**Trigger**: Menu icon (3 dots) no card header, visível on hover

### 6.4 Estados Visuais

#### Card States
- **Padrão**: White bg, subtle shadow
- **Hover**: Shadow aumenta, menu ações visível
- **Dragging**: Opacity 0.7, outline destacado
- **Selected**: Border primary color, background light
- **Empty State**: Ícone + "No tasks in this column"

#### Column States
- **Padrão**: Light gray background
- **Dragging Over**: Outline dashed, background alterado
- **Loading**: Skeleton cards ou spinner
- **Error**: Red border, error message

#### Button States
- **Normal**: Primary color background
- **Hover**: Darken 10%
- **Active**: Darken 20%
- **Disabled**: Gray, cursor not-allowed, 0.5 opacity
- **Loading**: Spinner + disabled

### 6.5 Modais e Formulários

**Modal de Edição de Task**
- Campos: Título, Descrição, Prioridade, Assignees, Labels, Due Date
- Validação: Título obrigatório
- Ações: Save, Cancel, Delete
- Close: X button, ESC key, click outside

**Modal de Confirmação de Delete**
- Mensagem: "Are you sure? This action cannot be undone."
- Ações: Delete (red), Cancel
- Prevents accidental deletion

---

## 7. Requisitos Funcionais Detalhados

### 7.1 Visualização do Board

**FR-1.1**: Exibir três colunas fixas
- Nome de cada coluna
- Contador de tasks
- Menu de coluna (3 dots)

**FR-1.2**: Exibir cards dentro das colunas
- Título, descrição, prioridade
- Avatares de assignees
- Labels/tags
- Due date
- Ícones: attachments, comments

**FR-1.3**: Suportar scroll horizontal em desktop
- Se muitas colunas, permitir scroll
- Manter header fixo

### 7.2 Drag and Drop

**FR-2.1**: Mover cards entre colunas
- Validação: Somente para cards válidos
- Atualizar ordem dentro da coluna
- Persistir no backend (chamada API)

**FR-2.2**: Feedback visual
- Drag image customizada (card preview)
- Drop zone highlighting
- Animation ao soltar

**FR-2.3**: Reordenação
- Suportar drop em qualquer posição da coluna
- Auto-scroll se perto das bordas
- Debounce updates para evitar excesso de requisições

### 7.3 Busca

**FR-3.1**: Input de busca no header
- Busca em tempo real
- Filtrar cards em todas as colunas
- Highlight de matches

**FR-3.2**: Clear search
- Botão X para limpar
- ESC key para limpar
- Mostrar todos os cards novamente

### 7.4 Ações de Task

**FR-4.1**: Editar task
- Modal com form
- Atualizar qualquer campo
- Save → PUT request → Refetch data

**FR-4.2**: Deletar task
- Confirmação de delete
- Remover da coluna
- DELETE request → Refetch

**FR-4.3**: Duplicar task
- Cria nova card idêntica (novo ID)
- Insere próxima à original
- POST request

**FR-4.4**: Mudar prioridade
- Menu inline (low, medium, high)
- Alterar cor/badge
- PUT request

**FR-4.5**: Assign usuário
- Modal ou popover
- Multi-select
- Atualizar avatares na card

### 7.5 Persistência de Dados

**FR-5.1**: Sincronizar com backend
- GET /api/tasks → Carregar tasks
- POST /api/tasks → Criar nova
- PUT /api/tasks/:id → Atualizar
- DELETE /api/tasks/:id → Deletar
- PUT /api/tasks/:id/column → Mover coluna

**FR-5.2**: Estado local (Zustand)
- Store: tasks, columns, filters, loading
- Actions: updateTask, deleteTask, moveCard, setSearchQuery
- Persist: localStorage para draft edits

**FR-5.3**: Sincronização com TanStack Query
- Cache de tasks
- Refetch on mount
- Invalidate cache após mutação
- Retry logic (3 tentativas)

---

## 8. Regras de Negócio

**RB-1**: Tasks sempre pertencem a uma coluna
- Ao criar, atribuir a "Backlog" por padrão
- Ao deletar coluna, mover tasks para Backlog

**RB-2**: Usuários podem ter múltiplas tasks assignadas
- Sem limite de tasks por usuário

**RB-3**: Prioridade é obrigatória
- Default: "medium" ao criar

**RB-4**: Validação de título
- Mínimo 3 caracteres
- Máximo 200 caracteres
- Não permite vazio

**RB-5**: Busca é case-insensitive
- Busca em title, description, labels
- Partial matches permitidas

**RB-6**: Reordenação é persistida
- Salvar ordem relativa de cards
- Manter histórico de movimentações (audit log)

**RB-7**: Undo/Redo para ações
- Implementar para delete, move, update
- Max history: últimas 10 ações

---

## 9. Critérios de Aceitação

- [ ] **Layout**: Board renderiza com header, sidebar, e 3 colunas no desktop
- [ ] **Responsive**: Funciona em mobile (1 coluna), tablet (2 colunas), desktop (3 colunas)
- [ ] **Cores**: Paleta exata do Figma aplicada a todos os componentes
- [ ] **Tipografia**: Fonte Inter com pesos corretos (400, 500, 600) e tamanhos especificados
- [ ] **Cards**: Exibem título, descrição, prioridade, assignees, labels, due date
- [ ] **Drag & Drop**: Cards arrastáveis entre colunas, visual feedback durante drag
- [ ] **Drop Zone**: Highlighting ao hovering sobre zona de drop
- [ ] **Busca**: Input funcional, filtra cards em tempo real, case-insensitive
- [ ] **Menu Card**: 3 dots menu com edit, delete, duplicate, change priority
- [ ] **Modal Edição**: Form modal editável com validação
- [ ] **Modal Confirmação**: Confirmação antes de deletar
- [ ] **Ações Assíncronas**: Loading states durante API calls
- [ ] **Error Handling**: Mensagens de erro ao falhar
- [ ] **Empty States**: "No tasks" message quando coluna vazia
- [ ] **Animações**: Suave (200-300ms) para expand, collapse, reorder
- [ ] **Acessibilidade**: ARIA labels, keyboard navigation (Tab, Enter, ESC)
- [ ] **Performance**: Renderização <100ms, drag smooth (60fps)
- [ ] **Persist Search**: Manter query no URL (localStorage/query params)
- [ ] **Undo/Redo**: Histórico de últimas 10 ações
- [ ] **Mobile Menu**: Sidebar drawer em mobile com botão hamburger

---

## 10. Fora do Escopo

- Autenticação/login (assumir usuário logado)
- Permissões por role (all users podem editar tudo)
- Colaboração em tempo real (WebSocket)
- Histórico completo de audit
- Temas dark/light toggle
- Customização de colunas (add/remove/rename columns)
- Templates de tasks
- Integração com Slack/Email
- Mobile app nativa

---

## 11. Stack Tecnológica Recomendada

### 11.1 Frontend

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@dnd-kit/core": "^8.1.0",
    "@dnd-kit/utilities": "^3.2.0",
    "@dnd-kit/sortable": "^8.0.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.28.0",
    "axios": "^1.6.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-popover": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0"
  }
}
```

### 11.2 Backend (API Mockado)

- **Padrão**: RESTful JSON API
- **Mock**: json-server ou Mirage JS
- **Endpoints**:
  ```
  GET /api/columns
  GET /api/tasks
  POST /api/tasks
  PUT /api/tasks/:id
  DELETE /api/tasks/:id
  PUT /api/tasks/:id/column
  ```

### 11.3 Build & Deploy

- **Build Tool**: Vite
- **Package Manager**: npm / pnpm
- **Node Version**: >=18.0.0
- **Deploy**: Vercel / Netlify

---

## 12. Estrutura de Arquivos Sugerida

```
src/
├── components/
│   ├── Board/
│   │   ├── Board.tsx
│   │   ├── Board.test.tsx
│   │   └── Board.styles.ts
│   ├── Column/
│   │   ├── Column.tsx
│   │   ├── Column.test.tsx
│   │   └── Column.styles.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.test.tsx
│   │   ├── CardMenu.tsx
│   │   └── Card.styles.ts
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── SearchInput.tsx
│   │   ├── AvatarGroup.tsx
│   │   └── Header.styles.ts
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItem.tsx
│   │   └── Sidebar.styles.ts
│   ├── Modals/
│   │   ├── TaskEditModal.tsx
│   │   ├── ConfirmDeleteModal.tsx
│   │   └── Modal.styles.ts
│   └── Common/
│       ├── Button.tsx
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Icon.tsx
│       └── Common.styles.ts
├── hooks/
│   ├── useBoardData.ts
│   ├── useDragDrop.ts
│   ├── useSearch.ts
│   └── useModal.ts
├── stores/
│   ├── boardStore.ts (Zustand)
│   ├── uiStore.ts
│   └── historyStore.ts (Undo/Redo)
├── api/
│   ├── client.ts (Axios instance)
│   ├── taskApi.ts (TanStack Query)
│   └── types.ts
├── types/
│   ├── task.ts
│   ├── column.ts
│   ├── user.ts
│   └── api.ts
├── utils/
│   ├── colors.ts
│   ├── validation.ts
│   ├── formatters.ts
│   └── dnd-helpers.ts
├── styles/
│   ├── globals.css (Tailwind)
│   ├── theme.css
│   └── animations.css
├── App.tsx
├── App.test.tsx
└── main.tsx

reports/
├── SPEC.md (este arquivo)
├── board-spec.md (anterior)
└── board-implementation.md

docs/
├── ARCHITECTURE.md
├── CONVENTIONS.md
└── DECISIONS.md
```

---

## 13. Tipos TypeScript Principais

```typescript
// Task
interface Task {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  assignees: User[];
  labels: Label[];
  dueDate?: string;
  attachments: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  position: number; // ordem relativa na coluna
}

// Column
interface Column {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
}

// User
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Label
interface Label {
  id: string;
  name: string;
  color: string;
}

// Board State (Zustand)
interface BoardState {
  columns: Column[];
  tasks: Task[];
  searchQuery: string;
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;

  // Actions
  setColumns: (columns: Column[]) => void;
  setTasks: (tasks: Task[]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveCard: (cardId: string, targetColumnId: string, position: number) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
}

// UI State (Zustand)
interface UIState {
  sidebarOpen: boolean;
  modalOpen: 'edit' | 'delete' | 'create' | null;
  selectedTask: Task | null;

  toggleSidebar: () => void;
  openModal: (type: string, task?: Task) => void;
  closeModal: () => void;
}
```

---

## 14. Observações e Notas de Implementação

### 14.1 Performance
- Virtualizar lista de cards se > 100 cards por coluna (React Window)
- Memoizar components (React.memo) para evitar re-renders desnecessários
- Lazy load de avatares (imagens)
- Debounce drag operations (100ms)

### 14.2 Acessibilidade
- Usar Radix UI para modais, dropdowns (ARIA compliant)
- Keyboard shortcuts: Tab para navigate, Enter para expand, ESC para close
- ARIA labels em botões, inputs, ícones
- Color contrast: AA standard (WCAG 2.1)
- Focus outline visível (3px primary color)

### 14.3 Testing
- Unit tests (Vitest): Components, hooks, utils
- Integration tests: User flows (drag, edit, delete)
- E2E tests (Cypress/Playwright): Full board interactions
- Target: 80%+ coverage

### 14.4 Animações
- Transições suaves (200-300ms)
- Usar Framer Motion ou CSS transitions
- Preferir transforms (scale, translate) para melhor performance
- Respeitar prefers-reduced-motion

### 14.5 SEO & Meta
- Title: "Task Board - Manage Your Tasks"
- Description: "Kanban-style task management board"
- OG tags para sharing

### 14.6 Dados de Exemplo (Mock)

```json
{
  "columns": [
    {
      "id": "col-1",
      "name": "Backlog",
      "position": 0
    },
    {
      "id": "col-2",
      "name": "Pendentes",
      "position": 1
    },
    {
      "id": "col-3",
      "name": "Concluídas",
      "position": 2
    }
  ],
  "tasks": [
    {
      "id": "task-1",
      "columnId": "col-1",
      "title": "Implementar componente de drag-drop",
      "description": "Usar @dnd-kit para drag and drop dos cards",
      "priority": "high",
      "assignees": [{"id": "user-1", "name": "Alice"}],
      "labels": [{"id": "label-1", "name": "Feature", "color": "#7F56D9"}],
      "dueDate": "2026-03-28",
      "attachments": 0,
      "comments": 2,
      "position": 0
    }
  ]
}
```

---

## 15. Próximos Passos

1. **Aprovação da Spec**: Review por Product Manager
2. **Design Details**: Validar cores/tipografia com designer
3. **API Contract**: Confirmar endpoints com backend team
4. **Development Setup**: Criar projeto Vite + configurar Tailwind
5. **Component Library**: Implementar componentes base
6. **Integration**: Conectar com API mockada
7. **Testing**: Implementar testes unitários e E2E
8. **Deployment**: Setup CI/CD, deploy para staging
9. **QA**: Testes manuais, validação de AC
10. **Launch**: Deploy para produção

---

## Apêndice A: Referências do Figma

- **File**: Ferramenta Trello
- **Node ID**: 1:2 (Frame 1)
- **Last Modified**: 2026-03-11T14:38:22Z
- **Colors**: #0A0D12, #414651, #7F56D9, #D5D7DA, #E9EAEB, #F5F5F5, #FFFFFF
- **Typography**: Inter 14px/16px, weights 500/600
- **Components Principais**: Header, Sidebar, Board (3 columns), Cards, InputField, AvatarGroup

---

**Documento gerado em**: 2026-03-24
**Stack**: React 18 + TypeScript + Tailwind CSS + @dnd-kit + Zustand + TanStack Query + Vite
**Status**: Pronto para desenvolvimento
