var namesOrder = [];
$(document).ready(() => {
    $.each( $('.name-container'), function(index,record){
        namesOrder.push($(record).data('rate'));
    });
    console.log($('.names-list'));
    $(".names-list").sortable({
        update: function() {
            let newNamesIdOrder = [];
            let newNamesRateOrder = [];
            $.each($('.name-container'), function(index,record){
                newNamesRateOrder.push($(record).data('rate'));
                newNamesIdOrder.push($(record).data('id'));
            });
            let nameId = 0;
            let newRank = 0;
            let mismatchPoint = 0;
            for(let i = 0; i < newNamesRateOrder.length; i++) {
                if(namesOrder[i] != newNamesRateOrder[i]) {
                    mismatchPoint = i;
                    break;
                }
            }
            if(newNamesRateOrder[mismatchPoint] > newNamesRateOrder[mismatchPoint + 1]) {
                nameId = newNamesIdOrder[mismatchPoint];
                newRank = mismatchPoint + 1;
            } else {
                for(let i = newNamesRateOrder.length; i > mismatchPoint; i--) {
                    if(namesOrder[i] != newNamesRateOrder[i]) {
                        nameId = newNamesIdOrder[i];
                        newRank = i + 1;
                        break;
                    }
                
            }
            }
            $.ajax({
                method: 'POST',
                url: '/names/changeRank',
                data: {
                    id: nameId,
                    rank: newRank,
                },
                success: function (result) {
                    location.reload(true);
                },
            });
        }
    });
});