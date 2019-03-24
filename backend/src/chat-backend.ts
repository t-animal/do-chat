import * as WebSocket from 'ws';

import { Message, UserMessage } from '@model/message';

let sockets: WebSocket[] = [];
let history: string[] = [];

export function reset() {
    sockets.forEach(socket => socket.close());
    sockets = [];
    history = [];
    console.log('Chat backend has been reset');
}

export function initSocket(newSocket: WebSocket) {
    console.log('New connection from frontend');
    sockets.push(newSocket);
    sendHistory(newSocket);

    (<any>newSocket).on('message', messageHandler);

    newSocket.on('close', (socket: WebSocket, code: number, reason: string) => {
        console.log('Lost connection to a frontend', code, reason);
        sockets = sockets.filter(elem => elem !== newSocket);
    });

    newSocket.on('error', (socket: WebSocket, error: Error) => {
        console.error('Lost connection to a frontend', error);
        sockets = sockets.filter(elem => elem !== newSocket);
    });
}

function messageHandler(this: WebSocket, data: WebSocket.Data){
    const message = JSON.parse(data as string) as Message;
    if(message.payload.trim() === '') {
        return;
    }

    console.log(`${message.sendTime} -- ${message.hasOwnProperty('senderName')? (<UserMessage>message).senderName:'---'} (${message.sender}): ${message.payload.substring(0, 20).trim()}`)

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