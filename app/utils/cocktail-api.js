import EmberObject from '@ember/object';

export default class extends EmberObject {
  static baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  static async fetchData(endpoint) {
    const data = await fetch(`${this.baseUrl}${endpoint}`);
    const res = await data.json();
    return res;
  }

  static async getAllAlcoholicCocktails() {
    const { drinks } = await this.fetchData('filter.php?a=Alcoholic');
    return drinks?.length > 0 ? drinks : [];
  }

  static async getAllNonAlcoholicCocktails() {
    const { drinks } = await this.fetchData('filter.php?a=Non_Alcoholic');
    return drinks?.length > 0 ? drinks : [];
  }

  static async getCocktailById(id) {
    const { drinks } = await this.fetchData(`lookup.php?i=${id}`);
    return drinks?.[0] ?? [];
  }

  static async getRandomCocktail() {
    const { drinks } = await this.fetchData('random.php');
    return drinks?.[0] ?? [];
  }
}
