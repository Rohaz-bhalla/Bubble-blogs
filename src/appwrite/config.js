import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPost(slug) {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    }

    async createPost(data) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            ID.unique(),
            data
        );
    }

    async updatePost(id, data) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            id,
            data
        );
    }

    async uploadFile(file) {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    }

    async deleteFile(fileId) {
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        );
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;
