angular.module('voting',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.candidates = [];
    $scope.ballot = [];
    $scope.getAll = function() {
			return $http.get('/voting').success(function(data){
				angular.copy(data, $scope.candidates);
			});
    };
    $scope.getAll();
    $scope.create = function(candidate) {
			return $http.post('/voting', candidate).success(function(data){
				$scope.candidates.push(data);
			});
    };
    $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.candidates, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.ballot.push(value);
        }
      });
    }

    $scope.upvote = function(candidate) {
      return $http.put('/voting/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
    };

    $scope.addCandidate = function() {
      console.log($scope.formPicurl);
      console.log($scope.formContent);
      var newObj = {Name:$scope.formContent,votes:0,price:$scope.formPrice,image:$scope.formPicurl};
      $scope.create(newObj);
      $scope.formContent = '';
      $scope.formPrice = '';
      $scope.formPicurl = '';
    }

    $scope.incrementUpvotes = function(candidate) {
      $scope.upvote(candidate);
    };
 
    $scope.delete = function(candidate) {
      console.log("Deleting Name "+candidate.Name+" ID "+candidate._id);
      $http.delete('/voting/'+candidate._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
