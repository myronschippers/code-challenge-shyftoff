# Agents and Campaigns Code Challenge

This is a code challenge dealing with a sample DB in [SQLite](https://sqlite.org/) dealing with Agents and Campaigns. Using a provided [SQLite database](./database/shyftoff.db), the build will be for a simple web-based application that fulfills following user stories:

1. As a ShyftOff admin user, I need to manage the agents’ properties and campaign
assignments in a single UI.
2. As a ShyftOff customer user, I want to see my campaign and dashboard of KPIs:
    1. Hours worked, grouped by day, week, and month.

UI should feature responsive design. Bonus for animation or gamification elements incorporated
into the customer dashboard.

Clarified points:
- the tech stack is completely open

## Tech Stack

For the sake of speed the following stack will be used for the project.

- Database
    - SQLite
- Backend
    - Node
    - Express
    - SQLite3
    - Typescript
- Front-end
    - React
    - Typescript
    - react-query
    - Material UI
    - Vite


## Installation

Node version is managed with `nvm` and the `.nvmrc` can be used to install and use the appropriate version.

- [Install `nvm`](https://github.com/nvm-sh/nvm)

Update Node to the project version with the command below.

```bash
nvm use
```

In terminal navigate to the `/server` directory.

```bash
cd server
```

Install dependencies.

```bash
yarn install
```

Open a new terminal at the root of the project.

> NOTE: Leave the `/server` terminal open.

In terminal navigate to the `/client` directory

```bash
cd client
```

Ensure you have the right version of node.

```bash
nvm use
```

Install dependencies.

```bash
yarn install
```

## Usage

In the terminal that you have the `/server` in run...

```bash
yarn dev
```

> NOTE: Server should be running on [http://localhost:3000/](http://localhost:3000/).

**THEN**

In the terminal that you have the `/client` in run...

```bash
yarn dev
```

> NOTE: Client should be running on [http://localhost:5173/](http://localhost:5173/).

## License

[MIT](https://choosealicense.com/licenses/mit/)
