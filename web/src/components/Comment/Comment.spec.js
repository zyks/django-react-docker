import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Comment from './Comment';


const defaultProps = {
    author: 'Josef',
    content: 'I like that!',
    created_at: new Date(2018, 12, 29, 12, 0, 0),
};

const TestComment = (props) =>  
    <Comment
        {...defaultProps}
        {...props}
    />;


it('renders without crashing', () => {
    mount(<TestComment />);
});


it('renders correct data', () => {
    const component = mount(<TestComment />);
    expect(component.find('.commentAuthor').text()).toEqual(defaultProps.author);
    expect(component.find('.commentContent').text()).toEqual(defaultProps.content);
    expect(component.find('.commentTime').text()).toEqual(defaultProps.created_at.toUTCString());
});


it('renders custom timestamp', () => {
    const props = {
        dateFormatter: jest.fn(date => 'banananana'),
    }
    const component = mount(<TestComment {...props} />);
    expect(props.dateFormatter).toHaveBeenCalledTimes(1);
    expect(props.dateFormatter).toHaveBeenCalledWith(defaultProps.created_at);
    expect(component.find('.commentTime').text()).toEqual('banananana');
});
