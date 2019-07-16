var test = require('tape');
var sliceIntoLevels = require('../slice-into-levels');

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
      [{ value: {} }],
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
      [
        { value: [], key: 'streets', parentIndex: 0 },
        { value: [], key: 'streets', parentIndex: 1 }
      ],
      [
        { value: 'Elm', index: 0, parentIndex: 0 },
        { value: 'Highland', index: 1, parentIndex: 0 }
      ]
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Slice test', sliceTest);

  function sliceTest(t) {
    var slices = sliceIntoLevels(testCase.object);
    t.deepEqual(
      slices,
      testCase.expected,
      'Object is sliced into level correctly.'
    );
    t.end();
  }
}
