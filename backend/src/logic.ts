import * as WebSocket from 'ws';

export interface BaseMessage {
    sender: string,
    payload: string,
    sendTime: Date,
    version: 'v1'
}

interface UserMessage extends BaseMessage {
    senderName: string
}

export interface TextMessage extends UserMessage {
    type: 'text'
}

export interface AudioMessage extends UserMessage {
    type: 'audio'
}

export interface AdministrativeMessage extends BaseMessage {
    type: 'administrative',
    payload: AdministrativeCommand
}

export type AdministrativeCommand = 'reset';

export type Message = TextMessage | AudioMessage | AdministrativeMessage;


let sockets: WebSocket[] = [];
let history: string[] = [];

export function initSocket(newSocket: WebSocket) {
    sockets.push(newSocket);
    sendHistory(newSocket);

    (<any>newSocket).on('message', messageHandler);

    newSocket.on('close', () => {
        sockets = sockets.filter(elem => elem !== newSocket);
    });

    newSocket.on('error', () => {
        sockets = sockets.filter(elem => elem !== newSocket);
    });
}

function messageHandler(this: WebSocket, data: WebSocket.Data){
    const message = JSON.parse(data as string) as Message;
    if(message.payload.trim() === '') {
        return;
    }

    history.push(<string>data);
    sockets.forEach(socket => {
        if(socket.readyState === this.OPEN){
            socket.send(data);
        }
    });
}

function sendHistory(socket: WebSocket) {
    for(const historyItem of history) {
        socket.send(historyItem);
    }
}