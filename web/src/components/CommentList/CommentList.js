import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';


class CommentList extends Component {

    static propTypes = {
        comments: PropTypes.arrayOf(PropTypes.object),
    }

    static defaultProps = {
        comments: [],
    }

    render() {
        const comments = this.props.comments;

        return (
            <div>
            { 
                comments.map((comment, i) =>
                    <Comment 
                        key={ i } 
                        author={ comment.author } 
                        content={ comment.content}
                        created_at={ comment.created_at }
                    />
                )
            }
            </div>
        );
    }

}


export default CommentList;
