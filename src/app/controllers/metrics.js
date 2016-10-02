'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricsCtrl', ['$scope','Metric','$http', function ($scope, Metric, $http) {
    Metric.index().then(
      function metricIndexSuccess(response) {
        $scope.metrics = response.data;
        $scope.metrics.forEach(function(obj){
          obj.url = obj.name.toLowerCase().split(' ').join('');
        })

        Metric.inputMetrics($scope.metrics);
        console.log('All metrics',response.data)
      },
      function metricIndexError(response) {
        console.log('ERROR FETCHING METRIC INDEX', response);
      }
    );

      // $http({
      //     method: 'GET',
      //     url: 'https://api.hoopla.net/users/192aec7a-b073-4933-812a-8b31c7e5df41'
      //     }).then(function(res){
      //       console.log('User',res.data)
      //   });

  }]);
