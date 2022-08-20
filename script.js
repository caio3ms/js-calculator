const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const clear = document.querySelector('[data-clear]');
const backspace = document.querySelector('[data-delete]');
const equalsB = document.querySelector('[data-equal]');
const previousResultText = document.querySelector('.preview');
const resultText = document.querySelector('.result');


class Calculadora {
    constructor(previousResultText, resultText) {
        this.previousResultText = previousResultText;
        this.resultText = resultText;
        this.clear();
    }

    calculate() {
        let total;

        const previousResultNumber = parseFloat(this.previousResult);
        const resultNumber = parseFloat(this.result);

        if (isNaN(previousResultNumber) || isNaN(resultNumber)) return;

        switch (this.operation) {
            case '+':
                total = previousResultNumber + resultNumber;
                break;
            case '-':
                total = previousResultNumber - resultNumber;
                break;
            case '/':
                total = previousResultNumber/resultNumber;
                break;
            case '*':
                total = previousResultNumber * resultNumber;
                break;
            default:
                return
                break;
        }
        this.result = total;
        this.operation = undefined;
        this.previousResult = '';
    }

    backspace() {
        this.result = this.result.toString().slice(0, -1);
    }

    selectedOperation(operation) {
        if (this.result === '') return;
        if (this.previousResult !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousResult = this.result;
        this.result = '';
    }

    appendNumber(number) {
        if (this.result.includes('.') && number === '.') {
            return
        }
        this.result = `${this.result}${number.toString()}`
    }


    clear(){
        this.previousResult = '';
        this.result = '';
        this.operation = undefined;
    }

    updateScreen() {
        this.previousResultText.innerText = `${this.previousResult} ${this.operation || ''}`;
        this.resultText.innerText = this.result;
    }
    
}

const calculadora = new Calculadora(previousResultText, resultText);


operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculadora.selectedOperation(operation.innerText);
        calculadora.updateScreen();
    })
})

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculadora.appendNumber(number.innerText);
        calculadora.updateScreen();
    })
});


clear.addEventListener('click', () => {
    calculadora.clear();
    calculadora.updateScreen();
})

equalsB.addEventListener('click', () => {
    calculadora.calculate();
    calculadora.updateScreen();
})

backspace.addEventListener('click', () => {
    calculadora.backspace();
    calculadora.updateScreen();
})