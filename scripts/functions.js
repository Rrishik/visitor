function writeUserData(name, mobile, purpose, date) {
    // console.log(name, mobile, purpose);
    firebase.database().ref('users/' + currentUid).child('appointments/').push({
        username: name,
        mobile_no: mobile,
        purpose : purpose,
        date : date
    }, function(error){
        if (error)
        alert('Error has occured during saving process');
        else
        alert("Data has been saved succesfully");
    });

}


function readUserDataPresent(uid) {
    // console.log(name, mobile, purpose);
    document.getElementById('details').style.display = 'none';
    return firebase.database().ref('users/' + uid).child('appointments').once('value', function(snapshot) {
        var html_out = "";
        snapshot.forEach(function(userSnap) {
            var today = new Date();
            var date = new Date(userSnap.val().date);
            if (date.getTime() >= today.getTime()) {
                html_out+= '<li><a onclick="return viewVisitee(\'' + userSnap.val().username + ',' + userSnap.val().mobile_no + ',' + userSnap.val().purpose + ',' + userSnap.val().date + '\')">' + userSnap.val().username + '</a></li>' + '<hr>';
            }
        })
        document.getElementById("lists").innerHTML = html_out;
    });
}

function readUserDataPast(uid) {
    // console.log(name, mobile, purpose);
    document.getElementById('details').style.display = 'none';
    return firebase.database().ref('users/' + uid).child('appointments').once('value', function(snapshot) {
        var html_out = "";
        snapshot.forEach(function(userSnap) {
            var today = new Date();
            var date = new Date(userSnap.val().date);
            if (date.getTime() < today.getTime()) {
                html_out+= '<li><a onclick="return viewVisitee(\'' + userSnap.val().username + ',' + userSnap.val().mobile_no + ',' + userSnap.val().purpose + ',' + userSnap.val().date + '\')">' + userSnap.val().username + '</a></li>' + '<hr>';
            }
        })
        document.getElementById("lists").innerHTML = html_out;
    });
}

function viewVisitee(visitee){
    // visitee = JSON.parse(visitee);
    visitee = visitee.split(",");
    var details = '&nbsp NAME: ' + visitee[0]  + '&nbsp &nbsp' + 'MOBILE: ' + visitee[1] + '&nbsp &nbsp' + 'PURPOSE: ' + visitee[2] + '&nbsp &nbsp' + 'DATE: ' + visitee[3] + '&nbsp' ;
    document.getElementById('details').style.display = 'block';
    document.getElementById('details').innerHTML = details;
}
