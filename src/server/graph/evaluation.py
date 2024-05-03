from pint import UndefinedUnitError, UnitRegistry

import networkx as nx


class EvaluationError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def try_evaluating_expression(expression, ureg):
    try:
        result = ureg(expression)
        return result
    except UndefinedUnitError:
        return None
    except BaseException:
        return None


def evaluate_expressions(G):
    ureg = UnitRegistry()

    for node in nx.topological_sort(G):
        try:
            expression = G.nodes[node]["expression"]
        except KeyError:
            raise EvaluationError(f"Variable {node} has not been defined.")
        dependencies = list(G.predecessors(node))
        for dep in dependencies:
            expression = expression.replace(dep, str(G.nodes[dep]["evaluation"]))
        evaluation = try_evaluating_expression(expression, ureg)
        G.nodes[node]["evaluation"] = evaluation
    return G
