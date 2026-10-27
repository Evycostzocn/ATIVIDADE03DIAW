# Pokédex — React + Vite

Projeto da Atividade 03, desenvolvido com React, Vite, JavaScript e CSS. A interface é inspirada na Pokédex clássica, com cards vermelhos, visor e layout responsivo.

## O que foi feito

- Exibição dos 151 Pokémon com nome, ID, tipos e seis atributos.
- Pesquisa por nome ou ID e filtro por tipo, com opção de limpar os filtros.
- Cards clicáveis que abrem os detalhes em um modal, com suporte a teclado e fechamento por Escape.
- Área com os 12 treinadores e seus Pokémon associados.
- Imagens obtidas pela [PokéAPI](https://pokeapi.co/), com cache e alternativa visual quando indisponíveis.
- Efeitos de hover e foco, respeitando a preferência por movimento reduzido.

Nomes, tipos, atributos e relações vêm do arquivo local `src/data/pokedex-data.json`, fornecido pela atividade. A API complementa apenas as imagens; sua indisponibilidade não impede a consulta dos dados locais.

## Como rodar

É necessário ter **Node.js 22.12 ou superior** e npm instalados.

Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador. Se a porta estiver ocupada, utilize a URL informada pelo Vite no terminal.

## Outros comandos

```bash
npm run build    # Gera a versão de produção na pasta dist
npm run preview  # Abre uma prévia local do build
npm run lint     # Verifica o código com ESLint
npm test         # Executa os testes
```

## Organização

- `src/components/`: componentes da interface.
- `src/css/`: estilos dos componentes.
- `src/data/`: JSON original e funções de consulta.
- `src/hooks/` e `src/services/`: carregamento e cache das imagens.
- `tests/`: testes dos dados e do serviço de imagens.
