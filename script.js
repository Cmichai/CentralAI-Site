const searchText = document.getElementById("searchText");

const queries = [
  "where do I even start with AI?",
  "how do I get AI experience in college?",
  "how do I hear from people actually using AI at work?",
  "how can I get hired?"
];

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

async function runTypingLoop() {
  if (!searchText) return;

  let index = 0;

  while (true) {
    const value = queries[index];

    for (let i = 0; i <= value.length; i += 1) {
      searchText.textContent = value.slice(0, i);
      await wait(index === queries.length - 1 ? 28 : 34);
    }

    await wait(index === queries.length - 1 ? 2600 : 1200);

    if (index !== queries.length - 1) {
      for (let i = value.length; i >= 0; i -= 1) {
        searchText.textContent = value.slice(0, i);
        await wait(12);
      }
    }

    index = (index + 1) % queries.length;
  }
}

runTypingLoop();
