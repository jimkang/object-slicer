test:
	node tests/basictests.js
	node tests/function-entity-tests.js
	node tests/symbol-tests.js

pushall:
	git push origin master && npm publish

prettier:
	prettier --single-quote --write "**/*.js"
