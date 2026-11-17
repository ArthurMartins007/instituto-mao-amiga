# Resumo da implementação preparada para a N2

## API Spring Boot
- Migração da entidade Ponto para UUID e inclusão de bairro/tipo.
- DTOs de requisição com Bean Validation e DTOs de resposta em records.
- CRUD completo de pontos e doações.
- Pesquisa de pontos por nome/bairro e doações por tipo, com paginação.
- H2 persistido em arquivo e carga inicial de 25 pontos sem duplicação.
- Respostas 400 e 404 padronizadas.
- Swagger/OpenAPI e CORS.

## Aplicativo React Native
- `api.ts` concentra os métodos GET, POST, PUT e DELETE e o endereço base.
- `pontosService.ts` e `doacoesService.ts` isolam as operações dos recursos.
- Lista de pontos com filtro remoto e rolagem infinita.
- Cadastro, edição, detalhe e exclusão de pontos.
- Histórico de doações paginado, filtro remoto, detalhe, edição e exclusão.
- Destino da doação selecionado a partir dos pontos retornados pela API.
- Favoritos continuam no AsyncStorage, somente com IDs, e são resolvidos pela API.
- Todas as rotas mobile usam tipos de parâmetros.

## Organização
- `App.tsx` fica responsável pela navegação.
- Telas cuidam da interface e do estado da tela.
- Services concentram HTTP e persistência local de favoritos.
- Backend dividido em controller, service, repository, entity, dto e config.
- Comentários curtos em português explicam responsabilidades e métodos.

## O que falta validar na máquina
- Executar `mvn spring-boot:run` e conferir todos os endpoints no Swagger.
- Capturar as evidências de Swagger solicitadas pelo professor.
- Rodar `npm install` e `npx tsc --noEmit`.
- Testar os fluxos no Expo Go pela rede local e completar o roteiro de demonstração.

O código deste pacote foi revisado estaticamente, mas a compilação e os testes de execução não foram realizados neste ambiente.
