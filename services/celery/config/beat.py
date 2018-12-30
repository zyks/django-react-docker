"""
Additional place for scheduling Celery tasks using crontab.
"""
from celery.schedules import crontab


CELERYBEAT_SCHEDULE = {
    'create_article': {
        'task': 'main.tasks.model.create_article',
        'schedule': 30.0,
        'options': {'queue': 'celerybeat_periodic'},
    },
    'create_comment': {
        'task': 'main.tasks.model.create_comment',
        'schedule': 30.0,
        'options': {'queue': 'celerybeat_periodic'},
    },
    'delete_all_articles': {
        'task': 'main.tasks.model.delete_all_articles',
        'schedule': 300.0,
        'options': {'queue': 'celerybeat_periodic'},
    }
}
