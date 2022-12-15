import Service from '@ember/service';
import cocktailApiUtil from '../utils/cocktail-api';
import pickPropertiesUtil from '../utils/pick-properties';

export default class CocktailDataService extends Service {
  alcoholicOptions = null;
  nonAlcoholicOptions = null;
  safeAlcoholOptions = [
    11026, 178325, 11387, 178345, 11602, 12402, 11390, 13807, 17212, 17197,
    11658, 12089,
  ];

  async getDrinkOptions(drinkData, type) {
    let options = drinkData.slice(12, 24);

    if (type === 'Alcoholic') {
      options = this.safeAlcoholOptions.map((item) => {
        return {
          idDrink: item,
        };
      });
    }

    const drinkOptions = await options.reduce(async (acc, item, index) => {
      const drinkInfo = await cocktailApiUtil.getCocktailById(item.idDrink);
      const pickedProperties = pickPropertiesUtil.pickProperties(drinkInfo);
      pickedProperties.imagePath = `door-${index + 1}.png`;
      (await acc).push(pickedProperties);
      return acc;
    }, []);

    return await drinkOptions;
  }

  async getAlcoholicOptions() {
    if (!this.alcoholicOptions) {
      const allOptions = await cocktailApiUtil.getAllAlcoholicCocktails();
      const randomDrinkOptions = await this.getDrinkOptions(
        allOptions,
        'Alcoholic'
      );

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
