import "./config/environment";
import express from "express";
import cors from "cors";

import { sequelize } from "./config/database";

import route from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

const { PORT = 3300 } = process.env;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    sequelize.authenticate();
});
