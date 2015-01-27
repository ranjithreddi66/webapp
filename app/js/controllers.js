'use strict';

/* Controllers */

angular.module('cttvControllers', ['cttvServices']).






/**
 * High level controller for the app
 */
controller('CttvAppCtrl', ['$scope',  function ($scope) {
    
}]). 


/**
   * GeneDiseaseCtrl
   * Controller for the Gene <-> Disease page
   * It loads the evidence for the given target <-> disease pair
*/
controller('GeneDiseaseCtrl', ['$scope', '$location', '$log', function ($scope, $location, $log) {
    $log.log('GeneDiseaseCtrl()');
    $log.log($location.search().t);

    $scope.search = {
	target : $location.search().t,
	disease : $location.search().d
    };

    console.log($scope.search);
}]).



/**
 * AssociationsCtrl
 * Controller for the associations page
 * It loads a list of associations for the given search
 */
// controller('AssociationsCtrl', ['$scope', '$location', '$log', 'cttvAppToAPIService', 'cttvAPIservice', function ($scope, $location, $log, cttvAppToAPIService, cttvAPIservice) {
controller ("AssociationsCtrl", ['$scope', '$location', '$log', function ($scope, $location, $log) {
    $log.log('AssociationsCtrl()');
    $scope.search = {
	query : $location.search().q,
	label : $location.search().label
    };
    $scope.took = 0;
    $scope.nresults = 0;
    // $scope.search = cttvAppToAPIService.createSearchInitObject();

    /*
     * NOTE: this is a temporary function. It will change when we have the final API call for this
     * In the meantime we process and count results here
     */
    // var processData = function(data){
    //     console.log("processData() "+data.data.length);
    //     var d = {};
    //     for(var i=0; i<data.data.length; i++){
    //         if( d[data.data[i]["biological_object.efo_info.efo_label"]] == undefined ){
    //             d[data.data[i]["biological_object.efo_info.efo_label"]] = 1;
    //         } else {
    //             d[data.data[i]["biological_object.efo_info.efo_label"]]++;
    //         }
    //     }
        
    //     var dj = { "name": $scope.search.label, "children":[] };
    //     for(var i in d){
    //         dj.children.push( {"name": i, "value": d[i]} );
    //     }


    //     return dj;
    // }



    /*
     * Exposed method to be called by the pagination
     */
    // $scope.getResults = function(){
    //     return cttvAPIservice.getEvidence( cttvAppToAPIService.getApiQueryObject(cttvAppToAPIService.EVIDENCE, $scope.search.query) ).
    //         success(function(data, status) {
    //             // process and count the data and then show the bubbles...
    //             $scope.search.results = data;
    //             $scope.d3data = processData(data);
    //         }).
    //         error(function(data, status) {
    //             $log.error("ERROR "+status);
    //         });
    // }

    // if($location.search().q){
    //     // parse parameters
    //     $scope.search.query.q = $location.search().q || "";

    //     // for the bubble chart:
    //     $scope.search.query.size=1000; // get all the results we can in one request
    //     $scope.search.label = $location.search().label || "";
        
    //     // and fire the search
    //     $scope.getResults();
    // }
    
}]).






/**
 * SearchAppCtrl
 * Controller for the search/results page
 */
controller('SearchAppCtrl', ['$scope', '$location', '$log', 'cttvAppToAPIService', 'cttvAPIservice', function ($scope, $location, $log, cttvAppToAPIService, cttvAPIservice) {
    
    $log.log('SearchCtrl()');

    
    $scope.search = cttvAppToAPIService.createSearchInitObject();

    $scope.getResults = function(){
        return cttvAPIservice.getSearch( cttvAppToAPIService.getApiQueryObject(cttvAppToAPIService.SEARCH, $scope.search.query) ).
            success(function(data, status) {
                $scope.search.results = data;
            }).
            error(function(data, status) {
                $log.error(status);
            });
    }

    if($location.search().q){
        // parse parameters
        $scope.search.query.q = $location.search().q || "";

        // and fire the search
        $scope.getResults();
    }


}]).






/**
 * Controller for the little search box
 */
