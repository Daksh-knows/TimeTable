from flask import Flask, request, jsonify
from flask import Flask, redirect, url_for, session, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db,User,Course,Attendance,user_course_association,Lecture,Note
from authlib.integrations.flask_client import OAuth
from google.oauth2 import id_token
from google.auth.transport import requests
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from werkzeug.utils import secure_filename
from datetime import datetime,date,timedelta
from config import AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME

from flask_cors import cross_origin
# from crud import create_faculty, get_all_faculties, update_faculty, delete_faculty
# from crud import create_student, get_all_students, update_student, delete_student
from crud import create_course, get_all_courses, update_course, delete_course

app = Flask(__name__)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://avnadmin:AVNS_uAxdYHmnlNwUp4Fmx5E@time-table-time-table-management.h.aivencloud.com:22885/defaultdb'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://JainamCitl:jainam98@localhost/timetable'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'jk48dj37bk44nk007'  # Replace with a strong secret key
app.config['JWT_SECRET_KEY'] = 'lm10dec18wc2022'  # Replace with a strong JWT secret key
app.config['GOOGLE_CLIENT_ID'] = '443724804555-8eak2q6jjmlk9huk516401pjs4p9vvo8.apps.googleusercontent.com'
app.config['GOOGLE_CLIENT_SECRET'] = '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'
from config import AZURE_STORAGE_CONNECTION_STRING, AZURE_CONTAINER_NAME
blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)


# db = SQLAlchemy(app)
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
oauth = OAuth(app)

google = oauth.register(
    name='google',
    client_id=app.config['GOOGLE_CLIENT_ID'],
    client_secret=app.config['GOOGLE_CLIENT_SECRET'],
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    userinfo_endpoint='https://www.googleapis.com/oauth2/v3/userinfo',
    client_kwargs={'scope': 'openid profile email'},
)
#login and signup

from werkzeug.security import generate_password_hash

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # print(data)
    username = data.get('username')
    
    password = data.get('password')
    email = data.get('email')
    user_type = data.get('type')
    # print(user_type)
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, type = user_type, email = email)
    db.session.add(new_user)
    db.session.commit()
    # global student
    # if user_type == 'student':
    #     student = create_student(data['username'], None)
        
    # elif user_type == 'faculty':
    #     student = create_faculty(data['username'], None, None)
    access_token = create_access_token(identity={'id': new_user.id},expires_delta=timedelta(minutes=200)) 
    
    if isinstance(access_token, bytes):
        access_token = access_token.decode('utf-8')
    # students = get_all_students()
    # for stu in students:
    #     print(stu.username)
    
    return jsonify({'access_token': access_token, 'type':new_user.type, 'id':new_user.id, 'username':new_user.username, 'email':new_user.email}), 200

from werkzeug.security import check_password_hash

@app.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    
    # if user.type == 'student':
    #     students = Student.query.all()
    #     for student in students:
    #         if student.username == username:
    #             break
                
        
    # if user.type == 'faculty':
    #     faculties = Faculty.query.all()
    #     for student in faculties:
    #         if student.username == username:
    #             break
    
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity={'id': user.id},expires_delta=timedelta(minutes=200))
        if isinstance(access_token, bytes):
            access_token = access_token.decode('utf-8')

        return jsonify({'access_token': access_token, 'type':user.type,'id':user.id, 'username':user.username, 'email':user.email}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/google-login',methods=['POST'])
def google_login():
    # Redirect user to Google login
    token = request.json.get('token')
    # user_type = request.json.get('type')
    try:
        google_client_id = app.config['GOOGLE_CLIENT_ID']
        user_info = id_token.verify_oauth2_token(token,requests.Request(),google_client_id)
        google_id = user_info['sub']
        # username = user_info['email']
    except ValueError:
        return jsonify({"error":"Invalid token"})
    print(f"the username is {google_id}")
    user = User.query.filter_by(google_id=google_id).first()

    if user:
        # If user exists, log them in
        access_token = create_access_token(identity={'id': user.id},expires_delta=timedelta(minutes=200)) 
        if isinstance(access_token, bytes):
            access_token = access_token.decode('utf-8')
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'username': user.username,
            'id': user.id,
            'type': user.type,
            'email': user.email
        }), 200

    # If user does not exist, redirect them to the signup form (frontend should handle user type collection)
    return jsonify({'message': 'User not found. Please sign up.'}), 404
    

