from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import ModelForm


class User(AbstractUser):
    pass


class Post(models.Model):
    creator = models.ForeignKey(
        User,
        on_delete = models.CASCADE)
    post_text = models.TextField()
    post_time = models.DateTimeField(auto_now_add=True)
    #post_likes = models.IntegerField(default=0)
    likes = models.ManyToManyField(
        User,
        blank = True,
        related_name = 'Likes'
    )

    def count_likes(self):
        return str(self.likes.count())

    def __str__(self):
        return f"Post id {self.id}; User: {self.creator}; Likes: {self.count_likes()}"


#class Comments(models.Model):
#    user_id = models.ForeignKey(
#        User,
#        on_delete = models.CASCADE,
#        related_name='commenter')
#    post_id = models.ForeignKey(
#        Post,
#        on_delete = models.CASCADE)
#    date_time = models.DateTimeField(auto_now_add=True)
#    comment_text = models.TextField()

#    def __str__(self):
#        return f"Comment: {self.id}, User: {User.commenter}"


class Follow(models.Model):
    # user who follow
    user_id = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name='follows')
    # user who is being followed
    subscribed = models.ManyToManyField(
        User,
        blank = True,
        related_name='followed')

#class Likes(models.Model):
#    user_id = models.ForeignKey(
#        User,
#        on_delete = models.CASCADE,
#        related_name='like')
#    post_id = 
    

# MOVED to forms.py
# class PostForm(ModelForm):
#    class Meta:
#        model = Post
#        fields = ['post_text']
