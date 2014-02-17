/*
   ajaxuploader jQuery Plugin
   By JamieTsang
*/
;(function($) { 
	$.extend({
		"upLoadParas" : function(handler,cmd) {
			$.ajaxSetup({
				dataType:"HTML"
			});
			$.post(handler,cmd);
		}
	});
})(jQuery); 