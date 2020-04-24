# INFO30005 Project - MeeTute

MeeTute is a platform that wants to make consultation and support services more accessible for students and more manageable for staff.

# Guides for back-end APIs: /api/...

Production environment: [https://meetute.herokuapp.com](https://meetute.herokuapp.com)

---

---

## Public routes: /api/shared/...

-   ### users: /api/shared/users/...

    1.  ### Sign up.

            POST /api/shared/users/signup [done]

    2.  ### Login.

            POST /api/shared/users/login [done]

            Login as student:
            {
                "email":"test1@email.com",
                "password":"123456",
                "userType":"student"
            }

            Login as staff:
            {
                "email":"test1@email.com",
                "password":"123456",
                "userType":"staff"
            }


    3.  ### Get all available subjects in database.
            GET /api/shared/users/allSubjects [done]

-   ### Once the user successfully logins, server responses a "meetute-token" header as a token for client to verify their identity.

---

---

---

## student Routes: /api/student/...

-   ### Before accessing this, "meetute-token" header must included in client request to verify their identity.

*   ### subjects: /api/student/subjects/..

    1.  ### Join a subject

            POST /api/student/subjects/join [done]

    2.  ### Leave a subject.

            POST /api/student/subjects/leave [done]

    3.  ### Get all of staff information in a subject.

            GET /api/shared/users/allStaff [done]

    4.  ### Get all enrolled subjects

            GET /api/student/subjects/all [done]

    ---

*   ### consultation: /api/student/consult/...

    1.  ### Get all of the available consultations in a subject.

            GET /api/student/consult/viewAll [done]

    2.  ### Get all of registered consultations in the current account.

            GET /api/student/consult/viewRegistered [done]

    3.  ### Book an available consultation.

            POST /api/student/consult/book [done]

    4.  ### Cancel the booking of a consultation.

            POST /api/student/consult/cancel [done]

    ---

*   ### Appointment: /api/student/appointment/...

    1.  ### Request an appointment.

            POST /api/student/appointment/request [done]

    2.  ### Delete a request of an appointment.

            DELETE /api/student/appointment/delete [done]


    3.  ### Get all requests of appointments.

            GET /api/student/appointment/all [done]

    4.  ### Resubmit and update the information of an appointment.

            PATH /api/student/appointment/update [done]

    ---

-   ### studyHub: /api/student/hub/...


    1.  ### Create a study hub.

            POST /api/student/hub/create [done]

    2.  ### Get all of the study hubs of a subject.

            GET /api/student/hub/all [done]


    3.  ### Get all of the study hubs of a subject.
            GET /api/student/hub/registered [done]

    4.  ### Join a study hub.
            POST /api/student/hub/join [done]

    5.  ### Leave a study hub.
            POST /api/student/hub/leave [done]

    6.  ### Update the information of a study hub.
            PATCH /api/student/hub/update [done]

-   ### Data Analytic: /api/student/analytic
    1.  ### Grab some useful data in this account, Charts are displayed by front-end.
            GET /api/student/analytic [to be continued]

---

---

---

## staff Routes: /api/staff/...

-   ### Before accessing this, "meetute-token" header must included in client request to verify their identity.

-   ### subjects: /api/staff/subjects/..

    1.  ### Create a new subjects in database (staff only)

            POST /api/staff/subjects/create [done]

    2.  ### Delete a subject from database.

            DELETE /api/staff/subjects/delete [done]

    3.  ### Join a subject.

            POST /api/student/subjects/join [done]

    4.  ### Leave a subject.

            POST /api/student/subjects/leave [done]

    5.  ### Get all enrolled subjects

            GET /api/student/subjects/all [done]

-   ### consultation: /api/staff/consult/...

    1.  ### Get all of the available consultations of a subject.

            GET /api/staff/consult/viewAll [done]

    2.  ### View the consultations created by this account.

            GET /api/staff/consult/viewCreated [done]

    3.  ### Create a new weekly consultation time for a subject.

            POST /api/staff/consult/create [done]

    4.  ### Delete an existing consultation time of a subject.

            DELETE /api/staff/consult/delete [done]

    5.  ### Update the information of an existing consultation time.
            PATCH /api/staff/consult/patch [done]

*   ### Appointment: /api/staff/appointment/...

    1.  ### Pending a request of appointments.

            PATCH /api/staff/appointment/pend [done]

    2.  ### Get all of the requests of appointments from students.
            GET /api/staff/appointment/all [done]

-   ### Data Analytic: /api/staff/analytic
    1.  ### Grab some useful data in this account, Charts are displayed by front-end.
            GET /api/staff/analytic [to be continued]
