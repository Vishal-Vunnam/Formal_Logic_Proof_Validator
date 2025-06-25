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
  