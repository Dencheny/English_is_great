import axiosInstance from '../../../shared/lib/axiosInstance';

export default class LearnWordApi {

  // все изученные слова юзера - конкретной темы

  static async getAllLearnWordsThemeByUser() {
    const response = await axiosInstance.get('/learnWord/progress');
    return response;
  }

  static async createLearnWord(id, wordData) {
    console.log(id, wordData)
    const response = await axiosInstance.post(
      `/learnWord/theme/${id}`,
      wordData
    );
    return response;
  }
}
