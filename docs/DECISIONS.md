# Decisoes Arquiteturais

## KAN-75 — Tela de cadastro e de login (2026-04-06)

### Stack escolhida
React 18 + TypeScript + Tailwind CSS + React Router DOM v6, conforme definido na Spec e no CLAUDE.md do repositorio.

### Autenticacao mock com localStorage
**Decisao:** Implementar autenticacao sem backend real, usando localStorage para persistir usuarios e sessao.
**Motivo:** A Spec define "Backend: nao (somente frontend; autenticacao mock ou localStorage para esta entrega se nao houver API)". Permite desenvolvimento e validacao do frontend independente de infraestrutura.
**Trade-off:** Nao seguro para producao. Senhas armazenadas como btoa (base64) — adequado apenas para prototipo/demo.

### AuthContext com restauracao de sessao
**Decisao:** AuthProvider restaura token e user do localStorage no useEffect inicial, expondo `isLoading: true` durante esse processo.
**Motivo:** Evita o "flash" indesejado de /login ao recarregar a pagina quando o usuario ja esta autenticado.
**Impacto:** ProtectedRoute aguarda `isLoading === false` antes de decidir redirecionar.

### Separacao hooks/pages
**Decisao:** Toda logica de formulario (estado, validacao, submit, erros) fica em hooks dedicados (useLogin, useRegister). As pages sao puramente presentacionais.
**Motivo:** Facilita testes unitarios dos hooks isolados da UI; mantem componentes de pagina legiveeis.

### Estilos inline (CSS-in-JS manual) nas pages
**Decisao:** Pages e componentes de auth usam `style={{}}` inline para replicar fielmente os tokens do Figma, em vez de classes Tailwind utilitarias.
**Motivo:** Garante correspondencia pixel-perfeita com o design (cores exatas, espacamentos, shadows) sem depender de purge/JIT do Tailwind em desenvolvimento. Tailwind foi configurado com tokens para uso em features futuras.

### ProtectedRoute com Navigate
**Decisao:** ProtectedRoute usa `<Navigate to="/login" replace />` para rotas sem autenticacao.
**Motivo:** Padrao recomendado pelo React Router v6 para guards de rota declarativos.

### BoardPlaceholder
**Decisao:** Criar um componente placeholder simples para /board em vez de integrar o board Kanban existente.
**Motivo:** O escopo da KAN-75 e somente autenticacao. A integracao com o board Kanban e responsabilidade de outra tarefa.
