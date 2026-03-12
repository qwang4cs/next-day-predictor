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
  "Scanning weekly pattern memory...",
  "Aligning calendar vectors...",
  "Projecting next-day probabilities...",
  "Cross-checking temporal consistency...",
];

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
  const stepDelayMs = 430;

  setThinkingState(true);
  revealResult("Booting prediction pipeline...");

  thinkingSteps.forEach((stepText, index) => {
    setTimeout(() => {
      thinkingStep.textContent = stepText;
    }, index * stepDelayMs);
  });

  setTimeout(() => {
    const nextDay = getNextDay(selectedDay);
    setThinkingState(false);
    revealResult(nextDay);
  }, thinkingSteps.length * stepDelayMs + 260);
});