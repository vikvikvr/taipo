"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var socket_controller_1 = require("./controllers/socket.controller");
var router_1 = __importDefault(require("./router"));
require("./models/database");
var app = express_1.default();
// server configuration
dotenv_1.default.config();
exports.debug = process.env.NODE_ENV === 'development';
var port = process.env.PORT || 3333;
var corsOptions = {
    cors: { origin: '*' }
};
// express middlewares
app.use(cors_1.default());
app.use(router_1.default);
// server bootstrap
function onServerStarted() {
    console.log('server started on port', port);
    var io = new socket_io_1.Server(httpServer, corsOptions);
    io.on('connection', socket_controller_1.handleConnection);
}
var httpServer = http_1.createServer(app);
httpServer.listen(port, onServerStarted);
