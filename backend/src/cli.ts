import { ServerBuilder } from "./server";


const server = new ServerBuilder('')
                .withSocketServer()
                .build();

server.listen(2604);