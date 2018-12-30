FROM backend_image

# create user and run app
# not as root!

RUN apt-get update && apt-get install -y supervisor

RUN pip install celery==4.2.0
RUN pip install flower==0.9.2

RUN mkdir -p /var/logs/ && touch /var/logs/celery.log
RUN mkdir -p /var/log/supervisor
RUN rm -f /code/celerybeat.pid

COPY config/* /code/config/celery/
COPY supervisor/supervisord.conf /etc/supervisor/
COPY supervisor/celery_worker.conf /etc/supervisor/conf.d/
COPY supervisor/celery_flower.conf /etc/supervisor/conf.d/
COPY supervisor/celery_beat.conf /etc/supervisor/conf.d/

CMD supervisord -c /etc/supervisor/supervisord.conf
