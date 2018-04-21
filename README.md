get-sentences-from-article
==========================

Extracts sentences from Wikipedia articles. Tries not to get section names or links.

Installation
------------
```shell
npm install get-sentences-from-article
```
Usage
-----
```javascript
    var getSentencesFromArticle = require('get-sentences-from-article');
    console.log(getSentencesFromArticle(wikipediaArticleText));
```
Output:
```javascript
[
  'Example: How many moles are there in 20 grams of hydrogen?',
  'A value of 1 can be used for hydrogen\'s relative mass, although the correct value is slightly larger.',
  'So: moles = mass/relative mass = 20/1 = 20 moles.',
  'Example: How many moles are there in 100cm^3 of 0.1M H2SO4?',
  '1 dm^3 is the same as 1000 cm^3, so the value in cubic centimetres needs to be divided by 1000.',
  '100/1000 x 0.1 = 0.01 moles.',
  'A methane molecule is made from one carbon atom and four hydrogen atoms.',
  'Carbon has a mass of 12.011 u and hydrogen has a mass of 1.008 u.',
  'This means that the mass of one methane molecule is 12.011 u + (4*1.008u), or 16.043 u.',
  'This means that one mole of methane has a mass of 16.043 grams.',
  'A mole can be thought of as two bags of different sized balls.',
  'One bag contains 3 tennis balls and the other 3 footballs.',
  'There is the same number of balls in both bags but the mass of the footballs is much larger.',
  'It is a different way to measure things.',
  'Moles measure the number of particles, not the mass.',
  'So both bags contain three moles.',
  'A mole is simply a unit of the number of things.',
  'Units are invented when existing units can not describe something well enough.',
  'Chemical reactions often take place at levels where using grams wouldn\'t make sense, yet using absolute numbers of atoms/molecules/ions would be confusing, too.'
]
```
Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

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
