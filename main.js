$(document).ready(function () {
    var listItem=[];
   /* function renderItems() {
        if (localStorage.getItem('listItem') !== null) {
            listItem = JSON.parse(localStorage.getItem('listItem'));
            listItem.forEach(function (item) {
              $("<li></li>").text(item).appendTo($('#list'));
              $('#list').appendTo('.listContainer')
            })
            }
    }*/
   // renderItems();
   
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var booktitle = $('#booktitle').val();
        var links = 'https://www.googleapis.com/books/v1/volumes?q=' + booktitle;
        $('#booktitle').val("");
        $('.result').empty();
        
        $.ajax({
            method: 'GET',
            url: links,
            success: function (event) {
                for (var i = 0; i < event.items.length; i++) {
                    var $book = $('<div></div>').addClass('book');
                    $('.result').css('background-color', 'black');
                    $('.result').css('opacity', '0.8');
                    searchBook();
                    
                    
                    function searchBook() {
                        var srcPhoto = event.items[i].volumeInfo.imageLinks.smallThumbnail;
                        var titleBook = event.items[i].volumeInfo.title;
                        var authorName = event.items[i].volumeInfo.authors;
                        var categoryBook = event.items[i].volumeInfo.categories;
                        var descBook = event.items[i].volumeInfo.description;
                        var rateBook = event.items[i].volumeInfo.averageRating;
                        var link = event.items[i].saleInfo.buyLink;
                        assignValues(srcPhoto,titleBook,authorName,categoryBook,descBook,rateBook,link);
                        addToRead();}
                    

                    function assignValues(photo, nameBook, authName, categoryName, desc, rates, link) {
                        $book.append($('<img>').attr('src', photo));
                        $book.append($('<p></p>').text("Title :" + nameBook).addClass('title'));
                        $book.append($('<p></p>').text("Author  :" + authName).addClass('author'));
                        $book.append($('<p></p>').text("Category :" + categoryName).addClass('category'));
                        $book.append($('<p></p>').text("Description :" + desc).addClass('des'));
                        $book.append($('<p></p>').text("Average Rating :" + rates).addClass('rate'));
                        if (typeof (link) !== "undefined") {
                            $('<a></a>').attr('href', link).text('BuyBook').appendTo('.result');}
                        else { console.log("error"); }}
                    

                    function addToRead (){
                    $newLikeBtn = $('<button></button>').text("Add to list").addClass('like');
                    $newLikeBtn.on('click', function (event) {
                        var item = $(this).parent().children()[1].innerText;
                        localStorage.setItem('listItem', JSON.stringify(item));
                        listItem.push(item);
                        $("<li></li>").text(item).appendTo($('#list'));
                    });
                    $book.appendTo($('.result'));
                    $book.append($newLikeBtn);
                    }
                    

                   // renderItems();
                }
            },
            error: function (error) {
                $('.result').append($('<p></p>').text("Sorry, no information is avalible ..."));
            }

        });



    });
    
})
