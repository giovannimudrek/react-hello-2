# US-LK-31 — Implementar tela de cadastro

## Contexto
O objetivo e implementar a tela de cadastro de usuario conforme os layouts definidos no Figma (Design System BRQ). A tela deve permitir que novos usuarios se registrem no sistema.

Referencias de design:
- https://www.figma.com/design/VaMNopRl4cHqvNrV39nzZf/Design-System-BRQ--Trello-?node-id=4018-3381
- https://www.figma.com/design/VaMNopRl4cHqvNrV39nzZf/Design-System-BRQ--Trello-?node-id=4018-3435

## Historia
Como usuario nao cadastrado,
quero preencher um formulario de cadastro,
para criar uma conta e acessar o sistema.

## Criterios de Aceitacao
1. A tela de cadastro deve ser implementada conforme o layout definido no Figma (node-id=4018-3381 e node-id=4018-3435).
2. O formulario deve conter os campos necessarios para criacao de conta (conforme especificado no Figma).
3. Os campos obrigatorios devem ser validados antes do envio do formulario, exibindo mensagens de erro claras ao usuario.
4. Ao submeter o formulario com dados validos, o sistema deve registrar o usuario e fornecer feedback de sucesso.
5. Ao submeter o formulario com dados invalidos ou ja cadastrados, o sistema deve exibir mensagem de erro adequada.
6. A tela deve ser responsiva e seguir os padroes visuais do Design System BRQ definidos no Figma.
7. Deve existir um link ou botao que permita ao usuario navegar de volta para a tela de login caso ja possua conta.

## Cenarios de Teste
**Happy path:**
- Usuario preenche todos os campos obrigatorios com dados validos e submete o formulario; sistema registra o usuario com sucesso e exibe confirmacao.

**Edge cases:**
- Usuario deixa um ou mais campos obrigatorios em branco; sistema exibe mensagem de validacao sem submeter o formulario.
- Usuario preenche um campo com formato invalido (ex.: e-mail sem @); sistema exibe mensagem de formato invalido.

**Erros:**
- Usuario tenta cadastrar com um identificador (ex.: e-mail ou telefone) ja existente; sistema exibe mensagem informando que o dado ja esta em uso.
- Falha de conexao ao submeter; sistema exibe mensagem de erro de rede e permite nova tentativa.

## Fora do Escopo
- Recuperacao de senha (fluxo de "esqueci minha senha" nao faz parte desta tarefa).
- Autenticacao via redes sociais (login com Google, Facebook etc.).
- Edicao de perfil apos o cadastro.
- Envio de e-mail de confirmacao de conta (a menos que esteja explicitamente no Figma).
- Tela de login (e uma tela separada, nao deve ser alterada nesta tarefa).

## Notas Tecnicas
- Seguir fielmente os layouts do Figma referenciados na descricao (node-id=4018-3381 e node-id=4018-3435).
- Utilizar os componentes do Design System BRQ ja existentes sempre que possivel.
- Validacoes devem ocorrer no frontend antes do envio ao backend.
- O fluxo de navegacao da tela de cadastro para a tela de login deve estar funcional.
