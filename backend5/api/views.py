from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from .models import FileModel
from .serializers import FileSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import Group
from .serializers import UserSerializer

from rest_framework.authentication import BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsTeacher



class TeacherView(ModelViewSet):
    queryset = FileModel.objects.all()
    serializer_class = FileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsTeacher]

    def get_queryset(self):
        classNumber = self.request.query_params.get('classNumber',None)
        subject = self.request.query_params.get('subject',None)

        if ((classNumber is not None) and (subject is not None)):
            return FileModel.objects.filter(classNumber=classNumber,subject=subject)
        
        elif ((classNumber is None) and (subject is None)):
            return FileModel.objects.all()
        

class StudentView(ListAPIView):
    queryset = FileModel.objects.all()
    serializer_class = FileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        classNumber = self.request.query_params.get('classNumber',None)
        subject = self.request.query_params.get('subject',None)

        if ((classNumber is not None) and (subject is not None)):
            return FileModel.objects.filter(classNumber=classNumber,subject=subject)
        
        elif ((classNumber is None) and (subject is None)):
            return FileModel.objects.all()
    
@api_view(['POST'])
def register_student(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        student_group = Group.objects.get(name='student')
        student_group.user_set.add(user)
        return Response({"message": "Student registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_teacher(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        teacher_group = Group.objects.get(name='teacher')
        teacher_group.user_set.add(user)
        return Response({"message": "Teacher registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

