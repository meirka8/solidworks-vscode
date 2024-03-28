from pygls.server import LanguageServer

from lsprotocol.types import TEXT_DOCUMENT_DID_OPEN
from lsprotocol.types import TEXT_DOCUMENT_DID_CHANGE

ls = LanguageServer(
    name="pygls-sample",
    version="0.1.0",
)


@ls.feature(TEXT_DOCUMENT_DID_OPEN)
def did_open(ls, params):
    ls.show_message_log("Document did open.")


@ls.feature(TEXT_DOCUMENT_DID_CHANGE)
def did_change(ls, params):
    ls.show_message_log("Document did change.")


def start_server():
    ls.start_io()


start_server()
