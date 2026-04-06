# Spec — KAN-75: Tela de cadastro e de login, visando que e um sistema de gerenciamento de cards

## Problema
O sistema Kanban nao possui mecanismo de autenticacao. Qualquer pessoa pode acessar o board diretamente, sem identidade ou personalizacao. O usuario nao tem como gerenciar seus proprios cards de forma segura.

## Objetivo
Criar telas de login e cadastro que permitam ao usuario se autenticar, protegendo o acesso ao board Kanban com React Router guards e gerenciamento de estado de sessao.

## Requisitos Funcionais
1. A tela de login deve conter campos de e-mail e senha e botao "Entrar".
2. A tela de cadastro deve conter campos de nome completo, e-mail e senha e botao "Criar conta".
3. Validacao de e-mail no frontend: formato RFC valido antes de submeter.
4. Validacao de senha no frontend: minimo 6 caracteres antes de submeter.
5. Campos invalidos devem exibir borda vermelha (#C0382D) e mensagem de erro inline abaixo do campo.
6. Credenciais incorretas no login exibem banner de erro vermelho com mensagem generica "E-mail ou senha invalidos. Verifique suas credenciais e tente novamente." — sem revelar qual dos dois esta errado.
7. E-mail ja cadastrado no cadastro exibe banner de erro vermelho com mensagem "Este e-mail ja esta em uso. Tente fazer login ou use outro e-mail." e campo e-mail com borda vermelha e erro inline "E-mail ja cadastrado no sistema".
8. Falha de conexao exibe banner laranja de aviso e o botao muda de texto para "Tentar novamente" — a tela nao trava.
9. Ambas as telas possuem link de navegacao entre si: login tem "Nao tem conta? Cadastre-se"; cadastro tem "Ja tem conta? Entrar".
10. Apos cadastro com sucesso, redirecionar para o board (/board) ou para o login (/login).
11. Apos login com sucesso, redirecionar para o board (/board).
12. As rotas do board sao protegidas: acesso sem autenticacao redireciona para /login.

## Fluxo do Usuario

### Login
1. Usuario acessa /login.
2. Usuario preenche e-mail e senha.
3. Usuario clica em "Entrar".
4. Se campos invalidos: exibe erros inline, nao submete.
5. Se credenciais incorretas: exibe banner de erro vermelho.
6. Se falha de conexao: exibe banner laranja, botao vira "Tentar novamente".
7. Se sucesso: redireciona para /board.
8. Se usuario clicar em "Cadastre-se": navega para /cadastro.

### Cadastro
1. Usuario acessa /cadastro.
2. Usuario preenche nome completo, e-mail e senha.
3. Usuario clica em "Criar conta".
4. Se campos invalidos: exibe erros inline, nao submete.
5. Se e-mail ja existente: exibe banner de erro vermelho e erro inline no campo e-mail.
6. Se falha de conexao: exibe banner laranja, botao vira "Tentar novamente".
7. Se sucesso: redireciona para /board (ou /login).
8. Se usuario clicar em "Entrar": navega para /login.

## Escopo Tecnico
- Backend: nao (somente frontend; autenticacao mock ou integrada a API existente se houver)
- Frontend necessario: sim

---

## Frontend

### Stack
React 18 + TypeScript + Tailwind CSS + React Router DOM v6.

### Estrutura de Arquivos Recomendada
```
src/
  features/
    auth/
      pages/
        LoginPage.tsx
        RegisterPage.tsx
      components/
        AuthCard.tsx
        InputField.tsx
        AlertBanner.tsx
      hooks/
        useLogin.ts
        useRegister.ts
      services/
        authService.ts
      context/
        AuthContext.tsx
      types/
        auth.types.ts
  router/
    AppRouter.tsx
    ProtectedRoute.tsx
```

### Componentes
| Componente | Rota | Descricao |
|---|---|---|
| `LoginPage` | /login | Pagina de login com formulario de e-mail e senha |
| `RegisterPage` | /cadastro | Pagina de cadastro com formulario de nome, e-mail e senha |
| `AuthCard` | — | Container branco centralizado (card) reutilizado em login e cadastro |
| `InputField` | — | Campo de input com label, placeholder, estado de erro (borda vermelha + mensagem inline) |
| `AlertBanner` | — | Banner de alerta reaproveitavel com variantes: error (#FFF3F3 / #C0382D) e warning (#FFF8E9 / #985B08) |
| `ProtectedRoute` | — | Wrapper de rota que redireciona para /login se nao autenticado |
| `AppRouter` | — | Configuracao de rotas: /login, /cadastro, /board (protegida) |

### Servicos
| Servico | Metodos |
|---|---|
| `authService` | `login(email: string, password: string): Promise<AuthResponse>` |
| `authService` | `register(name: string, email: string, password: string): Promise<AuthResponse>` |

Tipos:
```typescript
interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

type AuthError =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_EXISTS'
  | 'CONNECTION_ERROR'
  | 'VALIDATION_ERROR';
```

### Context de Autenticacao
`AuthContext` deve:
- Armazenar o estado do usuario autenticado: `user: User | null`.
- Expor funcoes `login()`, `register()`, `logout()`.
- Persistir token em `localStorage` para manter sessao apos refresh.
- Ser consumido pelo `ProtectedRoute` para verificar autorizacao.

### Layout (baseado no Figma)

**Pagina (fundo):** `background: #F5F5F7`, tela inteira, centralizacao vertical e horizontal do card.

**AuthCard:**
- background: #FFFFFF
- border-radius: 12px
- padding: 40px
- box-shadow: 0px 20px 24px -4px rgba(10,13,18,0.1)
- display: flex, flex-direction: column, gap: 20px
- width: 440px (card tem 360px de conteudo + 40px padding dos dois lados)

**Hierarquia interna do card (de cima para baixo):**
1. Titulo (h1): 24px / Semi Bold / #0A0D12
2. Subtitulo: 14px / Regular / #535862
3. AlertBanner (condicional — aparece apenas em estado de erro/aviso de nivel de formulario)
4. Campos de input (InputField)
5. Botao primario
6. Linha de navegacao (link para a outra tela)

### Campos e Interacoes

**InputField:**
- Label: 14px / Medium / #414651
- Input: border 1px solid #E9EAEB, border-radius 8px, padding 14px horizontal / 10px vertical
- Input texto: 16px / Regular / #0A0D12
- Placeholder: 16px / Regular / #717680
- Estado erro: border 1px solid #C0382D
- Mensagem de erro inline: 12px / Regular / #C0382D, aparece abaixo do input
- Gap entre label e input: 6px

**Botao primario:**
- background: #7F56D9
- color: #FCFAFF
- border-radius: 8px
- height: 40px
- padding: 10px 18px
- font: 14px / Semi Bold
- width: 100% (360px dentro do card)
- Estado loading: desabilitar clique, mostrar indicador visual
- Quando erro de conexao: texto muda para "Tentar novamente"

**AlertBanner:**
- border-radius: 8px
- padding: 10px 12px
- width: 360px
- font: 14px / Regular
- Variante error: background #FFF3F3, border 1px solid #F4C7C5, cor texto #C03829
- Variante warning: background #FFF8E9, border 1px solid #F3D2A3, cor texto #985B08

**Linha de navegacao:**
- font: 14px
- Texto: Regular / #535862
- Link: Semi Bold / #7F56D9, clicavel (cursor pointer)
- Alinhamento: center

### Formularios

**Login:**
- Campo "E-mail" (type="email"): obrigatorio, validacao formato RFC
- Campo "Senha" (type="password"): obrigatorio, minimo 6 chars
- Botao "Entrar"
- NavLine: "Nao tem conta? [Cadastre-se]"

**Cadastro:**
- Campo "Nome completo" (type="text"): obrigatorio
- Campo "E-mail" (type="email"): obrigatorio, validacao formato RFC
- Campo "Senha" (type="password"): obrigatorio, minimo 6 chars, placeholder "Minimo 6 caracteres"
- Botao "Criar conta"
- NavLine: "Ja tem conta? [Entrar]"

### Estados da UI

**Login — Idle:**
Campos vazios com placeholder, botao "Entrar" habilitado.

**Login — Loading:**
Botao desabilitado (opacity reduzida ou spinner), campos nao editaveis.

**Login — Erro de credenciais:**
AlertBanner variante error com "E-mail ou senha invalidos. Verifique suas credenciais e tente novamente."
Ambos os campos com borda vermelha.
Botao "Entrar".

**Login — Erro de conexao:**
AlertBanner variante warning com "Nao foi possivel conectar ao servidor. Verifique sua internet e tente novamente."
Campos com borda padrao (sem erro de campo).
Botao muda para "Tentar novamente".

**Login — Erro de validacao (frontend):**
Sem AlertBanner de nivel de formulario.
Campos invalidos com borda vermelha e mensagem inline.
Botao "Entrar" bloqueado (submit nao ocorre).

**Cadastro — Idle:**
Campos vazios, botao "Criar conta" habilitado.

**Cadastro — Loading:**
Botao desabilitado, campos nao editaveis.

**Cadastro — Erro de validacao (frontend):**
Campos e-mail e/ou senha com borda vermelha e mensagem inline:
- E-mail invalido: "Insira um e-mail valido (ex: nome@email.com)"
- Senha curta: "A senha deve ter no minimo 6 caracteres"

**Cadastro — E-mail ja existente (backend):**
AlertBanner variante error com "Este e-mail ja esta em uso. Tente fazer login ou use outro e-mail."
Campo e-mail com borda vermelha e erro inline "E-mail ja cadastrado no sistema".

**Cadastro — Erro de conexao:**
AlertBanner variante warning.
Botao muda para "Tentar novamente".

### Protecao de Rotas (ProtectedRoute)
```
ProtectedRoute:
  - Le o estado do AuthContext
  - Se user === null: <Navigate to="/login" replace />
  - Se user !== null: renderiza o children (o board)
```

Rotas publicas: /login, /cadastro
Rotas protegidas: /board (e subrotas)

---

## Referencia Visual (Figma)
- URL: https://www.figma.com/design/xXnK8j2N9C66BZTg3TKAyD/MCP-Figma
- fileKey: xXnK8j2N9C66BZTg3TKAyD
- nodeId Login inicial: 93:3
- nodeId Login erro credenciais: 93:20
- nodeId Login erro conexao: 93:107
- nodeId Cadastro inicial: 93:39
- nodeId Cadastro erro validacao: 93:60
- nodeId Cadastro email ja existente: 93:83
- O agente Execute DEVE usar `mcp__figma__get_design_context` com estes dados para implementar o frontend identico ao design.

## Criterios de Aceitacao
- [ ] A tela de cadastro contem campos de nome, e-mail e senha com validacao de formato de e-mail e senha minima de 6 caracteres.
- [ ] Ao concluir o cadastro com dados validos, o usuario e redirecionado para o board ou para o login.
- [ ] A tela de login contem campos de e-mail e senha com botao de entrar.
- [ ] Ao realizar login com credenciais validas, o usuario e redirecionado para o board de gerenciamento de cards.
- [ ] Mensagens de erro claras sao exibidas para campos invalidos ou credenciais incorretas em ambas as telas.
- [ ] Ambas as telas possuem link de navegacao entre si.

## Fora do Escopo
- Recuperacao ou redefinicao de senha (esqueci minha senha).
- Login social (Google, GitHub, Facebook, etc.).
- Verificacao de e-mail por token ou link.
- Perfil de usuario ou edicao de dados apos cadastro.
- Logica de autorizacao por papeis (admin, viewer, etc.).
- Implementacao de backend real (pode ser mock/localStorage para esta entrega se nao houver API).
