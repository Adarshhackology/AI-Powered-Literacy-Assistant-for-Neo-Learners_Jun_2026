"""Beginner-friendly Module 1 server. Run: python app.py"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sqlite3, json, hashlib
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).parent
DB = ROOT / "literacy_assistant.db"

def connection():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con

def init_database():
    con = connection()
    con.executescript('''
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS learner_profiles (
      user_id INTEGER PRIMARY KEY, age INTEGER, preferred_language TEXT, education_level TEXT,
      proficiency_level TEXT DEFAULT 'Not assessed', FOREIGN KEY(user_id) REFERENCES users(id));
    CREATE TABLE IF NOT EXISTS curriculum (
      id INTEGER PRIMARY KEY AUTOINCREMENT, level TEXT NOT NULL, category TEXT NOT NULL, description TEXT);
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT, curriculum_id INTEGER, title TEXT NOT NULL, language TEXT NOT NULL,
      content TEXT NOT NULL, exercise TEXT, FOREIGN KEY(curriculum_id) REFERENCES curriculum(id));
    CREATE TABLE IF NOT EXISTS assessment_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, total_score INTEGER NOT NULL,
      literacy_level TEXT NOT NULL, completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id));
    CREATE TABLE IF NOT EXISTS learner_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT, result_id INTEGER, question_number INTEGER,
      score INTEGER, FOREIGN KEY(result_id) REFERENCES assessment_results(id));
    ''')
    if con.execute('SELECT COUNT(*) FROM curriculum').fetchone()[0] == 0:
        rows = [
          ('Beginner','Alphabet','Learn letters, sounds, and basic words.'),
          ('Beginner','Reading Basics','Practice simple words and sentences.'),
          ('Intermediate','Vocabulary','Build useful everyday vocabulary.'),
          ('Intermediate','Grammar','Learn sentence structure and grammar.'),
          ('Advanced','Essay Writing','Write clear paragraphs and essays.'),
          ('Advanced','Communication','Improve speaking and communication skills.')]
        con.executemany('INSERT INTO curriculum(level,category,description) VALUES(?,?,?)', rows)
        lessons = [
          (1,'English Alphabet','English','A B C — Learn the English alphabet.','Write A, B and C.'),
          (1,'தமிழ் எழுத்துக்கள்','Tamil','அ ஆ இ — தமிழ் அடிப்படை எழுத்துக்களை கற்றுக்கொள்ளுங்கள்.','அ, ஆ, இ எழுதுங்கள்.'),
          (1,'हिंदी वर्णमाला','Hindi','अ आ इ — हिंदी के मूल अक्षर सीखें।','अ, आ, इ लिखें।'),
          (3,'Everyday Words','English','Learn words used at home, school and work.','Use five new words in sentences.'),
          (4,'Simple Sentences','English','A sentence has a subject and a verb.','Write three simple sentences.'),
          (5,'Essay Structure','English','An essay has an introduction, body and conclusion.','Write a short essay about your day.')]
        con.executemany('INSERT INTO lessons(curriculum_id,title,language,content,exercise) VALUES(?,?,?,?,?)', lessons)
    con.commit(); con.close()

def password_hash(value): return hashlib.sha256(value.encode()).hexdigest()

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs): super().__init__(*args, directory=str(ROOT), **kwargs)
    def send_json(self, data, status=200):
        raw = json.dumps(data).encode(); self.send_response(status); self.send_header('Content-Type','application/json'); self.send_header('Content-Length',str(len(raw))); self.end_headers(); self.wfile.write(raw)
    def body(self):
        try: return json.loads(self.rfile.read(int(self.headers.get('Content-Length',0))).decode())
        except (ValueError, UnicodeDecodeError): return {}
    def do_GET(self):
        if self.path == '/api/curriculum':
            con=connection(); data=[dict(x) for x in con.execute('SELECT * FROM curriculum ORDER BY CASE level WHEN "Beginner" THEN 1 WHEN "Intermediate" THEN 2 ELSE 3 END, category')]; con.close()
            return self.send_json(data)
        if self.path.startswith('/api/lessons'):
            language = parse_qs(urlparse(self.path).query).get('language',[''])[0]
            con=connection(); sql='SELECT lessons.*, curriculum.level, curriculum.category FROM lessons JOIN curriculum ON lessons.curriculum_id=curriculum.id'; args=[]
            if language: sql+=' WHERE language=?'; args=[language]
            data=[dict(x) for x in con.execute(sql,args)]; con.close(); return self.send_json(data)
        if self.path.startswith('/api/profile'):
            try: user_id=int(self.path.split('=')[1])
            except (IndexError,ValueError): return self.send_json({'error':'User id is required.'},400)
            con=connection(); row=con.execute('SELECT users.id,name,email,age,preferred_language,education_level,proficiency_level FROM users JOIN learner_profiles ON users.id=learner_profiles.user_id WHERE users.id=?',(user_id,)).fetchone(); con.close()
            return self.send_json(dict(row) if row else {'error':'Learner not found.'}, 200 if row else 404)
        return super().do_GET()
    def do_POST(self):
        data=self.body(); con=connection()
        try:
            if self.path == '/api/register':
                required=['name','email','password','age','language','education_level']
                if not all(str(data.get(x,'')).strip() for x in required): return self.send_json({'error':'Please fill in all fields.'},400)
                cur=con.execute('INSERT INTO users(name,email,password_hash) VALUES(?,?,?)',(data['name'].strip(),data['email'].strip().lower(),password_hash(data['password'])))
                con.execute('INSERT INTO learner_profiles(user_id,age,preferred_language,education_level) VALUES(?,?,?,?)',(cur.lastrowid,data['age'],data['language'],data['education_level'])); con.commit()
                return self.send_json({'message':'Registration successful.','user_id':cur.lastrowid})
            if self.path == '/api/login':
                row=con.execute('SELECT id,name FROM users WHERE email=? AND password_hash=?',(data.get('email','').strip().lower(),password_hash(data.get('password','')))).fetchone()
                return self.send_json({'message':'Login successful.','user_id':row['id'],'name':row['name']} if row else {'error':'Incorrect email or password.'},200 if row else 401)
            if self.path == '/api/assessment':
                scores=data.get('scores',[]); user_id=data.get('user_id')
                if len(scores)!=10 or any(x not in [0,5,10] for x in scores): return self.send_json({'error':'All ten answers are required.'},400)
                total=sum(scores); level='Beginner' if total<=40 else 'Intermediate' if total<=70 else 'Advanced'
                cur=con.execute('INSERT INTO assessment_results(user_id,total_score,literacy_level) VALUES(?,?,?)',(user_id,total,level))
                con.executemany('INSERT INTO learner_responses(result_id,question_number,score) VALUES(?,?,?)',[(cur.lastrowid,i+1,value) for i,value in enumerate(scores)])
                if user_id: con.execute('UPDATE learner_profiles SET proficiency_level=? WHERE user_id=?',(level,user_id))
                con.commit(); return self.send_json({'total_score':total,'literacy_level':level})
            if self.path == '/api/lessons':
                con.execute('INSERT INTO lessons(curriculum_id,title,language,content,exercise) VALUES(?,?,?,?,?)',(data['curriculum_id'],data['title'],data['language'],data['content'],data.get('exercise',''))); con.commit(); return self.send_json({'message':'Lesson added.'},201)
            if self.path == '/api/curriculum':
                con.execute('INSERT INTO curriculum(level,category,description) VALUES(?,?,?)',(data['level'],data['category'],data.get('description',''))); con.commit(); return self.send_json({'message':'Curriculum category added.'},201)
            return self.send_json({'error':'Route not found.'},404)
        except sqlite3.IntegrityError: return self.send_json({'error':'That email is already registered.'},400)
        finally: con.close()
    def do_PUT(self):
        data=self.body(); con=connection()
        try:
            parts=self.path.strip('/').split('/')
            if len(parts)==3 and parts[0]=='api' and parts[1]=='lessons':
                con.execute('UPDATE lessons SET curriculum_id=?,title=?,language=?,content=?,exercise=? WHERE id=?',(data['curriculum_id'],data['title'],data['language'],data['content'],data.get('exercise',''),int(parts[2]))); con.commit(); return self.send_json({'message':'Lesson updated.'})
            if len(parts)==3 and parts[0]=='api' and parts[1]=='curriculum':
                con.execute('UPDATE curriculum SET level=?,category=?,description=? WHERE id=?',(data['level'],data['category'],data.get('description',''),int(parts[2]))); con.commit(); return self.send_json({'message':'Curriculum category updated.'})
            return self.send_json({'error':'Route not found.'},404)
        finally: con.close()
    def do_DELETE(self):
        con=connection()
        try:
            parts=self.path.strip('/').split('/')
            if len(parts)==3 and parts[0]=='api' and parts[1]=='lessons':
                con.execute('DELETE FROM lessons WHERE id=?',(int(parts[2]),)); con.commit(); return self.send_json({'message':'Lesson deleted.'})
            if len(parts)==3 and parts[0]=='api' and parts[1]=='curriculum':
                con.execute('DELETE FROM lessons WHERE curriculum_id=?',(int(parts[2]),)); con.execute('DELETE FROM curriculum WHERE id=?',(int(parts[2]),)); con.commit(); return self.send_json({'message':'Curriculum category deleted.'})
            return self.send_json({'error':'Route not found.'},404)
        finally: con.close()

if __name__ == '__main__':
    init_database(); print('Literacy Assistant running at http://localhost:8000')
    ThreadingHTTPServer(('localhost',8000),Handler).serve_forever()
