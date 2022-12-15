import { module, test } from 'qunit';
import { setupRenderingTest } from 'and-ember-hack/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders default header text', async function (assert) {
    await render(hbs`<Header />`);
    assert.dom(this.element).containsText('12 Days of Christmas Cocktails');
  });

  test('it renders default toggle label value', async function (assert) {
    await render(hbs`<Header />`);
    assert.dom(this.element).containsText('Show Mocktails');
  });
});
