// Plan formulation module for health problem solution app

// Common health problems and their specific plans
const healthPlans = {
  'curved back': {
    mild: [
      "Daily posture awareness exercises (10 minutes, morning and evening)",
      "Gentle back stretches focusing on spine extension (5 minutes, 3 times daily)",
      "Core strengthening exercises (10 minutes, 3 times weekly)",
      "Ergonomic workspace adjustments (chair height, monitor position)",
      "Regular movement breaks when sitting (5 minutes every hour)"
    ],
    moderate: [
      "Structured posture correction routine (15 minutes, twice daily)",
      "Back and shoulder strengthening exercises (20 minutes, 4 times weekly)",
      "Core stability training (15 minutes, 3 times weekly)",
      "Thoracic mobility exercises (10 minutes daily)",
      "Ergonomic assessment and workspace optimization",
      "Scheduled movement breaks with specific stretches (every 45 minutes)"
    ],
    severe: [
      "Comprehensive posture rehabilitation program (30 minutes daily)",
      "Progressive back strengthening routine (30 minutes, 4 times weekly)",
      "Advanced core stability training (20 minutes, 4 times weekly)",
      "Thoracic and shoulder mobility protocol (15 minutes twice daily)",
      "Consider professional physical therapy assessment",
      "Ergonomic overhaul of all frequently used spaces",
      "Structured movement schedule throughout the day"
    ]
  },
  'back pain': {
    mild: [
      "Gentle stretching routine focusing on problem areas (10 minutes, twice daily)",
      "Light core strengthening exercises (10 minutes, every other day)",
      "Proper posture awareness training",
      "Heat therapy for tight muscles (15 minutes as needed)",
      "Regular walking (20 minutes daily)"
    ],
    moderate: [
      "Targeted stretching program for affected areas (15 minutes, twice daily)",
      "Progressive core and back strengthening (15 minutes, 3 times weekly)",
      "Posture correction exercises (10 minutes daily)",
      "Alternating heat and cold therapy (as needed for pain management)",
      "Low-impact cardio like swimming or walking (30 minutes, 3 times weekly)",
      "Consider over-the-counter anti-inflammatory medication if appropriate"
    ],
    severe: [
      "Structured rehabilitation program (consult with healthcare provider)",
      "Gentle movement therapy to maintain mobility without increasing pain",
      "Carefully progressive strengthening once acute pain subsides",
      "Pain management strategies (discuss with healthcare provider)",
      "Activity modification to avoid pain triggers",
      "Consider professional physical therapy",
      "Gradual return to normal activities as pain allows"
    ]
  },
  'neck pain': {
    mild: [
      "Gentle neck stretches and mobility exercises (5 minutes, several times daily)",
      "Proper ergonomics for computer and phone use",
      "Posture awareness training",
      "Heat therapy for muscle tension (10 minutes as needed)",
      "Regular breaks from screen time (every 30 minutes)"
    ],
    moderate: [
      "Structured neck and upper back stretching routine (10 minutes, 3 times daily)",
      "Neck and shoulder strengthening exercises (15 minutes, every other day)",
      "Ergonomic assessment and correction",
      "Stress reduction techniques like deep breathing or gentle yoga",
      "Heat/cold therapy rotation for pain management",
      "Screen time limitations and frequent breaks"
    ],
    severe: [
      "Comprehensive neck rehabilitation program (consult healthcare provider)",
      "Careful progressive strengthening of neck and supporting muscles",
      "Thorough ergonomic assessment of all daily activities",
      "Pain management strategies (discuss with healthcare provider)",
      "Activity modification to avoid pain triggers",
      "Consider professional physical therapy",
      "Stress management techniques"
    ]
  },
  'default': {
    mild: [
      "Daily gentle stretching focusing on affected areas (10 minutes, twice daily)",
      "Light strengthening exercises for supporting muscles (every other day)",
      "Proper form and technique practice for daily activities",
      "Regular low-impact movement (walking, swimming)",
      "Attention to posture and body mechanics"
    ],
    moderate: [
      "Structured stretching and mobility program (15 minutes daily)",
      "Progressive strengthening of affected and supporting areas (3 times weekly)",
      "Activity modification to reduce strain",
      "Self-care techniques appropriate to condition",
      "Regular moderate exercise that doesn't aggravate condition"
    ],
    severe: [
      "Consult with healthcare provider for personalized guidance",
      "Carefully structured rehabilitation program",
      "Pain or discomfort management strategies",
      "Gradual, progressive return to activities",
      "Consider professional assessment and treatment",
      "Regular monitoring and adjustment of program as needed"
    ]
  }
};

