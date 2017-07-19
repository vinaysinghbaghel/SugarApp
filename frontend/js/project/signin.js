
(function(window, $){

	'use strict';

	$(document).ready(function() {
		$('#signin-form').submit(function(event) {
			event.preventDefault();
			$.ajax({
	  		url : '/signin',
	  		type : 'POST',
	  		data : $('#signin-form').serialize(),
	  		cache : false,
	  		success : function(data) {
	  			if(data.success) {
	  				window.location.href="/";
	  			} else {
	  				toastr.error(data.message, 'Error', { timeout : 2000 });
	  			}
	  		},
	  	  error : function(error) {
	  	  	toastr.error(error, 'Error', { timeout : 2000 });
	  	  }
			});
		});
	});


})(window, jQuery);