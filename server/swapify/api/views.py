from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from .models import UserInfo

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        phone = request.data.get('phone')
        password = request.data.get('password')

        try:
            # Save the user to the database
            user = UserInfo.objects.create(
                username=username,
                email=email,
                phone=phone,
                password=make_password(password)  # Hash the password
            )
            user.save()
            request.session['user_id'] = user.id  # Store user id in session
            return Response({"message": "User created successfully", "user_id": user.id}, status=201)

        except IntegrityError as e:
            if 'UNIQUE constraint failed' in str(e):
                return Response({"error": "Email or username already exists"}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    
    return Response({"error": "Email or username already exists"}, status=400)


@csrf_exempt  # Disable CSRF token requirement for the API call
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Check if the user exists with the provided email
            user = UserInfo.objects.get(email=email)
            
            # Check if the password is correct
            if check_password(password, user.password):
                # Store user id in session (or token-based authentication can be used here)
                request.session['user_id'] = user.id
                return Response({'success': True, 'message': 'Login successful', 'user_id': user.id}, status=200)

            else:
                # Incorrect password
                return Response({'success': False, 'message': 'Invalid email or password'}, status=400)

        except UserInfo.DoesNotExist:
            # Email not found
            return Response({'success': False, 'message': 'Invalid email or password'}, status=400)

    # If not POST method, return method not allowed
    return Response({'success': False, 'message': 'Invalid request method'}, status=405)
