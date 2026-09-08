# Mapeamento de Migração — Blog Universo Ambiental (WordPress → Astro)

**Fonte:** `universoambiental113211-0000_WordPress_2026-08-21.xml` (export WXR)
**Data da migração:** Agosto de 2026
**Itens no export:** 33 (27 publicados, 6 rascunhos)
**Resultado final:** 17 posts + 1 novo serviço (Caixa de Gordura)

---

## Pilar 1 — Limpeza de Caixa d'Água (12 posts finais)

| Post final (`src/content/blog/`) | Post(s) originais consolidados | Ação |
|---|---|---|
| `qual-o-prazo-ideal-para-limpar-a-caixa-dagua.mdx` | "Qual é o prazo ideal para limpar a caixa d'água", "Por que fazer a limpeza de caixa d'água a cada 6 meses", "Quando Limpar sua Caixa D'Água? Guia Essencial" | **Mesclado** (3→1) — mesmo argumento central repetido 3x no site original |
| `como-limpar-caixa-dagua-passo-a-passo.mdx` | "5 Passos para Limpar a Caixa d'Água", "Como posso limpar a caixa d'água da minha casa", "Como Limpar Caixa d'Água: Dicas Importantes...", "Dicas importantes para manter sua caixa d'água limpa" | **Mesclado** (4→1) — mesmo tutorial básico contado 4 vezes |
| `quanto-custa-limpeza-de-caixa-dagua.mdx` | "Qual o valor cobrado para limpeza de caixa d'água" + reescrita total de "Qual o valor para limpar uma caixa d'água de 10.000 litros em São Bernardo do Campo" | **Mesclado + reescrito** — ⚠️ o post de SBC citava concorrentes (acqualimp, ac clean, cb dedetizadora, porto serviço) por nome, tinha telefone no corpo e recorte hiperlocal por bairro. Reescrito do zero, sem preços numéricos, sem concorrentes, sem cidade isolada |
| `normas-e-legislacao-limpeza-caixa-dagua.mdx` | "Portaria CVS nº 5/2013...", "Normas da ANVISA para limpeza de caixas d'água" | **Mesclado** (2→1) — conteúdo regulatório sobreposto. TODO no arquivo: confirmar texto oficial e vigência da Portaria CVS 5/2013 antes de publicar |
| `de-quem-e-a-responsabilidade-de-limpar-a-caixa-dagua.mdx` | "De quem é a responsabilidade de limpar a caixa d'água" | Mantido, reescrito |
| `materiais-necessarios-para-limpeza-de-caixa-dagua.mdx` | "Materiais Necessários para Limpeza de Caixa d'Água" | Mantido, reescrito |
| `como-limpar-a-caixa-dagua-do-condominio.mdx` | "Como Limpar a Caixa d'Água do Condomínio" | Mantido, reescrito |
| `como-escolher-uma-empresa-especializada-em-limpeza-de-caixa-dagua.mdx` | "Como escolher uma empresa especializada em limpeza de caixas de água em São Paulo" | Mantido, reescrito, delocalizado (era focado só em SP) |
| `o-que-esperar-de-um-servico-profissional-de-higienizacao.mdx` | "O que esperar de um serviço profissional de higienização de reservatórios" | Mantido, reescrito |
| `consequencias-de-nao-limpar-a-caixa-dagua.mdx` | "Consequências de Não Limpar a Caixa d'Água" | Mantido, reescrito |
| `sinais-de-que-a-caixa-dagua-precisa-de-limpeza-urgente.mdx` | "Sinais de que sua caixa d'água precisa de limpeza urgente" | Mantido, reescrito |
| `quanto-tempo-leva-para-limpar-uma-caixa-dagua.mdx` | "Quanto tempo leva para limpar uma caixa d'água" | Mantido, reescrito. TODO: confirmar faixas de tempo reais com a operação |

**Descartado sem migração:** "Limpeza da Caixa d'Água: por que é essencial..." (3.283 caracteres) — stub muito curto, conteúdo já coberto pelos posts acima.

---

## Pilar 2 — Caixa de Gordura (5 posts finais + 1 página de serviço nova)

Este cluster **não existia como serviço** no site original — só como posts de blog soltos, sem página comercial de sustentação. Foi criada a 6ª página de serviço (`/servicos/limpeza-de-caixa-de-gordura/`) para dar um pilar comercial a esses 5 posts.

