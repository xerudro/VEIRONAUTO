

## 1. Product Requirements Document (PRD) – Veiron Auto Website

### Overview

- **Client:** Veiron Auto (rent-a-car local)
- **Current Site:** Joomla 3.9, neactualizat din 2017, non-upgradabil
- **Obiectiv:** Website nou, modern, responsive, bilingv (RO/EN), cu proces de booking inspirat de autonom.ro și carduri auto stilizate după sixt.ro (4 pe rând), design minimalist și SEO friendly.


### Cerințe Funcționale

#### Funcționalități principale

- **Catalog auto:** Listare a tuturor mașinilor cu detalii și tarife (din Excel).
- **Booking flow:** 4 pași (date/locații, selecție mașină, extraopțiuni, confirmare), ca pe autonom.ro.
- **Carduri auto:** Design modern, minimalist, clar, 4 pe rând, focus pe informații esențiale.
- **Design minimalist, profesionist și fluid:** Spațiere aerisită, fonturi moderne, iconografie clară, animații subtile.
- **Responsive:** Desktop-first, dar complet funcțional pe mobil/tabletă.
- **Bilingv:** Română și Engleză.
- **Monede:** RON și EUR, conversie în timp real.
- **Formulare cu input telefon:** Casetele pentru telefon să includă selector de țară cu steag, cod de țară și input numeric, pe un singur rând, design minimalist, exact ca în exemplu.
- **Bază de date:** MariaDB (schema compatibilă cu PostgreSQL).
- **Admin Panel:** Pentru gestionare flotă, tarife, rezervări (opțional, faza 2).


#### Cerințe Tehnice

- **Frontend:** HTML, CSS, JavaScript (modular, în `assets/javascript`).
- **Slider:** Swiper.js pentru galerii.
- **Framework:** Bootstrap sau similar pentru responsive.
- **Backend:** PHP pentru interacțiunea cu baza de date și trimitere email (PHPMailer).
- **Securitate:** HTTPS, validare input, GDPR.
- **Schema.org:** Implementare markup structurat pentru AutoRental, Car/Product, RentalCarReservation, Organization.
- **SEO:** Structură semantică HTML5, meta tag-uri, URL-uri prietenoase, optimizare imagini, heading-uri corecte, sitemap XML, robots.txt, performance optimizat.


#### Integrare

- **Date rezervare:** Salvare în DB și trimitere pe email.
- **Multi-language \& multi-currency:** Toate elementele UI și datele relevante.
- **Input telefon:** Selector de țară cu steag, cod și input numeric, validare și auto-format.


### Cerințe Non-funcționale

- **Performanță:** Încărcare rapidă, imagini optimizate, lazy loading.
- **Accesibilitate:** Contrast ridicat, fonturi lizibile, navigare cu tastatura, etichete pentru formulare.
- **SEO:** Semantic HTML, meta tag-uri, sitemap, schema.org.
- **Scalabilitate:** Ușor de adăugat mașini, tarife, limbi.


### Constrângeri

- Doar PHP pentru backend, fără framework-uri mari.
- Fără cod legacy din Joomla.
- Schema DB portabilă pe Postgres.