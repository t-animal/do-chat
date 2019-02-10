interface BaseMessage {
    sender: string,
    payload: string,
    version: 'v1'
}

interface TextMessage extends BaseMessage {
    type: 'text'
}

interface AudioMessage extends BaseMessage {
    type: 'audio'
}

type Message = TextMessage | AudioMessage;