$(document).ready(() => {
	$('#register').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/register',
			data: {
				name: $('#name').val(),
				email: $('#email').val(),
				password: $('#password').val(),
			},
			success: function (result) {
				if (result.errorMessage) {
					$('#error').html('<strong>' + result.errorMessage + '</strong>');
				} else {
					alert(result.msg);
					window.location.replace('/login');
				}
			},
		});
		event.preventDefault();
	});
});
