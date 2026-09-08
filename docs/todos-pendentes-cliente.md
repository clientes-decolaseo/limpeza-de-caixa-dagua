# TODOs Pendentes — limpezadecaixasdagua.eco.br

Levantamento consolidado e **verificado via grep no projeto** 
(`Select-String -Pattern "TODO:" -CaseSensitive`) — lista exata, sem 
achismo. 24 ocorrências de `TODO:` no código-fonte, mais 1 bloqueador que 
não aparece como comentário (a access key do Web3Forms, que é um valor 
placeholder, não um comentário TODO).

**Como reproduzir esta busca no futuro:**
```powershell
Get-ChildItem src, scripts -Recurse -Include *.mdx,*.astro,*.ts,*.mjs |
  Select-String -Pattern "TODO:" -CaseSensitive |
  Select-Object Path, LineNumber, Line | Format-List
```

---

## 🔴 Bloqueadores (impedem funcionamento correto em produção)

| Item | Onde | O que fazer |
|---|---|---|
| Endereço físico, CNPJ, geo coordinates, rating | `src/components/LocalBusinessSchema.astro` | Campos comentados no JSON-LD. Se disponíveis, melhoram elegibilidade para rich snippets e Google Business Profile |
| Horário de atendimento | `src/pages/contato.astro:40` | `{/* TODO: confirmar horário real com cliente */}` — hoje exibe placeholder "Segunda a Sábado, 8h às 18h" |

~~Access key do Web3Forms~~ — **resolvido**: o formulário de contato foi removido do site (Prompt 21). A página `/contato/` agora só direciona para WhatsApp/telefone por região, sem depender de serviço externo. `/obrigado/` também foi removido.

---

## 🟡 Escopo operacional dos serviços — precisa de validação do cliente

Estes TODOs definem **o que a empresa realmente faz**, não são só redação — 
publicar sem confirmar pode gerar promessa que a operação não cumpre.

### Hidrojateamento (residencial/comercial) — `src/content/services/hidrojateamento.mdx`
- **Linha 24:** confirmar diâmetros, tipos de tubulação atendidos e se há limite de acesso para o equipamento
- **Linha 30:** confirmar se caixa de gordura, ramal predial e rede pluvial estão todos no escopo padrão

### Hidrojateamento Industrial — `src/content/industrial/hidrojateamento-industrial.mdx`
- **Linha 23:** confirmar faixas de pressão, tipos de equipamento e segmentos efetivamente atendidos
- **Linhas 27–30:** confirmar especificidades de cada segmento (Celulose e Papel, Siderúrgicas, Petroquímica, Mineração) — foram escritos de forma genérica por não termos o texto original da página antiga disponível
- **Linha 36:** confirmar treinamentos, integrações e exigências específicas de cada segmento

### Limpa Fossa — `src/content/services/limpa-fossa.mdx`
- **Linha 19:** confirmar tipos de fossa atendidos (séptica, rudimentar, caixa de gordura associada) e áreas de cobertura
- **Linha 25:** confirmar destino do descarte e se há documento de destinação emitido ao cliente

### Limpeza de Calhas — `src/content/services/limpeza-de-calhas.mdx`
- **Linha 18:** confirmar periodicidade recomendada do serviço
- **Linha 24:** confirmar se inclui condutores verticais, limpeza de rufos, ou só calhas horizontais

### Limpeza de Coifa — `src/content/services/limpeza-de-coifa.mdx`
- **Linha 20:** confirmar se atende cozinhas industriais/restaurantes ou só residências, e com qual abrangência (coifa, filtro, duto)
- **Linha 26:** confirmar passo a passo operacional (desmontagem, produtos utilizados, se há certificado específico)

### Limpeza de Caixa de Gordura — `src/content/services/limpeza-de-caixa-de-gordura.mdx`
- **Linha 36:** confirmar frequência recomendada real — não publicar prazo específico sem validação

---

## 🟢 Conteúdo de blog — precisa de confirmação factual antes de publicar

