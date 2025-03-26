export const authMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey === process.env.API_KEY) {
    next(); // The API key is correct, continue with the request
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API Key" }); // The API key is incorrect
  }
};
