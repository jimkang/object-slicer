var test = require('tape');
var sliceIntoLevels = require('../slice-into-levels');
var reconstitute = require('../reconstitute');

const coyoteSymbol = Symbol('coyote');
const fishSymbol = Symbol('fish');
const amphibianSymbol = Symbol('amphibian');

var testCases = [
  {
    name: 'Small object with symbols',
    object: {
      [coyoteSymbol]: { kind: 'dog' },
      dolphinKinds: [fishSymbol, 'animal', amphibianSymbol]
    },
    expectedLevels: [
      [{ value: {}, parentIndex: -1 }],
      [
        { value: [], parentIndex: 0, key: 'dolphinKinds' },
        { value: {}, parentIndex: 0, key: coyoteSymbol }
      ],
      [
        { value: fishSymbol, parentIndex: 0, arrayIndex: 0 },
        { value: 'animal', parentIndex: 0, arrayIndex: 1 },
        { value: amphibianSymbol, parentIndex: 0, arrayIndex: 2 },
        { value: 'dog', parentIndex: 1, key: 'kind' }
      ]
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, sliceAndFormTest);

  function sliceAndFormTest(t) {
    var levels = sliceIntoLevels(testCase.object);
    //console.log('levels:', JSON.stringify(levels, null, 2));
    t.deepEqual(
      levels,
      testCase.expectedLevels,
      'Object is correctly sliced into levels.'
    );

    var hierarchy = reconstitute(levels);
    //console.log('hierarchy:', JSON.stringify(hierarchy, null, 2));
    t.deepEqual(
      hierarchy,
      testCase.object,
      'Object is reconstituted from levels correctly.'
    );

    t.end();
  }
}
