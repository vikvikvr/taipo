"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var games_controller_1 = require("./controllers/games.controller");
var router = express_1.default.Router();
// routes
router.get('/results/:gameId', games_controller_1.getResult);
exports.default = router;
