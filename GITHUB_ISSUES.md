# Issues para registrar no GitHub

## Issue #06 — Layout responsivo e proteção do formulário

### Contexto

As telas do aplicativo precisam funcionar corretamente em diferentes tamanhos de tela. A tela de cadastro de doação precisa de atenção especial porque o teclado pode cobrir os últimos campos.

### Objetivo

Auditar e ajustar a responsividade das telas existentes, com foco no formulário "Nova doação".

### Critérios de aceite

- Aplicação testada em pelo menos dois tamanhos de tela.
- Nenhum elemento cortado, sobreposto ou fora da área visível.
- Nenhum campo do formulário fica coberto pelo teclado.
- O formulário mantém boa organização visual em celular e tablet.

### Implementação

- `SafeAreaView` com `edges={['bottom', 'left', 'right']}`.
- `KeyboardAvoidingView` com `padding` no iOS e `height` no Android.
- `width: '100%'`, `maxWidth: 700` e `alignSelf: 'center'` no cartão do formulário.

---

## Issue #07 — Favoritos persistidos com AsyncStorage

### Contexto

O aplicativo precisa permitir que o usuário marque pontos importantes e mantenha essa escolha mesmo depois de fechar e abrir o aplicativo.

### Objetivo

Permitir marcar e desmarcar pontos de atendimento como favoritos e persistir os ids localmente.

### Critérios de aceite

- Cada ponto possui um controle de favorito.
- O usuário consegue marcar e desmarcar o ponto.
- O estado visual diferencia favorito de não favorito.
- Os ids são persistidos com AsyncStorage.
- Os favoritos são carregados ao abrir a lista novamente.
- O campo de favorito não é incluído no objeto `Ponto`.

---

## Issue #08 — Organização do projeto por funcionalidade

### Contexto

Com o crescimento do aplicativo, concentrar todas as responsabilidades no `App.tsx` dificulta a manutenção.

### Objetivo

Separar o projeto por responsabilidade, preservando o comportamento da aplicação.

### Estrutura

- `screens`: telas do aplicativo.
- `components`: componentes reutilizáveis.
- `data`: dados mockados.
- `navigation`: tipos da navegação.
- `services`: persistência local.
- `types`: tipos compartilhados.

### Critérios de aceite

- `App.tsx` fica focado na navegação.
- Cada tela possui seu próprio arquivo.
- Os mocks ficam separados da interface.
- A persistência dos favoritos fica separada da tela.
- O comportamento do aplicativo é preservado.
