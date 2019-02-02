import * as WebSocket from 'ws';

interface Message {
    sender: string,
    text: string,
    version: 'v1'
}

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
    if(message.text.trim() === '') {
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