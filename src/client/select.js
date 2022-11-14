var nameId;
$(document).ready(() => {
	$('.li-border').click(function (event) {
		nameId = $(this).children().data('id');
		$('.selected-item').removeClass('selected-item');
		$(this).addClass('selected-item');
	});
	$('#delete').submit(function (event) {
		$.ajax({
			method: 'POST',
			url: '/names/deleteName',
			data: {
				id: nameId,
			},
			success: function (result) {
				if(result.errorMessage) {
					$('#error').html('<strong>' + result.errorMessage + '</strong>');
				} else {
					window.location.replace(`/names`);
				}
			},
		});
		event.preventDefault();
	});
	$('#edit').submit(function (event) {
		if(!nameId) {
			$('#error').html('<strong>Select item to edit</strong>');
		} else {
			window.location.replace(`/names/editNameForm/?id=${nameId}`);
		}
		event.preventDefault();
	});
});
