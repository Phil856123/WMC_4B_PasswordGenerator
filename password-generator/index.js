'use strict';

const { randomInt } = require('node:crypto');

/**
 * Jede aktivierte Zeichenart kommt mindestens einmal vor.
 * Ohne Optionen bleibt der Aufruf aus dem Skript erhalten: 8 Zeichen.
 */
function generatePassword(options = {}) {
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('Die Einstellungen muessen als Objekt uebergeben werden.');
  }

  const {
    length = 8,
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = false,
  } = options;

  if (!Number.isInteger(length) || length < 1 || length > 1024) {
    throw new RangeError('Die Laenge muss eine ganze Zahl zwischen 1 und 1024 sein.');
  }

  const settings = { lowercase, uppercase, numbers, symbols };
  for (const [name, enabled] of Object.entries(settings)) {
    if (typeof enabled !== 'boolean') {
      throw new TypeError(`${name} muss true oder false sein.`);
    }
  }

  const groups = [];
  if (lowercase) groups.push('abcdefghijklmnopqrstuvwxyz');
  if (uppercase) groups.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (numbers) groups.push('0123456789');
  if (symbols) groups.push('!@#$%^&*()-_=+[]{};:,.?');

  if (groups.length === 0) {
    throw new RangeError('Mindestens eine Zeichenart muss aktiviert sein.');
  }
  if (length < groups.length) {
    throw new RangeError(`Fuer ${groups.length} Zeichenarten muss die Laenge mindestens ${groups.length} sein.`);
  }

  const charset = groups.join('');
  const characters = [];
  // Ein Zeichen je aktivierter Gruppe garantiert, dass die Auswahl enthalten ist.
  for (const group of groups) characters.push(group[randomInt(group.length)]);
  while (characters.length < length) {
    characters.push(charset[randomInt(charset.length)]);
  }

  // Fisher-Yates verteilt auch die garantierten Zeichen auf zufaellige Positionen.
  for (let i = characters.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  return characters.join('');
}

module.exports = generatePassword;
