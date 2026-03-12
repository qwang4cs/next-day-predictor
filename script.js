const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const daySelect = document.getElementById("daySelect");
const predictBtn = document.getElementById("predictBtn");
const thinkingBox = document.getElementById("thinkingBox");
const thinkingStep = document.getElementById("thinkingStep");
const resultValue = document.querySelector(".result-value");

const thinkingSteps = [
  "Parsing selected day input...",
  "Normalizing to weekday index [0-6]...",
  "Applying transition rule: (index + 1) % 7...",
  "Evaluating boundary condition for Saturday...",
  "Resolving predicted weekday token...",
  "Preparing minimal final response...",
];

const thinkingStepDurationsMs = [340, 470, 420, 540, 380, 320];

function getNextDay(currentDay) {
  const dayIndex = days.indexOf(currentDay);
  const nextIndex = (dayIndex + 1) % days.length;
  return days[nextIndex];
}

function setThinkingState(isThinking) {
  thinkingBox.classList.toggle("active", isThinking);
  thinkingBox.setAttribute("aria-hidden", String(!isThinking));
  predictBtn.disabled = isThinking;
}

function revealResult(message) {
  resultValue.classList.remove("revealed");
  resultValue.textContent = message;

  // Restart animation for each new prediction reveal.
  requestAnimationFrame(() => {
    resultValue.classList.add("revealed");
  });
}

predictBtn.addEventListener("click", () => {
  const selectedDay = daySelect.value;

  setThinkingState(true);
  revealResult("Reasoning...");

  let elapsedMs = 0;

  thinkingSteps.forEach((stepText, index) => {
    setTimeout(() => {
      thinkingStep.textContent = stepText;
    }, elapsedMs);

    elapsedMs += thinkingStepDurationsMs[index] ?? 430;
  });

  setTimeout(() => {
    const nextDay = getNextDay(selectedDay);
    setThinkingState(false);
    revealResult(nextDay);
  }, elapsedMs + 200);
});