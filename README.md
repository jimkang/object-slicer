object-slicer
==================

Slices an object into an array of levels representing the object's hierarchy and also does the reverse.

Why
---

When writing programs that work recursively on an object's properties, like [tablenest](https://github.com/jimkang/tablenest), modifications become difficult. This is in part because it is hard to inspect an object with deep nesting at an intermediate stage of the program. It's hard to know what parts of the object it should be working on at a given point.

Intermediate representations of the deeply nested object can help with this. So this module represents levels of depth in a nest object as arrays. The successor to [tablenest](https://github.com/jimkang/tablenest) can iterate over one level at a time, and when debugging, I will know what to inspect.

Installation
------------

    npm install object-slicer

Usage
-----

    var { sliceIntoLevels, reconstitute } = require('object-slicer');

    var addresses = {
      countries: {
        'USA': {
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
        'Canada': {
          'provinces': {
            'Alberta': {}
          }
        }
      }
    };

    var levels = sliceIntoLevels(addresses);
    console.log(levels);

Console output:

    [
      [
        {
          "value": {},
          "parentIndex": -1
        }
      ],
      [
        {
          "value": {},
          "parentIndex": 0,
          "key": "countries"
        }
      ],
      [
        {
          "value": {},
          "parentIndex": 0,
          "key": "USA"
        },
        {
          "value": {},
          "parentIndex": 0,
          "key": "Canada"
        }
      ],
      [
        {
          "value": {},
          "parentIndex": 0,
          "key": "states"
        },
        {
          "value": {},
          "parentIndex": 1,
          "key": "provinces"
        }
      ],
      [
        {
          "value": {},
          "parentIndex": 0,
          "key": "IL"
        },
        {
          "value": {},
          "parentIndex": 0,
          "key": "MA"
        },
        {
          "value": {},
          "parentIndex": 1,
          "key": "Alberta"
        }
      ],
      [
        {
          "value": {},
          "parentIndex": 1,
          "key": "cities"
        },
        {
          "value": {},
          "parentIndex": 2,
          "key": "cities"
        }
      ],
      [
        {
          "value": {},
          "parentIndex": 0,
          "key": "Somerville"
        },
        {
          "value": {},
          "parentIndex": 1,
          "key": "Edmonton"
        }
      ],
      [
        {
          "value": [],
          "parentIndex": 0,
          "key": "streets"
        }
      ],
      [
        {
          "value": "Elm",
          "parentIndex": 0,
          "arrayIndex": 0
        },
        {
          "value": "Highland",
          "parentIndex": 0,
          "arrayIndex": 1
        }
      ]
    ]

    reconstitute(levels);
    // Returns original object 

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2019 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
