
'use strict';

var baxter = angular.module('baxter', ['ngSanitize']),
    tumblrApi = 'fUtdwgP36wKTV9LbYGbNNZ2qPMONCAIRxC3GZVTqnV0swO3RTZ';

baxter.factory('tumblr', function($http){
  var url = 'http://api.tumblr.com/v2/tagged'
  return {
    getPosts: function(callback){
      $http.jsonp(url, { params: { api_key: tumblrApi, tag: 'kickstarter', callback: 'JSON_CALLBACK' }}).success(callback);
    },
    getMore: function(oldest, callback) {
      $http.jsonp(url, { params: { api_key: tumblrApi, tag: 'kickstarter', callback: 'JSON_CALLBACK', before: oldest }}).success(callback);
    }
  }
});

baxter.controller('IndexCtrl', ['$scope', 'tumblr', function($scope, tumblr){
  $scope.oldest;
  tumblr.getPosts(function(res) {
    $scope.posts = res.response;
    $scope.oldest = $scope.posts[$scope.posts.length-1].timestamp;
  });
  $scope.getMore = function(){
    tumblr.getMore($scope.oldest, function(res) {
      $scope.posts = $scope.posts.concat(res.response);
      $scope.oldest = $scope.posts[$scope.posts.length-1].timestamp;
    });
  };
}]);

