var EEXCESS = EEXCESS || {};

EEXCESS.searchResults = EEXCESS.searchResultList($('#eexcess_content'));

/**
 * Updates the widget's view with the current state of the model in the background script
 * @memberOf EEXCESS
 * @param {Object} widget The current state of the widget model in the background script
 */
EEXCESS.update = function(widget) {
    if (widget.results.query === 'Search') {
        $('#eexcess_query').attr('placeholder', widget.results.query);
    } else {
        $('#eexcess_query').val(widget.results.query);
    }
};

EEXCESS.newSearchTriggered = function(data) {
    $('#eexcess_query').val(data.query);
};


/**
 * Initializes the widget's view with the current state of the widget in the background script's model
 * @memberOf EEXCESS
 * @param {Object} widget The current state of the widget's model in the background script
 */
EEXCESS.init = function(widget) {
    $('#eexcess_query').val(widget.results.query);

    $('a.fancybox_link').click(function(evt) {
        evt.preventDefault();
        EEXCESS.messaging.callBG({method: 'fancybox', data: 'chrome-extension://' + EEXCESS.utils.extID + '/' + $(evt.target).parent('a').attr('href')});
    });

    $('#eexcess_hide_btn').click(function(evt){
        evt.preventDefault();
        EEXCESS.messaging.callBG({method: {parent:'model',func:'toggleVisibility'}, data:-1});
    });


    $('#eexcess_privacy').click(function(evt) {
        console.log("Click sent");
        evt.preventDefault();
        //console.log();
        EEXCESS.messaging.callBG({method: 'privacySandbox', data: 'chrome-extension://' + EEXCESS.utils.extID + '/' + $(evt.target).parent('a').attr('href')});
    });
    var form = $('#eexcess_searchForm');
    form.submit(function() {
        var query_string = $('#eexcess_query').val();
        if (query_string) {
            EEXCESS.searchResults.loading();
            var query_terms = query_string.split(' ');
            var query = [];
            for (var i = 0; i < query_terms.length; i++) {
                var tmp = {
                    weight: 1,
                    text: query_terms[i]
                };
                query.push(tmp);
            }
            EEXCESS.messaging.callBG({method: {parent: 'model', func: 'query'}, data: {reason: {reason: 'manual', text: $('#eexcess_query').val()}, terms: query}});
        }
        return false;
    });

    // Move me to a better location
    display_querycrumbs(d3.select("div#queryCrumbs"));
};


// Initalize the widget with the current state in the background script's model on execution of this script
EEXCESS.messaging.callBG({method: {parent: 'model', func: 'widget'}}, EEXCESS.init);


EEXCESS.messaging.listener(function(request, sender, sendResponse) {
    if (request.method !== 'privacySandbox' && request.method !== 'visibility' && request.method !== 'fancybox' && request.method !== 'getTextualContext' && request.method.parent !== 'results') {
        if (typeof request.method.parent !== 'undefined') {
            EEXCESS[request.method.parent][request.method.func](request.data);
        } else {
            EEXCESS[request.method](request.data);
        }
    }
});
