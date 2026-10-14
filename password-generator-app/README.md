# Password Generator App

Eigenstaendiges Konsolenprojekt, das `password-generator` mit `require('@hoecknerp23030/password-generator')` verwendet. Das externe npm-Paket [Commander](https://www.npmjs.com/package/commander) wertet die Kommandozeilenparameter aus und erstellt die Hilfe.

Nach `npm.cmd install` im uebergeordneten Aufgabenordner:

```powershell
cd password-generator-app
npm.cmd start -- --length 16 --symbols
npm.cmd start -- --length 6 --no-lowercase --no-uppercase
npm.cmd start -- --length 20 --symbols --count 3
npm.cmd start -- --help
```

`--` trennt npm-Parameter von den Parametern des Programms. Ein Passwort wird pro Zeile ausgegeben. `--count` erlaubt 1 bis 100 Passwoerter. Die Zeichenoptionen und ihre Standardwerte sind in der Modul-README beschrieben.

Alternativ ohne npm-Skript: `node index.js --length 16 --symbols`.

Die lokale Modulabhaengigkeit ist in `package.json` mit `file:../password-generator` eingetragen. Dadurch laesst sich die Aufgabe ohne globales `npm link` reproduzieren.

Quellen: [Commander-Dokumentation](https://github.com/tj/commander.js#readme), [npm-Paketseite](https://www.npmjs.com/package/commander).
