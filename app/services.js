angular.module('myApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('KdUUsNYFO05CMzUh1rGxoEfDsT4', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getFollowers: function (nextcursor, prevcursor) {
        		if (nextcursor == 0 && prevcursor != 0) {
        			return;
        		}
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
      			//var url='/1.1/statuses/home_timeline.json';
					var url='/1.1/followers/list.json';
										
					if(nextcursor){
						url+='?cursor='+nextcursor;
					} else {
						url+='?cursor=-1';
					}
      			//if(maxId){
      			//	url+='?max_id='+maxId;
      			//}
            var promise = authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolve the deferred object
				        deferred.resolve(data);
            }).fail(function(err) {
               //in case of any error we reject the promise with the error object
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        postTweet: function(status) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            
            var url='/1.1/statuses/update.json';
            
            url+='?status='+status;
            
            var promise = authorizationResult.post(url).done(function(data) {
            //when the data is retrieved resolve the deferred object
				   deferred.resolve(data);
            }).fail(function(err) {
               //in case of any error we reject the promise with the error object
               deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
    }

});