import express from 'express'
import cors from 'cors'
import http from 'http'
import compression from 'compression'
import * as bodyParser from "body-parser";
import {registerRoutes} from "./routes";
import {db} from "./database/dbContext";
import * as process from "node:process";

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(bodyParser.json());

// Register Routes
registerRoutes(app);

const server = http.createServer(app);
await db.init(process.env.DATABASE_URL)

server.listen(8080, () => {
    console.log(`Server listening on 8080`);
})