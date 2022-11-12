var order = [];
$(document).ready(() => {
    $.each( $('div.movable'), function(index,record){
        order.push($(record).data('rate'));
    });    
    $(".container").sortable({
        update: function( ) {
            let newIdOrder = [];
            let newRateOrder = [];
            $.each( $('div.movable'), function(index,record){
                newRateOrder.push($(record).data('rate'));
                newIdOrder.push($(record).data('id'));
            });
            let nameId = 0;
            let newRank = 0;
            let mismatchPoint = 0;
            for(let i = 0; i < newRateOrder.length; i++) {
                if(order[i] != newRateOrder[i]) {
                    console.log('first');
                    mismatchPoint = i;
                    break;
                }
            }
            if(newRateOrder[mismatchPoint] > newRateOrder[mismatchPoint + 1]) {
                console.log('second');
                nameId = newIdOrder[mismatchPoint];
                newRank = mismatchPoint + 1;
            } else {
                console.log('else');
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