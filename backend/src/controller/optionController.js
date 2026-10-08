//addOption()updateOption() deleteOption() getOptions()
import prisma from "../config/prisma.js";

// addOption
const addOption = async (req, res, next) => {
  try {
    const { text } = req.body;
    const {questionId}=req.params;

    const option = await prisma.option.create({
      data: {
        text,
        questionId,
      },
    });

    return res.status(201).json({ option });
  } catch (error) {
    next(error);
  }
};


// updateOption
const updateOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const option = await prisma.option.update({
      where: {
        id,
      },
      data: {
        text,
      },
    });

    return res.status(200).json({ option });
  } catch (error) {
    next(error);
  }
};


// deleteOption
const deleteOption = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.option.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// getOptions
const getOptions = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const options = await prisma.option.findMany({
      where: {
        questionId,
      },
    });

    return res.status(200).json({ options });
  } catch (error) {
    next(error);
  }
};


export {
  addOption,
  updateOption,
  deleteOption,
  getOptions,
};