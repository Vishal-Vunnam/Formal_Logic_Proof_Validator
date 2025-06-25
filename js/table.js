let conclusionStack = [];
let stackCount = 0;
let conclusion = false;

const ruleDict = {
    "Conjunction Introduction": "∧I",
    "Conjunction Elimination": "∧E",
    "Disjunction Introduction": "∨I",
    "Disjunction Elimination": "∨E",
    "Implication Introduction": "→I",
    "Implication Elimination": "→E",
    "Biconditional Introduction": "↔I",
}
const ruleNumbers = {
    "∧I": 2,
    "∧E": 2,
    "∨I": 1,
    "∨E": 1,
    "→I": 1,
    "→E": 2,
    "↔I": 1,
    "↔E": 2,
    "¬I": 1,
    "¬E": 1,
}

function insertSymbolAtCursor(symbol) {
    console.log("Inserting symbol:", symbol);
    const input = document.activeElement;
    if(input.className !== "premise" && input.className !== "conclusion") {
        return;
    }

    if (input && (input.tagName === "INPUT" || input.tagName === "TEXTAREA")) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const value = input.value;
        input.value = value.slice(0, start) + symbol + value.slice(end);
        // Move cursor after inserted symbol
        input.selectionStart = input.selectionEnd = start + symbol.length;
        input.focus();
    }

}

