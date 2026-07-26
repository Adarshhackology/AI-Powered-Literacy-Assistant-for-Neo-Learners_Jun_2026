import json
import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import AISession, AIAssessmentResult, AILearningModule, AIQuestionResponse
from .serializers import AISessionSerializer, AIAssessmentResultSerializer, AILearningModuleSerializer
from users.models import CustomUser, UserProfile

def call_gemini_json(prompt):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return None
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json"}
    }
    try:
        res = requests.post(url, headers=headers, json=data, timeout=10)
        if res.status_code == 200:
            res_json = res.json()
            text_resp = res_json['candidates'][0]['content']['parts'][0]['text']
            return json.loads(text_resp)
    except Exception as e:
        print(f"Gemini API Error: {e}")
    return None

def get_fallback_assessment_questions(language):
    lang = (language or '').lower()
    if 'gu' in lang or 'gujarati' in lang:
        return [
            {"id": 1, "skill": "reading", "question_text": "ચિત્ર જોઈને સાચો શબ્દ પસંદ કરો:", "question_type": "mcq", "options": ["સફરજન", "કેળું", "બિલાડી", "કૂતરો"], "correct_answer": "સફરજન", "image_hint": "🍎"},
            {"id": 2, "skill": "reading", "question_text": "આ કયું પ્રાણી છે?", "question_type": "mcq", "options": ["બિલાડી", "કૂતરો", "પક્ષી", "માછલી"], "correct_answer": "કૂતરો", "image_hint": "🐶"},
            {"id": 3, "skill": "reading", "question_text": "આ મોટેથી વાંચો: 'નમસ્તે ભારત!'", "question_type": "read_aloud", "options": None, "correct_answer": "નમસ્તે ભારત!", "image_hint": "🌍"},
            {"id": 4, "skill": "reading", "question_text": "સાચો શબ્દ શોધો: 📚", "question_type": "mcq", "options": ["પુસ્તક", "પેન્સિલ", "બેગ", "ગાડી"], "correct_answer": "પુસ્તક", "image_hint": "📚"},
            {"id": 5, "skill": "reading", "question_text": "'કમળ' શબ્દનો પ્રથમ અક્ષર કયો છે?", "question_type": "mcq", "options": ["ક", "મ", "ળ", "ર"], "correct_answer": "ક", "image_hint": "🌸"},
            {"id": 6, "skill": "writing", "question_text": "વાક્ય પૂર્ણ કરો: 'તે શાળાએ જઈ _____ છે.'", "question_type": "fill_blank", "options": None, "correct_answer": "રહ્યો", "image_hint": "🏫"},
            {"id": 7, "skill": "writing", "question_text": "🐶 નું નામ ગુજરાતીમાં લખો:", "question_type": "fill_blank", "options": None, "correct_answer": "કૂતરો", "image_hint": "🐶"},
            {"id": 8, "skill": "writing", "question_text": "યોગ્ય વાક્ય પસંદ કરો: [ખા છે / રામ / કેરી]", "question_type": "fill_blank", "options": None, "correct_answer": "રામ કેરી ખા છે", "image_hint": "🥭"},
            {"id": 9, "skill": "writing", "question_text": "તમારા મનપસંદ ફળ વિશે એક વાક્ય લખો.", "question_type": "paragraph", "options": None, "correct_answer": "મારું મનપસંદ ફળ કેરી છે.", "image_hint": "🥭"},
            {"id": 10, "skill": "writing", "question_text": "'સૂર્ય' નો વિરોધી શબ્દ લખો:", "question_type": "fill_blank", "options": None, "correct_answer": "ચંદ્ર", "image_hint": "🌙"},
            {"id": 11, "skill": "comprehension", "question_text": "વાર્તા: 'રામુને ઝાડ નીચે એક ચાવી મળી.' રામુને શું મળ્યું?", "question_type": "mcq", "options": ["ચાવી", "સિક્કો", "ફૂલ", "રમકડું"], "correct_answer": "ચાવી", "image_hint": "🔑"},
            {"id": 12, "skill": "comprehension", "question_text": "વૃક્ષો આપણને શું આપે છે?", "question_type": "mcq", "options": ["છાંયો અને ફળ", "પાણી અને આગ", "કપડાં", "ગાડીઓ"], "correct_answer": "છાંયો અને ફળ", "image_hint": "🌳"},
            {"id": 13, "skill": "comprehension", "question_text": "કાળા વાદળો આવે ત્યારે શું થશે?", "question_type": "mcq", "options": ["વરસાદ પડશે", "તડકો નીકળશે", "બર્ફ પડશે", "તારા દેખાશે"], "correct_answer": "વરસાદ પડશે", "image_hint": "🌧️"},
            {"id": 14, "skill": "comprehension", "question_text": "'વીર' શબ્દનો સાચો અર્થ શું છે?", "question_type": "mcq", "options": ["બહાદુર", "બીકણ", "શાંત", "ઊંઘતો"], "correct_answer": "બહાદુર", "image_hint": "🛡️"},
            {"id": 15, "skill": "comprehension", "question_text": "એક ખુશ કૂતરો તેની પૂંછડી સાથે શું કરે છે?", "question_type": "fill_blank", "options": None, "correct_answer": "પટપટાવે છે", "image_hint": "🐶"}
        ]

    return [
        {"id": 1, "skill": "reading", "question_text": f"Read aloud and select the correct matching word for 'Apple' in {language}.", "question_type": "mcq", "options": ["Apple", "Banana", "Cat", "Dog"], "correct_answer": "Apple", "image_hint": "🍎"},
        {"id": 2, "skill": "reading", "question_text": f"Select the missing letter: S _ UN (Sun)", "question_type": "mcq", "options": ["O", "A", "U", "E"], "correct_answer": "U", "image_hint": "☀️"},
        {"id": 3, "skill": "reading", "question_text": "Read the sentence in under 15 seconds: 'The swift blue bird sings loudly.'", "question_type": "read_aloud", "options": None, "correct_answer": "The swift blue bird sings loudly.", "image_hint": "🐦"},
        {"id": 4, "skill": "reading", "question_text": "Match the word 'Book' with its picture.", "question_type": "mcq", "options": ["Book", "Pencil", "Bag", "Car"], "correct_answer": "Book", "image_hint": "📚"},
        {"id": 5, "skill": "reading", "question_text": "Identify the rhyming word for 'Cat'.", "question_type": "mcq", "options": ["Hat", "Dog", "Fish", "Bird"], "correct_answer": "Hat", "image_hint": "🎩"},
        {"id": 6, "skill": "writing", "question_text": "Complete the sentence: 'She is _____ to school.'", "question_type": "fill_blank", "options": None, "correct_answer": "going", "image_hint": "🏫"},
        {"id": 7, "skill": "writing", "question_text": "Spell the word for 🐶 correctly.", "question_type": "fill_blank", "options": None, "correct_answer": "dog", "image_hint": "🐶"},
        {"id": 8, "skill": "writing", "question_text": "Fix the grammar: 'He go to market yesterday.'", "question_type": "fill_blank", "options": None, "correct_answer": "went", "image_hint": "🛒"},
        {"id": 9, "skill": "writing", "question_text": "Write a short sentence about your favorite pet.", "question_type": "paragraph", "options": None, "correct_answer": "My favorite pet is a dog.", "image_hint": "🐾"},
        {"id": 10, "skill": "writing", "question_text": "Arrange into correct sentence: [likes / ice cream / Sam]", "question_type": "fill_blank", "options": None, "correct_answer": "Sam likes ice cream", "image_hint": "🍦"},
        {"id": 11, "skill": "comprehension", "question_text": "Story: 'Tim found a golden key under a tree. He opened the small wooden box.' What did Tim find?", "question_type": "mcq", "options": ["A key", "A coin", "A flower", "A toy"], "correct_answer": "A key", "image_hint": "🔑"},
        {"id": 12, "skill": "comprehension", "question_text": "Why was Tim looking at the wooden box?", "question_type": "mcq", "options": ["To open it with the key", "To throw it", "To paint it", "To hide it"], "correct_answer": "To open it with the key", "image_hint": "📦"},
        {"id": 13, "skill": "comprehension", "question_text": "What is the main idea of: 'Trees give us clean air, fruits, and shade.'", "question_type": "mcq", "options": ["Trees are helpful", "Trees are tall", "Trees have leaves", "Birds live in trees"], "correct_answer": "Trees are helpful", "image_hint": "🌳"},
        {"id": 14, "skill": "comprehension", "question_text": "Predict what happens next when dark clouds fill the sky.", "question_type": "mcq", "options": ["It will rain", "The sun will shine", "Stars will appear", "It will snow"], "correct_answer": "It will rain", "image_hint": "☁️"},
        {"id": 15, "skill": "comprehension", "question_text": "Explain in 1 word what a happy dog does with its tail.", "question_type": "fill_blank", "options": None, "correct_answer": "wag", "image_hint": "🐶"}
    ]

