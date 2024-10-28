from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



# Association table for the many-to-many relationship between Faculty and Course
# faculty_course_association = db.Table('faculty_course',
#     db.Column('faculty_id', db.Integer, db.ForeignKey('faculty.id'), primary_key=True),
#     db.Column('course_id', db.Integer, db.ForeignKey('course.id'), primary_key=True)
# )

# # Association table for the many-to-many relationship between Student and Course
# student_course_association = db.Table('student_course',
#     db.Column('student_id', db.Integer, db.ForeignKey('student.id'), primary_key=True),
#     db.Column('course_id', db.Integer, db.ForeignKey('course.id'), primary_key=True)
# )

user_course_association = db.Table('user_course',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('course.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(1000), nullable=True)
    google_id = db.Column(db.String(120), unique=True, nullable=True)
    type = db.Column(db.String(10),nullable=False)

    def __init__(self, username, type, password=None, google_id = None ):
        self.username = username
        self.password = password
        self.type = type
        self.google_id = google_id
    
    
    courses = db.relationship('Course', secondary=user_course_association, back_populates='users')
    attendances = db.relationship('Attendance', backref='user', lazy=True)


# class Faculty(db.Model):
#     __tablename__ = 'faculty'
    
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=True)
#     department = db.Column(db.String(100)) 
#     courses = db.relationship('Course', secondary=faculty_course_association, back_populates='professors')

    
#     def __repr__(self):
#         return f'<Faculty {self.username}>'

# class Student(db.Model):
#     __tablename__ = 'student'
    
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=True)
    
#     courses = db.relationship('Course', secondary=student_course_association, back_populates='students')
    
#     def __repr__(self):
#         return f'<Student {self.username}>'

    
    
class Course(db.Model):
    __tablename__ = 'course'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    total_lectures = db.Column(db.Integer, nullable=False)
    lectures_conducted = db.Column(db.Integer, default=0)
    total_credits = db.Column(db.Integer, nullable=False)
    
    lectures = db.relationship('Lecture', backref='course', lazy=True)

    # # Define the many-to-many relationship with Faculty
    # professors = db.relationship('Faculty', secondary=faculty_course_association, back_populates='courses')
    
    # # Define the many-to-many relationship with Student
    # students = db.relationship('Student', secondary=student_course_association, back_populates='courses')
    
    users = db.relationship('User', secondary=user_course_association, back_populates='courses')

    def __repr__(self):
        return f'<Course {self.name}>'

class Lecture(db.Model):
    __tablename__ = 'lecture'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    lecture_no = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    # Relationship to notes
    notes = db.relationship('Note', backref='lecture', lazy=True)
    
    
class Attendance(db.Model):
    __tablename__ = 'attendance'
    id = db.Column(db.Integer, primary_key=True,)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'),nullable=False)
    status = db.Column(db.Boolean, default = False)
    
    


    
    
    
class Note(db.Model):
    __tablename__ = 'note'
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(200))
    date_uploaded = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    lecture_id = db.Column(db.Integer, db.ForeignKey('lecture.id'), nullable=False)
    uploaded_by = db.Column(db.String(100), nullable=False)  
    
    

    
    
    