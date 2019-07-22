var app = angular.module( "radio", ["ngRoute", "angularUtils.directives.dirPagination"] );
var api_test = "http://www.radio-browser.info/webservice/json/stations/bycountry/zambia";
var api_RnB = "http://www.radio-browser.info/webservice/json/stations/bytag/rnb";
var api_get_station = "http://www.radio-browser.info/webservice/json/stations/byuuid/";
var api_all_stations = "http://www.radio-browser.info/webservice/json/stations";
// Directives declarations section
app.directive( "nowPlaying", function() {
    return {
        restrict: "C",
        template: "Currently Playing"
    };
});

app.directive( "radioStations", function() {
    return {
        restrict: "C",
        template: "Radio Stations"
    };
});

app.run( function($rootScope, $http) {
     $http.get( api_get_station + window.location.hash.split("/")[2] )
     .then( function( response ) {
         $rootScope.title = JSON.parse( JSON.stringify( response.data ) )[0].name;
     })
});

//angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);
app.controller( "stationsCtrl", function($scope, $http) {

    $http.get( api_test )
    .then( (response) => {
        $scope.stations = response.data
        
    $http.get( api_all_stations )
    .then( (response) => {
        $scope.stationsAll = response.data
    });
});

    $scope.fav = ( station_id ) => {
        var stations = window.localStorage.getItem('stations');
        $http.get( api_get_station + station_id )
        .then( (response ) => {
            var link_data = JSON.stringify(response.data)
            if (stations == null) {
                window.localStorage.setItem('stations', link_data);
            }
            else {
                let new_station = stations.concat(link_data)
                window.localStorage.setItem('stations', new_station)
            }
            
            console.debug(stations)
        })
    }
});


app.controller( "stationSelectorCtrl", function($scope, $routeParams, $http) {
    
    var player = document.getElementById("player");

    console.log ( api_get_station + $routeParams.sid );

    $http.get( api_get_station + $routeParams.sid )
    .then( function( response ) {
    var json_data = JSON.stringify(response.data);
    $scope.url = JSON.parse(json_data)[0].url;
    $scope.favicon = JSON.parse(json_data)[0].favicon;
    $scope.name = JSON.parse(json_data)[0].name;
    $scope.tags = JSON.parse(json_data)[0].tags;
    $scope.votes = JSON.parse(json_data)[0].votes;
    player.play();
    document.title = JSON.parse(json_data)[0].name +' | Cloud Radio';

    } );
    
});


/*var app = angular.module('infiniteScroll', ['infinite-scroll']);
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);
app.controller('scrolling',function($scope, $http){
    $http.get( api_get_station + window.location.hash.split("/")[2] )
    .then( function( response ) {
    var last = JSON.parse( JSON.stringify( response.data ) ).length;
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    $scope.loadMore = function() {
        //var last = $scope.images[$scope.images.length - 1];
        for(var i = 1; i <= 12; i++) {
            $scope.images.push(last + i);
        }
    };
});
});
*/

//App routing section
app.config( function($routeProvider) {
    $routeProvider
    .when( "/", {
        template: "Home"
    })
    .when( "/station/:sid", {
        templateUrl: "/music_player",
        controller: "stationSelectorCtrl"
    })
});
