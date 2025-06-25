class Expr {
  constructor(data) {
    this.data = data;
  }

  static atom(value) {
    return new Expr({ op: "atom", value });
  }

  static not(expr) {
    return new Expr({ op: "not", expr: expr.data });
  }

  and(other) {
    return new Expr({
      op: "and",
      left: this.data,
      right: other.data
    });
  }

  or(other) {
    return new Expr({
      op: "or",
      left: this.data,
      right: other.data
    });
  }

  implies(other) {
    return new Expr({
      op: "implies",
      left: this.data,
      right: other.data
    });
  }

  iff(other) {
    return new Expr({
      op: "iff",
      left: this.data,
      right: other.data
    });
  }

  // Optional: export raw data
  toJSON() {
    return this.data;
  }

  // Optional: pretty-print for debugging
  toString() {
    const op = this.data.op;
    if (op === "atom") return this.data.value;
    if (op === "not") return `¬(${new Expr(this.data.expr).toString()})`;
    const left = new Expr(this.data.left).toString();
    const right = new Expr(this.data.right).toString();
    const symbols = {
      and: "∧",
      or: "∨",
      implies: "→",
      iff: "↔"
    };
    return `(${left} ${symbols[op] || op} ${right})`;
  }
}

// Helper: Operator mapping
const OP_MAP = {
  "¬": "not",
  "∧": "and",
  "∨": "or",
  "→": "implies",
  "↔": "iff"
};

// Helper: Operator precedence
const PRECEDENCE = {
  not: 4,
  and: 3,
  or: 2,
  implies: 1,
  iff: 0
};

function tokenizeInfix(str) {
  return str
    .replace(/\s+/g, "")
    .replace(/([¬∧∨→↔()])/g, " $1 ")
    .trim()
    .split(/\s+/);
}

Expr.fromInfix = function (input) {
  const tokens = tokenizeInfix(input);
  let index = 0;

  function peek() {
    return tokens[index];
  }

  function consume(expected) {
    if (tokens[index] === expected) {
      index++;
    } else {
      throw new Error(`Expected "${expected}" but got "${tokens[index]}"`);
    }
  }

  function parseExpression(precedence = 0) {
    let expr = parsePrimary();

    while (true) {
      const op = OP_MAP[peek()];
      if (!op || PRECEDENCE[op] < precedence) break;

      const currPrecedence = PRECEDENCE[op];
      index++; // consume operator
      const right = parseExpression(currPrecedence + (op === "implies" ? 0 : 1)); // right-assoc for implies

      expr = Expr.prototype[op].call(expr, right);
    }

    return expr;
  }

  function parsePrimary() {
    const token = peek();

    if (token === "(") {
      consume("(");
      const expr = parseExpression();
      consume(")");
      return expr;
    }

    if (token === "¬") {
      index++;
      const operand = parsePrimary();
      return Expr.not(operand);
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
      index++;
      return Expr.atom(token);
    }

    throw new Error(`Unexpected token: "${token}"`);
  }

  return parseExpression();
};



// const input = "((a ↔ d) ∧ (b ↔ c)) ∨ (¬(a ↔ d) ∧ ¬(b ↔ c))";
// const expr = Expr.fromInfix(input);

// function testExpr() {
  
//   console.log(expr.toString()); // (a ∧ b) → ¬(c)
//   console.log(expr.toJSON());  
// 

function parseRuleString(str) {
  const parts = str.split(','); // Split on commas

  let firstNum = null;
  let secondNum = null;
  let rule = null;

  if (parts.length === 1) {
      // No commas, just the rule
      rule = parts[0].trim();
  } else if (parts.length === 2) {
      // One number, one rule
      firstNum = parseInt(parts[0]);
      rule = parts[1].trim();
  } else if (parts.length === 3) {
      // Two numbers, one rule
      firstNum = parseInt(parts[0]);
      secondNum = parseInt(parts[1]);
      rule = parts[2].trim();
  }

  return { firstNum, secondNum, rule };
}

function checkDisjunctionIntroduction(conclusion, value1) {
  if (conclusion.data.op === "or") {
    return JSON.stringify(conclusion.data.left) === JSON.stringify(value1.data) || JSON.stringify(conclusion.data.right) === JSON.stringify(value1.data);
  }
  return false;
}

function checkDisjunctionElimination(conclusion, value1, value2) {
}

