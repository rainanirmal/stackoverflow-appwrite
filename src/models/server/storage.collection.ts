import { Permission } from "node-appwrite";
import { storage } from "./config";
import { questionAttachmentsBucket } from "../name";

export default async function getOrcreateStorage() {

    try {
        await storage.getBucket(questionAttachmentsBucket);
        console.log("Storage connected successfully");

    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentsBucket, questionAttachmentsBucket, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users")
            ],
            false,
            undefined,
            undefined,
            ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]
        );

            console.log("Storage created successfully");
            console.log("Storage connected successfully");

        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}