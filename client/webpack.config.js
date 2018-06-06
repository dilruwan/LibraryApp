var config = {
    mode: "development", // "production" | "development"
    entry: './src/main.js',
    output: {
        path:'/',
        filename: 'bundle.js',
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(yaml|yml)$/,
            loader: 'json-loader!yaml-loader'
        }, {
            test: /\.(png|jpg|jpeg)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff" 
        }, {
            test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
            loader: "file-loader"
        }]
    }
}
module.exports = config;