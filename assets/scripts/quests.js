const quizData = {
    "Science": [
        {
            "question": "What is the process by which plants make their own food?",
            "options": ["Respiration", "Fermentation", "Photosynthesis", "Transpiration"],
            "answer": "Photosynthesis"
        },
        {
            "question": "Which planet is known as the 'Red Planet'?",
            "options": ["Mercury", "Venus", "Mars", "Jupiter"],
            "answer": "Mars"
        },
        {
            "question": "What part of the human body controls balance and coordination?",
            "options": ["Cerebrum", "Cerebellum", "Medulla", "Spinal cord"],
            "answer": "Cerebellum"
        },
        {
            "question": "Which gas do plants absorb from the atmosphere during photosynthesis?",
            "options": ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            "answer": "Carbon dioxide"
        },
        {
            "question": "What is the chemical symbol for gold?",
            "options": ["Au", "Ag", "Go", "Fe"],
            "answer": "Au"
        }
    ],
    "Technology": [
        {
            "question": "What does CPU stand for?",
            "options": ["Central Process Unit", "Central Processing Unit", "Computer Power Unit", "Control Processing Unit"],
            "answer": "Central Processing Unit"
        },
        {
            "question": "Which programming language is known for its use in web development?",
            "options": ["Java", "Python", "JavaScript", "C++"],
            "answer": "JavaScript"
        },
        {
            "question": "What is the primary function of an operating system?",
            "options": ["Store data", "Manage hardware and software", "Browse the internet", "Run applications only"],
            "answer": "Manage hardware and software"
        },
        {
            "question": "Which technology is used to connect devices wirelessly over short distances?",
            "options": ["Bluetooth", "Wi-Fi", "NFC", "Ethernet"],
            "answer": "Bluetooth"
        },
        {
            "question": "What is the term for malicious software that locks or encrypts data and demands payment for its release?",
            "options": ["Malware", "Trojan", "Ransomware", "Spyware"],
            "answer": "Ransomware"
        }
    ],
    "History": [
        {
            "question": "Who is known as the 'Father of the Philippine Revolution'?",
            "options": ["José Rizal", "Andres Bonifacio", "Emilio Aguinaldo", "Apolinario Mabini"],
            "answer": "Andres Bonifacio"
        },
        {
            "question": "What was the first Philippine Republic called?",
            "options": ["Malolos Republic", "Katipunan Republic", "Biak-na-Bato Republic", "Spanish Republic"],
            "answer": "Malolos Republic"
        },
        {
            "question": "Who was the first President of the Philippines?",
            "options": ["José Rizal", "Andres Bonifacio", "Emilio Aguinaldo", "Manuel Quezon"],
            "answer": "Emilio Aguinaldo"
        },
        {
            "question": "When did the Philippines officially gain independence from the United States?",
            "options": ["June 12, 1898", "July 4, 1946", "August 21, 1983", "December 30, 1896"],
            "answer": "July 4, 1946"
        },
        {
            "question": "What was the battle where Lapu-Lapu defeated Ferdinand Magellan?",
            "options": ["Battle of Tirad Pass", "Battle of Mactan", "Battle of Balangiga", "Battle of Manila Bay"],
            "answer": "Battle of Mactan"
        }
    ],
    "Mathematics": [
        {
            "question": "What is the value of 5^3?",
            "options": ["125", "25", "15", "150"],
            "answer": "125"
        },
        {
            "question": "A triangle has angles measuring 40° and 60°. What is the measure of the third angle?",
            "options": ["60°", "80°", "90°", "100°"],
            "answer": "80°"
        },
        {
            "question": "What is the least common multiple (LCM) of 12 and 18?",
            "options": ["24", "36", "48", "72"],
            "answer": "36"
        },
        {
            "question": "If a car travels 150 km in 3 hours, what is its average speed?",
            "options": ["50 km/h", "45 km/h", "60 km/h", "55 km/h"],
            "answer": "50 km/h"
        },
        {
            "question": "Simplify: 8x - 3(2x - 5)",
            "options": ["2x - 15", "14x + 5", "2x + 15", "14x - 5"],
            "answer": "2x + 15"
        }
    ]
};

