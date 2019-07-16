object-slicer
==================

Slices an object into an array of levels representing the object's hierarchy and also does the reverse.

Installation
------------

    npm install object-slicer

Usage
-----

    var { sliceIntoLevels, formFromLevels } = require('object-slicer');

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

    var slices = sliceIntoLevels(addresses);
    console.log(slices);

Console output:




    formFromLevels(slices);
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
