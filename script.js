var underOver = 1;
var balance = 20000.0;
var winChance, value, multiplier, bet, profit, bet_selector;

function update() {
    value = document.querySelector('.inp-value').value; if (value === "") value = 0;
    underOver === 1 ? winChance = value : winChance = 100 - value;
    multiplier = (1 / (winChance / 100)).toFixed(2); if (value == 0) multiplier = 0;
    bet = parseFloat(bet_selector.value);
    profit = (bet * multiplier) - bet; if (isNaN(profit)) profit = 0;

    document.querySelector('.a').style.strokeDashoffset = 'calc(440 - (440 * ' + winChance * underOver + ') / 100)';
    document.querySelector('#multiplier').value = multiplier + 'x';
    document.querySelector('#chance').value = winChance + '%';
    document.querySelector('#profit').value = profit.toFixed(1);
    document.querySelector('#balance').value = balance.toFixed(1);
};

bet_selector = document.querySelector('#bet')
document.querySelector('.btn-money').addEventListener('click', () => balance += 1000);
document.querySelector('#min').addEventListener('click', () => bet_selector.value = 1);
document.querySelector('#half').addEventListener('click', () => bet_selector.value /= 2);
document.querySelector('#double').addEventListener('click', () => bet_selector.value *= 2);
document.querySelector('#max').addEventListener('click', () => bet_selector.value = balance);
document.querySelector('#under-over').addEventListener('click', function () {
    var thisValue = document.querySelector('#under-over');

    thisValue.innerHTML === '<i class="ion-ios-arrow-down"></i> Under' ? underOver = -1: underOver = 1;
    underOver === -1 ? thisValue.innerHTML = '<i class="ion-ios-arrow-up"></i> Over' : thisValue.innerHTML = '<i class="ion-ios-arrow-down"></i> Under';
})
document.querySelector('.btn-bet').addEventListener('click', function () {
    if (!isNaN(bet) && bet <= balance && bet > 0) {
        var balance_selector = document.querySelector('#balance');
        balance -= bet;
        var roll = Math.floor(Math.random() * 100)
        //console.log(roll);
        if (roll > value && underOver === -1) {
            balance += profit + bet;
            balance_selector.style.color = '#05d405';

        } else if (roll < value && underOver === 1) {
            balance += profit + bet;
            balance_selector.style.color = '#05d405';
        } else {
            balance_selector.style.color = 'red';
        }
        balance_selector.style.fontWeight = 600;
        setTimeout(() => {balance_selector.style.color = '#555'; balance_selector.style.fontWeight = 300;}, 400);
    }
});

setInterval(update, 100);