import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comment.css';


class Comment extends Component {

    static propTypes = {
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.instanceOf(Date).isRequired,
        dateFormatter: PropTypes.func,
    };

    static defaultProps = {
        dateFormatter: date => date.toUTCString(),
    };

    render() {
        const { author, content, created_at, dateFormatter } = this.props;

        return (
            <div className="comment">
                <div className="commentHeader">
                    <span className="commentAuthor">{ author }</span> says:
                    <span className="commentTime">
                        { dateFormatter ? dateFormatter(created_at) : this.dateFormatter(created_at) }
                    </span>
                </div>
                <div className="commentContent">{ content }</div>
            </div>
        );
    }

}


export default Comment;
