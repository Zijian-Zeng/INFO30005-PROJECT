# INFO30005 Project - MeeTute

MeeTute is a platform that wants to make consultations and support services more accessible for students and more manageable for staff.

## User Guide for front-end (Deliverable 3)

---

## Testing Account Details:

Email: test1@email.com

Password: 123456

Usertype: Can be used as both student and staff

## Functionality 1: Enrollment Subject List

After log in, you will be directed to the settings page where both student and staff accounts can join new subjects or leave current enrolled subjects. In addition, staff accounts have access to create new subject (with new subject name and subject code). Both student and staff accounts can only enroll in a maximum of 5 subjects, which aligns with the maximum workload allowed each semester at UniMelb.

## Functionality 2: Consultation Booking System

In this system, teaching staff can set up consultations for different subjects - each consultation includes subject information, duration, location and slots available. After creation, student accounts then can register for available consultations in different subjects. Students can view all registered consultations. If you view consultations by subject, there will be three colours representing three statuses - green for registered, blue for available to book and red for fully booked.

## User Guide for backend (Deliverable 2)

---

-   Steps to use our backend:

    1. Staff must create subjects first for students to enroll in the subject
    2. For consultations, staff must create the consultation in order for students to register
    3. For appointment, students must create the appointment first in order for staff to approve or decline
    4. Study hubs are only for students, and user analytics are only for staff

-   Note:

    1. The order of the APIs presented below has been explicitly designed to perform consistent testing.

    2. Some of the requests below are not idempotent, you might get different results if you run it for multiple times.

    3. If the token is not working, you can always log in using the below user details to get a new one.

All the API testing request data can be found in the "[meetute_API_testing](https://github.com/Zijian-Zeng/INFO30005-PROJECT/blob/master/meetute_API_testing.json)" JSON file for Postman to import.

## Guides for back-end APIs: /api/...

### Production environment: https://meetute.herokuapp.com

### Postman Document: https://documenter.getpostman.com/view/11130247/SzmY8gZr

---

## Public routes: /api/shared/...

-   ### users: /api/shared/users/...

    1.  ### Sign up.

            POST /api/shared/users/signup [done]
            {
                "email": "staff@email.com",
                "password":"123456",
                "userType":"staff",
                "firstName":"test",
                "lastName":"0",
                "subjects":["INFO30005"]
            }

            {
                "email": "student@email.com",
                "password":"123456",
                "userType":"student",
                "firstName":"test",
                "lastName":"0",
                "subjects":["INFO30005"]
            }

    2.  ### Login.

            POST /api/shared/users/login [done]

            Login as student:
            {
                "email":"student@email.com",
                "password":"123456",
                "userType":"student"
            }

            Login as staff:
            {
                "email":"staff@email.com",
                "password":"123456",
                "userType":"staff"
            }

    3.  ### Get all available subjects in database for sign up.
            GET /api/shared/users/allSubjects [done]

-   ### Once the user successfully logins, server responses with a "meetute-token" header as a token for client to verify their identity.

-   ### Before accessing each functionality, "meetute-token" header must included in client request to verify their identity.

---

---

## Subject functionality:

-   ### staff Routes: /api/staff/subjects/..

    1.  ### Create a new subjects in database (staff only)

            POST /api/staff/subjects/create [done]
            {
                "subjectCode":"COMP10001"
            }

    2.  ### Delete a subject from database.

            DELETE /api/staff/subjects/delete [done]
            {
                "subjectCode":"COMP10001"
            }

    3.  ### Join a subject.

            POST /api/student/subjects/join [done]
            {
                "subjectCode":"COMP10002"
            }

    4.  ### Leave a subject.

            POST /api/student/subjects/leave [done]
            {
                "subjectCode":"COMP10002"
            }

    5.  ### Get all enrolled subjects

            GET /api/student/subjects/all [done]

*   ### student routes: /api/student/subjects/..


    1.  ### Get all of staff information in a subject.

            GET /api/shared/users/allStaff [done]
            {
                "subjectCode":"INFO30005"
            }

    2.  ### Get all enrolled subjects

            GET /api/student/subjects/all [done]


    3.  ### Leave a subject.

            POST /api/student/subjects/leave [done]
            {
                "subjectCode":"COMP10002"
            }

    4.  ### Join a subject

            POST /api/student/subjects/join [done]
            {
                "subjectCode":"COMP10002"
            }

---

---

## Key functionality #1: Consultation Booking System

