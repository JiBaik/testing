'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('Metric', function($http, $q, Root) {
    var metricData = {};
    return {
      index: function index() {
        // find the right value href for the metric index
        var metrics_index_href = null;
        return Root.index().then(
          function rootIndexSuccess(response) {
            response.data.links.forEach(function (link) {
              if (link.rel === 'list_metrics') {
                metrics_index_href = link.href;
              }
            });

            if (!metrics_index_href) {
              // there was a problem finding the URL
              return $q.reject('Cannot get metrics index URL');
            }

            // found the URL, make the request and return the promise
            return $http({
              method : 'GET',
              url: metrics_index_href,
              cache: true
            });
          },
          function rootIndexError(response) {
            return $q.reject(response);
          }
        );
      },
    inputMetrics: function(arrOfMetrics){
       if(Array.isArray(arrOfMetrics)){
         arrOfMetrics.forEach(function(metricObj){
         metricData[metricObj.url] = metricObj;
       });
       }else{
         throw 'not an array';
       }
      },
    inputUsers: function(arrOfValues, metric){
      if(Array.isArray(arrOfValues)){

        metricData[metric].formattedUsers = {};

         arrOfValues.forEach(function(valueObj){
            $http({
              method: 'GET',
              url: valueObj.owner.href
              }).then(function(res){
                metricData[metric].formattedUsers[res.data.email] = {
                    firstname: res.data.first_name,
                    lastname: res.data.last_name,
                    value: valueObj.value,
                    valueData: valueObj
                    };
            });

          });
       }else{
         throw 'not an array';
       }
    },
      metricData: metricData
    }
  });
