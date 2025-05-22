import axiosInstance from "../../../shared/lib/axiosInstance";

export default class ThemeApi {
  static async getAllThemes() {
    const response = await axiosInstance.get("/theme/themes"); // ("/theme") разобраться с роутами на сервере
    return response;
  }

//   static async getThemeById(id) {
//     const response = await axiosInstance.get(`/themes/${id}`);
//     return response;
//   }

}
