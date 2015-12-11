test:
	node tests/get-sentences-from-article-tests.js

pushall:
	git push origin master && npm publish
