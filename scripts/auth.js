var config = {
    apiKey: "AIzaSyCJeNTV72VM_aV5SvLJw6HA1EGInPu4HRM",
    authDomain: "visitor-management-syste-e2c2b.firebaseapp.com",
    databaseURL: "https://visitor-management-syste-e2c2b.firebaseio.com",
    projectId: "visitor-management-syste-e2c2b",
    storageBucket: "visitor-management-syste-e2c2b.appspot.com",
    messagingSenderId: "869845527693"
};
firebase.initializeApp(config);

var database = firebase.database();

var currentUid = null;
firebase.auth().onAuthStateChanged(function(user) {
    // onAuthStateChanged listener triggers every time the user ID token changes.
    // This could happen when a new user signs in or signs out.
    // It could also happen when the current user ID token expires and is refreshed.
    if (user && user.uid != currentUid) {
        // Update the UI when a new user signs in.
        // Otherwise ignore if this is a token refresh.
        // Update the current user UID.
        currentUid = user.uid;
        document.getElementById('username').innerHTML = '<h3>' +user.displayName+ '</h3>';
    } else {
        // Sign out operation. Reset the current user UID.
        currentUid = null;
        console.log("no user signed in");
    }
});

function logout(){
    firebase.auth().signOut().then(function() {
        alert("You've been logged out successfully!");
    }, function(error) {
        alert("Oops! Please try again");
    });
}
