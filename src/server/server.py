from pygls.server import LanguageServer
from lsprotocol.types import TEXT_DOCUMENT_DID_CHANGE

import re

ls = LanguageServer( name='pygls-example', version='0.0.1' )

@ls.feature(TEXT_DOCUMENT_DID_CHANGE)
async def on_text_document_did_change(ls, params):
    document = ls.workspace.get_document(params.textDocument.uri)
    content = document.source
    variableRegex = r'"[a-zA-Z]\w*"'
    variables = re.findall(variableRegex, content)
    print(f"Updated variables: {variables}")
    # Do something with the updated variables list

if __name__ == '__main__':
    ls.start_io()
