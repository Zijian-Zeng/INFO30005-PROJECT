const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
require("dotenv").config();

//Assertion style
chai.should();
chai.use(chaiHttp);

//Token details:
const studentToken = process.env.studentToken;
const staffToken = process.env.staffToken;

/***
 * Test consultation booking System
 */
describe("Test API", () => {
	/***
	 * Test login functionality.
	 */
	describe("Login functionality", () => {
		const studentAuth = {
			email: "student@email.com",
			password: "123456",
			userType: "student",
		};
		const staffAuth = {
			email: "staff@email.com",
			password: "123456",
			userType: "staff",
		};

		it("Login as student", (done) => {
			chai.request(server)
				.post("/api/shared/users/login")
				.send(studentAuth)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("token");
					res.body.should.have.property("success").eq(true);
					done();
				});
		});

		it("Login as staff", (done) => {
			chai.request(server)
				.post("/api/shared/users/login")
				.send(staffAuth)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("token");
					res.body.should.have.property("success").eq(true);

					done();
				});
		});
	});

	/***
	 * Test consultation booking system as a student.
	 */
	describe("Consultation functionality (student)", () => {
		it("Get all of the available consultations of a subject", (done) => {
			chai.request(server)
				.post("/api/student/consult/viewAll")
				.set("meetute-token", studentToken)
				.send({
					subjectCode: "INFO30005",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("success").eq(true);
					res.body.consultations.should.be.a("array");
					done();
				});
		});

		it("Get all of registered consultations in the current account", (done) => {
			chai.request(server)
				.get("/api/student/consult/viewRegistered")
				.set("meetute-token", studentToken)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("success").eq(true);
					res.body.consultations.should.be.a("array");
					done();
				});
		});

		it("cancel the booking of an consultation", (done) => {
			chai.request(server)
				.post("/api/student/consult/cancel")
				.set("meetute-token", studentToken)
				.send({
					id: "5ea440828a1fceb262c857aa",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("success").eq(true);
					res.body.consultation.should.be.a("object");
					done();
				});
		});

		it("book an available consultation", (done) => {
			chai.request(server)
				.post("/api/student/consult/cancel")
				.set("meetute-token", studentToken)
				.send({
					id: "5ea440828a1fceb262c857aa",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("success").eq(true);
					res.body.consultation.should.be.a("object");
					done();
				});
		});
	});

	/***
	 * Test consultation booking as a staff.
	 */
	describe("Consultation functionality (staff)", () => {
		it("view all created consultations", (done) => {
			chai.request(server)
				.get("/api/staff/consult/viewCreated")
				.set("meetute-token", staffToken)
				.end((err, res) => {
					res.body.should.be.a("object");
					res.body.should.have.property("success").eq(true);
					res.body.consultations.should.be.a("array");
					done();
				});
		});

		it("update existing consultation information", (done) => {
			chai.request(server)
				.patch("/api/staff/consult/patch")
				.set("meetute-token", staffToken)
				.send({
					id: "5ea440828a1fceb262c857aa",
					slotsAvailable: 30,
				})
				.end((err, res) => {
					res.body.should.be.a("object");
					res.body.should.have.property("success").eq(true);
					res.body.updated.should.be.a("object");
					done();
				});
		});
	});
});

module.exports = { studentToken, staffToken };
