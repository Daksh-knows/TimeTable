# crud.py

from models import db,Course

# Create operations

# def create_faculty(username, email, department):
#     new_faculty = Faculty(username=username, email=email, department=department)
#     db.session.add(new_faculty)
#     db.session.commit()
#     return new_faculty

# def create_student(username, email):
#     new_student = Student(username=username, email=email)
#     db.session.add(new_student)
#     db.session.commit()
#     return new_student

def create_course(name, start_date, end_date, total_lectures,lectures_conducted,total_credits):
    new_course = Course(name=name, start_date=start_date, end_date=end_date, total_lectures=total_lectures,lectures_conducted=lectures_conducted , total_credits=total_credits)
    db.session.add(new_course)
    db.session.commit()
    return new_course



# Read operations

# def get_all_faculties():
#     return Faculty.query.all()

# def get_faculty_by_id(faculty_id):
#     return Faculty.query.get(faculty_id)

# def get_all_students():
#     return Student.query.all()

# def get_student_by_id(student_id):
#     return Student.query.get(student_id)

def get_all_courses():
    return Course.query.all()

def get_course_by_id(course_id):
    return Course.query.get(course_id)

# Update operations

# def update_faculty(faculty_id, username=None, email=None, department=None):
#     faculty = Faculty.query.get(faculty_id)
#     if username:
#         faculty.username = username
#     if email:
#         faculty.email = email
#     if department:
#         faculty.department = department
#     db.session.commit()
#     return faculty

# def update_student(student_id, username=None, email=None):
#     student = Student.query.get(student_id)
#     if username:
#         student.username = username
#     if email:
#         student.email = email
#     db.session.commit()
#     return student

def update_course(course_id, name=None, total_lectures=None, lectures_conducted=None, total_credits=None):
    course = Course.query.get(course_id)
    if name:
        course.name = name
    if total_lectures:
        course.total_lectures = total_lectures
    if lectures_conducted is not None:
        course.lectures_conducted = lectures_conducted
    if total_credits:
        course.total_credits = total_credits
    db.session.commit()
    return course

# Delete operations

# def delete_faculty(faculty_id):
#     faculty = Faculty.query.get(faculty_id)
#     db.session.delete(faculty)
#     db.session.commit()

# def delete_student(student_id):
#     student = Student.query.get(student_id)
#     db.session.delete(student)
#     db.session.commit()

def delete_course(course_id):
    course = Course.query.get(course_id)
    db.session.delete(course)
    db.session.commit()
