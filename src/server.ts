import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
import mongoose from "mongoose";
import { server } from "./app";

//TCP
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((date) => {
    console.log("Connection successfully MongoDB ");
    const PORT = process.env.PORT ?? 3000;
    server.listen(PORT, function () {
      console.info(`The server is running successfully in ${PORT}`);
      console.info(
        `This website running in http://localhost:${PORT}/admin \n `
      );
    });
  })
  .catch((err) => console.log("Error on connection MongoDb", err));
