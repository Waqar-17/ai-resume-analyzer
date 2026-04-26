const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes a resume against a job description using Gemini.
 * @param {string} resumeText - The parsed text of the resume.
 * @param {string} jobDescription - The target job description.
 * @returns {Promise<Object>} - The structured JSON response.
 */
async function analyzeResumeWithGemini(resumeText, jobDescription) {
  // Use Gemini 2.5 Flash for fast, cost-effective processing of large context
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.2, // Low temperature for more deterministic analysis
      responseMimeType: "application/json",
      // Define a strict schema to guarantee the output format
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          atsScore: {
            type: SchemaType.INTEGER,
            description: "An overall ATS compatibility score out of 100",
          },
          matchedKeywords: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "List of important keywords found in both the resume and JD",
          },
          missingKeywords: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "List of important keywords found in the JD but missing in the resume",
          },
          sectionScores: {
            type: SchemaType.OBJECT,
            properties: {
              toneAndStyle: { type: SchemaType.INTEGER, description: "Score out of 100" },
              contentQuality: { type: SchemaType.INTEGER, description: "Score out of 100" },
              structure: { type: SchemaType.INTEGER, description: "Score out of 100" },
              skillsMatch: { type: SchemaType.INTEGER, description: "Score out of 100" },
            },
            required: ["toneAndStyle", "contentQuality", "structure", "skillsMatch"],
          },
          feedback: {
            type: SchemaType.STRING,
            description: "A short, actionable summary of what the user should improve (2-3 sentences max).",
          }
        },
        required: ["atsScore", "matchedKeywords", "missingKeywords", "sectionScores", "feedback"],
      },
    },
  });

  const prompt = `
    You are an expert ATS (Applicant Tracking System) and professional recruiter.
    Analyze the following resume against the provided job description.
    
    Job Description:
    ${jobDescription}

    Resume:
    ${resumeText}

    Analyze the resume and return a JSON object evaluating its compatibility.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to analyze resume with AI. Reason: ${error.message}`);
  }
}

async function rewriteBulletWithGemini(bulletText, jobDescription) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          rewritten: {
            type: SchemaType.STRING,
            description: "The improved, highly impactful bullet point",
          },
          explanation: {
            type: SchemaType.STRING,
            description: "A short sentence explaining why this is better",
          }
        },
        required: ["rewritten", "explanation"],
      },
    },
  });

  const prompt = `
    You are an expert resume writer. Improve the following resume bullet point to make it more impactful, quantified, and tailored to the job description.
    
    Job Description:
    ${jobDescription}

    Original Bullet Point:
    ${bulletText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to rewrite bullet with AI. Reason: ${error.message}`);
  }
}

module.exports = { analyzeResumeWithGemini, rewriteBulletWithGemini };