@app.route('/google-signup', methods=['POST'])
def google_signup():
    # Google callback flow for new users
    
    token = request.json.get('token')
    user_type = request.json.get('type')
    try:
        google_client_id = app.config['GOOGLE_CLIENT_ID']
        user_info = id_token.verify_oauth2_token(token,requests.Request(),google_client_id)
        
        google_id = user_info['sub']
        username = user_info['email']
    except ValueError:
        return jsonify({"error":"Invalid token"})
      
    # Retrieve user info using the token
    # resp = google.get('userinfo', token=token)
    # user_info = resp.json()

    # google_id = user_info['sub']
    # username = user_info['email']
    # data = request.get_json()
    # user_type = data.get('type')
    
    print(f"the username is {google_id}")

    if User.query.filter_by(google_id=google_id).first():
        return jsonify({'message': 'User already exists'}), 409

    # Create new user with type (student/faculty)
    
    new_user = User(username=username, google_id=google_id, type=user_type, email = username)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity={'id': new_user.id},expires_delta=timedelta(minutes=200))
    if isinstance(access_token, bytes):
        access_token = access_token.decode('utf-8')

    return jsonify({
        'message': 'Signup successful',
        'access_token': access_token,
        'username': new_user.username,
        'type': new_user.type,
        'id': new_user.id,
        'email': new_user.email
    }), 200

# @app.route('/google-auth-callback')
# def google_auth_callback():
#     # Get the access token and user info from Google
#     token = google.authorize_access_token()
#     resp = google.get('userinfo')
#     user_info = resp.json()

#     google_id = user_info['sub']
#     username = user_info['email']

#     # Check if user exists
#     user = User.query.filter_by(google_id=google_id).first()

#     if user:
#         # If user exists, log them in
#         access_token = create_access_token(identity={'username': new_user.username, 'id': new_user.id, 'type': new_user.type}) 
#         return jsonify({
#             'message': 'Login successful',
#             'access_token': access_token,
#             'username': user.username,
#             'id': user.id,
#             'type': user.type
#         }), 200

#     # If user does not exist, redirect them to the signup form (frontend should handle user type collection)
#     return jsonify({'message': 'User not found. Please sign up.'}), 404


@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

from flask import session, jsonify

# @app.route('/login', methods=['POST'])
# def login():
#     # Assume you've verified user credentials
#     user = ... # fetched user object from database
#     session['username'] = user.username  # Store username in session
#     return jsonify({'message': 'Login successful', 'username': user.username})

# @app.route('/check_login', methods=['GET'])
# def check_login():
#     if 'username' in session:
#         return jsonify({'logged_in': True, 'username': session['username']})
#     else:
#         return jsonify({'logged_in': False})

#faculty routes

# @app.route('/create_faculty', methods=['POST'])
# def create_faculty_route():
#     data = request.json
#     faculty = create_faculty(data['username'], data['email',None], data.get('department', None))
#     return jsonify({'id': faculty.id, 'username': faculty.username})

# @app.route('/get_faculties', methods=['GET'])
# def get_faculties_route():
#     faculties = get_all_faculties()
#     return jsonify([{'id': f.id, 'username': f.username, 'email': f.email} for f in faculties])

# @app.route('/update_faculty/<int:faculty_id>', methods=['PUT'])
# def update_faculty_route(faculty_id):
#     data = request.json
#     faculty = update_faculty(faculty_id, data.get('username', None), data.get('email', None), data.get('department', None))
#     return jsonify({'id': faculty.id, 'username': faculty.username, 'email': faculty.email})

# @app.route('/delete_faculty/<int:faculty_id>', methods=['DELETE'])
# def delete_faculty_route(faculty_id):
#     delete_faculty(faculty_id)
#     return jsonify({'message': 'Faculty deleted successfully'})


# student routes


# def create_student_route():
#     data = request.json
#     student = create_student(data['username'], data['email'])
#     return jsonify({'id': student.id, 'username': student.username})

# @app.route('/student', methods=['GET'])
# def get_all_students_route():
#     students = get_all_students()
#     return jsonify([{'id': s.id, 'username': s.username} for s in students])

# @app.route('/update_student/<int:student_id>', methods=['PUT'])
# def update_student_route(student_id):
#     data = request.json
#     student = update_student(student_id, data.get('username', None), data.get('email', None), data.get('department', None))
#     return jsonify({'id': student.id, 'username': student.username, 'email': student.email})

