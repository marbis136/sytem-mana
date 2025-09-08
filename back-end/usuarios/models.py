from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from roles.models import RolUsuario
from almacenes.models import Almacen
from estados.models import EstadoGeneral


class UsuarioManager(BaseUserManager):
    def create_user(self, login, password=None, **extra_fields):
        if not login:
            raise ValueError('El usuario debe tener un login')
        user = self.model(login=login, **extra_fields)
        user.set_password(password)  # encripta la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, login, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(login, password, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=100)
    apellido_materno = models.CharField(max_length=100, null=True, blank=True)
    ci = models.CharField(max_length=20, unique=True)
    correo = models.EmailField(unique=True, null=True, blank=True)
    foto_usuario = models.TextField(null=True, blank=True)

    login = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)

    rol = models.ForeignKey(RolUsuario, on_delete=models.SET_NULL, null=True, blank=True)
    almacen = models.ForeignKey(Almacen, null=True, blank=True, on_delete=models.SET_NULL)
    estado = models.ForeignKey(EstadoGeneral, on_delete=models.SET_NULL, null=True, blank=True)

    fecha_registro = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['nombre', 'apellido_paterno', 'ci']

    objects = UsuarioManager()

    def __str__(self):
        return self.login
