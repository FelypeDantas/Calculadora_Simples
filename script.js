let display = document.getElementById("display");

function appendNumber(number) {
    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if ("+-*/.".includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator; // Substitui o operador repetido
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Erro";
    }
}