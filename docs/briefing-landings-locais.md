# Briefing: landings locais (serviço + cidade)

Cada landing nasce com `publish: false` (noindex, fora do sitemap). Só vira `true` após o cliente confirmar os itens abaixo.

## Piloto: Limpeza de calhas em Sorocaba

URL: `/limpeza-de-calhas-em-sorocaba/` (arquivo `src/content/locais/limpeza-de-calhas-em-sorocaba.mdx`).

Dados que só o cliente pode confirmar:

- Bairros de Sorocaba realmente atendidos (lista real).
- Tipos de imóvel mais atendidos na cidade.
- Prazo médio de atendimento, com número aprovado.
- Fotos reais de serviços em Sorocaba, com autorização.
- Telefone e WhatsApp da região (hoje: (15) 98132-6338, vindo de `regions.json`).

## Para publicar

1. Preencher o conteúdo com os dados confirmados e remover os comentários `[CONFIRMAR]`.
2. Trocar `publish: false` por `publish: true`.
3. Em `vercel.json`, trocar o destino de `/d/limpeza-de-calhas-em-sorocaba/` para `/limpeza-de-calhas-em-sorocaba/` com `statusCode: 301`.
4. Solicitar indexação no Search Console.

Não redirecionar a URL antiga para a página enquanto ela estiver noindex.
