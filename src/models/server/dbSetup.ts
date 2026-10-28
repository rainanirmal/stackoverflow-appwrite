import {db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import {databases} from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log("Database already exists");
    } catch (error) {
        try {
           await databases.create(db, db); 
           console.log("Database created successfully");

           await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentCollection(),
            createVoteCollection()
           ]);

           console.log("All collections created successfully");
           console.log("Database setup completed successfully");
        } catch (error) {
            console.error("Error occurred while setting up database:", error);
        }
    }

    return databases;
}