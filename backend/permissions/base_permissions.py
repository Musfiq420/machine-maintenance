from rest_framework.permissions import BasePermission
from django.contrib.auth.models import Group, Permission

# actions = []
class DHasGroupPermission(BasePermission):
    """
    Check if user has permission based on their group's permissions.
    Auto-detects model-based permissions or uses explicit per-view permissions.
    """

    def has_permission(self, request, view):
        required_perm = self._get_required_permission(request, view)
        if required_perm is None:
            return False  # Deny by default if no permission specified
        
        return request.user.is_authenticated and request.user.has_perm(required_perm)

    def _get_required_permission(self, request, view):
        # Check for explicit permission on the view
        if hasattr(view, 'required_permission'):
            return view.required_permission
        
        # Auto-detect model and action for ModelViewSets
        model = self._get_model_from_view(view)
        action = self._get_action_from_request(request, view)
        
        if model and action:
            return self._construct_permission(model, action)
        return None

    def _get_model_from_view(self, view):
        if hasattr(view, 'queryset'):
            return view.queryset.model
        return getattr(view, 'model', None)

    def _get_action_from_request(self, request, view):
        if hasattr(view, 'action'):
            return view.action
        return {
            'GET': 'view',
            'POST': 'add',
            'PUT': 'change',
            'PATCH': 'change',
            'DELETE': 'delete'
        }.get(request.method)

    def _construct_permission(self, model, action):
        action_map = {
            'view': 'view',
            'list': 'view',
            'retrieve': 'view',
            'create': 'add',
            'update': 'change',
            'partial_update': 'change',
            'destroy': 'delete'
        }
        perm_action = action_map.get(action)
        if not perm_action:
            return None
        return f"Can {perm_action} {model._meta.model_name}"

class THasGroupPermission(BasePermission):
    """
    Dynamically check permissions based on the user's groups and the current view action.
    Requires Django's standard model permissions (add, change, delete, view) and allows
    custom actions via a permission_map in the ViewSet.
    """
    def has_permission(self, request, view):
        # Get the model associated with the ViewSet
        print(view)
        model_cls = getattr(view, 'queryset', None)
        print(model_cls)
        if model_cls is not None:
            model_cls = model_cls.model
            print(model_cls)
        else:
            return False  # Or handle other cases if needed

        app_label = model_cls._meta.app_label
        print(app_label)
        model_name = model_cls._meta.model_name
        print(model_name)

        # Get the current action from the view
        action = view.action
        print(f"has_permission: {action}")

        # Check for custom permission mapping in the ViewSet
        permission_map = getattr(view, 'permission_map', {})
        if action in permission_map:
            codename = permission_map[action]
        else:
            # Default action to permission codename mapping
            action_to_codename = {
                'list': 'view',
                'retrieve': 'view',
                'create': 'add',
                'update': 'change',
                'partial_update': 'change',
                'destroy': 'delete',
            }
            codename = action_to_codename.get(action, None)

        if not codename:
            # Action not mapped; default deny
            return False

        # Construct the full permission string
        permission_required = f"{app_label}.{codename}_{model_name}"

        # Check if the user has the permission through their groups
        return request.user.has_perm(permission_required)


