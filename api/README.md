# API do Instituto Mão Amiga

API REST em Java 17, Spring Boot, Spring Web, Spring Data JPA e H2 para consultar pontos de coleta e distribuição.

## Executar

Abra a pasta `api` como um projeto Maven no IntelliJ IDEA ou execute `mvn spring-boot:run` em um terminal que tenha Maven instalado. Na primeira execução, o Maven precisa baixar as dependências.

A API inicia em `http://localhost:8080`. A carga inicial cria oito pontos de demonstração. Os dados são gravados em um banco H2 em arquivo na pasta `api/data/`.

## Endpoints

- `GET /pontos`: lista paginada. Padrão `page=0`, `size=20` e `sort=nome,asc`; tamanhos maiores que 50 são limitados a 50.
- `GET /pontos/{id}`: retorna o ponto; um identificador inexistente responde HTTP 404.
- `GET /h2-console`: console local do H2.

Exemplos:

```text
http://localhost:8080/pontos
http://localhost:8080/pontos?page=0&size=5&sort=nome,asc
http://localhost:8080/pontos/1
http://localhost:8080/pontos/9999
```

A resposta paginada tem `content` com os DTOs e `page` com número, tamanho, total de elementos e total de páginas. O controller não retorna a entidade JPA.

## Sobre as coordenadas

Os registros do Instituto são dados didáticos fictícios posicionados em referências geográficas de Goiânia para atender ao exercício de latitude/longitude. Eles não confirmam que existam unidades reais de coleta ou distribuição do Instituto nesses locais. As coordenadas foram conferidas em referências cartográficas:

- Praça Cívica: https://pt.wikipedia.org/wiki/Pra%C3%A7a_C%C3%ADvica_(Goi%C3%A2nia)
- Parque Municipal Flamboyant: https://www10.goiania.go.gov.br/DadosINTER/PUBLIC/CONCORR%C3%8ANCIA-PRESENCIAL-FINANCAS/2024/arq_5566945.pdf
- Passeio das Águas Shopping: https://mapcarta.com/pt/W301935532
- Terminal Isidória: https://mapcarta.com/pt/W1418061764
- Terminal Padre Pelágio: https://mapcarta.com/pt/W849512021
- Goiânia Shopping: https://shoppingintelligence.com.br/shoppings/goiania-shopping
- Parque Vaca Brava: https://mapcarta.com/pt/W159590062
- Terminal Praça A: https://mapcarta.com/pt/W1411879960
