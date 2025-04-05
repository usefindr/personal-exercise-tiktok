// Update the frontend JavaScript to properly handle the API responses
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const problemForm = document.getElementById('problem-form');
    const questionsForm = document.getElementById('questions-form');
    const healthProblemInput = document.getElementById('health-problem');
    const dynamicQuestions = document.getElementById('dynamic-questions');
    const findVideosBtn = document.getElementById('find-videos-btn');
    const startOverBtn = document.getElementById('start-over-btn');
    const backButtons = document.querySelectorAll('.back-btn');
    
    // App State
    let appState = {
        problem: '',
        questions: [],
        answers: {},
        plan: {},
        videos: []
    };
    
    // Event Listeners
    problemForm.addEventListener('submit', handleProblemSubmit);
    questionsForm.addEventListener('submit', handleQuestionsSubmit);
    findVideosBtn.addEventListener('click', handleFindVideos);
    startOverBtn.addEventListener('click', handleStartOver);
    
    // Set up back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-target');
            showSection(targetSection);
        });
    });
    
    // Handle problem submission
    function handleProblemSubmit(e) {
        e.preventDefault();
        const problem = healthProblemInput.value.trim();
        
        if (!problem) {
            alert('Please enter a health problem');
            return;
        }
        
        appState.problem = problem;
        
        // Call API to get questions
        fetchQuestions(problem);
    }
    
    // Fetch questions from API
    function fetchQuestions(problem) {
        // Show loading state
        dynamicQuestions.innerHTML = '<p>Loading questions...</p>';
        showSection('questions-section');
        
        // API call to get questions
        fetch('/api/assess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problem })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderQuestions(data.questions);
                appState.questions = data.questions;
            } else {
                dynamicQuestions.innerHTML = '<p>Error loading questions. Please try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            dynamicQuestions.innerHTML = '<p>Error loading questions. Please try again.</p>';
        });
    }
    
    // Render questions in the form
    function renderQuestions(questions) {
        dynamicQuestions.innerHTML = '';
        
        questions.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'form-group';
            
            const label = document.createElement('label');
            label.setAttribute('for', question.id);
            label.textContent = question.text;
            questionDiv.appendChild(label);
            
            if (question.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = question.id;
                input.name = question.id;
                questionDiv.appendChild(input);
            } else if (question.type === 'select') {
                const select = document.createElement('select');
                select.id = question.id;
                select.name = question.id;
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select an option';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);
                
                // Add options
                question.options.forEach((option, index) => {
                    const optionEl = document.createElement('option');
                    optionEl.value = option;
                    optionEl.textContent = option;
                    select.appendChild(optionEl);
                });
                
                questionDiv.appendChild(select);
            }
            
            dynamicQuestions.appendChild(questionDiv);
        });
    }
    
    // Handle questions submission
    function handleQuestionsSubmit(e) {
        e.preventDefault();
        
        // Collect answers
        const formData = new FormData(questionsForm);
        const answers = {};
        
        let isValid = true;
        
        appState.questions.forEach(question => {
            const value = formData.get(question.id);
            if (!value) {
                isValid = false;
                return;
            }
            answers[question.id] = value;
        });
        
        if (!isValid) {
            alert('Please answer all questions');
            return;
        }
        
        appState.answers = answers;
        
        // Call API to get plan
        fetchPlan(appState.problem, answers);
    }
    
    // Fetch plan from API
    function fetchPlan(problem, answers) {
        // Show loading state
        document.getElementById('plan-container').innerHTML = '<p>Generating your plan...</p>';
        showSection('plan-section');
        
        // API call to get plan
        fetch('/api/plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problem, answers })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderPlan(data.plan);
                appState.plan = data.plan;
            } else {
                document.getElementById('plan-container').innerHTML = '<p>Error generating plan. Please try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('plan-container').innerHTML = '<p>Error generating plan. Please try again.</p>';
        });
    }
    
    // Render plan in the container
    function renderPlan(planData) {
        const planContainer = document.getElementById('plan-container');
        planContainer.innerHTML = '';
        
        const planIntro = document.createElement('p');
        planIntro.textContent = `Based on your answers, here's a personalized plan to address your ${appState.problem}:`;
        planContainer.appendChild(planIntro);
        
        // Display severity level
        const severityDiv = document.createElement('div');
        severityDiv.className = 'severity-indicator';
        severityDiv.innerHTML = `<p><strong>Severity Level:</strong> ${planData.severity.charAt(0).toUpperCase() + planData.severity.slice(1)}</p>`;
        planContainer.appendChild(severityDiv);
        
        // Display plan items
        const planList = document.createElement('div');
        planList.className = 'plan-list';
        
        const planTitle = document.createElement('h3');
        planTitle.textContent = 'Recommended Exercises & Actions:';
        planList.appendChild(planTitle);
        
        planData.plan.forEach((item, index) => {
            const planItem = document.createElement('div');
            planItem.className = 'plan-item';
            planItem.innerHTML = `<strong>${index + 1}.</strong> ${item}`;
            planList.appendChild(planItem);
        });
        
        planContainer.appendChild(planList);
        
        // Display general recommendations
        if (planData.generalRecommendations && planData.generalRecommendations.length > 0) {
            const recList = document.createElement('div');
            recList.className = 'recommendations-list';
            
            const recTitle = document.createElement('h3');
            recTitle.textContent = 'General Recommendations:';
            recList.appendChild(recTitle);
            
            planData.generalRecommendations.forEach((item, index) => {
                const recItem = document.createElement('div');
                recItem.className = 'recommendation-item';
                recItem.innerHTML = `<strong>•</strong> ${item}`;
                recList.appendChild(recItem);
            });
            
            planContainer.appendChild(recList);
        }
    }
    
    // Handle find videos button click
    function handleFindVideos() {
        // Show loading state
        document.getElementById('videos-container').innerHTML = '<p>Searching for the best exercise videos...</p>';
        showSection('videos-section');
        
        // API call to get videos
        fetch('/api/tiktoks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problem: appState.problem, plan: appState.plan })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderVideos(data.videos, data.keywords);
                appState.videos = data.videos;
            } else {
                document.getElementById('videos-container').innerHTML = '<p>Error finding videos. Please try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('videos-container').innerHTML = '<p>Error finding videos. Please try again.</p>';
        });
    }
    
    // Render videos in the container
    function renderVideos(videos, keywords) {
        const videosContainer = document.getElementById('videos-container');
        videosContainer.innerHTML = '';
        
        const videosIntro = document.createElement('p');
        videosIntro.textContent = `Here are the best TikTok videos to help with your ${appState.problem}:`;
        videosContainer.appendChild(videosIntro);
        
        // Display keywords used for search
        if (keywords && keywords.length > 0) {
            const keywordsDiv = document.createElement('div');
            keywordsDiv.className = 'keywords';
            keywordsDiv.innerHTML = `<p><strong>Search terms:</strong> ${keywords.join(', ')}</p>`;
            videosContainer.appendChild(keywordsDiv);
        }
        
        if (videos.length === 0) {
            const noVideos = document.createElement('p');
            noVideos.textContent = 'No videos found. Please try a different health problem.';
            videosContainer.appendChild(noVideos);
            return;
        }
        
        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            
            const thumbnail = document.createElement('div');
            thumbnail.className = 'video-thumbnail';
            thumbnail.innerHTML = `<img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://via.placeholder.com/120x120?text=Video'">`;
            
            const videoInfo = document.createElement('div');
            videoInfo.className = 'video-info';
            videoInfo.innerHTML = `
                <h3 class="video-title">${video.title}</h3>
                <p class="video-creator">${video.creator}</p>
                <p class="video-description">${video.description}</p>
                <a href="${video.url}" target="_blank" class="btn watch-btn">Watch Video</a>
            `;
            
            videoItem.appendChild(thumbnail);
            videoItem.appendChild(videoInfo);
            videosContainer.appendChild(videoItem);
        });
    }
    
    // Handle start over button click
    function handleStartOver() {
        // Reset form and state
        problemForm.reset();
        questionsForm.reset();
        
        appState = {
            problem: '',
            questions: [],
            answers: {},
            plan: {},
            videos: []
        };
        
        // Show first section
        showSection('problem-input');
    }
    
    // Helper function to show a section and hide others
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        
        // Show target section
        document.getElementById(sectionId).classList.remove('hidden-section');
        document.getElementById(sectionId).classList.add('active-section');
    }
});
