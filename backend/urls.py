from django.urls import path
from . import views
from . import legacy_views
from . import test_podio_views

app_name = 'backend'

urlpatterns = [
    path('', views.index, name='index'),
    # Frontend routes served by Django so direct navigation works
    path('global-volunteer/', views.index, name='global_volunteer'),
    path('global-talent/', views.index, name='global_talent'),
    path('global-teacher/', views.index, name='global_teacher'),
    path('member/', views.index, name='member'),
    path('api/health/', views.health_check, name='health_check'),
    path('api/check-email/', views.check_email, name='check_email'),
    path('api/submit-global-volunteer/', views.submit_global_volunteer, name='submit_global_volunteer'),
    path('api/submit-global-talent/', views.submit_global_talent, name='submit_global_talent'),
    path('api/submit-global-teacher/', views.submit_global_teacher, name='submit_global_teacher'),
    path('api/submit-member/', views.submit_member, name='submit_member'),
    # Legacy forms endpoint (for forms/gv/, forms/gt/, forms/ge/)
    path('api/legacy-signup/', legacy_views.legacy_signup, name='legacy_signup'),
    # Test Podio endpoint (Podio only, no EXPA)
    path('api/test-podio/', test_podio_views.test_podio, name='test_podio'),
]
