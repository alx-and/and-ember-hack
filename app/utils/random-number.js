import EmberObject from '@ember/object';

export default class extends EmberObject {
  static min = 1;

  static getRandomNumber(max) {
    const delta = max - this.min;
    const randomNumber = Math.floor(Math.random() * delta) + this.min;
    return randomNumber;
  }
}
