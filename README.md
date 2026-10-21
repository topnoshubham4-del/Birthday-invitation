# Top Secret Birthday Mission

A funny, responsive birthday invitation quiz website. Visitors answer five multiple-choice questions. A score of 70% or higher unlocks the invitation.

## Files

- `index.html` — page structure and invitation screen
- `style.css` — responsive dark prank theme and invitation styling
- `script.js` — editable questions, scoring, retry behavior, invitation editor, and sharing

## Run it locally

1. Download and unzip the project.
2. Open `index.html` in a modern browser.
3. Press **Begin the investigation** and test the quiz.

No build step, account, server, or external library is needed.

## Edit your questions

Open `script.js` in a text editor and find `const QUESTIONS = [...]`.

Each question has:
- `category`: small section label
- `question`: question text
- `hint`: helper line
- `options`: four answer choices
- `correctIndex`: the correct option's zero-based index (`0` is the first option, `1` the second, etc.)
- `explanation`: message shown after submitting

There are five sample questions. Keep five if you want the pass mark to stay at 4/5. To change the pass percentage, edit `PASS_PERCENT` in `script.js`.

## Edit the invitation

Visitors can press **Edit invitation details** on the unlocked invitation to enter the birthday person's name, date/time, and venue. These details remain in the open page only; they are not uploaded or saved to a server. For a permanent default invitation, edit the placeholder text in `index.html`:

- `[Birthday person's name]`
- `[Add birthday date]`
- `[Add party venue]`

You can also customize the dress code and mission note directly in `index.html`.

## Publish for free with GitHub Pages

You can do this in a browser on your phone, tablet, or computer.

1. Sign in or create a free account at [GitHub](https://github.com/).
2. Create a new **public** repository, for example `birthday-quiz`.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository's root. On GitHub, use **Add file → Upload files**.
4. Open the repository's **Settings**.
5. Select **Pages** from the sidebar.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch `main` and folder `/(root)`, then save.
8. Wait a minute or two. The Pages screen will show the published website URL, usually `https://YOUR-USERNAME.github.io/birthday-quiz/`.
9. Open that URL and test it on a phone before sharing.

If GitHub's mobile interface hides an option, open GitHub in your browser's desktop-site mode.

## Important notes

- GitHub Pages hosting is free for public repositories. A custom domain is optional and usually costs money.
- This is a fun client-side quiz, not secure authentication. People can inspect `script.js` to discover answers or bypass the score.
- The website does not collect names, answers, or other personal data on a server.
- The share button uses the phone's native share sheet where supported; otherwise it copies invitation text when clipboard access is available.
