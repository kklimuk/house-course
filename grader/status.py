import glob
import json

assignments = glob.glob('./*.json')

students = {}
for assignment in assignments:
    with open(assignment, 'r') as f:
        data = json.loads(f.read())
        for student in data:

            try:
                if student['name'] not in students:
                    students[student['name']] = {
                        'name': student['name'],
                        'incomplete': [],
                        'failing': False
                    }

                if student['submission'] == 'none':
                    students[student['name']]['incomplete'].append(int(assignment[3:4]))
                    if len(students[student['name']]['incomplete']) > 2:
                        students[student['name']]['failing'] = True
            except Exception, e:
                print student



print json.dumps(filter(lambda student: student['failing'], students.values()))