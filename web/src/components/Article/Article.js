import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentList from '../CommentList/CommentList';
import './Article.css';


class Article extends Component {

    static propTypes = {
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.instanceOf(Date).isRequired,
        dateFormatter: PropTypes.func,
        comments: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        dateFormatter: date => date.toDateString(),
        comments: [],
    };

    stripTrailingDot(text) {
        if (text[text.length - 1] === ".")
            return text.slice(0, -1);
        return text;
    }

    render() {
        const { author, title, content, created_at, dateFormatter, comments } = this.props;

        return (
            <div className="article">
                <div className="articleTime">
                    <i>Created On</i>
                    { dateFormatter ? dateFormatter(created_at) : this.dateFormatter(created_at) }
                </div>
                <div className="articleTitle">
                    { this.stripTrailingDot(title) }
                </div>
                <div>by <span className="articleAuthor">{ author }</span></div>
                <hr></hr>
                <div className="articleContent">{ content }</div>
                <div className="commentList">
                    <CommentList comments={ comments }/>
                </div>
            </div>
        );
    }

}


export default Article;
