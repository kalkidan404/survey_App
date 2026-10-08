//addAnswer()getAnswer() updateAnswer() deleteAnswer()
import prisma from "../config/prisma.js";

// addAnswer
const addAnswer = async (req, res, next) => {
  try {
    const { responseId, questionId, text } = req.body;

    const answer = await prisma.answer.create({
      data: {
        responseId,
        questionId,
        text,
      },
    });

    return res.status(201).json({ answer });
  } catch (error) {
    next(error);
  }
};


// getAnswer
const getAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const answer = await prisma.answer.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json({ answer });
  } catch (error) {
    next(error);
  }
};


// updateAnswer
const updateAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const answer = await prisma.answer.update({
      where: {
        id,
      },
      data: {
        text,
      },
    });

    return res.status(200).json({ answer });
  } catch (error) {
    next(error);
  }
};


// deleteAnswer
const deleteAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.answer.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Answer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export {
  addAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
};