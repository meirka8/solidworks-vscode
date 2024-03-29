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


class SWLanguageServer(LanguageServer):

    def initialize(self, params: InitializeParams) -> InitializeResult:
        return InitializeResult(
            capabilities=ServerCapabilities(
                text_document_sync=TextDocumentSyncKind.Incremental,
                # Add other capabilities here
            )
        )


ls = SWLanguageServer(name="pygls-sample", version="0.1.0")


@ls.feature(TEXT_DOCUMENT_DID_OPEN)
def did_open(ls, params):
    # Pickle the params object
    pickle.dump(params, open("./common_data/lsp/params_open.pkl", "wb"))
    ls.show_message_log("Document did open.")


@ls.feature(TEXT_DOCUMENT_DID_CHANGE)
def did_change(ls, params):
    pickle.dump(params, open("./common_data/lsp/params_change.pkl", "wb"))
    ls.show_message_log("Document did change.")


def start_server():
    if os.getenv("ENV") == "development":
        ls.start_tcp(host="127.0.0.1", port=5000)
    else:
        ls.start_io()


start_server()
