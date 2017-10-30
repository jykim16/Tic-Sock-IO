const Sequelize = require('sequelize');

const sequelize = process.env.CLEARDB_DATABASE_URL ? new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {dialect: "mysql", host: 'us-cdbr-iron-east-05.cleardb.net'}) : new Sequelize('ticsockio', 'root', '', {dialect: 'mysql'});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    wins: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }
});

const Game = sequelize.define('game', {
  gameToken: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  gameState: {
    type: Sequelize.STRING,
    defaultValue: '[["","",""],["","",""],["","",""]]'
  },
  turn: {
    type: Sequelize.BOOLEAN,
  },
  players: {
    type: Sequelize.STRING,
  },
  scores: {
    type: Sequelize.STRING,
    defaultValue: "[0, 0]"
  },
  winner: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

User.belongsToMany(Game, {through: 'gameToken'});
sequelize.sync({force: true});

module.exports.createGame = (username, socket, callback) => {
  return new Promise((resolve, reject) => {
    Game.create({
      players: JSON.stringify([username]),
      turn: !!Math.floor(Math.random() * 2)
    })
    .then(data=> {
      resolve(data);
    })
    .catch(err=> {
      reject(err);
    });
  })
};

module.exports.joinGame = (username, gameToken, socket, callback) => {
  return new Promise((resolve, reject) => {
    console.log('joining')
    Game.findOne({
      where: {gameToken}
    })
    .then(game=> {
      var updatePlayers = JSON.parse(game.players).concat(username);
      if(updatePlayers.length > 2){
        if(!JSON.parse(game.players).includes(username)) {
          reject('not player')
        } else {
          return game;
        }
      } else {
        return game.update({players: JSON.stringify(updatePlayers)})
      }
    })
    .then(updatedGame => {
      resolve(updatedGame);
    })
    .catch(err=>{
      reject('not code')
    });
  })
};

module.exports.updateDb = (gameToken, state) => {
  return new Promise((resolve, reject) => {
    Game.findOne({
      where: {gameToken}
    })
    .then(game=> {
      return game.update({
        gameState: JSON.stringify(state.gameState),
        turn: state.currentTurnPlayer === 'X' ? true : false,
        scores: JSON.stringify(state.scores),
        winner: Boolean(state.winner)
      })
    })
    .then(updatedGame => {
      resolve(updatedGame);
    })
    .catch(err=> {
      reject(err);
    });
  })
};
