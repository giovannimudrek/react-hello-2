# Board Screen — Especificacao Tecnica

> Fonte de verdade: Figma "Ferramenta Trello" — node `1:2` (Frame 1)
> Extraido em: 2026-03-24
> Resolucao de referencia: 1440 x 1011 px

---

## Resumo

A tela de Board e a visao principal da aplicacao de gerenciamento de tarefas no estilo Trello. Ela exibe colunas kanban (Backlog, Pendentes, Concluidas) com cards arrastáveis, uma barra lateral de navegacao, um header global e uma area de filtros/abas no topo do conteudo.

---

## Contexto

Esta tela substitui uma visao de lista tradicional por um board kanban que permite ao usuario visualizar, criar e mover tarefas entre etapas de trabalho. O objetivo e aumentar a clareza do status de cada tarefa e reduzir o tempo de triagem manual.

---

## Requisitos Funcionais

1. Exibir colunas kanban com titulo, contagem de tarefas e lista de cards.
2. Cada card deve exibir: tags de prioridade/categoria, titulo, descricao resumida, data de vencimento, progresso de subtarefas, avatares de responsaveis, contagem de anexos e comentarios.
3. Permitir adicionar novo card a qualquer coluna via botao "+" na cabecalho da coluna.
4. Exibir abas de filtro: "Board" (ativa), "Pendentes" e "Concluidas" acima do board.
5. Exibir group de avatares de membros do projeto no canto superior direito da area de conteudo.
6. Permitir adicionar novo membro ao projeto via botao "+" ao lado do grupo de avatares.
7. A sidebar de navegacao deve conter: Home, Notificacao, Tarefas e Analytics.
8. O header deve conter: logo + nome da aplicacao, campo de busca centralizado e icone de notificacao + avatar do usuario.
9. O board deve ser horizontalmente scrollavel quando houver mais colunas que o viewport comporta.
10. Cada coluna deve ser verticalmente scrollavel independentemente.

---

## Regras de Negocio

- O numero exibido no cabecalho de cada coluna reflete a contagem total de cards daquela coluna.
- Um card so pode pertencer a uma unica coluna por vez.
- A aba "Board" e sempre a ativa por padrao ao entrar na rota `/board`.
- A coluna "Backlog" e a primeira e pode conter numero ilimitado de cards.
- O grupo de avatares exibe no maximo 10 fotos; o excedente e representado por um badge "+N" com fundo `#f4ebff` e texto `#7f56d9`.
- Subtarefas sao exibidas no formato "feitas/total" (ex.: "4/12").

---

## Interface / UX

### Layout Geral

```
+----------------------------------------------------------+
|  HEADER (1440 x 76px, branco, borda-bottom #e9eaeb)     |
+------------+---------------------------------------------+
|            |  TABS (342 x 52px)   |  AVATAR GROUP        |
|  SIDEBAR   +---------------------------------------------+
|  (224px)   |  COL 1  |  COL 2  |  COL 3                  |
|            |  378px  |  378px  |  378px                  |
|            |         |         |                          |
+------------+---------+---------+--------------------------+
```

- **Viewport total**: 1440 px de largura, 1011 px de altura
- **Background geral**: `#f5f5f5`
- **Regiao de conteudo** comeca em x=194 px (apos a sidebar)

### Header (1440 x 76 px)

| Elemento | Descricao |
|---|---|
| Background | `#ffffff` |
| Borda inferior | 1 px solida `#e9eaeb` |
| Brand (esquerda) | Icone SVG gradiente + texto "Task View" |
| Logo icone | 32 x 32 px; gradiente linear `#f4ebff` → `#7f56d9`; inner shadow rgba(255,255,255,0.25) offset (-1,1) blur 4 |
| Texto "Task View" | Inter SemiBold 16px / lh 24px / `#0a0d12`; gap com icone: 6px |
| Input de busca (centro) | 320 x 44 px; fundo `#ffffff`; placeholder "Email" (label visivel acima na versao de dados); borda `#d5d7da`; radius 8px; icone de lupa (search) a esquerda dentro do campo |
| Notificacao (direita) | Botao 36 x 36 px; icone bell 20 x 20 px; sem borda visivel |
| Avatar do usuario (direita) | 40 x 40 px; fundo `#f4ebff`; circulo; margem-left 8px |
| Espacamento direito entre bell e avatar | 8px gap num flex row |

