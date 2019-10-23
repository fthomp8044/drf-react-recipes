from rest_framework import permissions
#permisssions are looking for true to be returned. If your not the ceator thenyou will get a 403 forbidden error
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_obect_permission(self, resquest, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.created_by == request.user
