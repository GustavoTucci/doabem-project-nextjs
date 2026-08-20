# DoaBem

> O bem que você faz chega mais longe.

O **DoaBem** é um MVP de uma plataforma de doações que aproxima pessoas de instituições e campanhas de impacto social. O produto combina descoberta de causas, transparência e uma experiência de apoio simples, acolhedora e responsiva.

## Sobre o projeto

O projeto foi criado para validar a experiência principal de uma plataforma de doações antes da integração com backend e meios de pagamento. A versão atual utiliza dados locais e estado do React para demonstrar os fluxos da interface.

## Experiência disponível

### Descoberta de campanhas

- Busca por causa, instituição ou cidade
- Filtro por categoria, cidade, urgência e faixa de meta
- Limpeza dos filtros avançados
- Cards com progresso, meta, apoiadores e sinalização de urgência

### Detalhes e doação

- Modal detalhado para cada campanha
- Descrição da causa, localização e impacto esperado
- Atualização mais recente da instituição
- Valores sugeridos e valor personalizado
- Fluxo de doação demonstrativo com confirmação

### Comunidade

- Cadastro e login demonstrativos para doadores e instituições
- Ranking de apoiadores desde o início ou referente ao mês atual
- Selos e informações de contribuição
- Seção sobre verificação, transparência e impacto

## Tecnologias

- [Next.js](https://nextjs.org/) `16.3.1` com App Router
- [React](https://react.dev/) `19.2.8`
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) `4`
- ESLint com `eslint-config-next`

As imagens das campanhas são carregadas do [Unsplash](https://unsplash.com/). Para produção, recomenda-se migrar para um serviço próprio de armazenamento e otimização de imagens.

## Requisitos

- Node.js 20 ou superior
- npm

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run lint` | Verifica o código com ESLint |
| `npm run build` | Gera a build otimizada de produção |
| `npm run start` | Executa a build em modo produção |

Validação local recomendada:

```bash
npm run lint
npm run build
```

## Estrutura

```text
.
├── app/
│   ├── globals.css   # Tokens visuais, componentes e responsividade
│   ├── layout.tsx    # Layout raiz, idioma e metadados
│   └── page.tsx      # Página, dados de demonstração e interações
├── public/           # Recursos estáticos
├── next.config.ts    # Configuração do Next.js
├── package.json      # Scripts e dependências
└── tsconfig.json     # Configuração do TypeScript
```

## Roteiro de demonstração

1. Acesse **Explorar campanhas**.
2. Pesquise uma causa ou combine os filtros disponíveis.
3. Abra **Ver detalhes** em uma campanha.
4. Selecione **Apoiar esta causa** ou **Doar agora**.
5. Crie uma conta demonstrativa ou entre com qualquer e-mail válido.
6. Escolha um valor e confirme a doação simulada.
7. Abra **Ranking de apoiadores** e alterne entre os períodos.

## Estado atual

Este repositório contém um MVP frontend. No momento:

- campanhas e apoiadores são dados demonstrativos;
- autenticação não é persistida nem validada por um servidor;
- doações não movimentam dinheiro real;
- não existe banco de dados ou painel administrativo.

Essas limitações são intencionais para manter o foco na validação da experiência do produto.

## Próximas evoluções

- API e banco de dados para usuários, campanhas e doações
- Autenticação real com permissões para doadores e instituições
- Integração segura com Pix e cartão
- Recibos e notificações por e-mail
- Painel de criação e gestão de campanhas
- Atualizações e prestação de contas das instituições
- Validação documental, moderação e denúncias
- Testes automatizados para componentes e fluxos críticos

## Deploy

A aplicação pode ser publicada na [Vercel](https://vercel.com/) ou em qualquer ambiente compatível com Next.js.

```bash
npm run build
npm run start
```

## Licença

Este projeto ainda não possui uma licença definida.
