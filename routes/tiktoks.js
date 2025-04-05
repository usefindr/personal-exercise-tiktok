// TikTok search module for health problem solution app
const axios = require('axios');

// Mock TikTok video database (in a real app, this would be an API call to TikTok)
const tiktokVideos = {
  'posture': [
    {
      id: 'post1',
      title: 'Fix Your Posture in 5 Minutes',
      creator: '@posture_expert',
      description: 'Quick and effective exercises to improve your posture and reduce back pain.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Posture+Fix',
      url: 'https://www.tiktok.com/@posture_expert/video/posture1'
    },
    {
      id: 'post2',
      title: 'Daily Posture Correction Routine',
      creator: '@physical_therapist',
      description: 'Follow along with this daily routine to fix your posture over time.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Daily+Routine',
      url: 'https://www.tiktok.com/@physical_therapist/video/posture2'
    },
    {
      id: 'post3',
      title: 'Desk Worker Posture Fixes',
      creator: '@office_health',
      description: 'If you sit at a desk all day, these exercises are for you!',
      thumbnail: 'https://via.placeholder.com/120x120?text=Desk+Worker',
      url: 'https://www.tiktok.com/@office_health/video/posture3'
    }
  ],
  'curved back': [
    {
      id: 'curve1',
      title: 'Fix Rounded Shoulders & Curved Back',
      creator: '@spine_specialist',
      description: 'Targeted exercises to address kyphosis and rounded shoulders.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Rounded+Shoulders',
      url: 'https://www.tiktok.com/@spine_specialist/video/curve1'
    },
    {
      id: 'curve2',
      title: 'Thoracic Mobility for Curved Back',
      creator: '@mobility_coach',
      description: 'Improve your thoracic mobility to help with curved back issues.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Thoracic+Mobility',
      url: 'https://www.tiktok.com/@mobility_coach/video/curve2'
    },
    {
      id: 'curve3',
      title: 'Core Strengthening for Better Posture',
      creator: '@fitness_trainer',
      description: 'Build a strong core to support your spine and improve posture.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Core+Strength',
      url: 'https://www.tiktok.com/@fitness_trainer/video/curve3'
    }
  ],
  'back pain': [
    {
      id: 'back1',
      title: 'Lower Back Pain Relief Exercises',
      creator: '@back_pain_relief',
      description: 'Gentle exercises to relieve lower back pain and tension.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Back+Pain+Relief',
      url: 'https://www.tiktok.com/@back_pain_relief/video/back1'
    },
    {
      id: 'back2',
      title: 'Morning Routine for Back Pain',
      creator: '@morning_stretch',
      description: 'Start your day with these exercises to minimize back pain.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Morning+Routine',
      url: 'https://www.tiktok.com/@morning_stretch/video/back2'
    },
    {
      id: 'back3',
      title: 'Back Strengthening Exercises',
      creator: '@strength_coach',
      description: 'Build a stronger back to prevent future pain and issues.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Back+Strength',
      url: 'https://www.tiktok.com/@strength_coach/video/back3'
    }
  ],
  'neck pain': [
    {
      id: 'neck1',
      title: 'Neck Pain Relief in 5 Minutes',
      creator: '@neck_specialist',
      description: 'Quick exercises to relieve neck tension and pain.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Neck+Relief',
      url: 'https://www.tiktok.com/@neck_specialist/video/neck1'
    },
    {
      id: 'neck2',
      title: 'Tech Neck Fixes',
      creator: '@posture_expert',
      description: 'Exercises to counter the effects of looking down at devices all day.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Tech+Neck',
      url: 'https://www.tiktok.com/@posture_expert/video/neck2'
    },
    {
      id: 'neck3',
      title: 'Neck & Shoulder Tension Release',
      creator: '@tension_relief',
      description: 'Release tension in your neck and shoulders with these movements.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Tension+Release',
      url: 'https://www.tiktok.com/@tension_relief/video/neck3'
    }
  ],
  'core strength': [
    {
      id: 'core1',
      title: 'Beginner Core Strengthening',
      creator: '@core_coach',
      description: 'Start building core strength with these beginner-friendly exercises.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Beginner+Core',
      url: 'https://www.tiktok.com/@core_coach/video/core1'
    },
    {
      id: 'core2',
      title: '5-Minute Core Workout',
      creator: '@quick_fitness',
      description: 'Strengthen your core in just 5 minutes with this effective routine.',
      thumbnail: 'https://via.placeholder.com/120x120?text=5+Minute+Core',
      url: 'https://www.tiktok.com/@quick_fitness/video/core2'
    },
    {
      id: 'core3',
      title: 'Core Stability for Back Health',
      creator: '@stability_trainer',
      description: 'Improve your core stability to support your back and prevent pain.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Core+Stability',
      url: 'https://www.tiktok.com/@stability_trainer/video/core3'
    }
  ],
  'stretching': [
    {
      id: 'stretch1',
      title: 'Full Body Stretch Routine',
      creator: '@flexibility_coach',
      description: 'Improve your overall flexibility with this full body stretch routine.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Full+Body+Stretch',
      url: 'https://www.tiktok.com/@flexibility_coach/video/stretch1'
    },
    {
      id: 'stretch2',
      title: 'Daily Stretches for Better Mobility',
      creator: '@mobility_expert',
      description: 'Incorporate these stretches into your daily routine for better mobility.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Daily+Stretches',
      url: 'https://www.tiktok.com/@mobility_expert/video/stretch2'
    },
    {
      id: 'stretch3',
      title: 'Desk Worker Stretch Breaks',
      creator: '@office_health',
      description: 'Take these stretch breaks throughout your workday to stay limber.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Desk+Stretches',
      url: 'https://www.tiktok.com/@office_health/video/stretch3'
    }
  ],
  'default': [
    {
      id: 'default1',
      title: 'General Fitness Routine',
      creator: '@fitness_basics',
      description: 'A well-rounded fitness routine for overall health and wellness.',
      thumbnail: 'https://via.placeholder.com/120x120?text=General+Fitness',
      url: 'https://www.tiktok.com/@fitness_basics/video/default1'
    },
    {
      id: 'default2',
      title: 'Beginner Exercise Guide',
      creator: '@beginner_friendly',
      description: 'Simple exercises anyone can do to improve their health.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Beginner+Guide',
      url: 'https://www.tiktok.com/@beginner_friendly/video/default2'
    },
    {
      id: 'default3',
      title: 'Healthy Movement Patterns',
      creator: '@movement_specialist',
      description: 'Learn proper movement patterns to prevent injuries and improve function.',
      thumbnail: 'https://via.placeholder.com/120x120?text=Movement+Patterns',
      url: 'https://www.tiktok.com/@movement_specialist/video/default3'
    }
  ]
};

