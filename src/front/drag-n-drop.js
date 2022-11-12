var order = [];
$(document).ready(() => {
    $.each( $('div.div-name'), function(index,record){
        order.push($(record).data('rate'));
    });

    $("ol").sortable({
        update: function( ) {
            let newIdOrder = [];
            let newRateOrder = [];
            $.each( $('div.div-name'), function(index,record){
                newRateOrder.push($(record).data('rate'));
                newIdOrder.push($(record).data('id'));
            });
            let nameId = 0;
            let newRank = 0;
            let mismatchPoint = 0;
            for(let i = 0; i < newRateOrder.length; i++) {
                if(order[i] != newRateOrder[i]) {
                    mismatchPoint = i;
                    break;
                }
            }
            if(newRateOrder[mismatchPoint] > newRateOrder[mismatchPoint + 1]) {
                nameId = newIdOrder[mismatchPoint];
                newRank = mismatchPoint + 1;
            } else {
                for(let i = newRateOrder.length; i > mismatchPoint; i--) {
                    if(order[i] != newRateOrder[i]) {
                        nameId = newIdOrder[i];
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