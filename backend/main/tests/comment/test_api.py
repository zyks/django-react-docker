from rest_framework import status
from rest_framework.test import APITestCase
from main.models import Article, Comment
from ..utils import create_comment, get_comment_data, get_values_set


class CommentAPITestCase(APITestCase):

    url = '/api/main/comment/'


class CommentAPIFormatTest(CommentAPITestCase):

    def test_api_returns_200(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_returns_json_list(self):
        response = self.client.get(self.url)
        self.assertIsInstance(response.data, list)

    def test_api_returns_empty_list(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 0)


class CommentAPIContentTest(CommentAPITestCase):

    def setUp(self):
        self.comment1 = create_comment(content="test 1")
        self.comment2 = create_comment(content="test 2")

    def test_api_returns_2_comments(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)

    def test_api_returns_correct_comments(self):
        response = self.client.get(self.url)
        self.assertSetEqual(
            get_values_set(response, 'content'),
            {'test 1', 'test 2'},
        )

    def test_api_returns_newly_created_comment(self):
        create_comment(content="test 3")
        response = self.client.get(self.url)
        self.assertSetEqual(
            get_values_set(response, 'content'),
            {'test 1', 'test 2', 'test 3'},
        )


class CommentAPICreateTest(CommentAPITestCase):

    # id (pk) should not be send in response
    # TODO: add unique public value
    def test_valid_post_creates_db_record(self):
        data = get_comment_data()
        article_url = '/api/main/article/'
        response = self.client.post(article_url, data=data.pop('article'))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data['article'] = response.data.get('id')
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(Comment.objects.count(), 1)
