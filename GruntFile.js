module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: 	{
			sass:{
				files: 'scss/*.scss',
				tasks: ['sass']	
				//tasks: ['sass', 'cssmin']	-- USE THIS CODE TO CREATE MINIFIY VERSION OF CSS FILE - FOR PROD
			},
			jsdoc: {
				files: 'js/*.js',
				tasks: ['jsdoc'],
				options:{
					debounceDelay: 250
				}
			},
			cssminfy:{
				files: 'css/style.css',
				tasks: ['cssmin']
			}
		},
		sass: {
			dev: {
				files: {
					'css/style.css': 'scss/style.scss'
				}
			},

			dev2: {
				files: {
					'css/style-ref.css': 'scss/style-ref.scss'
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: ['css/*.css', '*.html', 'GruntFile.js', 'js/*.js', 'doc/*.html']
				},
				options: {
					watchTask: true,
					debounceDelay: 1000,
					server: './'
				}
			}
		},
		jsdoc : {
	        dist : {
	            src: 'js/*.js', 
	            options: {
		            destination: 'doc',
		            configure : "jsdoc.conf.json"
	            }
	        }
	    },
	    cssmin:{
	    	target:{
	    		files: [{
	    			expand: true,
	    			cwd: 'css',
	    			src: ['style.css'],
	    			dest: 'dist',
	    			ext: '.min.css'
	    		}]
	    	}
	    }
	});

	//Load NPM task
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-jsdoc');
	//define default task
	grunt.registerTask('default', ['browserSync', 'watch:sass']);
	grunt.registerTask('servedoc', ['watch:jsdoc']);
};