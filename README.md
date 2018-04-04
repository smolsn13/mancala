# Mancala
Please give the game a try [here](https://smolsn13.github.io/mancala/).

This game was created using HTML, CSS, Javascript and the jQuery library. I also utilized SweetAlert
for the modal announcing the game winner.

## Planning
I had the idea to create the game Mancala, as it was one of my favorite games as a child
and the design seemed relatively simplistic. My thought process was as follows:
* Create a board layout with 2 large pits at either end and 12 pits in the center, divided into 2 rows
* Display stone images in each pit and animate them moving from one pit to the next
* Alternate turns between two players
* Keep a count of the stones in each pit
* Alert the winner when one row has been cleared of all stones

## Development
Day 1 was spent drawing out on paper the board layout and general gameplay requirements,
creating the layout of the board in HTML and getting all the pits aligned properly with CSS.

On Day 2, I started on the Javascript code to populate the initial stones. Once the stones were displaying
in the pits properly, I began working on the logic to start moving them around the board.

By Day 3 I had the stones moving all around the board but both players could deposit in each other's
store. Days 3 and 4 were spent working on adding logic to prevent players from scoring for the opponent,
which proved much more difficult than I initially expected.

Day 5 was when I was finally able to implement the fix for preventing scoring for the opponent and move on to the
other details of gameplay. I implemented a new function to better track the turn count, as well as allow a player to take a second turn when their last stone landed in their own store.

Days 6 and 7 were spent applying styling to include background images, making the stones appear more spherical, adding a splash screen with instructions and a Start button, as well as bug fixes and play tests.

## Future Enhancements
Unresolved bugs:
* When the last stone will land in the far right pit on the bottom row, the first click doesn't work. If the player clicks their selected pit again, the stones will move but the last pit will not grant the bonus score. This is likely related to the loop that moves stones during the takeTurn function, as the wrapping proved to be a difficult problem to solve.
* When the game winner modal pops up, the remaining stones do not move into the appropriate store - the correct player has won but it may be slightly confusing that stones appear to be left on the board.
* Both players can click on either row during their turn.

Some features I would like to add:
* A reset button to start a new game
* Animation of the stones moving with a slight delay, so players can see each stone drop individually
* Sounds for the stone movement, bonus scores and end of game
* Add an AI so users can choose to play against the computer
