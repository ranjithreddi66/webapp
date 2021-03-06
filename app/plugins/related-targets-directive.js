angular.module('plugins')
    .directive('relatedTargets', ['$log', 'cttvAPIservice', function ($log, cttvAPIservice) {
        "use strict";

        return {
            restrict: 'E',
            templateUrl: 'plugins/related-targets.html',
            scope: {
                target: '='
            },
            link: function (scope, element, attrs) {
                cttvAPIservice.getTargetRelation({
                    id: scope.target.id,
                })
                .then(
                    // success
                    function (resp) {
                        // $log.log("getTargetRelation");
                        // $log.log(resp);
                        scope.relations = resp.body.data.slice(1, 20);
                    },

                    // error handler
                    cttvAPIservice.defaultErrorHandler
                );

            }
        };
    }]);
