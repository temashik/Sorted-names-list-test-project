$(document).ready(() => {
	$('#add').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/addName',
			data: {
				name: $('#name').val(),
			},
			success: function (result) {
				if (result.errorMessage) {
					$('#error').html('<strong>' + result.errorMessage + '</strong>');
				} else {
					window.location.replace('/names');
				}
			},
		});
		event.preventDefault();
	});
});
