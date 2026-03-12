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
  "Reading selected input day...",
  "Loading weekly cycle map...",
  "Applying next-day rule (+1 mod 7)...",
  "Checking wrap-around edge case...",
  "Formatting concise final output...",
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
  revealResult("Analyzing...");

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