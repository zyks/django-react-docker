import os
from celery import Celery
from .beat import CELERYBEAT_SCHEDULE


APP_NAME = "backend_app_celery"
BROKER_HOST = "rabbitmq"
BROKER_PORT = 5672
BROKER_URL = f'amqp://{BROKER_HOST}:{BROKER_PORT}'
config = {
    'CELERY_BROKER_URL': BROKER_URL,
    'CELERY_RESULT_BACKEND': BROKER_URL,
    'CELERY_IMPORTS': ("main.tasks", ),
    'CELERY_TASK_RESULT_EXPIRES': 300,
    'CELERY_AMQP_TASK_RESULT_EXPIRES': 10,
}

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
celery_app = Celery(APP_NAME, broker=BROKER_URL)
celery_app.conf.update(config)
celery_app.conf.CELERYBEAT_SCHEDULE = CELERYBEAT_SCHEDULE
