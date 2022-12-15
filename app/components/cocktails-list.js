import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CocktailsListComponent extends Component {
  @service('cocktail-data') cocktailData;

}
