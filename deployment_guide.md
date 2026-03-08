# Vercel Deployment Guide

Ovaj vodič će vam pomoći da postavite svoju aplikaciju na Vercel platformu. Pošto aplikacija ima i Frontend (React) i Backend (Node.js), najlakši način je da ih povežete preko GitHub-a.

## Opcija 2: Render.com Deployment (Preporučeno)

Ova opcija je najlakša jer sam kreirao `render.yaml` fajl koji sve radi automatski.

### Koraci:
1. Prijavite se na [Render.com](https://render.com/).
2. Kliknite na dugme **New +** i izaberite **Blueprint**.
3. Povežite vaš GitHub repozitorijum.
4. Render će pročitati `render.yaml` i ponuditi vam da kreira:
   - **crm-db** (PostgreSQL baza)
   - **crm-api** (Backend server)
   - **crm-frontend** (Frontend sajt)
5. Kliknite na **Apply**.
6. Sačekajte par minuta da se sve instalira.

**Napomena**: Render će automatski povezati bazu sa serverom i server sa frontendom. Nema ručnog kucanja lozinki! ✨

## 1. Priprema Baze Podataka
Vercel ne podržava Docker za bazu, pa vam je potrebna "Cloud" baza.
- Preporučujem [Neon.tech](https://neon.tech/) ili **Vercel Postgres**.
- Kreirajte bazu i dobićete **Connection String** (npr. `postgres://user:password@host/dbname`).

## 2. Postavljanje Backenda (Server)
1. Prijavite se na [Vercel](https://vercel.com/).
2. Kliknite na **Add New > Project** i izaberite svoj GitHub repo.
3. Za **Root Directory** izaberite folder `server`.
4. U **Environment Variables** dodajte sledeće:
   - `DATABASE_URL`: Vaš connection string od maločas.
   - `JWT_SECRET`: Neki nasumični dugački string.
   - `NODE_ENV`: `production`
5. Kliknite **Deploy**. Backend će sada biti dostupan na nekom URL-u (npr. `moj-projekat-api.vercel.app`).

## 3. Postavljanje Frontenda (Client)
1. Ponovite proces: **Add New > Project** za isti repo.
2. Za **Root Directory** izaberite folder `client`.
3. U **Framework Preset** izaberite **Vite**.
4. U **Environment Variables** dodajte:
   - `VITE_API_URL`: URL vašeg deplojevanog backenda (iz prethodnog koraka).
5. Kliknite **Deploy**.

## 4. Povezivanje
Nakon što se sve završi, vaš Frontend će komunicirati sa vašim Backendom na Cloud-u umesto sa `localhost`.

> [!IMPORTANT]
> Ne zaboravite da u fajlu `client/src/services/api.js` promenite `baseURL` da koristi `import.meta.env.VITE_API_URL || 'http://localhost:5000/api'`.

> [!TIP]
> Za bazu možete koristiti i **Vercel Postgres** direktno iz menija "Storage" na Vercel dashboard-u. To je najlakša opcija jer se automatski povezuje sa vašim projektom.
