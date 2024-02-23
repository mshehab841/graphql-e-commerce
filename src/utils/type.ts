import { IncomingMessage, ServerResponse } from "http"

export interface context {
    res : ServerResponse<IncomingMessage>
    req : IncomingMessage
}