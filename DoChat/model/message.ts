export interface BaseMessage {
    sender: string,
    payload: string,
    sendTime: Date,
    version: 'v1'
}

export interface TextMessage extends BaseMessage {
    type: 'text'
}

export interface AudioMessage extends BaseMessage {
    type: 'audio'
}

export interface AdministrativeMessage extends BaseMessage {
    type: 'administrative',
    payload: AdministrativeCommand
}

export type AdministrativeCommand = 'reset';

export type Message = TextMessage | AudioMessage | AdministrativeMessage;