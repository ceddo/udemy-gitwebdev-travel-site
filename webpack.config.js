
// webpack requires an absolute path for output, so we need to use path
// we don't need to "npm install path" - it's part of Node library
const path = require('path');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
];

module.exports = {
    // set entry path
    entry: "./app/assets/scripts/App.js",
    // set output path
    output: {
        // by default, output will be in a folder called "dist", at path root
        // we want to rename our output to "bundled.js", and put it in our "app" folder
        filename: "bundled.js",
        
        // in Node.js, __dirname is the directory in whic the currently executing script resides
        // so if you typed __dirname in "/d1/d2/myscript.js", __dirname would be "/d1/d2/"
        // by contrast, .
        path: path.resolve(__dirname, "app")
    },
    devServer: {
        before: function(app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 
                'css-loader?url=false', 
                {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
            }
        ]
    }
}