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

    // This method adds support for a `--skip-install` flag
    this.option('skip-install', {
        desc: 'Skip the node package manager (npm) install',
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
           if(this.skipInstall){
               this.log(chalk.white('Skipping npm install.\n'));
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
		   
		   this.dummy = 'Dummy';

       },

       saveConfig: function () {
           this.config.set('bendVersion', packagejs.version);
           this.config.set('baseName', this.baseName);
       }
   },

  // ********************************************************************************************
   writing: {
    	writeProjectFiles: function () {
        	this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), this, {});
            this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
            this.fs.copy(this.templatePath('.gitattributes'), this.destinationPath('.gitattributes'));
            this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this, {});
			this.fs.copy(this.templatePath('LICENSE'), this.destinationPath('LICENSE'));
			this.fs.copy(this.templatePath('server.js'),this.destinationPath('server.js'));

     	},

      	writeConfigurationFiles: function () { 
            this.fs.copy(this.templatePath('config/config.js'), this.destinationPath('config/config.js'));
            this.fs.copy(this.templatePath('config/express.js'), this.destinationPath('config/express.js'));
            this.fs.copy(this.templatePath('config/mongoose.js'), this.destinationPath('config/mongoose.js'));
			this.fs.copy(this.templatePath('config/env/development.js'), this.destinationPath('config/env/development.js'));
			this.fs.copy(this.templatePath('config/env/production.js'), this.destinationPath('config/env/production.js'));
			
		},

      	writeApplicationFiles: function () {
			this.fs.copy(this.templatePath('app/controllers/users.server.controller.js'), this.destinationPath('app/controllers/users.server.controller.js'));
			this.fs.copyTpl(this.templatePath('app/controllers/index.server.controller.js'), this.destinationPath('app/controllers/index.server.controller.js'),this, {});
			this.fs.copy(this.templatePath('app/models/user.server.model.js'), this.destinationPath('app/models/user.server.model.js'));
			this.fs.copy(this.templatePath('app/routes/users.server.routes.js'), this.destinationPath('app/routes/users.server.routes.js'));
			this.fs.copy(this.templatePath('app/routes/index.server.routes.js'), this.destinationPath('app/routes/index.server.routes.js'));
			this.fs.copy(this.templatePath('app/views/index.ejs'), this.destinationPath('app/views/index.ejs'));
			
		}
   },

  // ********************************************************************************************
   install: function() {
   	if (this.options['skip-install']) {
    	this.log(
        	'Your Node.js package dependencies are specified in package.json, however you chose to skip the installations.' +
			'\nYou can inject these dependencies into your source code by running:' +
            '\n' +
            '\n' + chalk.yellow.bold('npm install')
       	);
	} else {
		this.npmInstall();
    }
   },

  // ********************************************************************************************
   end: function() {
   	if (this.dummy === 'Dummy') {
		this.log(
	     	'This application can be started with:' +
	  		'\n' +
	  		'\n' + chalk.yellow.bold('node server')
	  	);
   	}
   }     
});