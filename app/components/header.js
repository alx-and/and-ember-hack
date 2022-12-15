import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeaderComponent extends Component {
  @tracked typeOfCocktail = 'Mocktails';
  @tracked isAlcoholic = true;

  @action
  handleChange({ target }) {
    const toggled = target.checked;
    this.typeOfCocktail = toggled ? 'Cocktails' : 'Mocktails';
    this.isAlcoholic = !this.isAlcoholic;
  }
}
