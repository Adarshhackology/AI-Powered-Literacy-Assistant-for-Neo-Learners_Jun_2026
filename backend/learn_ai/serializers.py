from rest_framework import serializers
from .models import AISession, AIAssessmentResult, AILearningModule, AIQuestionResponse

class AIQuestionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIQuestionResponse
        fields = '__all__'

class AILearningModuleSerializer(serializers.ModelSerializer):
    responses = AIQuestionResponseSerializer(many=True, read_only=True)
    class Meta:
        model = AILearningModule
        fields = '__all__'

class AIAssessmentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIAssessmentResult
        fields = '__all__'

class AISessionSerializer(serializers.ModelSerializer):
    assessments = AIAssessmentResultSerializer(many=True, read_only=True)
    modules = AILearningModuleSerializer(many=True, read_only=True)
    class Meta:
        model = AISession
        fields = '__all__'
