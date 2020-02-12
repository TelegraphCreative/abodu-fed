let mix = require('laravel-mix');

let tailwindcss = require('tailwindcss');

require('laravel-mix-purgecss');
require('autoprefixer');

mix.sass('sass/styles.scss', 'css/abodu.css')
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('tailwind.js')],
		autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            }
        },
    })
    .js([
        'js/app.js',
     ], 'js/app.min.js');
   /*
   .js([
      'js/base.js',
   ], 'js/my-theme.js');
   */

mix.disableSuccessNotifications();

if (mix.inProduction()) {
    mix.purgeCss({
        enabled: true,
        globs: [
            path.join(__dirname, 'layouts/*.html'),
            path.join(__dirname, 'templates/*.html'),
            path.join(__dirname, 'templates/**/*.html'),
            path.join(__dirname, 'partials/*.html'),
            path.join(__dirname, 'partials/**/*.html'),
            path.join(__dirname, 'js/**.js'),
            path.join(__dirname, 'img/**.svg'),
        ],
        extensions: ['html', 'js', 'php', 'svg'],
    })
};