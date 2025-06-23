// Generated from Logic.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import LogicListener from './LogicListener.js';
const serializedATN = [4,1,8,27,2,0,7,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
3,0,11,8,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,5,0,22,8,0,10,0,12,0,25,9,
0,1,0,0,1,0,1,0,0,0,30,0,10,1,0,0,0,2,3,6,0,-1,0,3,4,5,4,0,0,4,11,3,0,0,
3,5,6,5,5,0,0,6,7,3,0,0,0,7,8,5,6,0,0,8,11,1,0,0,0,9,11,5,7,0,0,10,2,1,0,
0,0,10,5,1,0,0,0,10,9,1,0,0,0,11,23,1,0,0,0,12,13,10,6,0,0,13,14,5,1,0,0,
14,22,3,0,0,7,15,16,10,5,0,0,16,17,5,2,0,0,17,22,3,0,0,6,18,19,10,4,0,0,
19,20,5,3,0,0,20,22,3,0,0,5,21,12,1,0,0,0,21,15,1,0,0,0,21,18,1,0,0,0,22,
25,1,0,0,0,23,21,1,0,0,0,23,24,1,0,0,0,24,1,1,0,0,0,25,23,1,0,0,0,3,10,21,
23];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class LogicParser extends antlr4.Parser {

    static grammarFileName = "Logic.g4";
    static literalNames = [ null, "'->'", "'^'", "'v'", "'~'", "'('", "')'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, "ID", 
                             "WS" ];
    static ruleNames = [ "expr" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LogicParser.ruleNames;
        this.literalNames = LogicParser.literalNames;
        this.symbolicNames = LogicParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 0:
    	    		return this.expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 6);
    		case 1:
    			return this.precpred(this._ctx, 5);
    		case 2:
    			return this.precpred(this._ctx, 4);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };



	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 0;
	    this.enterRecursionRule(localctx, 0, LogicParser.RULE_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 10;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 4:
	            localctx = new NotExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 3;
	            this.match(LogicParser.T__3);
	            this.state = 4;
	            this.expr(3);
	            break;
	        case 5:
	            localctx = new ParensExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 5;
	            this.match(LogicParser.T__4);
	            this.state = 6;
	            this.expr(0);
	            this.state = 7;
	            this.match(LogicParser.T__5);
	            break;
	        case 7:
	            localctx = new IdExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 9;
	            this.match(LogicParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 23;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 21;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ImpliesExprContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 12;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 13;
	                    this.match(LogicParser.T__0);
	                    this.state = 14;
	                    this.expr(7);
	                    break;

	                case 2:
	                    localctx = new AndExprContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 15;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 16;
	                    this.match(LogicParser.T__1);
	                    this.state = 17;
	                    this.expr(6);
	                    break;

	                case 3:
	                    localctx = new OrExprContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_expr);
	                    this.state = 18;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 19;
	                    this.match(LogicParser.T__2);
	                    this.state = 20;
	                    this.expr(5);
	                    break;

	                } 
	            }
	            this.state = 25;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


}

LogicParser.EOF = antlr4.Token.EOF;
LogicParser.T__0 = 1;
LogicParser.T__1 = 2;
LogicParser.T__2 = 3;
LogicParser.T__3 = 4;
LogicParser.T__4 = 5;
LogicParser.T__5 = 6;
LogicParser.ID = 7;
LogicParser.WS = 8;

LogicParser.RULE_expr = 0;

class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_expr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class NotExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterNotExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitNotExpr(this);
		}
	}


}

LogicParser.NotExprContext = NotExprContext;

class ImpliesExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterImpliesExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitImpliesExpr(this);
		}
	}


}

LogicParser.ImpliesExprContext = ImpliesExprContext;

class OrExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterOrExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitOrExpr(this);
		}
	}


}

LogicParser.OrExprContext = OrExprContext;

class ParensExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterParensExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitParensExpr(this);
		}
	}


}

LogicParser.ParensExprContext = ParensExprContext;

class IdExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ID() {
	    return this.getToken(LogicParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterIdExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitIdExpr(this);
		}
	}


}

LogicParser.IdExprContext = IdExprContext;

class AndExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterAndExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitAndExpr(this);
		}
	}


}

LogicParser.AndExprContext = AndExprContext;


LogicParser.ExprContext = ExprContext; 
