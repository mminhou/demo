"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from django.conf.urls.static import static
from django.conf import settings

from rest_framework import routers
from dino.views import UsersViewSet, PostViewSet, CommentViewSet ,EtcImageViewSet, FavoriteViewSet
# ----------------------------------------------------------

# django rest framework jwt auth
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'etcImage', EtcImageViewSet)
# ----------------------------------------------------------
router.register(r'posts', PostViewSet)
router.register(r'users', UsersViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'favorites', FavoriteViewSet)



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = \
    [
        url(r'^admin/', admin.site.urls),
        url(r'^', include(router.urls)),

        # authentication api -> return token // curl -X POST -d "username=alsgh1003&password=minho2736" http://127.0.0.1:8000/api-token-auth/
        # more information http://getblimp.github.io/django-rest-framework-jwt/
        url(r'^api-token-auth/', obtain_jwt_token),     # execute https

        # api web view 에 login 생성
        url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
