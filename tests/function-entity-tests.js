var test = require('tape');
var sliceIntoLevels = require('../slice-into-levels');
var reconstitute = require('../reconstitute');
var getAtPath = require('get-at-path');

var layoutDef = require('tablenest/tests/fixtures/layout-def');

var testCases = [
  {
    name: 'Small object with functions',
    object: {
      methodA: function methodA() {
        return 1;
      },
      otherFns: [
        function add(a, b) {
          return a + b;
        },
        function subtract(a, b) {
          return a - b;
        }
      ]
    },
    reconstitutedFnsToCall: [
      { path: ['methodA'], params: [], expectedResult: 1 },
      { path: ['otherFns', '0'], params: [2, 3], expectedResult: 5 },
      { path: ['otherFns', '1'], params: [4, 8], expectedResult: -4 }
    ]
  },

  {
    name: 'Layout def with functions',
    object: layoutDef,
    reconstitutedFnsToCall: [
      {
        path: ['typeMix', '0', '1', 'fn'],
        params: [{ size: 4, types: ['lard', 'olive oil'] }],
        expectedResult: ['lard', 'lard', 'lard', 'lard']
      },
      {
        path: ['typeMix', '2', '1', 'fn'],
        params: [
          { size: 4, types: ['lard', 'olive oil'] },
          {
            roll() {
              return 1;
            }
          }
        ],
        expectedResult: ['olive oil', 'olive oil', 'olive oil', 'olive oil']
      }
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, sliceAndFormTest);

  function sliceAndFormTest(t) {
    var levels = sliceIntoLevels(testCase.object);
    //console.log('levels:', JSON.stringify(levels, null, 2));

    var hierarchy = reconstitute(levels);
    //console.log('hierarchy:', JSON.stringify(hierarchy, null, 2));
    t.deepEqual(
      hierarchy,
      testCase.object,
      'Object is reconstituted from levels correctly.'
    );

    testCase.reconstitutedFnsToCall.forEach(callFn);

    t.end();

    function callFn(fnSpec) {
      var fn = getAtPath(hierarchy, fnSpec.path);
      t.ok(fn, 'Function is present in reconstituted object.');
      var result = fn.apply(fn, fnSpec.params);
      t.deepEqual(
        result,
        fnSpec.expectedResult,
        'Function works correctly after being reconstituted.'
      );
    }
  }
}