-   ### staff Routes: /api/staff/consult/...

    1.  ### Get all of the available consultations of a subject.

            GET /api/staff/consult/viewAll [done]
            {
                "subjectCode":"INFO30005"
            }

    2.  ### View the consultations created by this account.

            GET /api/staff/consult/viewCreated [done]

    3.  ### Update the information of an existing consultation time. The id is the consultation ID from the consultation created beforehand.

            PATCH /api/staff/consult/patch [done]
            {
                "id":"5ea440828a1fceb262c857aa",
                "slotsAvailable": 30
            }

    4.  ### Create a new weekly consultation time for a subject.

            POST /api/staff/consult/create [done]
            {
                "subjectCode":"INFO30005",
                "startDate": "12 24 2020 14:00",
                "endDate": "12 24 2020 15:00",
                "location": "Building A",
                "slotsAvailable": 20
            }


    5.  ### Delete an existing consultation time of a subject.

            DELETE /api/staff/consult/delete [done]
            {
                "id":"5eaa5f5af6c2fa3e160d6efc"
            }

-   ### student Routes: /api/student/consult/...

    1.  ### Get all of the available consultations in a subject.

            GET /api/student/consult/viewAll [done]
            {
                "subjectCode":"INFO30005"
            }

    2.  ### Get all of registered consultations in the current account.

            GET /api/student/consult/viewRegistered [done]

    3.  ### Cancel the booking of a consultation.

            POST /api/student/consult/cancel [done]
            {
                "id":"5ea440828a1fceb262c857aa"
            }

    4.  ### Book an available consultation.

            POST /api/student/consult/book [done]
            {
                "id":"5ea440828a1fceb262c857aa"
            }

---

---

## Key functionality #2: Scheduling Assistant (Private appointment)

-   ### student Routes: /api/student/appointment/...

    1.  ### Get all requests of appointments.

            GET /api/student/appointment/all [done]

    2.  ### Resubmit and update the information of an appointment.

            PATH /api/student/appointment/update [done]
            {
                "id":"5eaa4fd0b2ccd03c832c75bf",
                "comment": "how about this time?",
                "startDate":"12 2 2020 19:00",
                "endDate":"12 2 2020 20:00",
                "location":"building B"
            }

    3.  ### Request an appointment.

            POST /api/student/appointment/request [done]
            {
                "subjectCode":"INFO30005",
                "startDate":"8 27 2020 11:00",
                "endDate":"8 27 2020 12:00",
                "location":"building ABC",
                "staffId":"5ea3952ee4674dab002046bc"
            }

    4.  ### Delete a request of an appointment.

            DELETE /api/student/appointment/delete [done]
            {
                "id":"5eaa5efff6c2fa3e160d6efb"
            }

-   ### staff Routes: /api/staff/appointment/...

    1.  ### Get all of the requests of appointments from students.

            GET /api/staff/appointment/all [done]

    2.  ### Review and edit an appointment request.

            PATCH /api/staff/appointment/pend [done]
            {
                "id":"5eaa4fd0b2ccd03c832c75bf",
                "status":"DECLINED",
                "comment":"No, another time my friend."
            }

---

---

## Key functionality #3: Study Hub Formation (students only)

-   ### student routes: /api/student/hub/...

    1.  ### Get all of the study hubs of a subject.

            GET /api/student/hub/all [done]
            {
                "subjectCode":"INFO30005"
            }

    2.  ### Get all of the registered study hubs

            GET /api/student/hub/registered [done]

    3.  ### Update the information of a study hub.

            PATCH /api/student/hub/update [done]
            {
                "location":"Building B",
                "id":"5eaa4ee4b2ccd03c832c75bd"
            }

    4.  ### Create a study hub.

            POST /api/student/hub/create [done]
            {
                "subjectCode": "INFO30005",
                "location": "Building A",
                "startDate": "12 24 2020 12:00",
                "endDate":"12 25 2020 1:00",
                "summary": "Web info studyhub 1"
            }

    5.  ### Leave a study hub.

            POST /api/student/hub/leave [done]
            {
                "id":"5ea99e70fccbbd34ea7b460a"
            }

    6.  ### Join a study hub.

            POST /api/student/hub/join [done]
            {
                "id":"5ea99e70fccbbd34ea7b460a"
            }

---

---

## Key functionality #4: User Analytics (staff only)

-   ### staff routes: /api/staff/analytic/...

    1.  ### Analyse consultation sign up data, visualizations will be implemented by front-end.
            GET /api/staff/analytic [done]

---

---
