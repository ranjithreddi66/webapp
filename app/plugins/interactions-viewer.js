angular.module('plugins')
    .directive('interactionsViewer', ['$log', '$timeout', '$http', '$q', 'cttvAPIservice', 'omnipathdbSources', function ($log, $timeout, $http, $q, cttvAPIservice, omnipathdbSources) {

        function getNames(bestHits) {
            var mapNames = {};
            for (var i = 0; i < bestHits.length; i++) {
                var bestHit = bestHits[i];

                // TODO: There are cases where the bestHitSearch doesn't give anything back. For now, we filter them out
                if (bestHit.data) {
                    mapNames[bestHit.q] = {
                        approved_symbol: bestHit.data.approved_symbol,
                        association_counts: bestHit.data.association_counts,
                        uniprot_id: bestHit.q,
                        ensembl_id: bestHit.data.ensembl_gene_id
                    };
                }
            }
            return mapNames;
        }

        return {
            restrict: 'E',
            template: '<!-- hint --><div>Interaction viewer here -- no call to iv</div>' +
            // '<div>' +
            // '    <p class="cttv-section-intro">Summary of interactions for {{target.approved_symbol}} based on <a target=_blank href="http://omnipathdb.org/">OmniPath DB</a> data. When 2 targets are selected details on the interaction are shown.</p>' +
            // '</div>' +
            '<interactors-star-plot interactors="interactors" categories="categories" selected="target.approved_symbol"></interactors-star-plot>',
            // '' ,
            scope: {
                target: '=',
                width: '='
            },
            link: function (scope, elem, attrs) {
                var uniprotId = scope.target.uniprot_id;
                var url = "/proxy/www.omnipathdb.org/interactions/" + uniprotId + '?format=json';
                $http.get(url)
                    .then(function (resp) {
                        var interactors = {};

                        for (var i = 0; i < resp.data.length; i++) {
                            var interaction = resp.data[i];
                            interactors[interaction.target] = true;
                            interactors[interaction.source] = true;
                        }

                        var uniprotIds = Object.keys(interactors);

                        // Return a promise with UniprotIds to get sync flow
                        return $q(function (resolve) {
                            resolve(uniprotIds);
                        });

                    })
                    .then(function (uniprotIds) {
                        // If there are not interactors, we don't make any other call
                        if (!uniprotIds.length) {
                            scope.interactors = {};
                            return;
                        }

                        var promises = [];

                        // Promise -- second pass in omnipathdb...
                        var url = "/proxy/www.omnipathdb.org/interactions/" + uniprotIds.join(',') + '?format=json&fields=sources';
                        promises.push($http.get(url));

                        // Promise -- get the names from bestHitSearch
                        var opts = {
                            q: uniprotIds,
                            filter: 'target',
                            fields: ['approved_symbol', 'association_counts', 'ensembl_gene_id']
                        };

                        var queryObject = {
                            method: "POST",
                            params: opts,
                            trackCall: false
                        };

                        promises.push(cttvAPIservice.getBestHitSearch(queryObject));

                        // Both promises run in parallel
                        $q.all(promises)
                            .then(function (resps) {

                                console.log('resps ok...');
                                console.log(resps);

                                // Get the mappings between uniprot ids and gene symbols
                                var mapNames = getNames(resps[1].body.data);

                                console.log('mapNames ok...');
                                console.log(mapNames);


                                // parse the omnipath data
                                var odbData = resps[0].data;

                                var interactors = {};
                                var sourceCategories = {};
                                var missingSources = {};

                                console.log('before looping on the data...');

                                // for (var i = 0; i < odbData.length; i++) {
                                //     var link = odbData[i];
                                //     console.log('one link retrieved...' + i + ' of ' + odbData.length);
                                //     var sourceObj = mapNames[link.source];
                                //     var targetObj = mapNames[link.target];
                                //
                                //     var source, target;
                                //     if (sourceObj) {
                                //         source = sourceObj.approved_symbol;
                                //     }
                                //     if (targetObj) {
                                //         target = targetObj.approved_symbol;
                                //     }
                                //
                                //     var provenance = link.sources;
                                //
                                //     if ((source && target) && (source !== target)) {
                                //         if (!interactors[source]) {
                                //             interactors[source] = {
                                //                 label: source,
                                //                 interactsWith: {}
                                //             }
                                //         }
                                //         if (!interactors[target]) {
                                //             interactors[target] = {
                                //                 label: target,
                                //                 interactsWith: {}
                                //             }
                                //         }
                                //         if (!interactors[source].interactsWith[target]) {
                                //             interactors[source].interactsWith[target] = {
                                //                 label: target,
                                //                 provenance: []
                                //             }
                                //         }
                                //         if (!interactors[target].interactsWith[source]) {
                                //             interactors[target].interactsWith[source] = {
                                //                 label: source,
                                //                 provenance: []
                                //             }
                                //         }
                                //
                                //         var sourceCat = 'sourceCat';
                                //         sourceCategories[sourceCat] = 0;
                                //
                                //         for (var f = 0; f < provenance.length; f++) {
                                //             console.log('setting prov');
                                //             var prov = provenance[f];
                                //             console.log('starting provenance analysis... ' + prov);
                                //
                                //
                                //             // var sourceCat = omnipathdbSources[prov];
                                //             // console.log('sourceCat: ' + sourceCat);
                                //             // if (!sourceCat) {
                                //             //     console.log('no sourceCat -- ' + missingSources[prov]);
                                //             //     if (!missingSources[prov]) {
                                //             //         console.log('no missingSources[prov]');
                                //             //         missingSources[prov] = 0;
                                //             //     }
                                //             //     console.log('adding missingSources[prov]++');
                                //             //     missingSources[prov]++;
                                //             //     console.log('calling continue');
                                //             //     continue;
                                //             // }
                                //
                                //             // if (!sourceCategories[sourceCat]) {
                                //             //     console.log('no sourceCategories[sourceCat]');
                                //             //     sourceCategories[sourceCat] = 0;
                                //             // }
                                //             // sources[prov]++;
                                //             sourceCategories[sourceCat]++;
                                //             // interactors[source].interactsWith[target].provenance.push({
                                //             //     id: prov,
                                //             //     label: prov,
                                //             //     source: prov,
                                //             //     category: sourceCat
                                //             // });
                                //             // interactors[target].interactsWith[source].provenance.push({
                                //             //     id: prov,
                                //             //     label: prov,
                                //             //     source: prov,
                                //             //     category: sourceCat
                                //             // });
                                //             console.log('provenance loop ok');
                                //         }
                                //         // interactors[source].interactsWith[target].provenance = provenance;
                                //     }
                                // }

                                console.log('finished looping over the data ok...');

                                // Reporting in the console the omnipath sources that haven't been assigned a category yet. See omnipathdbSources and omnipathdbCategories
                                if (Object.keys(missingSources).length) {
                                    $log.warn('These omnipath sources does not have a category described and have been skipped');
                                    $log.warn(missingSources);
                                }

                                console.log('reported all missing sources ok...');

                                scope.interactors = interactors;
                                scope.categories = sourceCategories;

                                console.log('the end ok...');
                            });
                    });
            }
        }
    }]);
