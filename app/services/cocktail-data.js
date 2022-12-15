import Service from '@ember/service';
import cocktailApiUtil from '../utils/cocktail-api';
import pickPropertiesUtil from '../utils/pick-properties';

export default class CocktailDataService extends Service {
  alcoholicOptions = null;
  nonAlcoholicOptions = null;

  async getDrinkOptions(drinkData) {
    const options = drinkData.slice(12, 24);

    const drinkOptions = await options.reduce(async (acc, item, index) => {
      const drinkInfo = await cocktailApiUtil.getCocktailById(item.idDrink);
      const pickedProperties = pickPropertiesUtil.pickProperties(drinkInfo);
      pickedProperties.imagePath = `images/door-${index + 1}.png`;
      (await acc).push(pickedProperties);
      return acc;
    }, []);

    return await drinkOptions;
  }

  async getAlcoholicOptions() {
    if (!this.alcoholicOptions) {
      const allOptions = await cocktailApiUtil.getAllAlcoholicCocktails();
      const randomDrinkOptions = await this.getDrinkOptions(allOptions);

      this.alcoholicOptions = randomDrinkOptions;
    }
    return this.alcoholicOptions;
  }

  async getNonAlcoholicOptions() {
    if (!this.nonAlcoholicOptions) {
      const allOptions = await cocktailApiUtil.getAllNonAlcoholicCocktails();
      const randomDrinkOptions = await this.getDrinkOptions(allOptions);

      this.nonAlcoholicOptions = randomDrinkOptions;
    }
    return this.nonAlcoholicOptions;
  }

  getDrinkByTypeAndId(type, id) {
    const matchingIdPredicate = (el) => el.idDrink === id;
    if (type === 'Alcoholic') {
      const drink = this.alcoholicOptions.find(matchingIdPredicate);
      return drink;
    } else {
      const drink = this.nonAlcoholicOptions.find(matchingIdPredicate);
      return drink;
    }
  }

  get allAlcoholicDrinks() {
    return this.alcoholicOptions;
  }
}
