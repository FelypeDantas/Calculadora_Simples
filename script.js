const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

/* =========================
   ESTADO
========================= */
const state = {
  current: "0"
};

/* =========================
   INIT
========================= */
function init() {
  buttons.forEach(button => {
    button.addEventListener("click", handleClick);
  });

  document.addEventListener("keydown", handleKeyboard);

  updateDisplay();
}

init();

/* =========================
   EVENTOS
========================= */
function handleClick(e) {
  const { value, action } = e.target.dataset;

  if (value) input(value);
  if (action) actionHandler(action);
}

function handleKeyboard(e) {
  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    input(e.key);
  } else if (e.key === "Enter") {
    actionHandler("calculate");
  } else if (e.key === "Backspace") {
    actionHandler("delete");
  } else if (e.key === "Escape") {
    actionHandler("clear");
  }
}

/* =========================
   INPUT
========================= */
function input(value) {
  if (isOperator(value)) {
    handleOperator(value);
    return;
  }

  if (value === ".") {
    handleDecimal();
    return;
  }

  // número
  if (state.current === "0") {
    state.current = value;
  } else {
    state.current += value;
  }

  updateDisplay();
}

/* =========================
   OPERADORES
========================= */
function handleOperator(op) {
  const last = state.current.slice(-1);

  if (isOperator(last)) {
    state.current = state.current.slice(0, -1) + op;
  } else {
    state.current += op;
  }

  updateDisplay();
}

function handleDecimal() {
  const parts = state.current.split(/[\+\-\*\/]/);
  const lastNumber = parts[parts.length - 1];

  if (!lastNumber.includes(".")) {
    state.current += ".";
  }

  updateDisplay();
}

/* =========================
   ACTIONS
========================= */
function actionHandler(action) {
  switch (action) {
    case "clear":
      state.current = "0";
      break;

    case "delete":
      state.current =
        state.current.length > 1
          ? state.current.slice(0, -1)
          : "0";
      break;

    case "calculate":
      state.current = calculate(state.current);
      break;
  }

  updateDisplay();
}

/* =========================
   CALCULO (SEM EVAL)
========================= */
function calculate(expression) {
  try {
    const tokens = tokenize(expression);
    const result = compute(tokens);
    return result.toString();
  } catch {
    return "Erro";
  }
}

/* =========================
   TOKENIZAÇÃO
========================= */
function tokenize(expr) {
  return expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
}

/* =========================
   RESOLUÇÃO
   (prioridade: * / depois + -)
========================= */
function compute(tokens) {
  let stack = [];
  let currentOp = "+";

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!isNaN(token)) {
      const num = parseFloat(token);

      if (currentOp === "+") stack.push(num);
      if (currentOp === "-") stack.push(-num);
      if (currentOp === "*") stack.push(stack.pop() * num);
      if (currentOp === "/") stack.push(stack.pop() / num);
    } else {
      currentOp = token;
    }
  }

  return stack.reduce((acc, val) => acc + val, 0);
}

/* =========================
   HELPERS
========================= */
function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

/* =========================
   UI
========================= */
function updateDisplay() {
  display.value = state.current;
}
