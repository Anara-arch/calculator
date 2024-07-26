const result = document.querySelector('#result'),
      expression = document.querySelector('#expression'),
      num = document.querySelectorAll('.number:not(.equals)'),
      operation = document.querySelectorAll('.operation'),
      equals = document.querySelector('.equals'),
      clear = document.querySelector('#clear'),
      ce = document.querySelector('#ce');
let ex = ''; // баалоо үчүн туюнтма сап
result.innerHTML = '0';



function clickN() { // санды басканда
  if(!ex || typeof(ex) === 'number' || ex === '0') {
    expression.innerHTML = this.id;
    ex = this.id;
  } else {
    expression.innerHTML += this.id;
    ex += this.id;
  }  
  result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
  checkLength(result.innerHTML);
};

function clickO() { // биз жообуну чыгарганда
  if(!ex) {
    return;
  }
  ex = ex.toString().replace(/=/, '');
  if (ex.match(/\/|\*|\+|-|=/)) {
    ex = eval(ex).toString();
  } 
  expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
  ex += this.id;
  result.innerHTML = this.id;
};



Array.from(num).forEach(function(element) { // бардык сандарга жана операцияларга тиешелүү функцияны дайындоо
      element.addEventListener('click', clickN);
    });

Array.from(operation).forEach(function(element) {
      element.addEventListener('click', clickO);
    });

// кнопка менен баарын тазалоо
clear.addEventListener('click', () => {
  result.innerHTML = '';
  expression.innerHTML = '';
  ex = '';
})

// кнопка менен акыркы жазууну тазалоо
ce.addEventListener('click', () => {
  if (!expression.innerHTML.match(/=$/)) {
    
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex); 
    result.innerHTML = 0;
    
    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g);
      arg.splice(-1, 1);
      return arg.join('');
    }
  }
})

// бүт нерсени эсептесек
equals.addEventListener('click', ()=> {
  if (!ex) {
    result.innerHTML = '0';
  } else {
    ex = eval(ex);
    expression.innerHTML += '=';
    result.innerHTML = trim12(ex);
  }
})

function checkLength(arg) { // эгерде биз өтө узун санды киргизсек
  if (arg.toString().length > 14) {
    expression.innerHTML = 'number too long'.toUpperCase();
    result.innerHTML = '0';
    ex = '0';
  } 
}

function trim12(arg) { // эгерде биз өтө узун санды эсептесек
  if (arg.toString().length > 14) {
    ex = parseFloat(arg.toPrecision(12));
    if (ex.toString().length > 14) { 
      ex = ex.toExponential(9);
    };
    return ex;
  } else {
    return arg;
  }
}

