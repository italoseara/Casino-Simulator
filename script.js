var underOver = 1;
var balance = 20000;
var winChance, value, multiplier, bet;

function update() {
    value = document.querySelector('.inp-value').value; if (value === "") value = 0;
    underOver === 1 ? winChance = value : winChance = 100 - value;
    multiplier = (1 / (winChance / 100)).toFixed(2); if (value == 0) multiplier = 0;
    bet = parseInt(document.querySelector('.input-bet').value);

    document.querySelector('.a').style.strokeDashoffset = 'calc(440 - (440 * ' + winChance * underOver + ') / 100)';
    document.querySelector('#multiplier').textContent = multiplier + 'x';
    document.querySelector('#win-chance').textContent = winChance + '%';
    document.querySelector('#balance').textContent = 'balance: $' + balance + '.0';
};

document.querySelector('.btn-rll-over').addEventListener('click', () => underOver = -1);
document.querySelector('.btn-rll-under').addEventListener('click', () => underOver = 1);
document.querySelector('.btn-money').addEventListener('click', () => balance += 1000);
document.querySelector('.btn-bet').addEventListener('click', function () {
    if (!isNaN(bet)) {
        balance -= bet;
        var roll = Math.floor(Math.random() * 100)
        //console.log(roll);

        if (roll > value && underOver === -1) {
            balance += bet * multiplier;
        } else if (roll < value && underOver === 1) {
            balance += bet * multiplier;
        }
}});

setInterval(update, 100);