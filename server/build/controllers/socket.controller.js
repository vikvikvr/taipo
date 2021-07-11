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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = exports.results = exports.games = void 0;
var Game_1 = require("../game/Game");
var lodash_1 = require("lodash");
var Sentence_1 = require("../models/Sentence");
var GameResult_1 = require("../models/GameResult");
var __1 = require("..");
// stores in memory current active games
exports.games = [];
// stores in memory single-player game results
exports.results = [];
// stores in memory not-yet-started games (vs. random opponent)
var lobby = [];
var handleConnection = function (socket) {
    // bind socket events coming from client to handlers
    socket.on('disconnect', onDisconnect);
    socket.on('codeRequest', onCodeRequest);
    socket.on('joinRoom', onJoinRoom);
    socket.on('requestSnapshot', onRequestSnapshot);
    socket.on('keyPressed', onKeyPressed);
    socket.on('enterLobby', onEnterLobby);
    socket.on('leaveLobby', onLeaveLobby);
    socket.on('playAlone', onPlayAlone);
    socket.on('leaveRoom', onLeaveRoom);
    // <ClientEvent> handlers
    function onDisconnect() {
        removeGame('lobby');
        var game = removeGame('games');
        removeGameCleanup(game);
    }
    function onLeaveRoom() {
        var game = removeGame('games');
        removeGameCleanup(game);
    }
    function onPlayAlone(playerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var game, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, createGame(playerInfo)];
                    case 1:
                        game = _a.sent();
                        exports.games.push(game);
                        socket.join(game.id);
                        startGame(game, 1);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        // probably also need to notify the client, in the future
                        __1.debug && console.log('failed to create solo game', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function onEnterLobby(playerInfo) {
        if (lobby.length > 0) {
            startLobbyGame(playerInfo);
        }
        else {
            createLobbygame(playerInfo);
        }
    }
    function onLeaveLobby() {
        removeGame('lobby');
    }
    function onCodeRequest(playerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var game, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, createGame(playerInfo)];
                    case 1:
                        game = _a.sent();
                        exports.games.push(game);
                        socket.join(game.id);
                        socket.emit('joinedRoom', game.id);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        __1.debug && console.log('failed to create game from code request', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function onJoinRoom(roomId, playerInfo) {
        socket.join(roomId);
        var game = lodash_1.find(exports.games, { id: roomId });
        if (game) {
            game.addPlayer(socket.id, playerInfo);
            broadcastEvent('joinedRoom', game.id, game.id);
            startGame(game, 2);
        }
    }
    function onRequestSnapshot(roomId) {
        var game = lodash_1.find(exports.games, { id: roomId });
        if (game) {
            socket.emit('gameSnapshot', game);
        }
    }
    function onKeyPressed(letter, roomId) {
        var game = lodash_1.find(exports.games, { id: roomId });
        if (!game || !game.started) {
            return;
        }
        var outcome = game.processLetter(letter, socket.id);
        switch (outcome) {
            case 'still-waiting':
                return;
            case 'wrong':
                handleWrongKey(game);
                break;
            case 'game-over':
                handleGameOver(game);
                break;
            case 'correct':
                socket.emit('correctKey');
                break;
        }
        broadcastEvent('gameSnapshot', roomId, game);
    }
    // helper functions
    function handleWrongKey(game) {
        broadcastEvent('wrongKey', game.id, socket.id);
        setTimeout(function () {
            broadcastEvent('canContinue', game.id, socket.id);
        }, game.mistakeBlockDuration);
    }
    function handleGameOver(game) {
        broadcastEvent('gameOver', game.id);
        var ix = lodash_1.findIndex(exports.games, { id: game.id });
        exports.games.splice(ix, 1);
        __1.debug && console.log(game.id + " > game ended ");
        saveGameResult(game);
    }
    function createGame(playerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var roomCode, sentences, game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roomCode = createRandomId();
                        return [4 /*yield*/, Sentence_1.Sentence.find()];
                    case 1:
                        sentences = _a.sent();
                        game = new Game_1.Game(roomCode, sentences);
                        game.addPlayer(socket.id, playerInfo);
                        return [2 /*return*/, game];
                }
            });
        });
    }
    function broadcastEvent(event, roomId) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        socket.emit.apply(socket, __spreadArray([event], args));
        (_a = socket.to(roomId)).emit.apply(_a, __spreadArray([event], args));
    }
    function startGame(game, minPlayers) {
        if (game.players.length === minPlayers) {
            var startDelay = 3000;
            game.startedAt = Date.now() + startDelay;
            broadcastEvent('startingSoon', game.id, game.id);
            setTimeout(function () {
                game.start();
                broadcastEvent('gameSnapshot', game.id, game);
            }, startDelay);
        }
        else {
            __1.debug && console.log('not enough players to start a game', minPlayers);
        }
    }
    function removeGameCleanup(game) {
        if (!game) {
            return;
        }
        saveGameResult(game);
        broadcastEvent('gameOver', game.id);
    }
    function createLobbygame(playerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var game, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, createGame(playerInfo)];
                    case 1:
                        game = _a.sent();
                        socket.join(game.id);
                        lobby.push(game);
                        __1.debug && console.log(game.id + " > game added to lobby");
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        __1.debug && console.log('failed to create lobby game', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function startLobbyGame(playerInfo) {
        var game = lobby.pop();
        if (!game) {
            __1.debug && console.log('failed to start game because lobby was empty');
            return;
        }
        // prevent from playing with myself
        if (socket.id === game.players[0].socketId) {
            return;
        }
        socket.join(game.id);
        game.addPlayer(socket.id, playerInfo);
        exports.games.push(game);
        setTimeout(function () {
            broadcastEvent('joinedRoom', game.id, game.id);
            startGame(game, 2);
        }, 1500);
    }
    function removeGame(from) {
        var collection = from === 'lobby' ? lobby : exports.games;
        for (var i = 0; i < collection.length; i++) {
            var players = collection[i].players;
            var hasPlayer = lodash_1.find(players, { socketId: socket.id });
            if (hasPlayer) {
                var gameIndex = i;
                var game = collection[gameIndex];
                __1.debug && console.log(game.id + " > remove game");
                collection.splice(gameIndex, 1);
                return game;
            }
        }
        return null;
    }
    function saveGameResult(game) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = GameResult_1.gameResultFromGame(game);
                        // save single player results only in memory
                        if (game.players.length < 2) {
                            exports.results.push(result);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, GameResult_1.GameResult.create(result)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        __1.debug && console.log('failed to save game result to database', error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
exports.handleConnection = handleConnection;
// Probably needs a more robust method, but MVP calls 😊
function createRandomId() {
    var randomNumber = Math.floor(Math.random() * Math.pow(10, 10));
    return randomNumber.toString(16).toUpperCase();
}
