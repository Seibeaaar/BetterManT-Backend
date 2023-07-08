import "./src/firebase";
import * as functions from "firebase-functions";
import * as express from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import users from "./src/routes/users";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());

app.use("/users", users);

dotenv.config();

export const api = functions.https.onRequest(app);
