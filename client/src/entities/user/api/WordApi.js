import axiosInstance from '../../../shared/lib/axiosInstance';

export default class WordApi {
  static async getAllWords() {
    const response = await axiosInstance.get('/word/progress');
    return response;
  }

  static async getAllWordsByUser() {
    const response = await axiosInstance.get('/word/myWords');
    return response;
  }

  static async getUnlearnedWordsByOneTheme(id) {
    const response = await axiosInstance.get(`/word/theme/${id}`);
    return response;
  }

  static async createWord(wordData) {
    const response = await axiosInstance.post('/word/createWord', wordData);
    return response;
  }

  static async updateWord(id, wordData) {
    const response = await axiosInstance.patch(
      `/word/edditWord/${id}`,
      wordData
    );
    return response;
  }

  static async deleteWord(id) {
    // передать id слова которое надо удалить в data
    console.log(id)
    const response = await axiosInstance.delete(`/word/myWord`, {
  data: { id }
});
    return response;
  }
}
