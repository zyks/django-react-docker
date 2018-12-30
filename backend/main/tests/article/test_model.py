from django.test import TestCase
from django.db.utils import DataError
from main.models import Article, Comment
from ..utils import create_article, create_comment


# TODO: use mommy make


class ArticleModelTest(TestCase):

    def test_objects_create_adds_table_row(self):
        create_article()
        self.assertEqual(Article.objects.count(), 1)

    def test_author_constraint_valid(self):
        create_article(author='a' * 50)
        self.assertEqual(Article.objects.count(), 1)

    def test_author_constraint_invalid(self):
        with self.assertRaises(DataError):
            create_article(author='a' * 51)

    def test_title_constraint_valid(self):
        create_article(title='t' * 100)
        self.assertEqual(Article.objects.count(), 1)

    def test_title_constraint_invalid(self):
        with self.assertRaises(DataError):
            create_article(title='t' * 101)

    def test_content_constraint_valid(self):
        create_article(content='c' * 1000)
        self.assertEqual(Article.objects.count(), 1)

    def test_content_constraint_invalid(self):
        with self.assertRaises(DataError):
            create_article(content='c' * 1001)

    def test_deleting_article_deletes_comments(self):
        article = create_article()
        create_comment(article=article)
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(Comment.objects.count(), 1)
        article.delete()
        self.assertEqual(Article.objects.count(), 0)
        self.assertEqual(Comment.objects.count(), 0)
