// Generated from SolidWorksEquations.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import SolidWorksEquationsListener from "./SolidWorksEquationsListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class SolidWorksEquationsParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly ID = 10;
	public static readonly NUMBER = 11;
	public static readonly UNIT = 12;
	public static readonly STRING = 13;
	public static readonly WS = 14;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_equations = 0;
	public static readonly RULE_equation = 1;
	public static readonly RULE_variableDeclaration = 2;
	public static readonly RULE_propertyAssignment = 3;
	public static readonly RULE_expression = 4;
	public static readonly literalNames: (string | null)[] = [null, "'='",
		"';'", "'@'",
		"'('", "')'",
		"'*'", "'/'",
		"'+'", "'-'"];
	public static readonly symbolicNames: (string | null)[] = [null, null,
		null, null,
		null, null,
		null, null,
		null, null,
		"ID", "NUMBER",
		"UNIT", "STRING",
		"WS"];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"equations", "equation", "variableDeclaration", "propertyAssignment",
		"expression",
	];
	public get grammarFileName(): string { return "SolidWorksEquations.g4"; }
	public get literalNames(): (string | null)[] { return SolidWorksEquationsParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return SolidWorksEquationsParser.symbolicNames; }
	public get ruleNames(): string[] { return SolidWorksEquationsParser.ruleNames; }
	public get serializedATN(): number[] { return SolidWorksEquationsParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, SolidWorksEquationsParser._ATN, SolidWorksEquationsParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public equations(): EquationsContext {
		let localctx: EquationsContext = new EquationsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, SolidWorksEquationsParser.RULE_equations);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
				this.state = 11;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
						{
							this.state = 10;
							this.equation();
						}
					}
					this.state = 13;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === 13);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equation(): EquationContext {
		let localctx: EquationContext = new EquationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, SolidWorksEquationsParser.RULE_equation);
		try {
			this.state = 17;
			this._errHandler.sync(this);
			switch (this._interp.adaptivePredict(this._input, 1, this._ctx)) {
				case 1:
					this.enterOuterAlt(localctx, 1);
					{
						this.state = 15;
						this.variableDeclaration();
					}
					break;
				case 2:
					this.enterOuterAlt(localctx, 2);
					{
						this.state = 16;
						this.propertyAssignment();
					}
					break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public variableDeclaration(): VariableDeclarationContext {
		let localctx: VariableDeclarationContext = new VariableDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, SolidWorksEquationsParser.RULE_variableDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
				this.state = 19;
				this.match(SolidWorksEquationsParser.STRING);
				this.state = 20;
				this.match(SolidWorksEquationsParser.T__0);
				this.state = 21;
				this.expression(0);
				this.state = 22;
				this.match(SolidWorksEquationsParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public propertyAssignment(): PropertyAssignmentContext {
		let localctx: PropertyAssignmentContext = new PropertyAssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, SolidWorksEquationsParser.RULE_propertyAssignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
				this.state = 24;
				this.match(SolidWorksEquationsParser.STRING);
				this.state = 25;
				this.match(SolidWorksEquationsParser.T__2);
				this.state = 26;
				this.match(SolidWorksEquationsParser.STRING);
				this.state = 27;
				this.match(SolidWorksEquationsParser.T__0);
				this.state = 28;
				this.expression(0);
				this.state = 29;
				this.match(SolidWorksEquationsParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 8;
		this.enterRecursionRule(localctx, 8, SolidWorksEquationsParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
				this.state = 39;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
					case 10:
						{
							this.state = 32;
							this.match(SolidWorksEquationsParser.ID);
						}
						break;
					case 11:
						{
							this.state = 33;
							this.match(SolidWorksEquationsParser.NUMBER);
						}
						break;
					case 13:
						{
							this.state = 34;
							this.match(SolidWorksEquationsParser.STRING);
						}
						break;
					case 4:
						{
							this.state = 35;
							this.match(SolidWorksEquationsParser.T__3);
							this.state = 36;
							this.expression(0);
							this.state = 37;
							this.match(SolidWorksEquationsParser.T__4);
						}
						break;
					default:
						throw new NoViableAltException(this);
				}
				this._ctx.stop = this._input.LT(-1);
				this.state = 46;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						if (this._parseListeners != null) {
							this.triggerExitRuleEvent();
						}
						_prevctx = localctx;
						{
							{
								localctx = new ExpressionContext(this, _parentctx, _parentState);
								this.pushNewRecursionContext(localctx, _startState, SolidWorksEquationsParser.RULE_expression);
								this.state = 41;
								if (!(this.precpred(this._ctx, 1))) {
									throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
								}
								this.state = 42;
								localctx._op = this._input.LT(1);
								_la = this._input.LA(1);
								if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & 960) !== 0))) {
									localctx._op = this._errHandler.recoverInline(this);
								}
								else {
									this._errHandler.reportMatch(this);
									this.consume();
								}
								this.state = 43;
								this.expression(2);
							}
						}
					}
					this.state = 48;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
			case 4:
				return this.expression_sempred(localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
			case 0:
				return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4, 1, 14, 50, 2, 0, 7, 0, 2,
		1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 1, 0, 4, 0, 12, 8, 0, 11, 0, 12, 0, 13, 1, 1, 1, 1, 3, 1, 18,
		8, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4,
		1, 4, 1, 4, 1, 4, 3, 4, 40, 8, 4, 1, 4, 1, 4, 1, 4, 5, 4, 45, 8, 4, 10, 4, 12, 4, 48, 9, 4, 1, 4, 0, 1,
		8, 5, 0, 2, 4, 6, 8, 0, 1, 1, 0, 6, 9, 50, 0, 11, 1, 0, 0, 0, 2, 17, 1, 0, 0, 0, 4, 19, 1, 0, 0, 0, 6, 24,
		1, 0, 0, 0, 8, 39, 1, 0, 0, 0, 10, 12, 3, 2, 1, 0, 11, 10, 1, 0, 0, 0, 12, 13, 1, 0, 0, 0, 13, 11, 1,
		0, 0, 0, 13, 14, 1, 0, 0, 0, 14, 1, 1, 0, 0, 0, 15, 18, 3, 4, 2, 0, 16, 18, 3, 6, 3, 0, 17, 15, 1, 0,
		0, 0, 17, 16, 1, 0, 0, 0, 18, 3, 1, 0, 0, 0, 19, 20, 5, 13, 0, 0, 20, 21, 5, 1, 0, 0, 21, 22, 3, 8, 4,
		0, 22, 23, 5, 2, 0, 0, 23, 5, 1, 0, 0, 0, 24, 25, 5, 13, 0, 0, 25, 26, 5, 3, 0, 0, 26, 27, 5, 13, 0,
		0, 27, 28, 5, 1, 0, 0, 28, 29, 3, 8, 4, 0, 29, 30, 5, 2, 0, 0, 30, 7, 1, 0, 0, 0, 31, 32, 6, 4, -1, 0,
		32, 40, 5, 10, 0, 0, 33, 40, 5, 11, 0, 0, 34, 40, 5, 13, 0, 0, 35, 36, 5, 4, 0, 0, 36, 37, 3, 8, 4,
		0, 37, 38, 5, 5, 0, 0, 38, 40, 1, 0, 0, 0, 39, 31, 1, 0, 0, 0, 39, 33, 1, 0, 0, 0, 39, 34, 1, 0, 0, 0,
		39, 35, 1, 0, 0, 0, 40, 46, 1, 0, 0, 0, 41, 42, 10, 1, 0, 0, 42, 43, 7, 0, 0, 0, 43, 45, 3, 8, 4, 2,
		44, 41, 1, 0, 0, 0, 45, 48, 1, 0, 0, 0, 46, 44, 1, 0, 0, 0, 46, 47, 1, 0, 0, 0, 47, 9, 1, 0, 0, 0, 48,
		46, 1, 0, 0, 0, 4, 13, 17, 39, 46];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SolidWorksEquationsParser.__ATN) {
			SolidWorksEquationsParser.__ATN = new ATNDeserializer().deserialize(SolidWorksEquationsParser._serializedATN);
		}

		return SolidWorksEquationsParser.__ATN;
	}


	static DecisionsToDFA = SolidWorksEquationsParser._ATN.decisionToState.map((ds: DecisionState, index: number) => new DFA(ds, index));

}

