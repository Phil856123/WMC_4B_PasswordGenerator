# Node.js: Password Generator

Loesung zur Aufgabe mit zwei getrennten CommonJS-Projekten:

- `password-generator`: wiederverwendbares Modul `@hoecknerp23030/password-generator`, Version 0.0.2.
- `password-generator-app`: Kommandozeilenprogramm mit dem externen npm-Paket Commander.

Repository: https://github.com/Phil856123/WMC_4B_PasswordGenerator

npm-Paket: https://www.npmjs.com/package/@hoecknerp23030/password-generator (Version 0.0.2, oeffentlich veroeffentlicht).

## Schnell starten unter Windows

`STARTEN.cmd` doppelt anklicken. Beim ersten Start werden die Abhaengigkeiten installiert; danach werden drei Passwoerter mit je 16 Zeichen inklusive Sonderzeichen ausgegeben.

Oder ein Terminal in diesem Ordner oeffnen:

```powershell
.\run.cmd install --ignore-scripts --no-audit --no-fund
.\run.cmd start -- --length 16 --symbols
.\run.cmd start -- --length 6 --no-lowercase --no-uppercase
.\run.cmd start -- --length 20 --symbols --count 3
.\run.cmd start -- --help
.\run.cmd test
```

`run.cmd` verwendet auf diesem Rechner die direkt installierte Node-Version 24.21.0. Damit wird der derzeit fehlerhafte NVM-Shim (`shim integrity check failed`) umgangen. Es werden keine globalen Einstellungen oder PowerShell-Ausfuehrungsrichtlinien geaendert. Auf anderen Rechnern wird Node aus dem PATH verwendet.

Mit einer funktionierenden Node-Installation sind die normalen Befehle plattformuebergreifend moeglich:

```sh
npm ci
npm start -- --length 16 --symbols
npm test
```

Node.js 20 oder neuer ist erforderlich. `package-lock.json` haelt die installierten Abhaengigkeiten fest.

## Optionen

| CLI-Parameter | Bedeutung | Standard |
| --- | --- | --- |
| `-l, --length <zahl>` | Laenge von 1 bis 1024 | 8 |
| `-s, --symbols` | Sonderzeichen aktivieren | aus |
| `--no-lowercase` | Kleinbuchstaben deaktivieren | Kleinbuchstaben an |
| `--no-uppercase` | Grossbuchstaben deaktivieren | Grossbuchstaben an |
| `--no-numbers` | Ziffern deaktivieren | Ziffern an |
| `-c, --count <zahl>` | 1 bis 100 Passwoerter erzeugen | 1 |
| `-h, --help` | Hilfe anzeigen | - |

Mindestens eine Zeichenart muss aktiviert sein. Jede aktivierte Zeichenart ist garantiert enthalten; die Laenge muss deshalb mindestens so gross wie die Anzahl dieser Arten sein. Fuer Zufallszahlen wird `node:crypto.randomInt` verwendet.

## Aufbau und Tests

Das Modul exportiert eine Funktion mit `module.exports`. Die App importiert sie mit `require('@hoecknerp23030/password-generator')`. Im Aufgabenordner verknuepfen npm Workspaces die beiden Projekte. Zusaetzlich ist die lokale Abhaengigkeit als `file:../password-generator` eingetragen. Dadurch kann die App auch separat installiert werden, solange beide Ordner nebeneinander liegen.

Alle acht Tests bestanden, auch nach dem Entpacken der Abgabe und erneuter Installation. Das veroeffentlichte Paket 0.0.2 wurde ausserdem in einem unabhaengigen Projekt aus der npm-Registry installiert; dort bestanden die vier CLI-Integrationstests.

Die acht Tests pruefen unter anderem alle 15 gueltigen Kombinationen von Zeichenarten, Laengengrenzen, fehlerhafte Einstellungen sowie echte CLI-Aufrufe mit Hilfe, Version und Fehlerfaellen. Fuer die Tests sind keine weiteren Pakete erforderlich.

## npm-Veroeffentlichung

Der Paket-Scope lautet `@hoecknerp23030`; Paketnamen werden kleingeschrieben. `publishConfig.access` ist bereits auf `public` gesetzt. Veroeffentlicht wird ausschliesslich das Modul, nicht das gesamte Aufgabenprojekt.

Wenn noch keine Anmeldung besteht, zuerst im Aufgabenordner anmelden:

```powershell
.\run.cmd login
.\run.cmd whoami
```

Anschliessend:

```powershell
.\run.cmd publish --workspace=@hoecknerp23030/password-generator --access public
```

Falls npm eine Zwei-Faktor-Bestaetigung verlangt, diese selbst durchfuehren. Passwoerter oder Codes nicht in Dateien eintragen. Fuer weitere Releases eine neue Versionsnummer vergeben, zum Beispiel mit `npm version patch` im Modulordner.

Zum Testen des veroeffentlichten Pakets in einem komplett unabhaengigen Ordner:

```powershell
mkdir password-generator-registry-test
cd password-generator-registry-test
npm.cmd init -y
npm.cmd install @hoecknerp23030/password-generator
node -e "const generate = require('@hoecknerp23030/password-generator'); console.log(generate({length:16,symbols:true}));"
```

## Abgabe

Die bereitgestellte ZIP-Datei enthaelt keine `node_modules` und keine Git-Metadaten. Nach dem Entpacken werden die Abhaengigkeiten mit `run.cmd install` oder `npm ci` erneut installiert. Werden Dateien nach dem Testen selbst gepackt, vorher alle `node_modules`-Ordner aus der Abgabe entfernen. `package-lock.json` bleibt enthalten.

## Quellen

- [Commander auf npm](https://www.npmjs.com/package/commander)
- [Commander-Dokumentation](https://github.com/tj/commander.js#readme)
- [Node.js: crypto.randomInt](https://nodejs.org/api/crypto.html#cryptorandomintmin-max-callback)
