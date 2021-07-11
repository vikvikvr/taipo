"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var __1 = require("..");
// database configuration
dotenv_1.default.config();
var url = process.env.DB_CONNECTION_URL;
var databaseName = process.env.DB_NAME;
var uri = url + "/" + databaseName;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// connect to database
function callback(error) {
    if (error) {
        __1.debug && console.log('failed to connect to database 😟', error);
    }
    else {
        __1.debug && console.log('connected to database 👍');
    }
}
mongoose_1.default.connect(uri, options, callback);
exports.default = mongoose_1.default;
