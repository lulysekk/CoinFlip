# Coin Flip Game

A web-based incremental game where you flip a virtual coin to earn money, purchase upgrades, and progress through rebirth cycles.

## Description

This is a simple clicker-style game built with HTML, CSS, and JavaScript. Click the coin to flip it, earn money on wins, and use that money to buy upgrades that improve your chances and earnings. The game features a rebirth system that allows you to reset for permanent bonuses.

## Features

- **Coin Flipping**: Click the coin to flip it and earn money on successful flips.
- **Upgrades**: Purchase various upgrades including coin value, luck percentage, multiplier, critical hits, and auto-flip.
- **RP System**: Rebirth to earn RP (Rebirth Points) for permanent upgrades.
- **History**: View a log of recent flips.
- **Responsive Design**: Works on different screen sizes.
- **Save System**: Game progress is automatically saved to local storage.

## How to Run

1. Clone or download the project files.
2. Open `coinflip.html` in a modern web browser.
3. Start playing by clicking the coin.

## Technologies Used

- **HTML5**: Structure of the game interface.
- **CSS3**: Styling with CSS variables for theming.
- **JavaScript**: Game logic, event handling, and local storage.

## Project Structure

```
coinflip/
├── coinflip.html          # Main HTML file
├── scripts/
│   └── main.js            # Game logic and functionality
└── stylesheets/
    ├── common.css         # CSS variables and base styles
    ├── layout.css         # Layout and positioning styles
    ├── components.css     # Component-specific styles
    └── animations.css     # Keyframe animations
```

## Game Mechanics

- **Flipping**: Each flip has a chance to win based on your luck stat.
- **Earnings**: Wins give money based on base value, multiplier, and streak bonuses.
- **Critical Hits**: Chance for double earnings on wins.
- **Auto-Flip**: Automatic flipping at set intervals.
- **Rebirth**: Reset progress for RP, which provide permanent bonuses.

## Browser Compatibility

Works in modern browsers that support ES6 JavaScript and CSS variables.

## Contributing

Feel free to fork and modify the game. No specific contribution guidelines.

## License

This project is open source. Use at your own risk.
