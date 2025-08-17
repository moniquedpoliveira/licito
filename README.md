# Sistema Administrativo

Um sistema web moderno para gerenciamento de usuários, construído com Next.js, TypeScript, Tailwind CSS e React Query.

## Características

- 🎨 Interface moderna e responsiva
- 📊 Dashboard com estatísticas em tempo real
- 👥 Gerenciamento completo de usuários (CRUD)
- 🔐 Sistema de roles e permissões
- 📱 Design responsivo para mobile e desktop
- ⚡ Performance otimizada com React Query
- 🎯 Validação de formulários com Zod
- 🎨 Componentes UI reutilizáveis

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Query** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Zod** - Validação de dados
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd sistema-administrativo
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
bun install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   ├── user-form.tsx     # Formulário de usuário
│   └── password-change-dialog.tsx # Diálogo de alteração de senha
├── lib/                  # Utilitários
│   └── utils.ts          # Funções utilitárias
└── providers/            # Providers React
    └── query-provider.tsx # Provider do React Query
```

## Funcionalidades

### Dashboard
- Visualização de estatísticas em tempo real
- Cards informativos com métricas importantes
- Interface limpa e intuitiva

### Gerenciamento de Usuários
- **Listagem**: Visualização de todos os usuários com informações detalhadas
- **Criação**: Formulário para adicionar novos usuários
- **Edição**: Modificação de dados existentes
- **Exclusão**: Remoção de usuários inativos
- **Ativação/Desativação**: Controle de status dos usuários
- **Alteração de Senha**: Redefinição segura de senhas

### Roles e Permissões
- **Administrador**: Acesso total ao sistema
- **Gestor de Contrato**: Gerenciamento de contratos
- **Fiscal Administrativo**: Fiscalização administrativa
- **Fiscal Técnico**: Fiscalização técnica
- **Ordenador de Despesas**: Controle de despesas

## Dados de Demonstração

O sistema inclui dados mockados para demonstração:

- 5 usuários com diferentes roles
- Estatísticas simuladas
- Funcionalidades completas de CRUD

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Personalização

### Cores e Tema
As cores podem ser personalizadas editando as variáveis CSS em `src/app/globals.css`.

### Componentes
Os componentes UI estão localizados em `src/components/ui/` e podem ser facilmente modificados.

### Dados
Para conectar com uma API real, substitua as funções mockadas em `src/app/page.tsx` por chamadas reais à API.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Suporte

Para suporte, envie um email para suporte@empresa.com ou abra uma issue no repositório.
