import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ArticleList from './ArticleList';


const defaultProps = {
    articles: [
        { 
            author: 'Steve Jobs',
            title: 'Random quotes',
            content: 'I believe life is an intelligent thing: that things aren\'t random.',
            created_at: new Date(2018, 12, 29, 12, 0, 0),
            comments: [
                { author: 'Josef', content: 'I like that!', created_at: new Date() },
                { author: 'Estelle', content: 'Cool stuff.', created_at: new Date() },
            ]
        },
        { 
            author: 'Richard Dawkins',
            title: 'Random quotes part 2',
            content: 'Natural selection is anything but random.',
            created_at: new Date(2018, 12, 29, 14, 0, 0),
            comments: [
                { author: 'Lorenzo', content: 'Not this time bro', created_at: new Date() },
            ]
        },
    ]
};

const TestArticleList = (props) =>  
    <ArticleList
        {...defaultProps}
        {...props}
    />;


it('renders without crashing', () => {
    mount(<TestArticleList />);
});


it('renders all articles', () => {
    const component = mount(<TestArticleList />);
    const wrapperDiv = component.find("div").first();
    expect(wrapperDiv.children()).toHaveLength(defaultProps.articles.length);
});


it('passess correct props to all articles', () => {
    const component = mount(<TestArticleList />);
    const children = component.find("div").first().children();
    for (let i = 0; i < defaultProps.articles.length; i++) {
        const article = defaultProps.articles[i];
        expect(children.at(i).props()).toHaveProperty('author', article.author);
        expect(children.at(i).props()).toHaveProperty('title', article.title);
        expect(children.at(i).props()).toHaveProperty('content', article.content);
        expect(children.at(i).props()).toHaveProperty('created_at', article.created_at);
        expect(children.at(i).props()).toHaveProperty('comments', article.comments);
    }
});