def get_fallback_practice_questions(skill, language):
    if skill == 'reading':
        return [
            {"index": 0, "question_text": f"Read the sentence aloud in {language}: 'The sun rises in the east.'", "question_type": "read_aloud", "options": None, "correct_answer": "The sun rises in the east.", "hint": "Speak clearly and steadily.", "image_hint": "🌅"},
            {"index": 1, "question_text": "Find the missing word: 'Water is essential for _____.'", "question_type": "mcq", "options": ["life", "rocks", "cars", "toys"], "correct_answer": "life", "hint": "Think about what living things need.", "image_hint": "💧"},
            {"index": 2, "question_text": "Which word is pronounced similarly to 'Light'?", "question_type": "mcq", "options": ["Night", "Late", "Look", "Lit"], "correct_answer": "Night", "hint": "Focus on the ending sound.", "image_hint": "💡"},
            {"index": 3, "question_text": "Read this sentence in under 20 seconds: 'Children play happily in the park.'", "question_type": "read_aloud", "options": None, "correct_answer": "Children play happily in the park.", "hint": "Maintain pace.", "image_hint": "🛝"},
            {"index": 4, "question_text": "Identify the word that means 'extremely small'.", "question_type": "mcq", "options": ["Tiny", "Huge", "Giant", "Wide"], "correct_answer": "Tiny", "hint": "Antonym of huge.", "image_hint": "🔍"},
            {"index": 5, "question_text": "Read the sentence and pick the feeling: 'Lily jumped up and down with joy.'", "question_type": "mcq", "options": ["Happy 😊", "Sad 😢", "Angry 😡", "Scared 😨"], "correct_answer": "Happy 😊", "hint": "Joy means happiness.", "image_hint": "🎉"}
        ]
    elif skill == 'writing':
        return [
            {"index": 0, "question_text": "Write 2-3 sentences about what you do in the morning.", "question_type": "paragraph", "options": None, "correct_answer": "I wake up early and brush my teeth.", "hint": "Mention morning habits.", "image_hint": "🌅"},
            {"index": 1, "question_text": "Correct the grammar mistake: 'They is playing football.'", "question_type": "fill_blank", "options": None, "correct_answer": "are", "hint": "'They' is plural.", "image_hint": "⚽"},
            {"index": 2, "question_text": "Arrange words into a sentence: [beautiful / flower / a / is / This]", "question_type": "fill_blank", "options": None, "correct_answer": "This is a beautiful flower", "hint": "Start with 'This'.", "image_hint": "🌸"},
            {"index": 3, "question_text": "Complete the paragraph: 'It started raining so we opened our _____.'", "question_type": "fill_blank", "options": None, "correct_answer": "umbrella", "hint": "Protects you from rain.", "image_hint": "☔"},
            {"index": 4, "question_text": "Describe this image 🐘 in 3-5 words.", "question_type": "fill_blank", "options": None, "correct_answer": "A big gray elephant", "hint": "Mention size and color.", "image_hint": "🐘"},
            {"index": 5, "question_text": "Write a 1-sentence mini story starting with 'Once upon a time...'", "question_type": "paragraph", "options": None, "correct_answer": "Once upon a time there was a brave knight.", "hint": "Be creative!", "image_hint": "🏰"}
        ]
    else: # comprehension
        return [
            {"index": 0, "question_text": "Read story: 'Leo the lion shared his food with little mouse.' What value does Leo show?", "question_type": "mcq", "options": ["Kindness 💖", "Anger 💢", "Greed 🤑", "Speed ⚡"], "correct_answer": "Kindness 💖", "hint": "Sharing means being nice.", "image_hint": "🦁"},
            {"index": 1, "question_text": "Why did Leo share his food?", "question_type": "mcq", "options": ["He was friendly", "He was forced", "He lost it", "Mouse stole it"], "correct_answer": "He was friendly", "hint": "Look at his behavior.", "image_hint": "🐭"},
            {"index": 2, "question_text": "Match meaning of 'Brave':", "question_type": "mcq", "options": ["Not afraid 💪", "Always quiet 🤫", "Very slow 🐢", "Very sleepy 😴"], "correct_answer": "Not afraid 💪", "hint": "Courageous.", "image_hint": "🛡️"},
            {"index": 3, "question_text": "Arrange events: 1) Baked cake 2) Bought flour 3) Ate cake", "question_type": "mcq", "options": ["2 -> 1 -> 3", "1 -> 2 -> 3", "3 -> 2 -> 1", "2 -> 3 -> 1"], "correct_answer": "2 -> 1 -> 3", "hint": "Buy ingredients first.", "image_hint": "🎂"},
            {"index": 4, "question_text": "What is the main idea of a story about planting seeds and watching flowers grow?", "question_type": "mcq", "options": ["Nature growth 🌱", "Cooking food 🍳", "Building houses 🏠", "Driving cars 🚗"], "correct_answer": "Nature growth 🌱", "hint": "Focus on plants.", "image_hint": "🌱"},
            {"index": 5, "question_text": "Predict ending: 'Sam studied hard for his exam every day. On test day, he feel...'", "question_type": "mcq", "options": ["Confident and scored well 💯", "Failed miserably", "Forgot his name", "Slept all day"], "correct_answer": "Confident and scored well 💯", "hint": "Hard work leads to success.", "image_hint": "📝"}
        ]

