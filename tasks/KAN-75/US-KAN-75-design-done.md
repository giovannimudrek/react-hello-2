# Design — KAN-75: Tela de cadastro e de login, visando que e um sistema de gerenciamento de cards

## Ferramenta
Figma

## Pagina criada no Figma
KAN-75 — Tela de cadastro e de login

## Telas criadas
1. **Login — Estado inicial** (nodeId: 93:3) — Formulario de login limpo com campos e-mail e senha, botao Entrar e link para cadastro
2. **Login — Erro de credenciais** (nodeId: 93:20) — Banner de erro vermelho + campos com borda vermelha + mensagem generica "E-mail ou senha invalidos"
3. **Cadastro — Estado inicial** (nodeId: 93:39) — Formulario com campos nome completo, e-mail, senha (placeholder "Minimo 6 caracteres"), botao Criar conta e link para login
4. **Cadastro — Erro de validacao** (nodeId: 93:60) — Campos e-mail e senha com erro inline abaixo de cada campo (formato invalido, senha curta)
5. **Cadastro — Email ja existente** (nodeId: 93:83) — Banner de erro no topo do card + campo e-mail destacado + mensagem "E-mail ja cadastrado no sistema"
6. **Login — Erro de conexao** (nodeId: 93:107) — Banner de aviso laranja "Nao foi possivel conectar ao servidor" + botao "Tentar novamente"

## Design System utilizado
- **Cores**:
  - Brand Primary: #7F56D9 (botao primario, links, focus)
  - Brand Inverse: #FCFAFF (texto no botao primario)
  - Text/Neutral/Primary: #0A0D12 (titulos)
  - Text/Neutral/Secondary: #414651 (labels de input)
  - Text/Neutral/Tertiary: #535862 (subtitulos, textos de apoio)
  - Text/Neutral/Quaternary: #717680 (placeholders)
  - Border/Neutral/Primary: #E9EAEB (borda de input padrao)
  - Background/Neutral/Primary: #FFFFFF (fundo do card e inputs)
  - Background page: #F5F5F7 (fundo da tela)
  - Error: #C0382D (borda e texto de erro), bg: #FFF3F3
  - Warning: #985B08 (texto de aviso), bg: #FFF8E9
  - Success/accessible: #20955B, bg: #EEFCF5

- **Tipografia**: Inter (fonte do Design System Vitrine)
  - Titulo do card: 24px / Semi Bold (Display XS)
  - Subtitulo/descricao: 14px / Regular (Text SM)
  - Label de input: 14px / Medium (Text SM Medium)
  - Texto de input: 16px / Regular (Text MD)
  - Placeholder: 16px / Regular, cor #717680
  - Mensagem de erro inline: 12px / Regular (Text XS)
  - Texto de botao: 14px / Semi Bold
  - Link de navegacao: 14px / Semi Bold, cor #7F56D9

- **Componentes base do Design System Vitrine aplicados**:
  - Input field: border-radius 8px, padding 14px horizontal / 10px vertical, border 1px
  - Button/Primary: bg #7F56D9, border-radius 8px, height 40px, padding 18px horizontal / 10px vertical
  - Alert banner: border-radius 8px, preenchido com fundo semantico (erro/aviso)
  - Card container: border-radius 12px, bg branco, shadow DROP_SHADOW 0/20/24/-4 rgba(10,13,18,0.1)

## Links
- Arquivo Figma (MCP-Figma): https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma
- Design System (somente leitura): https://www.figma.com/design/R5xegLRiow00Mwgq392bpt/Design-System-Vitrine
- Card Jira: KAN-75 — https://code-agents-brq.atlassian.net/browse/KAN-75
- Comentario adicionado ao Jira: sim (comment id: 11118)

## Observacoes para o Frontend
- Todos os frames sao 1440x900px (desktop first)
- Os inputs em estado de erro devem ter border vermelha (#C0382D) e mensagem de erro abaixo do campo
- O banner de alerta deve aparecer acima dos campos quando o erro for de nivel de formulario (credenciais invalidas, email ja existente, erro de conexao)
- Mensagem de erro de login e generica ("E-mail ou senha invalidos") — nao revelar qual dos dois esta errado
- O link de navegacao entre login e cadastro deve estar sempre visivel abaixo do botao primario
- Validacao de senha: minimo 6 caracteres — validado no frontend antes de submeter
- Validacao de e-mail: formato RFC valido — validado no frontend antes de submeter
- Erro de conexao: exibir banner laranja, botao muda para "Tentar novamente", nao travar a tela
- O estado de autenticacao deve proteger as rotas do board (React Router guards)
