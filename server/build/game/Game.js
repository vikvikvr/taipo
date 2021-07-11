"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var lodash_1 = require("lodash");
var __1 = require("..");
var Game = /** @class */ (function () {
    function Game(id, sentences) {
        var _this = this;
        this.players = [];
        this.startedAt = 0;
        this.started = false;
        this.typos = [];
        this.mistakeBlockDuration = 500;
        this.id = id;
        // pick random sentence
        var randomIndex = Math.floor(Math.random() * sentences.length);
        var wrongSentence = sentences[randomIndex].withMistakes;
        var rightSentence = sentences[randomIndex].correct;
        this.sentence = wrongSentence;
        // populate typos indexes
        this.sentence.split('').forEach(function (wrongChar, i) {
            if (wrongChar !== rightSentence[i]) {
                _this.typos.push(i);
            }
        });
    }
    Game.prototype.start = function () {
        this.started = true;
    };
    Game.prototype.removePlayer = function (socketId) {
        this.players = this.players.filter(function (p) { return p.socketId !== socketId; });
    };
    Game.prototype.addPlayer = function (socketId, playerInfo) {
        __1.debug &&
            console.log(this.id + " > add player | " + (playerInfo.email || socketId));
        this.players.push(__assign({ letterIndex: 0, lastMistakeAt: -Infinity, socketId: socketId, mistakesCount: 0 }, playerInfo));
    };
    // called every time a player types a letter
    Game.prototype.processLetter = function (letter, socketId) {
        letter = letter.toLowerCase();
        var player = lodash_1.find(this.players, { socketId: socketId });
        if (!player) {
            // TODO: handle error better
            throw new Error('could not find player in this game');
        }
        var timeDiff = Date.now() - player.lastMistakeAt;
        if (timeDiff < this.mistakeBlockDuration) {
            return 'still-waiting';
        }
        var isValid = letter === this.sentence[player.letterIndex];
        if (!isValid) {
            player.mistakesCount++;
            player.lastMistakeAt = Date.now();
            return 'wrong';
        }
        var moreLetters = player.letterIndex < this.sentence.length - 1;
        if (moreLetters) {
            player.letterIndex++;
            return 'correct';
        }
        return 'game-over';
    };
    return Game;
}());
exports.Game = Game;
