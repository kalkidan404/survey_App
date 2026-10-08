//createResponse() getMyResponses() getResponseById() deleteResponse()
import prisma from "../config/prisma.js";

// createResponse
const createResponse = async (req, res, next) => {
  try {
    const { surveyId } = req.params;

    const response = await prisma.response.create({
      data: {
        surveyId,
        userId: req.user.id,
      },
    });

    return res.status(201).json({ response });
  } catch (error) {
    next(error);
  }
};


// getMyResponses
const getMyResponses = async (req, res, next) => {
  try {
    const responses = await prisma.response.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({ responses });
  } catch (error) {
    next(error);
  }
};


// getResponseById
const getResponseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await prisma.response.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};


// deleteResponse
const deleteResponse = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.response.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Response deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export {
  createResponse,
  getMyResponses,
  getResponseById,
  deleteResponse,
};