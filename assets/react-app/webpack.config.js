const path = require('path');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, '../../public/build/react'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
