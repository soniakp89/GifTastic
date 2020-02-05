
$(function(){
    renderButtons(topics, 'searchButton', '#buttons')
    console.log("page");
 })
 
 
 // array of search topics
 var topics = ["One Piece", 
               "Japanese anime", 
               "Naruto",
               "Sasuke",
               "Death Note", 
               "Bleach",  
               "Sakura",
               "Code Geass",
               "Black Clover",
               "One-Punch Man"];
 
 // functions to add buttons
 function renderButtons(topics, classToAdd, gifImages) {
    $(gifImages).empty();
    for(var i = 0; i < topics.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(gifImages).append(a);
    }
 }
 $(document).on('click', '.searchButton', function(){
    $('#searchData').empty();
    var type = $(this).data('type');
    var searchInput = $("#search-input").val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AFyjNUmhcWjBBAqIW15Sjq9FERyn0ukR&q=anime&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryURL,
        method: 'GET',
    })
    .done(function(response){
        console.log(response.data);
        for(var i = 0; i < response.data.length; i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $("<p>").text('Rating: ' + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searchData').append(searchDiv);
        }
        
    })
 })

 $(document).on('click', '.searchImage', function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
 })
 $('#addSearch').on('click', function(){
    var newSearch = $('input').eq(0).val();
    topics.push(newSearch);
    renderButtons(topics, 'searchButton', '#buttons');
    return false;
 })
 
