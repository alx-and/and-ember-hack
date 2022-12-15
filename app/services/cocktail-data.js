import Service from '@ember/service';
import cocktailApiUtil from '../utils/cocktail-api';
import pickPropertiesUtil from '../utils/pick-properties';

const imgLinks = [
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131584/and-ember-hack/door-1_kojvjh.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131584/and-ember-hack/door-2_eo5al1.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131584/and-ember-hack/door-3_ir8hok.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131584/and-ember-hack/door-4_mtz6wu.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131584/and-ember-hack/door-5_f6w6vt.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131584/and-ember-hack/door-6_nejpen.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131585/and-ember-hack/door-7_q8tw43.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131585/and-ember-hack/door-8_sfzuuu.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131585/and-ember-hack/door-9_c7xazp.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131585/and-ember-hack/door-10_eldtlz.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131585/and-ember-hack/door-11_mdios2.png',
  'https://res.cloudinary.com/dwur5dw76/image/upload/v1671131585/and-ember-hack/door-12_r7xbyo.png',
];

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
      pickedProperties.imagePath = imgLinks[index];
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
