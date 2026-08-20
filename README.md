# DoaBem

> O bem que você faz chega mais longe.

O **DoaBem** é um MVP de uma plataforma de doações para conectar pessoas a instituições e campanhas de impacto social. A experiência foi pensada para tornar a descoberta de causas simples, transparente e acolhedora.

## Visão geral

A aplicação apresenta campanhas verificadas, permite explorar causas por diferentes critérios e oferece um fluxo de apoio simulado. O projeto funciona atualmente com dados locais em memória, sendo uma base visual e funcional para a evolução até uma plataforma completa.

## Funcionalidades

- Página inicial com apresentação da plataforma e impacto da comunidade
- Catálogo de campanhas com busca, categorias, cidades, urgência e faixa de meta
- Limpeza dos filtros avançados
- Cards com meta, progresso, apoiadores e urgência da campanha
- Modal de detalhes com descrição, localização, impacto, atualização e CTA de doação
- Fluxo de doação demonstrativo com valores sugeridos e valor personalizado
- Cadastro e login demonstrativos para doadores e instituições
- Ranking de apoiadores com períodos geral e mensal
- Seção de transparência e confiança
- Layout responsivo para desktop e dispositivos móveis

## Stack

- [Next.js](https://nextjs.org/) `16.3.1`
- [React](https://react.dev/) `19.2.8`
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) `4`
- ESLint com `eslint-config-next`

As imagens das campanhas são carregadas do [Unsplash](https://unsplash.com/). Em produção, substitua esses endereços por um serviço de armazenamento otimizado.

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run lint` | Executa o ESLint |
| `npm run build` | Gera a build otimizada de produção |
| `npm run start` | Inicia a aplicação em modo produção |

Validação recomendada antes de abrir um pull request:

```bash
npm run lint
npm run build
```

## Estrutura principal

```text
.
├── app/
│   ├── globals.css   # Identidade visual e estilos responsivos
│   ├── layout.tsx    # Layout raiz e metadados
│   └── page.tsx      # Página principal e interações do MVP
├── public/           # Arquivos públicos estáticos
├── next.config.ts    # Configuração do Next.js
├── package.json      # Scripts e dependências
└── tsconfig.json     # Configuração do TypeScript
```

## Fluxos para testar

1. Use a busca e os filtros para encontrar uma campanha.
2. Clique em **Ver detalhes** para abrir as informações completas.
3. Clique em **Apoiar esta causa** ou **Doar agora**.
4. Crie uma conta demonstrativa ou entre com um e-mail qualquer.
5. Escolha um valor e confirme a doação simulada.
6. Acesse **Ranking de apoiadores** e alterne entre os períodos.

## Estado atual e próximos passos

Este é um MVP frontend. Os dados, autenticação e confirmação de doação são simulados no estado do React e não são persistidos.

Próximas evoluções recomendadas:

- Persistência de usuários, instituições, campanhas e doações
- Autenticação real e controle de permissões
- Integração com Pix e cartão via provedor de pagamentos
- Recibos e notificações por e-mail
- Painel para instituições criarem campanhas e publicarem atualizações
- Prestação de contas e histórico verificável das doações
- Moderação, denúncias e validação documental
- Testes automatizados de componentes e fluxos críticos

## Deploy

A aplicação pode ser publicada na [Vercel](https://vercel.com/) ou em qualquer ambiente compatível com Next.js.

```bash
npm run build
npm run start
```

## Licença

Este projeto ainda não possui uma licença definida.
