# Korisnički zahtev - CRM Sistem za Prodaju Nekretnina

## 1. Verbalni opis za izabranu temu

### Kratak uvod u problem i motivaciju
U dinamičnom svetu nekretnina, agencije se suočavaju sa izazovom efikasnog upravljanja velikim brojem oglasa, podataka o klijentima i komunikacijom između agenata. Ručno vođenje evidencije često dovodi do gubitka informacija, loše koordinacije i propuštenih prilika za prodaju. Motivacija za ovaj projekat je razvoj centralizovanog CRM (Customer Relationship Management) sistema koji automatizuje ove procese i pruža uvid u realnom vremenu.

### Opis ciljeva aplikacije
Glavni ciljevi sistema su:
- Centralizacija baze podataka o nekretninama i klijentima.
- Olakšano praćenje interakcija između agenata i potencijalnih kupaca/zakupaca.
- Automatizacija osnovnih administrativnih zadataka agencije.
- Poboljšanje transparentnosti rada agenata kroz sistem uloga i permisija.

### Opis ciljne grupe korisnika
- **Vlasnici agencija (Administratori)**: Žele pregled celokupnog poslovanja i upravljanje timovima.
- **Agenti za nekretnine**: Potrebno im je efikasno oruđe za unos nekretnina i praćenje kontakata sa klijentima.
- **Klijenti (Registrovani korisnici)**: Žele siguran pristup informacijama o nekretninama i lakšu komunikaciju sa agencijom.

## Realizovane Funkcionalnosti

### Frontend
- **Kontrolna Tabla**: Grafikoni (Recharts) za prikaz statistike, eksterni podaci o kursevi valuta i dnevna inspiracija.
- **Upravljanje Nekretninama**: Pregled, pretraga/filtriranje, dodavanje uz Unsplash integraciju za slike.
- **CRM Modul**: Pun CRUD za klijente, beleženje interakcija (upita i ručnih beleški).
- **Admin Panel**: Upravljanje ulogama korisnika i njihovo brisanje.

### Backend
- **REST API**: Swagger specifikacija dostupna na `/api-docs`.
- **Autentifikacija**: JWT zaštita ruta i RBAC (Role Based Access Control).
- **Bezbednost**: Zaštita od SQLi (Sequelize), CORS, XSS zaštita (Helmet).
- **Automatizacija**: Integrisani testovi (Jest) i Docker podrška.

## API Dokumentacija (Swagger)
Aplikacija koristi Swagger za dokumentovanje API ruta. Specifikaciji se može pristupiti pokretanjem servera i navigacijom na `http://localhost:5000/api-docs`.

## Vizuelni prikaz
- [Kontrolna Tabla sa graficima](file:///c:/Users/Ivana/Desktop/internet-tehnologije-2025-aplikacijazaprodajunekretnina_2021_0353/client/src/pages/Dashboard.jsx)
- [Lista Interakcija](file:///c:/Users/Ivana/Desktop/internet-tehnologije-2025-aplikacijazaprodajunekretnina_2021_0353/client/src/pages/InteractionsList.jsx)

### Sažet pregled funkcionalnosti
Sistem omogućava upravljanje nekretninama (unos, izmena, brisanje), vođenje baze klijenata, beleženje interakcija (pozivi, pregledi nekretnina), kao i vizuelni prikaz lokacija nekretnina na mapi. Sve funkcije su zaštićene sistemom autentifikacije.

---

## 2. Funkcionalni zahtevi

Aplikacija mora da ispuni sledeće zahteve:
1. **Autentifikacija i Autorizacija**: Registracija novih korisnika i prijava na sistem uz dodelu uloga (Admin, Agent, Client).
2. **Upravljanje nekretninama**: Agentima i Adminima je omogućen kompletan CRUD (Create, Read, Update, Delete) nad oglasima.
3. **Upravljanje klijentima**: Vođenje evidencije o kupcima/zakupcima, njihovim preferencijama i kontakt podacima.
4. **Praćenje interakcija**: Mogućnost beleženja svakog kontakta sa klijentom u vezi sa određenom nekretninom (npr. zakazivanje razgledanja).
5. **Geolokacijski prikaz**: Integracija sa mapama za precizan prikaz lokacije nekretnina.
6. **Statistika**: Grafički prikaz osnovnih metrika poslovanja (npr. broj aktivnih oglasa po agentu).

---

## 3. Nefunkcionalni zahtevi

### Performanse
- Vreme odziva API-ja treba da bude manje od 500ms za standardne upite.
- Sistem treba da podržava rad bar 20 istovremenih korisnika bez degradacije performansi.

### Bezbednost
- **Autentifikacija**: Korišćenje JWT (JSON Web Token) za sigurno održavanje sesije.
- **Enkripcija**: Lozinke se u bazi čuvaju kao hash vrednosti (bcrypt).
- **Autorizacija**: Role-based access control (RBAC) ograničava pristup baznim operacijama.

### Pouzdanost i dostupnost
- Sistem treba da bude skalabilan i dostupan 99.9% vremena (produkciono okruženje na Cloudu).

### Upotrebljivost
- Responsive dizajn (prilagođen mobilnim uređajima) korišćenjem Tailwind CSS-a.
- Intuitivna navigacija i jasne povratne informacije korisniku (npr. loading stanja).

### Održavanje i skalabilnost
- Arhitektura bazirana na React-u i Node.js-u omogućava lako dodavanje novih modula.
- Korišćenje Docker-a za uniformno okruženje u razvoju i produkciji.

---

## 4. Uloge nad sistemom i permisije

| Uloga | Dozvoljene funkcije | Ograničenja | Prava pristupa podacima |
| :--- | :--- | :--- | :--- |
| **Administrator** | Sve sistemske funkcije, upravljanje korisnicima i ulogama. | Nema. | Puni pristup celoj bazi. |
| **Agent** | Upravljanje nekretninama i klijentima, unos interakcija. | Ne može da briše ili menja druge agente. | Svoje nekretnine i svi klijenti. |
| **Klijent** | Pregled nekretnina, profil korisnika. | Ne može da dodaje/menja nekretnine ili klijente. | Samo javno dostupni podaci. |
