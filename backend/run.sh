#!/bin/bash

export DJANGO_SETTINGS_MODULE=config.settings.production

echo "----> Migrating..."
python /code/manage.py migrate

echo "----> Check ongoing..."
python /code/manage.py check

echo "----> Starting application..."
/usr/local/bin/uwsgi --ini /code/config/uwsgi.ini
