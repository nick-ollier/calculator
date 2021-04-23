const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-dark-mode'
    ],
    webpackFinal: async (config) => {
        // config.resolve.push({
        //     extensions: ['.ts', '.tsx', '.js', '.jsx']
        // });

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        });

        config.module.rules.push({
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader'
        });

        config.plugins.push(new CheckerPlugin());

        return config;
    }
};
