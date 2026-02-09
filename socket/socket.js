module.exports = (io) => {
    io.on('connection', (Socket) => {
        console.log('Client connecté: ', Socket.id);

        socket.on('register', (userId) => {
            socket.join(userId);
            console.log(`L'utilisateur ${userId} enregistré`);
        });

        socket.on('disconnect', () => {
            console.log('Client déconnecté:', socket.id)
        });
    });
};