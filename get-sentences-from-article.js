var _ = require('lodash');

var wikiLinkRe = /\[\[([\w\s']+)\]\]/g;
var pipeSeparatedRe = /([\w\s']+)\|([\w\s']+)/g;
var superscriptRe = /<sup>(\w+)<\/sup>/g;
var subscriptRe = /<sub>(\w+)<\/sub>/g;
var tripleQuoteRe = /'''/g;
var wordRe = /\w\w+/;
var punctuationEndingRe = /[\.!?]$/;

function getSentencesFromArticle(article) {
  var withoutLinks = removeTripleQuotes(
    desubscript(desuperscript(removeLinks(article)))
  );
  var lines = withoutLinks.split('\n').filter(isTextLine);
  return _.flatten(lines.map(parseSentences));
}

function removeLinks(s) {
  var removed = s.replace(wikiLinkRe, '$1');
  removed = removed.replace(pipeSeparatedRe, '$1');
  return removed;
}

function isTextLine(line) {
  var isTextLine = false;
  if (line.length > 8 && line[0] !== ':') {
    isTextLine = true;
    if (line.length > 1) {
      var firstTwoChars = line.substr(0, 2);
      if (line.charAt(0) === '=' ||
        firstTwoChars === '{{' ||
        firstTwoChars === '* ' ||
        line.indexOf('[[') !== -1 ||
        line.indexOf('<br>') !== -1 ||
        !line.match(wordRe)) {

        isTextLine = false;
      }
    }
  }
  return isTextLine;
}

function desuperscript(s) {
  return s.replace(superscriptRe, '^$1');
}

function desubscript(s) {
  return s.replace(subscriptRe, '$1');
}

function removeTripleQuotes(s) {
  return s.replace(tripleQuoteRe, '');
}

function parseSentences(s) {
  var sentences = [];
  var sentence = '';
  var tokens = s.split(/\s/);
  for (var i = 0; i < tokens.length; ++i) {
    var token = tokens[i];
    if (sentence.length > 0) {
      sentence += ' ';
    }
    sentence += token;
    if (token.match(punctuationEndingRe)) {
      sentences.push(sentence);
      sentence = '';
    }
  }
  return sentences;
}

module.exports = getSentencesFromArticle;