class HasGroupPermission(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        # Get the model associated with the ViewSet
        model_cls = getattr(view, 'queryset', None)
        if model_cls is None:
            return False  # Handle the case where the view doesn't have a queryset

        model_cls = model_cls.model  # Get the actual model class

        # Get model metadata
        app_label = model_cls._meta.app_label
        model_name = model_cls._meta.model_name

        # Action-to-permission codename mapping
        action_to_codename = {
            'list': 'view',
            'retrieve': 'view',
            'create': 'add',
            'update': 'change',
            'partial_update': 'change',
            'destroy': 'delete',
        }

        # Get the current action from the view
        action = view.action
        print(f"Has: {action}")  # This will give us the current action (e.g., 'list', 'create', etc.)
        if action is None:
            return False  # If there's no action, deny access
        
        # Map the action to the corresponding permission codename
        codename = action_to_codename.get(action, None)
        if codename is None:
            return False  # If the action doesn't have a mapped codename, deny access

        # Build the permission codename for the specific model
        permission_codename = f"{codename}_{model_name}"

        # Check if the user has the required permission
        user_groups = request.user.groups.all()
        group_permissions = Permission.objects.filter(group__in=user_groups)
        user_permissions = group_permissions.values_list('codename', flat=True)

        # If the user has the required permission, allow access
        if permission_codename in user_permissions:
            return True

        # Deny access if no matching permission found
        return False


class dHasGroupPermission(BasePermission):

    def has_permission(self, request, view):
        # Get the model associated with the ViewSet
        print(view)
        model_cls = getattr(view, 'queryset', None)
        print(model_cls)
        if model_cls is not None:
            model_cls = model_cls.model
            print(model_cls)
        else:
            return False  # Or handle other cases if needed

        app_label = model_cls._meta.app_label
        print(app_label)
        model_name = model_cls._meta.model_name
        print(model_name)

        # Get the current action from the view

        # if request.user.is_superuser:
        #     return True
        # user_groups = request.user.groups.all()
        # group_permissions = Permission.objects.filter(group__in=user_groups)
        # all_permissions = []
        # for perm in group_permissions:
        #         all_permissions.append(perm.codename)
        # print(all_permissions)
        
        # model_cls = getattr(self, 'queryset', None)
    
        # if model_cls is not None:
        #     model_cls = model_cls.model
        #     # print(f"Model class: {model_cls.__name__}")
            
        #     # Get model metadata
        #     app_label = model_cls._meta.app_label
        #     model_name = model_cls._meta.model_name
        #     # print(f"App: {app_label}, Model: {model_name}")
        #     action = self._get_action_from_request(request, view)
        #     action_to_codename = {
        #             'list': 'view',
        #             'retrieve': 'view',
        #             'create': 'add',
        #             'update': 'change',
        #             'partial_update': 'change',
        #             'destroy': 'delete',
        #         }
        #     codename = action_to_codename.get(action, None)
        #     print(f"{codename}_{model_name}")
        # else:
        #     print("No model class found")
    
        return True
    
def storeAllPermissions(self, request, view):
        if request.user.is_superuser:
            return True
        user_groups = request.user.groups.all()
        group_permissions = Permission.objects.filter(group__in=user_groups)
        all_permissions = []
        for perm in group_permissions:
                all_permissions.append(perm.codename)
        # print(all_permissions)
        return all_permissions

def whichActions(self, request):
    # Get model class from the view's queryset
    model_cls = getattr(self, 'queryset', None)
    
    if model_cls is not None:
        model_cls = model_cls.model
        # print(f"Model class: {model_cls.__name__}")
        
        # Get model metadata
        app_label = model_cls._meta.app_label
        model_name = model_cls._meta.model_name
        # print(f"App: {app_label}, Model: {model_name}")
        action_to_codename = {
                'list': 'view',
                'retrieve': 'view',
                'create': 'add',
                'update': 'change',
                'partial_update': 'change',
                'destroy': 'delete',
            }
        codename = action_to_codename.get(self.action, None)
        print(f"{codename}_{model_name}")
    else:
        print("No model class found")
    
    # Print current action
    print(f"{self.action}")



"""

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.is_authenticated and request.user.employee.designation == 'admin'

class IsSupervisor(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.is_authenticated and request.user.employee.designation == 'supervisor'

class IsMechanic(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.is_authenticated and request.user.employee.designation == 'hr'
    
class IsHR(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.is_authenticated and request.user.employee.designation == 'mechanic'

# Combined Permission Class for OR Logic
class IsAdminOrSupervisorOrMechanic(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not request.user.is_authenticated:
            return False
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.employee.designation in ['admin', 'supervisor', 'mechanic']

# Optional: Separate Combined Permissions
class IsAdminOrMechanic(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not request.user.is_authenticated:
            return False
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.employee.designation in ['admin', 'mechanic']
    
class IsAdminOrHR(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if not request.user.is_authenticated:
            return False
        if not hasattr(request.user, 'employee'):
            return False
        return request.user.employee.designation in ['admin', 'hr']
    
"""