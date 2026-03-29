const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "0";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) handleInput(value);
    if (action) handleAction(action);
  });
});

function handleInput(value) {
  if (current === "0" && value !== ".") {
    current = value;
  } else {
    current += value;
  }
  updateDisplay();
}

function handleAction(action) {
  switch (action) {
    case "clear":
      current = "0";
      break;

    case "delete":
      current = current.length > 1 ? current.slice(0, -1) : "0";
      break;

    case "calculate":
      calculate();
      break;
  }
  updateDisplay();
}

function updateDisplay() {
  display.value = current;
}

// ⚠️ substituto simples para eval
function calculate() {
  try {
    current = Function(`"use strict"; return (${current})`)().toString();
  } catch {
    current = "Erro";
  }
}
