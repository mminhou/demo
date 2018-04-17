from rest_framework import serializers
from re
t_framework import permissions
import base64


from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from dino.models import Post, Comment ,EtcImage, Favorite
from rest_framework.fields import CurrentUserDefault


# ----------------------------------------------------------------------------------------------------------------------

class EtcImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EtcImage
        fields = ('id', 'mainImage')


# ----------------------------------------------------------------------------------------------------------------------

# Custom image field - handles base 64 encoded images
# 이거 그냥 오류 수정됐는데 보니까 이 아래 base64안에서 request data 받으면 자동으로 변환시켜서 이름까지 지어서 저장해주는듯 왜 이게 되는지는 모르겠다 ㅜㅜㅜ 공부하자
class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        from django.utils import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension == "pdf"

        return extension

from django.utils import six
class MyPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return value.__unicode__()


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    comment = serializers.CharField(required=True)
    post = serializers.ReadOnlyField(source='post.id')
    owner = serializers.ReadOnlyField(source='owner.username')

    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment

    class Meta:
        model = Comment
        fields = ('id', 'owner', 'post', 'comment')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    mainImage = Base64ImageField(required=True)
    title = serializers.CharField(required=True)
    snippet = serializers.CharField(required=True)
    country = serializers.CharField()
    owner = serializers.ReadOnlyField(source='owner.username')
    comments = CommentSerializer(many=True, required=False)
    favorite = serializers.PrimaryKeyRelatedField(many=True, queryset=Favorite.objects.all(), required=False)

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

    class Meta:
        model = Post
        fields = ('id', 'url', 'owner', 'mainImage', 'title', 'country', 'snippet', 'created', 'comments', 'favorite')

class FavoriteSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # post = serializers.ReadOnlyField(source='post.id')
    post = PostSerializer()

    def create(self, validated_data):
        favorite = Favorite.objects.create(**validated_data)
        return favorite

    class Meta:
        model = Favorite
        fields = ('id', 'owner', 'post')


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    password = serializers.CharField(required=True, min_length=8)
    email = serializers.EmailField(required=True)
    # create user -> check = http POST http://127.0.0.1:8000/users/ username=... password=...
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all(), required=False)
    comments = CommentSerializer(many=True, required=False)
    favorite = FavoriteSerializer(many=True, required=False)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'password', 'email', 'posts', 'comments', 'favorite')



