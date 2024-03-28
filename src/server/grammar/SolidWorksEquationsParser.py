# Generated from SolidWorksEquations.g4 by ANTLR 4.13.1
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO

def serializedATN():
    return [
        4,1,14,50,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,4,0,12,8,0,
        11,0,12,0,13,1,1,1,1,3,1,18,8,1,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,40,8,4,1,4,1,
        4,1,4,5,4,45,8,4,10,4,12,4,48,9,4,1,4,0,1,8,5,0,2,4,6,8,0,1,1,0,
        6,9,50,0,11,1,0,0,0,2,17,1,0,0,0,4,19,1,0,0,0,6,24,1,0,0,0,8,39,
        1,0,0,0,10,12,3,2,1,0,11,10,1,0,0,0,12,13,1,0,0,0,13,11,1,0,0,0,
        13,14,1,0,0,0,14,1,1,0,0,0,15,18,3,4,2,0,16,18,3,6,3,0,17,15,1,0,
        0,0,17,16,1,0,0,0,18,3,1,0,0,0,19,20,5,13,0,0,20,21,5,1,0,0,21,22,
        3,8,4,0,22,23,5,2,0,0,23,5,1,0,0,0,24,25,5,13,0,0,25,26,5,3,0,0,
        26,27,5,13,0,0,27,28,5,1,0,0,28,29,3,8,4,0,29,30,5,2,0,0,30,7,1,
        0,0,0,31,32,6,4,-1,0,32,40,5,10,0,0,33,40,5,11,0,0,34,40,5,13,0,
        0,35,36,5,4,0,0,36,37,3,8,4,0,37,38,5,5,0,0,38,40,1,0,0,0,39,31,
        1,0,0,0,39,33,1,0,0,0,39,34,1,0,0,0,39,35,1,0,0,0,40,46,1,0,0,0,
        41,42,10,1,0,0,42,43,7,0,0,0,43,45,3,8,4,2,44,41,1,0,0,0,45,48,1,
        0,0,0,46,44,1,0,0,0,46,47,1,0,0,0,47,9,1,0,0,0,48,46,1,0,0,0,4,13,
        17,39,46
    ]

