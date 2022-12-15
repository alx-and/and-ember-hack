import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service('cocktail-data') cocktailData;

  async model() {
    const alcoholOptions = await this.cocktailData.getAlcoholicOptions();
    const nonAlcoholOptions = await this.cocktailData.getNonAlcoholicOptions();

    console.log({ alcoholOptions });
    console.log({ nonAlcoholOptions });

    return {
      get allAlcoholicDrinks() {
        return alcoholOptions;
      },
    };
  }
}
