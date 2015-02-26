'use strict';

var User = module.parent.require('./user');
var Topic = module.parent.require('./topics');
var db = module.parent.require('./database');
var SocketAdmins = module.parent.require('./socket.io/admin');
var SocketPlugins = module.parent.require('./socket.io/plugins');

var temporalBan = {};


  temporalBan.getUser = function(user, callback)
  {
    if(user[0] && user[0].banned)
    { // If this user has been banned, i will check the ban time
      if(user[0].banTime < Date.now())
      {
        User.setUserField(user[0].uid, "banned", 0);
        user[0].banned = 0;
      }
    }

    callback(null, user);
  }


  // LLamadas por sockets
  SocketAdmins.banUser = function (socket, data, callback) {
    // Me pide banear
    User.setUserField(data.uid, "banned", 1, function(err, r){
      if(err)
      {
        callback(err, r);
      }
      else
      {
        User.setUserField(data.uid, "banTime", data.banTime, callback(err, r));
      }
    });
  };

  SocketAdmins.infoBanTime = function (socket, data, callback) {
    // Le devuelvo la info del usuario
    User.getUserData(data.uid, callback);
  };

module.exports = temporalBan;