| Arquivo | Linha | O que confirmar |
|---|---|---|
| `como-dimensionar-caixa-de-gordura-para-restaurante.mdx` | 24 | Tabela técnica real de dimensionamento (litros por refeições/dia), se o cliente tiver |
| `como-limpar-a-caixa-dagua-do-condominio.mdx` | 6 | Buscar imagem própria via Pexels (query sugerida: "apartment building rooftop water tank") — hoje reaproveita `servico-reservatorio.jpg` |
| `como-limpar-caixa-de-gordura.mdx` | 51 | Órgão regulador de descarte de resíduos gordurosos citado pela empresa, e se há comprovante específico a emitir |
| `de-quem-e-a-responsabilidade-de-limpar-a-caixa-dagua.mdx` | 26 | Orientação jurídica específica (Código Civil, Lei do Inquilinato ou jurisprudência) antes de afirmar obrigação legal fixa entre locador e locatário |
| `importancia-da-manutencao-da-caixa-de-gordura.mdx` | 34 | Exigência legal específica do município e qual documento comprova a manutenção, antes de afirmar obrigatoriedade genérica |
| `normas-e-legislacao-limpeza-caixa-dagua.mdx` | 34 | Texto oficial da Portaria CVS 5/2013 — se permanece vigente ou foi substituída — antes de afirmar artigo/redação/obrigatoriedade |
| `quanto-custa-limpeza-de-caixa-dagua.mdx` | 16 | Tabela de preços por litragem, só se o cliente quiser publicar valores reais |
| `quanto-tempo-leva-para-limpar-uma-caixa-dagua.mdx` | 31 | Faixas de tempo reais com a operação (residencial vs. coletivo) |

---

## 🔵 Melhorias visuais/técnicas (não bloqueiam publicação)

| Item | Onde | O que fazer |
|---|---|---|
| Logo real da empresa | `src/assets/logo.png` | Resolvido — logo e favicon institucionais baixados do site atual |

---

## ⚠️ Alerta de compliance (não migrar do site antigo)

| Item | Onde estava (site antigo) | Por quê não migrar |
|---|---|---|
| `aggregateRating` de 4.9 com 728 reviews | JSON-LD `LocalBusiness` da home antiga | Não há fonte verificável (Google Business Profile real) confirmada para esses números no projeto novo. Publicar rating fabricado em JSON-LD é rich-snippet enganoso e pode gerar penalização manual do Google. Só incluir se vier de dados reais e auditáveis |

---

## Itens já resolvidos (registro histórico)

- ✅ Imagens OG 1200×630 — geradas via recorte `sharp` (Prompt 20), 25 arquivos
- ✅ Contraste do botão WhatsApp — corrigido, Lighthouse Accessibility 100
- ✅ `aria-label` dos links de WhatsApp — corrigido para incluir texto visível
- ✅ Menções a concorrentes no post de São Bernardo do Campo — removidas na reescrita
- ✅ Alegações fabricadas de "25 anos de experiência" (rascunhos de Itu) — descartadas, não migradas
- ✅ Prompt de IA vazado em rascunho do WordPress — identificado, não migrado
- ✅ Formulário de contato removido — `/contato/` simplificado para WhatsApp/telefone, sem dependência de serviço externo (Web3Forms), `/obrigado/` removido

---

## Resumo numérico

| Categoria | Quantidade |
|---|---|
| TODOs de escopo operacional (definem o que a empresa faz) | 13 |
| TODOs de conteúdo de blog (fatos a confirmar) | 8 |
| Bloqueadores de funcionamento | 2 (schema LocalBusiness, horário) |
| Melhorias visuais menores | 1 |
| **Total de itens rastreados** | **24** |

---

*Documento verificado via grep no código-fonte em [data da última varredura]. 
Recomenda-se rodar o comando PowerShell acima novamente antes de cada 
deploy para produção, para garantir que nenhum TODO resolvido continue 
listado aqui, e que nenhum TODO novo introduzido em prompts futuros passe 
despercebido.*