controller('SearchBoxCtrl', ['$scope', '$location', 'cttvAPIservice', function ($scope, $location, cttvAPIservice) {
    
    var APP_SEARCH_URL = "search";
    var APP_EVIDENCE_URL = "evidence";
    var APP_AUTOCOMPLETE_URL = "autocomplete"
    $scope.query = ""; /*{
        text: "",
    };*/
    $scope.search = {
        query: {
            text: ""
        },
        results:{

        }
    }


    $scope.hasFocus = true;

    /**
     * Get suggestions for typeahead.
     * This needs to take a value directly, not via scope, otherwise the typeahead is one char behind
     */
    $scope.getSuggestionsOLD = function(val) {
        console.log(val);
        /*return cttvAPIservice.getSearch({q:val}).then(function(response){
                return response.data.data;
            });*/
        return cttvAPIservice.getSearch({q:val}).
            success(function(data, status) {
                $scope.query.results = data.data;
            }).
            error(function(data, status) {
                $log.error(status);
            });
    };


    /**
     * Checks if the current search has got any results.
     * Returns TRUE / FALSE.
     */
    $scope.hasResults=function(){
        return Object.keys($scope.search.results).length>0;
    }

    $scope.test=function(e){
        console.log(e);
    }

    $scope.isVisible = function(){
        return $scope.hasFocus && $scope.hasResults() && $scope.search.query.text.length>2;
    }

    $scope.getSuggestions = function(query){

        if(query.length>=3){
            // fire the typeahead search
            cttvAPIservice.getAutocomplete({q:$scope.search.query.text, size:3}).
                success(function(data, status) {
                    $scope.search.results = data.data;
                    console.log(data.data);
                }).
                error(function(data, status) {
                    $log.error(status);
                });
        }else{
            $scope.search.results = {};
        }
    }


    var setLocation=function(url){
        console.log(url);
        if($location.url() != url){
            $location.url(url);
        }
    }


    $scope.linkTo =function(s){
        console.log(s.label+" ("+s.type+") "+s.q);

        // show search results page, nice and easy...

        // so, where do we want to go then?
        // parse the options:
        if( s.type.toLowerCase()=="genedata" ){
            console.log("   genedata");
            $location.url("target-associations");
        } else if ( s.type.toLowerCase()=="efo" ){
            console.log("   efo");  
            $location.url("disease-associations");
        }
        console.log($location);
        $location.search( 'q=' + s.q + "&label="+s.label);
        
        $scope.search.query.text = "";
    }



    /**
     * Sets a new search via the URL
     */
    $scope.setSearch = function(){

        // show search results page, nice and easy...
        if($location.url() != APP_SEARCH_URL){
            $location.url(APP_SEARCH_URL);
        }
        $location.search( 'q=' + $scope.search.query.text);


        /*
        // We need to check whether the user has selected an item from the typeahead
        // or just seraching for text s/he entered
        if( (typeof $scope.query).toLowerCase() === "string" ){

            console.log("show search...");
            // show disambiguation page (i.e. search results)
            if($location.url() != APP_SEARCH_URL){
                $location.url(APP_SEARCH_URL);
            }
            //$location.search( 'q=' + ($scope.query.title || $scope.query) );
            $location.search( 'q=' + $scope.query );

        } else {

            // query was selected from suggestion typeahead
            if( $scope.query.type === "genename"){
                // show evidence page (i.e. bubbles)
                if($location.url() != APP_EVIDENCE_URL){
                    $location.url(APP_EVIDENCE_URL);
                }
                $location.search( 'q=' + $scope.query.id+"&label="+$scope.query.title );
            }
        }
        */
        
        // reset the query field:
        // the search result page should probably still show this, the problem is that the scope of this search box is separate
        // so if we then go to the gene, or association page, this would still show the original query...
        // So, for now we RESET the field, then I'll think about it.
        $scope.search.query.text = "";  
    }

}]).






controller('SearchResultsCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    
}]).



controller('D3TestCtrl', ['$scope', '$log', function ($scope, $log) {
    $log.log("D3TestCtrl");
}])



