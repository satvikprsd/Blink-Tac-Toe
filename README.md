# Blink Tac Toe 🎮

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4)](https://tailwindcss.com/)

## Tech Stack Details

- **React 19**
  
- **Vite** 

- **Framer Motion** 

- **TailwindCSS** 

- **Howler**

- **Radix UI**

- **React Router**

- **Additional Technologies**:
  - `react-confetti`
  - `socket.io-client`
  - `react-responsive`
  - `nanoid`

## Game Features

### 🎭 Emoji Categories

- 🐶 **Animals**: "🐶", "🐱", "🐵", "🐰"
- 🍔 **Food**: "🍕", "🍟", "🍔", "🍩"
- ⚽ **Sports**: "⚽", "🏀", "🏈", "🎾"
- 😀 **Faces**: "😄", "😎", "😡", "😭"
- ☀️ **Weather**: "☀️", "🌧️", "🌩️", "❄️"

### 🔄 Vanishing Mechanic

- Each player's moves are tracked in a queue (using FIFO logic)
- When a player makes their 4th move, their 1st move disappears from the board
- This continues for subsequent moves, maintaining a maximum of 3 moves per player on the board at any time

```jsx
  let newmoves = turn == 1 ? Player1Moves : Player2Moves
  if (newmoves.length == 3) {
    const index = newmoves.shift()[1];
    newboard = newboard.map((cell,idx)=>idx!=index ? cell : '')
  }
  newmoves.push([PlayerMoves[turn], cellClicked])
```

- Here newmoves is queue of moves of each player in order, it is a nested list of [emoji, indxe]. 

### 🌟 Special Features

- **Scoring System**
  
- **Sound Effects**

- **Responsive Design**

- **Luck Detection**

## Future Improvements

  **Disconnect and Reconnect Detection**

  **Game History and Replays**

  **AI Opponent**

  **Custom Sound Themes**

---

Developed with ❤️ by Satvik.

