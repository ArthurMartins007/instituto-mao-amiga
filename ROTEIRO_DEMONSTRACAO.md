# Roteiro de demonstração — até 3 minutos

1. Abrir a lista de pontos e mostrar favoritos.
2. Entrar em "Nova doação" e cadastrar um exemplo.
3. Abrir "Minhas doações" e mostrar a nova doação no histórico.
4. Usar o filtro por tipo de item.
5. Abrir uma doação, mostrar os dados e editar a quantidade.
6. Voltar ao histórico e mostrar o resumo atualizado.
7. Abrir uma doação e excluí-la, confirmando o Alert.
8. Fechar e reabrir o app para demonstrar que o histórico permanece salvo.

## Decisão técnica para explicar
O acesso às doações fica concentrado em `doacoesStorage.ts`. As telas não chamam
AsyncStorage diretamente. O resumo e o filtro são calculados a partir do array atual,
sem manter uma segunda cópia desnecessária dos dados.
