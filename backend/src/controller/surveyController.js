
import prisma from "../config/prisma.js";

// Create a survey
const createSurvey = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Survey title is required",
      });
    }

    const survey = await prisma.survey.create({
      data: {
        title: title.trim(),
        userId: req.user.id,
      },
    });

    return res.status(201).json({ survey });
  } catch (error) {
    next(error);
  }
};

// Get all surveys belonging to the logged-in user
const getMySurveys = async (req, res, next) => {
  try {
    const surveys = await prisma.survey.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            responses: true,
          },
        },
      },
    });

    return res.status(200).json({ surveys });
  } catch (error) {
    next(error);
  }
};

// Get the six most recent surveys for the dashboard
const getRecentSurveys = async (req, res, next) => {
  try {
    const surveys = await prisma.survey.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      include: {
        _count: {
          select: {
            responses: true,
          },
        },
      },
    });

    return res.status(200).json({ surveys });
  } catch (error) {
    next(error);
  }
};

// Get one survey by ID
const getSurveyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const survey = await prisma.survey.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!survey) {
      return res.status(404).json({
        message: "Survey not found",
      });
    }

    return res.status(200).json({ survey });
  } catch (error) {
    next(error);
  }
};

// Update a survey
const updateSurvey = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, isActive } = req.body;

    const existingSurvey = await prisma.survey.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingSurvey) {
      return res.status(404).json({
        message: "Survey not found",
      });
    }

    const data = {};

    if (typeof title === "string" && title.trim()) {
      data.title = title.trim();
    }

    if (typeof isActive === "boolean") {
      data.isActive = isActive;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Provide a valid title or survey status to update",
      });
    }

    const survey = await prisma.survey.update({
      where: { id },
      data,
    });

    return res.status(200).json({ survey });
  } catch (error) {
    next(error);
  }
};

// Delete a survey
const deleteSurvey = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await prisma.survey.deleteMany({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({
        message: "Survey not found",
      });
    }

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
  getRecentSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
};
