# MzaSen - Sistema de Nutrição e Bem-Estar

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd mzasen
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações:
- `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL
- `JWT_SECRET`: Chave secreta para geração de tokens JWT

4. Configure o banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera o build de produção
- `npm start`: Inicia o servidor em modo produção
- `npm run lint`: Executa o linter

## Tecnologias Utilizadas

- Next.js 15
- PostgreSQL
- Prisma
- TypeScript
- TailwindCSS
- JWT para autenticação

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação
- `/components`: Componentes reutilizáveis
- `/lib`: Utilitários e configurações
- `/prisma`: Schema e migrações do banco de dados

## Funcionalidades

- Página inicial com seções informativas
- Sistema de agendamento de consultas
- Área do paciente com login
- Painel administrativo
- Design responsivo
- Interface moderna e intuitiva

## Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
