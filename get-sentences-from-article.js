var _ = require('lodash');

var bracketLinkRe = /\[\[(.+?)\]\]/g;
var braceLinkRe = /\{\{(.+?)\}\}/g;
var superscriptRe = /<sup>(\w+)<\/sup>/g;
var subscriptRe = /<sub>(\w+)<\/sub>/g;
var tripleQuoteRe = /'''/g;
var wordRe = /\w\w+/;
var punctuationEndingRe = /[\.!?]$/;
var refTagRe = /<ref>.*?<\/ref>/g;

function getSentencesFromArticle(article) {
  var cleaned = removeTripleQuotes(
    desubscript(
      desuperscript(
        replaceLinks(
          removeRefTags(
            article
          )
        )
      )
    )
  );

  var lines = eatInfoboxHeader(cleaned.split('\n'))
  lines = lines.filter(isTextLine);

  return _.flatten(lines
    .map(parseSentences)
  );
}

function replaceLinks(s) {  
  var replaced = s.replace(bracketLinkRe, replaceBracketContents);
  replaced = replaced.replace(braceLinkRe, replaceBracketContents);
  return replaced;
}

function replaceBracketContents(match, contents) {
  var text = contents;
  if (contents.indexOf('|') !== -1) {
    var pieces = contents.split('|');
    if (pieces.length > 0) {
      text = pieces[pieces.length - 1];
    }
  }
  return text;
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
        line.indexOf('|') === 0 ||
        firstTwoChars === ' |' ||
        line.indexOf('<br>') !== -1 ||
        line.indexOf('File:') !== -1 ||
        line.indexOf('Category:') !== -1 ||
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

function removeRefTags(s) {
  return s.replace(refTagRe, '');
}

function eatInfoboxHeader(lines) {
  if (lines.length < 1 || lines[0].indexOf('{{') !== 0) {
    return lines;
  }

  for (var i = 0; i < lines.length; ++i) {
    var line = lines[i];
    if (line.length === 2 && line.indexOf('}}') === 0) {
      return lines.slice(i + 1);
    }
  }

  return lines;
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
    // Tokens of length less than 2 might be initials followed by a period.
    if (token.length > 2 && token.match(punctuationEndingRe)) {
      sentences.push(sentence);
      sentence = '';
    }
  }
  return sentences;
}

module.exports = getSentencesFromArticle;
