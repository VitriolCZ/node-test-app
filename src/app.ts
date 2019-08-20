import * as express from "express";
import { router } from "./routes";

const app = express();

app.use(router);

app.listen(3001, () => console.log("[SERVER] is up and running on 3001 ..."));

export { app };