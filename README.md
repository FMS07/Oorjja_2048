# 2048 Game

A web-based implementation of the popular 2048 puzzle game with multiple difficulty levels.

## Features

- Three difficulty levels: Easy (6x6 grid), Medium (5x5 grid), and Hard (4x4 grid)
- Score tracking
- Limited tries (3 attempts per game)
- Responsive design
- Next level progression

## How to Play

1. Choose a difficulty level by opening the corresponding HTML file:
   - Easy: `easy.html`
   - Medium: `medium.html`
   - Hard: `hard.html`

2. Click the "Play" button to start the game.

3. Use arrow keys to move tiles:
   - Left Arrow: Move tiles left
   - Right Arrow: Move tiles right
   - Up Arrow: Move tiles up
   - Down Arrow: Move tiles down

4. Combine tiles with the same number to create a tile with double the value.

5. Try to reach the 2048 tile to win the game.

6. If you run out of moves, you can retry up to 3 times per game.

7. After completing a level, you can progress to the next difficulty.

## Uniqueness from the standard 2048
The game's logic is designed in such a way that: 
1. It iterates through each tile individually.
2. For each non-zero tile, it checks spaces one by one in the direction of movement.
3. It moves the tile to an empty space or merges it if it encounters a tile of the same value.
4. This process stops as soon as it hits a non-matching tile or the edge..

## Files

- `easy.html`: Easy difficulty (6x6 grid)
- `medium.html`: Medium difficulty (5x5 grid)
- `hard.html`: Hard difficulty (4x4 grid)
- `script.js`: Game logic and functionality
- `styles.css`: Styling for the game

## Installation

1. Clone the repository:
https://github.com/FMS07/Oorjja_2048.git

2. Open any of the HTML files in a web browser to start playing.

## Customization

You can customize the game by modifying the following:

- Adjust grid sizes and difficulty levels in the HTML files
- Modify colors and styling in `styles.css`
- Tweak game mechanics and scoring in `script.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
