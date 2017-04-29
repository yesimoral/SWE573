//inject the twitterService into the controller
app.controller('TwitterController', function($scope,$q, twitterService) {

    $scope.followers=[]; //array of followers
    $scope.followers_cursor = 0;

    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 followers from twitter for the user
    $scope.refreshFollowers = function(cursor) {
        twitterService.getFollowers(cursor).then(function(data) {
            $scope.followers = $scope.followers.concat(data.users);
            $scope.followers_cursor = data.next_cursor;
        },function(){
            $scope.rateLimitError = true;
        });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the followers
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshFollowers();
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
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
			$scope.$apply(function(){$scope.connectedTwitter=false})
        });
        $scope.rateLimitError = false;    
    }

    //if the user is a returning user, hide the sign in button and display the followers
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
     		$scope.connectedTwitter = true;
        $scope.refreshFollowers();
    }

});