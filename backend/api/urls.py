import main.api.urls
from django.conf.urls import include, url


urlpatterns = [
    url(r'main/', include(main.api.urls)),
]
