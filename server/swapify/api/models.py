from django.db import models

class UserInfo(models.Model):
    username = models.CharField(max_length=200, null=False, blank=False, unique=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    phone = models.CharField(max_length=50, default='', null=False, blank=False)
    password = models.CharField(max_length=200, null=False, blank=False)
    last_login = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'userinfo'


    def __str__(self):
        return self.username


