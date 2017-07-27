import * as request from 'request-promise-native';
import * as http from 'http';
import * as url from 'url';
import * as azure from 'azure-storage';
 
var blobService = azure.createBlobService(process.env.STORAGE_NAME, process.env.STORAGE_KEY);

export function searchTrackByArtist(req: any, mainRes: any){
    var keyword:string = req.params.keyword;

    let options = {
        url: 'https://music.xboxlive.com/1/content/music/search?q=' + keyword.replace(' ', '+') + '&filters=tracks&maxItems=1',
        headers: {
            'Authorization': 'Bearer EgBuAQMAAAAEgAAADAABp8kSC7+3aw+7XOk5dsfclkrovuI8a89M2GwyCmUhbDXYsGdV8DIJ9F4y7/bVyoy4eHaAnhnPMoujy9jDcH94HFS9eHIyGywzjt39lUiDGw2z70dRQI9WOpeqresB4DPW1KTF0CsE7sOYyM7MFFpNKIdVtWXfEUOy5O+6JHLFYRhA0d19ia7JmFXt7LTP9ec2uM7cJR7eGmjldYtpYbWqG0ETsWilNOg7VIO+L8o6esqBd1Gu6IpKwL4oSDuZvCQNQ/XrAtDPf64PeE9pks/AinF7uYLXqfrmwWxdZiAd82ClCupIXtM1azvDhANtEcBF/F2fesklryu2AIdjXnOHYl0AWgBdAAAAAACB2h1EsCZ5WbAmeVmIgQQAEAAxMzEuMTA3LjE0Ny4yMTIAAAAAAC0AYXBwaWQ6Ly9iNTIxM2Y3NC1mY2JjLTQ0MGQtODZhNS1lMzJmNWVmNGNkZTcA'
        }
    };

    let response = request.get(options, function(err: any, response: any, body: any) {
        if(err) { 
            console.log(err); 
            return; 
        }

        let jsonresp = JSON.parse(response.body);

        let trackItems = jsonresp["Tracks"]["Items"];

        let track = trackItems[0];
        let id = JSON.stringify(track['Id']);
        let songName = JSON.stringify(track['Name']);
        let releaseDate = JSON.stringify(track['ReleaseDate']);
        let artist = JSON.stringify(track['Artists'][0]['Artist']['Name']);
        let album = JSON.stringify(track['Album']['Name']);
        let isExplicit = JSON.stringify(track['IsExplicit']);

        let jsonObject = {
            'id': id,
            'songName': songName,
            'artist': artist,
            'album': album,
            'releaseDate': releaseDate,
            'isExplicit': isExplicit};

        getSong(id, function(songUrl: string) {
            console.log(songUrl);
            download(songUrl, function(res: any) {
                const containerName:string = 'ingres';
                
                blobService.createBlockBlobFromStream (containerName, name, res, res.length, function(err: any, res: any){
                if(!err){
                    //blobService.setBlobProperties(containerName, )

                    mainRes.json(jsonObject);
                }
                });
            });
        });
        }
    );
}

export async function searchTrackByTitle(keyword: string, gameID: string){
    let artistId = getArtist(keyword);

    let options = {
        url: 'https://music.xboxlive.com/1/content/' + artistId + '/catalog/artist/toptracks/browse?maxItems=5',
        headers: {
            'Authorization': 'Bearer EgBuAQMAAAAEgAAADAABp8kSC7+3aw+7XOk5dsfclkrovuI8a89M2GwyCmUhbDXYsGdV8DIJ9F4y7/bVyoy4eHaAnhnPMoujy9jDcH94HFS9eHIyGywzjt39lUiDGw2z70dRQI9WOpeqresB4DPW1KTF0CsE7sOYyM7MFFpNKIdVtWXfEUOy5O+6JHLFYRhA0d19ia7JmFXt7LTP9ec2uM7cJR7eGmjldYtpYbWqG0ETsWilNOg7VIO+L8o6esqBd1Gu6IpKwL4oSDuZvCQNQ/XrAtDPf64PeE9pks/AinF7uYLXqfrmwWxdZiAd82ClCupIXtM1azvDhANtEcBF/F2fesklryu2AIdjXnOHYl0AWgBdAAAAAACB2h1EsCZ5WbAmeVmIgQQAEAAxMzEuMTA3LjE0Ny4yMTIAAAAAAC0AYXBwaWQ6Ly9iNTIxM2Y3NC1mY2JjLTQ0MGQtODZhNS1lMzJmNWVmNGNkZTcA'
        }
    };

    let response = await request.get(options, function(err, response: any, body) {
        if(err) { 
            console.log(err); 
            return; 
        }

        let trackItems = response["Tracks"]["Items"];
        let list = [];

        for(let i = 0; i < trackItems.length; i++) {
            let track = trackItems[i];
            let id = JSON.stringify(track['Id']);
            let songName = JSON.stringify(track['Name']);
            let releaseDate = JSON.stringify(track['ReleaseDate']);
            let artist = JSON.stringify(track['Artists'][0]['Artist']['Name']);
            let album = JSON.stringify(track['Album']['Name']);
            let isExplicit = JSON.stringify(track['IsExplicit']);

            let jsonObject = {
                'id': id,
                'songName': songName,
                'artist': artist,
                'album': album,
                'releaseDate': releaseDate,
                'isExplicit': isExplicit};

            //Put this JSON into metadata blob

            //let url = getSong(id);

            // Put URL into ingest blob

            return JSON.stringify(jsonObject);
        }
    });
}

