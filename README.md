# Phaser 3 Webpack Project Template - Loud House 3

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Loading images via JavaScript module `import` is also supported.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Build project and open web server running project |
| `npm run deploy` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run dev`.

After starting the development server with `npm dev`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:3000`
by default).

### Babel
You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you
want your project to support. The targeted browsers are set in the `.browserslistrc` file and the default currently
targets below:

safari >= 8
ie >= 11
chrome >= 46
firefox >= 45
ios >= 8

### Webpack
If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json`.

## Deploying Code
After you run the `npm run deploy` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with the index and the src folder. 

IMPORTANT! You will need to 

### Customizing for International

#Assets
The majority of image assets are packed into spritesheets and are not customisable. For localisation the only assets that should need changing are the logos - `logo_large.png` and `logo_small.png` - that can be replaced with language specific logos.

#Data
The site data is found in src/data/config.json. All editable strings are in text properties between ![CDATA[]] like `"text": "![CDATA[CLICK ANYWHERE TO PLAY]]"`.

Font families can be added/edited in the fonts property `"fonts": { }`. All fonts can be overridden by setting the `"font_override": ` property to `true`. This will change all game text to ARIAL.



# nickelodeon-LH3
