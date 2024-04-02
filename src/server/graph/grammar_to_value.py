from antlr4 import CommonTokenStream, InputStream, ParseTreeWalker
from server.grammar.SolidWorksEquationsLexer import SolidWorksEquationsLexer
from server.grammar.SolidWorksEquationsParser import SolidWorksEquationsParser
from server.grammar.SolidWorksEquationsListener import SolidWorksEquationsListener
from server.graph.dependency import VariableDependencyListener
from server.graph.evaluation import evaluate_expressions


def parse_grammar_tree(data: str):
    input_stream = InputStream(data)
    lexer = SolidWorksEquationsLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = SolidWorksEquationsParser(stream)
    tree = parser.equations()

    return tree


def grammar_to_dependency(data: str):
    tree = parse_grammar_tree(data)

    listener = VariableDependencyListener()
    walker = ParseTreeWalker()
    walker.walk(listener, tree)

    return listener.G


def dependency_to_value(G):
    G = evaluate_expressions(G)
    return G
