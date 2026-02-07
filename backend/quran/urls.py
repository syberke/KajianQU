from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('surah', QuranSurahViewSet)
router.register('ayat', QuranAyatViewSet)

urlpatterns = router.urls
