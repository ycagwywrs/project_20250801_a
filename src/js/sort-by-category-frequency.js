$(function() {
    const currentPath = window.location.pathname;

    const currentCategories = $('div.mainpart ul li button').map(function() {
        return $(this).attr('class');
    }).get();

    let articleList = [];

    $('div.list > ul > li').each(function() {
        const $this = $(this);
        const $link = $this.find('a');
        const articleHref = $link.attr('href');

        if (articleHref === currentPath) {
            $this.hide();
            return;
        }
        let score = 0;
        const targetCategories = $this.find('button').map(function() {
            return $(this).attr('class');
        }).get();

        targetCategories.forEach(function(cat) {
            if (currentCategories.includes(cat)) {
                score++;
            }
        });

        articleList.push({
            element: $this,
            score: score
        });

        $this.hide();
    });

    articleList.sort(function(a, b) {
        return b.score - a.score;
    });
    const $container = $('div.list > ul');
    const displayLimit = 3;

    articleList.slice(0, displayLimit).forEach(function(item) {
        item.element.show();
        $container.append(item.element); 
    });
});
