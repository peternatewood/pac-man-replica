# Pac-Alike

### A replica of the arcade classic Pac-Man

## How to Play

Move Pac-Man using the arrow keys on your keyboard. Pac-Man will continue to move in whatever direction he's facing until he reaches an obstacle, so give your fingers a rest every so often.

There are four ghosts in the game who will alternately scatter to their own corners of the maze and chase after you! Each ghost behaves differently, but they all are deadly to the touch.

Your objective is to eat all 244 pellets in the maze. Each of the four large pellets, power pellets, will give Pac-Man the power to eat ghosts! Once Pac-Man eats a power pellet, the ghosts will turn blue, and move erratically.

Eating pellets, power pellets, special items (like the cherry), and ghosts will increase your score. But beware: eating a ghost merely sends it back to the center where it can recover and begin the chase anew.

## Setup

Once the game is closer to MVP, it will be available to play on my website, until then:

1. Clone the repo to your Desktop or whatever directory in which you want to keep it.
2. Use any supported browser to open the "pac_alike.html" located in the root directory.
3. Escape the ghosts!

## Development

This has been an exercize in using the HTML5 canvas tag, WebGL, and the WebAudio API. The sounds in Pac-Man are closely tied to gameplay, and I aimed to replicate them as closely as the visuals and gameplay.

In order to more easily render the game, I broke down the different components into several different canvases, and layered them on top of each other. Rendering everything on the same canvas would require that the entire canvas be drawn every frame. With multiple layers, each layer is only rendered when something needs to be changed, and some layers only need to render once.

Unlike my Tetris clone <a href="github/peternatewood/tetrelementis">Tetrelementis</a>, which used text and rectangle rendering functions, I decided to use per-pixel rendering and vector graphics for Pac-Man. Vector graphics involves drawing a line from one point to another. In order to draw the whole maze in Pac-Man using this technique, I found myself writing a function nearly 400 lines long, each line denoting where to draw to next.

Per-pixel rendering was a little more in-depth. As it turns out, modern browsers like to anti-alias anything drawn in the canvas. That means that any jagged lines are smoothed out by lightening or darkening pixels nearby those defined by the line. This is useful in some instances, but it wouldn't do for replicating an old arcade game; all the letters and small objects would be blurry.

In WebGL, every canvas has a long array of numbers that describe the color and opacity of each pixel in the canvas. This array can be broken down into groups of four values: red, green, blue, and alpha. I jumped on this idea to write a few simple functions that together can draw objects at exact pixel values, nice and sharp.

git Pac-Man's audio is mostly made of simple waveforms (sine, triangle, sawtooth, and the like). Rather than loading source audio files, I opted to use the audio nodes of WebAudio to generate my own waveforms. I wrote a simple "playSong" function that accepts an array of simple objects containing the letter note, octave, and duration of the note in the song. In order to convert a letter note and octave to a frequency, I added an object to get the lowest audible frequency for all 12 tones, and multiplied that value by 2 to the power of the octave.

C4 (middle C):

"c" _becomes_ **16.35**

2 _to the power of_ 4 _equals_ **16**

16.35 _multiplied by_ 16 _equals_ **261.6 Hz**

## Browser Support

The game has been tested and operates correctly in the following browsers:

Firefox: version 46

## Version History

:large_blue_diamond: **0.67 : 18 May 2016 -** Pac-Man will now be killed if he comes into contact with any ghost; that is, if both Pac-Man and a ghost occupy the same tile at once.

:small_red_triangle_down: **0.60 : 17 May 2016 -** Pac-Man "eats" any pellets he moves over, each pellet adding one point to the score counter. Inky and Clyde now leave the house once Pac-Man has eaten enough pellets. All ghosts change to scatter mode after seven seconds, as long as they have left the house.

:small_red_triangle_down: **0.53 : 13 May 2016 -** All four ghosts move correctly from their given starting positions, even from inside the house. Ghosts can no longer move up through the four safe tiles near the ghost house.

:small_red_triangle_down: **0.47 : 12 May 2016 -** Blinky now moves on a regular interval. New AudioChannel object and theme song constant allow simple sound production, but are not yet in use.

:small_red_triangle_down: **0.40 : 10 May 2016 -** Ghosts decide each tile whether to change direction based on the distance between each available tile and the ghost's target tile.

:small_red_triangle_down: **0.27 : 5 May 2016 -** Pac-Man moves in response to user input, and will stop on collision with an obstacle.

:small_red_triangle_down: **0.20 : 26 April 2016 -** Pac-Man can now be rendered in the maze.

:small_red_triangle_down: **0.13 : 18 April 2016 -** Ghosts can now be rendered in the maze.

:small_red_triangle_down: **0.07 : 17 April 2016 -** The maze can now be rendered.

## MVP Checklist

:white_check_mark: Pac-Man dies on contact with a ghost.

:white_check_mark: Each ghost only leaves the house once Pac-Man has eaten a number of pellets equal to its pellet limit.

:white_check_mark: Pac-Man eats pellets, which increase the player's score.

:white_check_mark: Each ghost calculates its target tile based on its own unique formula.

:white_check_mark: Pac-Man and the ghosts can move through the tunnel, appearing on the opposite side.

:white_check_mark: Ghosts move on a regular interval.

:white_check_mark: Pac-Man's mouth opens and closes as he moves.

:white_check_mark: Pac-Man moves with player input. He continues to move in the direction he faces until he reaches an obstacle.

:white_check_mark: Can render ghosts with their eyes pointing in the direction they face.

:white_check_mark: Can render Pac-Man facing in each of the four cardinal directions.

:white_check_mark: The maze is rendered using vector graphics in a single function.

:white_medium_small_square: The game progresses to the next level once all 244 pellets have been eaten.

:white_medium_small_square: The game stores a high score on game over, and loads from the user's cookies.

:white_medium_small_square: The player is greeted with a title screen, displaying names of the ghosts, the current high score, and point values for pellets and frightened ghosts.

:white_medium_small_square: The player hears the Pac-Man theme music when starting the game.

:white_medium_small_square: The game plays sounds for the ghosts and Pac-Man.

## Planned Features

:white_medium_small_square: Safari browser support.

:white_medium_small_square: Opera browser support.

:white_medium_small_square: Internet Explorer browser support.
