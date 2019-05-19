# DoChat

This is a simple chat system for the webbrowser. It supports voice messages 
and allows the download of chat and voice data. It is based on a central 
server.

**Its intended use is only for academic research on [behavior in chats][1].**

Also, it gave me the opportunity to try out stuff.

## Structure

* `DoChat/`: An Angular app as frontend
* `backend/`: A simple nodejs backend written in typescript. It can be built into
    a cli and packaged together with the frontend as an electron app. Then it
    serves as http server for the frontend, too.
* `model/`: A referenced typescript project containing the model to be shared across
   the different applications
* `DoChat.vue/`: A copy of the frontend with vue.js (as of writing this is WIP)

## License

I was "paid" with chocolate and wine for this, so I guess its choco-wine-ware? Anyway,
GPL v3 applies.

[1]: http://www.mp.uni-wuerzburg.de/personen/dorothea-adler-msc/publikationen-vortraege/

