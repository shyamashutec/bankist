'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const date = new Date();
labelDate.innerHTML = `${date.getDay()}/${
  date.getMonth() + 1
}/${date.getFullYear()}`;
let currentaccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('hello');
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.innerHTML = `welcome back${
      currentaccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  updateUI(currentaccount);
  // transfer(currentaccount, transferacc, amount);
});
function updateUI(acc) {
  totalbalance(acc);
  displaymovements(acc.movements);
  displaysummary(acc.movements, depo, withdr, interests);
}
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
////////////////////////////////////////////////////////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferacc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, transferacc);
  if (
    amount > 0 &&
    transferacc &&
    currentaccount.balance >= amount &&
    transferacc?.username !== currentaccount.username
  ) {
    console.log('transfer valid');
    currentaccount.movements.push(-amount);
    transferacc.movements.push(amount);
    updateUI(currentaccount);
  }
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displaymovements(currentaccount.movements, !sorted);
  sorted = !sorted;
});
//////////////////////////////////////////////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = inputClosePin.value;
  if (user == currentaccount.username && pin == currentaccount.pin) {
    accounts.pop(currentaccount);
    const index = accounts.findIndex(
      acc => acc.username == currentaccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    user.value = pin.value = '';
  }
});
/////////////////////////////////////////////////////////////////////

function userID(accounts) {
  accounts.map(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(char => char[0])
      .join('');
    // console.log(user);
  });
}
userID(accounts);
console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
///////////////////////////////////////////////////////////////////////////
var totalbalance = acc => {
  acc.balance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  });
  // console.log(total);
  labelBalance.innerHTML = acc.balance + `€`;
};

////////////////////////////////////////////////////////////////////////////
var depo = movements => {
  var deposit = movements
    .filter(val => val > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.innerHTML = deposit;
};
var withdr = movements => {
  var withdraw = movements
    .filter(val => val < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.innerHTML = Math.abs(withdraw);
};
var interests = movements => {
  var interest = movements
    .filter(val => val > 0)
    .map(val => (val * 1.2) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.innerHTML = Math.abs(interest);
};
var displaysummary = (movements, depo, withdr, interests) => {
  depo(movements);
  withdr(movements);
  interests(movements);
};
////////////////////////////////////////////////////////////////////////
const displaymovements = function (movements, sort) {
  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  mov.map((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}"> ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€ </div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//////////////////////////////////////////////////
function Car(speed) {
  this.speed = speed;
}
Car.prototype.accelerate = function (speed) {
  // this.speed = speed;
  console.log(this.speed + 10);
};
Car.prototype.brake = function (speed) {
  console.log(this.speed - 10);
};
// alert(Rabbit.setage());
let bmw = new Car(120);
console.log(bmw);
bmw.accelerate();
bmw.brake();
