import config from "../config/config.js";
import { Client, Account, ID, Storage, Query, Databases } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ Title, slug, Content, featuredImage, Status, UserId }) {
    try {
      
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { Title, Content, featuredImage, Status, UserId }
      );
    } catch (error) {
      console.log('Appwrite serive :: createPost :: error',error);
      // throw error;

    }
  }
  async updatePost(slug, { Title, Content, featuredImage, Status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          Title,
          Content,
          featuredImage,
          Status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("Status", "Active")]) {
  
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error',error);
      throw error;
    }
  }

  async uploadFile(file) {
    console.log(file);
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }
  getFilePreview(fileId)
  {    
      return this.bucket.getFilePreview(config.appwriteBucketId,fileId);
   
  }
}

const service = new Service();
export default service;