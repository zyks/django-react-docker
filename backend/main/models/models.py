from django.db import models


class Article(models.Model):
    author = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    author = models.CharField(max_length=50)
    content = models.CharField(max_length=200)
    article = models.ForeignKey(Article, null=False, related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
