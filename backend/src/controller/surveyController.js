// createSurvey() getMySurveys() getSurveyById() updateSurvey()deleteSurvey()
import prisma from "../config/prisma.js";

// createSurvey
const createSurvey = async (req, res, next) => {
  try {
    const { title } = req.body;

    const survey = await prisma.survey.create({
      data: {
        title,
        userId: req.user.id,
      },
    });

    return res.status(201).json({ survey });
  } catch (error) {
    next(error);
  }
};


// getMySurveys
const getMySurveys = async (req, res, next) => {
  try {
    const surveys = await prisma.survey.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({ surveys });
  } catch (error) {
    next(error);
  }
};


// getSurveyById
const getSurveyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const survey = await prisma.survey.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json({ survey });
  } catch (error) {
    next(error);
  }
};


// updateSurvey
const updateSurvey = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const survey = await prisma.survey.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

    return res.status(200).json({ survey });
  } catch (error) {
    next(error);
  }
};


// deleteSurvey
const deleteSurvey = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.survey.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Survey deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export {
  createSurvey,
  getMySurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
};