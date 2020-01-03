module.exports = {
    presets: [
        ['@babel/env', {
            targets: {
                node: 'current',
            },
        }],
    ],

    "sourceMaps": true,
    "retainLines": true
};