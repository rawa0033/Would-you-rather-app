The Game 

"Would You Rather" is a decision-making game that presents two hypothetical scenarios. Users choose their preference (Option A or B), and the app tracks these decisions to build a personal "Stats" profile. It features category filtering, a skip option for tough choices, and a history log of recent answers.


How the Code Works

This application is a Single Page Application (SPA) built with Vanilla JavaScript. Here’s the technical breakdown:

Hash-Based Routing: The app uses window.addEventListener('hashchange') to detect URL changes (like #/play or #/stats). It toggles the hidden attribute on sections to swap views instantly without a page reload.

State Management: A centralized state object acts as the "brain," keeping track of the current question, total votes, and answer history.

Data Persistence: Using localStorage, the state is stringified and saved to the browser. This ensures that when a user returns, their "Picked A/B" counts and history are still there.

Dynamic Rendering: Questions are pulled from a combined array and injected into the DOM. To prevent boredom, the logic tracks seenQuestionIds to ensure users don't see the same question twice in a short period.

Event-Driven UI: Buttons for choosing, skipping, and resetting are wired up with addEventListener, triggering functions that update the state and the UI simultaneously.


File Structure

├── app.js                    # Core logic & state
├── index.html                # Main views
├── reset.css / style.css     # UI styling
├── Would_you_rather_lofi.pdf # Wireframes
└── would u rather hiff.pdf   # Final design