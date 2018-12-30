import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Article from './Article';


const defaultProps = {
    author: 'Steve Jobs',
    title: 'Random quotes',
    content: 'I believe life is an intelligent thing: that things aren\'t random.',
    created_at: new Date(2018, 12, 29, 12, 0, 0),
};

const TestArticle = (props) =>  
    <Article
        {...defaultProps}
        {...props}
    />;


it('renders without crashing', () => {
    mount(<TestArticle />);
});


it('renders correct data', () => {
    const component = mount(<TestArticle />);
    expect(component.find('.articleAuthor').text()).toEqual(defaultProps.author);
    expect(component.find('.articleTitle').text()).toEqual(defaultProps.title);
    expect(component.find('.articleContent').text()).toEqual(defaultProps.content);
    expect(component.find('.articleTime').text()).toContain(defaultProps.created_at.toDateString());
});


it('strips trailing dot from title', () => {
    const title = 'Some random title';
    const component = mount(<TestArticle title={ title + '.' } />);
    expect(component.find('.articleTitle').text()).toEqual(title);
});


it('renders CommentList component with default props', () => {
    const component = mount(<TestArticle />);
    const commentList = component.find('CommentList').first();
    expect(commentList.props()).toHaveProperty('comments', []);
});


it('renders CommentList component with given props', () => {
    const comments = [{ author: 'a', content: 'c', created_at: new Date() }];
    const component = mount(<TestArticle comments={ comments } />);
    const commentList = component.find('CommentList').first();
    expect(commentList.props()).toHaveProperty('comments', comments);
});


it('renders custom timestamp', () => {
    const props = {
        dateFormatter: jest.fn(date => 'banananana'),
    }
    const component = mount(<TestArticle {...props} />);
    expect(props.dateFormatter).toHaveBeenCalledTimes(1);
    expect(props.dateFormatter).toHaveBeenCalledWith(defaultProps.created_at);
    expect(component.find('.articleTime').text()).toContain('banananana');
});
