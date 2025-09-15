document.addEventListener('DOMContentLoaded', () => {
    
    // --- Historical Frequency Data from p.csv (Filtered since 2015-10-07 AD) ---

    // Frequencies for main numbers (1-69)
    const mainNumberFrequencies = {1: 89, 2: 92, 3: 94, 4: 86, 5: 80, 6: 94, 7: 84, 8: 83, 9: 87, 10: 82, 11: 90, 12: 98, 13: 66, 14: 80, 15: 87, 16: 94, 17: 87, 18: 87, 19: 92, 20: 91, 21: 112, 22: 84, 23: 112, 24: 89, 25: 81, 26: 72, 27: 105, 28: 101, 29: 80, 30: 88, 31: 87, 32: 103, 33: 108, 34: 78, 35: 84, 36: 104, 37: 101, 38: 85, 39: 99, 40: 93, 41: 82, 42: 84, 43: 88, 44: 99, 45: 95, 46: 75, 47: 98, 48: 79, 49: 71, 50: 90, 51: 78, 52: 94, 53: 100, 54: 88, 55: 82, 56: 86, 57: 85, 58: 81, 59: 96, 60: 81, 61: 115, 62: 103, 63: 104, 64: 106, 65: 78, 66: 88, 67: 93, 68: 89, 69: 108};

    // Frequencies for Powerball numbers (1-26)
    const powerballFrequencies = {1: 48, 2: 46, 3: 48, 4: 60, 5: 54, 6: 46, 7: 42, 8: 44, 9: 55, 10: 43, 11: 44, 12: 40, 13: 47, 14: 55, 15: 38, 16: 37, 17: 41, 18: 56, 19: 46, 20: 52, 21: 58, 22: 43, 23: 41, 24: 58, 25: 56, 26: 47};

    // --- Weighted Array Creation ---

    function createWeightedArray(freqObject) {
        const weightedArray = [];
        for (const number in freqObject) {
            const frequency = freqObject[number];
            for (let i = 0; i < frequency; i++) {
                weightedArray.push(parseInt(number));
            }
        }
        return weightedArray;
    }

    const weightedMainNumbers = createWeightedArray(mainNumberFrequencies);
    const weightedPowerballs = createWeightedArray(powerballFrequencies);

    // --- Number Generation Logic ---

    function getRandomWeightedItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    function generateNumbers() {
        const mainNumbers = new Set();
        while (mainNumbers.size < 5) {
            mainNumbers.add(getRandomWeightedItem(weightedMainNumbers));
        }
        
        const powerball = getRandomWeightedItem(weightedPowerballs);
        const sortedMainNumbers = [...mainNumbers].sort((a, b) => a - b);
        
        return {
            main: sortedMainNumbers,
            pb: powerball
        };
    }

    // --- DOM Manipulation & NEW Rate Limit Logic ---
    
    const generateButton = document.getElementById('generate-btn');
    const ballElements = [
        document.getElementById('ball-0'),
        document.getElementById('ball-1'),
        document.getElementById('ball-2'),
        document.getElementById('ball-3'),
        document.getElementById('ball-4'),
    ];
    const pbBallElement = document.getElementById('ball-pb');
    
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    const originalButtonText = "Generate Winning Numbers";

    /**
     * Disables the button and shows the remaining cooldown time.
     */
    function startCooldown(cooldownEndTime) {
        const now = new Date().getTime();
        const remainingTime = cooldownEndTime - now;

        if (remainingTime > 0) {
            generateButton.disabled = true;
            const minutesLeft = Math.ceil(remainingTime / (60 * 1000));
            generateButton.textContent = `Please wait ${minutesLeft} ${minutesLeft > 1 ? 'minutes' : 'minute'}...`;

            // Set a timer to re-enable the button when the cooldown is over
            setTimeout(resetButton, remainingTime);
        } else {
            resetButton();
        }
    }

    /**
     * Resets the button to its original, clickable state.
     */
    function resetButton() {
        generateButton.disabled = false;
        generateButton.textContent = originalButtonText;
    }

    /**
     * Main function to check cooldown status on page load.
     */
    function checkCooldownOnLoad() {
        const lastGenTime = localStorage.getItem('lastGenerationTime');
        if (lastGenTime) {
            const cooldownEndTime = parseInt(lastGenTime) + oneHour;
            startCooldown(cooldownEndTime);
        }
    }

    // The main click event listener
    generateButton.addEventListener('click', () => {
        const now = new Date().getTime();
        
        // --- This is the new rate limit check ---
        const lastGenTime = localStorage.getItem('lastGenerationTime');
        if (lastGenTime && (now - parseInt(lastGenTime) < oneHour)) {
            // Cooldown is already active, this click shouldn't happen if button is disabled
            // But we'll re-trigger the cooldown check just in case.
            startCooldown(parseInt(lastGenTime) + oneHour);
            return;
        }
        
        // --- If check passes, generate numbers ---
        
        // Reset animation
        const allBalls = [...ballElements, pbBallElement];
        allBalls.forEach(ball => {
            ball.classList.remove('generated');
            ball.textContent = '?';
        });

        const { main, pb } = generateNumbers();

        // Animate display
        let delay = 0;
        main.forEach((num, index) => {
            setTimeout(() => {
                const ball = ballElements[index];
                ball.textContent = num;
                ball.classList.add('generated');
            }, delay);
            delay += 200; // 200ms delay between each ball
        });
        
        setTimeout(() => {
            pbBallElement.textContent = pb;
            pbBallElement.classList.add('generated');
        }, delay);
        
        // --- Start the 1-hour cooldown ---
        localStorage.setItem('lastGenerationTime', now.toString());
        startCooldown(now + oneHour);
    });

    // --- Check cooldown status when the page first loads ---
    checkCooldownOnLoad();

});
