import * as ws from 'ws';

import {initSocket, reset} from './chat-backend';

let server: ws.Server | null;

export function startServer() {
    server = new ws.Server({
        port: 8080
    });

    server.on('connection', (socket, request) => {
        initSocket(<any>socket);
    });
}

export function stopServer() {
    if(!server){
        return;
    }

    reset();
    server.close();
    server.removeAllListeners();
    server = null;
}