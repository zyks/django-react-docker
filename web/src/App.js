import React, { Component } from 'react';
import ArticleList from './components/ArticleList/ArticleList';
import ArticleService from './utils/ArticleService';
import ArticleAdapter from './utils/ArticleAdapter';
import './App.css';


class App extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
        }
    }

    componentDidMount() {
        this.getArticles();
        const refreshRate = 20000; // 20s
        setInterval(this.getArticles, refreshRate);
    }

    getArticles = async () => {
        try {
            const response = await ArticleService.getArticles();
            const articles = ArticleAdapter.parseResponseData(response.data);
            this.setState({ articles: articles });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="App">
                <h3>All articles:</h3>
                <ArticleList articles={ this.state.articles }/>
            </div>
        );
    }
}


export default App;
