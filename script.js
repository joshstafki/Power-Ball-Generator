document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Function to calculate the next drawing date ---
    function updateNextDrawingDate() {
        const drawingElement = document.getElementById('next-drawing');
        
        const now = new Date();
        const currentDayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
        
        // Powerball drawings are 10:59 PM ET.
        // We'll check against 9:59 PM CT (21:59).
        // Check if the current time is *past* the draw time.
        const drawTimeHasPassed = now.getHours() > 21 || (now.getHours() === 21 && now.getMinutes() > 59);

        const drawingDays = [1, 3, 6]; // Mon, Wed, Sat
        let nextDrawDate = new Date(now);
        
        // Is it a drawing day, and has the time *not* passed yet?
        if (drawingDays.includes(currentDayOfWeek) && !drawTimeHasPassed) {
            // The next drawing is today. No changes needed.
        } else {
            // It's either not a drawing day, or the time has passed.
            // Find the next drawing day.
            let daysToAdd = 1;
            while (true) {
                let nextDay = (currentDayOfWeek + daysToAdd) % 7;
                if (drawingDays.includes(nextDay)) {
                    // Found the next day, break the loop
                    break; 
                }
                daysToAdd++;
            }
            nextDrawDate.setDate(now.getDate() + daysToAdd);
        }

        // Format the date as "Mon, Sep 15"
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        drawingElement.textContent = new Intl.DateTimeFormat('en-US', options).format(nextDrawDate);
    }
    
    // Call the new function when the page loads
    updateNextDrawingDate();
    
    // --- End of New Section ---


    // --- Historical Frequency Data (Unchanged) ---
    const mainNumberFrequencies = {1: 89, 2: 92, 3: 94, 4: 86, 5: 80, 6: 94, 7: 84, 8: 83, 9: 87, 10: 82, 11: 90, 12: 98, 13: 66, 14: 80, 15: 87, 16: 94, 17: 87, 18: 87, 19: 92, 20: 91, 21: 112, 22: 84, 23: 112, 24: 89, 25: 81, 26: 72, 27: 105, 28: 101, 29: 80, 30: 88, 31: 87, 32: 103, 33: 108, 34: 78, 35: 84, 36: 104, 37: 101, 38: 85, 39: 99, 40: 93, 41: 82, 42: 84, 43: 88, 44: 99, 45: 95, 46: 75, 47: 98, 48: 79, 49: 71, 50: 90, 51: 78, 52: 94, 53: 100, 54: 88, 55: 82, 56: 86, 57: 85, 58: 81, 59: 96, 60: 81, 61: 115, 62: 103, 63: 104, 64: 106, 65: 78, 66: 88, 67: 93, 68: 89, 69: 108};
    const powerballFrequencies = {1: 48, 2: 46, 3: 48, 4: 60, 5: 54, 6: 46, 7: 42, 8: 44, 9: 55, 10: 43, 11: 44, 12: 40, 13: 47, 14: 55, 15: 38, 16: 37, 17: 41, 18: 56, 19: 46, 20: 52, 21: 58, 22: 43, 23: 41, 24: 58, 25: 56, 26: 47};

    // --- Weighted Array Creation (Unchanged) ---
    function createWeightedArray(freqObject) {
        // ... (rest of the function is the same)
    }
    const weightedMainNumbers = createWeightedArray(mainNumberFrequencies);
    const weightedPowerballs = createWeightedArray(powerballFrequencies);

    // --- Number Generation Logic (Unchanged) ---
    function generateNumbers() {
        // ... (rest of the function is the same)
    }

    // --- DOM Manipulation & Rate Limit Logic (Unchanged) ---
    const generateButton = document.getElementById('generate-btn');
    const exportButton = document.getElementById('export-btn');
    const numberCaptureArea = document.getElementById('number-capture-area');
    
    const ballElements = [
        document.getElementById('ball-0'),
        document.getElementById('ball-1'),
        document.getElementById('ball-2'),
        document.getElementById('ball-3'),
        document.getElementById('ball-4'),
    ];
    const pbBallElement = document.getElementById('ball-pb');
    
    const oneHour = 60 * 60 * 1000;
    const originalButtonText = "Generate Winning Numbers";

    // --- Rate Limit Functions (Unchanged) ---
    function startCooldown(cooldownEndTime) {
        // ... (rest of the function is the same)
    }

    function resetButton() {
        // ... (rest of the function is the same)
    }

    function checkCooldownOnLoad() {
        // ... (rest of the function is the same)
    }
    
    // --- Generate Button Click Listener (Unchanged) ---
    generateButton.addEventListener('click', () => {
        // ... (rest of the function is the same)
    });

    // --- Export Button Listener (Unchanged) ---
    exportButton.addEventListener('click', () => {
        // ... (rest of the function is the same)
    });

    // --- Check cooldown status on page load (Unchanged) ---
    checkCooldownOnLoad();

});
