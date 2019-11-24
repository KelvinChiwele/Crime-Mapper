const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

/*
 exports.helloWorld = functions.https.onCall((request, response) => {
    const ref = admin.firestore().collection('users').doc(data.slug);
    return ref.get().then(doc => {
        return {unique: !doc.exists}
    }).catch(err =>{
        throw new functions.https.HttsError('Failed to connect')
    })
 });*/

 /**
 * Converts degrees to radians.
 * 
 * @param degrees Number of degrees.
 */
function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
}

/**
 * Returns the distance between 2 points of coordinates in Google Maps
 * 
 * @see https://stackoverflow.com/a/1502821/4241030
 * @param lat1 Latitude of the point A
 * @param lng1 Longitude of the point A
 * @param lat2 Latitude of the point B
 * @param lng2 Longitude of the point B
 */
function getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
}

 //Listens for any document change and assign case to right juridictions
 exports.onCreateCase = functions.firestore
    .document('occurences/{occurencesUrl}')
    .onCreate((snap, context) => {
        const newValue = snap.data();
        //var closestStation = getClosetStation(newValue.latitude, newValue.longitude);
       admin.firestore().collection("occurences").add({
            referenceNumber: newValue.latitude,
            obNumber: newValue.latitude
        }).then(function(docRef) {
            
        }).catch(function(error) {
            
        });   
});

function getClosetStation(latitude, longitude){
    var closestStation;
    var closestDistance = 0;
    const ref = admin.firestore().collection('stations');
    return ref.get().then(snapshot => {
        /*closestDistance = snapshot[0].latitude;
        console.log("snapshot " + snapshot[0])
        console.log("closestStation " + closestStation)
        console.log("closestDistance " + closestDistance)*/

        snapshot.forEach(doc => {
            console.log("Coordinates "+ doc.latitude,  doc.longitude, latitude, longitude)
           var currentDistance = getDistanceBetweenPoints(15.4037566,  20.217839, latitude, longitude)
           console.log("currentDistance "+ currentDistance)
           if (currentDistance  < closestDistance){
              closestDistance = currentDistance;
              closestStation = doc.station
           } 
        })
        console.log(closestStation)
        return closestStation;        
    }).catch(err =>{
        throw new functions.https.HttsError('Failed to connect')
    });
}
