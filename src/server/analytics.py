import networkx as nx
from graph.grammar_to_value import dependency_to_value, grammar_to_dependency
from enum import Enum
from lsprotocol.types import Diagnostic, DiagnosticSeverity, Position, Range


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
            for node in nodes_without_expression:
                for _, dependant in G.out_edges(node):
                    usage_location = G[node][dependant]["location"]
                    issues_list.append(
                        {
                            "error": ErrorCode.UNDEFINED_VARIABLES.value,
                            "diagnostic": Diagnostic(
                                range=Range(
                                    start=Position(
                                        line=usage_location["start"]["line"] - 1,
                                        character=usage_location["start"]["column"] - 1,
                                    ),
                                    end=Position(
                                        line=usage_location["end"]["line"] - 1,
                                        character=usage_location["end"]["column"] - 1,
                                    ),
                                ),
                                message=f"Variable {node} has not been defined.",
                                severity=DiagnosticSeverity.Error,
                            ),
                        }
                    )
        if issues_list:
            return G, issues_list
        G_evaluated = dependency_to_value(G)
    except Exception as e:
        issues_list.append({"error": ErrorCode.UNKNOWN_ERROR.value, "message": str(e)})
        G_evaluated = G
    return G_evaluated, issues_list


def get_document_evaluation(G: nx.DiGraph):
    node_values = {node: G.nodes[node] for node in G.nodes}
    return node_values


def audit_document(text_document: str):
    G = grammar_to_dependency(text_document)
    G, issues_list = evaluate_document(G)
    diagnostics_list = [
        issue["diagnostic"] for issue in issues_list if "diagnostic" in issue
    ]
    node_values = get_document_evaluation(G)
    return {
        "node_values": node_values,
        "issues_list": issues_list,
        "diagnostics_list": diagnostics_list,
    }