const completedPaths = {
    science: false,
    tech: false,
    history: false,
    math: false
  };

document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.paths ul li a');
    
    const scienceOverlay = document.querySelector('.science-overlay');
    const scienceResultOverlay = document.querySelector('.science-result-overlay');
    const techOverlay = document.querySelector('.tech-overlay');
    const techResultOverlay = document.querySelector('.tech-result-overlay');
    const historyOverlay = document.querySelector('.history-overlay');
    const historyResultOverlay = document.querySelector('.history-result-overlay');
    const mathOverlay = document.querySelector('.math-overlay');
    const mathResultOverlay = document.querySelector('.math-result-overlay');
    const resultOverlay = document.querySelector('.result-overlay');
    const blurOverlay = document.querySelector('.blur-overlay');
    const QuestPaths = document.querySelector('.quest-paths');

    const quizState = {
        currentQuestion: {
            "Science": 0,
            "Technology": 0,
            "History": 0,
            "Mathematics": 0
        },
        score: {
            "Science": 0,
            "Technology": 0,
            "History": 0,
            "Mathematics": 0
        }
    };
    

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            hideAllOverlays();

            document.getElementById('sel-quest-paths').style.display = 'none';
            
            const categorySpan = this.querySelector('span[class$="-label"]');
            if (!categorySpan) return;
            
            const category = categorySpan.textContent;
            
            switch(category) {
                case 'Science':
                    loadQuestion('Science', scienceOverlay);
                    scienceOverlay.classList.add('active');
                    scienceOverlay.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'Technology':
                    loadQuestion('Technology', techOverlay);
                    techOverlay.classList.add('active');
                    techOverlay.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'History':
                    loadQuestion('History', historyOverlay);
                    historyOverlay.classList.add('active');
                    historyOverlay.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'Mathematics':
                    loadQuestion('Mathematics', mathOverlay);
                    mathOverlay.classList.add('active');
                    mathOverlay.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
            
            blurOverlay.style.display = 'block';
        });
    });
    
    function loadQuestion(category, overlay) {
        const currentQuestionIndex = quizState.currentQuestion[category];
        const questionData = quizData[category][currentQuestionIndex];
        
        if (category === 'Science') {
            overlay.querySelector('.science-title p').textContent = `Q${currentQuestionIndex + 1}`;
            overlay.querySelector('.science-question p').textContent = questionData.question;
            
            const answerButtons = overlay.querySelectorAll('.science-answers button');
            questionData.options.forEach((option, index) => {
                answerButtons[index].textContent = option;
                
                const newButton = answerButtons[index].cloneNode(true);
                answerButtons[index].parentNode.replaceChild(newButton, answerButtons[index]);
                
                newButton.addEventListener('click', function() {
                    handleAnswer(category, option, this);
                });
            });
        } else if (category === 'Technology') {
            overlay.querySelector('.tech-title p').textContent = `Q${currentQuestionIndex + 1}`;
            overlay.querySelector('.tech-question p').textContent = questionData.question;
            
            const answerButtons = overlay.querySelectorAll('.tech-answers button');
            questionData.options.forEach((option, index) => {
                answerButtons[index].querySelector('span').textContent = option;
                
                const newButton = answerButtons[index].cloneNode(true);
                answerButtons[index].parentNode.replaceChild(newButton, answerButtons[index]);
                
                newButton.addEventListener('click', function() {
                    handleAnswer(category, option, this);
                });
            });
        } else if (category === 'History') {
            overlay.querySelector('.history-question p').textContent = questionData.question;
            
            const answerButtons = overlay.querySelectorAll('.history-answers button');
            questionData.options.forEach((option, index) => {
                const span = answerButtons[index].querySelector('span');

                if (span) {
                    span.textContent = option;
                } else {
                    answerButtons[index].textContent = option;
                }
                
                const newButton = answerButtons[index].cloneNode(true);
                answerButtons[index].parentNode.replaceChild(newButton, answerButtons[index]);
                
                newButton.addEventListener('click', function() {
                    handleAnswer(category, option, this);
                });
            });
        } else if (category === 'Mathematics') {
            overlay.querySelector('.math-question p').textContent = questionData.question;
            
            const answerButtons = overlay.querySelectorAll('.math-answers button');
            questionData.options.forEach((option, index) => {
                answerButtons[index].textContent = option;
                
                const newButton = answerButtons[index].cloneNode(true);
                answerButtons[index].parentNode.replaceChild(newButton, answerButtons[index]);
                
                newButton.addEventListener('click', function() {
                    handleAnswer(category, option, this);
                });
            });
        }
    }
    
    function handleAnswer(category, selectedAnswer, clickedButton) {
        const currentQuestionIndex = quizState.currentQuestion[category];
        const correctAnswer = quizData[category][currentQuestionIndex].answer;
        
        const buttons = clickedButton.parentElement.querySelectorAll("button");
        buttons.forEach(btn => btn.disabled = true);

        const categoryClass = `${category.toLowerCase()}-answers`;

        if (selectedAnswer === correctAnswer) {
            quizState.score[category]++;
            clickedButton.classList.add("correct", categoryClass);
        } else {
            clickedButton.classList.add("wrong", categoryClass);
    
            buttons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add("correct", categoryClass);
                }
            });
        }

        setTimeout(() => {
        quizState.currentQuestion[category]++;
        
        if (quizState.currentQuestion[category] < quizData[category].length) {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("correct", "wrong", categoryClass);
            });

            let overlay;
            switch(category) {
                case 'Science':
                    overlay = scienceOverlay;
                    break;
                case 'Technology':
                    overlay = techOverlay;
                    break;
                case 'History':
                    overlay = historyOverlay;
                    break;
                case 'Mathematics':
                    overlay = mathOverlay;
                    break;
            }
            
            loadQuestion(category, overlay);
        } else {
            showResult(category);
        }
    }, 1500);
    }
    
    function showResult(category) {
        hideAllOverlays();
        
        const score = quizState.score[category];
        const total = quizData[category].length;
        const wrong = total - score;
        
        switch(category) {
            case 'Science':
                scienceResultOverlay.querySelector('.inner-circle span').textContent = `${score}/${total}`;
                scienceResultOverlay.querySelector('.correct span').textContent = score;
                scienceResultOverlay.querySelector('.wrong span').textContent = wrong;
                
                let scorePercentage = (score / total) * 360; 
                scienceResultOverlay.querySelector('.outer-circle').style.background = 
                    `conic-gradient(
                        #f44336 0deg ${360 - scorePercentage}deg,
                        #4caf50 ${360 - scorePercentage}deg 360deg
                    )`;
                scienceResultOverlay.classList.add('active');
            
                completedPaths.science = true;
                updatePathBanners();

                break;
            case 'Technology':
                const techResultPercentage = (score / total) * 100;
                techResultOverlay.querySelector('.progress-bar').style.width = `${techResultPercentage}%`;
                techResultOverlay.querySelector('.progress-label p').textContent = `${techResultPercentage}%`;
                techResultOverlay.querySelector('.correct .result').textContent = score;
                techResultOverlay.querySelector('.wrong .result').textContent = wrong;
                techResultOverlay.classList.add('active');

                completedPaths.tech = true;
                updatePathBanners();

                break;
            case 'History':
                historyResultOverlay.querySelector('.correct .result').textContent = score;
                historyResultOverlay.querySelector('.wrong .result').textContent = wrong;
                historyResultOverlay.classList.add('active');

                completedPaths.history = true;
                updatePathBanners();

                break;
            case 'Mathematics':
                mathResultOverlay.querySelector('.correct').textContent = score;
                mathResultOverlay.querySelector('.wrong').textContent = wrong;
                mathResultOverlay.classList.add('active');

                completedPaths.math = true;
                updatePathBanners();

                break;
        }
        
        if (
            completedPaths.science &&
            completedPaths.tech &&
            completedPaths.history &&
            completedPaths.math
        ) {
            resultOverlay.classList.add('active');
            resultOverlay.scrollIntoView({ behavior: 'smooth' });
        }
        
        updateTotalResults();
    }

    function updatePathBanners() {
      const pathItems = document.querySelectorAll('.paths li');

      pathItems.forEach(path => {
        const label = path.querySelector('span');
        const anchor = path.querySelector('a');
        if (!label || !anchor) return;

            const labelCategory = label.classList[0].replace('-label', '').toLowerCase();

            if (completedPaths[labelCategory]){
                label.classList.add('completed-category');
                anchor.classList.add('done');
            } else {
                label.classList.remove('completed-category');
                anchor.classList.remove('done');

            }

            });
    }
    
    function updateTotalResults() {
        const scienceScore = quizState.score['Science'];
        const techScore = quizState.score['Technology'];
        const historyScore = quizState.score['History'];
        const mathScore = quizState.score['Mathematics'];
        
        const resultElements = resultOverlay.querySelectorAll('.result-each p');
        resultElements[1].textContent = scienceScore;
        resultElements[3].textContent = techScore;
        resultElements[5].textContent = historyScore;
        resultElements[7].textContent = mathScore;
        
        const totalScore = scienceScore + techScore + historyScore + mathScore;
        resultOverlay.querySelector('.result-total p:last-child').textContent = totalScore;
    }
    
    document.querySelectorAll('.paths li').forEach(path => {
        const label = path.querySelector('span');
        if (!label) return;
      
        const labelCategory = label.classList[0].replace('-label', '');
      
        if (completedPaths[labelCategory]) {
          path.classList.add('done');
        } else {
          path.classList.remove('done');
        }
      });

    function hideAllOverlays() {
        scienceOverlay.classList.remove('active');
        techOverlay.classList.remove('active');
        historyOverlay.classList.remove('active');
        mathOverlay.classList.remove('active');
        scienceResultOverlay.classList.remove('active');
        techResultOverlay.classList.remove('active');
        historyResultOverlay.classList.remove('active');
        mathResultOverlay.classList.remove('active');
        if (resultOverlay.classList.contains('active')) {
            resultOverlay.classList.remove('active');
        }
    }
    
    document.querySelector('.result-overlay button').addEventListener('click', function() {
        for (const category in quizState.currentQuestion) {
            quizState.currentQuestion[category] = 0;
            quizState.score[category] = 0;
        }
        
        hideAllOverlays();
        blurOverlay.style.display = 'none';
    });
  
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('blur-overlay')) {
            hideAllOverlays();
            blurOverlay.style.display = 'none';
        }
    });
    
    hideAllOverlays();
    blurOverlay.style.display = 'none';

    document.querySelectorAll('.retake').forEach(button => {
        button.addEventListener('click', () => {
          hideAllOverlays();
          resetQuiz(category); // new function
          loadQuestion(category, overlay); // restart quiz logic
        });
      });


      function resetQuiz(category) {
        if (category === 'science') {
          scienceIndex = 0;
          scienceScore = 0;
        } else if (category === 'tech') {
          techIndex = 0;
          techScore = 0;
        } else if (category === 'history') {
          historyIndex = 0;
          historyScore = 0;
        } else if (category === 'math') {
          mathIndex = 0;
          mathScore = 0;
        }
      }

      document.querySelectorAll('.choose').forEach(button => {
        button.addEventListener('click', () => {
          hideAllOverlays();
          // Show path selection again
          document.querySelector('.quest-paths').style.display = 'flex';
          QuestPaths.scrollIntoView({ behavior: 'smooth' });
        });
      });

});
