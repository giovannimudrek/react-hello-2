# Spec — LK-31: Implementar tela de cadastro

## Problema
Usuarios novos nao possuem um fluxo de auto-cadastro na plataforma BRQ Digital. Sem uma tela de registro, so e possivel acessar o sistema com contas pre-criadas manualmente.

## Objetivo
Implementar a tela de cadastro de usuario em dois passos (Dados Pessoais e Dados da Empresa), seguindo fielmente o Design System BRQ definido no Figma, com validacoes no frontend antes do envio ao backend.

## Requisitos Funcionais
1. Exibir formulario de cadastro dividido em duas etapas sequenciais.
2. Etapa 1 (Dados Pessoais): campos Nome completo, E-mail, Senha e Confirmar senha, indicador de forca de senha, botao "Continuar".
3. Etapa 2 (Dados da Empresa): campos Nome da empresa, CNPJ, Telefone, Cargo/Funcao (select), checkboxes de aceite de Termos e opt-in de e-mail, botoes "Voltar" e "Criar conta".
4. Validacoes obrigatorias em todos os campos antes do envio; mensagens de erro visiveis sob cada campo invalido.
5. Indicador visual de forca de senha (fraca / media / forte) exibido abaixo dos campos de senha na Etapa 1.
6. Indicador de progresso (barra e label "ETAPA X DE 2") visivel no painel de formulario.
7. Ao submeter com sucesso, exibir feedback de confirmacao ao usuario (toast ou pagina de sucesso).
8. Ao receber erro da API (ex.: e-mail ja cadastrado), exibir mensagem de erro contextual.
9. Em caso de falha de conexao, exibir mensagem de erro de rede com possibilidade de nova tentativa.
10. Botao/link "Entrar" presente nas duas etapas, navegando para a tela de login.
11. Layout responsivo conforme Design System BRQ.

## Fluxo do Usuario
1. Usuario acessa a rota `/cadastro` (Etapa 1 — Dados Pessoais).
2. Usuario preenche Nome completo, E-mail, Senha, Confirmar senha e clica em "Continuar".
3. Sistema valida os campos; se invalido, exibe erros sem avancar.
4. Se valido, exibe Etapa 2 — Dados da Empresa.
5. Usuario preenche Nome da empresa, CNPJ, Telefone, Cargo/Funcao, marca "Aceito os Termos".
6. Usuario clica em "Criar conta"; sistema envia os dados ao backend.
7. Em sucesso: exibe confirmacao e redireciona (ex.: para a tela de login ou dashboard).
8. Em erro: exibe mensagem de erro e permite correcao.
9. A qualquer momento, o usuario pode clicar em "Entrar" para ir ao login, ou "Voltar" na Etapa 2 para retornar a Etapa 1.

## Escopo Tecnico
- Backend: nao (somente frontend — o endpoint de registro ja deve existir ou sera mockado)
- Frontend necessario: sim

---

## Frontend

### Componentes
| Componente | Rota | Descricao |
|-----------|------|-----------|
| `CadastroComponent` | `/cadastro` | Container principal que gerencia as etapas (passo 1 e passo 2) via controle de estado interno |
| `CadastroEtapa1Component` | (filho de CadastroComponent) | Formulario de Dados Pessoais — Nome, E-mail, Senha, Confirmar senha, indicador de forca |
| `CadastroEtapa2Component` | (filho de CadastroComponent) | Formulario de Dados da Empresa — Nome empresa, CNPJ, Telefone, Cargo, Checkboxes |

Estrutura de pastas sugerida:
```
frontend/src/app/features/cadastro/
  cadastro.component.ts
  cadastro.component.html
  cadastro.component.scss
  etapa1/
    cadastro-etapa1.component.ts
    cadastro-etapa1.component.html
    cadastro-etapa1.component.scss
  etapa2/
    cadastro-etapa2.component.ts
    cadastro-etapa2.component.html
    cadastro-etapa2.component.scss
```

### Servicos
| Servico | Metodos |
|---------|---------|
| `AuthService` | `register(dados: CadastroPayload): Observable<void>` — envia os dados combinados das duas etapas ao endpoint de registro |

Modelo de dados:
```typescript
interface CadastroEtapa1Form {
  nomeCompleto: string;   // obrigatorio
  email: string;          // obrigatorio, formato e-mail valido
  senha: string;          // obrigatorio, minimo 8 caracteres
  confirmarSenha: string; // obrigatorio, deve ser identico a senha
}

interface CadastroEtapa2Form {
  nomeEmpresa: string;    // obrigatorio
  cnpj: string;           // obrigatorio, mascara 00.000.000/0001-00
  telefone: string;       // obrigatorio, mascara (00) 00000-0000
  cargo: string;          // obrigatorio, select
  aceitaTermos: boolean;  // obrigatorio true para submeter
  receberNovidades: boolean; // opcional
}

interface CadastroPayload extends CadastroEtapa1Form, CadastroEtapa2Form {}
```

