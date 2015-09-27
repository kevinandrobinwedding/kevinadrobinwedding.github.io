function sendMail() {


    var f = {
        email: $('.js-input-email').val(),
        fullName: $('.js-input-full-name').val(),
        guestCount: $('.js-input-guest-count').val(),
        specialRequest: $('.js-input-special-request').val()
    };

    console.log("sendMail! form:" + JSON.stringify(f));

    var htmlMessage = "<h1>RSVP</h1>";
    htmlMessage += "<p><strong>" + f.fullName + "</strong> has confirmed RSVP with " + f.guestCount + " guests.</p>";
    if (f.specialRequest) {
        htmlMessage += "<h3>Special Request</h3>";
        htmlMessage += "<p>" + f.specialRequest + "</p>";
    }

    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            'key': 'roWF2NuO5IcYGL_K_Fe6wg',
            'message': {
                'from_email': f.email,
                'to': [
                    {
                        'email': 'wedding@kevinandrobinwedding.com',
                        'name': 'Kevin and Robin Wedding',
                        'type': 'to'
                    }
                ],
                'subject': 'Wedding RSVP - ' + f.fullName,
                'html': htmlMessage
            }
        }
    })
        .done(function () {
            console.log("success");
            $('.js-rsvp-form').addClass('hidden');
            $('.js-rsvp-confirmation').removeClass('hidden');
        })
        .fail(function (e) {
            console.log("error:" + JSON.stringify(e));
        });
}

$('.js-rsvp-button').on('click', function () {
    sendMail();
    return false;
});

$(document).ready(function () {

    console.log("main scripts loaded!");

});



