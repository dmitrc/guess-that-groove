'use strict';

import * as dotenv from 'dotenv-extended';
import * as azure from 'azure-storage';
import Model from './model';
import * as uuid from 'uuid/v4';

dotenv.load();

const gameRecordsTableName = "gameRecords";
const gameRecordsPartitionKey = "gameRecord";

var tableService = azure.createTableService(process.env.STORAGE_NAME, process.env.STORAGE_KEY);
var songTable = new Model(tableService, "songs", "song");
var gameRecordsTable = new Model(tableService, gameRecordsTableName, gameRecordsPartitionKey);

export function getSong(fn: Function, chosenSongs?: any) {
    chosenSongs = chosenSongs || [];
    //req.params.name
    var query = new azure.TableQuery()
                .select(['Artist', 'Decade', 'Title', 'Url', 'RandomId'])
                .top(1)
                .where('RandomId < ?guid?', uuid());
    
    songTable.find(query, function itemsFound(error: any, items: any) {
        if (error) {
            fn(null, { error: error });
            return;
        }

        if(!items || items.length != 1 || chosenSongs.indexOf(items[0]) > -1)  {
            // no random song found with this guid, try again
            getSong(fn, chosenSongs);
        }
        else {
            fn({ 
                "artist": items[0].Artist._, 
                "decade": items[0].Decade._,
                "title": items[0].Title._ ,
                "url": items[0].Url._,
                "songId": items[0].RandomId._
            });
        }
    });
}

export function getSongAPI(req: any, res: any) {
    getSong((obj: any, err: any) => {
        if (err) {
            res.send(err);
            return;
        }

        res.setHeader('Content-Type', 'application/json'); 
        res.json(obj);
    }, null /*TODO: FIX EVENTUALLY*/);
}

export function postGameResults(req: any, res: any, next: any) {
    let gameId = req.params.gameId ? req.params.gameId.toString() : "1";
    let userId = req.params.userId ? req.params.userId.toString() : "Richard Hendricks";
    let sessionId = getSessionId();
    let results = JSON.parse(req.params.results);
    let resultEntities: object[] = [];
    let entGen = azure.TableUtilities.entityGenerator;

    if (results && results.length > 0) {
        for (let i in results) {
            if (results.hasOwnProperty(i)) {
                let entity = {
                    PartitionKey: entGen.String(gameRecordsPartitionKey),
                    RowKey: entGen.String((Date.now() + i).toString()),
                    game_id: entGen.String(gameId),
                    score: entGen.String(results[i].score.toString()),
                    session_id: entGen.String(sessionId),
                    song_id: entGen.String(results[i].song_id.toString()),
                    user_id: entGen.String(userId),
                    dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
                };

                resultEntities.push(entity);
            }
        }
    }

    let msg;
    if (addResultsEntityToTable(resultEntities)) {
        msg = 'successfully uploaded game records';
        res.status(200);
    } else {
        let msg = 'failed in uploading game records, try again';
        res.status(500);
    }
    console.log(msg);
    res.send({message: msg});
}

export function getTopNPlayers(req: any, res: any, next: any) {
    console.log(typeof req.params.game_id);
    var gameRecords = new azure.TableQuery()
                .where('game_id eq ?', req.params.game_id);
    
    gameRecordsTable.find(gameRecords, function itemsFound(error: any, items: any) {
        if (error) {
            res.send(error);
            return;
        }

        // console.log(items);
        res.setHeader('Content-Type', 'application/json'); 
        let players : object[] = [];
        if (items && items.length > 0) {
            let topPlayersAndScores = getTopPlayersAndScores(items);
            for (let i in topPlayersAndScores) {
                if (items.hasOwnProperty(i)) {
                    players.push({"User": topPlayersAndScores[i][0], "Score:": topPlayersAndScores[i][1]});
                }
            }
        }
        res.json(JSON.stringify(players));
    });

    return next();
}

function getTopPlayersAndScores(items: any): number[][] {
    var result: { [name: string]: any} = {}
    for (let i in items) {
        if (items.hasOwnProperty(i)) {
            let session = items[i].session_id._;
            if (session in result) {
                result[session]["score"] += parseInt(items[i].score._);
            } else {
                result[session] = {
                    "session_id": session,
                    "user_id": items[i].user_id._,
                    "score": parseInt(items[i].score._)
                }
            }
        }
    }

    console.log("----------------------");
    console.log(`result:${result}`);
    let userScores: { [name: number]: any} = {};
    for (let session in result) {
        if (result.hasOwnProperty(session)) {
            let user_id = result[session]["user_id"];
            if (userScores.hasOwnProperty(user_id)) {
                userScores[user_id] = Math.max(userScores[user_id], result[session]["score"]);
            } else {
                userScores[user_id] = result[session]["score"];
            }
        }
    }

    let userScoresArray: number[][] = [];
    for (let user_id in userScores) {
        if (userScores.hasOwnProperty(user_id)) {
            userScoresArray.push([user_id, userScores[user_id]]);
        }
    }
    
    return userScoresArray.sort(function(a, b) {
        return b[1] - a[1];
    });
}

function addResultsEntityToTable(resultEntities: object[]): boolean {
    for (let i in resultEntities) {
        if(resultEntities.hasOwnProperty(i)) {
            console.log(`uploading: ${JSON.stringify(resultEntities[i])}`);
            tableService.insertEntity(gameRecordsTableName, resultEntities[i], function (error, result, response) {
                if(error){
                    console.log(error);
                    return false;
                }
            });
        } 
    }
    return true;
}

function getSessionId() {
  let sessionId = "";
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    sessionId += letters.charAt(Math.floor(Math.random() * letters.length));

  return sessionId;
}