module.exports = {
    "transform": {
        ".(ts|tsx)": "C:\\Users\\gboze\\Documents\\projects\\opensource\\doc-resume\\node_modules\\ts-jest\\dist\\index.js"
    },
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "collectCoverageFrom": [
        "src/**/*.{ts,tsx}"
    ],
    "testMatch": [
        "<rootDir>/test/**/*.(spec|test).{ts,tsx}"
    ],
    "testURL": "http://localhost",
    "rootDir": "C:\\Users\\gboze\\Documents\\projects\\opensource\\doc-resume",
    "watchPlugins": [
        "C:\\Users\\gboze\\Documents\\projects\\opensource\\doc-resume\\node_modules\\jest-watch-typeahead\\filename.js",
        "C:\\Users\\gboze\\Documents\\projects\\opensource\\doc-resume\\node_modules\\jest-watch-typeahead\\testname.js"
    ]
}