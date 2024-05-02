const SubSection = require('../models/SubSection.models');
const Section = require("../models/Section.models");
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//createSubSection handler func
exports.createSubSection = async (req, res) => {
    try {
        //fetch data from req->body
        const {sectionId, title, timeDuration, description} = req.body;
        //fetch file/video
        const video = req.files.videoFile;
        //validate
        if(!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //crate a sub-section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        //update secton with the subsection ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                                {
                                                                    $push: {
                                                                        subSection: subSectionDetails._id,
                                                                    }
                                                                },
                                                                {new: true});
                                                                //use populate function here
        //return response
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            updatedSection,
        })

    } catch (error) {
        console.log("errror in subsection creation ", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

//updateSubSection handler function
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, title, description } = req.body
      const subSection = await SubSection.findById(sectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      return res.json({
        success: true,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }


//deleteSubSection handler function
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }