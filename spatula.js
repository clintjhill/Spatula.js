/* 
	spatula.js 
	A really small, really simple tool for downloading and using views for Single Page Applications.
	clint.hill@gmail.com

	Requires jQuery.
*/
var spatula = (function($){
	var cache = {},
		download = function(url, callback){
			$.get(url, function(template){
				cache[url] = template;
				callback(cache[url]);
			});
		},
		preload = function(tpls, callback){
			var load = function(){
				var tpl = tpls.pop();
				get(tpl, function(t){
					if(tpls.length){
						load();
					} else {
						callback();
					}
				});
			};
			load();
		},
		get = function(url, callback){
			if(cache[url]) {
				callback(cache[url]);
			} else {
				download(url, callback);
			}
		};

	return {
		download: download,
		preload: preload,
		get: get,
		cache: cache
	}
})(jQuery);