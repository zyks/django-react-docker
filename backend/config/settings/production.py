import environ  # Usage of 12f settings pattern
from os.path import join, exists
from .base import *


env = environ.Env(
    DEBUG=(bool, False),
)

env_file = join(BASE_DIR, 'local.env')
if exists(env_file):
    environ.Env.read_env(str(env_file))
else:
    print(env_file, "does not exist", BASE_DIR)


DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY')

DATABASES = {
    # Raises ImproperlyConfigured exception if DATABASE_URL not in os.environ
    'default': env.db(),
}

ALLOWED_HOSTS = [
    'localhost',
    '0.0.0.0',
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

STATIC_ROOT = '/var/app/public/'
COMPRESS_ROOT = '/var/app/public/'
