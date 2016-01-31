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
const QUESTIONS = 1; // making questions a variable to avoid updating each question by hand when adding additional options


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
    this.option('skip-entity', {
        desc: 'Skip the authentication generation',
        type: Boolean,
        defaults: false
    });	

  },
  // ********************************************************************************************
  initializing : {
       displayLogo : function () {
           this.log(' \n' +
           chalk.green('███████  ') + chalk.red('  ████████  ██      ██  ███████\n') +
           chalk.green('██     ██') + chalk.red('  ██        ████    ██  ██     ██  \n') +
           chalk.green('███████  ') + chalk.red('  ██████    ██ ███  ██  ██     ██\n') +
           chalk.green('██     ██') + chalk.red('  ██        ██   ██ ██  ██     ██\n') +
           chalk.green('███████  ') + chalk.red('  ████████  ██     ███  ███████\n'));
           this.log(chalk.white.bold('        https://github.com/dlwhitehurst/generator-bend\n'));
           this.log(chalk.white('Welcome to the Bend (Node-Express-MongoDB Backend) Generator ') + chalk.yellow('v' + packagejs.version + '\n'));
       },
       setupClientVars : function () {
           //if(this.skipClient){
             //  return;
           //}
       },

       setupServerVars : function () {
		   // server stuff

       },

       setupVars : function () {
           this.packagejs = packagejs;
           this.jhipsterVersion = this.config.get('jhipsterVersion');
           this.baseName = this.config.get('baseName');
           this.rememberMeKey = this.config.get('rememberMeKey');
           this.testFrameworks = this.config.get('testFrameworks');

           var serverConfigFound = this.packageName != null &&
           this.authenticationType != null &&
           this.hibernateCache != null &&
           this.clusteredHttpSession != null &&
           this.websocket != null &&
           this.databaseType != null &&
           this.devDatabaseType != null &&
           this.prodDatabaseType != null &&
           this.searchEngine != null &&
           this.buildTool != null;

           var clientConfigFound = this.useSass != null && this.frontendBuilder != null;

           if (this.baseName != null && serverConfigFound &&
               (this.skipClient || clientConfigFound)) {

               // Generate key if key does not already exist in config
               if (this.rememberMeKey == null) {
                   this.rememberMeKey = crypto.randomBytes(20).toString('hex');
               }

               // If translation is not defined, it is enabled by default
               if (!this.skipClient && this.enableTranslation == null) {
                   this.enableTranslation = true;
               }

               // backward compatibility on testing frameworks
               if (this.testFrameworks == null) {
                   this.testFrameworks = [ 'gatling' ];
               }

               // If social sign in is not defined, it is disabled by default
               if (this.enableSocialSignIn == null) {
                   this.enableSocialSignIn = false;
               }

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
               message: '(1/' + QUESTIONS + ') What is the base name of your application?',
               default: defaultAppBaseName
           }, function (prompt) {
               this.baseName = prompt.baseName;
               this.rememberMeKey = crypto.randomBytes(20).toString('hex');
               done();
           }.bind(this));
       }  	 
   }
});