var test = require('tape');
var sliceIntoLevels = require('../slice-into-levels');
var reconstitute = require('../reconstitute');

var testCases = [
  {
    object: {
      countries: {
        USA: {
          states: {
            IL: {},
            MA: {
              cities: {
                Somerville: {
                  streets: ['Elm', 'Highland']
                }
              }
            }
          }
        },
        Canada: {
          provinces: {
            Alberta: {
              cities: {
                Edmonton: {}
              }
            }
          }
        }
      }
    },
    expected: [
      [{ value: {}, parentIndex: -1 }],
      [{ value: {}, key: 'countries', parentIndex: 0 }],
      [
        { value: {}, key: 'USA', parentIndex: 0 },
        { value: {}, key: 'Canada', parentIndex: 0 }
      ],
      [
        { value: {}, key: 'states', parentIndex: 0 },
        { value: {}, key: 'provinces', parentIndex: 1 }
      ],
      [
        { value: {}, key: 'IL', parentIndex: 0 },
        { value: {}, key: 'MA', parentIndex: 0 },
        { value: {}, key: 'Alberta', parentIndex: 1 }
      ],
      [
        { value: {}, key: 'cities', parentIndex: 1 },
        { value: {}, key: 'cities', parentIndex: 2 }
      ],
      [
        { value: {}, key: 'Somerville', parentIndex: 0 },
        { value: {}, key: 'Edmonton', parentIndex: 1 }
      ],
      [{ value: [], key: 'streets', parentIndex: 0 }],
      [
        { value: 'Elm', arrayIndex: 0, parentIndex: 0 },
        { value: 'Highland', arrayIndex: 1, parentIndex: 0 }
      ]
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Slice and form test', sliceAndFormTest);

  function sliceAndFormTest(t) {
    var levels = sliceIntoLevels(testCase.object);
    console.log('levels:', JSON.stringify(levels, null, 2));
    t.deepEqual(
      levels,
      testCase.expected,
      'Object is sliced into levels correctly.'
    );

    var hierarchy = reconstitute(levels);
    console.log('hierarchy:', JSON.stringify(hierarchy, null, 2));
    t.deepEqual(
      hierarchy,
      testCase.object,
      'Object is reconstituted from levels correctly.'
    );

    t.end();
  }
}
