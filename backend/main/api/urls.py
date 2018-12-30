from django.conf.urls import include, url
from rest_framework import routers
from .views import ArticleViewSet, CommentViewSet


router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet)
router.register(r'comment', CommentViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]
