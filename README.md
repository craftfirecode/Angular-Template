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

| Ordner/Datei              | Zweck                                                               |
|---------------------------|---------------------------------------------------------------------|
| **`index.js`**            | Express-Server Entry Point                                          |
| **`add-user.js`**         | Script zum Hinzufügen von Benutzern                               |
| **`package.json`**        | Backend-Dependencies (Express, Prisma, JWT, bcrypt, cookie-parser) |
| **`/prisma`**             | `schema.prisma` – Datenbankschema für User-Management             |
| **`/src/controllers`**    | `auth.controller.js` – Login, Refresh, Logout Logic               |
| **`/src/middleware`**     | `verifyAccessToken.js` – JWT Token Validation                     |
| **`/src/routes`**         | Route-Definitionen (auth, folders, todos)                         |
| **`/src/services`**       | `user.service.js` – Datenbank-Zugriff                            |
| **`/src/utils`**          | Token-Utilities (sign, verify, decode)                            |

#### 🎯 **Frontend** (`./auth/ng`)

| Ordner/Datei           | Zweck                                                             |
|------------------------|-------------------------------------------------------------------|
| **`/src/app/core`**    | `auth.service.ts`, `auth.guard.ts`, `guest.guard.ts`            |
| **`/src/app/routes`**  | Auth-Komponenten (`/auth`) und geschützte Routen (`/protected`) |
| **`/src/app/signal`**  | `folder.service.ts`, `todo.service.ts` – State-Management       |

---

## ✅ Wichtige Features

### 🔐 **Auth-Bereich**
- **Express.js Backend** mit strukturierter Architektur (MVC-Pattern)
- **Cookie-basierte Authentifizierung** mit HttpOnly-Cookies für Sicherheit
- **Dual-Token System** (kurzzeitige Access-Tokens + langlebige Refresh-Tokens)
- **Prisma ORM** für typisierte Datenbankzugriffe
- **bcrypt** für sichere Passwort-Hashing
- **Middleware-basierte Token-Verifikation** mit Fallback auf Authorization Header
- **CORS-Konfiguration** für sichere Frontend-Backend-Kommunikation

### 🎨 **Angular Frontend**
- **Standalone Components** (keine Module, nur `imports: [...]`)
- **Signals** für reaktiven State (`authStatus`, `user`)
- **Reactive Forms** mit `FormBuilder` und Validierung
- **HTTP-Interceptor** für automatische Token-Übertragung
- **AuthGuard** zum Schutz von Routen
- **Fehlerbehandlung** (z. B. abgelaufene Tokens)

---

## ⚠️ Wichtiger Hinweis zur Sicherheit

> **Das Backend nutzt jetzt sichere `HttpOnly-Cookies` für die Authentifizierung!**
> - **Access-Token**: Kurzzeitig (15 Minuten) in HttpOnly-Cookie
> - **Refresh-Token**: Langlebig (30 Tage) in HttpOnly-Cookie  
> - **Fallback**: Authorization Header wird weiterhin unterstützt
> - **Schutz vor XSS**: HttpOnly-Cookies sind nicht über JavaScript zugreifbar
> Dies entspricht modernen Sicherheitsstandards für Webanwendungen.

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