// Function to determine severity based on user answers
function determineSeverity(answers) {
  // This is a simplified severity assessment
  // In a real implementation, this would be more sophisticated
  
  let severityScore = 0;
  
  // Check duration
  if (answers.duration) {
    if (answers.duration.includes('week') || answers.duration.includes('Less than a month')) {
      severityScore += 1;
    } else if (answers.duration.includes('month') || answers.duration.includes('1-6')) {
      severityScore += 2;
    } else if (answers.duration.includes('year') || answers.duration.includes('More than')) {
      severityScore += 3;
    }
  }
  
  // Check pain/discomfort level
  if (answers.pain || answers.intensity) {
    const painAnswer = answers.pain || answers.intensity;
    if (painAnswer.includes('No pain') || painAnswer.includes('Mild') || painAnswer.includes('1-3')) {
      severityScore += 1;
    } else if (painAnswer.includes('Moderate') || painAnswer.includes('4-6')) {
      severityScore += 2;
    } else if (painAnswer.includes('Severe') || painAnswer.includes('7-10')) {
      severityScore += 3;
    }
  }
  
  // Check impact on daily activities
  if (answers.impact) {
    if (answers.impact.includes('No impact')) {
      severityScore += 0;
    } else if (answers.impact.includes('Slight')) {
      severityScore += 1;
    } else if (answers.impact.includes('Moderate')) {
      severityScore += 2;
    } else if (answers.impact.includes('Severe')) {
      severityScore += 3;
    }
  }
  
  // Determine severity level based on score
  if (severityScore <= 3) {
    return 'mild';
  } else if (severityScore <= 6) {
    return 'moderate';
  } else {
    return 'severe';
  }
}

// Function to generate a plan based on the health problem and user answers
function generatePlan(problem, answers) {
  // Convert problem to lowercase for matching
  const lowerProblem = problem.toLowerCase();
  
  // Determine severity level
  const severity = determineSeverity(answers);
  
  // Find the appropriate plan
  let plan;
  for (const key in healthPlans) {
    if (lowerProblem.includes(key)) {
      plan = healthPlans[key][severity];
      break;
    }
  }
  
  // If no specific plan found, use default plan
  if (!plan) {
    plan = healthPlans.default[severity];
  }
  
  // Add severity-specific general recommendations
  const generalRecommendations = getGeneralRecommendations(severity);
  
  return {
    problem: problem,
    severity: severity,
    plan: plan,
    generalRecommendations: generalRecommendations
  };
}

// Function to get general recommendations based on severity
function getGeneralRecommendations(severity) {
  switch (severity) {
    case 'mild':
      return [
        "Stay hydrated throughout the day",
        "Ensure adequate sleep (7-9 hours nightly)",
        "Maintain a balanced diet rich in anti-inflammatory foods",
        "Take regular breaks during prolonged activities"
      ];
    case 'moderate':
      return [
        "Stay well-hydrated and consider electrolyte balance",
        "Prioritize quality sleep (7-9 hours in a supportive position)",
        "Focus on anti-inflammatory nutrition and consider supplements (consult healthcare provider)",
        "Implement stress management techniques",
        "Schedule regular movement throughout the day"
      ];
    case 'severe':
      return [
        "Consult with healthcare provider before beginning exercise program",
        "Optimize hydration, nutrition, and sleep quality",
        "Consider keeping a symptom journal to identify patterns and triggers",
        "Implement comprehensive stress management strategies",
        "Build a support system for accountability and encouragement"
      ];
    default:
      return [
        "Stay hydrated throughout the day",
        "Ensure adequate sleep (7-9 hours nightly)",
        "Maintain a balanced diet",
        "Take regular breaks during prolonged activities"
      ];
  }
}

// Function to enhance plan using AI (for future implementation)
async function enhancePlanWithAI(problem, answers, basePlan) {
  try {
    // This would be implemented with an actual AI API in production
    // For now, we'll just return the base plan
    return basePlan;
    
    /* Example of how this might be implemented with an AI API:
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: `Generate a personalized health plan for someone with ${problem} who has described their condition as: ${JSON.stringify(answers)}`,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Process AI response and convert to plan format
    const aiPlan = processAIResponse(response.data.choices[0].text);
    return {
      ...basePlan,
      aiRecommendations: aiPlan
    };
    */
  } catch (error) {
    console.error('Error enhancing plan with AI:', error);
    return basePlan;
  }
}

module.exports = {
  generatePlan,
  enhancePlanWithAI
};
