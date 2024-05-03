import networkx as nx
from server.graph.grammar_to_value import dependency_to_value, grammar_to_dependency
from enum import Enum


class ErrorCode(Enum):
    UNKNOWN_ERROR = 0
    UNDEFINED_VARIABLES = 1
    # Add more error codes as needed


def evaluate_document(G: nx.DiGraph):
    issues_list = []
    try:
        nodes_without_expression = [
            node for node in G.nodes if "expression" not in G.nodes[node]
        ]
        if nodes_without_expression:
            issues_list.append(
                {
                    "error": ErrorCode.UNDEFINED_VARIABLES.value,
                    "variables": nodes_without_expression,
                }
            )
            return G, issues_list
        G_evaluated = dependency_to_value(G)
    except Exception as e:
        issues_list.append({"error": ErrorCode.UNKNOWN_ERROR.value, "message": str(e)})
        G_evaluated = G
    return G_evaluated, issues_list


def get_document_evaluation(G: nx.DiGraph):
    node_values = {node: G.nodes[node] for node in G.nodes}
    return node_values


def audit_document(params):
    data = params.text_document.text
    G = grammar_to_dependency(data)
    G, issues_list = evaluate_document(G)
    node_values = get_document_evaluation(G)
    return {
        "node_values": node_values,
        "issues_list": issues_list,
    }
