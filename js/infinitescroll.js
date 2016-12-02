$(window).scroll(function() {
    // get current scroll top in px, add window height and
    // check if this is greater than the document height minus 300
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
        loadMoreContent();
    }
});

function loadMoreContent() {
    // there should be a button, which leads to next posts
    var next = $("a.next").first();
    next.each(function(key, value) {
        var url = $(value).attr('href');
        // remove button, so we can't load multiple times
        next.remove();
        // adding a temp. dom object to load the next page
        var list = $("<div></div>");
        // call load method and get the div.post-list node
        list.load(url + " div.post-list", function(response, status, xhr) {
            // check if we doesn't get any error
            if ( status != "error" ) {
                // copy all childrens of our temp container to the real container
                // note: jQuery load will copy the div.post-list node as well,
                // so use the childrens and move them
                var container = $("div.post-list");
                list.children("div.post-list").children().each(
                    function(key, value){
                        container.append(value);
                    }
                );
            }
        });
    });
}
