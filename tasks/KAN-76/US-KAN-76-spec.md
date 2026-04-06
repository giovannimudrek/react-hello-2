# Spec — KAN-76: Tela de board de gerenciamento de cards

## Problema
Os usuarios nao possuem uma interface visual para acompanhar o progresso de tarefas distribuidas em diferentes etapas de um fluxo de trabalho. Sem um board Kanban, e dificil identificar rapidamente em qual status cada tarefa se encontra e realizar movimentacoes entre etapas.

## Objetivo
Implementar uma tela de board no estilo Kanban (Trello-style) que permita ao usuario visualizar cards organizados em colunas por status, mover cards entre colunas, criar novos cards e excluir cards existentes, tudo em tempo real no estado local da aplicacao.

## Requisitos Funcionais
1. A tela exibe um board com 3 colunas fixas: "Para Fazer" (azul), "Em andamento" (amarelo) e "Concluido" (verde).
2. Cada coluna exibe seus cards com titulo e tag de categoria visiveis.
3. Cada coluna possui um badge circular no cabecalho com a contagem atual de cards.
4. O usuario pode mover um card entre colunas via drag-and-drop com feedback visual (ghost placeholder na origem, drop zone destacada no destino).
5. O usuario pode criar um novo card clicando em "+ Novo card" em qualquer coluna, preenchendo o titulo no modal e confirmando.
6. Tentativa de criar card com titulo vazio exibe mensagem de erro inline no modal sem submeter.
7. O usuario pode excluir um card existente (acao disponivel no card).
8. Coluna sem cards exibe estado vazio com mensagem orientativa.
9. Colunas com muitos cards exibem scroll interno sem quebrar o layout.

