var calc = new Calc();
calc.init();

/**
 * Testes de Soma
 */
QUnit.test('Soma', function(assert) {
  calc.press(1);
  calc.run('sum');
  calc.press(1);
  calc.equal();

  assert.equal(calc.result, 2, '(1 + 1) = 2');

  calc.press(2);
  calc.run('sum');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 4, '(2 + 2) = 4');

  calc.press(2);
  calc.run('sum');
  calc.press(2);
  calc.run('sum');
  calc.press(4);
  calc.equal();

  assert.equal(calc.result, 8, '(2 + 2 + 4) = 8');

  calc.clear();
  assert.equal(calc.result, 0, 'Clear. Result = 0');
});

/**
 * Testes de Subtração
 */
QUnit.test('Subtração', function(assert) {
  calc.press(2);
  calc.run('subtraction');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 0, '(2 - 2) = 0');

  calc.press(4);
  calc.run('subtraction');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 2, '(4 - 2) = 2');

  calc.press(8);
  calc.run('subtraction');
  calc.press(4);
  calc.run('subtraction');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 2, '(8 - 4 - 2) = 2');

  calc.clear();
  assert.equal(calc.result, 0, 'Clear. Result = 0');
});

/**
 * Testes de Multiplicação
 */
QUnit.test('Multiplicação', function(assert) {
  calc.press(2);
  calc.run('multiplication');
  calc.press(1);
  calc.equal();

  assert.equal(calc.result, 2, '(2 * 1) = 2');

  calc.press(2);
  calc.run('multiplication');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 4, '(2 * 2) = 4');

  calc.press(2);
  calc.run('multiplication');
  calc.press(2);
  calc.run('multiplication');
  calc.press(4);
  calc.equal();

  assert.equal(calc.result, 16, '(2 * 2 * 4) = 16');

  calc.clear();
  assert.equal(calc.result, 0, 'Clear. Result = 0');
});

/**
 * Testes de Divisão
 */
QUnit.test('Divisão', function(assert) {
  calc.press(4);
  calc.run('division');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 2, '(4 / 2) = 2');

  calc.press(2);
  calc.run('division');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 1, '(2 / 2) = 1');

  calc.press(8);
  calc.run('division');
  calc.press(2);
  calc.run('division');
  calc.press(2);
  calc.equal();

  assert.equal(calc.result, 2, '(8 / 2 / 2) = 2');

  calc.clear();
  assert.equal(calc.result, 0, 'Clear. Result = 0');
});

/**
 * Testes Diversos
 */
QUnit.test('Diversos', function(assert) {

  calc
    .press(2)
    .run('sum')
    .press(2)
    .run('multiplication')
    .press(2)
    .equal();

  assert.equal(calc.result, 8, '((2 + 2) * 2) = 8');

  calc
    .press(1)
    .run('sum')
    .press(1)
    .run('multiplication')
    .press(4)
    .equal();

  assert.equal(calc.result, 8, '((1 + 1) * 4) = 8');

  calc
    .press(4)
    .run('subtraction')
    .press(2)
    .run('multiplication')
    .press(6)
    .equal();

  assert.equal(calc.result, 12, '((4 + 2) * 6) = 12');

  calc
    .press('4,2')
    .run('subtraction')
    .press('1,2')
    .run('multiplication')
    .press(3)
    .equal();

  assert.equal(calc.result, 9, '((4,2 + 1,2) * 3) = 9');

  calc.clear();
  assert.equal(calc.result, 0, 'Clear. Result = 0');
});
