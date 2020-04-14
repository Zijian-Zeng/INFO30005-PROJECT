const subjectModel = require("../Models/subject");

const createSubject = async (req, res, next) => {
	try {
		const { body } = req;
		const { code, name, staff } = body;
		
		occupiedSubject = await subjectModel.find({ code: code });
		if (occupiedSubject.length > 0) {
			return res
				.status(400)
				.json({ message: "Error! subject already exist" });
		} else {
			//Save the new subject
			const subject = new subjectModel({
				code: code,
				subjectName: name,
				staff: staff,
			});
			const newSubject = await subject.save();
			res.status(201).json({ success:true, newSubject});
		}
		
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getAllSubjects = async (req, res, next) => {
	try {
	
		const subjects = await subjectModel.find();
		if(subjects.length==0){
			res.status(201).json({ success:true, meesage:"no subjects available", subjects });
		}else{
			res.json({ success:true, subjects});
		}
		console.log(subjects)

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}


const getQuestionByTag = async (req, res, next)=>{

	try {
	
		const subjects = await subjectModel.find();
		if(subjects.length==0){
			res.status(201).json({ success:true, meesage:"no subjects available", subjects });
		}else{
			res.json({ success:true, subjects});
		}
		console.log(subjects)

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}




module.exports = {createSubject, getAllSubjects};