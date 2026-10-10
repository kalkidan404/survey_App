
import prisma from "../config/prisma.js";

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [activeSurveys, responsesReceived] = await Promise.all([
      prisma.survey.count({
        where: {
          userId,
          isActive: true,
        },
      }),

      prisma.response.count({
        where: {
          survey: {
            userId,
          },
        },
      }),
    ]);

    return res.status(200).json({
      activeSurveys,
      responsesReceived,
    });
  } catch (error) {
    next(error);
  }
};

export { getDashboard };
