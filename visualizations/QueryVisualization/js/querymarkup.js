var content = $("body").not("#eexcess_sidebar");
content.css({cursor: 'pointer'});


$("body").not("#eexcess_sidebar").dblclick(function (e) {
    var selection = window.getSelection() || document.getSelection() || document.selection.createRange();
    var word = $.trim(selection.toString());
    if (word != '') {
        var range = selection.getRangeAt(0);
        var span = document.createElement("span");
        span.className = "selected";
        range.surroundContents(span);
    }
    selection.collapse(selection.anchorNode, selection.anchorOffset);
    e.stopPropagation();
});

$("body").on("click", ".selected", function () {
    $(this).css("background-color", $('body').css('background-color'));
});

//SearchResultList.loading() // call loading-method on search result list first (to show loading bar). Adapt variable name of the list!
//EEXCESS.messaging.callBG({method: {parent: 'model', func: 'query'}, data: {reason: {reason: 'manual'}, terms: query}); // issue query










