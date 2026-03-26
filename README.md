# Hello World Web

Projeto web simples em HTML puro, servindo como ponto de partida para aplicacoes front-end. A pagina exibe uma mensagem de boas-vindas e esta estruturada com as melhores praticas de HTML semantico e acessibilidade.

---

## Funcionalidades

- Pagina web estatica em HTML5
- Configuracao de idioma em Portugues (pt-BR)
- Meta tags para responsividade (viewport)
- Estrutura semantica e acessivel
- Pronto para expansao com CSS e JavaScript

---

## Tecnologias Utilizadas

| Tecnologia | Versao | Descricao                        |
|------------|--------|----------------------------------|
| HTML5      | 5      | Estrutura e semantica da pagina  |
| CSS3       | 3      | Estilizacao (a ser adicionado)   |
| JavaScript | ES6+   | Interatividade (a ser adicionado)|

---

## Pre-requisitos

Para visualizar e editar este projeto, voce precisara de:

- Um navegador web moderno (Google Chrome, Firefox, Edge, Safari)
- Um editor de codigo (recomendado: [Visual Studio Code](https://code.visualstudio.com/))
- Git (para clonar e versionar o projeto)

---

## Instalacao e Configuracao

1. Clone o repositorio:

```bash
git clone <url-do-repositorio>
```

2. Acesse o diretorio do projeto:

```bash
cd <nome-do-repositorio>
```

Nenhuma dependencia ou instalacao adicional e necessaria. O projeto e composto por arquivos estaticos.

---

## Como Executar

### Opcao 1 — Abrir diretamente no navegador

Basta abrir o arquivo `index.html` diretamente no navegador:

```bash
# No macOS
open index.html

# No Linux
xdg-open index.html

# No Windows
start index.html
```

### Opcao 2 — Servidor local com VS Code

Instale a extensao [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code e clique em **"Go Live"** na barra de status inferior.

### Opcao 3 — Servidor local com Python

```bash
# Python 3
python3 -m http.server 8080
```

Acesse em: [http://localhost:8080](http://localhost:8080)

---

## Estrutura do Projeto

```
.
├── index.html       # Pagina principal da aplicacao
└── README.md        # Documentacao do projeto
```

A medida que o projeto evoluir, a estrutura recomendada e:

```
.
├── index.html           # Pagina principal
├── style.css            # Estilos globais
├── script.js            # Scripts de interatividade
├── assets/
│   ├── images/          # Imagens do projeto
│   └── fonts/           # Fontes customizadas
└── README.md            # Documentacao do projeto
```

---

## Contribuindo

Contribuicoes sao bem-vindas. Siga os passos abaixo:

1. Faca um fork do projeto
2. Crie uma branch para sua feature ou correcao:

```bash
git checkout -b feat/minha-feature
```

3. Faca suas alteracoes e realize o commit:

```bash
git commit -m "feat: adiciona minha feature"
```

4. Envie para o repositorio remoto:

```bash
git push origin feat/minha-feature
```

5. Abra um Pull Request descrevendo as alteracoes realizadas.

### Convencao de commits

Este projeto segue o padrao [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

| Prefixo    | Uso                                              |
|------------|--------------------------------------------------|
| `feat:`    | Nova funcionalidade                              |
| `fix:`     | Correcao de bug                                  |
| `docs:`    | Alteracoes na documentacao                       |
| `style:`   | Formatacao, sem mudanca de logica                |
| `refactor:`| Refatoracao de codigo                            |
| `chore:`   | Atualizacao de tarefas, configuracoes, etc.      |

---

## Licenca

Este projeto esta licenciado sob a licenca **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com dedicacao pela equipe.
