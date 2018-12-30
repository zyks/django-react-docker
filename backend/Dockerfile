FROM python:3.6


ENV DJANGO_SETTINGS_MODULE config.settings.production

RUN pip install uwsgi==2.0.17.1
RUN pip install uwsgitop==0.10
# TODO: install uwsgi emperor

COPY requirements /code/requirements
RUN pip install -r /code/requirements/base.txt

COPY config/local.sample.env /code/config/local.env
COPY . /code

RUN /code/manage.py collectstatic --noinput

EXPOSE 8000
CMD /code/run.sh
