from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        from django.contrib import admin
        admin.site.site_header = "Мой проект"
        admin.site.site_title = "Админ панель"
