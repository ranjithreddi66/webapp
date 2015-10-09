
/* Services */

angular.module('cttvServices').



    /**
     * The Config service.
     * This stores global config variables for the font end
     */
    factory('cttvConfig', ['cttvConsts', function(cttvConsts) {
        'use strict';

        // local handle to the dbs list in the consts service
        var dbs = cttvConsts.dbs;

        var config = {

            // flag to hide/show first column (with public/private styling) in evidence tables
            show_access_level : false,

            // evidence sources used in the evidence page tables:
            // if multiple sources are needed (e.g. for somatic mutation table), specify these in an array
            evidence_sources : {
                genetic_association : {
                    common : [dbs.GWAS],
                    rare : [dbs.UNIPROT, dbs.EVA, dbs.UNIPROT_LITERATURE]
                },
                somatic_mutation : [dbs.CANCER_GENE_CENSUS, dbs.EVA_SOMATIC],
                known_drug : [dbs.CHEMBL],
                rna_expression : [dbs.EXPRESSION_ATLAS],
                pathway : [dbs.REACTOME],
                animal_model : [dbs.PHENODIGM],
                literature : [dbs.DISGENET, dbs.EPMC]
            }
        };


        return config;
    }]);