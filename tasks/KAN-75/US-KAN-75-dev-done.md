# Dev Done — KAN-75: Tela de cadastro e de login

## Arquivos criados/modificados

### Configuracao
- `vite.config.ts` — configuracao Vite com plugin React
- `tsconfig.json` — configuracao TypeScript strict mode
- `tailwind.config.js` — tokens de design do Figma mapeados como custom colors/shadows
- `postcss.config.js` — autoprefixer + tailwindcss
- `index.html` — atualizado com div#root e script type=module apontando para /src/main.tsx

### Entrypoint
- `src/main.tsx` — ReactDOM.createRoot com StrictMode
- `src/App.tsx` — re-exporta AppRouter
- `src/styles/index.css` — Google Fonts Inter, @tailwind base/components/utilities, reset CSS

### Auth — Tipos
- `src/features/auth/types/auth.types.ts` — interfaces User, AuthResponse, AuthContextValue; type AuthError

### Auth — Service
- `src/features/auth/services/authService.ts` — mock com localStorage: login(), register(), logout(), getStoredSession()

### Auth — Context
- `src/features/auth/context/AuthContext.tsx` — AuthProvider com useState + useEffect para restaurar sessao; expoe useAuth()

### Auth — Hooks
- `src/features/auth/hooks/useLogin.ts` — estado do formulario, validacao frontend, submit com tratamento de INVALID_CREDENTIALS / CONNECTION_ERROR
- `src/features/auth/hooks/useRegister.ts` — estado do formulario, validacao frontend, submit com tratamento de EMAIL_ALREADY_EXISTS / CONNECTION_ERROR

### Auth — Componentes
- `src/features/auth/components/AuthCard.tsx` — container branco 440px, border-radius 12px, shadow, gap 20px
- `src/features/auth/components/InputField.tsx` — label + input + mensagem de erro inline; borda vermelha em estado de erro
- `src/features/auth/components/AlertBanner.tsx` — variante error (#FFF3F3/#F4C7C5/#C03829) e warning (#FFF8E9/#F3D2A3/#985B08)

### Auth — Pages
- `src/features/auth/pages/LoginPage.tsx` — rota /login
- `src/features/auth/pages/RegisterPage.tsx` — rota /cadastro

### Router
- `src/router/AppRouter.tsx` — BrowserRouter com rotas /login, /cadastro, /board (protegida), fallback para /login
- `src/router/ProtectedRoute.tsx` — redireciona para /login se user === null

### Board
- `src/features/board/BoardPlaceholder.tsx` — placeholder de /board com boas-vindas e botao logout

## Componentes implementados
- `LoginPage` — rota: /login
- `RegisterPage` — rota: /cadastro
- `AuthCard` — componente compartilhado (sem rota)
- `InputField` — componente compartilhado (sem rota)
- `AlertBanner` — componente compartilhado (sem rota)
- `ProtectedRoute` — wrapper de rota protegida
- `AppRouter` — configuracao de rotas
- `BoardPlaceholder` — rota: /board (placeholder protegido)

## Fidelidade ao Figma

### Login — Estado inicial (93:3)
- Fundo pagina: #F5F5F7, cartao centralizado verticalmente e horizontalmente
- AuthCard: bg #FFFFFF, border-radius 12px, padding 40px, box-shadow 0px 20px 24px -4px rgba(10,13,18,0.1), width 440px
- Titulo: "Entrar na sua conta" — 24px / Semi Bold (600) / #0A0D12
- Subtitulo: "Bem-vindo de volta!" — 14px / Regular / #535862
- Campos: label 14px/Medium/#414651, input border #E9EAEB, placeholder #717680, texto #0A0D12
- Botao "Entrar": bg #7F56D9, cor #FCFAFF, height 40px, border-radius 8px, 14px/SemiBold, width 360px
- NavLine: "Nao tem conta? Cadastre-se" — link em #7F56D9

### Login — Erro de credenciais (93:20)
- AlertBanner variante error acima dos campos
- Ambos os campos com border #C0382D (sem mensagem inline — banner ja informa)
- Mensagem: "E-mail ou senha invalidos. Verifique suas credenciais e tente novamente."

### Login — Erro de conexao (93:107)
- AlertBanner variante warning
- Botao muda para "Tentar novamente"
- Campos sem borda de erro

### Cadastro — Estado inicial (93:39)
- Titulo: "Criar sua conta" — 24px / Semi Bold
- 3 campos: Nome completo, E-mail, Senha (placeholder "Minimo 6 caracteres")
- Botao "Criar conta"
- NavLine: "Ja tem conta? Entrar"

### Cadastro — Erro de validacao (93:60)
- Campos invalidos com border #C0382D e mensagem inline 12px/#C0382D

### Cadastro — Email ja existente (93:83)
- AlertBanner variante error com mensagem especifica
- Campo E-mail com border vermelha + erro inline "E-mail ja cadastrado no sistema"

## Criterios de Aceitacao atendidos
- [x] A tela de cadastro contem campos de nome, e-mail e senha com validacao de formato de e-mail e senha minima de 6 caracteres
- [x] Ao concluir o cadastro com dados validos, o usuario e redirecionado para o board (/board)
- [x] A tela de login contem campos de e-mail e senha com botao de entrar
- [x] Ao realizar login com credenciais validas, o usuario e redirecionado para o board de gerenciamento de cards
- [x] Mensagens de erro claras sao exibidas para campos invalidos ou credenciais incorretas em ambas as telas
- [x] Ambas as telas possuem link de navegacao entre si

## Observacoes
- Autenticacao mock via localStorage (sem backend real) conforme previsto na Spec
- Senhas armazenadas como btoa (base64) — suficiente para mock, sem pretensao de seguranca real
- Sessao persistida em localStorage (kanban_token + kanban_user) e restaurada no AuthProvider
- ProtectedRoute aguarda isLoading (session restore) antes de redirecionar, evitando flash de /login
- Spinner no botao durante estado loading para feedback visual
- `display: contents` no form evita quebra do layout flex do AuthCard
- Tailwind configurado com tokens do design system do Figma (pode ser usado em futuras features)
