module.exports = function(grunt){
	grunt.initConfig({
		dirs: {
			dir: 'assets',
		    lessDir: 'assets/less',
		    cssDir: 'assets/css',
		    jsDir: 'assets/js',
		    imgDir: 'assets/img',
		    prodDir: 'assets/dist'
		}
	});
	
	// add modules and configs
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.config('lesslint', {
		src: ['<%= dirs.lessDir %>/less/*.less'],
		options: {
			csslint: {
				csslintrc: '.csslintrc',
				failOnWarning: false
			}
		}        
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.config('less', {
		dev: {
			files:[{
				expand: true,
				cwd: '<%= dirs.lessDir %>',
		        src: ['style.less'],
		        dest: '<%= dirs.cssDir %>',
		        ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.config('autoprefixer', {
		dev: {
			files: {
				'<%= dirs.cssDir %>/style.css':'<%= dirs.cssDir %>/style.css'
			}				
		}
	});

	// grunt.loadNpmTasks('grunt-uncss');
	// grunt.config('uncss', {
	// 	dist: {
	// 		files: {
	// 			'assets/css/style-clean.css': ['index.html']
	// 		}
	// 	}
	// });
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.config('cssmin', {
		prd: {
			files: {
				'<%= dirs.prodDir %>/starWars.min.css': ['<%= dirs.cssDir %>/lib/*.css', '<%= dirs.cssDir %>/style.css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.config('jshint', {
		options: {
			globals: {
				jQuery: true
			}
		},
		dev: ['GruntFile.js', '<%= dirs.jsDir %>/*.js']
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.config('uglify', {
		options: {
			// mangle: false
		},
		prd: {
			files: {
				'<%= dirs.prodDir %>/starWars.min.js': ['<%= dirs.jsDir %>/lib/*.js', '<%= dirs.jsDir %>/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.config('imagemin', {
		prd:{
			files: [{
	    	expand: true,                  // Enable dynamic expansion
	    	cwd: '<%= dirs.imgDir %>',                   
	    	src: ['**/*.{png,jpg,svg}'],   
	    	dest: '<%= dirs.prodDir %>/img/'                 
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.config('htmlmin', {
		prd: {
			options: {                              
				removeComments: true,
		        collapseWhitespace: true
			},
			files: {                                   
		        'index.html': '<%= dirs.dir %>/index.html'     
		      }
		}                                    
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		css: {
			files: ['<%= dirs.lessDir %>/*.less'],
			tasks: ['less:dev', 'autoprefixer:dev'],
			options: {
				livereload: true,
			}
		},
		js: {
			files: ['<%= dirs.jsDir %>/*.js'],
			tasks: ['jshint:dev']
		}
	});

	// Tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('production', ['cssmin:prd', 'uglify:prd', 'htmlmin:prd', 'imagemin:prd']);
};
