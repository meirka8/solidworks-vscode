import os
import networkx as nx
from grammar.SolidWorksEquationsListener import SolidWorksEquationsListener
from grammar.SolidWorksEquationsParser import SolidWorksEquationsParser


class VariableDependencyListener(SolidWorksEquationsListener):
    def __init__(self):
        self.G = nx.DiGraph()
        self.dependency_list = []

    def enterVariableDefinition(
        self, ctx: SolidWorksEquationsParser.VariableDefinitionContext
    ):
        self.dependency_list = []
        location = self.getImmediateChildVariableLocation(ctx)
        self.G.add_node(
            self.getImmediateChildVariableName(ctx),
            type="variable",
            expression=ctx.expression().getText(),
            location=location,
        )

    def getImmediateChildVariableName(
        self, ctx: SolidWorksEquationsParser.ExpressionContext
    ):
        res = ctx.VARIABLE().getText()
        return res

    def getImmediateChildVariableLocation(
        self, ctx: SolidWorksEquationsParser.VariableDefinitionContext
    ):
        location = {
            "start": {"line": ctx.start.line, "column": ctx.start.column},
            "end": {
                "line": ctx.start.line,
                "column": ctx.start.column
                + len(self.getImmediateChildVariableName(ctx)),
            },
        }

        if os.getenv("ENV") == "development":
            print(
                f"{self.getImmediateChildVariableName(ctx)} ({len(self.getImmediateChildVariableName(ctx))}): {location['start']['line']}:{location['start']['column']} - {location['end']['line']}:{location['end']['column']}"
            )

        return location

    def enterExpression(self, ctx: SolidWorksEquationsParser.ExpressionContext):
        if ctx.VARIABLE():
            self.dependency_list.append(
                {
                    "variable": self.getImmediateChildVariableName(ctx),
                    "location": self.getImmediateChildVariableLocation(ctx),
                }
            )

    def exitVariableDefinition(
        self, ctx: SolidWorksEquationsParser.VariableDefinitionContext
    ):
        for v in self.dependency_list:
            self.G.add_edge(
                v["variable"],
                self.getImmediateChildVariableName(ctx),
                location=v["location"],
            )
