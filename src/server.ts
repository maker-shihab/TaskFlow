import { Server } from "http";
import mongoose from "mongoose";
import config from "./config";

let server: Server;

async function bootstrap() {
  await mongoose.connect(config.database_url as string);
}

bootstrap();
