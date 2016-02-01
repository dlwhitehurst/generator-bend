// **********************************************
// app/index.js
//
// written by David L. Whitehurst
//

'use strict';
var generators = require('yeoman-generator'),
   chalk = require('chalk'),
   path = require('path'),
   crypto = require("crypto"),
   packagejs = require(__dirname + '/../package.json');

var BendGenerator = generators.Base.extend({});

/* Constants use through out */
const QUESTIONS = 3; // making questions a variable to avoid updating each question by hand when adding additional options


module.exports = BendGenerator.extend({
  
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // This method adds support for a `--skip-entity` flag
    this.option('skip-entity', {
        desc: 'Skip the entity example generation',
        type: Boolean,
        defaults: false
    });	

    // This method adds support for a `--skip-auth` flag
    this.option('skip-auth', {
        desc: 'Skip the authentication generation',
        type: Boolean,
        defaults: false
    });	

  },
  
  // ********************************************************************************************
  initializing : {
       displayLogo : function () {
           this.log(' \n' +
           chalk.green('  ███████  ') + chalk.red('  ████████  ██      ██  ███████\n') +
           chalk.green('  ██     ██') + chalk.red('  ██        ████    ██  ██     ██  \n') +
           chalk.green('  ███████  ') + chalk.red('  ██████    ██ ███  ██  ██     ██\n') +
           chalk.green('  ██     ██') + chalk.red('  ██        ██   ██ ██  ██     ██\n') +
           chalk.green('  ███████  ') + chalk.red('  ████████  ██     ███  ███████\n'));
           this.log(chalk.white.bold('        https://github.com/dlwhitehurst/generator-bend\n'));
           this.log(chalk.white('Welcome to the Bend (Node-Express-MongoDB Backend) Generator ') + chalk.yellow('v' + packagejs.version + '\n'));
       },
	   
       setupClientVars : function () {
 		  // client stuff
       },

       setupServerVars : function () {
           if(this.skipAuth){
               this.log(chalk.white('Skipping authentication module.\n'));
           }
           if(this.skipSwagger){
               this.log(chalk.white('Skipping Swagger API hosting.\n'));
           }
       },

       setupVars : function () {
           this.packagejs = packagejs;
           this.jhipsterVersion = this.config.get('jhipsterVersion');
           this.baseName = this.config.get('baseName');

           if (this.baseName != null) {
               this.log(chalk.green('This is an existing project, using the configuration from your .yo-rc.json file \n' +
               'to re-generate the project...\n'));

               this.existingProject = true;
           }
       }	   
   },
   
  // ********************************************************************************************
   prompting: {
       askForModuleName: function () {
           if(this.existingProject){
               return;
           }
           var done = this.async();
           var defaultAppBaseName = (/^[a-zA-Z0-9_]+$/.test(path.basename(process.cwd())))?path.basename(process.cwd()):'bend';

           this.prompt({
               type: 'input',
               name: 'baseName',
               validate: function (input) {
                   if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                   return 'Your application name cannot contain special characters or a blank space, using the default name instead';
               },
               message: chalk.bold.yellow('(1/' + QUESTIONS + ') What is the base name of your application?'),
               default: defaultAppBaseName
           }, function (prompt) {
               this.baseName = prompt.baseName;
               //this.rememberMeKey = crypto.randomBytes(20).toString('hex');
               done();
           }.bind(this));
       },
       askForServerSideOpts: function (){
             if(this.existingProject){
                 return;
             }
			 // later ...
	   },
       askForTestOpts: function () {
           if(this.existingProject){
               return;
           }
		   // later ...
       }				   				  				  				 			 
   },
   
  // ********************************************************************************************
   configuring: {
       configureGlobal: function () {
		   // just in case
           this.lowercaseBaseName = this.baseName.toLowerCase();

           // in case I use another NoSQL database instead of Mongo
		   this.pkType = 'String';

       },

       saveConfig: function () {
           this.config.set('bendVersion', packagejs.version);
           this.config.set('baseName', this.baseName);
       }
   },

  // ********************************************************************************************
   writing: {
    	writeProjectFiles: function () {
        	this.template('_README.md', 'README.md', this, {});
            this.copy('.gitignore', '.gitignore');
            this.copy('.gitattributes', '.gitattributes');
            this.template('_package.json', 'package.json', this, {});
			this.copy('LICENSE', 'LICENSE');
			this.copy('server.js','server.js');

     	},

      	writeConfigurationFiles: function () { 
            this.copy('config/config.js', 'config/config.js');
            this.copy('config/express.js', 'config/express.js');
            this.copy('config/mongoose.js', 'config/mongoose.js');
			this.copy('config/env/development.js', 'config/env/development.js');
			this.copy('config/env/production.js', 'config/env/production.js');
			
		},

      	writeApplicationFiles: function () {
			this.copy('app/controllers/users.server.controller.js', 'app/controllers/users.server.controller.js');
			this.copy('app/models/user.server.model.js','app/models/user.server.model.js');
			this.copy('app/routes/users.server.routes.js', 'app/routes/users.server.routes.js');
			
		},
		
		writeStaticWebFiles: function () {
			this.copy('web/index.html','web/index.html');
			this.copy('web/o2c.html','web/o2c.html');
			this.copy('web/swagger-ui.js','web/swagger-ui.js');
			this.copy('web/swagger-ui.min.js','web/swagger-ui.min.js');
			this.copy('web/swagger.json','web/swagger.json');
			
			this.copy('web/css/print.css','');
			this.copy('web/css/reset.css','');
			this.copy('web/css/screen.css','');
			this.copy('web/css/style.css','');
			this.copy('web/css/typography.css','');
			
			this.copy('web/fonts/DroidSans-Bold.ttf','');
			this.copy('web/fonts/DroidSans.ttf','');
			
			this.copy('web/images/collapse.gif','');
			this.copy('web/images/expand.gif','');
			this.copy('web/images/explorer_icons.png','');
			this.copy('web/images/favicon-16x16.png','');
			this.copy('web/images/favicon-32x32.png','');
			this.copy('web/images/favicon.ico','');
			this.copy('web/images/logo_small.png','');
			this.copy('web/images/throbber.gif','');
			this.copy('web/images/wordnik_api.png','');
			
			this.copy('web/lang/en.js','');
			
			this.copy('web/lib/backbone-min.js','');
			this.copy('web/lib/handlebars-2.0.0.js','');
			this.copy('web/lib/highlight.7.3.pack.js','');
			this.copy('web/lib/jquery-1.8.0.min.js','');
			this.copy('web/lib/jquery.ba-bbq.min.js','');
			this.copy('web/lib/jquery.slideto.min.js','');
			this.copy('web/lib/jquery.wiggle.min.js','');
			this.copy('web/lib/jsoneditor.min.js','');
			this.copy('web/lib/marked.js','');
			this.copy('web/lib/swagger-oauth.js','');
			this.copy('web/lib/underscore-min.js','');
			this.copy('web/lib/underscore-min.map','');
			
		}
   }    
});