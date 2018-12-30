from datetime import datetime
from .base import *


# override database settings for tests etc.
# it is important to run test on PostgreSQL because
# SQLite doesn't respect char length constraints
DATABASES = {
    'default': default_psql,
}

DATABASES['default']['HOST'] = 'localhost'
DATABASES['default']['NAME'] += f'_{datetime.now()}'
