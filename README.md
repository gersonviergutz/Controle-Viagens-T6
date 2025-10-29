# 🌍 Controle de Viagens

Sistema web para gerenciamento de viagens e despesas de deslocamento, permitindo o controle completo de viagens planejadas e realizadas.

## 📋 Sobre o Projeto

O **Controle de Viagens** é uma aplicação web desenvolvida para facilitar o gerenciamento de viagens corporativas ou pessoais. A aplicação permite registrar, editar, excluir e acompanhar o status de viagens, incluindo informações detalhadas sobre origem, destino, datas, companhias aéreas e valores.

## ✨ Funcionalidades

### Autenticação
- ✅ Cadastro de usuários com e-mail e senha
- ✅ Login seguro com autenticação via Supabase
- ✅ Recuperação de senha por e-mail
- ✅ Atualização de senha
- ✅ Gerenciamento de perfil de usuário
- ✅ Proteção de rotas autenticadas

### Gerenciamento de Viagens
- ✅ **Criar Viagem** - Registrar nova viagem com:
  - Origem e destino
  - Datas de ida e volta
  - Companhia aérea
  - Valor em Real (BRL)
  - Status (Pendente/Comprado)
  - Observações
- ✅ **Visualizar Viagens** - Dashboard com todas as viagens do usuário
- ✅ **Editar Viagem** - Modificar informações de viagens existentes
- ✅ **Excluir Viagem** - Remover viagens com confirmação
- ✅ **Alterar Status** - Alternar entre "Pendente" e "Comprado"
- ✅ **Indicadores Visuais** - Badges coloridos de status:
  - 🟢 Verde para "Comprado"
  - 🟡 Amarelo para "Pendente"

### Interface
- 📱 Design responsivo (mobile-first)
- ⚡ Indicadores de carregamento
- 🎨 Interface moderna com Tailwind CSS
- 🔔 Mensagens de erro e sucesso
- 🪟 Modais para operações de CRUD
- 🎯 Ícones intuitivos (Lucide React)

## 🛠 Tecnologias Utilizadas

### Frontend
- **React** 19.2.0 - Biblioteca para construção de interfaces
- **TypeScript** 5.8.2 - Superset do JavaScript com tipagem estática
- **Vite** 6.2.0 - Build tool e servidor de desenvolvimento
- **React Router DOM** 7.9.4 - Roteamento client-side
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** 0.546.0 - Biblioteca de ícones SVG

### Backend & Banco de Dados
- **Supabase** - Backend-as-a-Service
  - PostgreSQL para banco de dados
  - Autenticação integrada
  - Row Level Security (RLS) para isolamento de dados
- **@supabase/supabase-js** v2 - Cliente JavaScript do Supabase

### Ferramentas de Desenvolvimento
- **pnpm** - Gerenciador de pacotes
- **TypeScript Compiler** - Compilador TypeScript
- **Vite React Plugin** - Plugin Vite para React

## 📁 Estrutura do Projeto

```
Controle-Viagens-T6/
├── components/                    # Componentes React
│   ├── ui/                       # Componentes UI reutilizáveis
│   │   ├── Button.tsx           # Botão customizado
│   │   ├── Input.tsx            # Input customizado
│   │   └── Alert.tsx            # Componente de alerta
│   ├── auth/                    # Componentes de autenticação
│   │   ├── LoginForm.tsx        # Formulário de login
│   │   ├── SignupForm.tsx       # Formulário de cadastro
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── ProtectedRoute.tsx   # Proteção de rotas
│   ├── AddTripModal.tsx         # Modal de criação de viagem
│   ├── EditTripModal.tsx        # Modal de edição de viagem
│   ├── TravelCard.tsx           # Card de exibição de viagem
│   ├── Header.tsx               # Cabeçalho da aplicação
│   └── LoadingSpinner.tsx       # Indicador de carregamento
├── pages/                         # Páginas da aplicação
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── ResetPasswordPage.tsx
│   └── DashboardPage.tsx        # Página principal do dashboard
├── contexts/                      # Contextos React
│   └── AuthContext.tsx          # Gerenciamento de estado de autenticação
├── services/                      # Serviços e lógica de negócio
│   └── supabaseClient.ts        # Inicialização do cliente Supabase
├── types/                         # Definições de tipos TypeScript
│   └── auth.ts                  # Tipos relacionados à autenticação
├── supabase/                      # Migrações do banco de dados
│   └── migrations/
│       ├── 001_create_profiles_table.sql
│       ├── 002_update_despesas_table.sql
│       ├── 003_setup_rls_policies.sql
│       └── 004_fix_rls_recursion.sql
├── App.tsx                       # Componente principal com rotas
├── types.ts                      # Tipos globais (Trip, TripStatus)
├── index.tsx                     # Ponto de entrada React
├── index.html                    # Ponto de entrada HTML
├── vite.config.ts               # Configuração do Vite
├── tsconfig.json                # Configuração do TypeScript
└── package.json                 # Dependências do projeto
```

