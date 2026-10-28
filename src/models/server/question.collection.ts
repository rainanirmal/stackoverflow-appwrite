import { DatabasesIndexType, OrderBy, Permission, Role } from "node-appwrite";

import { databases } from "./config";
import {db, questionsCollection} from "../name";

export default async function createQuestionCollection() {

    // collection
    await databases.createCollection(db, questionsCollection, questionsCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ])

    console.log("Question collection created successfully");

    // attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db, questionsCollection, "title", 100, true),
        databases.createStringAttribute(db, questionsCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionsCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionsCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionsCollection, "attachmentId", 50, false),
    ])

    console.log("Question collection attributes created successfully");

    await Promise.all([
        databases.createIndex(db, questionsCollection, "title", DatabasesIndexType.Fulltext, ["title"], [OrderBy.Asc]),
        databases.createIndex(db, questionsCollection, "content", DatabasesIndexType.Fulltext, ["content"], [OrderBy.Asc]),
    ])
}