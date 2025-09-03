from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-s!0*77)8i1o+n035@g2l(tlislyx6r)$bu2875p%b17buz#pu&')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split(',')


# Application definition

INSTALLED_APPS = [
]

ROOT_URLCONF = 'API.urls'

WSGI_APPLICATION = 'API.wsgi.application'


# Database
# Supabase usa PostgreSQL
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='postgres'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='db.xxxxx.supabase.co'),
        'PORT': config('DB_PORT', default='5432'),
    }
}
