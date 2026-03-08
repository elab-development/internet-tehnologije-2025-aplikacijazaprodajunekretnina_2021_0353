# CRM za prodaju nekretnina

Ovo je veb aplikacija za upravljanje prodajom nekretnina, razvijena kao projekat za predmet Internet tehnologije.

## Tehnologije

- **Frontend:** React (Vite), TailwindCSS, Axios
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Infrastruktura:** Docker, Swagger, Jest/Supertest

## Struktura Projekta

- `client/`: React aplikacija (Frontend)
- `server/`: Express API (Backend)
- `docker-compose.yml`: Definicija baze podataka i servisa

## Pokretanje Projekta

### 1. Baza podataka (Docker)

Potrebno je imati instaliran Docker. Pokrenite bazu pomoću komande:

```bash
docker-compose up -d
```

### 2. Backend

Uđite u `server` folder, instalirajte zavisnosti i pokrenite server:

```bash
cd server
npm install
npm run dev
```

Server će biti dostupan na `http://localhost:5000`.

### 3. Frontend

Uđite u `client` folder, instalirajte zavisnosti i pokrenite aplikaciju:

```bash
cd client
npm install
npm run dev
```

Aplikacija će biti dostupna na portu koji Vite dodeli (obično `http://localhost:5173`).

## API Dokumentacija

Nakon pokretanja servera, Swagger dokumentacija je dostupna na:
`http://localhost:5000/api-docs`.

## Deployment (Vercel)

Za detaljna uputstva o postavljanju aplikacije na Vercel i povezivanju baze podataka, pogledajte [vodič za deployment](deployment_guide.md).
Projekt sadrži i `server/vercel.json` konfiguaciju spreman za deployment backenda.

## Testiranje

Za pokretanje bekends testova:

```bash
cd server
npm test
```

## Autori

- **Jana** (janaf7620)
- **Ivana** (ivanastovragovic02)
