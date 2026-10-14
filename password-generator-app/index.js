'use strict';

const { Command, InvalidArgumentError } = require('commander');
const generatePassword = require('@hoecknerp23030/password-generator');

function positiveInteger(value) {
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1) {
    throw new InvalidArgumentError('Bitte eine positive ganze Zahl angeben.');
  }
  return Number(value);
}

const program = new Command();
program
  .name('password-generator-app')
  .description('Erzeugt Passwoerter mit waehlbarer Laenge und Zeichenarten.')
  .version('1.0.0')
  .option('-l, --length <zahl>', 'Passwortlaenge (1 bis 1024)', positiveInteger, 8)
  .option('-s, --symbols', 'Sonderzeichen verwenden', false)
  .option('--no-lowercase', 'Keine Kleinbuchstaben verwenden')
  .option('--no-uppercase', 'Keine Grossbuchstaben verwenden')
  .option('--no-numbers', 'Keine Ziffern verwenden')
  .option('-c, --count <zahl>', 'Anzahl der Passwoerter (1 bis 100)', positiveInteger, 1)
  .helpOption('-h, --help', 'Hilfe anzeigen')
  .showHelpAfterError()
  .parse(process.argv);

const options = program.opts();
try {
  if (options.count > 100) throw new RangeError('Die Anzahl darf hoechstens 100 sein.');
  for (let i = 0; i < options.count; i++) {
    console.log(generatePassword({
      length: options.length,
      symbols: options.symbols,
      lowercase: options.lowercase,
      uppercase: options.uppercase,
      numbers: options.numbers,
    }));
  }
} catch (error) {
  console.error(`Fehler: ${error.message}`);
  process.exitCode = 1;
}
