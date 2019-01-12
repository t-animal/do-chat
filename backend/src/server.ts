import * as ws from 'ws';

import {initSocket} from './logic';

const server = new ws.Server({
    port: 8080
});

server.on('connection', (socket, request) => {
    initSocket(<any>socket);
});