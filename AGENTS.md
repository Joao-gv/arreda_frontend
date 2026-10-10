# Instruções para agentes — Frontend Arreda

Este documento orienta alterações no frontend do Arreda, a interface de caronas para alunos e servidores do IFMG. O objetivo é manter o código compreensível e consistente e preservar a identidade visual já adotada.

## Antes de alterar o projeto

- Leia este arquivo e consulte `README.md`, `package.json`, as telas e os estilos relacionados à tarefa.
- Confira o estado do Git e preserve alterações locais. Trabalhe apenas no escopo solicitado.
- Use o código existente e os tokens de `tailwind.config.js` como referência. Não presuma que documentação antiga descreve a implementação atual.
- O frontend atual é Vue 3. Não crie telas em React nem introduza outro framework para uma funcionalidade isolada.
- A divisão de trabalho antiga entre pessoas ou duplas não define as atribuições atuais.

## Tecnologias e organização

- Vue 3 com JavaScript, Single File Components e Composition API.
- Vite para desenvolvimento e build; Tailwind CSS para estilização; Vue Router para navegação; Axios para consumo da API.
- Use `lucide-vue-next` para ícones, mantendo o estilo de traço usado nas telas existentes.
- Estrutura principal em `src/`:
  - `components/`: componentes reutilizáveis, como a navegação global.
  - `views/`: telas associadas às rotas.
  - `services/`: chamadas HTTP e integração com o backend.
  - `composables/`: estado e lógica reutilizáveis da Composition API.
  - `router/`: rotas e regras de navegação.
  - `stores/`: estado compartilhado quando a aplicação realmente precisar dele.
  - `environments/`: configuração de ambiente, incluindo a URL base da API.
- A estrutura e as dependências atuais de `package.json` são a referência. Evite introduzir dependências quando os recursos existentes forem suficientes.

## Boas práticas de código

- Prefira `<script setup>` e Composition API, seguindo o padrão predominante nas telas existentes.
- Mantenha componentes com responsabilidades claras. Extraia componentes ou composables quando houver reutilização ou lógica que dificulte a leitura da tela.
- Centralize chamadas HTTP nos serviços e reutilize a configuração compartilhada em `src/services/api.js`. Não duplique URLs, interceptors ou tratamento de autenticação dentro de cada view.
- Use os composables existentes, como `useAuth` e `useToast`, quando forem adequados; evite criar estados globais paralelos para a mesma finalidade.
- Em operações assíncronas, apresente estados de carregamento, sucesso e erro, e impeça envios repetidos quando necessário.
- Mantenha contratos com a API coerentes com os DTOs e endpoints do backend. Não exponha tokens ou dados sensíveis em mensagens, URLs ou logs.
- Use chaves estáveis em listas, evite lógica extensa no template e não altere props recebidas pelo componente.
- Escreva formulários acessíveis: associe `label` e campo, use tipos de input corretos, apresente erros junto ao campo e preserve navegação por teclado e foco visível.
- Remova código temporário, imports não usados e logs de depuração antes de concluir a tarefa.

## Padrões visuais

Use as telas enviadas como referência visual junto com as telas existentes. Mantenha uma interface limpa, acolhedora e consistente com a identidade atual do Arreda.

- **Cores:** use o tema Tailwind já configurado: `arreda-green` (`#00BFA6`) para ações e destaques principais, `arreda-dark` (`#009985`) para estados de hover, e `arreda-light` (`#E6F9F6`) para fundos suaves. Combine com branco, `gray-50` em fundos, `gray-100/200` em bordas, `gray-600` para texto auxiliar e `gray-800/900` para títulos.
- **Tipografia:** mantenha a fonte sans-serif existente. Use títulos destacados e em negrito; use texto auxiliar em cinza com tamanho confortável. Preserve hierarquia clara entre título da tela, descrição, seção e conteúdo.
- **Layout:** centralize o conteúdo e limite a largura em telas desktop, seguindo os containers existentes (`max-w-5xl` quando apropriado). Use espaçamento consistente e alinhe título, filtros e conteúdo como nas telas de reservas e busca.
- **Navegação:** mantenha a barra superior branca, com logo verde, links em cinza escuro, divisor discreto e sombra leve. A ação principal, como “Área do Motorista”, usa o verde da marca e formato de pílula.
- **Cards e superfícies:** use cartões brancos sobre fundo claro, bordas discretas, cantos arredondados (`rounded-2xl` ou `rounded-3xl`) e sombras suaves. Evite contornos escuros ou sombras pesadas sem necessidade.
- **Ações:** botões principais usam fundo verde, texto branco em negrito, cantos arredondados e hover em `arreda-dark`. Ações secundárias podem usar azul-marinho/cinza escuro, como o botão de busca da página inicial. Mantenha estados desabilitados e de foco claramente visíveis.
- **Campos:** use superfícies brancas ou cinza muito claro, bordas cinza, cantos arredondados e foco destacado com o verde da marca. Ícones devem apoiar a identificação do campo, sem substituir rótulos acessíveis.
- **Abas e estados vazios:** para abas, use um controle segmentado cinza com a aba ativa em superfície branca e texto verde. Estados vazios devem ser claros e centralizados, com espaço suficiente e sem parecer erro.
- **Responsividade:** adote abordagem mobile-first. Empilhe formulários e cartões em telas estreitas, use grades a partir dos breakpoints Tailwind quando houver espaço e evite rolagem horizontal da página.
- **Acessibilidade:** mantenha contraste adequado, foco de teclado perceptível, áreas clicáveis confortáveis e feedback textual além de cor ou ícone.
- **Consistência:** prefira tokens e classes já usadas em `tailwind.config.js` e nos componentes. Não invente uma nova paleta, tipografia, escala de bordas ou estilo de ícones para uma tela isolada.

As imagens de referência mostram, em especial, cabeçalho branco com marca verde, fundo cinza muito claro, conteúdo centralizado, títulos escuros, botões verde-turquesa, cartões arredondados e estados vazios simples. Use-as como guia de composição; confira também o comportamento responsivo e os componentes reais do projeto.

## Branches, commits e Pull Requests

- Toda alteração deve começar em uma branch nova criada a partir da `main` atualizada. Nunca desenvolva ou faça commits diretamente na `main`.
- Fluxo esperado:

  ```bash
  git checkout main
  git pull
  git checkout -b feat/descricao-curta
  ```

- Use prefixos de branch adequados, como `feat/`, `fix/`, `style/` e `docs/`.
- Faça commits apenas na branch da tarefa, seguindo Conventional Commits em português, conforme o guia de contribuição do projeto.
- Ao concluir a tarefa, envie a branch e solicite integração por Pull Request para `main`. A `main` recebe mudanças por PR; não faça merge ou push direto nela.

## Validação

- Consulte `package.json` para os comandos disponíveis. Quando a tarefa pedir validação, ou quando ela for necessária para confirmar a alteração, use os scripts pertinentes, como `npm run lint` e `npm run build`.
- Ao concluir, informe os arquivos alterados, o comportamento visual ou funcional e as validações executadas.
