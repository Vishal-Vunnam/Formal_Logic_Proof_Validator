// parser.js

class PrologListener extends LogicListener {
  constructor() {
    super();
    this.stack = [];
  }

  exitIdExpr(ctx) {
    this.stack.push(ctx.ID().getText());
  }

  exitNotExpr(ctx) {
    const operand = this.stack.pop();
    this.stack.push(`not(${operand})`);
  }

  exitAndExpr(ctx) {
    const right = this.stack.pop();
    const left = this.stack.pop();
    this.stack.push(`and(${left},${right})`);
  }

  exitOrExpr(ctx) {
    const right = this.stack.pop();
    const left = this.stack.pop();
    this.stack.push(`or(${left},${right})`);
  }

  exitImpliesExpr(ctx) {
    const right = this.stack.pop();
    const left = this.stack.pop();
    this.stack.push(`implies(${left},${right})`);
  }

  exitParenExpr(ctx) {
    // Parentheses don't affect structure; do nothing
  }

  getResult() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : "";
  }
}

function parseLogicANTLR(input) {
  console.log("Parsing input:", input);
  const chars = new antlr4.InputStream(input);
  const lexer = new LogicLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new LogicParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.expr();

  const listener = new PrologListener();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

  return listener.getResult();
}
