# Generated from SolidWorksEquations.g4 by ANTLR 4.13.1
from antlr4 import *
if "." in __name__:
    from .SolidWorksEquationsParser import SolidWorksEquationsParser
else:
    from SolidWorksEquationsParser import SolidWorksEquationsParser

# This class defines a complete listener for a parse tree produced by SolidWorksEquationsParser.
class SolidWorksEquationsListener(ParseTreeListener):

    # Enter a parse tree produced by SolidWorksEquationsParser#variableDefinition.
    def enterVariableDefinition(self, ctx:SolidWorksEquationsParser.VariableDefinitionContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#variableDefinition.
    def exitVariableDefinition(self, ctx:SolidWorksEquationsParser.VariableDefinitionContext):
        pass


    # Enter a parse tree produced by SolidWorksEquationsParser#expression.
    def enterExpression(self, ctx:SolidWorksEquationsParser.ExpressionContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#expression.
    def exitExpression(self, ctx:SolidWorksEquationsParser.ExpressionContext):
        pass


    # Enter a parse tree produced by SolidWorksEquationsParser#measurement.
    def enterMeasurement(self, ctx:SolidWorksEquationsParser.MeasurementContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#measurement.
    def exitMeasurement(self, ctx:SolidWorksEquationsParser.MeasurementContext):
        pass



del SolidWorksEquationsParser