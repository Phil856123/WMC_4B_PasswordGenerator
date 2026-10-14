const test = require('node:test');
const assert = require('node:assert/strict');
const generatePassword = require('..');

test('Aufruf ohne Optionen bleibt kompatibel', () => {
  const password = generatePassword();
  assert.equal(password.length, 8);
  assert.match(password, /^[a-zA-Z0-9]+$/);
});

test('alle Kombinationen der Zeichenarten halten Laenge und Zeichenauswahl ein', () => {
  const names = ['lowercase', 'uppercase', 'numbers', 'symbols'];
  const patterns = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*()\-_=+\[\]{};:,.?]/];
  for (let mask = 1; mask < 16; mask++) {
    const options = { length: 24 };
    names.forEach((name, i) => { options[name] = Boolean(mask & (1 << i)); });
    for (let repeat = 0; repeat < 20; repeat++) {
      const password = generatePassword(options);
      assert.equal(password.length, 24);
      patterns.forEach((pattern, i) => {
        if (options[names[i]]) assert.match(password, pattern);
        else assert.doesNotMatch(password, pattern);
      });
    }
  }
});

test('untere und obere Laengengrenzen funktionieren', () => {
  assert.match(generatePassword({ length: 1, lowercase: false, uppercase: false }), /^\d$/);
  assert.equal(generatePassword({ length: 1024, symbols: true }).length, 1024);
  const minimum = generatePassword({ length: 4, symbols: true });
  for (const pattern of [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z0-9]/]) assert.match(minimum, pattern);
});

test('ungueltige Einstellungen werden zurueckgewiesen', () => {
  for (const length of [0, -1, 1.5, 1025, NaN, Infinity, '12']) {
    assert.throws(() => generatePassword({ length }), RangeError);
  }
  assert.throws(() => generatePassword({ length: 2 }), RangeError);
  assert.throws(() => generatePassword({ lowercase: false, uppercase: false, numbers: false }), RangeError);
  assert.throws(() => generatePassword({ symbols: 'true' }), TypeError);
  for (const options of [null, [], 'text', 10]) assert.throws(() => generatePassword(options), TypeError);
});
