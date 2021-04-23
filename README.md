##### Nick Ollier

# Monster Technical Assignment // Calculator

### Code Coverage

|                                 Statements                                  |                                 Branches                                  |                                 Functions                                  |                                 Lines                                  |
| :-------------------------------------------------------------------------: | :-----------------------------------------------------------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) |

### Prerequisites

Before starting, you'll need to download and install the following:

-   [Git](https://git-scm.com/downloads)
-   [Node.js](https://nodejs.org/en/download/)\*
-   [npm](https://www.npmjs.com/get-npm/)**
    <sup></sub>
    <br /><br />
    Used in development:
    <br />
    \*v12.18.4
    <br />
    **v7.5.4
    </sub></sup>

### Clone Repo

`git clone https://github.com/nick-ollier/calculator.git`

`cd calculator`

### Install all dependencies

`npm i`

### Start up the dev environment

`npm run dev`
_or_
`npm run build` && `npm run start`

### View the app in your browser

The app is available locally at [http://localhost:9999](http://localhost:9999)
_and_
Hosted on Vercel at [https://calculator-nick-ollier.vercel.app/](https://TBC.vercel.app/)

### 🚧 Start up the Storybook component library

`npm run storybook`

### 🚧 View the component library in your browser

Storybook is available locally at [http://localhost:6006](http://localhost:6006)

### Run tests

####Unit
`npm run test`
`npm run test:watch`
`npm run test:coverage`

#### E2E

`npm run cypress`
`npm run cypress:headless`

### Notes

I had a great time on this project - Thank you for spending the time to look over it!

#### Framework:

-   I used [**Next.js**](https://nextjs.org/), and the project was bootstrapped with `npx create-next-app`
    -   Next was probably a bit overkill for the app given it's only a single-page application, however it's always a lot of fun to work with! If I had more time, and budget, it would have been nice to have stored the calculator history outside of local storage and utilised Next.js' SSR capabilities, and used something like [**Axios**](https://axios-http.com/) to handle the requests.

#### Language:

-   For this project I decided to use [**TypeScript**](https://www.typescriptlang.org/). I've only been working with TypeScript for the last few months, but it's safe to say once the confusion, and muscle memory started to disappear I really started enjoying it! It's probably a little rough around the edges in some areas, but the project was a great learning experience, which is what I enjoyed most about doing it!

#### Functional:

-   I started off using my own operators, but then came across [**mathjs**](https://mathjs.org/) which made everything a lot easier ([and safer!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!))

#### Styling:

-   I was a little torn when it came to styling. I love [**Styled Components**](https://styled-components.com/), but have really wanted to use [**tailwindcss**](https://tailwindcss.com/) in a personal project for quite some time... So I used both, and I think it turned out great! In reality, I'd choose one... Just don't ask me which!!

#### Testing:

-   I had a lot of fun testing this project (Hopefully the 100% coverage shows that!). For unit testing I used [**Jest**](https://jestjs.io/) and [**React Testing Library**](https://testing-library.com/docs/react-testing-library/intro/). And for E2E testing I went with [**Cypress**](https://docs.cypress.io/guides/overview/why-cypress) which is relatively new string to my bow!!

#### Extra Credit:

-   **Be Responsive** - So I _cheated <sub>(but not really)</sub>_ a little on this one. I opted for a nice iPhone overlay that supports portrait and landscape views. Realistically, it'd be really easy to take that out and use tailwindcss' [breakpoint prefixes](https://tailwindcss.com/docs/responsive-design#overview) instead.
-   **History** - I used local storage to save the calculator history. This is stored and retrieved via a custom useLocalStorage hook. As I mentioned above, it would have been nice to utilise Next.js' SSR capabilities and Axios to fetch/post/delete the history data.

#### Extra Extra Credit:

-   **Built & Deployed** - on the Vercel platform [here](https://calculator-sandy-psi.vercel.app/)!
-   **Dark Mode** - Does what it says on the tin - It's becoming a highly sought after feature, so thought I'd give it a bash myself!
-   **🚧 Component Library 🚧** - I created a custom calculator [**Storybook**](https://storybook.js.org/) component library to display each of the components individually! (There's currently an issue around resolving modules causing Storybook not to open properly - I'll get this fixed asap!)
-   **Keyboard Controllable** - Supported keys below!

##### Keyboard Inputs:

|      Key      |                      Action                       |
| :-----------: | :-----------------------------------------------: |
|      0-9      |               Handles Number Inputs               |
|       .       |              Handles Decimal Inputs               |
|      \*       |                Handles Times Input                |
|       /       |               Handles Divide Input                |
|       +       |                Handles Plus Input                 |
|       -       |                Handles Minus Input                |
|       =       |                Handles Enter Input                |
|   Backspace   |          Deletes the most recent number           |
|    Escape     |             Clears the current state              |
| l (lowercase) | Logs the calculators current state to the console |
