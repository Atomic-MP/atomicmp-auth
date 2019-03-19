require("dotenv").config();

import app from "./app";
import { logger } from "./services";
const PORT = process.env.PORT || 3005;

const server = app.listen(PORT, () => {
  logger.info("Ready on " + PORT);
});

process.on("SIGINT", () => {
  logger.info("Caught SIGINT, bye...");
  server.close();
  /* eslint-disable-next-line no-process-exit */
  process.exit(0);
});
