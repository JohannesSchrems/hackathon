var content = $("body").not("#eexcess_sidebar");
content.css({cursor: 'pointer'});


$("body").not("#eexcess_sidebar").click(function (e) {


    var range = window.getSelection() || document.getSelection() || document.selection.createRange();
    var word = $.trim(range.toString());

    if (word != '') {
        alert(word);
    }
    range.collapse(range.anchorNode, range.anchorOffset);
    e.stopPropagation();

});










