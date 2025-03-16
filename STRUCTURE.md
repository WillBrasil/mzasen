# Estrutura do Projeto

Este documento descreve a estrutura de pastas e arquivos do projeto, com sugestões de organização.

## Estrutura Atual

```
mzasen/
├── app/                    # Páginas da aplicação (Next.js App Router)
│   ├── api/                # Rotas de API
│   ├── painel-paciente/    # Páginas do painel do paciente
│   ├── painel-profissional/# Páginas do painel do profissional
│   ├── painel/             # Páginas do painel administrativo
│   └── ...                 # Outras páginas
├── components/             # Componentes React
│   ├── layout/             # Componentes de layout (header, footer)
│   ├── pages/              # Componentes específicos de páginas
│   ├── ui/                 # Componentes de UI reutilizáveis
│   └── mobile-menu.tsx     # Componente de menu mobile
├── lib/                    # Bibliotecas e utilitários
│   ├── utils/              # Funções utilitárias
│   ├── auth.tsx            # Lógica de autenticação
│   ├── db.ts               # Configuração do banco de dados
│   ├── jwt.ts              # Utilitários JWT
│   ├── prisma.ts           # Cliente Prisma
│   └── utils.ts            # Utilitários gerais
└── public/                 # Arquivos estáticos
```

## Proposta de Reorganização

```
mzasen/
├── app/                    # Páginas da aplicação (Next.js App Router)
│   ├── api/                # Rotas de API
│   │   ├── auth/           # Endpoints de autenticação
│   │   ├── pacientes/      # Endpoints de pacientes
│   │   └── ...             # Outros endpoints
│   ├── (auth)/             # Páginas de autenticação agrupadas
│   │   ├── login/          
│   │   └── registro/       
│   ├── (dashboard)/        # Painéis agrupados
│   │   ├── painel-paciente/
│   │   ├── painel-profissional/
│   │   └── painel/         
│   └── (marketing)/        # Páginas públicas agrupadas
│       ├── servicos/
│       ├── equipe/
│       └── ...
├── components/             # Componentes React
│   ├── auth/               # Componentes de autenticação
│   ├── dashboard/          # Componentes de dashboard
│   │   ├── paciente/       # Componentes específicos do paciente
│   │   ├── profissional/   # Componentes específicos do profissional
│   │   └── admin/          # Componentes administrativos
│   ├── layout/             # Componentes de layout
│   │   ├── headers/        # Diferentes headers
│   │   ├── footers/        # Diferentes footers
│   │   └── navigation/     # Componentes de navegação
│   └── ui/                 # Componentes de UI reutilizáveis
│       ├── data-display/   # Tabelas, cards, etc.
│       ├── feedback/       # Alertas, toasts, etc.
│       ├── forms/          # Inputs, selects, etc.
│       └── navigation/     # Tabs, menus, etc.
├── lib/                    # Bibliotecas e utilitários
│   ├── api/                # Funções para chamadas de API
│   ├── auth/               # Lógica de autenticação
│   │   ├── index.ts        # Exportações principais
│   │   ├── provider.tsx    # Provider de autenticação
│   │   └── utils.ts        # Utilitários de autenticação
│   ├── db/                 # Lógica de banco de dados
│   │   ├── index.ts        # Exportações principais
│   │   ├── prisma.ts       # Cliente Prisma
│   │   └── schema.prisma   # Schema do Prisma
│   └── utils/              # Utilitários gerais
│       ├── date.ts         # Funções de data
│       ├── format.ts       # Funções de formatação
│       └── validation.ts   # Funções de validação
└── public/                 # Arquivos estáticos
```

## Benefícios da Nova Estrutura

1. **Melhor Organização**: Componentes e bibliotecas agrupados por funcionalidade.
2. **Facilidade de Manutenção**: Mais fácil encontrar e modificar arquivos relacionados.
3. **Escalabilidade**: Estrutura preparada para crescimento do projeto.
4. **Reutilização**: Componentes organizados por propósito, facilitando a reutilização.
5. **Clareza**: Estrutura mais intuitiva para novos desenvolvedores.

## Implementação Gradual

Para implementar esta reorganização sem interromper o desenvolvimento:

1. Criar as novas pastas
2. Mover arquivos gradualmente, atualizando importações
3. Testar cada mudança antes de prosseguir
4. Atualizar a documentação conforme necessário

## Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `Button.tsx`)
- **Utilitários**: camelCase (ex: `formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_ENDPOINTS.ts`)
- **Tipos/Interfaces**: PascalCase com prefixo I para interfaces (ex: `IUser.ts`)
- **Hooks**: Prefixo use (ex: `useAuth.ts`) 