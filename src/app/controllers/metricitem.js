'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricItemCtrl', ['$scope','Metric','$location', '$http', function ($scope, Metric, $location, $http) {
        $scope.greeting = 'Welcome to a metric page';
        $scope.url = $location.path().substring(8);
        $scope.data = Metric.metricData[$scope.url];

      $http({
          method: 'GET',
          url: $scope.data.links[0].href
          }).then(function(res){
            console.log('Whats this',res.data)
        });

  }]);