var test = require('tape');
var getSentencesFromArticle = require('../get-sentences-from-article');
var fs = require('fs');

var readOpts = {
  encoding: 'utf8'
};

var testCases = [
  {
    article: fs.readFileSync(__dirname + '/data/mole.txt', readOpts),
    sentences: [
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
    ],
  },
  {
    article: fs.readFileSync(__dirname + '/data/salinger.txt', readOpts),
    sentences: [
      'Salinger was born "Jerome David Salinger" in Manhattan, New York on January 1, 1919.',
      'Salinger began writing short stories while in secondary school.',
      'In 1936, he went to work in Austria, but left 2 years later, just before Germany took Austria over.',
      'Salinger published several stories in the early 1940s before serving in World War II.',
      'In 1948 he published the story "A Perfect Day for Bananafish" in \'\'The New Yorker\'\' magazine, which also published most of his following work.',
      '=J.',
      'D.',
      '=Why did J D Salinger spend the last 60 years hiding in a shed writing love notes to teenage girls?',
      'Despite What.CD\'s quick response, Salinger\'s unpublished writings will forever be available on the internet.',
      '*{{cite book =Kubica =Chris = =Hochman, Will =Letters to J.D.',
      '*Salinger, Margaret 2000.',
      '\'\'Dream catcher: reflections on reclusion\'\'.',
      'Scribner, N.Y.' ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Get sentences', function sentencesTest(t) {
    t.deepEqual(
      getSentencesFromArticle(testCase.article),
      testCase.sentences,
      'Expected sentences are returned.'
    );

    // console.log(JSON.stringify(getSentencesFromArticle(testCase.article), null, '  '));
    t.end();
  });
}
