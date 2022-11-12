$(document).ready(() => {
	$('#delete').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/deleteName',
			data: {
				id: $('#id').val(),
			},
			success: function (result) {
				if(result.eMsg) {
					$('#error').html('<strong>' + result.eMsg + '</strong>');
				} else {
					window.location.replace(`/`);
				}
			},
		});
		event.preventDefault();
	});
});
