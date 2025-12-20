let calculation = JSON.parse(localStorage.getItem('calculation')) || '';

function resetCalculation() {
    document.querySelector('.display-inputs').innerHTML = '';
    document.querySelector('.display-calculation').innerHTML = '';
        }

function updateCalculation(buttonValue) {
    calculation += buttonValue;
    document.querySelector('.display-inputs').innerHTML = calculation;

    localStorage.setItem('calculation', JSON.stringify(calculation));
}