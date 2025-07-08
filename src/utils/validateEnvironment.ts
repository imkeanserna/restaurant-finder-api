export const validateEnvironment = () => {
  const environment_variables = [
    "CODE",
    "GROQ_API_KEY",
    "GROQ_LLM_MODEL",
    "FOURSQUARE_BASE_URL",
    "FOURSQUARE_API_KEY",
  ];

  const missingVars = environment_variables.filter(
    (variable) => !process.env[variable],
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables ${missingVars.join(", ")}`,
    );
  }
  console.log("Complete environment variables");
};
