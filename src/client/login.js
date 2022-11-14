$(document).ready(() => {
	$('#login').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/login',
			data: {
				email: $('#email').val(),
				password: $('#password').val(),
			},
			success: function (result) {
				if (result.errorMessage) {
					$('#error').html('<strong>' + result.errorMessage + '</strong>');
				} else {
					alert(result.msg);
					window.location.replace('/names');
				}
			},
		});
		event.preventDefault();
	});
});
