from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static

from api import views
from rest_framework.routers import DefaultRouter

from django.contrib.auth.views import LogoutView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('teacher',views.TeacherView,basename='teacher')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
    path('api/student/',views.StudentView.as_view()),

    path('api/register/student/', views.register_student, name='register_student'),
    path('api/register/teacher/', views.register_teacher, name='register_teacher'),

    path('api/logout/',LogoutView.as_view()),

    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/groups/', views.get_user_groups, name='get_user_groups'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#i made all of this shite