@method_decorator(csrf_exempt, name='dispatch')
class StartSessionView(APIView):
    def post(self, request):
        username = request.data.get('username')
        language = request.data.get('language', 'english')
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create(username=username, email=f"{username}@example.com")
        
        session = AISession.objects.create(user=user, language=language, status='assessment')
        return Response(AISessionSerializer(session).data, status=status.HTTP_201_CREATED)

@method_decorator(csrf_exempt, name='dispatch')
class GenerateAssessmentView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        if not session_id:
            return Response({'error': 'session_id required'}, status=400)
        try:
            session = AISession.objects.get(id=session_id)
        except AISession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)
        
        prompt = f"""Generate 15 unique, child-friendly literacy assessment questions (5 reading, 5 writing, 5 comprehension) for a learner in language '{session.language}'.
Return ONLY a valid JSON array of objects with keys:
"id" (1-15), "skill" ("reading", "writing", or "comprehension"), "question_text" (in target language '{session.language}'), "question_type" ("mcq", "fill_blank", "paragraph", or "read_aloud"), "options" (array of 4 string options in '{session.language}' for mcq, null for others), "correct_answer", "image_hint" (emoji string like 🍎/🐶/📚/🚗/🌸/☀️), "image_url" (a URL string to a relevant illustration or shape, e.g. "https://api.dicebear.com/7.x/bottts/svg?seed=apple")."""
        
        questions = call_gemini_json(prompt)
        if not questions or not isinstance(questions, list) or len(questions) < 5:
            questions = get_fallback_assessment_questions(session.language)

        return Response({'session_id': session.id, 'language': session.language, 'questions': questions})

