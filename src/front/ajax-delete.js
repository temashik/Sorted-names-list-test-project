$(document).ready(() => {
	$('#delete').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/deleteName',
			data: {
				id: $('#id').val(),
			},
			success: function (result) {
				window.location.replace(`/`);
			},
		});
		event.preventDefault();
	});
});
