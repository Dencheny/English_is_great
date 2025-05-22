import axiosInstance from "../../../shared/lib/axiosInstance";

export default class ThemeApi {
  static async getAllThemes() {
    console.log('test')
    const response = await axiosInstance.get("/theme/themes"); // ("/theme") разобраться с роутами на сервере
    console.log('после запроса')
    return response;
  }

//   static async getThemeById(id) {
//     const response = await axiosInstance.get(`/themes/${id}`);
//     return response;
//   }

}