@method_decorator(csrf_exempt, name='dispatch')
class SubmitAssessmentView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        assessment_type = request.data.get('assessment_type', 'initial')
        answers = request.data.get('answers', [])
        
        try:
            session = AISession.objects.get(id=session_id)
        except AISession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)

        reading_total, reading_correct = 0, 0
        writing_total, writing_correct = 0, 0
        comp_total, comp_correct = 0, 0

        for ans in answers:
            sk = ans.get('skill', '').lower()
            user_ans = str(ans.get('user_answer', '')).strip().lower()
            corr_ans = str(ans.get('correct_answer', '')).strip().lower()
            
            is_right = False
            if user_ans and corr_ans:
                if user_ans == corr_ans or user_ans in corr_ans or corr_ans in user_ans:
                    is_right = True
                elif len(user_ans) > 3 and user_ans[:4] == corr_ans[:4]:
                    is_right = True

            if sk == 'reading':
                reading_total += 1
                if is_right: reading_correct += 1
            elif sk == 'writing':
                writing_total += 1
                if is_right: writing_correct += 1
            elif sk == 'comprehension':
                comp_total += 1
                if is_right: comp_correct += 1

        r_score = int((reading_correct / max(1, reading_total)) * 100) if reading_total > 0 else 50
        w_score = int((writing_correct / max(1, writing_total)) * 100) if writing_total > 0 else 50
        c_score = int((comp_correct / max(1, comp_total)) * 100) if comp_total > 0 else 50
        overall = int((r_score + w_score + c_score) / 3)

        weak_areas = []
        if r_score < 99: weak_areas.append('reading')
        if w_score < 99: weak_areas.append('writing')
        if c_score < 99: weak_areas.append('comprehension')
        if not weak_areas:
            min_score = min(r_score, w_score, c_score)
            if min_score == r_score: weak_areas.append('reading')
            elif min_score == w_score: weak_areas.append('writing')
            else: weak_areas.append('comprehension')

        level = 'Advanced' if overall >= 75 else ('Intermediate' if overall >= 45 else 'Beginner')

        result = AIAssessmentResult.objects.create(
            session=session,
            assessment_type=assessment_type,
            reading_score=r_score,
            writing_score=w_score,
            comprehension_score=c_score,
            overall_score=overall,
            level=level,
            weak_areas=weak_areas
        )
        
        session.status = 'learning' if assessment_type == 'initial' else 'completed'
        session.save()

        return Response({
            'result_id': result.id,
            'reading_score': r_score,
            'writing_score': w_score,
            'comprehension_score': c_score,
            'overall_score': overall,
            'level': level,
            'weak_areas': weak_areas,
            'assessment_type': assessment_type
        })

