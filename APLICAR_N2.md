# Como aplicar os arquivos da N2 no repositório existente

Este pacote é uma atualização incremental do repositório `instituto-mao-amiga`, não um projeto Expo completo independente.

1. Faça uma cópia da pasta atual antes de substituir arquivos.
2. Extraia o conteúdo deste ZIP diretamente na raiz do repositório clonado, mesclando as pastas e substituindo os arquivos existentes.
3. Confirme que `api/` fica ao lado de `App.tsx` e `package.json`.
4. Ajuste o IP em `src/services/api.ts` para o IPv4 do computador.
5. Remova estes arquivos antigos, que foram substituídos pela API:
   - `src/data/pontosMock.ts`
   - `src/types/Ponto.ts` (atenção: manter `src/types/ponto.ts`, com p minúsculo)
   - `src/services/doacoesStorage.ts`
   - `api/src/main/java/br/com/maoa/instituto/api/dto/PontoResponse.java`
   - `api/src/main/java/br/com/maoa/instituto/api/dto/PontoPageResponse.java`
6. Mantenha `src/services/favoritosStorage.ts`: ele usa AsyncStorage apenas para guardar IDs favoritos, como a N2 pede.
7. Rode a API pela pasta `api/`: `mvn spring-boot:run`.
8. Na raiz do app, rode `npm install`, `npx tsc --noEmit` e `npx expo start -c`.
9. Teste os fluxos e capture as evidências reais do Swagger em `api/docs/swagger/`.

A versão anterior usa ID numérico para pontos e um endpoint `/pontos`. A N2 usa UUID e `/api/v1`. A API agora grava em um arquivo H2 novo (`instituto-mao-amiga-n2`) para não reaproveitar uma estrutura antiga incompatível.
