// Generated from Logic.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,8,42,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,
7,4,2,5,7,5,2,6,7,6,2,7,7,7,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,
1,5,1,5,1,6,4,6,32,8,6,11,6,12,6,33,1,7,4,7,37,8,7,11,7,12,7,38,1,7,1,7,
0,0,8,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,1,0,2,1,0,97,122,3,0,9,10,13,13,
32,32,43,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,
1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,1,17,1,0,0,0,3,20,1,0,0,0,5,22,1,0,0,0,
7,24,1,0,0,0,9,26,1,0,0,0,11,28,1,0,0,0,13,31,1,0,0,0,15,36,1,0,0,0,17,18,
5,45,0,0,18,19,5,62,0,0,19,2,1,0,0,0,20,21,5,94,0,0,21,4,1,0,0,0,22,23,5,
118,0,0,23,6,1,0,0,0,24,25,5,126,0,0,25,8,1,0,0,0,26,27,5,40,0,0,27,10,1,
0,0,0,28,29,5,41,0,0,29,12,1,0,0,0,30,32,7,0,0,0,31,30,1,0,0,0,32,33,1,0,
0,0,33,31,1,0,0,0,33,34,1,0,0,0,34,14,1,0,0,0,35,37,7,1,0,0,36,35,1,0,0,
0,37,38,1,0,0,0,38,36,1,0,0,0,38,39,1,0,0,0,39,40,1,0,0,0,40,41,6,7,0,0,
41,16,1,0,0,0,3,0,33,38,1,6,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class LogicLexer extends antlr4.Lexer {

    static grammarFileName = "Logic.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'->'", "'^'", "'v'", "'~'", "'('", "')'" ];
	static symbolicNames = [ null, null, null, null, null, null, null, "ID", 
                          "WS" ];
	static ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "ID", 
                      "WS" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.atn.PredictionContextCache());
    }
}

LogicLexer.EOF = antlr4.Token.EOF;
LogicLexer.T__0 = 1;
LogicLexer.T__1 = 2;
LogicLexer.T__2 = 3;
LogicLexer.T__3 = 4;
LogicLexer.T__4 = 5;
LogicLexer.T__5 = 6;
LogicLexer.ID = 7;
LogicLexer.WS = 8;



