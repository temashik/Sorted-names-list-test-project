$(document).ready(() => {
	$('#editName').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/editName',
			data: {
				id: $('#id').val(),
				newName: $('#newName').val(),
				newRank: $('#newRank').val(),
			},
			success: function (result) {
				if (result.errorMessage) {
					$('#error').html('<strong>' + result.errorMessage + '</strong>');
				} else {
					window.location.replace('/names/');
				}
			},
		});
		event.preventDefault();
	});
});
