 var config = {
    apiKey: "AIzaSyBNvk3eLi4oma0AoC7wgniSP4jQ58QwHKI",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);


funcion getData(){
	var list_story = [];
	var i;
	var story_get = firebase.database().ref('zipcode');
	story_get.on('value',function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	      list_story.push(childSnapshot.child("zipcode").val());
	    });
	    var container3 = document.getElementById("test3");
	    console.log(container3);
	for( i=0; i < 3; i++){
	  container3.insertAdjacentHTML('beforeend', '<div class = "col span-1-of-3"><blockquote>' + list_story[i] + '</blockquote></div>');
	};
	})

}
