$(document).ready(() => {
	$('#add').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/addName',
			data: {
				name: $('#name').val(),
			},
			success: function (result) {
				if (result.eMsg) {
					$('#error').html('<strong>' + result.eMsg + '</strong>');
				} else {
					window.location.replace('/names');
				}
			},
		});
		event.preventDefault();
	});
});
