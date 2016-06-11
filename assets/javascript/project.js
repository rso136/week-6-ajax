var emotions = ['happy', 'sad', 'excited', 'bored', 'shocked']; 

function makeButtons() {
	$('div#emotionButtons').empty();

	for (var i = 0; i < emotions.length; i++) {
		var b = $('<button>');
		b.addClass('emotion');
		b.attr('data-name', emotions[i]);
		b.text(emotions[i]);
		$('#emotionButtons').append(b);
	}
}

$('#submitEmotion').on('click', function() {
	var emotion = $('#emotion_input').val().trim();
	emotions.push(emotion);
	makeButtons();    
	return false;
})

$(document).on('click', '.emotion', function() {
	$("div#emotions").empty();
	var feelings = $(this).data('name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feelings + "&api_key=dc6zaTOxFJmzC&limit=10";

	 $.ajax({
            url: queryURL,
            method: 'GET'
            })
	 .done(function(response) {
		console.log(response);
		var results = response.data;

	for (var i = 0; i < results.length; i++) {
		 var p = $('<p>');
		 var imageDiv = $('<div>');
		 imageDiv.addClass('imageBox');

		(p).html('Rating: ' + results[i].rating);
		var emotionPic = $('<img>');
		emotionPic.addClass('emotionImage');
		emotionPic.attr('src', results[i].images.fixed_height_still.url);
		emotionPic.attr('data-still', results[i].images.fixed_height_still.url);
		emotionPic.attr('data-state', 'still');
		emotionPic.attr('data-animate', results[i].images.fixed_height.url);

		$(imageDiv).html(p);
		$(imageDiv).append(emotionPic);
		$("div#emotions").append(imageDiv);
	}

	})
})

$(document).on('click', '.emotionImage', function() {
		
		var state = $(this).attr('data-state'); 
		   
		    if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }

            else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
});

makeButtons();