class SolidWorksEquationsParser ( Parser ):

    grammarFileName = "SolidWorksEquations.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'='", "';'", "'@'", "'('", "')'", "'*'", 
                     "'/'", "'+'", "'-'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "ID", "NUMBER", "UNIT", 
                      "STRING", "WS" ]

    RULE_equations = 0
    RULE_equation = 1
    RULE_variableDeclaration = 2
    RULE_propertyAssignment = 3
    RULE_expression = 4

    ruleNames =  [ "equations", "equation", "variableDeclaration", "propertyAssignment", 
                   "expression" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    T__4=5
    T__5=6
    T__6=7
    T__7=8
    T__8=9
    ID=10
    NUMBER=11
    UNIT=12
    STRING=13
    WS=14

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.1")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class EquationsContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def equation(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(SolidWorksEquationsParser.EquationContext)
            else:
                return self.getTypedRuleContext(SolidWorksEquationsParser.EquationContext,i)


        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_equations

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterEquations" ):
                listener.enterEquations(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitEquations" ):
                listener.exitEquations(self)




    def equations(self):

        localctx = SolidWorksEquationsParser.EquationsContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_equations)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 11 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 10
                self.equation()
                self.state = 13 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==13):
                    break

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class EquationContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def variableDeclaration(self):
            return self.getTypedRuleContext(SolidWorksEquationsParser.VariableDeclarationContext,0)


        def propertyAssignment(self):
            return self.getTypedRuleContext(SolidWorksEquationsParser.PropertyAssignmentContext,0)


        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_equation

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterEquation" ):
                listener.enterEquation(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitEquation" ):
                listener.exitEquation(self)




    def equation(self):

        localctx = SolidWorksEquationsParser.EquationContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_equation)
        try:
            self.state = 17
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,1,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 15
                self.variableDeclaration()
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 16
                self.propertyAssignment()
                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class VariableDeclarationContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def STRING(self):
            return self.getToken(SolidWorksEquationsParser.STRING, 0)

        def expression(self):
            return self.getTypedRuleContext(SolidWorksEquationsParser.ExpressionContext,0)


        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_variableDeclaration

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterVariableDeclaration" ):
                listener.enterVariableDeclaration(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitVariableDeclaration" ):
                listener.exitVariableDeclaration(self)




    def variableDeclaration(self):

        localctx = SolidWorksEquationsParser.VariableDeclarationContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_variableDeclaration)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 19
            self.match(SolidWorksEquationsParser.STRING)
            self.state = 20
            self.match(SolidWorksEquationsParser.T__0)
            self.state = 21
            self.expression(0)
            self.state = 22
            self.match(SolidWorksEquationsParser.T__1)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class PropertyAssignmentContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def STRING(self, i:int=None):
            if i is None:
                return self.getTokens(SolidWorksEquationsParser.STRING)
            else:
                return self.getToken(SolidWorksEquationsParser.STRING, i)

        def expression(self):
            return self.getTypedRuleContext(SolidWorksEquationsParser.ExpressionContext,0)


        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_propertyAssignment

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterPropertyAssignment" ):
                listener.enterPropertyAssignment(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitPropertyAssignment" ):
                listener.exitPropertyAssignment(self)




    def propertyAssignment(self):

        localctx = SolidWorksEquationsParser.PropertyAssignmentContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_propertyAssignment)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 24
            self.match(SolidWorksEquationsParser.STRING)
            self.state = 25
            self.match(SolidWorksEquationsParser.T__2)
            self.state = 26
            self.match(SolidWorksEquationsParser.STRING)
            self.state = 27
            self.match(SolidWorksEquationsParser.T__0)
            self.state = 28
            self.expression(0)
            self.state = 29
            self.match(SolidWorksEquationsParser.T__1)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExpressionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser
            self.op = None # Token

        def ID(self):
            return self.getToken(SolidWorksEquationsParser.ID, 0)

        def NUMBER(self):
            return self.getToken(SolidWorksEquationsParser.NUMBER, 0)

        def STRING(self):
            return self.getToken(SolidWorksEquationsParser.STRING, 0)

        def expression(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(SolidWorksEquationsParser.ExpressionContext)
            else:
                return self.getTypedRuleContext(SolidWorksEquationsParser.ExpressionContext,i)


        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_expression

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterExpression" ):
                listener.enterExpression(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitExpression" ):
                listener.exitExpression(self)



    def expression(self, _p:int=0):
        _parentctx = self._ctx
        _parentState = self.state
        localctx = SolidWorksEquationsParser.ExpressionContext(self, self._ctx, _parentState)
        _prevctx = localctx
        _startState = 8
        self.enterRecursionRule(localctx, 8, self.RULE_expression, _p)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 39
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [10]:
                self.state = 32
                self.match(SolidWorksEquationsParser.ID)
                pass
            elif token in [11]:
                self.state = 33
                self.match(SolidWorksEquationsParser.NUMBER)
                pass
            elif token in [13]:
                self.state = 34
                self.match(SolidWorksEquationsParser.STRING)
                pass
            elif token in [4]:
                self.state = 35
                self.match(SolidWorksEquationsParser.T__3)
                self.state = 36
                self.expression(0)
                self.state = 37
                self.match(SolidWorksEquationsParser.T__4)
                pass
            else:
                raise NoViableAltException(self)

            self._ctx.stop = self._input.LT(-1)
            self.state = 46
            self._errHandler.sync(self)
            _alt = self._interp.adaptivePredict(self._input,3,self._ctx)
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt==1:
                    if self._parseListeners is not None:
                        self.triggerExitRuleEvent()
                    _prevctx = localctx
                    localctx = SolidWorksEquationsParser.ExpressionContext(self, _parentctx, _parentState)
                    self.pushNewRecursionContext(localctx, _startState, self.RULE_expression)
                    self.state = 41
                    if not self.precpred(self._ctx, 1):
                        from antlr4.error.Errors import FailedPredicateException
                        raise FailedPredicateException(self, "self.precpred(self._ctx, 1)")
                    self.state = 42
                    localctx.op = self._input.LT(1)
                    _la = self._input.LA(1)
                    if not((((_la) & ~0x3f) == 0 and ((1 << _la) & 960) != 0)):
                        localctx.op = self._errHandler.recoverInline(self)
                    else:
                        self._errHandler.reportMatch(self)
                        self.consume()
                    self.state = 43
                    self.expression(2) 
                self.state = 48
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,3,self._ctx)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.unrollRecursionContexts(_parentctx)
        return localctx



    def sempred(self, localctx:RuleContext, ruleIndex:int, predIndex:int):
        if self._predicates == None:
            self._predicates = dict()
        self._predicates[4] = self.expression_sempred
        pred = self._predicates.get(ruleIndex, None)
        if pred is None:
            raise Exception("No predicate with index:" + str(ruleIndex))
        else:
            return pred(localctx, predIndex)

    def expression_sempred(self, localctx:ExpressionContext, predIndex:int):
            if predIndex == 0:
                return self.precpred(self._ctx, 1)
         




