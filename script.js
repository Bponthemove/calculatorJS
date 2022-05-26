class Calculator {
    constructor() {
        this.input = '0';
        this.result = 0;
        this.output = '';
        this.prevOperand = '';
    }

    acHandler = () => {
        return this.reset()
    }

    addNextNum = btn => {
        //only one decimal allowed
        if (btn === '.' && this.input.includes('.')) return;
        //if we just had equals we reset
        else if (this.prevOperand === '=') return this.reset()
        //first input
        else if (this.input === '0') this.input = btn;
        //otherwise concatenate to input string
        else this.input += btn.toString();
        this.updateScreen();
    }

    operandHandler = operand => {
        //if we just had equals we reset
        if (this.prevOperand === '=') {
            return this.reset();
        }
        //first input, so no calculations needed
        else if (this.output === '') {
            this.output = this.input + operand;
            this.result = parseFloat(this.input)
            this.input = '0';
        }
        //input is '0' means that there is already an operand chosen
        else if (this.input === '0') return;
        //if we want eqauls we want to display that in input 
        else {
            switch(this.prevOperand) {
                case '/':
                    this.result /= parseFloat(this.input);
                    break;
                case '*':
                    this.result *= parseFloat(this.input);
                    break;
                case '+':
                    this.result += parseFloat(this.input);
                    break;
                case '-':
                    this.result -= parseFloat(this.input);
                    break;
                default: 
                    return this.result = 0;
            };
            if (operand === '=') {
                this.input = '=  ' + this.result.toString();
                this.output = '';
            } else {
                this.output = this.result.toString() + operand;
                this.input = '0';
            }
        }
        this.prevOperand = operand;
        this.updateScreen();
    };

    removePrevNum = () => {
        if (this.input === '0') return;
        this.input = this.input.slice(0, this.input.length - 1);
        this.updateScreen();
    };

    updateScreen = () => {
        inputScreen.innerText = this.input;
        outputScreen.innerText = this.output;
    };

    reset = () => {
        this.result = 0;
        this.input = '0';
        this.output = '';
        this.prevOperand = '';
        this.updateScreen();
    }
};

const myCalculator = new Calculator();
const numberBtns = document.querySelectorAll('[data-number]');
const operands = document.querySelectorAll('[data-operand]');
const equals = document.querySelector('[data-equals]');
const del = document.querySelector('[data-del]');
const ac = document.querySelector('[data-ac]');
let inputScreen = document.querySelector('.input');
let outputScreen = document.querySelector('.output');

numberBtns.forEach(btn => btn.addEventListener('click', e => myCalculator.addNextNum(e.target.innerText)));
operands.forEach(operand => operand.addEventListener('click', e => myCalculator.operandHandler(e.target.innerText)));
ac.addEventListener('click', () => myCalculator.acHandler());
del.addEventListener('click', () => myCalculator.removePrevNum());
myCalculator.updateScreen();

