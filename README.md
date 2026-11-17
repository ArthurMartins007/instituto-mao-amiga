# Instituto Mão Amiga

Aplicativo mobile em React Native + Expo integrado à API própria em Spring Boot.

## Organização

- `src/screens/`: telas e estados da interface.
- `src/components/`: componentes reutilizáveis da interface.
- `src/services/api.ts`: único ponto que faz requisições HTTP com `fetch`.
- `src/services/pontosService.ts`: operações da API de pontos.
- `src/services/doacoesService.ts`: operações da API de doações.
- `src/services/favoritosStorage.ts`: salva somente os IDs favoritos no aparelho.
- `src/types/`: contratos TypeScript que espelham os DTOs da API.
- `src/navigation/`: rotas tipadas do aplicativo.
- `api/`: projeto Spring Boot, persistência H2 e documentação dos endpoints.

## Requisitos

- Node.js 20 ou superior e npm.
- Java 17.
- Maven 3.9 ou superior.
- Celular e computador na mesma rede Wi-Fi para testar pelo Expo Go.

## Rodar a API

No terminal, na raiz do repositório:

```bash
cd api
mvn spring-boot:run
```

A API fica em `http://localhost:8080`. A documentação Swagger fica em `http://localhost:8080/swagger-ui/index.html`.

O banco H2 grava em arquivo em `api/data/`. A carga inicial cria 25 registros de demonstração e só roda quando a tabela de pontos está vazia.

## Configurar o IP no aplicativo

Edite `src/services/api.ts`, na constante `API_BASE_URL`.

- No navegador do próprio computador: `http://localhost:8080/api/v1`.
- No celular físico: use o IPv4 do computador na rede Wi-Fi, por exemplo `http://192.168.0.25:8080/api/v1`.

O IP `192.168.0.1` que aparece no arquivo é apenas um exemplo. Troque pelo IPv4 real do computador. O celular e o computador precisam estar na mesma rede.

## Rodar o aplicativo

Na raiz do repositório:

```bash
npm install
npx tsc --noEmit
npx expo start -c
```

## Funcionalidades da N2

- Consulta, filtro remoto e paginação infinita de pontos.
- Cadastro, edição e exclusão de pontos pela API.
- Detalhe de ponto carregado pelo UUID.
- Favoritos persistidos no aparelho somente como IDs.
- Cadastro e histórico paginado de doações pela API.
- Filtro remoto por tipo de item.
- Detalhe, edição e exclusão de doações pela API.
- Estados de carregamento, vazio e erro nas telas principais.

## Decisão técnica

Pontos e doações ficam no servidor porque são dados compartilhados e precisam continuar disponíveis entre instalações do app. Favoritos ficam no AsyncStorage porque representam uma preferência local do usuário e a atividade pede que o aparelho guarde apenas os IDs. Assim, não duplicamos os dados dos pontos no celular.

## Roteiro de demonstração (até 3 minutos)

1. Abrir a lista e pesquisar por bairro; rolar para carregar outra página.
2. Cadastrar um ponto, abrir o detalhe, editar e excluir.
3. Favoritar um ponto, abrir “Meus pontos” e desmarcar o favorito.
4. Cadastrar uma doação, abrir o histórico, filtrar, editar e excluir.
5. No Swagger, enviar um ponto/doação com campo inválido para mostrar HTTP 400 e consultar um UUID inexistente para mostrar HTTP 404.

## Evidências

As capturas reais do Swagger devem ser adicionadas em `api/docs/swagger/` depois de executar a API localmente. Não incluí imagens simuladas como se fossem respostas reais. A lista de capturas necessárias está em `api/docs/swagger/README.md`.
