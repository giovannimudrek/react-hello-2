# FusionCode Squad

Plataforma de orquestracao de agentes de IA para desenvolvimento de software, desenvolvida pela BRQ Technology.

---

## Visao Geral

FusionCode Squad e um sistema que orquestra agentes de IA especializados para automatizar o ciclo de desenvolvimento de software. Do design no Figma ate o codigo em producao, o squad cuida de tarefas como geracao de codigo, revisao, migrations, deploy check e integracao com Jira e GitHub.

---

## Pipeline

O pipeline padrao executa dois agentes em sequencia:

```
Figma to Code  →  Figma Audit
```

1. **Figma to Code** — Extrai o design via MCP e gera HTML/CSS pixel-perfect
2. **Figma Audit** — Valida a fidelidade do codigo gerado ao design original

---

## Skills Disponiveis

| Skill | Argumento | Descricao |
|---|---|---|
| `analyze-codebase` | `backend\|deps\|arch` | Analisa estrutura e arquitetura do projeto |
| `figma-extract` | URL do Figma | Extrai dados de design via MCP |
| `code-review` | `arquivo\|dir\|branch` | Revisao com foco em qualidade e seguranca |
| `deploy-check` | — | Verifica build, lint, testes e deps |
| `db-migration` | `create <nome>\|run\|status` | Gerencia migrations com UP e DOWN |
| `git-commit` | mensagem (opcional) | Commit com mensagem semantica |
| `git-push-pr` | titulo do PR | Push e abertura de Pull Request |
| `create-issue` | descricao | Cria issue no GitHub |
| `close-issue` | numero da issue | Fecha issue e deleta branch local |
| `squad` | numero da issue | Executa o pipeline completo |
| `report-accessibility` | `arquivo\|URL` | Relatorio de acessibilidade WCAG |
| `jira-sync` | ID da issue Jira | Sincroniza com o Jira |
| `mobile-news` | — | Busca noticias de mobile |
| `test-runner` | `suite\|arquivo` | Executa suite de testes |

---

## Arquitetura

```
Interface (Claude Code / Claude Web / CLI)
        |
   Agentes (Figma to Code, Code Review, Deploy Check...)
        |
   Skills (.fusion-plugin/skills/ — SKILL.md por skill)
        |
   Integracoes (MCP Figma, MCP Jira, GitHub CLI, Git)
        |
      LLM (Anthropic Claude Sonnet / Opus)
```

Cada agente gera artefatos em `.pipeline/` que ficam disponiveis para os proximos agentes da sequencia.

---

## Tech Stack

- JavaScript / Node.js
- TypeScript + React + Tailwind CSS (projetos gerados)
- HTML5 / CSS3 (outputs Figma to Code)
- Anthropic Claude API (Sonnet e Opus)
- MCP Protocol (Model Context Protocol)
- MCP Figma (`npx mcp-figma`)
- MCP Atlassian/Jira (`uvx mcp-atlassian`)
- GitHub CLI (`gh`)
- Git

---

## Como Comecar

### 1. Clone o repositorio

```bash
git clone https://github.com/brq/fusioncodes-squad.git
cd fusioncodes-squad
```

### 2. Configure as variaveis de ambiente

Crie um arquivo `.env` na raiz:

```env
# Figma Personal Access Token
FIGMA_PERSONAL_ACCESS_TOKEN=figd_...

# Jira / Atlassian
JIRA_URL=https://seu-workspace.atlassian.net/
JIRA_USERNAME=seu@email.com
JIRA_API_TOKEN=ATATT3x...
```

### 3. Instale os servidores MCP

```bash
# MCP Figma
npx -y mcp-figma

# MCP Atlassian (Jira)
uvx mcp-atlassian
```

### 4. Execute o squad em uma issue

```bash
# Executa o pipeline completo para a issue #42
node cli/bin/fusion.js squad 42 --cwd .

# Ou execute uma skill isolada
node cli/bin/fusion.js skill figma-extract https://figma.com/design/...
```

### 5. Artefatos gerados

O pipeline gera artefatos no diretorio `.pipeline/`:

```
.pipeline/
  figma-nodes.json       # dados estruturais do design
  figma-preview.md       # URL da imagem renderizada
  codebase-analysis.md   # analise do codebase
  code-review.md         # relatorio de revisao
  deploy-check.md        # relatorio pre-deploy
```

---

## Configuracao MCP (.mcp.json)

O arquivo `.fusion-plugin/.mcp.json` configura os servidores MCP:

```json
{
  "mcpServers": {
    "jira": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "type": "stdio",
      "env": {
        "JIRA_URL": "https://seu-workspace.atlassian.net/",
        "JIRA_USERNAME": "seu@email.com",
        "JIRA_API_TOKEN": "..."
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "mcp-figma"],
      "type": "stdio",
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "figd_..."
      }
    }
  }
}
```

---

## Squad Workflow

Este workspace e operado por um squad de agentes de IA.

**Pipeline:**
1. Figma to Code
2. Figma Audit

**Fluxo:** `Figma to Code` → `Figma Audit`

---

## Licenca

Desenvolvido pela **BRQ Technology** — 2026.
