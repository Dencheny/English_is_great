import axiosInstance from "../../../shared/lib/axiosInstance";


export default class UserApi {
  static async signup(userData) {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response;
  }

  static async login(userData) {
    const response = await axiosInstance.post("/auth/login", userData);
    return response;
  }

  static async logout() {
    const response = await axiosInstance("/auth/logout");
    return response;
  }
}