### Sidebar (224 x 935 px)

| Elemento | Descricao |
|---|---|
| Background | `#ffffff` |
| Posicao | Colada a esquerda, comeca abaixo do header (y=181) |
| Largura | 224 px |
| Itens de navegacao | Cada item: icon 16x16 + label texto; gap 8px; altura 20px; espacados verticalmente 40px |
| Itens | Home, Notificacao, Tarefas, Analytics |
| Tipografia dos itens | Inter Regular 14px / lh 20px / `#0a0d12` |

### Area de Abas / Filtro (342 x 52 px)

Posicionada acima do board, alinhada a esquerda do conteudo (x=194, y=213).

| Estado | Estilo |
|---|---|
| Aba ativa ("Board") | Container 93 x 36 px; fundo `#7f56d9`; texto branco; radius 8px |
| Abas inativas ("Pendentes", "Concluidas") | Sem fundo; texto `#414651` Inter Regular 14px; icon 16x16 a esquerda; gap 4px |
| Container geral das abas | Fundo `#ffffff`; 342 x 52 px; sem borda visivel |

### Grupo de Avatares dos Membros (320 x 32 px)

Posicionado a direita do conteudo (x=1024, y=223), na mesma linha das abas.

- Avatares: 32 x 32 px cada; circulares; sobrepostos com gap de -4px (stacked)
- Maximo 10 avatares visiveis
- Badge de excedente: fundo `#f4ebff`; texto Inter Medium 14px `#7f56d9`; formato "+N"
- Botao adicionar membro: circulo 32 x 32 px; fundo `#ffffff`; borda 1px; icone plus 20x20

### Colunas do Board

Tres colunas fixas no design. Cada coluna tem as mesmas dimensoes e regras visuais:

| Propriedade | Valor |
|---|---|
| Largura total | 378 px |
| Altura | 846 px (com scroll interno) |
| Padding | top 16px, right 20px, bottom 566px, left 20px |
| Background | `#ffffff` |
| Borda | 1 px solida `#e9eaeb` |
| Border-radius | 12px top-left, 12px top-right, 0 bottom-left, 0 bottom-right |
| Gap entre cards | 10px |
| Gap entre header da coluna e primeiro card | 16px |

**Cabecalho de cada coluna (338 x 36 px):**

| Elemento | Descricao |
|---|---|
| Titulo | Inter SemiBold 16px / lh 24px / `#0a0d12` (ex.: "Backlog", "Pendentes", "Concluidas") |
| Contagem de tarefas | Inter Regular 12px / lh 18px / `#414651` (ex.: "10 tarefas") |
| Gap entre titulo e contagem | 8px |
| Botao "+" | 36 x 36 px; borda 1px `#7f56d9`; radius 8px; icone plus 20x20; sem background |
| Layout | Space-between: [titulo + contagem] | [botao +] |

**Colunas do design:**

| ID | Nome | Tarefas |
|---|---|---|
| Frame 18 | Backlog | 10 tarefas (4 cards visiveis) |
| Frame 19 | Pendentes | 2 tarefas (2 cards visiveis) |
| Frame 20 | Concluidas | 3 tarefas (3 cards visiveis) |

### Card de Tarefa (338 x 212 px)

Estrutura interna (padding 16px em todos os lados, gap 16px entre secoes):

```
+------------------------------------------+
|  [TAG Urgente] [TAG Interno] [TAG Verde]  [...] |
|                                                   |
|  Customer Support Expert                          |
|  Lorem ipsum dolor sit amet, consectetur...       |
|                                                   |
|  [cal] 4 Mar. 2026    [list] 4/12                |
|                                                   |
|  [avatares empilhados]    [clip] 8  [msg] 8      |
+------------------------------------------+
```

