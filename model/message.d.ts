export interface BaseMessage {
    type: string;
    version: 'v1';
    payload: any;
}
export interface UserMessage extends BaseMessage {
    senderName: string;
    sender: string;
    payload: string;
    sendTime: Date;
}
export interface TextMessage extends UserMessage {
    type: 'text';
}
export interface AudioMessage extends UserMessage {
    type: 'audio';
}
export declare type AdministrativeCommand = 'reset' | 'history';
export declare type Message = TextMessage | AudioMessage | AdministrativeMessage;
export interface AdministrativeMessage extends BaseMessage {
    type: 'administrative';
    command: AdministrativeCommand;
}
export interface HistoryMessage extends AdministrativeMessage {
    command: AdministrativeCommand;
    payload: UserMessage[];
}
export declare function isUserMessage(message: any): message is UserMessage;
export declare function isAdministrativeMessage(message: any): message is AdministrativeMessage;
export declare function isHistoryMessage(message: any): message is HistoryMessage;
