import express from 'express';
import cors from 'cors';
import {Server} from "socket.io";
import http from "http";

const PORT = 8000;
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"]
    },
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    serverTime: new Date().toISOString(),
    activeRooms: Object.keys(rooms).length,
    activeSessions: Object.keys(userSessions).length
  });
});

const rooms = {};
const userSessions = {};

io.on('connection', (socket) => {
    console.log('user connected: ', socket.id);

    let currentUser = {
        userId: null,
        roomId: null,
        playerNumber: null,
        role: null
    };

    socket.on('join-room', ({roomId, userId}, callback) => {

        if (!rooms[roomId]) {
            rooms[roomId] = {
                roomId,
                players: [],
                spectators: [],
                gameState: {
                    board: ["", "", "", "", "", "", "", "", ""],
                    turn: 0,
                    categories: {},
                    playerMoves: {
                        1: '',
                        2: ''
                    },
                    player1Moves: [],
                    player2Moves: [],
                    playersReady: {1: false, 2: false}
                },
                lastUpdated: Date.now()
            };
        }

        const room = rooms[roomId];

        userSessions[userId] = {
            socketId: socket.id,
            roomId: roomId,
            lastSeen: Date.now()
        };
        
        currentUser.userId = userId;
        currentUser.roomId = roomId;
        
        if (room.players.length < 2 ) {
            if (!room.players.includes(socket.id)){
                const playerNumber = room.players.length + 1;
                room.players.push(socket.id);
                socket.join(roomId);
                socket.emit('role', {role: 'player', playerNumber});
                
                currentUser.playerNumber = playerNumber;
                currentUser.role = 'player';
                
                console.log(`Player ${playerNumber} joined: ${userId}`);

                io.to(roomId).emit('players-update', room.players);
            }
        } 
        else {
            if(!room.players.includes(socket.id) && !room.spectators.includes(socket.id)) {
                room.spectators.push(socket.id);
                socket.join(roomId);
                socket.emit('role', {role: 'spectator', playerNumber: null});
                
                currentUser.playerNumber = null;
                currentUser.role = 'spectator';
                
                console.log(`Spectator joined: ${userId}`);
            }   
        }

        socket.emit('game-state-update', room.gameState);
        
    });

    socket.on('category-select', ({roomId, playerNumber, category}, callback) => {

            const room = rooms[roomId];
            room.gameState.categories[playerNumber] = category;
            room.gameState.playersReady[playerNumber] = true;
            room.gameState.lastUpdated = Date.now();

            if (room.gameState.playersReady[1] && room.gameState.playersReady[2]) {
                room.gameState.turn = 1;
            }
            console.log(room.gameState)
            io.to(roomId).emit('game-state-update', room.gameState);

        });

        socket.on('emoji-select', ({roomId, playerNumber, emoji}, callback) => {

            const room = rooms[roomId];

            room.gameState.playerMoves[playerNumber] = emoji;
            room.gameState.lastUpdated = Date.now();
            
            io.to(roomId).emit('game-state-update', room.gameState);
        });

        socket.on('player-move', ({roomId,moveData}, callback) => {
        
            const room = rooms[roomId];
            const { turn, playerNumber, playerMoves, newBoard } = moveData;
            
            room.gameState.board = newBoard;
            room.gameState.turn = turn; 
            room.gameState[`player${playerNumber}Moves`] = playerMoves;
            room.gameState.playerMoves[playerNumber] = '';
            room.gameState.lastUpdated = Date.now();

            io.to(roomId).emit('game-state-update', room.gameState);

        });

        socket.on('game-reset', ({roomId, fullReset}, callback) => {
            
            const room = rooms[roomId];
            
            if (fullReset) {
                room.gameState = {
                    board: ["", "", "", "", "", "", "", "", ""],
                    turn: 0,
                    categories: {},
                    playerMoves: {1: '', 2: ''},
                    player1Moves: [],
                    player2Moves: [],
                    playersReady: {1: false, 2: false}
                };
            } else {
                room.gameState.board = ["", "", "", "", "", "", "", "", ""];
                room.gameState.playerMoves = {1: '', 2: ''};
                room.gameState.player1Moves = [];
                room.gameState.player2Moves = [];
                room.gameState.turn = 3 - room.gameState.turn;
            }
            
            room.gameState.lastUpdated = Date.now();

            io.to(roomId).emit('game-state-update', room.gameState);
        });

    socket.on('disconnect', () => {
        const roomId = currentUser.roomId;
        
        if (roomId && rooms[roomId]) {
            const room = rooms[roomId];
            
            console.log(`User disconnected: ${socket.id}, userId: ${currentUser.userId}, role: ${currentUser.role}, room: ${roomId}`);

            room.players = room.players.filter((sockId) => sockId !== socket.id);
            room.spectators = room.spectators.filter(sockId => sockId !== socket.id);
            
            io.to(roomId).emit('players-update', room.players);

            if (room.players.length === 0 && room.spectators.length === 0) {
                console.log('Room deleted: ' + roomId);
                delete rooms[roomId];
            }
        } else {
            console.log(`User disconnected: ${socket.id}, not in a room`);
        }
        
        if (currentUser.userId && userSessions[currentUser.userId]) {
            delete userSessions[currentUser.userId];
        }
    });
});

server.listen(PORT,()=>{
    console.log(`Server at port ${PORT}`)
});
