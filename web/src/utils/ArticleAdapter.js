/**
 * ArticleAdapter parses API response and adapts it 
 * to format consumed by ArticleList component
 * 
 * It modifies (mutates) given objects and arrays
 */

class ArticleAdapter {

    static parseResponseData(data) {
        for (let article of data)
            this.parseArticle(article);
        return data;
    }

    static parseArticle(article) {
        article.created_at = new Date(article.created_at);
        for (let comment of article.comments)
            this.parseComment(comment);
        return article;
    }

    static parseComment(comment) {
        comment.created_at = new Date(comment.created_at);
        return comment;
    }

}


export default ArticleAdapter;
