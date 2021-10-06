"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const client_1 = require("./client");
const hash_1 = require("./hash");
const PORT = 3001;
const wsServer = new ws_1.default.Server({ port: PORT }, () => {
    console.log(`ws server started on port: ${PORT}`);
});
const CLIENT_MAP = {};
wsServer.on('connection', (wsClient) => {
    const client = new client_1.MyClient((0, hash_1.hash)(40), wsClient);
    CLIENT_MAP[client.id] = client;
    let interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const s = yield client.send(JSON.stringify({
            action: 'PING',
            data: (0, hash_1.hash)(2),
            clientId: client.id,
        }));
        if (!s) {
            clearInterval(interval);
            client.close();
            delete CLIENT_MAP[client.id];
        }
    }), 5000);
});
//# sourceMappingURL=index.js.map