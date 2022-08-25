// server defaults
import express from 'express'
const app = express();
import path from 'path'

import * as actionsController from './actions.mjs'
import * as authController from './auth.mjs'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILDPATH = path.join(__dirname, 'client')
app.use(express.json());
app.use(express.static(BUILDPATH));

app.post('/proxy/query', authController.isAuthenticated, actionsController.execMongoQuery)

app.get("*",(req, res) => {
    return res.json({ error: true, message: "Path not found." })
});

app.listen(8000, () => {
    console.log('🚀 Client Running on: http://localhost:8000');
});