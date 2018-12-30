from celery import shared_task
from faker import Faker
from ..models import Article, Comment


fake = Faker('en_US')


@shared_task()
def create_article():
    Article.objects.create(
        author=fake.name()[:50],
        title=fake.sentence()[:100],
        content=fake.text(max_nb_chars=1000),
    )


@shared_task()
def create_comment():
    article = Article.objects.order_by("?").first()
    Comment.objects.create(
        author=fake.name()[:50],
        content=fake.sentence()[:200],
        article=article,
    )


@shared_task
def delete_all_articles():
    Article.objects.all().delete()
