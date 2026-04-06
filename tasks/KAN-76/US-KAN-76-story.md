# US-KAN-76 — Tela de board de gerenciamento de cards

## Contexto
O projeto necessita de uma tela de board no estilo Kanban para que os usuarios possam visualizar e gerenciar cards distribuidos em colunas que representam etapas de um fluxo de trabalho.

## Historia
Como usuario do sistema,
quero visualizar um board com colunas e cards organizados por status,
para acompanhar e gerenciar o progresso das tarefas de forma visual.

## Criterios de Aceitacao
1. A tela exibe um board com multiplas colunas, cada coluna representando um status (ex: Para Fazer, Em andamento, Concluido).
2. Cada coluna exibe seus cards com titulo visivel.
3. O usuario pode mover um card entre colunas por meio de drag-and-drop ou botao de acao.
4. O usuario pode criar um novo card em uma coluna especifica.
5. O usuario pode excluir um card existente.
6. A tela reflete em tempo real a posicao atual de cada card nas colunas.

## Cenarios de Teste
**Happy path:**
- Usuario acessa a tela do board e visualiza as colunas com seus respectivos cards listados corretamente.
- Usuario move um card de "Para Fazer" para "Em andamento" e o card aparece na nova coluna.
- Usuario cria um novo card em uma coluna e ele aparece imediatamente na lista.

**Edge cases:**
- Coluna sem nenhum card exibe estado vazio com mensagem ou area de criacao visivel.
- Board com grande numero de cards em uma coluna exibe scroll interno na coluna sem quebrar o layout.

**Erros:**
- Tentativa de criar card com titulo vazio exibe mensagem de validacao sem submeter.

## Fora do Escopo
- Tela de login ou autenticacao de usuario.
- Cadastro ou edicao de colunas (adicionar/remover/renomear colunas).
- Detalhamento interno do card (descricao, comentarios, anexos, responsavel).
- Notificacoes ou historico de movimentacoes.
- Integracao com servicos externos.

## Notas Tecnicas
- O projeto utiliza React com TypeScript e Tailwind CSS conforme padrao do repositorio.
- O board deve seguir o layout Kanban (Trello-style) ja referenciado nos commits anteriores do repositorio.
- A implementacao deve ser responsiva para desktop.
