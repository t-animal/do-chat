import { createServer, Options } from "http-server";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";

let server:  HttpServer | HttpsServer | null = null;

export function startWebServer() {
    if(server !== null) {
        return;
    }

    const options: Options = {
        root: 'bin/frontend/DoChat',
        showDir: true
    };

    server = createServer(options);
    server.listen(8081);
    server.address

}

export function stopWebServer(){
    if(server === null) {
        return;
    }

    server.close();
    server = null;
}