# Organização das Issues — Projeto N2

As oito etapas exigidas pelo PDF foram abertas no repositório, em ordem. O número entre colchetes (N2-1, N2-2...) é o rótulo usado pelo professor; o número após `#` é o identificador real que o GitHub atribuiu à issue.

| Etapa | Issue real | Título | Commit sugerido |
|---|---:|---|---|
| N2-1 | #12 | CRUD de pontos de coleta na API | `feat(api): implementa CRUD de pontos refs #12` |
| N2-2 | #13 | Busca de pontos com paginação | `feat(api): adiciona filtro paginado de pontos refs #13` |
| N2-3 | #14 | App listando os pontos da API | `feat(mobile): lista pontos pela API refs #14` |
| N2-4 | #15 | App: cadastrar, editar e excluir pontos | `feat(mobile): implementa CRUD de pontos refs #15` |
| N2-5 | #16 | CRUD de doações na API | `feat(api): implementa CRUD de doações refs #16` |
| N2-6 | #17 | Histórico e cadastro de doações pela API | `feat(mobile): integra histórico e cadastro de doações refs #17` |
| N2-7 | #18 | Editar e excluir doação pela API | `feat(mobile): implementa edição e exclusão de doações refs #18` |
| N2-8 | #19 | Pontos favoritos e roteiro de demonstração | `feat(mobile): finaliza favoritos e demonstração refs #19` |

## Dependências

- #13 depende de #12.
- #14 depende de #12 e #13.
- #15 depende de #14.
- #16 depende de #15.
- #17 depende de #16.
- #18 depende de #17.
- #19 depende de #18.

As dependências também foram registradas no corpo de cada issue no GitHub.

## Como fechar cada issue

1. Trabalhar na etapa e manter commits pequenos com o `refs #NN` correspondente.
2. Validar todos os critérios de aceite da issue.
3. Anexar evidências pertinentes (prints Swagger, testes e funcionamento mobile).
4. Só então fechar a issue.

Não feche issues apenas porque os arquivos foram escritos. A validação no computador e a demonstração no app fazem parte da entrega.

## Histórico anterior

- As Issues #1, #2 e #5 a #9 são registros de atividades anteriores e permanecem separadas da N2.
- A antiga Issue #9 foi renomeada para deixar claro que era a integração inicial da Aula 22.
- A Issue #5 teve sua descrição corrigida: o problema era a sintaxe da arrow function em `renderItem`, não um comando do PowerShell dentro do JSX.
- As Issues #12 a #19 são as oito novas entregas da N2.
