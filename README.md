# 🏷️ ProjectTask - Personnel Management System (PMS)

A lightweight Laravel 12 + Inertia (React) application to manage users, user groups, locations (divisions, districts, areas), designations, branches, and related assets.

---

## 🚀 Quick Overview

- Purpose: Admin panel for personnel and location management.
- Backend: Laravel 12 (PHP 8.4+)
- Frontend: Inertia.js + React, built with Vite
- Database: MySQL (development: 127.0.0.1:3306)

---

## ⚙️ Requirements

- PHP 8.4 or newer
- Composer
- Node.js & npm
- MySQL

---

## 🛠️ Local Setup

1. Clone the repo

```bash
git clone <repo-url>
cd ProjectTask-PMS
```

2. Install dependencies

```bash
composer install
npm install
```

3. Environment

```bash
cp .env.example .env
# edit .env to set DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan key:generate
```

4. Database

```bash
php artisan migrate --seed
# or for a clean slate during development
php artisan migrate:fresh --seed
```

5. Run dev servers

```bash
php artisan serve
npm run dev
```

---

## 🧩 Project Structure (important folders)

- `app/Models/` — Eloquent models (User, Division, District, Area, Designation, etc.)
- `app/Http/Controllers/` — Controllers for resources and Inertia responses
- `database/migrations/` — DB schema (note: some FK constraints are added in a later migration to avoid MySQL FK ordering issues)
- `resources/js/` — Inertia + React pages and actions
- `resources/css/` — Tailwind styles
- `tests/` — Pest / PHPUnit tests

---

## ✅ Common Commands

- Run migrations: `php artisan migrate`
- Fresh DB (dev): `php artisan migrate:fresh --seed`
- Run tests: `php artisan test --compact`
- Tinker: `php artisan tinker`
- Build assets: `npm run build`
- Dev assets: `npm run dev`

---

## ⚠️ Notes & Troubleshooting

- Foreign key errors: Some geographic tables originally formed circular FK relationships. The migrations add FK constraints in a later migration to avoid creation-order failures. If you see FK errors in development, try:

```bash
php artisan migrate:fresh --seed
```

- Avoid running raw ALTER TABLE statements in production without a migration — use migrations to keep schema changes versioned.

---

## 🧭 Contributing

- Follow existing code conventions
- Add migrations for schema changes and tests for behavior
- Run `php artisan migrate` and tests before opening PRs

---

Made with ❤️ — happy coding!
