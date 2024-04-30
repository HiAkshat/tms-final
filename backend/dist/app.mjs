import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import connectToMongoDB from "./dao/mongodbConnect.mjs";
import organisationRouter from "./routes/organisationRoutes.mjs";
import organisationUserRouter from "./routes/organisationUserRoutes.mjs";
import systemUserRouter from "./routes/systemUserRoutes.mjs";
import ticketRouter from "./routes/ticketRouter.mjs";
// connect to MONGODB database
const MongoDB_Connection_String = "mongodb+srv://akshat:net123@tmscluster.ilzrhhb.mongodb.net/?retryWrites=true&w=majority&appName=TmsCluster";
try {
    await connectToMongoDB(MongoDB_Connection_String);
}
catch (e) {
    console.log("Error connecting to MongoDB: ", e);
}
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/api/organisation", organisationRouter);
app.use("/api/organisationUser", organisationUserRouter);
app.use("/api/systemUser", systemUserRouter);
app.use("/api/ticket", ticketRouter);
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
//# sourceMappingURL=app.mjs.map