| Post final | Post original | Ação |
|---|---|---|
| `sinais-de-que-a-caixa-de-gordura-precisa-de-limpeza.mdx` | "Sinais de que sua Caixa de Gordura Precisa de Limpeza" | Mantido, reescrito |
| `como-limpar-caixa-de-gordura.mdx` | "Como Limpar Caixa de Gordura" | Mantido, reescrito |
| `importancia-da-manutencao-da-caixa-de-gordura.mdx` | "A Importância da Manutenção da Caixa de Gordura" | Mantido, reescrito. TODO: confirmar exigência legal municipal antes de afirmar obrigatoriedade |
| `caixa-de-gordura-entupida-o-que-fazer.mdx` | "Caixa de Gordura Entupida" | Mantido, reescrito |
| `como-dimensionar-caixa-de-gordura-para-restaurante.mdx` | "Como Dimensionar Caixa de Gordura para Restaurante" | Mantido, reescrito. TODO: tabela técnica de dimensionamento, se o cliente fornecer dados reais |

---

## Pilar 3 — Hidrojateamento e Limpa Fossa

| Item original | Ação |
|---|---|
| "Hidrojateamento" (post único) | **Não migrado como post de blog separado** — conteúdo já absorvido na página de serviço `/servicos/hidrojateamento/` criada no Prompt 11 |
| "Limpa Fossa: Preços e Orçamentos em Barueri" | **Não migrado como post de blog** — mesmo padrão de doorway hiperlocal do caso SBC (preço + cidade específica). Conteúdo genérico já absorvido na página de serviço `/servicos/limpa-fossa/`. Não houve reescrita separada em blog para este tema neste ciclo |

---

## Descartado — Rascunhos (nunca publicados no site original)

| Item | Motivo do descarte |
|---|---|
| "Universo Ambiental: Referência em Limpeza de Caixa D'água em Itu com 25 Anos de Experiência..." | ⚠️ Alega **25 anos de experiência** e certificações específicas (Ibama, Attende Ambiental) não confirmadas em nenhum outro lugar do site. Nunca publicado. Descartado por decisão do cliente |
| "Limpeza de Caixa D'água em Itu: Por Que Fazer e Como Garante Água Saudável em Casa" | Rascunho da mesma leva de conteúdo sobre Itu, mesmo risco de dado não confirmado. Descartado |
| "Limpeza de Caixa D'água em Itu: Serviço Essencial... Atendimento 24 Horas" | Idem — alega atendimento 24h não confirmado. Descartado |
| "Dicas Importantes para Manter sua Caixa d'Água Limpa" (rascunho, `?p=16540`) | Duplicata de rascunho do post já publicado e consolidado em `como-limpar-caixa-dagua-passo-a-passo.mdx`. Descartado |
| Item sem título (`?p=16408`, 341 caracteres) | Rascunho vazio/incompleto, sem conteúdo aproveitável |
| Item sem título (`?p=16526`, 17.316 caracteres) | ⚠️ **Não era conteúdo** — continha um prompt de geração de IA vazado no corpo ("Você é um redator especialista em SEO local, GEO..."). Nunca publicado, descartado sem reaproveitamento |

---

## Resumo numérico

| Categoria | Quantidade |
|---|---|
| Posts publicados no WordPress original | 27 |
| Rascunhos no WordPress original | 6 |
| **Total no export** | **33** |
| Posts finais publicados no Astro | **17** |
| Novas páginas de serviço criadas (não existiam) | **1** (Caixa de Gordura) |
| Posts descartados por serem doorway/dado fabricado | 5 (1 reescrito ao invés de descartado — ver SBC) |
| Posts descartados por duplicação/stub | 2 |

---

## Achados de qualidade registrados durante a auditoria

1. **Menção a concorrentes por nome** no post de São Bernardo do Campo (acqualimp, ac clean, cb dedetizadora, porto serviço) — reescrito, removido
2. **Prompt de IA vazado** publicado como rascunho no WordPress — nunca foi ao ar, mas é um lembrete de revisar exports antes de qualquer migração futura
3. **Alegações de "anos de experiência" e certificações não confirmadas** nos rascunhos de Itu — não migradas, por política de nunca fabricar dados institucionais
4. **Padrão de doorway hiperlocal** (preço + bairros específicos) identificado em 2 posts (SBC e Barueri) — ambos tratados com remoção do recorte hiperlocal isolado

---

*Documento gerado como registro de decisões da migração. Caso novas páginas locais (ex: Itu, Barueri, São Bernardo do Campo) sejam desejadas no futuro, devem ser criadas do zero com dados reais confirmados pelo cliente — não reaproveitando o texto original.*
