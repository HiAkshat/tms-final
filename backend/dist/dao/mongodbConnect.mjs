import mongoose from "mongoose";
export default async function connectToMongoDB(connectionString) {
    await mongoose.connect(connectionString);
    console.log("Connect to MongoDB Database!");
}
//# sourceMappingURL=mongodbConnect.mjs.map