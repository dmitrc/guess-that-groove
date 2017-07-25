'use strict';

import * as dotenv from 'dotenv-extended';
import * as azure from 'azure-storage';
import Model from './model'


dotenv.load();

var tableService = azure.createTableService(process.env.STORAGE_NAME, process.env.STORAGE_KEY);
var songTable = new Model(tableService, "songs", "song");


export function getSong(req: any, res: any) {
    //req.params.name
    var query = new azure.TableQuery()
                //.select(['RowKey'])
                .top(1);
                //.where('Title eq ?', req.params.variant);

    songTable.find(query, function itemsFound(error: any, items: any) {
        if (error) {
            res.send(error);
            return;
        }

        res.setHeader('Content-Type', 'application/json'); 
        if(!items || items.length != 1) {
            res.json({});
        }
        else {
            res.json({ "RowKey": items[0].RowKey._ });
        }
    });
}

export function giveAnswer() {
    
}

export function getLeaderboard() {
    
}