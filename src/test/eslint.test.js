import lint from 'mocha-eslint';

lint([ 'src/main', 'src/test' ], { timeout: 10000, slow: 5000 });
