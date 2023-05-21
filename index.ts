import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());

dotenv.config();

export const api = functions.https.onRequest(app);
