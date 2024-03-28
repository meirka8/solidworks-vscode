# Generated from SolidWorksEquations.g4 by ANTLR 4.13.1
from antlr4 import *
if "." in __name__:
    from .SolidWorksEquationsParser import SolidWorksEquationsParser
else:
    from SolidWorksEquationsParser import SolidWorksEquationsParser

# This class defines a complete listener for a parse tree produced by SolidWorksEquationsParser.
class SolidWorksEquationsListener(ParseTreeListener):

    # Enter a parse tree produced by SolidWorksEquationsParser#equations.
    def enterEquations(self, ctx:SolidWorksEquationsParser.EquationsContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#equations.
    def exitEquations(self, ctx:SolidWorksEquationsParser.EquationsContext):
        pass


    # Enter a parse tree produced by SolidWorksEquationsParser#equation.
    def enterEquation(self, ctx:SolidWorksEquationsParser.EquationContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#equation.
    def exitEquation(self, ctx:SolidWorksEquationsParser.EquationContext):
        pass


    # Enter a parse tree produced by SolidWorksEquationsParser#variableDeclaration.
    def enterVariableDeclaration(self, ctx:SolidWorksEquationsParser.VariableDeclarationContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#variableDeclaration.
    def exitVariableDeclaration(self, ctx:SolidWorksEquationsParser.VariableDeclarationContext):
        pass


    # Enter a parse tree produced by SolidWorksEquationsParser#propertyAssignment.
    def enterPropertyAssignment(self, ctx:SolidWorksEquationsParser.PropertyAssignmentContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#propertyAssignment.
    def exitPropertyAssignment(self, ctx:SolidWorksEquationsParser.PropertyAssignmentContext):
        pass


    # Enter a parse tree produced by SolidWorksEquationsParser#expression.
    def enterExpression(self, ctx:SolidWorksEquationsParser.ExpressionContext):
        pass

    # Exit a parse tree produced by SolidWorksEquationsParser#expression.
    def exitExpression(self, ctx:SolidWorksEquationsParser.ExpressionContext):
        pass



del SolidWorksEquationsParser