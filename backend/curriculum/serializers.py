import json
from rest_framework import serializers
from .models import Curriculum, Lesson, LessonContent, LearningPath

class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = ['id', 'level']

class LessonContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonContent
        fields = ['id', 'lesson', 'language', 'content']

class LessonSerializer(serializers.ModelSerializer):
    examples = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'curriculum', 'title', 'difficulty', 'time', 'category', 'content', 'audioText', 'imageUrl', 'examples']

    def get_examples(self, obj):
        try:
            return json.loads(obj.examples or '[]')
        except:
            return []

class LearningPathSerializer(serializers.ModelSerializer):
    lesson_title = serializers.ReadOnlyField(source='lesson.title')
    category = serializers.ReadOnlyField(source='lesson.category')

    class Meta:
        model = LearningPath
        fields = ['id', 'user', 'lesson', 'lesson_title', 'category', 'status']

