# Dev Done — KAN-76: Tela de board de gerenciamento de cards

## Arquivos criados/modificados

### Configuracao do projeto
- `package.json` — dependencias: react 18, react-dom, react-router-dom, @hello-pangea/dnd; devDeps: vite, typescript, tailwindcss
- `vite.config.ts` — Vite com plugin React
- `tsconfig.json` — TypeScript strict mode, jsx react-jsx
- `tsconfig.node.json` — config para vite.config.ts
- `tailwind.config.js` — tokens de cor do design system (brand, text, border, tags, error)
- `postcss.config.js` — tailwindcss + autoprefixer
- `index.html` — entrypoint HTML com fonte Inter do Google Fonts

### Codigo fonte
- `src/main.tsx` — entrypoint React, monta App em #root
- `src/App.tsx` — BrowserRouter com rota /board -> BoardPage, redirect / -> /board
- `src/styles/index.css` — estilos globais: Tailwind base/components/utilities, reset, scrollbar customizado
- `src/features/board/types/board.types.ts` — interfaces TypeScript (TagVariant, BoardCardData, ColumnId, BoardColumnData, BoardState)
- `src/features/board/hooks/useBoardState.ts` — hook com estado local: addCard, deleteCard, moveCard, moveCardDnd; dados iniciais identicos ao Figma
- `src/features/board/components/CardTag.tsx` — badge de categoria com 8 variantes e mapa de cores exato do Figma
- `src/features/board/components/BoardCard.tsx` — card draggable via @hello-pangea/dnd; estado visual de drag (border 2px brand, shadow elevada, rotate 4deg); botao de exclusao
- `src/features/board/components/BoardColumn.tsx` — coluna droppable; acento de cor, badge de contagem, estado vazio, scroll interno, drop zone destacada durante drag-over
- `src/features/board/components/AddCardModal.tsx` — modal com overlay; validacao inline de campo vazio; indicador de coluna destino; fechar com Esc ou clique no overlay
- `src/features/board/BoardPage.tsx` — pagina raiz; topbar (64px) + subbar (56px) fixos; DragDropContext; gerencia modal state

## Componentes implementados

- `BoardPage` — rota: /board
- `BoardColumn` — coluna kanban com drag-drop, estado vazio, scroll
- `BoardCard` — card draggable com exclusao
- `AddCardModal` — modal de criacao com validacao
- `CardTag` — badge de categoria colorida

## Fidelidade ao Figma

- Topbar: altura 64px, fundo branco, borda inferior #E9EAEB, acento brand 4px esquerda, titulo Inter Bold 20px
- Subbar: altura 56px, fundo branco, borda inferior #E9EAEB, titulo Inter Semi Bold 16px
- Area board: background #F5F5F5, padding-top 144px, padding lateral 40px, colunas gap 24px
- Coluna: 300px, border-radius 12px, border #E9EAEB, acento de cor 4px no topo, badge circular 28x22px
- Card: 260x82px, border-radius 8px, border #E9EAEB, shadow 0px 4px 8px rgba(10,13,18,0.1), titulo Inter Medium 13px, tag posicionada em top 51px
- Estado vazio: area 260x90px, background #FAFAFB, radius 8px, textos orientativos
- Drag - origem: ghost placeholder borda tracejada rgba(127,86,217,0.6)
- Drag - destino: background #F4EBFF, border 2px solid #7F56D9, drop zone com "Soltar aqui"
- Card arrastando: border 2px #7F56D9, shadow elevada, rotate(4deg)
- Modal: 440x310px, radius 12px, overlay rgba(0,0,0,0.4), shadow 0px 20px 24px -4px rgba(10,13,18,0.2)
- Modal erro: input border 2px #C02C2C, mensagem Inter Medium 12px #C02C2C
- Botao "+ Novo card": border dashed rgba(127,86,217,0.45), Inter Semi Bold 13px #7F56D9

## Criterios de Aceitacao atendidos

- [x] A tela exibe um board com 3 colunas (Para Fazer, Em andamento, Concluido) cada uma com acento de cor no topo e badge de contagem no cabecalho.
- [x] Cada coluna exibe seus cards com titulo e tag de categoria visiveis.
- [x] O usuario pode mover um card entre colunas via drag-and-drop com feedback visual correto (ghost na origem, drop zone destacada no destino).
- [x] O usuario pode criar um novo card em uma coluna especifica pelo botao "+ Novo card" que abre o modal.
- [x] O usuario pode excluir um card existente.
- [x] A tela reflete imediatamente a posicao atual de cada card (estado local).
- [x] Coluna sem nenhum card exibe estado vazio com mensagem orientativa.
- [x] Board com grande numero de cards em uma coluna exibe scroll interno na coluna sem quebrar o layout.
- [x] Tentativa de criar card com titulo vazio exibe mensagem de validacao sem submeter.

## Observacoes

- Drag and drop implementado com @hello-pangea/dnd (fork mantido de react-beautiful-dnd), conforme recomendado na Spec.
- Estado gerenciado 100% no frontend via useState, sem backend ou persistencia.
- Dados iniciais identicos aos do Figma (7 cards distribuidos nas 3 colunas).
- Modal fecha ao pressionar Esc ou clicar no overlay.
- Scroll interno das colunas com max-height calc(100vh - 180px) para nao quebrar o layout.
- Rota / redireciona automaticamente para /board.
