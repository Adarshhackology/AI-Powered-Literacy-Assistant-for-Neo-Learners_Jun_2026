import json
from rest_framework import serializers
from .models import Lesson

class LessonSerializer(serializers.ModelSerializer):
    examples = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'difficulty', 'time', 'category', 'content', 'audioText', 'examples']

    def get_examples(self, obj):
        try:
            return json.loads(obj.examples or '[]')
        except:
            return []
