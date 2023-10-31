// ApiManager.js
import axios from "axios";

class MyApiManager {
  constructor() {
    this.baseURL = "http://192.168.1.16:4000";
    this.instance = axios.create({
      baseURL: this.baseURL,
      responseType: "json",
      timeout: 5000,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MyApiManager();
    }
    return this.instance;
  }
}

export default MyApiManager;
