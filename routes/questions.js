// Question module for health problem solution app
const axios = require('axios');

// Common health problems and their specific questions
const healthProblems = {
  'curved back': [
    {
      id: 'duration',
      text: 'How long have you been experiencing curved back or poor posture?',
      type: 'select',
      options: ['Less than a month', '1-6 months', '6-12 months', 'More than a year']
    },
    {
      id: 'pain',
      text: 'Do you experience pain associated with your curved back?',
      type: 'select',
      options: ['No pain', 'Mild discomfort', 'Moderate pain', 'Severe pain']
    },
    {
      id: 'activity',
      text: 'What is your current activity level?',
      type: 'select',
      options: ['Sedentary (little to no exercise)', 'Light activity (1-3 days/week)', 'Moderate activity (3-5 days/week)', 'Very active (6-7 days/week)']
    },
    {
      id: 'work',
      text: 'What type of work do you do?',
      type: 'select',
      options: ['Desk job/Sitting most of the day', 'Standing most of the day', 'Physical labor/Active work', 'Mixed (combination of sitting and moving)']
    },
    {
      id: 'previous_treatment',
      text: 'Have you tried any treatments or exercises for your curved back before?',
      type: 'select',
      options: ['None', 'Physical therapy', 'Chiropractic care', 'Home exercises', 'Multiple approaches']
    }
  ],
  'back pain': [
    {
      id: 'location',
      text: 'Where is your back pain located?',
      type: 'select',
      options: ['Upper back', 'Middle back', 'Lower back', 'Entire back']
    },
    {
      id: 'duration',
      text: 'How long have you been experiencing back pain?',
      type: 'select',
      options: ['Less than a week', '1-4 weeks', '1-6 months', 'More than 6 months']
    },
    {
      id: 'intensity',
      text: 'On a scale of 1-10, how would you rate your back pain?',
      type: 'select',
      options: ['1-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)']
    },
    {
      id: 'triggers',
      text: 'What activities or positions make your back pain worse?',
      type: 'select',
      options: ['Sitting', 'Standing', 'Bending', 'Lifting', 'All movement']
    },
    {
      id: 'previous_treatment',
      text: 'Have you tried any treatments for your back pain before?',
      type: 'select',
      options: ['None', 'Medication', 'Physical therapy', 'Chiropractic care', 'Multiple approaches']
    }
  ],
  'neck pain': [
    {
      id: 'duration',
      text: 'How long have you been experiencing neck pain?',
      type: 'select',
      options: ['Less than a week', '1-4 weeks', '1-6 months', 'More than 6 months']
    },
    {
      id: 'intensity',
      text: 'On a scale of 1-10, how would you rate your neck pain?',
      type: 'select',
      options: ['1-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)']
    },
    {
      id: 'movement',
      text: 'Is your neck movement limited?',
      type: 'select',
      options: ['No limitation', 'Slight limitation', 'Moderate limitation', 'Severe limitation']
    },
    {
      id: 'tech_usage',
      text: 'How many hours per day do you spend looking at screens (computer, phone, etc.)?',
      type: 'select',
      options: ['Less than 2 hours', '2-4 hours', '4-8 hours', 'More than 8 hours']
    },
    {
      id: 'previous_treatment',
      text: 'Have you tried any treatments for your neck pain before?',
      type: 'select',
      options: ['None', 'Medication', 'Physical therapy', 'Chiropractic care', 'Multiple approaches']
    }
  ],
  'default': [
    {
      id: 'duration',
      text: 'How long have you been experiencing this health problem?',
      type: 'select',
      options: ['Less than a week', '1-4 weeks', '1-6 months', 'More than 6 months']
    },
    {
      id: 'intensity',
      text: 'On a scale of 1-10, how would you rate your discomfort or pain?',
      type: 'select',
      options: ['1-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)']
    },
    {
      id: 'impact',
      text: 'How does this health problem impact your daily activities?',
      type: 'select',
      options: ['No impact', 'Slight impact', 'Moderate impact', 'Severe impact']
    },
    {
      id: 'previous_treatment',
      text: 'Have you tried any treatments or exercises for this problem before?',
      type: 'select',
      options: ['None', 'Self-care remedies', 'Professional treatment', 'Multiple approaches']
    },
    {
      id: 'medical_history',
      text: 'Do you have any other health conditions we should know about?',
      type: 'text'
    }
  ]
};

// Function to generate questions based on the health problem
function generateQuestions(problem) {
  // Convert problem to lowercase for matching
  const lowerProblem = problem.toLowerCase();
  
  // Check if we have specific questions for this problem
  for (const key in healthProblems) {
    if (lowerProblem.includes(key)) {
      return healthProblems[key];
    }
  }
  
  // If no specific questions found, use default questions
  return healthProblems.default;
}

// Function to enhance questions using AI (for future implementation)
async function enhanceQuestionsWithAI(problem, baseQuestions) {
  try {
    // This would be implemented with an actual AI API in production
    // For now, we'll just return the base questions
    return baseQuestions;
    
    /* Example of how this might be implemented with an AI API:
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: `Generate 5 specific assessment questions for someone with ${problem}.`,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Process AI response and convert to question format
    const aiQuestions = processAIResponse(response.data.choices[0].text);
    return [...baseQuestions, ...aiQuestions];
    */
  } catch (error) {
    console.error('Error enhancing questions with AI:', error);
    return baseQuestions;
  }
}

module.exports = {
  generateQuestions,
  enhanceQuestionsWithAI
};
