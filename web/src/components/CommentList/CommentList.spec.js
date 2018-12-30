import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import CommentList from './CommentList';


const defaultProps = {
    comments: [
        { author: 'Josef', content: 'I like that!', created_at: new Date() },
        { author: 'Estelle', content: 'Cool stuff.', created_at: new Date() },
        { author: 'Lorenzo', content: 'Not this time bro', created_at: new Date() },
    ]
};

const TestCommentList = (props) =>  
    <CommentList
        {...defaultProps}
        {...props}
    />;


it('renders without crashing', () => {
    mount(<TestCommentList />);
});


it('renders all comments', () => {
    const component = mount(<TestCommentList />);
    const wrapperDiv = component.find("div").first();
    expect(wrapperDiv.children()).toHaveLength(defaultProps.comments.length);
});


it('passess correct props to all comments', () => {
    const component = mount(<TestCommentList />);
    const children = component.find("div").first().children();
    for (let i = 0; i < defaultProps.comments.length; i++) {
        const comment = defaultProps.comments[i];
        expect(children.at(i).props()).toHaveProperty('author', comment.author);
        expect(children.at(i).props()).toHaveProperty('content', comment.content);
        expect(children.at(i).props()).toHaveProperty('created_at', comment.created_at);
    }
});
