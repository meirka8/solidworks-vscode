import networkx as nx


def basic_properties_check(G):

    is_dag = nx.is_directed_acyclic_graph(G)

    # list of nodes without an 'expression' property
    missing_expression = [node for node in G.nodes if "expression" not in G.nodes[node]]

    return {
        "is_dag": is_dag,
        "missing_expression": missing_expression,
    }
