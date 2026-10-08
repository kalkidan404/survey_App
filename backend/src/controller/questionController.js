//addQuestion()updateQuestion() deleteQuestion()
import prisma from "../config/prisma.js";

// addQuestion
const addQuestion = async (req, res, next) => {
  try {
    const { surveyId, title, text } = req.body;

    const question = await prisma.question.create({
      data: {
        surveyId,
        title,
        text,
      },
    });

    return res.status(201).json({ question });
  } catch (error) {
    next(error);
  }
};


// updateQuestion
const updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;

    const question = await prisma.question.update({
      where: {
        id,
      },
      data: {
        title,
        text,
      },
    });

    return res.status(200).json({ question });
  } catch (error) {
    next(error);
  }
};


// deleteQuestion
const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.question.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export {
  addQuestion,
  updateQuestion,
  deleteQuestion,
};