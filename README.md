# Angular Essentials & Advanced – Lernprojekt

Dieses Repository enthält meine Ausarbeitung und Erweiterung eines Angular-Kurses (Udemy) mit dem Ziel, bestehende
Kenntnisse zu vertiefen und moderne Angular-Features praktisch anzuwenden.

Als Entwickler sehe ich kontinuierliches Lernen als Teil meiner beruflichen Haltung – daher dokumentiere ich hier mein
Vorgehen und die eingesetzten Konzepte.

## Projektstruktur

Das Projekt ist in drei Bereiche unterteilt:

### 📁 `./auth`

| Ordner/Datei       | Zweck                                                                 |
|--------------------|-----------------------------------------------------------------------|
| **`/components`**  | Auth-spezifische Komponenten (Login, Signup, Profil)                |
| **`/guards`**      | `auth.guard.ts` – Schutz für Routen                                  |
| **`/interceptors`**| `auth.interceptor.ts` – JWT-Token in Requests einfügen               |
| **`/models`**      | `user.model.ts`, `auth-response.model.ts` – Typen                    |
| **`/services`**    | `auth.service.ts` – Auth-Logik, API-Kommunikation                    |
| **`/store`**       | `auth.store.ts` – State-Management mit Signals                       |
| **`/utils`**       | Helferfunktionen (z. B. Token-Decoding)                             |

---

## ✅ Wichtige Features

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

- 🔄 API-Integration (`AsyncApiService`)
- 🌐 Routing (`RouterModule`, `Routes`, `routerLink`, `outlet`)

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
