module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        "sourceType": "module"
    },
    globals: {
        socket: false,
        RoomClient: false,
        app: false,
    },
    rules: {
        indent: [
            2,
            2,
            {
                SwitchCase: 1,
            },
        ],
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'no-await-in-loop': 0,
        'no-console': 2,
        'consistent-return': 0,
        'class-methods-use-this': 0,
        'no-param-reassign': 0,
        'no-shadow': 0,
        'func-names': 0,
        'no-mixed-operators': 0,
        'no-throw-literal': 0,
        'no-prototype-builtins': 0,
        'endOfLine': "auto",
    },
};
