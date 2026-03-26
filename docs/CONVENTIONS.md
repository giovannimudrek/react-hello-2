# Conventions

## Technology Stack
- HTML5 semantico (header, main, section, nav, footer, article)
- CSS puro com custom properties (CSS variables) para design tokens
- JavaScript Vanilla (sem frameworks externos)
- Sem dependencias de build step
- Mobile-first e responsivo

## Nomenclatura
- Classes CSS: kebab-case, metodologia BEM (bloco__elemento--modificador)
- IDs: kebab-case descritivos
- Variaveis JS: camelCase
- Constantes JS: UPPER_SNAKE_CASE

## Design Tokens (Figma Ferramenta Trello)
- Cor de fundo: #f5f5f5
- Superficie: #ffffff
- Borda: #e9eaeb
- Borda secundaria: #d5d7da
- Texto primario: #0a0d12
- Texto secundario: #414651
- Texto terciario: #717680
- Marca: #7f56d9
- Marca clara: #f4ebff
- Tag vermelha: bg #fef3f2 / text #d92d20
- Tag amarela: bg #fffaeb / text #dc6803
- Tag verde: bg #ecfdf3 / text #039855

## Layout
- Header: 76px altura
- Sidebar: 224px largura
- Colunas kanban: 378px largura
- Cards: border-radius 16px
- Fonte: Inter (Google Fonts)

## Arquivo de saida
- Arquivo unico auto-contido: reports/board.html
- CSS e JS inline dentro do HTML
