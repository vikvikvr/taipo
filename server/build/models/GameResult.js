"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameResult = exports.gameResultFromGame = void 0;
var database_1 = __importDefault(require("./database"));
// schemas
var playerResultSchema = new database_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    completionPercent: { type: Number, required: true },
    typosCount: { type: Number, required: true }
});
var gameResultSchema = new database_1.default.Schema({
    winnerResult: { type: playerResultSchema, required: true },
    loserResult: { type: playerResultSchema },
    gameId: { type: String, required: true }
});
// model
var GameResult = database_1.default.model('GameResult', gameResultSchema);
exports.GameResult = GameResult;
// helper functions
function makePlayerResult(player, sentenceLength) {
    return {
        name: player.name,
        completionPercent: (player.letterIndex / (sentenceLength - 1)) * 100,
        email: player.email,
        typosCount: player.mistakesCount,
        imageUrl: player.imageUrl
    };
}
function gameResultFromGame(game) {
    var _a;
    var winner = game.players[0];
    var loser = game.players[1];
    // distinguish winner from loser
    if (loser) {
        if (loser.letterIndex > winner.letterIndex) {
            _a = [loser, winner], winner = _a[0], loser = _a[1];
        }
    }
    var length = game.sentence.length;
    return {
        gameId: game.id,
        winnerResult: makePlayerResult(winner, length),
        loserResult: loser ? makePlayerResult(loser, length) : undefined
    };
}
exports.gameResultFromGame = gameResultFromGame;
