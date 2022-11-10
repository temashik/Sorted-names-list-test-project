$(document).ready(() => {
	$('#login').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/login-response',
			data: {
				email: $('#email').val(),
				password: $('#password').val(),
			},
			success: function (result) {
				if (result.eMsg) {
					$('#error').html('<strong>' + result.eMsg + '</strong>');
				} else {
					alert(result.msg);
					window.location.replace('/names');
				}
			},
		});
		event.preventDefault();
	});
});
