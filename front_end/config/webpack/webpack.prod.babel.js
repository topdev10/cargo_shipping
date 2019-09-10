import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import paths from './paths';

CopyWebpackPlugin([
    {
        from: 'node_modules/pdfjs-dist/cmaps/',
        to: 'cmaps/'
    },
]);

module.exports = {
    mode: 'production',
    output: {
        filename: `${paths.jsFolder}/[name].[hash].js`,
        path: paths.outputPath,
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
            root: paths.root
        })
    ],
    devtool: 'source-map'
};