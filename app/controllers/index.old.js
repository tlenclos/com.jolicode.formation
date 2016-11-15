// Init
var articles = Alloy.createCollection('article');
var listItems = [];

var addButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.ADD });
addButton.addEventListener('click', function() {
    var article1 = Alloy.createModel('article', {
        title: "Article " + Math.random(),
        content: "Lorem ipsum dolor sit amet",
        published: true
    });
    article1.save();

    listItems.push({
        template: article1.get('published') ? 'templateArticlePublished' : 'templateArticleUnpublished',
        title: {
            text: article1.get('title')
        },
        content: {
            text: article1.get('content')
        }
    });
    $.list.sections[0].items = listItems;
});
$.window.setRightNavButtons([addButton])

// Fetch articles
articles.fetch();
articles.each(function(model) {
    listItems.push({
        template: model.get('published') ? 'templateArticlePublished' : 'templateArticleUnpublished',
        title: {
            text: model.get('title'),
            color: 'blue'
        },
        content: {
            text: model.get('content')
        }
    });
});

$.list.sections[0].items = listItems;
$.index.open();

// Open controller
/*
 $.myBtn.addEventListener('click', function(e) {
 var newController = Alloy.createController('secondView', {title: 'Titre deuxième vue'});
 newController.getView().open({modal: true});
 });
 */

// Alloy models
/*
var article1 = Alloy.createModel('article', {
    title: "Article 1",
    content: "Lorem ipsum dolor sit amet",
    published: true
});
console.log('article.save()', article1.save());

var articles = Alloy.createCollection('article');
articles.fetch({
    query: 'SELECT * FROM article WHERE published = 1'
});

console.log('articles', articles.toJSON());
*/
