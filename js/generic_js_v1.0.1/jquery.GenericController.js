////
//
//	Generic Controller with jQuery.
//
//	Copyright (C) 2013 Generic Library. All Rights Reserved.
//	
//	Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
//	and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
//
//	Built on top of the jQuery library
//	http://jquery.com
//
////



/*	Generic Controller
==================================================*/

var gl_html_src = '';
var this_file_name = 'jquery.GenericController.js';
var include_files = new Array(
		'jquery.GenericLibrary.js',
		'jquery.GenericMouseOver.js',
		'jquery.GenericSmoothScroll.js',
		'jquery.GenericListManager.js'
	);
var gl_dir_path = $('[src$="'+ this_file_name+ '"]').attr('src').replace(this_file_name,'');

for( var i in include_files ) {
	gl_html_src += '<script type="text/javascript" src="'+ gl_dir_path+ include_files[i]+ '"></script>'+ "\n";
}
gl_html_src += '<script type="text/javascript">'+ "\n";
gl_html_src += "$(function(){"+ "\n";

gl_html_src += "var ua = window.navigator.appVersion.toLowerCase();"+ "\n";
gl_html_src += "if( !( ua.indexOf('msie 7.') != -1 || ua.indexOf('msie 8.') != -1 ) ){"+ "\n";
gl_html_src += "$('a, input[type=image], button').GenericMouseOver();"+ "\n";
gl_html_src += "}"+ "\n";
gl_html_src += "$('[href^=#]').GenericSmoothScroll();"+ "\n";
gl_html_src += "$('ul,ol,table,dl').GenericListManager();"+ "\n";
gl_html_src += "});"+ "\n";
gl_html_src += '</script>'+ "\n";

document.write(gl_html_src);