| Propriedade | Valor |
|---|---|
| Largura | 338 px |
| Altura | 212 px |
| Background | `#ffffff` |
| Borda | 1 px solida `#e9eaeb` |
| Border-radius | 16 px |
| Padding | 16px (todos os lados) |
| Gap interno entre secoes | 16px |
| Sombra | nenhuma (flat) |

**Secao 1 — Tags e menu (306 x 28 px):**

Row horizontal, gap 16px entre o grupo de tags e o icone de menu.

Tags (badges pill):
- Padding: 2px top/bottom, 8px left/right
- Border-radius: 999px (pill)
- Tipografia: Inter Medium 12px / lh 18px
- Gap interno (icone + texto): 6px

| Variante | Background | Cor do texto | Exemplo |
|---|---|---|---|
| Urgente (vermelho) | `#fef3f2` | `#d92d20` | "Urgente" |
| Interno (amarelo) | `#fffaeb` | `#dc6803` | "Interno" |
| Concluido (verde) | `#ecfdf3` | `#039855` | "Interno" (verde) |

Icone de menu (tres pontos horizontais): 16 x 16 px; cor `#414651`; alinhado a direita.

**Secao 2 — Titulo e descricao (306 x 60 px):**

- Titulo: Inter SemiBold 14px / lh 20px / `#414651`
- Descricao: Inter Regular 14px / lh 20px / `#717680` (2 linhas max)
- Layout: VERTICAL, sem gap (spacamento por lh)

**Secao 3 — Metadados (306 x 20 px):**

Row horizontal, gap 20px entre os dois items.

| Item | Icone | Tipografia | Cor |
|---|---|---|---|
| Data de vencimento | calendar 16x16 | Inter Regular 14px lh 20px | `#414651` |
| Progresso de subtarefas | list 16x16 | Inter Regular 14px lh 20px | `#414651` |

Gap entre icone e texto: 4px.

**Secao 4 — Rodape do card (306 x 24 px):**

Row horizontal, gap 20px entre o grupo de avatares e o grupo de contadores.

- Avatares: stacked circles 24x24 px; borda branca 2px; gap -4px; max 10
- Contadores: [paperclip icon 16x16] [numero] gap 4px; [message-square 16x16] [numero] gap 4px; gap entre os dois: 16px
- Tipografia dos contadores: Inter Regular 14px lh 20px / `#414651`

---

## Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| color-bg-page | `#f5f5f5` | Background da pagina |
| color-surface | `#ffffff` | Header, sidebar, colunas, cards |
| color-border | `#e9eaeb` | Bordas de cards, colunas, header |
| color-border-secondary | `#d5d7da` | Borda do input de busca |
| color-text-primary | `#0a0d12` | Titulos de coluna, nome do app |
| color-text-secondary | `#414651` | Titulos de card, metadados, icones |
| color-text-tertiary | `#717680` | Descricao do card, texto de suporte |
| color-brand | `#7f56d9` | Aba ativa, botao "+" das colunas, badge de overflow |
| color-brand-light | `#f4ebff` | Background do avatar do usuario, badge "+N" |
| color-tag-red-bg | `#fef3f2` | Tag "Urgente" background |
| color-tag-red-text | `#d92d20` | Tag "Urgente" texto |
| color-tag-yellow-bg | `#fffaeb` | Tag "Interno" (amarelo) background |
| color-tag-yellow-text | `#dc6803` | Tag "Interno" (amarelo) texto |
| color-tag-green-bg | `#ecfdf3` | Tag (verde) background |
| color-tag-green-text | `#039855` | Tag (verde) texto |

---

## Tipografia

| Estilo | Familia | Peso | Tamanho | Line-height | Uso |
|---|---|---|---|---|---|
| Heading/App Name | Inter | 600 (SemiBold) | 16px | 24px | Nome do app no header |
| Column Title | Inter | 600 (SemiBold) | 16px | 24px | Titulo da coluna |
| Card Title | Inter | 600 (SemiBold) | 14px | 20px | Titulo do card |
| Body/Nav | Inter | 400 (Regular) | 14px | 20px | Itens de nav, metadados, descricao |
| Label/Input | Inter | 500 (Medium) | 14px | 18px | Labels, badge "+N" |
| Tag | Inter | 500 (Medium) | 12px | 18px | Texto das tags/badges |
| Counter | Inter | 400 (Regular) | 12px | 18px | Contagem de tarefas na coluna |

