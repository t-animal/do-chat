import * as WebSocket from 'ws';

const sockets: WebSocket[] = [];

export function initSocket(newSocket: WebSocket) {
    sockets.push(newSocket);

    (<any>newSocket).on('message', messageHandler);
    // newSocket.on('close')
}

function messageHandler(this: WebSocket, data: WebSocket.Data){
    sockets.forEach(socket => socket.send(data));
}
