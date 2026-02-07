from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrAsatidzCRUD(BasePermission):
    def has_permission(self, request, view):
        # 1. Semua user yang login boleh LIHAT (GET, HEAD, OPTIONS)
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated

        # 2. Hanya Admin atau Asatidz yang boleh modifikasi (POST, PUT, DELETE)
        return (
            request.user.is_authenticated and 
            (request.user.role in ['admin', 'asatidz'] or request.user.is_staff)
        )