import * as ws from 'ws';
import * as fs from 'fs';

import ecstatic from 'ecstatic';
import { Server as HttpServer, createServer as createHttpServer } from "http";
import { Server as HttpsServer, createServer as createHttpsServer } from "https";
import { initSocket } from './chat-backend';


export class ServerBuilder {
  private webServer = false;
  private socketServer = false;
  private ssl = false;

  constructor(
    private appRoot: string
  ) { }

  public withSsl() {
    this.ssl = true;
    return this;
  }

  public withWebServer() {
    this.webServer = true;
    return this;
  }

  public withSocketServer() {
    this.socketServer = true;
    return this;
  }

  public build() {
    let server: HttpServer | HttpsServer;

    if(this.ssl) {
      console.log('Creating https server');
      server = createHttpsServer({
        key: fs.readFileSync(this.appRoot + 'key.pem'),
        cert: fs.readFileSync(this.appRoot + 'cert.pem')
      });
    } else {
      console.log('Creating http server');
      server = createHttpServer();
    }

    if(this.webServer ) {
      this.createWebServer(server);
    }

    if(this.socketServer) {
      this.createSocketServer(server);
    }

    return server;
  }

  private createWebServer(server: HttpServer | HttpsServer) {
    console.log('Creating webserver');
    const options = {
      root: this.appRoot + 'frontend/DoChat',
      showDir: false
    };

    server.on('request', ecstatic(options));
  }

  private createSocketServer(server: HttpServer|HttpsServer) {
    console.log('creating socket server')
    const socketServer = new ws.Server({
      server: server
    });
  
    socketServer.on('connection', (socket, request) => {
      initSocket(<any>socket);
    });
  }
}