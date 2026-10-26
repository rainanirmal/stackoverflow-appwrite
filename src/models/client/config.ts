import env from '@/src/app/env';
import { Client, Account, Avatars, Storage, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId);

const account = new Account(client);

const databases = new Databases(client); 

const avatars = new Avatars(client);

const storage = new Storage(client);

export { client, account, databases, avatars, storage };