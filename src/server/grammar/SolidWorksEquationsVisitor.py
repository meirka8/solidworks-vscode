# Generated from SolidWorksEquations.g4 by ANTLR 4.13.1
from antlr4 import *
if "." in __name__:
    from .SolidWorksEquationsParser import SolidWorksEquationsParser
else:
    from SolidWorksEquationsParser import SolidWorksEquationsParser

# This class defines a complete generic visitor for a parse tree produced by SolidWorksEquationsParser.

class SolidWorksEquationsVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by SolidWorksEquationsParser#equations.
    def visitEquations(self, ctx:SolidWorksEquationsParser.EquationsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by SolidWorksEquationsParser#variableDefinition.
    def visitVariableDefinition(self, ctx:SolidWorksEquationsParser.VariableDefinitionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by SolidWorksEquationsParser#expression.
    def visitExpression(self, ctx:SolidWorksEquationsParser.ExpressionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by SolidWorksEquationsParser#measurement.
    def visitMeasurement(self, ctx:SolidWorksEquationsParser.MeasurementContext):
        return self.visitChildren(ctx)



del SolidWorksEquationsParser