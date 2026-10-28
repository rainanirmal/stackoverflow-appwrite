import {Permission} from "node-appwrite";
import { databases } from "./config";
import {db, votesCollection} from "../name";

export default async function createVoteCollection() {

    await databases.createCollection(db, votesCollection, votesCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);

    console.log("Vote collection created successfully");

    await Promise.all([
        databases.createEnumAttribute(db, votesCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, votesCollection, "typeId", 50, true),
        databases.createEnumAttribute(db, votesCollection, "voteStatus", ["upvote", "downvote"], true),
        databases.createStringAttribute(db, votesCollection, "votedById", 50, true),
    ]);

    console.log("Vote collection attributes created successfully");
}