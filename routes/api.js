// API routes for the health problem solution app
const express = require('express');
const router = express.Router();
const questionModule = require('./questions');
const planModule = require('./plans');
const tiktokModule = require('./tiktoks');

// Route to assess health problem and generate questions
router.post('/assess', async (req, res) => {
  try {
    const { problem } = req.body;
    
    if (!problem) {
      return res.status(400).json({ success: false, message: 'Health problem is required' });
    }
    
    // Generate base questions for the health problem
    const baseQuestions = questionModule.generateQuestions(problem);
    
    // Enhance questions with AI (for future implementation)
    // const enhancedQuestions = await questionModule.enhanceQuestionsWithAI(problem, baseQuestions);
    
    res.json({
      success: true,
      problem,
      questions: baseQuestions
    });
  } catch (error) {
    console.error('Error in assess route:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to generate plan based on health problem and answers
router.post('/plan', async (req, res) => {
  try {
    const { problem, answers } = req.body;
    
    if (!problem || !answers) {
      return res.status(400).json({ 
        success: false, 
        message: 'Health problem and answers are required' 
      });
    }
    
    // Generate base plan for the health problem and answers
    const basePlan = planModule.generatePlan(problem, answers);
    
    // Enhance plan with AI (for future implementation)
    // const enhancedPlan = await planModule.enhancePlanWithAI(problem, answers, basePlan);
    
    res.json({
      success: true,
      problem,
      plan: basePlan
    });
  } catch (error) {
    console.error('Error in plan route:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to find TikTok videos based on health problem and plan
router.post('/tiktoks', async (req, res) => {
  try {
    const { problem, plan } = req.body;
    
    if (!problem || !plan) {
      return res.status(400).json({ 
        success: false, 
        message: 'Health problem and plan are required' 
      });
    }
    
    // Find TikTok videos for the health problem and plan
    const tiktokResults = tiktokModule.findTikTokVideos(problem, plan);
    
    // Search TikTok API (for future implementation)
    // const apiVideos = await tiktokModule.searchTikTokAPI(tiktokResults.keywords);
    // if (apiVideos.length > 0) {
    //   tiktokResults.videos = [...tiktokResults.videos, ...apiVideos];
    // }
    
    res.json({
      success: true,
      problem,
      videos: tiktokResults.videos,
      keywords: tiktokResults.keywords
    });
  } catch (error) {
    console.error('Error in tiktoks route:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
