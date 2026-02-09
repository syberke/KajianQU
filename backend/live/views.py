from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from stream_video import StreamVideo
from .models import LiveSession
from .serializers import LiveSessionSerializer

# --- FUNGSI TOKEN GETSTREAM ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stream_token(request):
    # Masukkan API Key & Secret dari Dashboard GetStream
    API_KEY = 'tqzwvu8f68ge'
    API_SECRET = 'y45r8ztjp68tcf83vwf2a8hjqgtra8dk6jewkrzcqhbx9gzg9yaasdnvd4hbbw9j'
    
    try:
        client = StreamVideo(api_key=API_KEY, api_secret=API_SECRET)
        user_id = str(request.user.id)
        
        # Buat token untuk user yang sedang request
        token = client.create_token(user_id)
        
        return JsonResponse({
            'token': token,
            'apiKey': API_KEY,
            'user_id': user_id,
            'user_name': request.user.username
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# --- VIEWSET KAMU ---
class LiveSessionViewSet(viewsets.ModelViewSet):
    queryset = LiveSession.objects.filter(is_active=True)
    serializer_class = LiveSessionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role == 'asatidz':
            serializer.save(asatidz=self.request.user, is_active=True)
        else:
            # Gunakan ValidationError agar rapi di API
            from rest_framework.exceptions import ValidationError
            raise ValidationError("Hanya Asatidz yang bisa memulai Live.")