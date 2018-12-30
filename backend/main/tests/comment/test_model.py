from django.test import TestCase
from django.db.utils import DataError
from main.models import Comment, Article
from ..utils import create_comment


# TODO: use mommy make


class CommentModelTest(TestCase):

    def test_objects_create_adds_table_row(self):
        create_comment()
        self.assertEqual(Comment.objects.count(), 1)

    def test_author_constraint_valid(self):
        create_comment(author='a' * 50)
        self.assertEqual(Comment.objects.count(), 1)

    def test_author_constraint_invalid(self):
        with self.assertRaises(DataError):
            create_comment(author='a' * 51)

    def test_content_constraint_valid(self):
        create_comment(content='c' * 200)
        self.assertEqual(Comment.objects.count(), 1)

    def test_content_constraint_invalid(self):
        with self.assertRaises(DataError):
            create_comment(content='c' * 201)

    def test_deleting_comment_does_not_delete_article(self):
        comment = create_comment()
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(Comment.objects.count(), 1)
        comment.delete()
        self.assertEqual(Article.objects.count(), 1)
        self.assertEqual(Comment.objects.count(), 0)