# @app.route('/delete_student/<int:student_id>', methods=['DELETE'])
# def delete_student_route(student_id):
#     delete_student(student_id)
#     return jsonify({'message': 'Student deleted successfully'})


#courses

@app.route('/course', methods=['POST'])
def create_course_route():
    data = request.json
    new_course = create_course(
        data['name'],
        data['start_date'],
        data['end_date'],
        data['total_lectures'],
        data.get('lectures_conducted', 0),  # Default to 0 if not provided
        data['total_credits']
    )
    
    return jsonify({'id': new_course.id, 'name': new_course.name})

# Retrieve All Courses
@app.route('/courses', methods=['GET'])
def get_all_courses_route():
    course_id = 11  # Course ID for "Intro to CS"
    
    # List of lecture titles for an Intro to CS course
    titles = [
        "Introduction to Computer Science",
        "History of Computing",
        "Basic Computer Hardware",
        "Introduction to Software",
        "Operating Systems Overview",
        "Binary and Data Representation",
        "Introduction to Programming",
        "Algorithms and Problem Solving",
        "Data Structures Basics",
        "Networking and the Internet",
        "Introduction to Databases",
        "Computer Security Fundamentals",
        "Ethics in Computing",
        "Artificial Intelligence Overview",
        "Data Science Basics",
        "The Future of Computing",
        "Cloud Computing and Virtualization",
        "Web Development Basics",
        "Intro to Software Engineering",
        "Mobile Computing",
        "Cybersecurity Principles",
        "Machine Learning Intro",
        "Data Privacy and Security",
        "Computer Graphics Basics",
        "Introduction to Game Development",
        "IoT and Embedded Systems",
        "Human-Computer Interaction",
        "Computational Thinking",
        "Big Data Fundamentals",
        "Course Summary and Wrap-up"
    ]
    
    # Set the date range: May 1, 2024, to December 31, 2024
    start_date = date(2024, 5, 1)
    end_date = date(2024, 12, 31)
    
    # Calculate the interval for distributing dates evenly over the range
    total_days = (end_date - start_date).days
    interval_days = total_days // 29  # 30 lectures, so 29 intervals

    # Generate lecture records
    lectures = []
    for i in range(30):
        lecture_date = start_date + timedelta(days=i * interval_days)
        lecture = Lecture(
            title=titles[i],
            lecture_no=i + 1,
            date=lecture_date,
            status="Scheduled" if lecture_date > date.today() else "Conducted",
            course_id=course_id
        )
        lectures.append(lecture)
    
    # Add to database
    db.session.add_all(lectures)
    db.session.commit()
    print("Lectures added to database successfully")
    courses = get_all_courses()
    return jsonify([{
        'id': course.id,
        'name': course.name,
        'start_date': str(course.start_date),
        'end_date': str(course.end_date),
        'total_lectures': course.total_lectures,
        'lectures_conducted': course.lectures_conducted,
        'total_credits': course.total_credits
    } for course in courses])

# Update Course
@app.route('/update_course/<int:course_id>', methods=['PUT'])
def update_course_route(course_id):
    data = request.json
    course = update_course(course_id,data.get('start_date',None),data.get('end_date',None),data.get('total_lectures',None),data.get('lectures_conducted',None),None)
    db.session.commit()
    return jsonify({'id': course.id, 'name': course.name})

