	 var cities = [
    {
        city : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        long : -79.4000
    },
    {
        city : 'New York',
        desc : 'This city is aiiiiite!',
        lat : 40.6700,
        long : -73.9400
    },
    {
        city : 'Chicago',
        desc : 'This is the second best city in the world!',
        lat : 41.8819,
        long : -87.6278
    },
    {
        city : 'Los Angeles',
        desc : 'This city is live!',
        lat : 34.0500,
        long : -118.2500
    },
    {
        city : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        long : -115.1522
    }
];



//inject the twitterService into the controller
app.controller('TwitterController', function($scope,$q, twitterService, $location) {

    $scope.followers=[]; //array of followers
    $scope.followers_prev_cursor = 0;
	 $scope.followers_next_cursor = 0;


    twitterService.initialize();

    //using the OAuth authorization result get 1 page of the latest followers from twitter for the user
    $scope.refreshFollowers = function(followers_next_cursor, followers_prev_cursor) {
        twitterService.getFollowers(followers_next_cursor, followers_prev_cursor).then(function(data) {
            $scope.followers = data.users;
            $scope.followers_next_cursor = data.next_cursor;
            $scope.followers_prev_cursor = data.previous_cursor;
            if (data.next_cursor == 0) {
            	$scope.followersEnd = true;
            }
            $('#getFollowersButton').hide();
            $('#refreshFollowersButton').show();
            $('#load-more').show();
        },function(){
            $scope.rateLimitError = true;
        });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
				$location.path('/view2');            
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the followers
                $('#connectButton').fadeOut(function(){
                    $('#getFollowersButton, #signOut').fadeIn();
					          $scope.connectedTwitter = true;
                });
            } else {

			         }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.followers.length = 0;
        $location.path('/view1');
        $('#getFollowersButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
			$scope.$apply(function(){$scope.connectedTwitter=false})
        });
        $scope.rateLimitError = false;
        $scope.followersEnd = false;    
    }

    //if the user is a returning user, hide the sign in button and display the followers
    if (twitterService.isReady()) {
		  $location.path('/view2');        
        $('#connectButton').hide();
        $('#getFollowersButton, #signOut').show();
		  $('#load-more').hide();
     	  $scope.connectedTwitter = true;
    }

});

app.controller('MapCtrl', function($scope) {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
});