@method_decorator(csrf_exempt, name='dispatch')
class GenerateModulesView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        try:
            session = AISession.objects.get(id=session_id)
        except AISession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)

        latest_assessment = session.assessments.filter(assessment_type='initial').last()
        weak_areas = (latest_assessment.weak_areas if (latest_assessment and latest_assessment.weak_areas) else [])
        if not weak_areas:
            weak_areas = ['reading', 'writing']

        modules = []
        for skill in ['reading', 'writing', 'comprehension']:
            if skill in weak_areas:
                prompt = f"""Generate 6 progressive practice questions for improving '{skill}' in '{session.language}'.
Return ONLY a valid JSON array of objects with keys:
"index" (0-5), "question_text" (in '{session.language}'), "question_type" ("mcq", "fill_blank", "paragraph", or "read_aloud"), "options" (array of 4 options in '{session.language}' for mcq, null otherwise), "correct_answer", "hint", "image_hint" (emoji), "image_url" (a URL string to a relevant illustration, e.g. "https://api.dicebear.com/7.x/bottts/svg?seed=book")."""
                q_list = call_gemini_json(prompt)
                if not q_list or not isinstance(q_list, list) or len(q_list) < 3:
                    q_list = get_fallback_practice_questions(skill, session.language)
                
                mod, _ = AILearningModule.objects.get_or_create(
                    session=session,
                    skill=skill,
                    defaults={'questions': q_list, 'status': 'pending'}
                )
                modules.append(AILearningModuleSerializer(mod).data)
            else:
                mod, _ = AILearningModule.objects.get_or_create(
                    session=session,
                    skill=skill,
                    defaults={'questions': [], 'status': 'completed', 'score': 100}
                )
                modules.append(AILearningModuleSerializer(mod).data)

        return Response({'modules': modules, 'weak_areas': weak_areas})

