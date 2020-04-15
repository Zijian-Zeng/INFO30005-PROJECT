const questionModel = require("../../Models/question");

const createQuestion = async (req, res, next) => {
    try {
        const { body } = req;
        const { subjectCode, subjectName, staff } = body;

        //Duplicate dectection
        occupiedSubjects = await subjectModel.find({
            subjectCode: subjectCode,
        });
        if (occupiedSubjects.length > 0) {
            //reponse error when subject already exist.
            return res
                .status(400)
                .json({ message: "Error! subject already exist" });
        } else {
            //Save the new subject
            const subject = new subjectModel({
                subjectCode: subjectCode,
                subjectName: subjectName,
                staff: staff,
            });
            const newSubject = await subject.save();
            res.status(201).json({ success: true, newSubject });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await subjectModel.find();
        if (subjects.length == 0) {
            res.status(201).json({
                success: true,
                meesage: "no subjects available",
                subjects,
            });
        } else {
            res.json({ success: true, subjects });
        }
        console.log(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
