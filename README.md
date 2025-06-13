# 🎬 AngoMovies

Este é um projeto construído com [Next.js](https://nextjs.org), iniciado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). O objetivo principal é criar uma plataforma de navegação de filmes e séries com uma experiência similar à Netflix.

## 🚀 Funcionalidades do Projeto

- Integração com a API do [The Movie Database (TMDb)](https://www.themoviedb.org/)
- Destaque em um **Hero Banner** com os filmes mais recentes
- Listagens separadas por categoria:
  - Ação
  - Comédia
  - Terror
  - Romance
  - Documentário
- Filtros específicos:
  - Originais da Netflix
  - Recomendados para o usuário
  - Em alta no momento

## 📂 Estrutura e Tecnologias

- **Next.js App Router** com diretório `/app`
- Estilização com **TailwindCSS**
- Componentes reutilizáveis
- Fontes otimizadas com [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) e [Geist](https://vercel.com/font)
- Acesso dinâmico a dados usando `fetch` na camada de servidor e/ou cliente

## 🖥️ Iniciando o Projeto

1. Instale as dependências:

```bash
npm install
# ou
yarn
