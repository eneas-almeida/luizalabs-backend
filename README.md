# LuizaLabs - Backend

> **Desafio Luizalabs** Backend.<br />

<p align="center"><img src="./media/logos/luizalabs-logo.png" width="300"/></p>

  <div style={{ marginTop: 16 }} align="center">
    <img
      src="https://img.shields.io/github/commit-activity/t/eneas-almeida/luizalabs-backend"
      alt="Atividade do repositório"
      style={{ marginRight: 8 }}
    />
    <img
      src="https://img.shields.io/github/last-commit/eneas-almeida/luizalabs-backend?color=blue"
      alt="Último commit"
      style={{ marginRight: 8 }}
    />
    <img
      src="https://img.shields.io/github/languages/top/eneas-almeida/luizalabs-backend?color=blue"
      alt="Linguagem principal"
      style={{ marginRight: 8 }}
    />
    <img
      src="https://img.shields.io/github/repo-size/eneas-almeida/luizalabs-backend?color=blue"
      alt="Tamanho do repositório"
      style={{ marginRight: 8 }}
    />
  </div>

## Pré-requisitos

-   NodeJs v16.9.1
-   Yarn v1.22.19
-   Docker version 20.10.22, build 3a2c30b
-   docker-compose version 1.29.2, build 5becea4c

## Como instalar o projeto

```bash
# Clona o repositório
git clone https://github.com/eneas-almeida/luizalabs-backend

# Acessa a pasta do repositório clonado
cd luizalabs-backend

# Renomeia o arquivo .env-example para .env
mv .env-example .env

# Sobe os containers do postgres e mongodb
docker-compose up -d

# Instala os pacotes com o yarn
yarn install
```

## Como rodar o projeto

```bash
# Executa o script dev do package.json
yarn dev
```

Ao executar o comando acima, deverá apresentar essa tela:

<img src="./media/images/tela-ok.png" width="500"/>

## Como rodar os testes unitários

```bash
# Executa o test dev do package.json
yarn test
```

Ao executar o comando acima, deverá apresentar essa tela:

<img src="./media/images/testes-ok.png" width="500"/>

<hr>

© Documento elaborado por <a href="https://github.com/eneas-almeida">Enéas Almeida</a>.
