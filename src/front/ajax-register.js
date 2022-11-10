$(document).ready(() => {
	$('#register').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/register-response',
			data: {
				name: $('#name').val(),
				email: $('#email').val(),
				password: $('#password').val(),
			},
			success: function (result) {
				if (result.eMsg) {
					$('#error').html('<strong>' + result.eMsg + '</strong>');
				} else {
					alert(result.msg);
					window.location.replace('/login');
				}
			},
		});
		event.preventDefault();
	});
});
