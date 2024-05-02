const Section = require("../models/Section.models");
const Course = require("../models/Course.models");

//createSection handler function
exports.createSection = async (req, res) => {
    try{
        //data fetch from req->body
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties (all fields are required)"
            })
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectId
        const updateCourseDetails = await Course.findByIdAndUpdate(
                                                                courseId,
                                                                {
                                                                    $push: {
                                                                        courseContent: newSection._id,
                                                                    }
                                                                },
                                                                {new: true},
                                                            );
                                                            //TODO: populate to replace section/sub-sections both in the updatedCouseDetails
        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updateCourseDetails,
        })
    } catch (error) {
        console.log("Error while creating section ", error);
        return res.status(500).json({
            success: false,
            message: "Error in section creation",
            error: error.message,
        })
    }
}

//updateSection handler function
exports.updateSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, sectionId} = req.body;
        //validate
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties (all fields are required)"
            })
        }
        //update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        //return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
        })
    } catch (error) {
        console.log("error in section updation : ", error);
        return res.status(400).json({
            success: false,
            message: "Error in section updation",
            error: error.message,
        })
    }
}

//deleteSection handler function
exports.deleteSection = async (req, res) => {
    try{
        //get section id -  let sectionId is sending in params
        const {sectionId} = req.params;
        //use findByIdAndDelete function
        await Section.findByIdAndDelete(sectionId);
        //TODO[testing] : do we need to delete the entry from the course schema ????
        //return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        })
    } catch (error) {
        console.log("error in section deletion : ", error);
        return res.status(400).json({
            success: false,
            message: "Error in section deletion",
            error: error.message,
        })
    }
}