export function getSong(songId: string, callback: any) {
    let options = {
        url: 'https://music.xboxlive.com/1/content/' + songId + '/preview?clientInstanceId=b5213f74-fcbc-440d-86a5-e32f5ef4cde7',
        headers: {
            'Authorization': 'Bearer EgBuAQMAAAAEgAAADAABp8kSC7+3aw+7XOk5dsfclkrovuI8a89M2GwyCmUhbDXYsGdV8DIJ9F4y7/bVyoy4eHaAnhnPMoujy9jDcH94HFS9eHIyGywzjt39lUiDGw2z70dRQI9WOpeqresB4DPW1KTF0CsE7sOYyM7MFFpNKIdVtWXfEUOy5O+6JHLFYRhA0d19ia7JmFXt7LTP9ec2uM7cJR7eGmjldYtpYbWqG0ETsWilNOg7VIO+L8o6esqBd1Gu6IpKwL4oSDuZvCQNQ/XrAtDPf64PeE9pks/AinF7uYLXqfrmwWxdZiAd82ClCupIXtM1azvDhANtEcBF/F2fesklryu2AIdjXnOHYl0AWgBdAAAAAACB2h1EsCZ5WbAmeVmIgQQAEAAxMzEuMTA3LjE0Ny4yMTIAAAAAAC0AYXBwaWQ6Ly9iNTIxM2Y3NC1mY2JjLTQ0MGQtODZhNS1lMzJmNWVmNGNkZTcA',
            followAllRedirects: true
        }
    };
    
     console.log(songId); 

    try { 
        let response = request.get(options, function(err, response: any, body) {
            if(err) { 
                return;
            } else {
                callback(JSON.stringify(body));
            }
        });
    } catch (Error){
        return;
    }


}

export async function getArtist(artist: string) {
    let options = {
        url: 'https://music.xboxlive.com/1/content/music/search?q=' + artist.replace(' ', '+') + '&filters=artists&maxItems=1',
        headers: {
            'Authorization': 'Bearer EgBuAQMAAAAEgAAADAABp8kSC7+3aw+7XOk5dsfclkrovuI8a89M2GwyCmUhbDXYsGdV8DIJ9F4y7/bVyoy4eHaAnhnPMoujy9jDcH94HFS9eHIyGywzjt39lUiDGw2z70dRQI9WOpeqresB4DPW1KTF0CsE7sOYyM7MFFpNKIdVtWXfEUOy5O+6JHLFYRhA0d19ia7JmFXt7LTP9ec2uM7cJR7eGmjldYtpYbWqG0ETsWilNOg7VIO+L8o6esqBd1Gu6IpKwL4oSDuZvCQNQ/XrAtDPf64PeE9pks/AinF7uYLXqfrmwWxdZiAd82ClCupIXtM1azvDhANtEcBF/F2fesklryu2AIdjXnOHYl0AWgBdAAAAAACB2h1EsCZ5WbAmeVmIgQQAEAAxMzEuMTA3LjE0Ny4yMTIAAAAAAC0AYXBwaWQ6Ly9iNTIxM2Y3NC1mY2JjLTQ0MGQtODZhNS1lMzJmNWVmNGNkZTcA'
        }
    };

    let response = await request.get(options, function(err, response: any, body) {
        if(err) { 
            console.log(err); 
            return; 
        } else {
            return JSON.stringify(response['Artists']['Items'][0]['Id']);
        }
    });
}

function download(option: any, callback: any) {
    if (typeof option == 'string') {
        option = url.parse(option);
    }
    
    var req = http.request(option, function(res: any) {
        if (res.statusCode == 200) {
            callback(res);
        }
        console.log("Error retrieving the file");
    });
}