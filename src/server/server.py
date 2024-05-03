import os
from pygls.server import LanguageServer
from lsprotocol.types import (
    InitializeResult,
    InitializeParams,
    ServerCapabilities,
    TextDocumentSyncKind,
    TEXT_DOCUMENT_DID_OPEN,
    INITIALIZE,
    TEXT_DOCUMENT_DID_CHANGE,
)
from pygls.protocol import LanguageServerProtocol, lsp_method
import pickle

from analytics import audit_document
from utils import ensure_serializable


class SWLanguageServer(LanguageServer):

    def initialize(self, params: InitializeParams) -> InitializeResult:
        return InitializeResult(
            capabilities=ServerCapabilities(
                text_document_sync=TextDocumentSyncKind.Incremental,
                # Add other capabilities here
            )
        )

    def send_variable_evaluations(self, uri, variable_evaluations):
        self.send_notification(
            "$/variableEvaluations",
            {"uri": uri, "variableEvaluations": variable_evaluations},
        )


ls = SWLanguageServer(name="pygls-sample", version="0.1.0")


@ls.feature(TEXT_DOCUMENT_DID_OPEN)
def did_open(ls, params):
    ls.show_message_log("Document did open.")
    # Pickle the params object
    # pickle.dump(params, open("./common_data/lsp/params_open.pkl", "wb"))
    # Audit the document
    audit_report = audit_document(params)
    audit_report = ensure_serializable(audit_report)

    ls.send_variable_evaluations(params.text_document.uri, audit_report["node_values"])


@ls.feature(TEXT_DOCUMENT_DID_CHANGE)
def did_change(ls, params):
    ls.show_message_log("Document did change.")
    # pickle.dump(params, open("./common_data/lsp/params_change.pkl", "wb"))
    # Audit the document
    audit_report = audit_document(params)
    audit_report = ensure_serializable(audit_report)

    ls.send_variable_evaluations(params.text_document.uri, audit_report["node_values"])


def start_server():
    if os.getenv("ENV") == "development":
        ls.start_tcp(host="127.0.0.1", port=5000)
    else:
        ls.start_io()


if __name__ == "__main__":
    start_server()
