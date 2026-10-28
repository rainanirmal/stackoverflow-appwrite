import {Permission} from "node-appwrite";
import { databases } from "./config";
import {db, commentsCollection} from "../name";

export default async function createCommentCollection() {

    await databases.createCollection(db, commentsCollection, commentsCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")  
    ]);

    console.log("Comment collection created successfully");

    await Promise.all([
        databases.createStringAttribute(db, commentsCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentsCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, commentsCollection, "typeId", 50, false),
        databases.createStringAttribute(db, commentsCollection, "authorId", 50, true),
    ]);

    console.log("Comment collection attributes created successfully");
}