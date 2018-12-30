import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Article from '../Article/Article';


class ArticleList extends Component {

    static propTypes = {
        articles: PropTypes.arrayOf(PropTypes.object),
    }

    static defaultProps = {
        articles: [],
    }

    render() {
        const articles = this.props.articles;

        return (
            <div>
            { 
                articles.map((article, i) =>
                    <Article 
                        key={ i } 
                        author={ article.author }
                        title={ article.title }
                        content={ article.content }
                        created_at={ article.created_at }
                        comments={ article.comments }
                    />
                )
            }
            </div>
        );
    }

}


export default ArticleList;
