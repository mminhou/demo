from rest_framework import viewsets
from rest_framework.views import APIView
# ----------------------------------------------------------

from dino.serializers import UserSerializer
from django.contrib.auth.models import User

# ----------------------------------------------------------

from dino.serializers import PostSerializer, CommentSerializer ,EtcImageSerializer, FavoriteSerializer
from dino.models import Post, Comment, EtcImage, Favorite

# ----------------------------------------------------------

class UsersViewSet(viewsets.ModelViewSet, APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# ----------------------------------------------------------
class EtcImageViewSet(viewsets.ModelViewSet):
    queryset = EtcImage.objects.all()
    serializer_class = EtcImageSerializer

# ----------------------------------------------------------
import os
from django.core.files import File

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # request header에 Authorization 라는 이름으로 id가 넘어오면 그걸 받아서 user query 해서 get 으로 user instance 가져옴
        user = User.objects.get(pk=self.request.META['HTTP_AUTHORIZATION'])
        serializer.save(owner=user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.META['HTTP_AUTHORIZATION'])
        serializer.save(owner=user)
        post_ = Post.objects.get(pk=self.request.data.get('post'))
        serializer.save(post=post_)



class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.META['HTTP_AUTHORIZATION'])
        serializer.save(owner=user)
        post_ = Post.objects.get(pk=self.request.data.get('post'))
        serializer.save(post=post_)

# ------------------- Token Customize ---------------------


