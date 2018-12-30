import axios from 'axios';


class ArticleService {

    static get url() {
        return '/api/main/article/';
    }

    static getArticles() {
        return axios.get(this.url);
    }

}


export default ArticleService;