export class EquationsContext extends ParserRuleContext {
	constructor(parser?: SolidWorksEquationsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
		this.parser = parser;
	}
	public equation_list(): EquationContext[] {
		return this.getTypedRuleContexts(EquationContext) as EquationContext[];
	}
	public equation(i: number): EquationContext {
		return this.getTypedRuleContext(EquationContext, i) as EquationContext;
	}
	public get ruleIndex(): number {
		return SolidWorksEquationsParser.RULE_equations;
	}
	public enterRule(listener: SolidWorksEquationsListener): void {
		if (listener.enterEquations) {
			listener.enterEquations(this);
		}
	}
	public exitRule(listener: SolidWorksEquationsListener): void {
		if (listener.exitEquations) {
			listener.exitEquations(this);
		}
	}
}


export class EquationContext extends ParserRuleContext {
	constructor(parser?: SolidWorksEquationsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
		this.parser = parser;
	}
	public variableDeclaration(): VariableDeclarationContext {
		return this.getTypedRuleContext(VariableDeclarationContext, 0) as VariableDeclarationContext;
	}
	public propertyAssignment(): PropertyAssignmentContext {
		return this.getTypedRuleContext(PropertyAssignmentContext, 0) as PropertyAssignmentContext;
	}
	public get ruleIndex(): number {
		return SolidWorksEquationsParser.RULE_equation;
	}
	public enterRule(listener: SolidWorksEquationsListener): void {
		if (listener.enterEquation) {
			listener.enterEquation(this);
		}
	}
	public exitRule(listener: SolidWorksEquationsListener): void {
		if (listener.exitEquation) {
			listener.exitEquation(this);
		}
	}
}


