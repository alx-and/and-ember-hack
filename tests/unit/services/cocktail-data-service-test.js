import { module, test } from 'qunit';
import { setupTest } from 'and-ember-hack/tests/helpers';

module('Unit | Service | cocktail-data-service', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:cocktail-data');
    assert.ok(service);
  });
});