# Delete Course
@app.route('/delete_course/<int:course_id>', methods=['DELETE'])
def delete_course_route(course_id):
    course = delete_course(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Course deleted successfully'})

@app.route('/course/<int:course_id>', methods=['GET'])
def get_course_details(course_id):
    course = Course.query.get(course_id)
    if not course:
         return jsonify({'message': 'Course not found'}), 404
    return jsonify({
        'name': course.name,
        'date':str(course.start_date) + ' - ' + str(course.end_date),
        'color': "#d0c1ff",
    }), 200

#student-->course

@app.route('/enroll_student', methods=['POST'])
def enroll_student():
    data = request.json
    user_id = data.get('user_id')
    course_id = data.get('course_id')

    user = User.query.get(user_id)
    course = Course.query.get(course_id)

    if not user or not course:
        return jsonify({'message': 'User or Course not found'}), 404

    user.courses.append(course)
    db.session.commit()
    
    return jsonify({'message': 'Student enrolled in course successfully'})


@app.route('/user/courses', methods = ['POST'])
@jwt_required()
def get_user_courses():
    data = request.json
    user_id = data.get('user_id')
    print("hi")
    if not user_id:
        return jsonify({'message': 'User ID is required'}), 400
    
    token_user_id = get_jwt_identity()
    print(token_user_id['id'])
    if token_user_id['id'] != user_id:
        print(token_user_id)
        return jsonify({'message': 'User ID does not match token identity'}), 403


    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    
    courses = user.courses
    return jsonify([{
        'id': course.id,
        'title': course.name,
        'date':str(course.start_date) + ' - ' + str(course.end_date),
        'lectures': str(course.lectures_conducted) + '/' + str(course.total_lectures),
        'color': "#d0c1ff",
    } for course in courses]) , 200
    
# course-->lectures
@app.route('/lectures/<int:course_id>', methods=['GET'])
def get_lectures_route(course_id):
    # data = request.json
    # course_id = data.get('course_id')
    course = Course.query.get(course_id)
    lecs = course.lectures
    response = []
    for lecture in lecs:
        response.append({
        'id': lecture.id,
        'title': lecture.title,
        'no': lecture.lecture_no,
        'date': lecture.date,
        'status': lecture.status,
        })
    
    return jsonify({'course_name':course.name,'lectures':response})

@app.route('/update-attendance',methods=['POST'])
def update_attendance():
    print(request.json)
    data = request.json
    attendance = data.get('attendanceData')
    if not attendance:
        return jsonify({'message':'No data provided'}), 400
    lec_no = int(data.get('lecture_no'))
    course_id = int(data.get('course_id'))
    course = Course.query.get(int(course_id))
    
        
    lecture_id = None
    for lecture in course.lectures:
        if lecture.lecture_no == lec_no:
            lecture_id = lecture.id
            break
    if not lecture_id:
        return jsonify({'message': 'No such lecture'}), 400
    for student in attendance:
        s = student['att']
        status = False
        if s.lower() == 'p':
            status=True
        id = int(student['id'])
        user = User.query.get(id)
        if user and user.type =='student':
            if course not in user.courses:
                continue
            existing_attendance = Attendance.query.filter_by(
            lecture_id=lecture_id,
            course_id=course_id,
            user_id=id
            ).first()
            if existing_attendance:
               existing_attendance.status = status
               db.session.add(existing_attendance)
            else:       
                new_attendance = Attendance(
                lecture_id=lecture_id,
                user_id=id,
                course_id=course_id,
                status = status)
                db.session.add(new_attendance)
                 
    db.session.commit()   
    
    return jsonify({'message':'Attendance updated'}) ,200


@app.route('/fetch_attendance', methods=['POST'])
def fetch_attendance():
    course_id = int(request.json.get('course_id'))
    course = Course.query.get(course_id)
    
    if not course:
        return {'message': 'Course not found'}, 404
    
    
    lecs = course.lectures
    print(lecs)
    if not lecs:
        return jsonify({'message':'No lectures found'}), 400
    total_lectures=0
    for lecture in lecs:
        if (lecture.status).lower() == 'conducted':
            total_lectures+=1
    
    
    
    
    user_attendance = []
    
    
    course_users = course.users
    for user in course_users:
        if user.type == 'student':
            print(user)
            attended_lectures = 0
            for attendance in user.attendances:
                if attendance.course_id == course_id and attendance.status == True:
                    attended_lectures+=1
            attendance_percentage = (attended_lectures / total_lectures) * 100
            user_attendance.append({
                'student_id': user.id,
                'student_name': user.username,
                'attendance_percentage': attendance_percentage
            })
    
    
    if user_attendance:
        print(user_attendance)
        return jsonify({'attendance':user_attendance}) , 200
    return jsonify({'message': 'No users found'}) , 400


@app.route('/find_attendance_course',methods=['POST'])
def find_attendance_course():
    course_id = int(request.json.get('course_id'))
    course = Course.query.get(course_id)
    lecs = course.lectures
    tot = 0
    for user in course.users:
        if user.type.lower() == 'student':
            tot+=1
    
    # attendance = course.attendance
    bar = {}
    print(lecs)
    for lec in lecs:
        if (lec.status).lower() != 'conducted':
            continue
        att = lec.attendances
        to_add = 0
        for a in att:
            if a.status==True:
                to_add +=1
        date = lec.date
        x = str(date.year)+'/'+str(date.month)
        if x in bar:
            bar[x][0]+=to_add
            bar[x][1]+=tot
        else:
            bar[x]=[to_add,tot]
            
    print(bar)
    return jsonify({'attendance':bar}) , 200
    
    

@app.route('/find_defaulters', methods=['POST'])
def find_defaulters():
    # Get the course
    course_id = int(request.json.get('course_id'))
    course = Course.query.get(course_id)
    
    if not course:
        return {'message': 'Course not found'}, 404
    
    # Query the total number of lectures in the course
    lecs = course.lectures
    print(lecs)
    if not lecs:
        return jsonify({'message':'No lectures found'}), 400
    total_lectures=0
    for lecture in lecs:
        if (lecture.status).lower() == 'conducted':
            total_lectures+=1
    
    
    
    # List to store defaulters
    defaulters = []
    
    
    course_users = course.users
    for user in course_users:
        # Query the number of lectures the student has attended
        
        if user.type == 'student':
            print(user)
            attended_lectures = 0
            for attendance in user.attendances:
                if attendance.course_id == course_id and attendance.status == True:
                    attended_lectures+=1
            attendance_percentage = (attended_lectures / total_lectures) * 100
            
            if attendance_percentage < 70:
                defaulters.append({
                    'student_id': user.id,
                    'student_name': user.username,
                    'attendance_percentage': attendance_percentage
                })
    print(len(defaulters))
    
    if defaulters:
        print(defaulters)
        return jsonify({'defaulters':defaulters}) , 200
    return jsonify(defaulters if defaulters else {'message': 'No defaulters found'}) , 200
    
    
@app.route('/upload_note', methods=['POST'])
def upload_note():
    
    course_id = request.form.get('course_id')
    lecture_no = request.form.get('lecture_no')
    file = request.files['file']
    
    # Find the lecture by course_id and lecture_no
    lecture = Lecture.query.filter_by(course_id=course_id, lecture_no=lecture_no).first()
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404
    
    # Generate a unique file name and upload to Azure
    filename = secure_filename(file.filename)
    blob_name = f"{lecture.course_id}/{lecture.id}/{filename}"
    blob_client = blob_service_client.get_blob_client(container=AZURE_CONTAINER_NAME, blob=blob_name)
    
    # Upload file to Azure Blob Storage
    try:
        blob_client.upload_blob(file, overwrite=True)
        file_url = f"https://{blob_client.account_name}.blob.core.windows.net/{AZURE_CONTAINER_NAME}/{blob_name}"
        print("File uploaded successfully")
    except Exception as e:
        return jsonify({"error": f"File upload failed: {str(e)}"}), 500

    # Save metadata to the Note table
    new_note = Note(file_path=file_url, lecture_id=lecture.id)
    db.session.add(new_note)
    db.session.commit()

    return jsonify({
        "message": "File uploaded successfully",
        "file_url": file_url,
        "note_id": new_note.id
    }), 200
    
    
@app.route('/get_notes_by_course/<int:course_id>', methods=['GET'])
def get_notes_by_course(course_id):
    try:
       
        lectures = Lecture.query.filter_by(course_id=course_id).all()

        # Create a dictionary to hold notes by lecture
        notes_by_lecture = []
        conducted_lectures = 0
        for lecture in lectures:
            if lecture.status.lower() == 'conducted':
                conducted_lectures+=1
            notes = Note.query.filter_by(lecture_id=lecture.id).all()
            if notes:
                for note in notes:
                    notes_by_lecture.append({'lecture_no': lecture.lecture_no,
                                             'lecture_topic': lecture.title,
                                             'note_id': note.id,
                                             'file_path': note.file_path,
                                             })

        return jsonify({'notes': notes_by_lecture, 'uploaded_notes':len(notes_by_lecture),'total_lecs':conducted_lectures})

    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@app.route('/get_user_attendance',methods=['POST'])
def get_user_attendance():
    data = request.json
    user_id = int(data.get('user_id'))
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    courses = user.courses
    user_attendance = user.attendances
    attendance_rec = {}
    for course in courses:
        lecs = course.lectures
        cond_lecs = 0
        for lec in lecs:
            if lec.status.lower()=='conducted':
                cond_lecs+=1
        total_lecs = len(lecs)
        attendance_rec[course.id] = {'name':course.name,'conductedLectures':cond_lecs,'totalLectures':total_lecs,'attendedLectures':0}
    for attendance in user_attendance:
        course_id = attendance.course_id
        attendance_rec[course_id]['attendedLectures']+=1
    
    print(attendance_rec)
    return jsonify(list(attendance_rec.values()))
      
    






if __name__ == '__main__':
    app.run(debug=True)
    
