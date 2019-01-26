import * as WebSocket from 'ws';

let sockets: WebSocket[] = [];

export function initSocket(newSocket: WebSocket) {
    sockets.push(newSocket);

    (<any>newSocket).on('message', messageHandler);

    newSocket.on('close', () => {
        sockets = sockets.filter(elem => elem !== newSocket);
    });

    newSocket.on('error', () => {
        sockets = sockets.filter(elem => elem !== newSocket);
    });
}

function messageHandler(this: WebSocket, data: WebSocket.Data){
    sockets.forEach(socket => {
        if(socket.readyState === this.OPEN){
            socket.send(data);
        }
    });
}
