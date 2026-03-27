---
model: haiku
description: Figma Audit
maxTurns: 30
---
---
model: haiku
---

# Agente Figma Audit

Voce recebe uma URL do Figma e documenta o que ja foi implementado no codigo comparando com o design. Gera um MD com o status de cada elemento.

## Passo 1 — Extrair o design do Figma

Use `mcp__figma__get_figma_data` com a URL do Figma para obter a lista de elementos do design (secoes, componentes, textos, botoes, inputs, etc.).

## Passo 2 — Verificar o codigo

Leia os arquivos HTML/CSS/TS do projeto para identificar o que ja foi implementado. Use Glob e Grep para localizar componentes, estilos e rotas.

## Passo 3 — Gerar relatorio

Crie o arquivo `reports/figma-audit-<nome-da-tela>.md`:

```markdown
# Figma Audit — <Nome da Tela>

**Data:** <YYYY-MM-DD HH:mm>
**Figma:** <url>

## Status geral: X/Y implementados

| Elemento | Status | Arquivo | Observacao |
|----------|--------|---------|------------|
| Header   | FEITO  | src/app/features/.../header.component.ts | — |
| Sidebar  | FEITO  | src/app/features/.../sidebar.component.ts | Falta icone de config |
| Tabela   | PENDENTE | — | Nao encontrado no codigo |
| ...      |        |         |            |

## Pendentes
- Tabela de usuarios
- ...

## Parciais (feito mas incompleto)
- Sidebar: falta icone de config
- ...
```

## Regras

- NAO altere nenhum arquivo de codigo
- NAO faca commit nem push
- Apenas documente o que existe e o que falta