export class VariableDeclarationContext extends ParserRuleContext {
	constructor(parser?: SolidWorksEquationsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
		this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(SolidWorksEquationsParser.STRING, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public get ruleIndex(): number {
		return SolidWorksEquationsParser.RULE_variableDeclaration;
	}
	public enterRule(listener: SolidWorksEquationsListener): void {
		if (listener.enterVariableDeclaration) {
			listener.enterVariableDeclaration(this);
		}
	}
	public exitRule(listener: SolidWorksEquationsListener): void {
		if (listener.exitVariableDeclaration) {
			listener.exitVariableDeclaration(this);
		}
	}
}


export class PropertyAssignmentContext extends ParserRuleContext {
	constructor(parser?: SolidWorksEquationsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
		this.parser = parser;
	}
	public STRING_list(): TerminalNode[] {
		return this.getTokens(SolidWorksEquationsParser.STRING);
	}
	public STRING(i: number): TerminalNode {
		return this.getToken(SolidWorksEquationsParser.STRING, i);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public get ruleIndex(): number {
		return SolidWorksEquationsParser.RULE_propertyAssignment;
	}
	public enterRule(listener: SolidWorksEquationsListener): void {
		if (listener.enterPropertyAssignment) {
			listener.enterPropertyAssignment(this);
		}
	}
	public exitRule(listener: SolidWorksEquationsListener): void {
		if (listener.exitPropertyAssignment) {
			listener.exitPropertyAssignment(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public _op!: Token;
	constructor(parser?: SolidWorksEquationsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
		this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(SolidWorksEquationsParser.ID, 0);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(SolidWorksEquationsParser.NUMBER, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(SolidWorksEquationsParser.STRING, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public get ruleIndex(): number {
		return SolidWorksEquationsParser.RULE_expression;
	}
	public enterRule(listener: SolidWorksEquationsListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	public exitRule(listener: SolidWorksEquationsListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
}
