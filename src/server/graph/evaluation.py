from pint import UndefinedUnitError, UnitRegistry

import networkx as nx


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
        expression = G.nodes[node]["expression"]
        dependencies = list(G.predecessors(node))
        for dep in dependencies:
            expression = expression.replace(dep, G.nodes[dep]["expression"])
        evaluation = try_evaluating_expression(expression, ureg)
        G.nodes[node]["evaluation"] = evaluation
    return G
