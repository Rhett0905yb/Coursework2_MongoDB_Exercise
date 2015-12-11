var seperateLine = '---------------------------------------';

print(seperateLine);
print('Question 1: How many unique user are there?');
var total_user = db.tweets.distinct('id_member').length;
print('Total user:' + (total_user - 1));





print(seperateLine);
print('Question 2: How many tweets(%) did the top 10 users measured by the number of messages) publish?');
var q2 = db.tweets.aggregate([{$group:{_id:'$id_member', tweetsSum:{$sum: 1}}}, {$sort:{tweetsSum: -1}}, {$skip: 1}, {$limit: 10}])
var sumq2 = 0;
for(var point = 0; point < 10; point++){
    sumq2 += JSON.stringify(q2['_firstBatch'][point]['tweetsSum']) * 1;
}
print('The result is ' + sumq2 / db.tweets.find().count() * 100 + '%.');







print(seperateLine);
print('Question 3: What was the earliest and lastet data (YYYY-MM-DD HH:MM:SS) that a message was published?');
db.tweets.ensureIndex({timestamp: 1})
var earliest_date = db.tweets.find().sort({timestamp: 1}).limit(1);
print( 'Earliest date: ' + earliest_date[0]['timestamp']);
var latest_date = db.tweets.find().sort({timestamp: -1}).limit(1);
print( 'Latest date: ' + latest_date[0]['timestamp']);





print(seperateLine);
print('Question 4: What is the mean time delta between all messages?');
print('We can use mathematic method to solve this problem: ');
print('[(7 x 24 + 1 + 22) x 3600 - 1] / (1459861 – 1) = 0.47100338388612606 s');
print('And we also can solve this problem by programming: ');
var q4 = db.tweets.find({}, {_id: 1, timestamp: 1}).sort({timestamp: -1});
var sumTimeSpace = 0;
for(var i = 0; i < q4.length() - 1; i++){
    sumTimeSpace += (q4[i]['timestamp'][8] * 864000 + q4[i]['timestamp'][9] * 86400 + q4[i]['timestamp'][11] * 36000 + q4[i]['timestamp'][12] * 3600 + q4[i]['timestamp'][14] * 600 + q4[i]['timestamp'][15] * 60 + q4[i]['timestamp'][17] * 10 + q4[i]['timestamp'][18] * 1) - (q4[i + 1]['timestamp'][8] * 864000 + q4[i + 1]['timestamp'][9] * 86400 + q4[i + 1]['timestamp'][11] * 36000 + q4[i + 1]['timestamp'][12] * 3600 + q4[i + 1]['timestamp'][14] * 600 + q4[i + 1]['timestamp'][15] * 60 + q4[i + 1]['timestamp'][17] * 10 + q4[i + 1]['timestamp'][18] * 1);
    
}
print(sumTimeSpace / (q4.length() - 1));





print(seperateLine);
print('Question 5: What is the mean length of a message?');
var sum = 0;
db.tweets.find({}, {id: 1, text: 1}).forEach(function(x){
                                             sum += x.text.length;
                                             }
                                             )
print((sum - 45) / (q4.length() - 45));






print(seperateLine);
print('Question 6: What are the 10 most common unigram and bigram strings within the messages?');





print(seperateLine);
print('Question 7: What is the average number of hashtags (#) used within a message?');
var sumHashtags = 0;
var re = new RegExp('#', 'g');
db.tweets.find({}, {_id: 1, text: 1}).forEach(function(x){
                                              var matched = x.text.match(re)
                                              if(matched !== null){
                                              sumHashtags += matched.length;
                                              }
                                              
                                              })
print('There have ' + sumHashtags + ' hashtags(#) in all and ' + (sumHashtags / (q4.length() - 45)) + ' per message.');





print(seperateLine);
print('Question 8: Which area within the UK contains the largest number of published messages?');
print(' Hint, the geographic latitude and longitude coordinates can be aggregated.');
var inEngland = 0;
var inScotland = 0;
var inWelsh = 0;
var inNorthernIreland = 0;
db.tweets.find({}, {geo_lat: 1, geo_lng: 1}).forEach(function(x){
                                                     if(x.geo_lat >= 55.40407 && x.geo_lat <= 59.556592 && x.geo_lng >= -5.625 && x.geo_lng <= -0.043945){
                                                     inScotland++;
                                                     }
                                                     else if(x.geo_lat >= 50.120578 && x.geo_lat <= 55.40407 && x.geo_lng >= -3.010254 && x.geo_lng <= 1.867676){
                                                     inEngland++;
                                                     }
                                                     else if(x.geo_lat >= 53.981935 && x.geo_lat <= 55.279115 && x.geo_lng >= -7.954102 && x.geo_lng <= -5.625){
                                                     inNorthernIreland++;
                                                     }
                                                     else if(x.geo_lat >= 49.95122 && x.geo_lat <= 53.46189 && x.geo_lng >= -6.152344 && x.geo_lng <= -3.010254){
                                                     inWelsh++;
                                                     }
                                                     })
print('In Scotland have ' + inScotland + ' tweets.');
print('In England have ' + inEngland + ' tweets.');
print('In NorthernIreland have ' + inNorthernIreland + ' tweets.');
print('In Welsh have ' + inWelsh + ' tweets.');
print('< England > have the largest number of published messages.');




