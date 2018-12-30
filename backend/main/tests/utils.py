from main.models import Article, Comment


def get_article_data(author='author', title='title', content='content'):
    return {
        'author': author,
        'title': title,
        'content': content,
    }


def get_comment_data(author='author', content='content', **kwargs):
    return {
        'author': author,
        'content': content,
        'article': get_article_data(**kwargs),
    }


def create_article(**kwargs):
    return Article.objects.create(**get_article_data(**kwargs))


def create_comment(article=None, **kwargs):
    data = get_comment_data(**kwargs)
    article_data = data.pop('article')
    if article is None:
        article = create_article(**article_data)
    return Comment.objects.create(**data, article=article)


def get_values_set(response, key):
    return set(map(lambda a: a.get(key, None), response.data))
