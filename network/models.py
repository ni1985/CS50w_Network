from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import ModelForm


class User(AbstractUser):
    pass


class Post(models.Model):
    creator = models.ForeignKey(
        User,
        on_delete = models.CASCADE)#,
        #related_name='creator')
    post_text = models.TextField()
    post_time = models.DateTimeField(auto_now_add=True)
    post_likes = models.IntegerField(default=0)

    def __str__(self):
        return f"Post id {self.id}; User: {self.creator}; Likes: {self.post_likes}"


class Comments(models.Model):
    user_id = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name='commenter')
    post_id = models.ForeignKey(
        Post,
        on_delete = models.CASCADE)
    date_time = models.DateTimeField(auto_now_add=True)
    comment_text = models.TextField()

    def __str__(self):
        return f"Comment: {self.id}, User: {User.commenter}"


class Follow(models.Model):
    user_id = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name='follows')
    subscribed = models.ManyToManyField(
        User,
        blank = True,
        related_name='followed')

# MOVED to forms.py
# class PostForm(ModelForm):
#    class Meta:
#        model = Post
#        fields = ['post_text']
