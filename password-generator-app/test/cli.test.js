const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

function run(...args) {
  return spawnSync(process.execPath, [path.join(__dirname, '..', 'index.js'), ...args], { encoding: 'utf8' });
}

test('separates Projekt importiert das Modul und erzeugt drei Passwoerter', () => {
  const result = run('--length', '16', '--symbols', '--count', '3');
  assert.equal(result.status, 0, result.stderr);
  const passwords = result.stdout.trim().split(/\r?\n/);
  assert.equal(passwords.length, 3);
  for (const password of passwords) {
    assert.equal(password.length, 16);
    for (const pattern of [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z0-9]/]) assert.match(password, pattern);
  }
});

test('nur Ziffern und Standardaufruf', () => {
  const numeric = run('-l', '20', '--no-lowercase', '--no-uppercase');
  assert.equal(numeric.status, 0, numeric.stderr);
  assert.match(numeric.stdout.trim(), /^\d{20}$/);
  const standard = run();
  assert.equal(standard.status, 0, standard.stderr);
  assert.match(standard.stdout.trim(), /^[a-zA-Z0-9]{8}$/);
});

test('Hilfe und Version', () => {
  const help = run('--help');
  assert.equal(help.status, 0);
  assert.match(help.stdout, /--symbols/);
  assert.match(help.stdout, /--length/);
  assert.equal(run('--version').stdout.trim(), '1.0.0');
});

test('ungueltige Argumente liefern Fehler statt Passwoerter', () => {
  for (const args of [
    ['--length', 'abc'], ['--length', '0'], ['--length', '1.5'],
    ['--length', '1025'], ['--length', '2'], ['--count', '101'],
    ['--count', '-1'], ['--length'], ['--unknown'],
    ['--no-lowercase', '--no-uppercase', '--no-numbers'],
  ]) {
    const result = run(...args);
    assert.equal(result.status, 1, args.join(' '));
    assert.equal(result.stdout, '');
    assert.ok(result.stderr.length > 0);
  }
});
