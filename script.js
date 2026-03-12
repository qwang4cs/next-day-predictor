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
  "Alright, first I need to read the day you selected and make sure I understood it correctly.",
  "Now I am mapping that day into the weekly order in my head so I know exactly where it sits.",
  "From there, I just move one position forward in the sequence to represent the next calendar day.",
  "I also want to double-check the weekend wrap-around, because Saturday should roll back to Sunday.",
  "Great, I have the final day resolved, so I am turning it into a clean, simple answer for you.",
  "Final pass complete. I am confident in the result and ready to return the predicted next day.",
];

const thinkingStepDurationsMs = [980, 1040, 980, 1120, 940, 920];

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
  revealResult("Thinking through it...");

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