function checkConjunctionIntroduction(conclusion, value1, value2) {
  if (conclusion.data.op === "and") {
    const checkval = JSON.stringify(conclusion.data.left) === JSON.stringify(value1.data) && JSON.stringify(conclusion.data.right) === JSON.stringify(value2.data);
    return checkval || (JSON.stringify(conclusion.data.left) === JSON.stringify(value2.data) && JSON.stringify(conclusion.data.right) === JSON.stringify(value1.data));
  }
  return false;
}

function checkConjunctionElimination(conclusion, value1) {
  if (value1.data.op === "and") {
    return JSON.stringify(conclusion.data) === JSON.stringify(value1.data.left) || JSON.stringify(conclusion.data) === JSON.stringify(value1.data.right);
  }
  return false;
}

function checkImplicationIntroduction(conclusion, value1, value2) {
}

function checkImplicationElimination(conclusion, value1, value2) {
  if (value1.data.op === "implies") {
    const checkvalues = JSON.stringify(value1.data.left) === JSON.stringify(value2.data);
    return JSON.stringify(conclusion.data) === JSON.stringify(value1.data.right);
  }
  return false;
}



function checkTruth(conclusion, full_rule, truthMap) {
  const { firstNum, secondNum, rule } = parseRuleString(full_rule);
  console.log("checkTruth called with:", {
    conclusion,
    full_rule,
    truthMap,
    firstNum,
    secondNum,
    rule
  });
  switch(rule) {
    case "∨I":
      console.log("Running checkDisjunctionIntroduction with", conclusion, truthMap[firstNum]);
      return checkDisjunctionIntroduction(conclusion, truthMap[firstNum]);
    case "∨E":
      console.log("Running checkDisjunctionElimination with", conclusion, truthMap[firstNum], truthMap[secondNum]);
      return checkDisjunctionElimination(conclusion, truthMap[firstNum], truthMap[secondNum]);
    case "∧I":
      console.log("Running checkConjunctionIntroduction with", conclusion, truthMap[firstNum], truthMap[secondNum]);
      return checkConjunctionIntroduction(conclusion, truthMap[firstNum], truthMap[secondNum]);
    case "∧E":
      console.log("Running checkConjunctionElimination with", conclusion, truthMap[firstNum]);
      return checkConjunctionElimination(conclusion, truthMap[firstNum]);
    case "→I":
      console.log("Running checkImplicationIntroduction with", conclusion, truthMap[firstNum], truthMap[secondNum]);
      return checkImplicationIntroduction(conclusion, truthMap[firstNum], truthMap[secondNum]);
    case "→E":
      console.log("Running checkImplicationElimination with", conclusion, truthMap[firstNum], truthMap[secondNum]);
      return checkImplicationElimination(conclusion, truthMap[firstNum], truthMap[secondNum]);
    case "↔I":
      console.log("Running checkBiconditionalIntroduction with", conclusion, truthMap[firstNum], truthMap[secondNum]);
      return checkBiconditionalIntroduction(conclusion, truthMap[firstNum], truthMap[secondNum]);
    case "↔E":
      console.log("Running checkBiconditionalElimination with", conclusion, truthMap[firstNum], truthMap[secondNum]);
      return checkBiconditionalElimination(conclusion, truthMap[firstNum], truthMap[secondNum]);
    case "¬I":
      console.log("checkNegationIntroduction not implemented");
      break;
    default:
      console.log("Unknown rule:", rule);
  }
  return true;
}


function runLogic(premises, conclusions) {
  console.log("Running logic");
  console.log(premises);
  console.log(conclusions);

  // premises is an object like {0: "a ∧ b", 1: "c ∧ d"}
  // conclusions is an object like {0: {"text": "a ∧ b", "rule": "∧I"}, 1: {"text": "c ∧ d", "rule": "∧I"}}
  var truthMap = {}; 
  var ret_array = []; 

  for (const key in premises) {
    if (premises.hasOwnProperty(key)) {
      var line = premises[key];
      line = Expr.fromInfix(line);
      truthMap[key] = line;
      ret_array.push(true);
    }
  }
  console.log(truthMap);
  for (const key in conclusions) {
    if (conclusions.hasOwnProperty(key)) {
      var lineObj = conclusions[key];
      var lineText = typeof lineObj === "string" ? lineObj : lineObj.text;
      var line = Expr.fromInfix(lineText);
      // truthMap[key] = line;
      if(checkTruth(line, lineObj.rule,  truthMap)){
        truthMap[key] = line;
        ret_array.push(true);
      }
      else{
        ret_array.push(false);
        return ret_array;
      }
    }
  }
  return ret_array;
}

