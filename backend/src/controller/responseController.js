//createResponse() getMyResponses() getResponseById() deleteResponse()
import prisma from "../config/prisma.js";

// createResponse
const createResponse = async (req, res, next) => {
  try {
    const { surveyId } = req.params;
    const { answers } = req.body;

    const response = await prisma.response.create({
      data: {
        surveyId,
        userId: req.user.id,

        answers: {
          create: (answers || []).map((answer) => ({
            questionId: answer.questionId,

            text: Array.isArray(answer.value)
              ? answer.value.join(", ")
              : String(answer.value ?? ""),
          })),
        },
      },
      include: {
        answers: true,
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
      include: {
        answers: {
          include: {
            question: true,
            option: true,
          },
        },
        survey: true,
      },
    });

    if (!response) {
      return res.status(404).json({
        message: "Response not found",
      });
    }

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

const getSurveyResponses = async (req, res, next) => {
  try {
    const { surveyId } = req.params;

    const survey = await prisma.survey.findFirst({
      where: {
        id: surveyId,
        userId: req.user.id,
      },
    });

    if (!survey) {
      return res.status(404).json({
        message: "Survey not found",
      });
    }

    const responses = await prisma.response.findMany({
      where: {
        surveyId,
      },
      include: {
        answers: {
          include: {
            question: true,
            
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      survey,
      responses,
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
  getSurveyResponses
};