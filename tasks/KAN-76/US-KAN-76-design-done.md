# Design — KAN-76: Tela de board de gerenciamento de cards

## Ferramenta
Figma

## Telas criadas
- KAN-76 | Idle — board com cards — Estado padrao com 3 colunas e cards distribuidos
- KAN-76 | Empty — coluna sem cards — Coluna "Em andamento" vazia com estado vazio e botao de criacao
- KAN-76 | Modal — criar card (erro de validacao) — Modal aberto com campo vazio e mensagem de erro
- KAN-76 | Drag — mover card entre colunas — Card sendo arrastado com ghost e drop zone

## Design System utilizado
- **Cores**: brand primary #7F56D9, brand light #F4EBFF, text primary #0A0D12, text secondary #414651, text tertiary #535862, text placeholder #717680, border #E9EAEB, background page #F5F5F5, background white #FFFFFF, tag blue #3882E0, tag yellow #D49010, tag green #22A863, error #C02C2C
- **Tipografia**: Inter Regular (placeholders/body), Inter Medium (card titles/labels), Inter Semi Bold (headings/buttons/tags), Inter Bold (app title); tamanhos: 11px (tags), 12px (badges/hints), 13px (card titles/add-btn), 14px (modal labels/buttons), 15px (column titles), 16px (page title), 18px (modal title), 20px (app title)
- **Componentes**: Card (260x82px, border-radius 8px, drop shadow, border 1px #E9EAEB), Column (300px wide, radius 12px, accent bar 4px topo), Button Primary (fill #7F56D9, radius 8px, text branco), Button Outline (border brand, text brand), Input Default (border #E9EAEB, radius 8px), Input Error (border 2px #C02C2C), Modal (440x310px, radius 12px, shadow), Badge (radius 11px circular), Empty State (area cinza clara com texto orientativo)

## Links
- Arquivo Figma: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma
- Pagina Figma: KAN-76 — Tela de board de gerenciamento de cards
- Frame Idle: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma?node-id=98-2
- Frame Empty: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma?node-id=98-62
- Frame Modal: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma?node-id=98-117
- Frame Drag: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma?node-id=98-193
- Card Jira: KAN-76 (https://code-agents-brq.atlassian.net/browse/KAN-76)
- Comentario adicionado ao Jira: sim (ID 11119)

## Observacoes para o Frontend
- Layout Kanban horizontal com colunas de 300px, gap 24px, padding lateral 40px do board
- Cards com largura 260px (dentro da coluna com padding 20px de cada lado)
- Drag and drop: ao iniciar arraste, coluna origem exibe ghost placeholder (borda tracejada roxa) no lugar do card removido; coluna destino fica com fundo roxo claro (#F4EBFF), borda solida 2px brand (#7F56D9) e drop zone destacada
- Modal de criacao: centralizado com overlay 40% preto; campo com borda 2px vermelha (#C02C2C) quando submetido vazio
- Botao "+ Novo card": borda tracejada 5/5 com opacidade 45% da cor brand; sempre visivel no rodape de cada coluna
- Estado vazio da coluna: area cinza claro (#FAFAFB) com texto orientativo em duas linhas
- Acento de cor no topo de cada coluna (4px): azul para "Para Fazer", amarelo para "Em andamento", verde para "Concluido"
- Badge de contagem circular (radius 11px) no canto direito do cabecalho de cada coluna
- Responsividade: layout previsto para desktop (min-width 1024px); colunas com scroll interno em caso de muitos cards
