var seperate_line = '----------------------------------------------';



print(seperate_line);
print('Step 1: clean error id_member.');
var re = /^[1-9]+[0-9]*]*$/;
db.tweets.find({}, {_id: 1, id_member: 1}).forEach(function(x){
                                      if(!re.test(x.id_member) || x.id_member < 0){
                                                  db.tweets.update({_id: x._id}, {$set: {id_member: 0}}, true, true);
                                      }
                                      })
print('Step 1 Finished.');


print(seperate_line);
print('Step 2: clean error text.');
var errText = 0;
db.tweets.find({}, {_id: 1, text: 1}).forEach(function(x){
                                             if(!re.test(x.text.length)){
                                             errText++;
                                             db.tweets.update({_id: x._id}, {$set: {text: '0'}}, true, true);
                                             //print(x.text.length);
                                             }
                                             })
print('Have ' + errText + ' errText.');
print('Step 2 Finished.');



print(seperate_line);
print('Step 3: clean error time.');
var errTime = 0;
var timeStyle = /^2014-06-(2[0-9]|30)\s(([0-1][0-9])|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
db.tweets.find({}, {_id: 1, timestamp: 1}).forEach(function(x){
                                              if(!timeStyle.test(x.timestamp)){
                                              errTime++;
                                              db.tweets.update({_id: x._id}, {$set: {timestamp: '2014-00-00 00:00:00'}}, true, true);
                                              //print(x.timestamp);
                                              }
                                              })
print('Step 3 Finished.');




print(seperate_line);
print('Step 4: clean error geo_lat.');
var errLat = 0;
db.tweets.find({}, {_id: 1, geo_lat: 1}).forEach(function(x){
                                                   if(!(x.geo_lat >= -180 && x.geo_lat <= 180)){
                                                   errLat++;
                                                   db.tweets.update({_id: x._id}, {$set: {geo_lat: '0'}}, true, true);
                                                   //print(x.geo_lat);
                                                   }
                                                   })
print('Step 4 Finished.');



print(seperate_line);
print('Step 5: clean error geo_lng.');
var errLng = 0;
db.tweets.find({}, {_id: 1, geo_lng: 1}).forEach(function(x){
                                                 if(!(x.geo_lng >= -90 && x.geo_lng <= 90)){
                                                 errLng++;
                                                 db.tweets.update({_id: x._id}, {$set: {geo_lng: '0'}}, true, true);
                                                 //print(x.geo_lng);
                                                 }
                                                 })
print('Step 5 Finished. All Done! :)');



print(seperate_line);