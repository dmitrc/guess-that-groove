'use strict';

import * as azure from 'azure-storage';
var entityGen = azure.TableUtilities.entityGenerator;

export default class Model {
    storageClient: azure.TableService;
    tableName: string;
    partitionKey: string;

    constructor(storageClient: azure.TableService, tableName: string, partitionKey: string){
        this.storageClient = storageClient;
        this.tableName = tableName;
        this.partitionKey = partitionKey;
    }

    find(query: azure.TableQuery, callback: any) {
     this.storageClient.queryEntities(this.tableName, query, (<any>null), function entitiesQueried(error, result) {
       if(error) {
         callback(error);
       } else {
         callback(null, result.entries);
       }
     });
   }
 };