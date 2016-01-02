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
      'Mole is the SI unit of measurement used to measure the number of things, usually atoms or molecules.',
      'One mole of something is equal to 6.0221415×10^23 of it.',
      'So, "One mole of hydrogen atoms" means 6.0221415×10^23 Hydrogen atoms.',
      '"One mole of grapefruits" means 6.0221415×10^23 grapefruits.',
      'We call this number Avogadro\'s number.',
      'We use this number because it is the number of carbon atoms in 12 grams of carbon-12, which is the most common kind of carbon.',
      'We can measure anything in moles, but it is not very useful for most things because the numbers are so big.',
      'For example, one mole of grapefruits would be as big as the earth.',
      'Because different molecules and atoms do not have the same mass, one mole of one thing does not weigh the same as one mole of something else.',
      'Atoms and molecule mass is measured in u. One u is equal to one gram per mole.',
      'This means that if an atom has a mass of one u, one mole of this atom weighs one gram.',
      'Example: How many moles are there in 20 grams of hydrogen?',
      'A value of 1 can be used for hydrogen\'s relative mass, although the correct value is slightly larger.',
      'So: moles = mass/relative mass = 20/1 = 20 moles.',
      'Example: How many moles are there in 100cm^3 of 0.1M H2SO4?',
      '1 dm^3 is the same as 1000 cm^3, so the value in cubic centimetres needs to be divided by 1000.',
      '100/1000 x 0.1 = 0.01 moles.',
      'A methane molecule is made from one carbon atom and four hydrogen atoms.',
      'Carbon has a mass of 12.011 u and hydrogen has a mass of 1.008 u. This means that the mass of one methane molecule is 12.011 u + (4*1.008u), or 16.043 u. This means that one mole of methane has a mass of 16.043 grams.',
      'A mole can be thought of as two bags of different sized balls.',
      'One bag contains 3 tennis balls and the other 3 footballs.',
      'There is the same number of balls in both bags but the mass of the footballs is much larger.',
      'It is a different way to measure things.',
      'Moles measure the number of particles, not the mass.',
      'So both bags contain three moles.',
      'A mole is simply a unit of the number of things.',
      'Units are invented when existing units can not describe something well enough.',
      'Chemical reactions often take place at levels where using grams wouldn\'t make sense, yet using absolute numbers of atoms/molecules/ions would be confusing, too.',
      'The SI units for molar concentration are mol/m^3.',
      'However, most chemical writing uses mol/dm^3, or mol dm<sup>-3</sup>, which is the same as mol/L.',
      'These units are often written with a capital letter M (pronounced "molar"), sometimes preceded by an SI prefix, for example, millimoles per litre (mmol/L) or millimolar (mM), micromoles/litre (µmol/L) or micromolar (µM), or nanomoles/L (nmol/L) or nanomolar (nM).',
      'The absolute yield of a chemical reaction mostly stated in moles (called the "molar yield").'
    ],
  },
  {
    article: fs.readFileSync(__dirname + '/data/salinger.txt', readOpts),
    sentences: [
      "Jerome David Salinger (January 1, 1919 – January 27, 2010), better known as J. D. Salinger, was an American writer.",
      "He was best known for his 1951 novel ''The Catcher in the Rye''.",
      "Salinger was born Jerome David Salinger in Manhattan, New York on January 1, 1919.",
      "Salinger began writing short stories while in secondary school.",
      "In 1936, he went to work in Austria, but left 2 years later, just before Germany took Austria over.",
      "Salinger published several stories in the early 1940s before serving in World War II.",
      "In 1948 he published the story \"A Perfect Day for Bananafish\" in ''The New Yorker'' magazine, which also published most of his following work.",
      "In 1951, his first novel ''The Catcher in the Rye'' was published.",
      "On January 27, 2010, Salinger died in his home in Cornish, New Hampshire of natural causes at age 91.",
      "Salinger did not like publicity: He never published an original work after 1965 and was never interviewed after 1980.",
      "On November 28, 2013, scans of three unpublished Salinger stories were uploaded to the Internet.",
      "It was done by a user of What.CD, an invite-only BitTorrent tracker site.",
      "The file was quickly removed by administrators of the site.",
      "It is not currently clear how the unpublished material was uploaded, as the original gangster sources came from two different locations (the University of Texas and Princeton).",
      "This shows that the works may have been obtained on separate occasions and then put together.",
      "Salinger\'s unpublished works quickly spread over to open BitTorrent sites like The Pirate Bay and image-sharing sites such as Imgur.",
      "Despite What.CD's quick response, Salinger's unpublished writings will forever be available on the internet.",
      "*Salinger, Margaret 2000.",
      "''Dream catcher: reflections on reclusion''.",
      "Scribner, N.Y.",
    ]
  },
  {
    article: fs.readFileSync(__dirname + '/data/f-86.txt', readOpts),
    sentences: [
      'The F-86 Sabre (nicknamed the "Sabre jet") was an American fighter plane made by North American Aviation.',
      'It first flew in 1947, and was introduced to battle the MiG-15 in the Korean War.',
      'Unlike the fighter before it, the F-86 had swept wings to be faster.'
    ]
  },
  {
    article: fs.readFileSync(__dirname + '/data/foundation.txt', readOpts),
    sentences: [
      "A foundation is a kind of company set up to carry out charity or research work.",
      "A foundation is usually endowed, which means it is given a large sum of money to do its work.",
      "An example is the Rockefeller Foundation.",
      "The Rockefeller family made their money from banking and oil and their family foundation is endowed with a very great sum of money.",
      "The people running the foundation think of ways to use the money to help charities, the arts, or whatever they like.",
      "Another example is the Bill & Melinda Gates Foundation.",
      "Bill Gates made a fortune from Microsoft.",
      "He and his wife now spend nearly all their time giving away the money he has made.",
      "They give it to projects like education in the United States and treating AIDS in Third World countries."
    ]
  },
  {
    article: fs.readFileSync(__dirname + '/data/horsea.txt', readOpts),
    sentences: [
      "Horsea (Japanese: タッツー ''Tattu'') is a Water Basic Pokémon card.",
      "It is part of the EX Team Rocket Returns expansion.",
      "effect=Search your discard pile for up to 2 Water Energy cards, show them to your opponent, and put them into your hand.",
      "effect=This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on the Defending Pokémon.",
      "Swift is a move in the Pokémon games.",
      "While Horsea was incapable of learning it when this card was released, it could previously learn it via TM in Generation I and Generation II, and later regained the ability to learn it via Move Tutor in Emerald."
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Get sentences', function sentencesTest(t) {
    var lines = getSentencesFromArticle(testCase.article);
    // console.log(JSON.stringify(lines, null, '  '));
    t.equal(
      lines.length, testCase.sentences.length, 'Number of sentences is correct.'
    );
    lines.forEach(checkLine);
    t.end();

    function checkLine(line, i) {
      t.equal(line, testCase.sentences[i], 'Expected sentence is returned.');
    };
  });
}