// Function to find relevant keywords in the plan
function extractKeywordsFromPlan(problem, plan) {
  const lowerProblem = problem.toLowerCase();
  const keywords = new Set();
  
  // Add the problem itself as a keyword
  keywords.add(lowerProblem);
  
  // Common health-related keywords to look for in the plan
  const healthKeywords = [
    'posture', 'back', 'neck', 'shoulder', 'core', 'strength', 'stretching',
    'mobility', 'flexibility', 'exercise', 'pain', 'relief', 'ergonomic'
  ];
  
  // Check if plan is an object with a plan property (from the plan module)
  const planItems = plan.plan || plan;
  
  // Extract keywords from plan items
  if (Array.isArray(planItems)) {
    planItems.forEach(item => {
      const lowerItem = item.toLowerCase();
      
      healthKeywords.forEach(keyword => {
        if (lowerItem.includes(keyword)) {
          keywords.add(keyword);
        }
      });
    });
  }
  
  return Array.from(keywords);
}

// Function to search for TikTok videos based on keywords
function searchTikTokVideos(keywords) {
  let allVideos = [];
  
  // Search for videos matching each keyword
  keywords.forEach(keyword => {
    // Check if we have videos for this keyword
    for (const category in tiktokVideos) {
      if (keyword.includes(category) || category.includes(keyword)) {
        // Add videos from this category
        allVideos = [...allVideos, ...tiktokVideos[category]];
        break;
      }
    }
  });
  
  // If no videos found, use default videos
  if (allVideos.length === 0) {
    allVideos = tiktokVideos.default;
  }
  
  // Remove duplicates by ID
  const uniqueVideos = [];
  const videoIds = new Set();
  
  allVideos.forEach(video => {
    if (!videoIds.has(video.id)) {
      videoIds.add(video.id);
      uniqueVideos.push(video);
    }
  });
  
  return uniqueVideos;
}

// Function to search for TikTok videos based on health problem and plan
function findTikTokVideos(problem, plan) {
  // Extract relevant keywords from the problem and plan
  const keywords = extractKeywordsFromPlan(problem, plan);
  
  // Search for TikTok videos based on keywords
  const videos = searchTikTokVideos(keywords);
  
  return {
    problem: problem,
    keywords: keywords,
    videos: videos
  };
}

// Function to search TikTok API (for future implementation)
async function searchTikTokAPI(keywords) {
  try {
    // This would be implemented with the actual TikTok API in production
    // For now, we'll just return mock data
    return [];
    
    /* Example of how this might be implemented with the TikTok API:
    const response = await axios.get('https://api.tiktok.com/search', {
      params: {
        q: keywords.join(' OR '),
        count: 10,
        type: 'video'
      },
      headers: {
        'Authorization': `Bearer ${process.env.TIKTOK_API_KEY}`
      }
    });
    
    return response.data.videos;
    */
  } catch (error) {
    console.error('Error searching TikTok API:', error);
    return [];
  }
}

module.exports = {
  findTikTokVideos,
  searchTikTokAPI
};
