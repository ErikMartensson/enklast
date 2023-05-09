# Enklast
Here's the quickest and easiest implementation (that I could think of) for the code test.

### Things I'd like to improve if I had more time
I haven't used Handlebars in years, and I'm not falling in love again. React is my go-to, but in order to keep the solution simple for this assignment, I wanted to keep it lean and easy with just one command and one process and Handlebars was good enough.

I could have found a really simple CSS framework, like (Skeleton)[http://getskeleton.com/], that improves the visuals of the bare-bone HTML elements without adding a bunch of components and complexity.

I love using both Docker and especially GitHub actions to build images, but felt like that hadn't contributed too much in this case.

I did implement some low level input validation, however, those error message ~could~ should be presented better for the user.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Then visit `http://localhost:3000/`