## Fluxo do Usuario
1. Usuario acessa a rota `/board` e visualiza o board com as 3 colunas e seus cards.
2. Usuario clica em "+ Novo card" em uma coluna — modal "Criar novo card" abre com indicador da coluna destino.
3. Usuario digita o titulo do card e clica em "Criar card" — card aparece imediatamente na coluna.
4. Se o usuario clicar em "Criar card" com campo vazio — mensagem de erro "O titulo nao pode ser vazio." aparece abaixo do input, input recebe borda vermelha 2px.
5. Usuario arrasta um card para outra coluna — coluna origem exibe ghost placeholder (borda tracejada roxa), coluna destino fica com fundo roxa claro (#F4EBFF) e borda solida 2px brand com drop zone; ao soltar, card move para nova coluna.
6. Usuario exclui um card — card e removido da coluna imediatamente.

## Escopo Tecnico
- Backend: nao (somente frontend, estado local da aplicacao)
- Frontend necessario: sim

---

## Frontend

### Stack
- React com TypeScript
- Tailwind CSS para estilizacao
- Estado gerenciado localmente via `useState` / `useReducer` (sem backend)
- Drag and drop: implementar com HTML5 Drag and Drop API nativa ou biblioteca `@hello-pangea/dnd` (recomendado para simplicidade e acessibilidade)

### Estrutura de Arquivos
```
src/
  features/
    board/
      BoardPage.tsx          — pagina principal, rota /board
      components/
        BoardColumn.tsx       — coluna do kanban
        BoardCard.tsx         — card individual
        AddCardModal.tsx      — modal de criacao de card
        CardTag.tsx           — componente de tag colorida
      hooks/
        useBoardState.ts      — hook com logica de estado do board
      types/
        board.types.ts        — interfaces TypeScript
```

### Componentes

| Componente | Arquivo | Descricao |
|-----------|---------|-----------|
| `BoardPage` | `features/board/BoardPage.tsx` | Pagina raiz do board; renderiza topbar, subbar e lista de colunas; gerencia estado global do board |
| `BoardColumn` | `features/board/components/BoardColumn.tsx` | Coluna individual; recebe `columnId`, `title`, `accentColor`, `cards[]`, callbacks de drop, criacao e exclusao; renderiza cards, estado vazio, botao add e badge |
| `BoardCard` | `features/board/components/BoardCard.tsx` | Card individual; recebe `id`, `title`, `tag`; draggable; emite evento de inicio de drag; possui botao de exclusao |
| `AddCardModal` | `features/board/components/AddCardModal.tsx` | Modal centralizado com overlay; campo de titulo, validacao inline, botoes Cancelar/Criar card, indicador de coluna destino |
| `CardTag` | `features/board/components/CardTag.tsx` | Badge de categoria colorida; recebe `label` e `variant` (feature, review, teste, design, devops, refactor, docs, default) |

### Tipos TypeScript

```typescript
// board.types.ts

export type TagVariant =
  | 'feature'
  | 'review'
  | 'teste'
  | 'design'
  | 'devops'
  | 'refactor'
  | 'docs'
  | 'default';

export interface BoardCardData {
  id: string;          // uuid gerado no frontend
  title: string;
  tag?: TagVariant;
}

export type ColumnId = 'todo' | 'inprogress' | 'done';

export interface BoardColumnData {
  id: ColumnId;
  title: string;
  accentColor: string; // hex
  badgeColor: string;  // hex
  cards: BoardCardData[];
}

export interface BoardState {
  columns: BoardColumnData[];
}
```

### Configuracao Inicial das Colunas

```typescript
const INITIAL_COLUMNS: BoardColumnData[] = [
  { id: 'todo',       title: 'Para Fazer',    accentColor: '#3882E0', badgeColor: '#3882E0', cards: [] },
  { id: 'inprogress', title: 'Em andamento',  accentColor: '#D4900D', badgeColor: '#D4900D', cards: [] },
  { id: 'done',       title: 'Concluido',     accentColor: '#22A863', badgeColor: '#22A863', cards: [] },
];
```

### Servicos / Hooks

| Hook | Arquivo | Metodos |
|------|---------|---------|
| `useBoardState` | `features/board/hooks/useBoardState.ts` | `columns`, `addCard(columnId, title)`, `deleteCard(columnId, cardId)`, `moveCard(cardId, fromColumnId, toColumnId)` |

O hook encapsula toda a logica de mutacao do estado. O estado e inicializado com dados de exemplo (os mesmos do Figma) para facilitar a visualizacao durante o desenvolvimento.

### Rota

Adicionar na configuracao de rotas da aplicacao:

```typescript
{ path: '/board', component: BoardPage }
```

### Layout (baseado no Figma — frame Idle, node 98:2)

**Topbar** (altura 64px, fundo branco, borda inferior 1px #E9EAEB):
- Acento vertical brand 4px x 64px no extremo esquerdo, cor #7F56D9
- Titulo "Kanban Board" — Inter Bold 20px, cor #0A0D12, left 24px, top 20px

**Subbar** (altura 56px, fundo branco, borda inferior 1px #E9EAEB, top 64px):
- Titulo "Board de Gerenciamento" — Inter Semi Bold 16px, cor #0A0D12, left 40px, top 82px (relativo a pagina)

**Area do board** (background #F5F5F5, padding top 144px, padding lateral 40px):
- Colunas dispostas em linha horizontal, gap 24px entre colunas
- Cada coluna: 300px de largura, border-radius 12px, border 1px #E9EAEB, background #F5F5F5

**Coluna — estrutura interna:**
- Acento de cor no topo: 4px de altura, largura total (posicao absoluta topo-esquerda, -1px para cobrir border)
- Cabecalho (altura 51px ate o divider):
  - Titulo da coluna: Inter Semi Bold 15px, #0A0D12, left 15px, top 14px
  - Badge circular: 28x22px, border-radius 11px, cor igual ao acento; numero: Inter Semi Bold 12px, #0A0D12, centralizado
  - Divider horizontal: 1px #E9EAEB, largura total, top 51px
- Lista de cards: padding 19px lateral dentro da coluna, gap vertical 8px entre cards, comeca em top 67px
- Botao "+ Novo card": sempre visivel no final da lista; 260x34px, border-radius 6px, border dashed 1px rgba(127,86,217,0.45), fundo branco; texto Inter Semi Bold 13px, cor #7F56D9, centralizado

**Card — estrutura (260x82px, node 98:16):**
- Fundo branco, border 1px #E9EAEB, border-radius 8px
- Sombra: `0px 4px 8px 0px rgba(10,13,18,0.1)`
- Titulo: Inter Medium 13px, #0A0D12, top 9px, left 11px, largura 236px, altura 20px, overflow hidden
- Tag: posicao top 51px, left 11px; background pill (border-radius 4px), largura 76px, altura 20px
- Texto da tag: Inter Semi Bold 11px, left 15px, top 53px

**Estado vazio da coluna (node 98:96):**
- Area 260x90px, background #FAFAFB, border-radius 8px, left 19px, top 67px
- Linha 1: "Nenhum card aqui ainda." — Inter Regular 12px, #717680, centralizada, top 18px relativo
- Linha 2: "Clique em '+ Novo card' para comecar." — Inter Regular 11px, #9999A6, centralizada, top 40px relativo

### Tags — Mapa de Cores

| Variante | Fundo | Texto |
|---------|-------|-------|
| feature  | #DCEAFC | #3882E0 |
| review   | #FFF3D6 | #D4900D |
| teste    | #D9F5E4 | #22A863 |
| design   | #F4EBFF | #7F56D9 |
| devops   | #D9F5E4 | #22A863 |
| refactor | #E9EAEB | #535862 |
| docs     | #E9EAEB | #535862 |
| default  | #E9EAEB | #535862 |

### Modal de Criacao (node 98:178 — frame Modal)

- Overlay: fundo rgba(0,0,0,0.4), cobre toda a tela (fixed inset-0)
- Modal: 440x310px, background branco, border-radius 12px, sombra `0px 20px 24px -4px rgba(10,13,18,0.2)`, centralizado na tela
- Titulo "Criar novo card": Inter Semi Bold 18px, #0A0D12, left 24px, top 24px
- Subtitulo: Inter Regular 13px, #535862, left 24px, top 52px, largura 392px
- Divider: 1px #E9EAEB, top 84px
- Label "Titulo do card *": Inter Medium 14px, #414651, left 24px, top 100px
- Input: 392x44px, left 24px, top 124px, border-radius 8px
  - Estado default: border 1px #E9EAEB, placeholder Inter Regular 14px, cor #717680
  - Estado erro: border 2px #C02C2C, placeholder cor #CC8080
- Mensagem de erro: "O titulo nao pode ser vazio." — Inter Medium 12px, #C02C2C, left 24px, top 175px (visivel somente apos tentativa de submit vazio)
- Botao "Cancelar": 185x40px, left 24px, top 216px, border-radius 8px, border 1px #7F56D9, fundo branco, texto Inter Semi Bold 14px, #7F56D9
- Botao "Criar card": 185x40px, left 231px, top 216px, border-radius 8px, fundo #7F56D9, texto Inter Semi Bold 14px, branco
- Indicador de coluna: 392x28px, left 24px, top 265px, background #F4EBFF, border-radius 6px, texto Inter Medium 12px, #7F56D9 — "Coluna: [nome da coluna]"

### Estados de Drag and Drop (node 98:193 — frame Drag)

**Coluna de origem (durante drag):**
- Layout normal, mas o card sendo arrastado e substituido por ghost placeholder
- Ghost placeholder: 260x82px, background rgba(229,226,249,0.5), border 1.5px dashed rgba(127,86,217,0.6), border-radius 8px

**Coluna de destino (durante drag sobre ela):**
- Background da coluna: #F4EBFF
- Border da coluna: 2px solid #7F56D9 (sobrepe a borda normal)
- Drop zone: 260x82px, background rgba(229,216,253,0.6), border 2px dashed #7F56D9, border-radius 8px, texto centralizado "Soltar aqui" Inter Semi Bold 13px, #7F56D9

**Card sendo arrastado (floating):**
- Border: 2px solid #7F56D9
- Sombra elevada: `0px 12px 28px 0px rgba(10,13,18,0.3)`
- Leve rotacao (4deg) para indicar que esta sendo segurado

### Estados da UI

- **Idle**: Board renderizado com colunas e cards normais, botao "+ Novo card" visivel em cada coluna
- **Coluna vazia**: Area de empty state com mensagem orientativa + botao "+ Novo card"
- **Modal aberto (input valido)**: Overlay + modal; input com borda padrao #E9EAEB
- **Modal aberto (erro de validacao)**: Overlay + modal; input com borda 2px #C02C2C + mensagem de erro visivel
- **Drag iniciado**: Ghost na coluna origem; card floating com rotacao e sombra elevada
- **Drag sobre destino**: Coluna destino com background #F4EBFF, borda brand 2px, drop zone com "Soltar aqui"
- **Drag concluido**: Card movido para nova coluna; badges de contagem atualizados; estados visuais resetados

---

## Referencia Visual (Figma)
- URL base: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma
- fileKey: `xXnK8j2N9C66BZTg3TKAyD`
- Frame Idle (estado padrao): nodeId `98:2`
- Frame Empty (coluna vazia): nodeId `98:62`
- Frame Modal (criacao com erro): nodeId `98:117`
- Frame Drag (drag and drop): nodeId `98:193`

O agente Dev DEVE usar `mcp__figma__get_design_context` com fileKey `xXnK8j2N9C66BZTg3TKAyD` e os nodeIds acima para implementar o frontend identico ao design.

## Criterios de Aceitacao
- [ ] A tela exibe um board com 3 colunas (Para Fazer, Em andamento, Concluido) cada uma com acento de cor no topo e badge de contagem no cabecalho.
- [ ] Cada coluna exibe seus cards com titulo e tag de categoria visiveis.
- [ ] O usuario pode mover um card entre colunas via drag-and-drop com feedback visual correto (ghost na origem, drop zone destacada no destino).
- [ ] O usuario pode criar um novo card em uma coluna especifica pelo botao "+ Novo card" que abre o modal.
- [ ] O usuario pode excluir um card existente.
- [ ] A tela reflete imediatamente a posicao atual de cada card (estado local).
- [ ] Coluna sem nenhum card exibe estado vazio com mensagem orientativa.
- [ ] Board com grande numero de cards em uma coluna exibe scroll interno na coluna sem quebrar o layout.
- [ ] Tentativa de criar card com titulo vazio exibe mensagem de validacao sem submeter.

## Fora do Escopo
- Tela de login ou autenticacao de usuario.
- Cadastro ou edicao de colunas (adicionar/remover/renomear colunas).
- Detalhamento interno do card (descricao, comentarios, anexos, responsavel).
- Notificacoes ou historico de movimentacoes.
- Integracao com servicos externos ou persistencia em backend.
- Responsividade para mobile (somente desktop, min-width 1024px).
