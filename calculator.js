document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let currentReviews = parseFloat(document.getElementById("currentReviews").value);
    let currentAvgRating = parseFloat(document.getElementById("currentAvgRating").value);
    let targetAvgRating = parseFloat(document.getElementById("targetAvgRating").value);

    let currentReviewsError = document.getElementById("currentReviews-error");
    let currentAvgRatingError = document.getElementById("currentAvgRating-error");
    let targetAvgRatingError = document.getElementById("targetAvgRating-error");

    currentReviewsError.textContent = "";
    currentAvgRatingError.textContent = "";
    targetAvgRatingError.textContent = "";

    let isValid = true;

    if (isNaN(currentReviews) || currentReviews < 0 || currentReviews % 1 !== 0) {
        currentReviewsError.textContent = "Please enter a valid value";
        isValid = false;
    }

    if (isNaN(currentAvgRating) || currentAvgRating < 0 || currentAvgRating > 4.8) {
        currentAvgRatingError.textContent = "Please enter a valid value";
        isValid = false;
    }

    if (isNaN(targetAvgRating) || targetAvgRating < 1 || targetAvgRating > 4.9 || targetAvgRating <= currentAvgRating) {
        targetAvgRatingError.textContent = "Please enter a valid target rating between " + (currentAvgRating + 0.1).toFixed(1) + " and 4.9";
        isValid = false;
    }

    if (isValid) {
        let num5StarReviewsNeeded = Math.ceil((targetAvgRating * currentReviews - currentAvgRating * currentReviews) / (5 - targetAvgRating));

        // Hide the existing form
        document.getElementById("reviewForm").style.display = "none";

        // Create a container for the result and the buttons
        let resultContainer = document.createElement("div");
        resultContainer.classList.add("result-container");

        let resultElement = document.createElement("p");
        resultElement.textContent = "Number of 5-Star Reviews Needed: " + num5StarReviewsNeeded;
        resultElement.style.textAlign = "center"; // Center-align the text
        resultContainer.appendChild(resultElement);

        let ctaHeader = document.createElement("h3");
        ctaHeader.textContent = "Drive more reviews with Synup:";
        ctaHeader.style.color = "black";
        resultContainer.appendChild(ctaHeader);

        let bookDemoButton = document.createElement("button");
        bookDemoButton.textContent = "Book Your Demo Now";
        bookDemoButton.onclick = function () {
            location.href = "https://www.synup.com/book-a-demo";
        };
        resultContainer.appendChild(bookDemoButton);

        let calculateAgainButton = document.createElement("button");
        calculateAgainButton.textContent = "Calculate Again";
        calculateAgainButton.onclick = function () {
            resultContainer.remove();
            document.getElementById("reviewForm").reset();
            document.getElementById("reviewForm").style.display = "block";
            // Reset calculator widget size
            let calculatorWidget = document.querySelector(".calculator-widget");
            calculatorWidget.style.width = "320px"; // Initial width
            calculatorWidget.style.height = "auto"; // Initial height
        };
        resultContainer.appendChild(calculateAgainButton);

        // Set height and width of result page
        let calculatorWidget = document.querySelector(".calculator-widget");
        calculatorWidget.style.width = "320px"; // Decreased width
        calculatorWidget.style.height = "auto"; // Decreased height

        // Add margin between elements
        resultElement.style.marginBottom = "20px";
        ctaHeader.style.marginBottom = "20px";
        bookDemoButton.style.marginBottom = "10px";
        calculateAgainButton.style.marginTop = "5px";

        // Append the result container to the existing calculator widget
        calculatorWidget.appendChild(resultContainer);
    }
});
