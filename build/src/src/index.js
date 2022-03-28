"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = __importDefault(require("firebase-functions"));
// The Firebase Admin SDK to access Firestore.
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp();
firebase_functions_1.default.https.onRequest(async (req, res) => {
    res.json({ title: 'hello world' });
});