## 🗄️ Estrutura do Banco de Dados

### Tabela `profiles`
```sql
- id (UUID) - ID do usuário (referência auth.users)
- email (VARCHAR) - E-mail do usuário
- role (VARCHAR) - Papel ('user' ou 'admin')
- full_name (VARCHAR) - Nome completo
- created_at (TIMESTAMP) - Data de criação
- updated_at (TIMESTAMP) - Data de atualização
```

### Tabela `despesas`
```sql
- id (NUMBER) - Chave primária
- user_id (UUID) - ID do proprietário (referência auth.users)
- origem (STRING) - Cidade de origem
- destino (STRING) - Cidade de destino
- data_ida (DATE) - Data de ida
- data_volta (DATE) - Data de volta
- companhia (STRING) - Nome da companhia aérea
- valor (NUMBER) - Custo da viagem em BRL
- status (STRING) - 'Pendente' ou 'Comprado'
- observacao (STRING) - Observações/notas
- created_at (TIMESTAMP) - Data de criação
```

### Segurança (Row Level Security)
- Usuários podem visualizar/editar/excluir apenas seus próprios registros
- Administradores têm acesso total a todos os dados
- Usuários autenticados têm permissões SELECT, INSERT, UPDATE, DELETE

## 🚀 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **pnpm** (recomendado) ou npm
- Conta no **Supabase** (gratuita)

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/gersonviergutz/Controle-Viagens-T6.git
cd Controle-Viagens-T6
```

2. **Instale as dependências:**
```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente:**

O projeto está configurado para usar o Supabase. Você precisa atualizar as credenciais no arquivo `services/supabaseClient.ts`:

```typescript
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseAnonKey = 'SUA_CHAVE_ANONIMA_DO_SUPABASE';
```

4. **Execute as migrações do banco de dados:**

No painel do Supabase, execute os arquivos SQL em ordem na pasta `supabase/migrations/`:
- `001_create_profiles_table.sql`
- `002_update_despesas_table.sql`
- `003_setup_rls_policies.sql`
- `004_fix_rls_recursion.sql`

## 🎮 Como Usar

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

Para criar uma build otimizada:

```bash
pnpm build
# ou
npm run build
```

### Preview da Build

Para visualizar a build de produção localmente:

```bash
pnpm preview
# ou
npm run preview
```

## 📜 Scripts Disponíveis

- `pnpm dev` - Inicia servidor de desenvolvimento
- `pnpm build` - Cria build de produção
- `pnpm preview` - Visualiza build de produção localmente

## 🔐 Segurança

- Autenticação segura via Supabase
- Row Level Security (RLS) para isolamento de dados entre usuários
- Proteção de rotas sensíveis com `ProtectedRoute`
- Validação de formulários
- Tokens JWT para gerenciamento de sessão

## 🏗️ Padrões de Arquitetura

### Gerenciamento de Estado
- React Context API (AuthContext) para estado global de autenticação
- State local com useState para estado de UI
- useCallback para funções memoizadas

### Fluxo de Autenticação
- AuthContext envolve toda a aplicação
- Hook useAuth fornece acesso às funções de autenticação
- ProtectedRoute controla acesso às páginas
- Restauração automática de sessão no carregamento

### Fluxo de Dados
- DashboardPage busca viagens na montagem do componente
- Atualizações otimistas para interações do usuário
- Tratamento de erros com mensagens amigáveis
- Atualização automática após mutações

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por [Gerson Viergutz](https://github.com/gersonviergutz)

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através das issues do GitHub.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