function insertRuleAtCursor(rule) {
    const input = document.activeElement;

    if(input.className !== "rule") {
        return;
    }

    if (!input || (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA")) return;

    if (input.value.trim() !== "") {
        input.value = ""; // Clear non-empty input
    }       
    if(ruleNumbers[rule]) {
        console.log("Rule number:", ruleNumbers[rule]);
        for(let i = 0; i < ruleNumbers[rule]; i++) {
            input.value = input.value + ","
        }
    }
    input.value += rule; // Insert the rule

    input.selectionStart = input.selectionEnd = 0; // Move cursor to beginning
    input.focus();
}

function buildSymbolTable() {

    const symbolTableContent = document.getElementById('symbolTableContent');
    symbolTableContent.innerHTML = ""; 

    for (const [symbol, op] of Object.entries(OP_MAP)) {
        const symbolDiv = document.createElement('div');
        symbolDiv.style.display = 'flex';
        symbolDiv.style.flexDirection = 'column';
        symbolDiv.style.alignItems = 'center';

        const symbolBtn = document.createElement('button');
        symbolBtn.onmousedown = (e) => {
            e.preventDefault();
            insertSymbolAtCursor(symbol);
        };
        symbolBtn.className = 'symbolRow';
        symbolBtn.textContent = symbol; 
        symbolBtn.title = op;
        // Remove duplicate event: only use onmousedown for instant insert
        symbolDiv.appendChild(symbolBtn);

        const opText = document.createElement('span');
        opText.textContent = op.charAt(0).toUpperCase() + op.slice(1);
        opText.style.fontSize = '0.55rem';
        opText.style.color = '#666';
        symbolDiv.appendChild(opText);

        symbolTableContent.appendChild(symbolDiv);
    }
}
function buildRuleTable() {
    const ruleTableContent = document.getElementById('ruleTableContent');
    ruleTableContent.innerHTML = "";

    for (const [rule, op] of Object.entries(ruleDict)) {
        const opBtn = document.createElement('button');
        opBtn.className = 'ruleRow';
        opBtn.textContent = op;
        opBtn.title = rule;
        opBtn.onmousedown = (e) => {
            e.preventDefault();
            insertRuleAtCursor(op);
        };
        ruleTableContent.appendChild(opBtn);

        const ruleText = document.createElement('span');
        ruleText.textContent = rule.charAt(0).toUpperCase() + rule.slice(1);
        ruleText.style.fontSize = '0.55rem';
        ruleText.style.color = '#666';
        ruleTableContent.appendChild(ruleText);
    }

}

function addPremise() {
        const premiseContainer = document.getElementById('premiseContainer');

        const row = document.createElement('div');
        row.className = 'premiseRow';

        const inputCol = document.createElement('div');
        inputCol.className = 'proofLineCol indent';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'premise';
        input.placeholder = 'Enter another premise';

        inputCol.appendChild(input);
        // row.appendChild(lineCol);
        row.appendChild(inputCol);
        premiseContainer.appendChild(row);

        
    }
function addConclusion() {
    const conclusionContainer = document.getElementById('conclusionContainer');

    const row = document.createElement('div');
    row.className = 'conclusionRow';

    // Create a flex container for side-by-side layout
    const inputFlex = document.createElement('div');
    inputFlex.style.display = 'flex';
    inputFlex.style.gap = '0.8rem';
    inputFlex.style.alignItems = 'center';

    // Conclusion input (left)
    const conclusionInput = document.createElement('input');
    conclusionInput.type = 'text';
    conclusionInput.className = 'conclusion';
    conclusionInput.placeholder = 'Enter conclusion';
    inputFlex.appendChild(conclusionInput);

    // Rule input (right)
    const ruleInput = document.createElement('input');
    ruleInput.type = 'text';
    ruleInput.className = 'rule';
    ruleInput.placeholder = 'Enter rule';
    inputFlex.appendChild(ruleInput);

    // Add flex container to row
    row.appendChild(inputFlex);
    conclusionContainer.appendChild(row);
}
function enterAssumption() {
    const newConclusionContainer = document.createElement('div');
    newConclusionContainer.className = 'conclusionContainer';
    conclusionStack.push(newConclusionContainer);   

    const newAssumption = document.createElement('div');
    newAssumption.style.marginLeft = `${conclusionStack.length * 20}px`;
    newAssumption.className = 'assumptionRow';
    
    const assumptionPremise = document.createElement('div');
    assumptionPremise.className = 'assumptionPremise';
    
    const assumptionInput = document.createElement('input');
    assumptionInput.type = 'text';
    assumptionInput.className = 'assumption';
    assumptionInput.placeholder = 'Enter assumption';
    assumptionPremise.appendChild(assumptionInput);
    
    const assumptionConclusion = document.createElement('div');
    assumptionConclusion.className = 'assumptionConclusion';
    
    const conclusionInput = document.createElement('input');
    conclusionInput.type = 'text';
    conclusionInput.className = 'conclusion';
    conclusionInput.placeholder = 'Enter conclusion';
    assumptionConclusion.appendChild(conclusionInput);
    
    // Assemble the assumption structure
    newAssumption.appendChild(assumptionPremise);
    newAssumption.appendChild(assumptionConclusion);
    conclusionContainer.appendChild(newAssumption);
}

function exitAssumption() {

}

function displayResults(ret_array) {
    const prologOutput = document.getElementById('prologOutput');
    prologOutput.innerHTML = "";
    for(let i = 0; i < ret_array.length; i++) {
        const line = document.createElement('div');
        line.textContent = ret_array[i];
        prologOutput.appendChild(line);
    }
}



function removeLine() {
    const proofContainer = document.getElementById('proofContainer');
    if (proofContainer.lastChild) {
        const lastElement = proofContainer.lastChild;
        proofContainer.removeChild(lastElement);

        const lastElement2 = proofContainer.lastChild;
        if (lastElement2 && lastElement2.className === 'assumption-line') {
            proofContainer.removeChild(lastElement2);
            const lastElement3 = proofContainer.lastChild;
            proofContainer.removeChild(lastElement3);
            contextStack.pop();
            currentContext = contextStack[contextStack.length - 1] || nestedProof;
        }
        if (lastElement2.className === 'conclusion-line') {
            proofContainer.removeChild(lastElement2);
            conclusion = false;
        }
    } else {
        alert("No lines to remove.");
    }
}

function submitProof() {
        let {premises, conclusions} = parseProof();
        let ret_array = runLogic(premises, conclusions);
        displayResults(ret_array);
    }

function parseProof() {
    // Parse premises
    const premises = {};
    let lineCount = 0;
    const premiseContainer = document.getElementById('premiseContainer');
    const premiseInputs = premiseContainer.querySelectorAll('input');
    for (const input of premiseInputs) {
        if (input.value.trim() !== "") {
           premises[lineCount] = input.value.trim();
           lineCount++;
        }
    }

    // Parse conclusions
    const conclusions = {};
    const conclusionContainer = document.getElementById('conclusionContainer');
    const conclusionInputs = conclusionContainer.querySelectorAll('input');
    for (const input of conclusionInputs) {
        if(input.className !== "conclusion") {
            continue;
        }
        if (input.value.trim() !== "") {
            let ruleInput = null;
            if (input.parentElement) {
                ruleInput = input.parentElement.querySelector('input.rule');
            }
            conclusions[lineCount] = {
                text: input.value.trim(),
                rule: ruleInput ? ruleInput.value.trim() : ""
            };
            lineCount++;
        }
    }
    console.log('Premises:', premises);
    console.log('Conclusions:', conclusions);
    return {premises, conclusions};

}

window.onload = function() {
    buildRuleTable();
    buildSymbolTable();
};