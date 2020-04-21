# Guides for back-end APIs: /api/...

## public Routes: /api/shared/...

    users: /api/shared/users/...
        //Login.
        POST /api/shared/users/signup [done]

        //Sign up.
        POST /api/shared/users/login [done]

        //Get all available subjects in database.
        GET /api/shared/users/allSubjects [done]

        * once successfully login, server responses "meetute-token" header as a token for client to verify their identity.

## student Routes: /api/student/...

    * Before accessing this, "meetute-token" header must included in client request to verify their identity.

    subjects: /api/student/subjects/..
        //Join a subject
        POST /api/student/subjects/join [done]

        //Leave a subject.
        POST /api/student/subjects/leave [done]

        //Get all selected subjects
        GET /api/student/subjects/all [done]

    consultation: /api/student/consult/...
        //Get all of the available consultations of a subject.
        GET /api/student/consult/viewAll [done]

        //Get all of registered consultations in the current account.
        GET /api/student/consult/viewRegistered [done]

        //Book an available consultation.
        POST /api/student/consult/book [done]

        //Cancel the booking of a consultation.
        POST /api/student/consult/cancel [done]


    Appointment: /api/student/appointment/...

        //Request an appointment.
        POST /api/student/appointment/request [Jamie]

        //Delete a request of appointment.
        DELETE /api/student/appointment/delete [Jamie]

        //Get all requests of appointment.
        GET /api/student/appointment/all [Jamie]


    studyHub: /api/student/hub/...
        //Create a study hub.
        POST /api/student/hub/create [Chloe]

        //Get all of the study hubs of a subject.
        GET /api/student/hub/all [Chloe]


        //Get all of the study hubs of a subject.
        GET /api/student/hub/registered [Chloe]

        //Join a study hub.
        POST /api/student/hub/join [Chloe]

        //Leave a study hub.
        POST /api/student/hub/leave [Chloe]

        //Update the information of a study hub.
        PATCH /api/student/hub/update [Chloe]

## staff Routes: /api/staff/...

    * Before accessing this, "meetute-token" header must included in client request to verify their identity.

    subjects: /api/staff/subjects/..
        //Create a new subjects in database (staff only)
        POST /api/staff/subjects/create [done]

        //Delete a subject from database.
        DELETE /api/staff/subjects/delete [done]

        //Join a subject.
        POST /api/student/subjects/join [done]

        //Leave a subject.
        POST /api/student/subjects/leave [done]

    consultation: /api/staff/consult/...

        //Get all of the available consultations of a subject.
        GET /api/staff/consult/viewAll [done]

        //View the consultations created by this account.
         GET /api/staff/consult/viewCreated [done]

        //Create a new weekly consultation time for a subject.
        POST /api/staff/consult/create [done]

        //Delete an existing consultation time of a subject.
        DELETE /api/staff/consult/delete [done]

        //Update the information of an existing consultation time.
        PATCH /api/staff/consult/patch [done]


    Appointment: /api/staff/appointment/...

        //Pending a request of appointments.
        POST /api/staff/appointment/pend [Jamie]

        //Get all of the requests of appointments from students.
        GET /api/staff/appointment/all [Jamie]
