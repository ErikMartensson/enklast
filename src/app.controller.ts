import { Controller, Get, ParseIntPipe, Query, Render, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { GetJokesDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.hbs')
  @UsePipes(new ValidationPipe({ transform: true }))
  async root(
    @Query() query: GetJokesDto,
  ) {
    const { amount, type } = query;
    const jokesData = await this.appService.getJokes(amount, type);

    let totalCharacters = 0;
    let noOfTwoParts = 0;
    let noOfSingles = 0;

    // Format and calculate stats
    const jokes: { type: string, text: string }[] = jokesData.jokes.map(({
      type,
      setup,
      delivery,
      joke,
    }) => {
      // First we do a simple formatting
      const isTwoPart = type === 'twopart';
      let text = isTwoPart ? [setup, delivery].join(' - ') : joke;

      // Calculate stats here
      if (isTwoPart) {
        totalCharacters += setup.length + delivery.length;
        noOfTwoParts += 1;
      } else {
        totalCharacters += joke.length;
        noOfSingles += 1;
      }

      return {
        type: isTwoPart ? 'Two part' : 'Single',
        text,
      };
    });

    const thirdLetterOfLastJoke = jokes.at(-1).text.substring(2, 3);
    const allJokeText = jokes.map(({ text }) => text).join(' ');
    const thirdLetterLastJokeOccurrence = (
      allJokeText.match(new RegExp(thirdLetterOfLastJoke, 'gi')) || []
    ).length;

    const characterMap = {};
    let mostCommonLetter = null;
    let maxCount = 0;

    // In order to count the occurrence of all "letters" across all jokes, we
    // first need to remove all characters that aren't letters.
    const allJokesLettersOnly = allJokeText.replace(/[^a-zA-Z]/g, '');

    // Loop through all letters across all the jokes and count the occurrence
    // of each. At the same time we pick out the one with highest occurrence.
    for (const letter of allJokesLettersOnly) {
      const count = characterMap[letter] + 1 || 1;
      if (count > maxCount) {
        mostCommonLetter = letter;
        maxCount = count;
      }
      characterMap[letter] = count;
    }

    // Calculate percentage of joke type
    let typePercentage = '';
    const totalAmountOfJokes = jokes.length;
    if (noOfTwoParts > noOfSingles) {
      typePercentage = `${(noOfTwoParts / totalAmountOfJokes) * 100}% Two part`;
    } else if (noOfSingles > noOfTwoParts) {
      typePercentage = `${(noOfSingles / totalAmountOfJokes) * 100}% Single`;
    } else {
      typePercentage = `Equal split`;
    }

    return {
      // Highlight words containing the letter "a".
      // We do this at the end to not interfere with our calculations.
      jokes: jokes.map(({ type, text }) => {
        text = text.split(' ').map((word: string) => {
          if (word.indexOf('A') > -1 || word.indexOf('a') > -1) {
            return `<strong>${word}</strong>`;
          }
          return word;
        }).join(' ');

        return {
          type,
          text,
        }
      }),
      stats: {
        totalCharacters,
        thirdLetterLastJokeOccurrence,
        mostCommonLetter,
        typePercentage,
      },
    };
  }
}
