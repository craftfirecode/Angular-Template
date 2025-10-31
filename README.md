# Angular Essentials & Advanced – Lernprojekt

Dieses Repository enthält meine Ausarbeitung und Erweiterung eines Angular-Kurses (Udemy) mit dem Ziel, bestehende
Kenntnisse zu vertiefen und moderne Angular-Features praktisch anzuwenden.

Als Entwickler sehe ich kontinuierliches Lernen als Teil meiner beruflichen Haltung – daher dokumentiere ich hier mein
Vorgehen und die eingesetzten Konzepte.

## Projektstruktur

Das Projekt ist in drei Bereiche unterteilt:

### 📁 `./auth`

Vollständige Authentifizierungsanwendung mit Frontend und Backend:

#### 🎯 **Backend** (`./auth/backend`)

| Ordner/Datei       | Zweck                                                                 |
|--------------------|-----------------------------------------------------------------------|
| **`index.js`**     | Express-Server mit Auth-Endpoints                                     |
| **`add-user.js`**  | Script zum Hinzufügen von Benutzern                                  |
| **`package.json`** | Backend-Dependencies (Express, Prisma, JWT, bcrypt)                  |
| **`/prisma`**      | `schema.prisma` – Datenbankschema für User-Management                |

#### 🎯 **Frontend** (`./auth/ng`)

| Ordner/Datei           | Zweck                                                             |
|------------------------|-------------------------------------------------------------------|
| **`/src/app/core`**    | `auth.service.ts`, `auth.guard.ts`, `guest.guard.ts`            |
| **`/src/app/routes`**  | Auth-Komponenten (`/auth`) und geschützte Routen (`/protected`) |
| **`/src/app/signal`**  | `folder.service.ts`, `todo.service.ts` – State-Management       |

---

## ✅ Wichtige Features

### 🔐 **Auth-Bereich (Vollstack)**
- **Express.js Backend** mit JWT-Authentifizierung
- **Prisma ORM** für Datenbankzugriff
- **bcrypt** für Passwort-Hashing
- **CORS-Konfiguration** für Frontend-Backend-Kommunikation

### 🎨 **Angular Frontend**
- **Standalone Components** (keine Module, nur `imports: [...]`)
- **Signals** für reaktiven State (`authStatus`, `user`)
- **Reactive Forms** mit `FormBuilder` und Validierung
- **HTTP-Interceptor** für automatische Token-Übertragung
- **AuthGuard** zum Schutz von Routen
- **JWT-Handling** (Speicherung in `localStorage`, Decoding)
- **Fehlerbehandlung** (z. B. abgelaufene Tokens)
- **Type-Safety** mit starken Typen für API-Responses

---

## ⚠️ Wichtiger Hinweis zur Sicherheit

> **`localStorage` wird in diesem Projekt nur für Demonstrationszwecke (POC) verwendet!**
> In einer **Produktionsumgebung** sollte stattdessen **`HttpOnly-Cookies`** oder eine sichere Server-seitige Session-Verwaltung genutzt werden, um **XSS-Angriffe** zu verhindern.
> Dies ist eine bewusste Vereinfachung für Lernzwecke – **nicht für den Einsatz in echten Anwendungen geeignet!**

---



### 📁 `./essentials`

Grundlegende Angular-Konzepte und -Features:

- ✅ Komponenten (`@Component`)
- ✅ Input Properties (`@Input`, inkl. `input()`)
- ✅ Output Properties (`@Output`, inkl. `output()`)
- ✅ Signals (`signal`, State-Verwaltung)
- ✅ Services & Dependency Injection (`UserStoreService`, Konstruktorinjektion)
- ✅ Strukturelle Direktiven (`*ngIf`, `*ngTemplateOutlet`)
- ✅ Iteration über Listen (`*ngFor` vs. `@for` mit `track`)
- ✅ Conditional (`*if`, `*else` vs. `@if` mit `@else`)
- ✅ Template-Referenzen (`#templateName`)
- ✅ Template Context (`context: { $implicit: ... }`)
- ✅ Datenbindung (`[innerText]`, u. a.)
- ✅ Custom Event (`(onSelectUser($event))`, u. a.)
- ✅ Styling via SCSS (`styleUrls`)
- ✅ Standalone Components (`imports: [...]` im Decorator)

### 📁 `./ng`

Erweiterte Angular-Features:

- 🔄 **API-Integration** (`ApiService`)
- 🌐 **Routing** (`RouterModule`, `Routes`, `routerLink`, `router-outlet`)
- 📄 **Page Components** (`HomeComponent`, `UsersComponent`)
- 🎯 **Service Layer** für HTTP-Kommunikation

## Tech Stack

### Backend (Auth)
- **Node.js** mit Express.js
- **Prisma ORM** für Datenbank-Management
- **JWT** für Token-basierte Authentifizierung
- **bcrypt** für sichere Passwort-Speicherung

### Frontend (Angular)
- **Angular 17+** mit Standalone Components
- **TypeScript** für Type-Safety
- **Signals** für reaktives State-Management
- **SCSS** für erweiterte Styling-Features
- **Reactive Forms** für Formular-Handling

## Zielsetzung

- 🧠 **Vertiefung moderner Angular-Konzepte** (Signals, Standalone Components)
- 🔐 **Fullstack-Entwicklung** mit Node.js Backend und Angular Frontend
- ⚙️ **Hands-on Erfahrung** mit JWT-Authentifizierung und Prisma ORM
- 🗄️ **Datenbank-Integration** mit modernen ORM-Praktiken
- 🚀 **Vorbereitung auf Enterprise-Entwicklung** mit Clean Code und modularer Architektur

## Entwicklung & Setup

### Backend starten (Auth)
```bash
cd auth/backend
npm install
npm run dev
```

### Frontend starten
```bash
# Essentials
cd essentials
npm install
ng serve

# Auth Frontend
cd auth/ng
npm install
ng serve

# NG (Advanced)
cd ng
npm install
ng serve
```

## Hinweise

Dieses Projekt basiert auf einem Udemy-Kurs, wurde jedoch eigenständig ausgearbeitet, erweitert und dokumentiert. Es
dient als Referenz und Lernnachweis meiner persönlichen Weiterentwicklung im Angular-Ökosystem.

## Lizenz

Dieses Repository ist zu Lernzwecken öffentlich. Die Inhalte des Udemy-Kurses sind nicht enthalten – nur eigenständig
geschriebener oder adaptierter Code ist hier dokumentiert.
