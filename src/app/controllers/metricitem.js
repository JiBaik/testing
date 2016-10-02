'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricItemCtrl', ['$scope','Metric','$location', '$http', function ($scope, Metric, $location, $http) {
        $scope.greeting = 'Welcome to a metric page';
        $scope.url = $location.path().substring(8);
        $scope.data = Metric.metricData[$scope.url];

        if(!$scope.data.formattedUsers){
          $http({
              method: 'GET',
              url: $scope.data.links[0].href
              }).then(function(res){
                Metric.inputUsers(res.data, $scope.data.url);
            });
        }

        $scope.changeVal = function(user){
          do{
            var val = prompt("Edit Value?", user.value);
          }while(isNaN(val) || val<0);
          if(val === null) return;
          else val = Number(val);

          var data = Object.assign({},user.valueData);
          data.value = val;
            $http({
            method: 'PUT',
            url: user.valueData.href,
            data: data,
            headers:{
              'Content-Type': 'application/vnd.hoopla.metric-value+json'
            }
          }).then(function(res){
            user.value = val;
            user.valueData = res.data;
          }, function(err){
            console.log(err);
          });
        }

  }]);