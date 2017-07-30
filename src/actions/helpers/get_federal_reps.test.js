import fetchMock from 'fetch-mock';

import {
  getFederalReps,
} from './get_federal_reps';

import {
  testReps
} from '../../test_helpers/test_reps';

describe('actions/helpers/get_federal_reps', () => {
  beforeEach(() => {
    fetchMock.mock(/.+\/api.+/g, { body: {
      results: testReps
    }});
  });

  afterEach(() => fetchMock.restore());

  test('getFederalReps returns JSON', () => {
    expect.assertions(1);
    return getFederalReps('ca', '15').then(res => {
      expect(res).toEqual(testReps);
    });
  });

});