---

## Layout e Grid

- **Design width**: 1440 px
- **Breakpoint minimo recomendado**: 1280 px (sem alteracao de layout)
- **Sidebar**: largura fixa 224 px; altura 100vh - altura do header
- **Conteudo principal**: width: calc(100% - 224px); overflow-x: auto
- **Colunas**: largura fixa 378 px cada; nao flexiveis; separadas por gap de 16px (espaco entre x=572 e x=580, e entre x=958 e x=966, aferido das posicoes do Figma)
- **Area de abas**: fixada no topo do conteudo antes das colunas; height 52px
- **Altura das colunas**: 100% da altura disponivel apos o header e as abas; scroll interno independente

---

## Interacoes e Estados

### Card

| Interacao | Comportamento |
|---|---|
| Hover | Leve elevation: box-shadow `0 4px 12px rgba(0,0,0,0.08)`; cursor pointer |
| Drag (iniciando) | Opacidade 0.5 no card de origem; cursor grabbing; card "fantasma" segue o cursor |
| Drop (valido) | Coluna destino destaca borda `#7f56d9` 2px; card inserido na posicao |
| Drop (invalido) | Card retorna a posicao original com animacao |
| Click no menu "..." | Abre dropdown contextual: Editar, Mover para, Duplicar, Excluir |

### Botao "+" da Coluna

| Interacao | Comportamento |
|---|---|
| Hover | Background `#f4ebff`; borda `#7f56d9` |
| Click | Abre modal ou inline form para criacao de novo card |

### Abas de Filtro

| Estado | Comportamento |
|---|---|
| Ativa | Fundo `#7f56d9`; texto branco; pointer-events none |
| Hover (inativa) | Fundo `#f4ebff`; texto `#7f56d9` |
| Click | Navega ou filtra o conteudo; troca aba ativa |

### Input de Busca (Header)

| Estado | Comportamento |
|---|---|
| Default | Borda `#d5d7da`; placeholder visivel |
| Focus | Borda `#7f56d9`; ring externo `rgba(127,86,217,0.2)` 4px |
| Preenchido | Texto `#0a0d12` |

### Sidebar

| Estado | Comportamento |
|---|---|
| Item padrao | Texto `#0a0d12`; icone cinza |
| Item ativo/hover | Fundo `#f4ebff`; texto `#7f56d9`; icone `#7f56d9` |

### Estado Vazio de Coluna

- Exibir area pontilhada com mensagem "Nenhuma tarefa" e botao para adicionar
- Altura minima da coluna: 200px

### Estado de Loading

- Skeleton cards em cinza claro `#f5f5f5` animados com shimmer
- Numero de skeletons: 2 por coluna

---

## Estrutura de Dados Sugerida

```typescript
// Membros do projeto
interface Member {
  id: string;
  name: string;
  avatarUrl: string | null;
  initials: string; // fallback quando nao ha foto
}

// Tags/badges dos cards
interface Tag {
  id: string;
  label: string;
  variant: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';
}

// Card de tarefa
interface Card {
  id: string;
  columnId: string;
  title: string;
  description: string;
  dueDate: string | null;       // ISO 8601
  subtasks: {
    completed: number;
    total: number;
  };
  tags: Tag[];
  assignees: Member[];
  attachmentCount: number;
  commentCount: number;
  position: number;             // ordem dentro da coluna (inteiro)
  createdAt: string;
  updatedAt: string;
}

// Coluna do board
interface Column {
  id: string;
  boardId: string;
  name: string;                 // "Backlog" | "Pendentes" | "Concluidas" | custom
  taskCount: number;            // derivado de cards.length
  cards: Card[];
  position: number;             // ordem das colunas
}

// Board principal
interface Board {
  id: string;
  name: string;
  members: Member[];
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

// Estado da UI do board
interface BoardUIState {
  activeTab: 'board' | 'pendentes' | 'concluidas';
  searchQuery: string;
  draggingCardId: string | null;
  draggingFromColumnId: string | null;
}
```

