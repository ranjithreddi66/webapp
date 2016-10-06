/* Directives */ angular.module('cttvDirectives') 

/**
* FoamTree view for target associations
*/

.directive('cttvTargetAssociationsFoamtree', ['$timeout', function ($timeout) {

    return {

        restrict: 'E',

        scope: {
            width: '=?',
            height: '=?',
            clusterData: '=',
            onCellSelect: '=?',
            tab: '=?' // use this if the directive is in a tab
        },

        template: '<div id="foamtree" style="width: {{width}}px; height: {{height}}px"></div>',

        link: function (scope, element, attribute) {
        	
        	var foamtree = {};

        	scope.width = angular.isDefined(scope.width) ? scope.width :  500; // set the default width
        	
        	scope.height = angular.isDefined(scope.height) ? scope.height : 500; // set the default height
			
        	if (!angular.isDefined(scope.clusterData)) {
        		console.log("Foamtree Error: No data to display, please include a cluster-data attribute");
        	}
        	
        	scope.onCellSelect = angular.isDefined(scope.onCellSelect) ? scope.onCellSelect: function(event) {console.log("clicked on ", event.group)};
        	
        	if(!angular.isDefined(scope.tab)) {
        		drawFoamTree();
        	}
        	
        	function drawFoamTree() {
				// need the timeout so the template can load and we have an id to use to display the foamtree
				$timeout( function() {
					foamtree = new CarrotSearchFoamTree({
						id: "foamtree",
						dataObject: {
							groups: scope.clusterData
						},
						onGroupClick: scope.onCellSelect,
						stacking: "flattened",
						layout: "squarified"
					});
				});
        	}
        	
			scope.$watch('tab', function() {
				if(scope.tab) {
					drawFoamTree();
				}
			});

			// when the cluster data changes, redraw the foamtree
			scope.$watch('clusterData', function() {
				if(angular.isDefined(foamtree.set)) {
					foamtree.set({
						dataObject: {
							groups: scope.clusterData
						}
					})
					foamtree.redraw();
				}
			})

        } // end link

    }; // end return

}]); // end directive cttvTargetAssociationsFoamTree
