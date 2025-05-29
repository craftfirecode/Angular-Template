# Angular Essentials & Advanced – Lernprojekt

Dieses Repository enthält meine Ausarbeitung und Erweiterung eines Angular-Kurses (Udemy) mit dem Ziel, bestehende
Kenntnisse zu vertiefen und moderne Angular-Features praktisch anzuwenden.

Als Entwickler sehe ich kontinuierliches Lernen als Teil meiner beruflichen Haltung – daher dokumentiere ich hier mein
Vorgehen und die eingesetzten Konzepte.

## Projektstruktur

Das Projekt ist in zwei Bereiche unterteilt:

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

- 🔄 API-Integration (`AsyncApiService`)
- 🌐 Routing (`RouterModule`, `Routes`, `routerLink`, `outlet`)

### 📁 `./ng-auth`

Backend-Authentifizierung mit NestJS:

- 🔑 Authentifizierungs-API (NestJS, TypeORM, SQLite)
- 🔒 User-Management (Registrierung, Login, JWT)
- 🌍 CORS-Konfiguration für lokale Angular-Entwicklung
- 🗄️ Modularer Aufbau (`AuthModule`, `UsersModule`)
- 🧪 Beispiel-Endpoints und Testdaten

Der Ordner enthält das Backend für Authentifizierung und Userverwaltung, das mit der Angular-Frontend-Anwendung
kommuniziert.

## Zielsetzung

- 🧠 Vertiefung moderner Angular-Konzepte
- ⚙️ Hands-on Erfahrung mit Signals und Standalone Components
- 🚀 Vorbereitung auf Angular-Entwicklung mit Fokus auf Clean Code und modulare Architektur

## Hinweise

Dieses Projekt basiert auf einem Udemy-Kurs, wurde jedoch eigenständig ausgearbeitet, erweitert und dokumentiert. Es
dient als Referenz und Lernnachweis meiner persönlichen Weiterentwicklung im Angular-Ökosystem.

## Lizenz

Dieses Repository ist zu Lernzwecken öffentlich. Die Inhalte des Udemy-Kurses sind nicht enthalten – nur eigenständig
geschriebener oder adaptierter Code ist hier dokumentiert.
