import networkx as nx
from server.grammar.SolidWorksEquationsListener import SolidWorksEquationsListener
from server.grammar.SolidWorksEquationsParser import SolidWorksEquationsParser


class VariableDependencyListener(SolidWorksEquationsListener):
    def __init__(self):
        self.G = nx.DiGraph()
        self.dependency_list = []

    def enterVariableDefinition(
        self, ctx: SolidWorksEquationsParser.VariableDefinitionContext
    ):
        variable = ctx.VARIABLE().getText()
        self.dependency_list = []
        location = {
            "start": {"line": ctx.start.line, "column": ctx.start.column},
            "end": {"line": ctx.stop.line, "column": ctx.stop.column},
        }
        self.G.add_node(
            variable,
            type="variable",
            expression=ctx.expression().getText(),
            location=location,
        )

    def enterExpression(self, ctx: SolidWorksEquationsParser.ExpressionContext):
        if ctx.VARIABLE():
            variable = ctx.VARIABLE().getText()
            self.dependency_list.append(variable)

    def exitVariableDefinition(
        self, ctx: SolidWorksEquationsParser.VariableDefinitionContext
    ):
        variable = ctx.VARIABLE().getText()
        for v in self.dependency_list:
            self.G.add_edge(v, variable)
