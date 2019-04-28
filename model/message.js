"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUserMessage(message) {
    return message.type === 'text' || message.type === 'audio';
}
exports.isUserMessage = isUserMessage;
function isAdministrativeMessage(message) {
    return message.type === 'administrative';
}
exports.isAdministrativeMessage = isAdministrativeMessage;
function isHistoryMessage(message) {
    return isAdministrativeMessage(message) && message.command === 'history';
}
exports.isHistoryMessage = isHistoryMessage;
