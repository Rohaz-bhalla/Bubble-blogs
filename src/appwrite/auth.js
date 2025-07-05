import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // ✅ Create new account and auto-login (only if not logged in already)
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      const currentUser = await this.getCurrentUser();

      if (!currentUser) {
        return this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      console.error("AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  // ✅ Login user (check if already logged in)
  async login({ email, password }) {
    try {
      const currentUser = await this.getCurrentUser();

      if (!currentUser) {
        return await this.account.createEmailPasswordSession(email, password);
      }

      console.warn("User already logged in.");
      return currentUser;
    } catch (error) {
      console.error("AuthService :: login :: error", error);
      throw error;
    }
  }

  // ✅ Get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
