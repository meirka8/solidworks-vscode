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
        4,1,11,45,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,1,0,5,0,10,8,0,10,0,12,
        0,13,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
        3,2,29,8,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,37,8,2,10,2,12,2,40,9,2,1,
        3,1,3,1,3,1,3,0,1,4,4,0,2,4,6,0,2,1,0,4,5,1,0,6,7,46,0,11,1,0,0,
        0,2,16,1,0,0,0,4,28,1,0,0,0,6,41,1,0,0,0,8,10,3,2,1,0,9,8,1,0,0,
        0,10,13,1,0,0,0,11,9,1,0,0,0,11,12,1,0,0,0,12,14,1,0,0,0,13,11,1,
        0,0,0,14,15,5,0,0,1,15,1,1,0,0,0,16,17,5,10,0,0,17,18,5,3,0,0,18,
        19,3,4,2,0,19,3,1,0,0,0,20,21,6,2,-1,0,21,22,5,1,0,0,22,23,3,4,2,
        0,23,24,5,2,0,0,24,29,1,0,0,0,25,29,3,6,3,0,26,29,5,10,0,0,27,29,
        5,8,0,0,28,20,1,0,0,0,28,25,1,0,0,0,28,26,1,0,0,0,28,27,1,0,0,0,
        29,38,1,0,0,0,30,31,10,6,0,0,31,32,7,0,0,0,32,37,3,4,2,7,33,34,10,
        5,0,0,34,35,7,1,0,0,35,37,3,4,2,6,36,30,1,0,0,0,36,33,1,0,0,0,37,
        40,1,0,0,0,38,36,1,0,0,0,38,39,1,0,0,0,39,5,1,0,0,0,40,38,1,0,0,
        0,41,42,5,8,0,0,42,43,5,9,0,0,43,7,1,0,0,0,4,11,28,36,38
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

    RULE_equations = 0
    RULE_variableDefinition = 1
    RULE_expression = 2
    RULE_measurement = 3

    ruleNames =  [ "equations", "variableDefinition", "expression", "measurement" ]

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




    class EquationsContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def EOF(self):
            return self.getToken(SolidWorksEquationsParser.EOF, 0)

        def variableDefinition(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(SolidWorksEquationsParser.VariableDefinitionContext)
            else:
                return self.getTypedRuleContext(SolidWorksEquationsParser.VariableDefinitionContext,i)


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
            while _la==10:
                self.state = 8
                self.variableDefinition()
                self.state = 13
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 14
            self.match(SolidWorksEquationsParser.EOF)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


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
        self.enterRule(localctx, 2, self.RULE_variableDefinition)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 16
            self.match(SolidWorksEquationsParser.VARIABLE)
            self.state = 17
            self.match(SolidWorksEquationsParser.EQUALS)
            self.state = 18
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
        _startState = 4
        self.enterRecursionRule(localctx, 4, self.RULE_expression, _p)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 28
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,1,self._ctx)
            if la_ == 1:
                self.state = 21
                self.match(SolidWorksEquationsParser.T__0)
                self.state = 22
                self.expression(0)
                self.state = 23
                self.match(SolidWorksEquationsParser.T__1)
                pass

            elif la_ == 2:
                self.state = 25
                self.measurement()
                pass

            elif la_ == 3:
                self.state = 26
                self.match(SolidWorksEquationsParser.VARIABLE)
                pass

            elif la_ == 4:
                self.state = 27
                self.match(SolidWorksEquationsParser.NUMBER)
                pass


            self._ctx.stop = self._input.LT(-1)
            self.state = 38
            self._errHandler.sync(self)
            _alt = self._interp.adaptivePredict(self._input,3,self._ctx)
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt==1:
                    if self._parseListeners is not None:
                        self.triggerExitRuleEvent()
                    _prevctx = localctx
                    self.state = 36
                    self._errHandler.sync(self)
                    la_ = self._interp.adaptivePredict(self._input,2,self._ctx)
                    if la_ == 1:
                        localctx = SolidWorksEquationsParser.ExpressionContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expression)
                        self.state = 30
                        if not self.precpred(self._ctx, 6):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 6)")
                        self.state = 31
                        localctx.op = self._input.LT(1)
                        _la = self._input.LA(1)
                        if not(_la==4 or _la==5):
                            localctx.op = self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 32
                        self.expression(7)
                        pass

                    elif la_ == 2:
                        localctx = SolidWorksEquationsParser.ExpressionContext(self, _parentctx, _parentState)
                        self.pushNewRecursionContext(localctx, _startState, self.RULE_expression)
                        self.state = 33
                        if not self.precpred(self._ctx, 5):
                            from antlr4.error.Errors import FailedPredicateException
                            raise FailedPredicateException(self, "self.precpred(self._ctx, 5)")
                        self.state = 34
                        localctx.op = self._input.LT(1)
                        _la = self._input.LA(1)
                        if not(_la==6 or _la==7):
                            localctx.op = self._errHandler.recoverInline(self)
                        else:
                            self._errHandler.reportMatch(self)
                            self.consume()
                        self.state = 35
                        self.expression(6)
                        pass

             
                self.state = 40
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,3,self._ctx)

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
        self.enterRule(localctx, 6, self.RULE_measurement)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 41
            self.match(SolidWorksEquationsParser.NUMBER)
            self.state = 42
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
        self._predicates[2] = self.expression_sempred
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
         




