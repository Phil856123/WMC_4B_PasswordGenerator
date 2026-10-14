# Password Generator

CommonJS-Modul, Version **0.0.2**. Es erweitert den einfachen Generator aus dem Unterricht um konfigurierbare Laenge und Zeichenarten.

## Verwendung

```js
const generatePassword = require('@hoecknerp23030/password-generator');

console.log(generatePassword()); // 8 Zeichen, Buchstaben und Ziffern
console.log(generatePassword({ length: 16, symbols: true }));
console.log(generatePassword({ length: 6, lowercase: false, uppercase: false }));
```

| Option | Standard | Bedeutung |
| --- | --- | --- |
| `length` | `8` | Ganze Zahl von 1 bis 1024 |
| `lowercase` | `true` | Kleinbuchstaben a-z |
| `uppercase` | `true` | Grossbuchstaben A-Z |
| `numbers` | `true` | Ziffern 0-9 |
| `symbols` | `false` | Sonderzeichen `!@#$%^&*()-_=+[]{};:,.?` |

Jede aktivierte Zeichenart ist mindestens einmal enthalten. Daher muss die Laenge mindestens der Anzahl aktivierter Zeichenarten entsprechen. Mindestens eine Zeichenart muss aktiviert sein. Optionen fuer Zeichenarten muessen echte boolesche Werte (`true`/`false`) sein.

Die Zufallszahlen stammen aus `node:crypto.randomInt`. Anschliessend werden die Zeichen zufaellig gemischt. Fehlerhafte Einstellungen loesen `TypeError` oder `RangeError` aus.

## Lokale Installation und Tests

Im uebergeordneten Aufgabenordner:

```powershell
npm.cmd install
npm.cmd test
```

Das zweite Projekt `password-generator-app` importiert dieses Modul ueber seinen Paketnamen. Die lokale Abhaengigkeit ist als `file:../password-generator` eingetragen; ein globales `npm link` ist nicht erforderlich.

## Aenderungen in 0.0.2

- Einstellbare Laenge und Sonderzeichen.
- Kleinbuchstaben, Grossbuchstaben und Ziffern einzeln abschaltbar.
- Aktivierte Zeichenarten garantiert enthalten.
- Eingabepruefung und automatisierte Modul- und CLI-Tests.
- Bisheriger Aufruf `generatePassword()` bleibt erhalten.

## Veroeffentlichung

Das Paket ist fuer `@hoecknerp23030/password-generator` vorbereitet. Autor, Repository und oeffentlicher Zugriff sind eingetragen. Die Veroeffentlichung und der Test aus der Registry sind in der README des Aufgabenordners beschrieben.

Dokumentation: [Node crypto.randomInt](https://nodejs.org/api/crypto.html#cryptorandomintmin-max-callback).