@method_decorator(csrf_exempt, name='dispatch')
class SubmitAnswerView(APIView):
    def post(self, request):
        module_id = request.data.get('module_id')
        q_idx = request.data.get('question_index', 0)
        user_ans = str(request.data.get('user_answer', '')).strip()
        q_text = request.data.get('question_text', '')
        corr_ans = str(request.data.get('correct_answer', '')).strip()

        try:
            module = AILearningModule.objects.get(id=module_id)
        except AILearningModule.DoesNotExist:
            return Response({'error': 'Module not found'}, status=404)

        prompt = f"""A child answered: '{user_ans}' to the question '{q_text}'. The expected answer is '{corr_ans}'.
Is the child's answer correct or close enough?
Return ONLY JSON with keys:
"is_correct" (boolean), "score" (0 to 100 integer), "explanation" (encouraging 2-sentence feedback string)."""
        
        eval_res = call_gemini_json(prompt)
        if not eval_res or not isinstance(eval_res, dict):
            is_corr = user_ans.lower() == corr_ans.lower() or user_ans.lower() in corr_ans.lower()
            eval_res = {
                "is_correct": is_corr,
                "score": 100 if is_corr else 40,
                "explanation": "Great effort! You are doing awesome." if is_corr else f"Good try! The best answer was '{corr_ans}'."
            }

        resp = AIQuestionResponse.objects.create(
            module=module,
            question_index=q_idx,
            user_answer=user_ans,
            is_correct=eval_res.get('is_correct', False),
            ai_explanation=eval_res.get('explanation', ''),
            score=eval_res.get('score', 50)
        )

        return Response({
            'response_id': resp.id,
            'is_correct': resp.is_correct,
            'score': resp.score,
            'explanation': resp.ai_explanation
        })

@method_decorator(csrf_exempt, name='dispatch')
class CompleteModuleView(APIView):
    def post(self, request):
        module_id = request.data.get('module_id')
        try:
            module = AILearningModule.objects.get(id=module_id)
        except AILearningModule.DoesNotExist:
            return Response({'error': 'Module not found'}, status=404)

        responses = module.responses.all()
        avg_score = int(sum([r.score for r in responses]) / max(1, responses.count())) if responses.exists() else 75

        prompt = f"""Learner completed '{module.skill}' practice with score {avg_score}%.
Return ONLY JSON with keys:
"tips" (array of 3 short encouragement/technique strings), "recommended_lesson" (string title), "estimated_improvement" (integer percentage like 15)."""
        
        fb = call_gemini_json(prompt)
        if not fb or not isinstance(fb, dict):
            fb = {
                "tips": [
                    "Read aloud for 5 minutes every day.",
                    "Pay close attention to word sounds.",
                    "Practice writing key vocabulary words."
                ],
                "recommended_lesson": f"Mastering {module.skill.capitalize()} Fundamentals",
                "estimated_improvement": 18
            }

        module.status = 'completed'
        module.score = avg_score
        module.ai_feedback = fb
        module.save()

        return Response({'module_id': module.id, 'score': avg_score, 'ai_feedback': fb})