### Layout (baseado no Figma)

**Estrutura geral (desktop — 1440px de largura total):**
- Dois paineis lado a lado, ocupando 100% da altura da viewport (min-height: 900px).
- Painel esquerdo (Brand Panel): largura fixa de 480px, fundo laranja (#ff7402), conteudo decorativo + copy motivacional.
- Painel direito (Form Panel): largura restante (960px / flex: 1), fundo branco, conteudo do formulario centralizado com largura maxima de 440px.

**Painel esquerdo (Brand Panel) — identico nas duas etapas:**
- Header: logotipo "BRQ" (box laranja transparente, 44x44px, borda-radius 10px) + texto "BRQ Digital" ao lado.
- Card de preview de formulario (Etapa 1) ou lista de features (Etapa 2) — posicionado em top: 175px.
- Titulo em bold 30px e subtitulo em 14px/opacity 75%.
- Rodape: indicador de etapa ("Etapa X de 2") + barra de progresso (largura 180px, preenchimento proporcional).

**Painel direito (Form Panel):**
- Label de etapa: "ETAPA X DE 2" em uppercase, cor #cc5c02, font-size 11px, font-weight semibold.
- Barra de progresso: height 4px, cor de fundo #e9eaeb, fill laranja #ff7402, largura 440px. Etapa 1: 50% preenchido. Etapa 2: 100% preenchido.
- Titulo da etapa: font-size 26px, font-weight bold, cor #0a0d12.
- Subtitulo descritivo: font-size 14px, cor #535862.
- Campos: width 440px, height 44px, border 1px solid #d5d7da, border-radius 8px, placeholder cor #a4a7ae, font-size 14px.
- Campos em par (lado a lado): cada um com width 212px, gap 16px (ex.: Senha + Confirmar senha; CNPJ + Telefone).
- Botao primario (Continuar / Criar conta): width 440px ou 212px, height 48px, bg #ff7402, texto branco, font-size 15px, font-weight semibold, border-radius 8px.
- Botao secundario (Voltar): width 212px, height 48px, bg branco, border #e9eaeb, texto #414651, border-radius 8px.
- Separador "ou" entre botao e link "Ja tem uma conta?": linha horizontal #e9eaeb, texto "ou" centralizado.
- Link "Entrar": texto "Ja tem uma conta?" em #535862 + "Entrar" em #cc5c02, font-weight semibold.
- Nota de termos: font-size 11px, cor #a4a7ae, centralizado, abaixo do separador.

**Responsividade:**
- Em mobile (< 768px): ocultar o Brand Panel; Form Panel ocupa 100% da largura.
- Em tablet (768px - 1024px): Brand Panel pode ser reduzido ou ocultado conforme convencao do projeto.

### Campos e Interacoes

**Etapa 1 — Dados Pessoais:**
- Nome completo: input type="text", placeholder "ex: Joao Silva", obrigatorio, minlength 3.
- E-mail: input type="email", placeholder "ex: joao@empresa.com.br", obrigatorio, validacao de formato e-mail.
- Senha: input type="password", placeholder "••••••••", obrigatorio, minlength 8.
- Confirmar senha: input type="password", placeholder "••••••••", obrigatorio, deve ser igual ao campo Senha (validator customizado).
- Indicador de forca da senha: barra abaixo dos campos de senha, 3 niveis — Fraca (vermelho), Media (amarelo #f79009), Forte (verde). Preenchimento proporcional ao nivel.
- Botao "Continuar": habilitado apenas quando o FormGroup de Etapa 1 for valido; ao clicar, avanca para Etapa 2.

**Etapa 2 — Dados da Empresa:**
- Nome da empresa: input type="text", placeholder "ex: BRQ Solucoes LTDA", obrigatorio.
- CNPJ: input type="text", mascara 00.000.000/0001-00, obrigatorio, validacao de formato.
- Telefone: input type="tel", mascara (00) 00000-0000, obrigatorio.
- Cargo/Funcao: select (dropdown), placeholder "Selecione seu cargo...", obrigatorio. Opcoes a definir conforme backend ou enum fixo.
- Aceito os Termos: checkbox, obrigatorio = true para habilitar "Criar conta".
- Quero receber novidades: checkbox, opcional.
- Botao "Voltar": retorna para Etapa 1 sem perder os dados ja preenchidos na Etapa 1.
- Botao "Criar conta": habilitado apenas quando FormGroup Etapa 2 valido E aceitaTermos = true; ao clicar, invoca AuthService.register().

**Mensagens de erro:**
- Exibidas abaixo do campo invalido, cor vermelha, font-size 12px.
- Ativadas apos o usuario tocar o campo (touched) ou tentar submeter o formulario.
- Exemplos: "Campo obrigatorio", "E-mail invalido", "Senha deve ter no minimo 8 caracteres", "As senhas nao coincidem", "CNPJ invalido".

### Estados da UI
- **Idle (Etapa 1)**: formulario em branco, todos os campos vazios, botao "Continuar" desabilitado.
- **Idle (Etapa 2)**: formulario em branco, botao "Criar conta" desabilitado ate aceitaTermos = true.
- **Preenchendo**: campos com foco exibem borda destacada (azul ou laranja conforme design system), indicador de forca de senha atualiza em tempo real.
- **Validacao com erro**: campos invalidos exibem borda vermelha e mensagem de erro abaixo.
- **Loading (submit)**: botao "Criar conta" exibe spinner ou texto "Aguarde..." e fica desabilitado; evita duplo envio.
- **Sucesso**: exibir toast/snackbar de confirmacao ("Conta criada com sucesso!") e redirecionar para a tela de login (ou dashboard).
- **Erro de API (e-mail ja cadastrado)**: exibir mensagem de erro acima do formulario ou sob o campo relevante ("Este e-mail ja esta em uso.").
- **Erro de rede**: exibir banner de erro ("Falha na conexao. Tente novamente.") com botao de retry.
- **Vazio (select de Cargo)**: placeholder "Selecione seu cargo..." exibido em #a4a7ae.

---

## Referencia Visual (Figma)
- Figma file: Design System BRQ - Trello
- fileKey: `VaMNopRl4cHqvNrV39nzZf`

**Etapa 1 — Dados Pessoais:**
- URL: https://www.figma.com/design/VaMNopRl4cHqvNrV39nzZf/Design-System-BRQ--Trello-?node-id=4018-3381
- nodeId: `4018:3381`

**Etapa 2 — Dados da Empresa:**
- URL: https://www.figma.com/design/VaMNopRl4cHqvNrV39nzZf/Design-System-BRQ--Trello-?node-id=4018-3435
- nodeId: `4018:3435`

O agente Execute DEVE usar `mcp__figma__get_design_context` com os dados acima para implementar o frontend identico ao design.

**Tokens de cor do design:**
- Laranja primario: `#ff7402`
- Laranja escuro (label/link): `#cc5c02`
- Amarelo (forca media): `#f79009`
- Cinza fundo: `#f5f5f5`
- Cinza borda: `#d5d7da`
- Cinza borda leve: `#e9eaeb`
- Texto principal: `#0a0d12`
- Texto secundario: `#535862`
- Texto label campo: `#414651`
- Placeholder: `#a4a7ae`
- Icone dropdown: `#717680`

**Tipografia (fonte DM Sans):**
- Titulo de etapa: 26px / bold
- Label "ETAPA X DE 2": 11px / semibold / uppercase
- Label de campo: 13px / medium
- Texto de campo / placeholder: 14px / regular
- Botao primario: 15px / semibold
- Link "Entrar": 13px / semibold
- Nota de termos: 11px / regular

## Criterios de Aceitacao
- [ ] A tela de cadastro implementada conforme o layout do Figma (node-id=4018-3381 e node-id=4018-3435).
- [ ] O formulario contem os campos especificados no Figma (Nome, E-mail, Senha, Confirmar senha na Etapa 1; Nome empresa, CNPJ, Telefone, Cargo na Etapa 2).
- [ ] Os campos obrigatorios sao validados antes do envio, com mensagens de erro claras exibidas ao usuario.
- [ ] Ao submeter o formulario com dados validos, o sistema registra o usuario e fornece feedback de sucesso.
- [ ] Ao submeter com dados invalidos ou ja cadastrados, o sistema exibe mensagem de erro adequada.
- [ ] A tela e responsiva e segue os padroes visuais do Design System BRQ.
- [ ] Existe botao/link para navegar de volta para a tela de login ("Entrar").

## Fora do Escopo
- Recuperacao de senha ("esqueci minha senha").
- Autenticacao via redes sociais (Google, Facebook etc.).
- Edicao de perfil apos o cadastro.
- Envio de e-mail de confirmacao de conta.
- Alteracoes na tela de login existente.
