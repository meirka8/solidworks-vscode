import networkx as nx


def basic_properties_check(G):

    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        "is_dag": is_dag,
    }
