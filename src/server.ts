import {config as dotenv} from "dotenv";
dotenv();

import App from "./app";
import { logger } from "./services";
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3005;

const server = new App();

server.listen(PORT);

process.on("SIGINT", () => {
  logger.info("Sutting down");
  /* eslint-disable-next-line no-process-exit */
  process.exit(0);
});
