# ♻ Ecoleta

A **better** way to make the world a **better** place!
In progress

![GitHub repo size](https://img.shields.io/github/repo-size/arcmena/ecoleta?color=green&style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/arcmena/ecoleta?color=green&style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/arcmena/ecoleta?color=green&style=for-the-badge)

## What is Ecoleta?

Ecoleta is a way to connect people to entities that take care of the collection of specific recyclable residues, like batteries, heavy oils or paper.

The APP was created at Next Level Week #1 hosted by Rocketseat. Originally the backend was made using KnexJS and SQLite, but along the way I decided to change to Sequelize ORM and PostgreSQL for the DB.

## Presentation

## Getting started

This repository contains the Backend API, Frontend APP and Mobile version. You may have to configure Expo, an android or ios emulator.

```ssh
git clone https://github.com/arcmena/ecoleta.git
```

> **Note:** You will need to have PostgreSQL installed on your machine.

### Especific Database configuration

After installing the dependencies, create a **.env.development** file in the backend directory with the following structure:

```bash
# PostgreSQL Database variables

DB_HOST=        # The DB host address. e.g.: localhost
DB_USER=        # The DB username. e.g.: postgres
DB_PASSWORD=    # The DB passowrd. e.g.: postgres
DB_DATABASE=    # The DB name. e.g.: ecoletadb
DB_PORT=        # The DB port. e.g.: 5432

```

After that you should be good to start running the API.

#### Backend

```bash

cd backend

#To install the dependencies
yarn install

#To start
yarn start

```

> **Note:** The server will start running on http://localhost:3300

#### Frontend

```bash

cd frontend

#To install the dependencies
yarn install

#To start
yarn start

```

> **Note:** The server will start running on http://localhost:3000

## Author

- **Marcelo Mena** - [arcmena](https://github.com/arcmena)
