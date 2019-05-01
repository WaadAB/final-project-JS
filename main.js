$(document).ready(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var booktitle = $('#booktitle').val();
        $('#booktitle').val("");
        var links = 'https://www.googleapis.com/books/v1/volumes?q=' + booktitle;
        $('.result').empty();
        var listItems = [];
        $.ajax({
            method: 'GET',
            url: links,
            success: function (event) {
                for (var i = 0; i < event.items.length; i++) {
                    $('.result').css('background-color', 'black');
                    $('.result').css('opacity', '0.8');
                    $('.result').append($('<img>').attr('src', event.items[i].volumeInfo.imageLinks.smallThumbnail));
                    $('.result').append($('<p></p>').text("Title :" + event.items[i].volumeInfo.title).addClass('title'));
                    $('.result').append($('<p></p>').text("Author  :" + event.items[i].volumeInfo.authors).addClass('author'));
                    $('.result').append($('<p></p>').text("Category :" + event.items[i].volumeInfo.categories).addClass('category'));
                    $('.result').append($('<p></p>').text("Description :" + event.items[i].volumeInfo.description).addClass('des'));
                    $('.result').append($('<p></p>').text("Average Rating :" + event.items[i].volumeInfo.averageRating).addClass('rate'));
                    //  $('.result').append($('<p></p>').text("Total Price :" + event.items[i].saleInfo.listPrice.amount+event.items[i].saleInfo.listPrice.currencyCode));
                    var link = event.items[i].saleInfo.buyLink;
                    if (typeof (link) !== "undefined") {
                        $('<a></a>').attr('href', event.items[i].saleInfo.buyLink).text('BuyBook').appendTo('.result');
                    }
                    else{console.log("error");}
                    $('.result').append($('<button></button>').text("Like").addClass('like'));
                    
                    $('.like').on('click',function (event){
                        event.preventDefault();
                        console.log(('.title').text());
                        listItem.append($('<li><li/>').text(('.title').text()));
                        
                     });
                }
            },
            error: function (error) {
                $('.result').append($('<p></p>').text("Sorry, no information is avalible ..."));}
            
        });
        
        
       /* $('img').hover(function (){
           $('ul').append($('<li><li/>').text(('.title').val()));
           console.log($('ul');
        });*/
       
    });
    
})
