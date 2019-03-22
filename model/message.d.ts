export interface BaseMessage {
    sender: string;
    payload: string;
    sendTime: Date;
    version: 'v1';
}
export interface UserMessage extends BaseMessage {
    senderName: string;
}
export interface TextMessage extends UserMessage {
    type: 'text';
}
export interface AudioMessage extends UserMessage {
    type: 'audio';
}
export interface AdministrativeMessage extends BaseMessage {
    type: 'administrative';
    payload: AdministrativeCommand;
}
export declare type AdministrativeCommand = 'reset';
export declare type Message = TextMessage | AudioMessage | AdministrativeMessage;
