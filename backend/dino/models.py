from django.db import models
from django.conf import settings

class EtcImage(models.Model):
    mainImage = models.ImageField('Main Image')


# ----------------------------------------------------------------------------------------------------------------------

class Post(models.Model):
    mainImage = models.ImageField('Main Image')
    title = models.CharField(max_length=100)
    snippet = models.CharField(max_length=500)
    country = models.CharField(max_length=100, default=False)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)



    def save(self, *args, **kwargs):
        super(Post, self).save(*args, **kwargs)

class Comment(models.Model):
    comment = models.CharField(max_length=300)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey('auth.User', related_name='comments', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super(Comment, self).save(*args, **kwargs)


class Favorite(models.Model):
    post = models.ForeignKey('Post', related_name="favorite", on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey('auth.User', related_name="favorite", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super(Favorite, self).save(*args, **kwargs)
