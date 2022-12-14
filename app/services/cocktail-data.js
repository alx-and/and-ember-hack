import Service from '@ember/service';
import cocktailApiUtil from '../utils/cocktail-api';
import randomNumberUtil from '../utils/random-number';

export default class CocktailDataService extends Service {
  alcoholicOptions = null;
  nonAlcoholicOptions = null;

  async getRandomDrinkOptions(drinkOptions) {
    const amountOfOptions = drinkOptions.length;

    const randomDrinkOptions = await Array(12)
      .fill(null)
      .reduce(async (acc) => {
        const randomNumber = randomNumberUtil.getRandomNumber(amountOfOptions);
        const randomDrink = drinkOptions[randomNumber - 1];

        const drinkInfo = await cocktailApiUtil.getCocktailById(
          randomDrink.idDrink
        );

        (await acc).push(drinkInfo);
        return acc;
      }, []);

    return await randomDrinkOptions;
  }

  async getAlcoholicOptions() {
    if (!this.alcoholicOptions) {
      const allOptions = await cocktailApiUtil.getAllAlcoholicCocktails();
      const randomDrinkOptions = await this.getRandomDrinkOptions(allOptions);

      this.alcoholicOptions = randomDrinkOptions;
    }
    return this.alcoholicOptions;
  }

  async getNonAlcoholicOptions() {
    if (!this.nonAlcoholicOptions) {
      const allOptions = await cocktailApiUtil.getAllNonAlcoholicCocktails();
      const randomDrinkOptions = await this.getRandomDrinkOptions(allOptions);

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
}
