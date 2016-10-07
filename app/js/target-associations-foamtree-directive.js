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
						rainbowStartColor: "hsla(0, 100%, 70%, 1)",
						rainbowEndColor:   "hsla(100, 100%, 70%, 1)",
						groupMinDiameter: 0,
						exposeDuration: 300,
						groupLabelMinFontSize: 3,
						parentFillOpacity: 0.5,
						groupInsetWidth: 0,
				        groupSelectionOutlineWidth: 1,
				        groupBorderWidthScaling: 0.25,
						rolloutDuration: 0,
				        pullbackDuration: 0,
						groupBorderWidth : 0,
						groupBorderRadius : 0,
						relaxationInitializer : 'ordered',
						/*
						onGroupSelectionChanged: function(args) { selectGroup(args.groups[0]) },
						onGroupDoubleClick: function(args) {
							var g = args.group;
						},
						onGroupExposureChanged: function(e) {
							var g = e.groups[0];
							if (g) {
								exposed = g;
								validateExposed(true)
							} else {
								validateExposed(false)
							}
				        },
						groupColorDecorator: function (opts, params, vars) {
							var g = params.group;
							if ($('#chk-rainbow').prop('checked'))
								return;
							//console.log(g, vars.groupColor)
							if (g.parent.top) {
								var d =  Math.round(g.weight * 120/(g.parent.maxweight-g.parent.minweight)); 
								vars.groupColor.h = 240 + d;
								g.bcolor = 240 + d;
							}  else {
								vars.groupColor.h = g.bcolor;
								var d =  100 - Math.round(g.weight * 50/(g.parent.maxweight-g.parent.minweight));
								vars.groupColor.l = d;
							}
							if (g.hovered) {
								vars.groupColor = '#98C7FD' ;
							}
						}, onGroupHover : function(args) {
							//hoverNode(args.group)
						},
						*/
						
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
