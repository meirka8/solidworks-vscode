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
        4,1,11,35,2,0,7,0,2,1,7,1,2,2,7,2,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,3,1,19,8,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,27,8,1,
        10,1,12,1,30,9,1,1,2,1,2,1,2,1,2,0,1,2,3,0,2,4,0,2,1,0,4,5,1,0,6,
        7,36,0,6,1,0,0,0,2,18,1,0,0,0,4,31,1,0,0,0,6,7,5,10,0,0,7,8,5,3,
        0,0,8,9,3,2,1,0,9,1,1,0,0,0,10,11,6,1,-1,0,11,12,5,1,0,0,12,13,3,
        2,1,0,13,14,5,2,0,0,14,19,1,0,0,0,15,19,3,4,2,0,16,19,5,10,0,0,17,
        19,5,8,0,0,18,10,1,0,0,0,18,15,1,0,0,0,18,16,1,0,0,0,18,17,1,0,0,
        0,19,28,1,0,0,0,20,21,10,6,0,0,21,22,7,0,0,0,22,27,3,2,1,7,23,24,
        10,5,0,0,24,25,7,1,0,0,25,27,3,2,1,6,26,20,1,0,0,0,26,23,1,0,0,0,
        27,30,1,0,0,0,28,26,1,0,0,0,28,29,1,0,0,0,29,3,1,0,0,0,30,28,1,0,
        0,0,31,32,5,8,0,0,32,33,5,9,0,0,33,5,1,0,0,0,3,18,26,28
    ]

class SolidWorksEquationsParser ( Parser ):

    grammarFileName = "SolidWorksEquations.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'('", "')'", "'='", "'*'", "'/'", "'+'", 
                     "'-'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "EQUALS", "MULTIPLY", 
                      "DIVIDE", "ADD", "SUBTRACT", "NUMBER", "UNIT", "VARIABLE", 
                      "WS" ]

    RULE_variableDefinition = 0
    RULE_expression = 1
    RULE_measurement = 2

    ruleNames =  [ "variableDefinition", "expression", "measurement" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    EQUALS=3
    MULTIPLY=4
    DIVIDE=5
    ADD=6
    SUBTRACT=7
    NUMBER=8
    UNIT=9
    VARIABLE=10
    WS=11

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.1")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class VariableDefinitionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def VARIABLE(self):
            return self.getToken(SolidWorksEquationsParser.VARIABLE, 0)

        def EQUALS(self):
            return self.getToken(SolidWorksEquationsParser.EQUALS, 0)

        def expression(self):
            return self.getTypedRuleContext(SolidWorksEquationsParser.ExpressionContext,0)


        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_variableDefinition

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterVariableDefinition" ):
                listener.enterVariableDefinition(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitVariableDefinition" ):
                listener.exitVariableDefinition(self)




    def variableDefinition(self):

        localctx = SolidWorksEquationsParser.VariableDefinitionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_variableDefinition)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 6
            self.match(SolidWorksEquationsParser.VARIABLE)
            self.state = 7
            self.match(SolidWorksEquationsParser.EQUALS)
            self.state = 8
            self.expression(0)
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

        def expression(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(SolidWorksEquationsParser.ExpressionContext)
            else:
                return self.getTypedRuleContext(SolidWorksEquationsParser.ExpressionContext,i)


        def measurement(self):
            return self.getTypedRuleContext(SolidWorksEquationsParser.MeasurementContext,0)


        def VARIABLE(self):
            return self.getToken(SolidWorksEquationsParser.VARIABLE, 0)

        def NUMBER(self):
            return self.getToken(SolidWorksEquationsParser.NUMBER, 0)

        def MULTIPLY(self):
            return self.getToken(SolidWorksEquationsParser.MULTIPLY, 0)

        def DIVIDE(self):
            return self.getToken(SolidWorksEquationsParser.DIVIDE, 0)

        def ADD(self):
            return self.getToken(SolidWorksEquationsParser.ADD, 0)

        def SUBTRACT(self):
            return self.getToken(SolidWorksEquationsParser.SUBTRACT, 0)

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
        _startState = 2
        self.enterRecursionRule(localctx, 2, self.RULE_expression, _p)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 18
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,0,self._ctx)
            if la_ == 1:
                self.state = 11
                self.match(SolidWorksEquationsParser.T__0)
                self.state = 12
                self.expression(0)
                self.state = 13
                self.match(SolidWorksEquationsParser.T__1)
                pass

            elif la_ == 2:
                self.state = 15
                self.measurement()
                pass

            elif la_ == 3:
                self.state = 16
                self.match(SolidWorksEquationsParser.VARIABLE)
                pass

            elif la_ == 4:
                self.state = 17
                self.match(SolidWorksEquationsParser.NUMBER)
                pass


            self._ctx.stop = self._input.LT(-1)
            self.state = 28
            self._errHandler.sync(self)
            _alt = self._interp.adaptivePredict(self._input,2,self._ctx)
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt==1:
                    if self._parseListeners is not None:
                        self.triggerExitRuleEvent()
                    _prevctx = localctx
                    self.state = 26
                    self._errHandler.sync(self)
                    la_ = self._interp.adaptivePredict(self._input,1,self._ctx)
                    if la_ == 1:
                        localctx = SolidWorksEquationsParser.ExpressionContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expression)
                        self.state = 20
                        if not self.precpred(self._ctx, 6):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 6)")
                        self.state = 21
                        localctx.op = self._input.LT(1)
                        _la = self._input.LA(1)
                        if not(_la==4 or _la==5):
                            localctx.op = self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 22
                        self.expression(7)
                        pass

                    elif la_ == 2:
                        localctx = SolidWorksEquationsParser.ExpressionContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expression)
                        self.state = 23
                        if not self.precpred(self._ctx, 5):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 5)")
                        self.state = 24
                        localctx.op = self._input.LT(1)
                        _la = self._input.LA(1)
                        if not(_la==6 or _la==7):
                            localctx.op = self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 25
                        self.expression(6)
                        pass

             
                self.state = 30
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,2,self._ctx)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.unrollRecursionContexts(_parentctx)
        return localctx


    class MeasurementContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NUMBER(self):
            return self.getToken(SolidWorksEquationsParser.NUMBER, 0)

        def UNIT(self):
            return self.getToken(SolidWorksEquationsParser.UNIT, 0)

        def getRuleIndex(self):
            return SolidWorksEquationsParser.RULE_measurement

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterMeasurement" ):
                listener.enterMeasurement(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitMeasurement" ):
                listener.exitMeasurement(self)




    def measurement(self):

        localctx = SolidWorksEquationsParser.MeasurementContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_measurement)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 31
            self.match(SolidWorksEquationsParser.NUMBER)
            self.state = 32
            self.match(SolidWorksEquationsParser.UNIT)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx



    def sempred(self, localctx:RuleContext, ruleIndex:int, predIndex:int):
        if self._predicates == None:
            self._predicates = dict()
        self._predicates[1] = self.expression_sempred
        pred = self._predicates.get(ruleIndex, None)
        if pred is None:
            raise Exception("No predicate with index:" + str(ruleIndex))
        else:
            return pred(localctx, predIndex)

    def expression_sempred(self, localctx:ExpressionContext, predIndex:int):
            if predIndex == 0:
                return self.precpred(self._ctx, 6)
         

            if predIndex == 1:
                return self.precpred(self._ctx, 5)
         




