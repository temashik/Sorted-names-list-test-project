$(document).ready(() => {
	$('#logout').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/logout',
			success: function (result) {
				window.location.replace('/');
			},
		});
		event.preventDefault();
	});
});