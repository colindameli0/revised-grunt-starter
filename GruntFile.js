module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserSync: {
				bsFiles: {
				src: [
					'dist/css/*.css',
					'dist/*.html',
					'dist/scripts/*.js'
				]
			},
			options: {
				watchTask: true,
				server: './dist'
			}
		},
		concat: {
			js: {
				options: {
					separator: ';'
				},
				src: [
					'dev/scripts/*.js'
				],
				dest: 'dist/scripts/main.min.js'
			},
		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: {
					'dist/scripts/main.min.js': ['dev/scripts/*.js']
				}
			}
		},
		sass: {                             
			dist: {                            
				options: {                       
					style: 'compressed'
				},
				files: {                         
					'dist/css/main.css': 'dev/styles/main.scss'  
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 5 version', 'ie 7', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'dist/css/main.css'
			}
		},
		watch: {
			css: {
				files: ['dev/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
			},
			html: {
				files: ['dist/**/*.html']
			},
			js: {
				files: ['dev/scripts/*.js'],
				tasks: ['concat:js', 'uglify:js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Run the server and watch for file changes
	grunt.registerTask('default', ['browserSync', 'concat', 'uglify', 'sass', 'autoprefixer', 'watch']); // Build Tasks
};