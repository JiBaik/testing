'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricsCtrl', ['$scope','Metric','$http', function ($scope, Metric, $http) {
    if(!Object.keys(Metric.metricData).length){
        Metric.index().then(
          function metricIndexSuccess(response) {
            $scope.metrics = response.data;
            $scope.metrics.forEach(function(obj){
              obj.url = obj.name.toLowerCase().split(' ').join('');
            })

            Metric.inputMetrics($scope.metrics);

          },
          function metricIndexError(response) {
            console.log('ERROR FETCHING METRIC INDEX', response);
          }
        );
      }else{
        $scope.metrics = Metric.metricData;
      }


  }]);
