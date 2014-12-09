var Calc = (function() {
  'use strict';

  /**
   * Objeto que armazena as variaveis e funções privadas
   * @type {Object}
   */
  var _private = {};

  function Calc() {
    // Permite que o 'construtor' seja chamado sem `new`
    if (!(this instanceof Calc)) {
      return new Calc();
    }

    /**
     * Elementos usados para adicionar os eventos.
     * Podem ser sobrescritos na função `init()`
     * @type {Object}
     */
    this.options = {
      display: '.calc-area',
      buttons: {
        clear: '[data-clear]',
        equal: '[data-equal]',
        operation: '[data-operation]',
        character: '[data-character]'
      }
    };

    /**
     * Objeto onde os cálculos das operações são armazenados
     * @type {Object}
     */
    this.operations = {};

    _private.temp = false;
    _private.current = false;
    _private.currentOperation = false;
  }

  /**
   * Inicia a calculadora
   * @param  {Object} config Objeto opcional usado para sobrescrever
   *                         os elementos
   * @return {Calc}
   */
  Calc.prototype.init = function(config) {
    this.options = _private.extend(this.options, config);

    this.$display = document.querySelector(this.options.display);
    this.buildOperations();
    this.events();

    return this;
  };

  /**
   * Inicia os eventos
   * @return {Calc}
   */
  Calc.prototype.events = function() {
    var $elements = {
        operation: document.querySelectorAll(this.options.buttons.operation),
        character: document.querySelectorAll(this.options.buttons.character),
        equal: document.querySelectorAll(this.options.buttons.equal),
        clear: document.querySelectorAll(this.options.buttons.clear)
      },
      self = this;

    [].forEach.call($elements.operation, function (el) {
      el.addEventListener('click', function() {
        var op = this.dataset.operation;

        self.run(op);
      }, false);
    });

    [].forEach.call($elements.character, function (el) {
      el.addEventListener('click', function() {
        self.press(this.innerText);
      }, false);
    });

    [].forEach.call($elements.equal, function (el) {
      el.addEventListener('click', function() {
        self.equal();
      }, false);
    });

    [].forEach.call($elements.clear, function (el) {
      el.addEventListener('click', function() {
        self.clear();
      }, false);
    });

    return this;
  };

  /**
   * Verifica se existe uma operação em 'cache', caso exista,
   * executa a operação.
   * Realiza a troca de valores das variáveis auxiliares.
   * @param  {String} op Tipo da operação
   * @return {Calc}
   */
  Calc.prototype.run = function(op) {
    if (_private.currentOperation && this.operations[_private.currentOperation]) {
      this.operations[_private.currentOperation]();

      this.result = _private.temp;
      this.showResult();
    }

    _private.temp = (_private.temp === false) ? _private.strToNumber(_private.current) : _private.temp;
    _private.currentOperation = op;
    _private.current = false;

    return this;
  };

  /**
   * Carrega as operações
   * @return {Calc}
   */
  Calc.prototype.buildOperations = function() {
    var self = this,
      ops = this.operations;

    ops.sum = function () {
      _private.temp = _private.temp + _private.strToNumber(_private.current);
    };

    ops.subtraction = function() {
      _private.temp = _private.temp - _private.strToNumber(_private.current);
    };

    ops.multiplication = function() {
      _private.temp = _private.temp * _private.strToNumber(_private.current);
    };

    ops.division = function() {
      _private.temp = _private.temp / _private.strToNumber(_private.current);
    };

    return this;
  };

  /**
   * Evento disparado ao digitar um número
   * @param  {String} digit Caracter digitado
   * @return {Calc}
   */
  Calc.prototype.press = function(digit) {
    _private.current = (_private.current) ? _private.current + '' + digit : digit + '';

    if (this.$display) {
      this.$display.innerText = _private.current;
    }

    return this;
  };

  /**
   * Realiza o cálculo da operação e limpa as variáveis auxiliares.
   * @return {Calc}
   */
  Calc.prototype.equal = function() {
    if (_private.currentOperation) {
      this.operations[_private.currentOperation]();

      this.result = _private.temp;
      this.showResult();

      _private.clear();
    }

    return this;
  };

  /**
   * Limpa o display e variáveis auxiliares
   * @return {Calc}
   */
  Calc.prototype.clear = function() {
    this.result = 0;
    this.showResult();

    _private.clear();

    return this;
  };

  /**
   * Exibe o resultado no display
   * @return {Calc}
   */
  Calc.prototype.showResult = function() {
    if (this.$display) {
      this.$display.innerText = _private.numberToStr(this.result);
    }

    return this;
  };

  /**
   * Limpa as variáveis auxiliares
   */
  _private.clear = function() {
    _private.temp = false;
    _private.current = false;
    _private.currentOperation = false;
  };

  /**
   * Converte texto para número
   */
  _private.strToNumber = function(str) {
    return parseFloat(str.replace(',', '.'));
  };

  /**
   * Converte número para texto
   */
  _private.numberToStr = function(number) {
    return (number + '').replace('.', ',');
  };

  _private.extend = function() {
    for (var i=1; i<arguments.length; i++) {
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  }

  return Calc;

}());