---

## Stack Tecnologica Recomendada

Seguindo as convencoes do projeto (ESLint + Prettier, modulos single-responsibility, exports claros, build com bundler):

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework UI | React 18+ com TypeScript | Tipagem forte; ecossistema maduro |
| Estilizacao | Tailwind CSS | Classes utilitarias permitem mapear tokens do Figma diretamente |
| Drag & Drop | `@dnd-kit/core` + `@dnd-kit/sortable` | API moderna, acessivel, sem dependencias pesadas |
| Estado global | Zustand | Leve, sem boilerplate; adequado para BoardUIState |
| Estado do servidor | TanStack Query (React Query) | Cache, loading states e refetch automatico para dados do board |
| Icones | `lucide-react` | Inclui calendar, list, paperclip, message-square, plus, bell, search, more-horizontal |
| Avatares com fallback | Componente proprio com initials + fundo `#f4ebff` |  |
| Roteamento | React Router v6 | Rota `/board` → `<BoardPage>` |
| Build | Vite | Rapido; compativel com ESM; usa esbuild internamente |
| Linter/Formatter | ESLint + Prettier | Conforme CONVENTIONS.md |

---

## Criterios de Aceitacao

- [ ] A pagina renderiza em 1440px sem scroll horizontal no nivel do documento (apenas dentro das colunas e do board)
- [ ] O header exibe logo, campo de busca e controles do usuario em linha unica, altura exata 76px
- [ ] A sidebar tem largura 224px e exibe os 4 itens de navegacao com icones
- [ ] Tres colunas sao exibidas: "Backlog", "Pendentes" e "Concluidas" com contagem correta
- [ ] Cada coluna tem border-radius 12px apenas no topo
- [ ] Cards exibem: tags coloridas, titulo (SemiBold 14px), descricao (Regular 14px), data, progresso, avatares, contagem de anexos e comentarios
- [ ] As tags seguem as cores definidas na paleta (red, yellow, green)
- [ ] O botao "+" de cada coluna tem borda `#7f56d9` e radius 8px
- [ ] Ao hover no card, aparece box-shadow sem alterar posicao do layout
- [ ] Drag and drop funciona entre colunas e dentro da mesma coluna
- [ ] A aba "Board" e exibida com fundo `#7f56d9` e texto branco por padrao
- [ ] O grupo de avatares de membros exibe badge "+N" para excedentes
- [ ] O botao "+" de membros abre fluxo de adicionar membro
- [ ] Em viewport menor que 1280px, o board fica horizontalmente scrollavel
- [ ] Estado vazio de coluna exibe mensagem e botao de adicionar
- [ ] Skeleton loader e exibido enquanto os dados carregam

---

## Fora do Escopo

- Modal de detalhes do card (tela separada)
- Formulario de criacao de card (especificacao propria)
- Tela de configuracoes do board
- Autenticacao e fluxo de login
- Dark mode
- Versao mobile/responsiva abaixo de 1280px
- Edicao inline do titulo da coluna
- Exclusao de colunas

---

## Observacoes

- O Figma mostra o layout em posicao x=-63, ajustado para frame 1440px; na implementacao, centrar o conteudo com `max-width: 1440px; margin: 0 auto` ou tratar como full-width.
- A sidebar aparece parcialmente fora da area do frame no Figma (x=-63). Na implementacao, a sidebar deve comecar em x=0 e ter 224px.
- O campo de busca esta rotulado como "Email" no Figma, mas contextualmente funciona como busca de tarefas/filtro — deve ser implementado como campo de busca com placeholder adequado ao contexto do board.
- A imagem de preview do board esta disponivel em: `https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b25cbf3b-1a09-4800-87b8-40a1cb39c3ea`
