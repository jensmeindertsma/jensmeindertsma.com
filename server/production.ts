import express from "express";
import compression from "compression";
import morgan from "morgan";

const BUILD_PATH = "../build/server/index.js";
const PORT = Number.parseInt(process.env.PORT || "3000");

console.info("[PRODUCTION] Starting server ...");

const app = express();

app.use(compression());
app.use(morgan("tiny"));

app.disable("x-powered-by");

app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
);

app.use(express.static("build/client"));

console.info("[PRODUCTION] Loading application build output ...");

app.use(await import(BUILD_PATH).then((mod) => mod.app));

app.listen(PORT, () => {
  console.info(`[PRODUCTION] Listening on http://localhost:${PORT}`);
});
