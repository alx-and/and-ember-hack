import EmberObject from '@ember/object';

export default class extends EmberObject {
  static properties = {
    idDrink: 'id',
    strDrink: 'name',
    strAlternative: 'alternative',
    strTags: 'tags',
    strCategory: 'category',
    strIBA: 'iba',
    strAlcoholic: 'type',
    strGlass: 'glass',
    strInstructions: 'instructions',
    strDrinkThumb: 'thumbnail',
    strIngredient1: null,
    strImageSource: 'imageSource',
    strImageAttribution: 'imageAttribution',
  };

  static ingredientProperty = 'strIngredient';
  static measureProperty = 'strMeasure';

  static pickProperties(data) {
    const propertyReducer = (acc, [propKey, altName]) => {
      // handle the ingredient / measure properties - can be from 1 .. 15
      if (propKey === `${this.ingredientProperty}1`) {
        for (let i = 1; i <= 15; i++) {
          if (
            data[`${this.ingredientProperty}${i}`] &&
            data[`${this.ingredientProperty}${i}`].length > 0
          ) {
            acc.ingredients = [
              ...acc.ingredients,
              {
                ingredient: data[`${this.ingredientProperty}${i}`],
                measure: data[`${this.measureProperty}${i}`],
              },
            ];
          }
        }
      } else {
        acc[altName] = data[propKey];
      }
      return acc;
    };

    const pickedProperties = Object.entries(this.properties).reduce(
      propertyReducer,
      {
        ingredients: [],
      }
    );

    return pickedProperties;
  }
}
