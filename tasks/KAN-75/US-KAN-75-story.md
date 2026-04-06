# US-KAN-75 — Tela de cadastro e de login, visando que é um sistema de gerenciamento de cards

## Contexto
O sistema é um gerenciador de cards no estilo Kanban. Para acessar e gerenciar seus cards, o usuário precisa se autenticar, o que requer telas de cadastro e de login.

## Historia
Como usuario do sistema de gerenciamento de cards,
quero me cadastrar e realizar login na aplicacao,
para acessar meus cards de forma segura e personalizada.

## Criterios de Aceitacao
1. A tela de cadastro deve conter campos de nome, e-mail e senha, com validacao de formato de e-mail e senha minima de 6 caracteres.
2. Ao concluir o cadastro com dados validos, o usuario deve ser redirecionado para a tela de login ou direto para o sistema.
3. A tela de login deve conter campos de e-mail e senha, com botao de entrar.
4. Ao realizar login com credenciais validas, o usuario deve ser redirecionado para o board de gerenciamento de cards.
5. Mensagens de erro claras devem ser exibidas para campos invalidos ou credenciais incorretas em ambas as telas.
6. Ambas as telas devem possuir link de navegacao entre si (ex: "Nao tem conta? Cadastre-se" e "Ja tem conta? Entrar").

## Cenarios de Teste
**Happy path:**
- Usuario preenche nome, e-mail valido e senha com 6+ caracteres no cadastro e e redirecionado com sucesso.
- Usuario cadastrado insere e-mail e senha corretos no login e acessa o board.

**Edge cases:**
- Usuario tenta cadastrar com e-mail ja existente — sistema exibe mensagem de erro adequada.
- Usuario deixa campos obrigatorios em branco e tenta submeter — campos sao sinalizados como invalidos.
- Usuario insere senha com menos de 6 caracteres — sistema impede o envio e informa o requisito minimo.

**Erros:**
- Usuario insere credenciais incorretas no login — sistema exibe mensagem "E-mail ou senha invalidos" sem revelar qual dos dois esta errado.
- Falha de conexao ao tentar cadastrar ou logar — sistema exibe mensagem de erro generica e nao trava a tela.

## Fora do Escopo
- Recuperacao ou redefinicao de senha (esqueci minha senha).
- Login social (Google, GitHub, Facebook, etc.).
- Verificacao de e-mail por token ou link.
- Perfil de usuario ou edicao de dados apos cadastro.
- Logica de autorizacao por papeis (admin, viewer, etc.).

## Notas Tecnicas
- O sistema e uma aplicacao React com TypeScript e Tailwind, conforme padrao do repositorio.
- O fluxo de autenticacao deve ser compativel com o board Kanban ja existente no projeto.
- O estado de autenticacao deve ser gerenciado de forma a proteger as rotas do board contra acesso sem login.
