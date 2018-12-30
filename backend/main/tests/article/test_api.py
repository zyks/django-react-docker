from rest_framework import status
from rest_framework.test import APITestCase
from main.models import Article, Comment
from ..utils import get_comment_data, get_values_set, create_article, get_article_data


class ArticleAPITestCase(APITestCase):

    url = '/api/main/article/'


class ArticleAPIFormatTest(ArticleAPITestCase):

    def test_api_returns_200(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_returns_json_list(self):
        response = self.client.get(self.url)
        self.assertIsInstance(response.data, list)

    def test_api_returns_empty_list(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 0)


class ArticleAPIContentTest(ArticleAPITestCase):

    def setUp(self):
        self.article1 = create_article(title="test 1")
        self.article2 = create_article(title="test 2")

    def test_api_returns_2_articles(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)

    def test_api_returns_correct_articles(self):
        response = self.client.get(self.url)
        self.assertSetEqual(
            get_values_set(response, 'title'),
            {'test 1', 'test 2'},
        )

    def test_api_returns_newly_created_article(self):
        create_article(title="test 3")
        response = self.client.get(self.url)
        self.assertSetEqual(
            get_values_set(response, 'title'),
            {'test 1', 'test 2', 'test 3'},
        )


class ArticleAPICreateTest(ArticleAPITestCase):

    def test_valid_post_creates_db_record(self):
        data = get_article_data()
        self.assertEqual(Article.objects.count(), 0)
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 1)

    def test_article_post_does_not_create_comment(self):
        data = get_article_data()
        comment = get_comment_data()
        comment.pop('article')
        data['comments'] = [comment]
        self.assertEqual(Article.objects.count(), 0)
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(Comment.objects.count(), 0)