@method_decorator(csrf_exempt, name='dispatch')
class GenerateRetestView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        try:
            session = AISession.objects.get(id=session_id)
        except AISession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)

        questions = get_fallback_assessment_questions(session.language)
        session.status = 'retest'
        session.save()
        return Response({'session_id': session.id, 'questions': questions})

@method_decorator(csrf_exempt, name='dispatch')
class SubmitRetestView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        answers = request.data.get('answers', [])
        try:
            session = AISession.objects.get(id=session_id)
        except AISession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)

        initial = session.assessments.filter(assessment_type='initial').last()

        r_total, r_right = 0, 0
        w_total, w_right = 0, 0
        c_total, c_right = 0, 0

        for ans in answers:
            sk = ans.get('skill', '').lower()
            u_ans = str(ans.get('user_answer', '')).strip().lower()
            c_ans = str(ans.get('correct_answer', '')).strip().lower()
            is_right = bool(u_ans and c_ans and (u_ans in c_ans or c_ans in u_ans))

            if sk == 'reading':
                r_total += 1
                if is_right: r_right += 1
            elif sk == 'writing':
                w_total += 1
                if is_right: w_right += 1
            elif sk == 'comprehension':
                c_total += 1
                if is_right: c_right += 1

        r_after = int((r_right / max(1, r_total)) * 100) if r_total > 0 else 75
        w_after = int((w_right / max(1, w_total)) * 100) if w_total > 0 else 80
        c_after = int((c_right / max(1, c_total)) * 100) if c_total > 0 else 78
        overall_after = int((r_after + w_after + c_after) / 3)

        retest_res = AIAssessmentResult.objects.create(
            session=session,
            assessment_type='retest',
            reading_score=r_after,
            writing_score=w_after,
            comprehension_score=c_after,
            overall_score=overall_after,
            level='Intermediate' if overall_after >= 45 else 'Beginner',
            weak_areas=[]
        )

        session.status = 'completed'
        session.save()

        b_reading = initial.reading_score if initial else 50
        b_writing = initial.writing_score if initial else 50
        b_comp = initial.comprehension_score if initial else 50
        b_overall = initial.overall_score if initial else 50

        diff_overall = overall_after - b_overall
        improved = diff_overall >= 5

        try:
            profile = UserProfile.objects.get(user=session.user)
            if improved:
                profile.xp += 100
                profile.coins += 50
            else:
                profile.xp += 25
            profile.save()
        except Exception:
            pass

        return Response({
            'before': {
                'reading': b_reading,
                'writing': b_writing,
                'comprehension': b_comp,
                'overall': b_overall
            },
            'after': {
                'reading': r_after,
                'writing': w_after,
                'comprehension': c_after,
                'overall': overall_after
            },
            'improvement': {
                'reading_diff': r_after - b_reading,
                'writing_diff': w_after - b_writing,
                'comprehension_diff': c_after - b_comp,
                'overall_diff': diff_overall
            },
            'improved': improved
        })

@method_decorator(csrf_exempt, name='dispatch')
class GetSessionView(APIView):
    def get(self, request, session_id):
        try:
            session = AISession.objects.get(id=session_id)
            return Response(AISessionSerializer(session).data)
        except AISession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)

@method_decorator(csrf_exempt, name='dispatch')
class GetHistoryView(APIView):
    def get(self, request, username):
        sessions = AISession.objects.filter(user__username=username).order_by('-created_at')
        return Response(AISessionSerializer(sessions, many=True).data)
