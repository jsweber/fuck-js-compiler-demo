const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.CleanPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json']
    }
}
