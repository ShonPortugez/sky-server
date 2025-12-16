import express from 'express'
import cors from 'cors'
import http from 'http'
import compression from 'compression'
import * as bodyParser from "body-parser";
import {registerRoutes} from "./routes";

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(bodyParser.json());

// Register Routes
registerRoutes(app);

const server = http.createServer(app);

server.listen(8080, () => {
    console.log(`Server listening on 8080`);
})