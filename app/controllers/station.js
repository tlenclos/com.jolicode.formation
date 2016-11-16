// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.title.text = args.title || 'Default title';

$.title.addEventListener('click', function(e) {
    $.secondView.close();
});

exports.updateTitle = function(title) {
    $.title.text = title;
};
