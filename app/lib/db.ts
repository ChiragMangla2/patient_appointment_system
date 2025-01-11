import { MongoClient } from "mongodb";

export const connectionStr = `mongodb://0.0.0.0:27017/`;

const client = new MongoClient(connectionStr);
export const clientPromise = client.connect();