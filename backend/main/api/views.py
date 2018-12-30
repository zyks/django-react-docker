from rest_framework.viewsets import ModelViewSet
from ..models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
