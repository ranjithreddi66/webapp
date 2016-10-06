
    /* Controllers */

    angular.module('cttvControllers')

    /**
     * GeneDiseaseCtrl
     * Controller for the Gene <-> Disease page
     * It loads the evidence for the given target <-> disease pair
     */
    .controller('TargetDiseaseCtrl', ['$scope', '$location', '$log', 'cttvAPIservice', 'cttvUtils', 'cttvDictionary', 'cttvConsts', 'cttvConfig', 'clearUnderscoresFilter', 'upperCaseFirstFilter', '$uibModal', '$compile', '$http', '$q', '$timeout', '$analytics', 'cttvLocationState', '$anchorScroll', '$rootScope', function ($scope, $location, $log, cttvAPIservice, cttvUtils, cttvDictionary, cttvConsts, cttvConfig, clearUnderscores, upperCaseFirst, $uibModal, $compile, $http, $q, $timeout, $analytics, cttvLocationState, $anchorScroll, $rootScope) {
        'use strict';
        $log.log('TargetDiseaseCtrl()');

		cttvLocationState.init();   // does nothing, but ensures the cttvLocationState service is instantiated and ready
        cttvUtils.clearErrors();

        var checkPath = cttvUtils.checkPath;

        var searchObj = cttvUtils.search.translateKeys($location.search());

        // var dbs = cttvConsts.dbs;
        var datatypes = cttvConsts.datatypes;

        //
        var accessLevelPrivate = "<span class='cttv-access-private' title='private data'></span>"; //"<span class='fa fa-users' title='private data'>G</span>";
        var accessLevelPublic = "<span class='cttv-access-public' title='public data'></span>"; //"<span class='fa fa-users' title='public data'>P</span>";
        
        $scope.apiData = {"from": 0, "facets": {"journal": {"buckets": []}, "pub_date": {"buckets": [], "sum_other_doc_count": 0, "doc_count_error_upper_bound": 0}, "abstract": {"buckets": [{"bg_count": 20, "score": 9931.67400548697, "cluster_terms": {"buckets": [{"bg_count": 20, "score": 4912.4, "key": "cox", "doc_count": 17}, {"bg_count": 18, "score": 3191.717416378315, "key": "cyclooxygenas", "doc_count": 13}, {"bg_count": 51, "score": 1925.8235294117646, "key": "2", "doc_count": 17}, {"bg_count": 21, "score": 1311.0059317844784, "key": "inhibitor", "doc_count": 9}, {"bg_count": 7, "score": 1214.0904597132972, "key": "nsaid", "doc_count": 5}], "doc_count": 17}, "key": "cox", "doc_count": 17}, {"bg_count": 18, "score": 8591.402606310014, "cluster_terms": {"buckets": [{"bg_count": 18, "score": 5458.333333333333, "key": "cyclooxygenas", "doc_count": 15}, {"bg_count": 20, "score": 3689.6426666666666, "key": "cox", "doc_count": 13}, {"bg_count": 51, "score": 1925.8235294117646, "key": "2", "doc_count": 15}, {"bg_count": 4, "score": 982.4800000000002, "key": "carcinogenesi", "doc_count": 3}, {"bg_count": 12, "score": 909.5555555555554, "key": "prostaglandin", "doc_count": 5}], "doc_count": 15}, "key": "cyclooxygenas", "doc_count": 15}, {"bg_count": 51, "score": 6522.334597487828, "cluster_terms": {"buckets": [{"bg_count": 20, "score": 2933.0549586776856, "key": "cox", "doc_count": 17}, {"bg_count": 18, "score": 2537.231404958677, "key": "cyclooxygenas", "doc_count": 15}, {"bg_count": 51, "score": 1925.8235294117646, "key": "2", "doc_count": 22}, {"bg_count": 12, "score": 1082.4793388429753, "key": "prostaglandin", "doc_count": 8}, {"bg_count": 4, "score": 811.9504132231406, "key": "cox2", "doc_count": 4}], "doc_count": 22}, "key": "2", "doc_count": 22}, {"bg_count": 74, "score": 3714.700626552478, "cluster_terms": {"buckets": [{"bg_count": 20, "score": 2406.8659999999995, "key": "cox", "doc_count": 14}, {"bg_count": 18, "score": 1650.8983333333333, "key": "cyclooxygenas", "doc_count": 11}, {"bg_count": 51, "score": 1391.2799999999997, "key": "2", "doc_count": 17}, {"bg_count": 74, "score": 1326.9459459459458, "key": "us", "doc_count": 20}, {"bg_count": 7, "score": 1263.1457142857141, "key": "nsaid", "doc_count": 6}], "doc_count": 20}, "key": "us", "doc_count": 20}, {"bg_count": 12, "score": 3665.605852766346, "cluster_terms": {"buckets": [{"bg_count": 12, "score": 8188.0, "key": "prostaglandin", "doc_count": 8}, {"bg_count": 4, "score": 3454.359375, "key": "arachidon", "doc_count": 3}, {"bg_count": 20, "score": 2763.0374999999995, "key": "cox", "doc_count": 6}, {"bg_count": 18, "score": 2131.927083333333, "key": "cyclooxygenas", "doc_count": 5}, {"bg_count": 7, "score": 1973.7589285714287, "key": "convers", "doc_count": 3}], "doc_count": 8}, "key": "prostaglandin", "doc_count": 8}, {"bg_count": 7, "score": 3534.754850088183, "cluster_terms": {"buckets": [{"bg_count": 7, "score": 14037.285714285716, "key": "nsaid", "doc_count": 6}, {"bg_count": 3, "score": 8188.5, "key": "advers", "doc_count": 3}, {"bg_count": 5, "score": 4912.9, "key": "trial", "doc_count": 3}, {"bg_count": 5, "score": 4912.9, "key": "search", "doc_count": 3}, {"bg_count": 6, "score": 4094.0, "key": "random", "doc_count": 3}], "doc_count": 6}, "key": "nsaid", "doc_count": 6}, {"bg_count": 138, "score": 3112.102393590585, "cluster_terms": {"buckets": [{"bg_count": 20, "score": 2011.88864, "key": "cox", "doc_count": 16}, {"bg_count": 18, "score": 1711.4869333333336, "key": "cyclooxygenas", "doc_count": 14}, {"bg_count": 51, "score": 1358.726682352941, "key": "2", "doc_count": 21}, {"bg_count": 7, "score": 808.3652571428571, "key": "nsaid", "doc_count": 6}, {"bg_count": 74, "score": 766.2615783783783, "key": "us", "doc_count": 19}], "doc_count": 25}, "key": "bowel", "doc_count": 25}, {"bg_count": 146, "score": 2941.5254993705016, "cluster_terms": {"buckets": [{"bg_count": 20, "score": 2011.88864, "key": "cox", "doc_count": 16}, {"bg_count": 18, "score": 1711.4869333333336, "key": "cyclooxygenas", "doc_count": 14}, {"bg_count": 51, "score": 1358.726682352941, "key": "2", "doc_count": 21}, {"bg_count": 7, "score": 808.3652571428571, "key": "nsaid", "doc_count": 6}, {"bg_count": 74, "score": 766.2615783783783, "key": "us", "doc_count": 19}], "doc_count": 25}, "key": "inflammatori", "doc_count": 25}, {"bg_count": 151, "score": 2844.093332969958, "cluster_terms": {"buckets": [{"bg_count": 20, "score": 2011.88864, "key": "cox", "doc_count": 16}, {"bg_count": 18, "score": 1711.4869333333336, "key": "cyclooxygenas", "doc_count": 14}, {"bg_count": 51, "score": 1358.726682352941, "key": "2", "doc_count": 21}, {"bg_count": 7, "score": 808.3652571428571, "key": "nsaid", "doc_count": 6}, {"bg_count": 74, "score": 766.2615783783783, "key": "us", "doc_count": 19}], "doc_count": 25}, "key": "diseas", "doc_count": 25}, {"bg_count": 12, "score": 2806.4470736168264, "cluster_terms": {"buckets": [{"bg_count": 12, "score": 8188.0, "key": "agent", "doc_count": 7}, {"bg_count": 20, "score": 2506.122448979592, "key": "cox", "doc_count": 5}, {"bg_count": 8, "score": 2255.7244897959185, "key": "colorect", "doc_count": 3}, {"bg_count": 15, "score": 2138.5959183673467, "key": "efficaci", "doc_count": 4}], "doc_count": 7}, "key": "agent", "doc_count": 7}], "doc_count": 27}}, "took": 756, "therapeutic_areas": [], "total": 27, "data": [{"literature": {"title": "Role of selective cyclooxygenase-2 inhibitors in exacerbation of inflammatory bowel disease: A systematic review and meta-analysis.", "journal": {"printPublicationDate": "2008-06-01", "journal": {"medlineAbbreviation": "Curr Ther Res Clin Exp", "isoabbreviation": "Curr Ther Res Clin Exp", "title": "Current therapeutic research, clinical and experimental", "issn": "0011-393X", "nlmid": "0372621", "essn": "1879-0313"}, "monthOfPublication": 6, "volume": "69", "yearOfPublication": 2008, "journalIssueId": 2144641, "issue": "3", "dateOfPublication": "2008 Jun"}, "abstract_lemmas": [{"count": 1, "value": "tolerability"}, {"count": 1, "value": "impact"}, {"count": 5, "value": "group"}, {"count": 3, "value": "ibd."}, {"count": 3, "value": "treatment"}, {"count": 1, "value": "criterion"}, {"count": 1, "value": "1980-july"}, {"count": 3, "value": "risk"}, {"count": 1, "value": "food"}, {"count": 1, "value": "bid"}, {"count": 2, "value": "cyclooxygenase"}, {"count": 1, "value": "1966-july"}, {"count": 3, "value": "aes"}, {"count": 1, "value": "objective"}, {"count": 3, "value": "celecoxib"}, {"count": 1, "value": "background"}, {"count": 1, "value": "difference"}, {"count": 1, "value": "crohn"}, {"count": 3, "value": "term"}, {"count": 1, "value": "medline"}, {"count": 1, "value": "cochrane"}, {"count": 1, "value": "benefit"}, {"count": 1, "value": "library"}, {"count": 3, "value": "rate"}, {"count": 2, "value": "meta"}, {"count": 1, "value": "design"}, {"count": 2, "value": "result"}, {"count": 3, "value": "rr"}, {"count": 1, "value": "rofecoxib"}, {"count": 1, "value": "review"}, {"count": 1, "value": "valdecoxib"}, {"count": 1, "value": "size"}, {"count": 1, "value": "issue"}, {"count": 1, "value": "method"}, {"count": 1, "value": "co."}, {"count": 6, "value": "patient"}, {"count": 3, "value": "search"}, {"count": 12, "value": "inhibitor"}, {"count": 6, "value": "exacerbation"}, {"count": 1, "value": "pfizer"}, {"count": 3, "value": "study"}, {"count": 1, "value": "title"}, {"count": 2, "value": "drug"}, {"count": 5, "value": "trial"}, {"count": 9, "value": "placebo"}, {"count": 3, "value": "ci"}, {"count": 2, "value": "etoricoxib"}, {"count": 1, "value": "quality"}, {"count": 1, "value": "intervention"}, {"count": 1, "value": "pharmaceutical"}, {"count": 3, "value": "use"}, {"count": 2, "value": "publication"}, {"count": 1, "value": "extraction"}, {"count": 1, "value": "pharmaceuticals"}, {"count": 1, "value": "form"}, {"count": 3, "value": "bowel"}, {"count": 1, "value": "cox)-2"}, {"count": 1, "value": "colitis"}, {"count": 1, "value": "population"}, {"count": 1, "value": "characteristic"}, {"count": 5, "value": "ibd"}, {"count": 1, "value": "aim"}, {"count": 1, "value": "record"}, {"count": 1, "value": "merck"}, {"count": 1, "value": "outcome"}, {"count": 1, "value": "dosage"}, {"count": 1, "value": "abstract"}, {"count": 1, "value": "mg/d"}, {"count": 1, "value": "sample"}, {"count": 1, "value": "file"}, {"count": 1, "value": "embase"}, {"count": 1, "value": "relapse"}, {"count": 1, "value": "corporation"}, {"count": 1, "value": "administration"}, {"count": 1, "value": "methodology"}, {"count": 1, "value": "role"}, {"count": 1, "value": "finding"}, {"count": 1, "value": "conclusion"}, {"count": 1, "value": "nsaid"}, {"count": 1, "value": "effect"}, {"count": 8, "value": "cox-2"}, {"count": 4, "value": "data"}, {"count": 1, "value": "lumiracoxib"}, {"count": 4, "value": "disease"}, {"count": 4, "value": "analysis"}, {"count": 1, "value": "novartis"}, {"count": 1, "value": "inclusion/exclusion"}, {"count": 1, "value": "inc."}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/24692797"}], "year": 2008, "abstract": "BACKGROUND: In the general population, selective cyclooxygenase (COX)-2 inhibitors have been associated with fewer gastrointestinal adverse effects (AEs) than NSAIDs, but whether they are associated with exacerbations in patients with inflammatory bowel disease (IBD) remains controversial. OBJECTIVE: The aim of this study was to review published and unpublished findings to determine whether the use of COX-2 inhibitors increased the risk for IBD exacerbations relative to placebo in the treatment of IBD. METHODS: A systematic search of MEDLINE (1966-July 2007), EMBASE (1980-July 2007), the Cochrane Library (2007 Issue 4), US Food and Drug Administration records, and data on file at Novartis Pharmaceuticals Corporation, Pfizer US Pharmaceutical Group, and Merck & Co., Inc., using the search terms celecoxib, rofecoxib, valdecoxib, etoricoxib, lumiracoxib, cyclooxygenase 2 inhibitor, Crohn's disease, ulcerative colitis, and inflammatory bowel disease, was performed to identify randomized, placebo-controlled clinical trials of 5 COX-2 inhibitors in patients with IBD. The publications were fully reviewed for quality. Data on trial design, patient characteristics, intervention drugs, dosages, and outcomes were collected using a predetermined data-extraction form. A meta-analysis was performed based on the publications that met the inclusion/exclusion criteria. RESULTS: Of 588 studies identified in the electronic search, 574 were excluded after screening the titles and abstracts. Fourteen related to the use of COX-2 inhibitors in patients with IBD were reviewed. Two randomized, controlled trials comparing COX-2 inhibitors with placebo were identified. In the first trial, 82 patients were randomized to receive etoricoxib (60-120 mg/d) and 77 to receive placebo. The exacerbation rates were 10.5% (8/76) in the active-treatment group and 11.4% (8/70) in the placebo group (relative risk [RR], 0.92; 95% CI, 0.37-2.32). In the second trial, 112 patients were treated with celecoxib (200 mg BID) and 110 received placebo. The exacerbation rates were 3.7% (4/107) in the celecoxib group and 2.7% (3/110) in the placebo group (RR, 0.73; 95% CI, 0.17-3.18). Of these patients, 5 were lost to follow-up because of AEs. In the meta-analysis comparing COX-2 inhibitors and placebo, the RR was 0.86 (95% CI, 0.39-1.88). No statistically significant differences in IBD relapse rates were found between COX-2 inhibitors and placebo. CONCLUSIONS: The results from this meta-analysis suggest that insufficient data were available to determine the impact of COX-2 inhibitors on IBD exacerbations. The relatively smaller risk for AEs makes the short-term use of COX-2 inhibitors potentially attractive, but the long-term benefits remain unclear. Further studies with sound methodology and large sample sizes are needed to evaluate the tolerability of COX-2 inhibitors in the treatment of IBD."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/24692797", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/24692797", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/24692797", "mined_sentences": [{"text": "Role of selective cyclooxygenase-2 inhibitors in exacerbation of inflammatory bowel disease: A systematic review and meta-analysis.", "section": "title", "t_start": 18, "d_end": 90, "d_start": 65, "t_end": 33}, {"text": "The aim of this study was to review published and unpublished findings to determine whether the use of COX-2 inhibitors increased the risk for IBD exacerbations relative to placebo in the treatment of IBD.", "section": "abstract", "t_start": 103, "d_end": 145, "d_start": 143, "t_end": 107}, {"text": "A systematic search of MEDLINE (1966-July 2007), EMBASE (1980-July 2007), the Cochrane Library (2007 Issue 4), US Food and Drug Administration records, and data on file at Novartis Pharmaceuticals Corporation, Pfizer US Pharmaceutical Group, and Merck & Co., Inc., using the search terms celecoxib, rofecoxib, valdecoxib, etoricoxib, lumiracoxib, cyclooxygenase 2 inhibitor, Crohn's disease, ulcerative colitis, and inflammatory bowel disease, was performed to identify randomized, placebo-controlled clinical trials of 5 COX-2 inhibitors in patients with IBD.", "section": "abstract", "t_start": 347, "d_end": 558, "d_start": 556, "t_end": 362}, {"text": "Fourteen related to the use of COX-2 inhibitors in patients with IBD were reviewed.", "section": "abstract", "t_start": 31, "d_end": 67, "d_start": 65, "t_end": 35}, {"text": "No statistically significant differences in IBD relapse rates were found between COX-2 inhibitors and placebo.", "section": "abstract", "t_start": 81, "d_end": 46, "d_start": 44, "t_end": 85}, {"text": "The results from this meta-analysis suggest that insufficient data were available to determine the impact of COX-2 inhibitors on IBD exacerbations.", "section": "abstract", "t_start": 109, "d_end": 131, "d_start": 129, "t_end": 113}, {"text": "Further studies with sound methodology and large sample sizes are needed to evaluate the tolerability of COX-2 inhibitors in the treatment of IBD.", "section": "abstract", "t_start": 105, "d_end": 144, "d_start": 142, "t_end": 109}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 33.8}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2008-06-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.33799999999999997}, "type": "literature", "id": "0617f3ba73e25361beff74956668b786"}, {"literature": {"title": "Haplotype of prostaglandin synthase 2/cyclooxygenase 2 is involved in the susceptibility to inflammatory bowel disease.", "journal": {"printPublicationDate": "2005-10-01", "journal": {"medlineAbbreviation": "World J Gastroenterol", "isoabbreviation": "World J. Gastroenterol.", "title": "World journal of gastroenterology", "issn": "1007-9327", "nlmid": "100883448", "essn": "2219-2840"}, "monthOfPublication": 10, "volume": "11", "yearOfPublication": 2005, "journalIssueId": 1268025, "issue": "38", "dateOfPublication": "2005 Oct"}, "abstract_lemmas": [{"count": 1, "value": "2/cyclooxygenase"}, {"count": 6, "value": "ptgs2"}, {"count": 1, "value": "ci"}, {"count": 1, "value": "invader"}, {"count": 1, "value": "cox2"}, {"count": 4, "value": "haplotype"}, {"count": 1, "value": "individual"}, {"count": 1, "value": "multiplex"}, {"count": 1, "value": "laboratory"}, {"count": 1, "value": "association"}, {"count": 1, "value": "confidence"}, {"count": 1, "value": "dna"}, {"count": 1, "value": "chromatography"}, {"count": 1, "value": "3.5%).our"}, {"count": 1, "value": "pcr"}, {"count": 2, "value": "data"}, {"count": 2, "value": "prostaglandin"}, {"count": 1, "value": "production"}, {"count": 1, "value": "inflammation"}, {"count": 2, "value": "factor"}, {"count": 1, "value": "performance"}, {"count": 1, "value": "method"}, {"count": 1, "value": "screening"}, {"count": 2, "value": "assay"}, {"count": 4, "value": "patient"}, {"count": 1, "value": "risk"}, {"count": 1, "value": "exonuclease"}, {"count": 2, "value": "polymorphism"}, {"count": 1, "value": "ibd."}, {"count": 2, "value": "bowel"}, {"count": 1, "value": "variant"}, {"count": 1, "value": "colitis"}, {"count": 1, "value": "control"}, {"count": 2, "value": "allele"}, {"count": 1, "value": "sequencing"}, {"count": 1, "value": "ratio"}, {"count": 1, "value": "segment"}, {"count": 1, "value": "response"}, {"count": 1, "value": "symptom"}, {"count": 2, "value": "population"}, {"count": 2, "value": "susceptibility"}, {"count": 1, "value": "pre"}, {"count": 1, "value": "g/h"}, {"count": 1, "value": "liquid"}, {"count": 1, "value": "odds"}, {"count": 1, "value": "interval"}, {"count": 5, "value": "ibd"}, {"count": 3, "value": "disease"}, {"count": 1, "value": "drug"}, {"count": 2, "value": "synthase"}, {"count": 1, "value": "5209g"}, {"count": 1, "value": "activity"}, {"count": 1, "value": "gene"}, {"count": 1, "value": "taqman"}, {"count": 1, "value": "crohn"}, {"count": 1, "value": "8473t"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/16273614"}], "year": 2005, "abstract": "Prostaglandin G/H synthase 2 (PTGS2 or COX2) is one of the key factors in the cellular response to inflammation. PTGS2 is expressed in the affected intestinal segments of patients with inflammatory bowel diseases (IBD). In IBD patients, non-steroidal anti-inflammatory drugs, which have been shown to reduce both the production and activity of PTGS2, may activate IBD and aggravate the symptoms. We aimed at examining genetic variants of PTGS2 that may be risk factors for IBD.We have genotyped 291 individuals diagnosed with IBD and 367 controls from the Dutch population for the five most frequent polymorphisms of the PTGS2 gene. Clinical data were collected on all patients. DNA was extracted via normal laboratory methods. Genotyping was carried out using multiplex PCR followed by the Invader Assay and the 5' exonuclease assay (TaqMan). New polymorphism screening was performed by pre-screening with denaturing high-performance liquid chromatography, followed by fluorescent sequencing.Allele 5209G was weakly associated with Crohn's disease (odds ratio (OR) 1.63, 95% confidence interval (CI) 1.03-2.57), and allele 8473T with ulcerative colitis (OR 1.50, 95%CI 1.00-2.27). The haplotype including both alleles showed a strong association with IBD (OR 13.15, 95%CI 3.17-116.15). This haplotype, while rare (-0.3%) in the general population, is found more frequently in the patients (3.5%).Our data suggest that this haplotype of PTGS2 contributes to the susceptibility of IBD."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/16273614", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/16273614", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/16273614", "mined_sentences": [{"text": "Haplotype of prostaglandin synthase 2/cyclooxygenase 2 is involved in the susceptibility to inflammatory bowel disease.", "section": "title", "t_start": 38, "d_end": 117, "d_start": 92, "t_end": 53}, {"text": "PTGS2 is expressed in the affected intestinal segments of patients with inflammatory bowel diseases (IBD).", "section": "abstract", "t_start": 0, "d_end": 103, "d_start": 101, "t_end": 4}, {"text": "In IBD patients, non-steroidal anti-inflammatory drugs, which have been shown to reduce both the production and activity of PTGS2, may activate IBD and aggravate the symptoms.", "section": "abstract", "t_start": 124, "d_end": 5, "d_start": 3, "t_end": 128}, {"text": "We aimed at examining genetic variants of PTGS2 that may be risk factors for IBD.", "section": "abstract", "t_start": 42, "d_end": 79, "d_start": 77, "t_end": 46}, {"text": "We have genotyped 291 individuals diagnosed with IBD and 367 controls from the Dutch population for the five most frequent polymorphisms of the PTGS2 gene.", "section": "abstract", "t_start": 144, "d_end": 51, "d_start": 49, "t_end": 148}, {"text": "Our data suggest that this haplotype of PTGS2 contributes to the susceptibility of IBD.", "section": "abstract", "t_start": 40, "d_end": 85, "d_start": 83, "t_end": 44}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 30.6}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2005-10-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.306}, "type": "literature", "id": "270edba80e39ba504378d12f967d987b"}, {"literature": {"title": "Non Steroidal Anti-Inflammatory Drugs and Inflammatory Bowel Disease.", "journal": {"printPublicationDate": "2010-04-01", "journal": {"issn": "1424-8247", "medlineAbbreviation": "Pharmaceuticals (Basel, Switzerland)", "title": "Pharmaceuticals (Basel, Switzerland)"}, "monthOfPublication": 4, "volume": "3", "yearOfPublication": 2010, "journalIssueId": 1749409, "issue": "4", "dateOfPublication": "2010 Apr"}, "abstract_lemmas": [{"count": 4, "value": "inflammatory"}, {"count": 1, "value": "process"}, {"count": 1, "value": "evidence"}, {"count": 1, "value": "medication"}, {"count": 2, "value": "anti"}, {"count": 1, "value": "article"}, {"count": 1, "value": "association"}, {"count": 1, "value": "gi"}, {"count": 1, "value": "concern"}, {"count": 1, "value": "concept"}, {"count": 3, "value": "use"}, {"count": 1, "value": "relapse"}, {"count": 1, "value": "pathogenesis"}, {"count": 1, "value": "onset"}, {"count": 1, "value": "immune"}, {"count": 1, "value": "treatment"}, {"count": 2, "value": "factor"}, {"count": 1, "value": "injury"}, {"count": 1, "value": "development"}, {"count": 2, "value": "non"}, {"count": 1, "value": "diseases"}, {"count": 1, "value": "relationship"}, {"count": 1, "value": "drugs"}, {"count": 2, "value": "bowel"}, {"count": 1, "value": "component"}, {"count": 1, "value": "tract"}, {"count": 1, "value": "smoking"}, {"count": 1, "value": "condition"}, {"count": 4, "value": "ibd"}, {"count": 2, "value": "disease"}, {"count": 1, "value": "drug"}, {"count": 2, "value": "steroidal"}, {"count": 1, "value": "mucosal"}, {"count": 4, "value": "nsaids"}, {"count": 1, "value": "nsaids."}, {"count": 1, "value": "toxicity"}, {"count": 1, "value": "disorder"}], "references": [{"lit_id": "http://europepmc.org/articles/PMC4034022"}], "year": 2010, "abstract": "Inflammatory Bowel Diseases (IBD) are an immune mediated chronic or relapsing disorders of the gastrointestinal (GI) tract. IBD is characterized by a chronic intestinal inflammatory process with various components contributing to the pathogenesis of the disease including environmental factors such as smoking or use of Non Steroidal Anti-Inflammatory Drugs (NSAIDS). NSAIDS are among the most commonly used medications for the treatment of various inflammatory conditions. The main factor limiting NSAIDS use is the concern for the development of gastrointestinal toxicity including mucosal injury. A possible association between the use of NSAIDS and the onset or relapse of IBD has been repeatedly suggested. This article will review the current concepts and evidence of the relationship between IBD and NSAIDS."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["IBD"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/articles/PMC4034022", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/articles/PMC4034022", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/articles/PMC4034022", "mined_sentences": [{"text": "It remains unclear whether NSAIDS and COX2 selective inhibitors indeed cause flares of IBD and whether COX2 inhibitors are safer than conventional NSAIDS.", "section": "conclusion_and_future_work", "t_start": 38, "d_end": 89, "d_start": 87, "t_end": 41}, {"text": "There is some evidence to suggest that short term usage of COX2 selective inhibitors is safe and beneficial in patients with IBD.", "section": "conclusion_and_future_work", "t_start": 59, "d_end": 127, "d_start": 125, "t_end": 62}, {"text": "Concomitant use of NSAIDS or COX2 inhibitors and steroids in patients with IBD warrants special consideration and careful monitoring due to the potentially increased cardiovascular and UGI toxicity, especially in older patients.", "section": "conclusion_and_future_work", "t_start": 29, "d_end": 77, "d_start": 75, "t_end": 32}, {"text": "Articles on the effect of NSAIDS and selective COX2 inhibitors on IBD.", "section": "table", "t_start": 47, "d_end": 68, "d_start": 66, "t_end": 50}, {"text": "COX2 inhibitors appear to be safe and beneficial in patients with IBD.", "section": "table", "t_start": 0, "d_end": 68, "d_start": 66, "t_end": 3}, {"text": "Insufficient data to determine the impact of COX2 inhibitors on IBD exacerbations.", "section": "table", "t_start": 45, "d_end": 66, "d_start": 64, "t_end": 48}, {"text": "Reduced prostaglandin production due to inhibition of COX1 and COX2, has been implicated in the early and frequent clinical relapse of IBD [15].", "section": "other", "t_start": 63, "d_end": 137, "d_start": 135, "t_end": 66}, {"text": "In areas of active inflammation due to IBD, COX2 enzyme can be detected in apical epithelial cells of the inflamed mucosa [4,17].", "section": "other", "t_start": 44, "d_end": 41, "d_start": 39, "t_end": 47}, {"text": "The expression of COX2 in the small intestinal and colonic mucosa was found to be higher in experimental colitis, to correlate with inflammatory activity in IBD and to have a beneficial effect on healing in experimental colitis [18,19].", "section": "other", "t_start": 18, "d_end": 159, "d_start": 157, "t_end": 21}, {"text": "The exact mechanism by which COX2 inhibitors induced relapse in IBD is uncertain.", "section": "other", "t_start": 29, "d_end": 66, "d_start": 64, "t_end": 32}, {"text": "Selective COX2 Inhibitors and IBD", "section": "other", "t_start": 10, "d_end": 32, "d_start": 30, "t_end": 13}, {"text": "To date, studies on the use of selective COX2 inhibitors in IBD have yielded mixed results.", "section": "other", "t_start": 41, "d_end": 62, "d_start": 60, "t_end": 44}, {"text": "In contrast, several case reports of exacerbations in patients with IBD receiving COX2 inhibitors have been reported [33,34].", "section": "other", "t_start": 82, "d_end": 70, "d_start": 68, "t_end": 85}, {"text": "Finally, a recent meta-analysis [35], on the use of COX2 inhibitors in IBD patients concluded that there is insufficient data to determine the impact of COX2 inhibitors on IBD exacerbations.", "section": "other", "t_start": 52, "d_end": 73, "d_start": 71, "t_end": 55}, {"text": "These mixed finding suggest that further evaluation of the use of COX2 selective inhibitors in patients with IBD is required. Table 2 summarizes studies on the effect of NSAIDS on IBD.", "section": "other", "t_start": 66, "d_end": 111, "d_start": 109, "t_end": 69}]}, "provenance_type": {"database": {"version": "2016-07-26", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 30}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2010-04-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.3}, "type": "literature", "id": "20400ee5c9cef015b404cb40a90d63b7"}, {"literature": {"title": "The spectrum of gastrointestinal toxicity and effect on disease activity of selective cyclooxygenase-2 inhibitors in patients with inflammatory bowel disease.", "journal": {"printPublicationDate": "2004-07-01", "journal": {"medlineAbbreviation": "Inflamm Bowel Dis", "isoabbreviation": "Inflamm. Bowel Dis.", "title": "Inflammatory bowel diseases", "issn": "1078-0998", "nlmid": "9508162", "essn": "1536-4844"}, "monthOfPublication": 7, "volume": "10", "yearOfPublication": 2004, "journalIssueId": 1180218, "issue": "4", "dateOfPublication": "2004 Jul"}, "abstract_lemmas": [{"count": 2, "value": "medication"}, {"count": 1, "value": "point"}, {"count": 1, "value": "spectrum"}, {"count": 1, "value": "cd"}, {"count": 1, "value": "clinic"}, {"count": 1, "value": "ulcer"}, {"count": 1, "value": "cyclooxygenase-2"}, {"count": 1, "value": "questionnaire"}, {"count": 1, "value": "ic"}, {"count": 3, "value": "gi"}, {"count": 2, "value": "use"}, {"count": 1, "value": "symptom"}, {"count": 1, "value": "ibd."}, {"count": 3, "value": "rofecoxib"}, {"count": 1, "value": "complication"}, {"count": 1, "value": "visit"}, {"count": 1, "value": "incidence"}, {"count": 1, "value": "safety"}, {"count": 2, "value": "treatment"}, {"count": 1, "value": "sinai"}, {"count": 1, "value": "week"}, {"count": 1, "value": "ileo"}, {"count": 8, "value": "patient"}, {"count": 1, "value": "cedars"}, {"count": 2, "value": "bowel"}, {"count": 1, "value": "time"}, {"count": 1, "value": "ulceration"}, {"count": 2, "value": "effect"}, {"count": 5, "value": "cox-2"}, {"count": 2, "value": "therapy"}, {"count": 3, "value": "celecoxib"}, {"count": 1, "value": "pain"}, {"count": 1, "value": "crohn"}, {"count": 2, "value": "colitis"}, {"count": 4, "value": "inhibitor"}, {"count": 1, "value": "center"}, {"count": 3, "value": "exacerbation"}, {"count": 1, "value": "flare"}, {"count": 1, "value": "age"}, {"count": 6, "value": "ibd"}, {"count": 7, "value": "disease"}, {"count": 2, "value": "activity"}, {"count": 2, "value": "toxicity"}, {"count": 1, "value": "resolution"}, {"count": 1, "value": "uc"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/15475742"}], "year": 2004, "abstract": "The safety and toxicity associated with the use of selective cyclooxygenase-2 (COX-2) inhibitors in patients with inflammatory bowel disease (IBD) has not been extensively studied. Thirty-three patients with IBD who were prescribed celecoxib or rofecoxib were identified from questionnaire during their clinic visit at the Cedars-Sinai IBD Center between 1999 and 2002. Twenty-six had Crohn's disease (CD), 6 had ulcerative colitis (UC), and 1 had indeterminate colitis (IC). Twenty-one received rofecoxib, 10 celecoxib, and 2 received both medications at different time points. Overall, 13 (39%) patients experienced disease exacerbation, 7 of which had received celecoxib and six rofecoxib. IBD exacerbation associated with COX-2 treatment did not correlate with age, disease activity, or use of immunosuppressive medications. All patients experienced flare-up of their underlying IBD within 6 weeks of initiating COX-2 therapy. Five of 13 (38%) patients had resolution of their symptoms after discontinuing the COX-2 inhibitor, but the remaining patients required additional medical therapy to control their disease. Six other patients (18%) experienced GI side effects not associated with their underlying IBD. Five developed abdominal pain, and one developed a duodenal ulcer and a circumferential ileo-colonic ulceration with GI bleeding. Treatment with COX-2 inhibitors is associated with a high incidence of exacerbation of the underlying IBD and GI-related complications."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/15475742", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/15475742", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/15475742", "mined_sentences": [{"text": "The spectrum of gastrointestinal toxicity and effect on disease activity of selective cyclooxygenase-2 inhibitors in patients with inflammatory bowel disease.", "section": "title", "t_start": 86, "d_end": 156, "d_start": 131, "t_end": 101}, {"text": "The safety and toxicity associated with the use of selective cyclooxygenase-2 (COX-2) inhibitors in patients with inflammatory bowel disease (IBD) has not been extensively studied.", "section": "abstract", "t_start": 79, "d_end": 144, "d_start": 142, "t_end": 83}, {"text": "IBD exacerbation associated with COX-2 treatment did not correlate with age, disease activity, or use of immunosuppressive medications.", "section": "abstract", "t_start": 33, "d_end": 2, "d_start": 0, "t_end": 37}, {"text": "All patients experienced flare-up of their underlying IBD within 6 weeks of initiating COX-2 therapy.", "section": "abstract", "t_start": 87, "d_end": 56, "d_start": 54, "t_end": 91}, {"text": "Treatment with COX-2 inhibitors is associated with a high incidence of exacerbation of the underlying IBD and GI-related complications.", "section": "abstract", "t_start": 15, "d_end": 104, "d_start": 102, "t_end": 19}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 27.2}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2004-07-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.272}, "type": "literature", "id": "6a9d4718a1f73a5f5e701040baa4eaf2"}, {"literature": {"title": "Reduced expression of aquaporins in human intestinal mucosa in early stage inflammatory bowel disease.", "journal": {"printPublicationDate": "2015-01-01", "journal": {"title": "Clinical and experimental gastroenterology", "medlineAbbreviation": "Clin Exp Gastroenterol", "isoabbreviation": "Clin Exp Gastroenterol", "nlmid": "101532800", "essn": "1178-7023"}, "monthOfPublication": 0, "volume": "8", "yearOfPublication": 2015, "journalIssueId": 2240474, "dateOfPublication": "2015 "}, "abstract_lemmas": [{"count": 2, "value": "aqp8"}, {"count": 1, "value": "chain"}, {"count": 1, "value": "aquaporins"}, {"count": 1, "value": "stool"}, {"count": 3, "value": "ileum"}, {"count": 2, "value": "mucosa"}, {"count": 1, "value": "evidence"}, {"count": 2, "value": "sample"}, {"count": 2, "value": "colon"}, {"count": 1, "value": "result"}, {"count": 2, "value": "human"}, {"count": 1, "value": "pain"}, {"count": 1, "value": "pathology"}, {"count": 1, "value": "acid"}, {"count": 1, "value": "data"}, {"count": 1, "value": "protein"}, {"count": 1, "value": "alignment"}, {"count": 1, "value": "amino"}, {"count": 1, "value": "erythrocyte"}, {"count": 1, "value": "aquaporin"}, {"count": 2, "value": "colitis"}, {"count": 4, "value": "aqps"}, {"count": 1, "value": "basis"}, {"count": 2, "value": "epithelium"}, {"count": 1, "value": "crypt"}, {"count": 1, "value": "hospital"}, {"count": 1, "value": "sequence"}, {"count": 1, "value": "diarrhea"}, {"count": 1, "value": "feature"}, {"count": 2, "value": "crohn"}, {"count": 1, "value": "cell"}, {"count": 1, "value": "inflammation"}, {"count": 2, "value": "reduction"}, {"count": 1, "value": "tract"}, {"count": 1, "value": "criterion"}, {"count": 1, "value": "structure"}, {"count": 1, "value": "objective"}, {"count": 1, "value": "messenger"}, {"count": 1, "value": "method"}, {"count": 1, "value": "channel"}, {"count": 1, "value": "conclusion"}, {"count": 1, "value": "function"}, {"count": 1, "value": "polarity"}, {"count": 1, "value": "loss"}, {"count": 6, "value": "patient"}, {"count": 1, "value": "aqp"}, {"count": 1, "value": "relationship"}, {"count": 1, "value": "aqp7"}, {"count": 1, "value": "pathophysiology"}, {"count": 3, "value": "bowel"}, {"count": 1, "value": "time"}, {"count": 2, "value": "biopsy"}, {"count": 1, "value": "infection"}, {"count": 1, "value": "water"}, {"count": 1, "value": "polymerase"}, {"count": 1, "value": "localization"}, {"count": 2, "value": "blood"}, {"count": 1, "value": "colonoscopy"}, {"count": 1, "value": "role"}, {"count": 1, "value": "segment"}, {"count": 1, "value": "day"}, {"count": 1, "value": "symptom"}, {"count": 1, "value": "stage"}, {"count": 2, "value": "immunofluorescence"}, {"count": 1, "value": "reaction"}, {"count": 1, "value": "rna"}, {"count": 3, "value": "aqp3"}, {"count": 1, "value": "barrier"}, {"count": 5, "value": "aqp1"}, {"count": 1, "value": "study"}, {"count": 4, "value": "level"}, {"count": 8, "value": "ibd"}, {"count": 4, "value": "disease"}, {"count": 2, "value": "microscopy"}, {"count": 1, "value": "aim"}, {"count": 1, "value": "mucosal"}, {"count": 5, "value": "mrna"}, {"count": 2, "value": "gut"}, {"count": 1, "value": "link"}, {"count": 1, "value": "homeostasis"}, {"count": 1, "value": "aquaglyceroporins"}, {"count": 5, "value": "expression"}, {"count": 1, "value": "surface"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/25624769"}], "year": 2015, "abstract": "OBJECTIVES: The aim of this study was to investigate the relationship between aquaporin (AQP) water channel expression and the pathological features of early untreated inflammatory bowel disease (IBD) in humans. METHODS: Patients suspected to have IBD on the basis of predefined symptoms, including abdominal pain, diarrhea, and/or blood in stool for more than 10 days, were examined at the local hospital. Colonoscopy with biopsies was performed and blood samples were taken. Patients who did not meet the diagnostic criteria for IBD and who displayed no evidence of infection or other pathology in the gut were included as symptomatic non-IBD controls. AQP1, 3, 4, 5, 7, 8, and 9 messenger RNA (mRNA) levels were quantified in biopsies from the distal ileum and colon by quantitative real-time polymerase chain reaction. Protein expression of selected AQPs was assessed by confocal microscopy. Through multiple alignments of the deduced amino acid sequences, the putative three-dimensional structures of AQP1, 3, 7, and 8 were modeled. RESULTS: AQP1, 3, 7, and 8 mRNAs were detected in all parts of the intestinal mucosa. Notably, AQP1 and AQP3 mRNA levels were reduced in the ileum of patients with Crohn's disease, and AQP7 and AQP8 mRNA levels were reduced in the ileum and the colon of patients with ulcerative colitis. Immunofluorescence confocal microscopy showed localization of AQP3, 7, and 8 at the mucosal epithelium, whereas the expression of AQP1 was mainly confined to the endothelial cells and erythrocytes. The reduction in the level of AQP3, 7, and 8 mRNA was confirmed by immunofluorescence, which also indicated a reduction of apical immunolabeling for AQP8 in the colonic surface epithelium and crypts of the IBD samples. This could indicate loss of epithelial polarity in IBD, leading to disrupted barrier function. CONCLUSION: AQPs 1 and 8 and the aquaglyceroporins AQPs 3 and 7 are the AQPs predominantly expressed in the lower intestinal tract of humans. Their expression is significantly reduced in patients with IBD, and they are differentially expressed in specific bowel segments in patients with Crohn's disease and ulcerative colitis. The data present a link between gut inflammation and water/solute homeostasis, suggesting that AQPs may play a significant role in IBD pathophysiology."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["IBD"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/25624769", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/25624769", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/25624769", "mined_sentences": [{"text": "Cyclooxygenase 2 (COX-2) was expressed at a higher level in the colon of UC patients than in the colon of CD or non-IBD controls (P=0.02 and P=0.003 for right colon and P=0.003 and P<0.001 for left colon, respectively) as shown in Table S3 and Figure 5.", "section": "results", "t_start": 18, "d_end": 118, "d_start": 116, "t_end": 22}, {"text": "COX-2 was also expressed at a higher level in the ileum of UC patients than in the ileum of non-IBD patients (P=0.014).", "section": "results", "t_start": 0, "d_end": 98, "d_start": 96, "t_end": 4}, {"text": "Abbreviations: AQP, aquaporin; CD, Crohn\u2019s disease; COX-2, cyclooxygenase 2; IBD, inflammatory bowel disease; mRNA, messenger RNA; qRT-PCR, quantitative real-time polymerase chain reaction; UC, ulcerative colitis; vs, versus.", "section": "table", "t_start": 59, "d_end": 107, "d_start": 82, "t_end": 74}, {"text": "Abbreviations: AQP, aquaporin; CD, Crohn\u2019s disease; COX-2, cyclooxygenase 2, IBD, inflammatory bowel disease; IL, interleukin; mRNA, messenger RNA; qRT-PCR, quantitative real-time polymerase chain reaction; TNF-\u03b1, tumor necrosis factor-\u03b1; UC, ulcerative colitis; vs, versus.", "section": "table", "t_start": 59, "d_end": 107, "d_start": 82, "t_end": 74}]}, "provenance_type": {"database": {"version": "2016-07-26", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 20}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2015-01-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.2}, "type": "literature", "id": "f2ce4a4544cb81cd4fd8ac8607f1c064"}, {"literature": {"title": "[COX-2 inhibitors in inflammatory bowel disease: friends or foes?].", "journal": {"printPublicationDate": "2007-12-01", "journal": {"title": "The Korean journal of gastroenterology = Taehan Sohwagi Hakhoe chi", "issn": "1598-9992", "isoabbreviation": "Korean J Gastroenterol", "medlineAbbreviation": "Korean J Gastroenterol", "nlmid": "101189416"}, "monthOfPublication": 12, "volume": "50", "yearOfPublication": 2007, "journalIssueId": 1497019, "issue": "6", "dateOfPublication": "2007 Dec"}, "abstract_lemmas": [{"count": 1, "value": "chemoprevention"}, {"count": 2, "value": "cancer"}, {"count": 2, "value": "colorectal"}, {"count": 2, "value": "growth"}, {"count": 1, "value": "colon"}, {"count": 1, "value": "pgs"}, {"count": 1, "value": "human"}, {"count": 1, "value": "patient"}, {"count": 1, "value": "acid"}, {"count": 1, "value": "mouse"}, {"count": 1, "value": "ability"}, {"count": 1, "value": "conversion"}, {"count": 1, "value": "use"}, {"count": 2, "value": "dss"}, {"count": 1, "value": "mechanism"}, {"count": 1, "value": "prostaglandin"}, {"count": 1, "value": "cell"}, {"count": 1, "value": "foe"}, {"count": 1, "value": "enzyme"}, {"count": 3, "value": "inflammation"}, {"count": 1, "value": "animal"}, {"count": 1, "value": "factor"}, {"count": 1, "value": "target"}, {"count": 1, "value": "friend"}, {"count": 1, "value": "cytokine"}, {"count": 1, "value": "risk"}, {"count": 1, "value": "apoptosis"}, {"count": 1, "value": "bowel"}, {"count": 1, "value": "cyclooxygenase"}, {"count": 1, "value": "ulceration"}, {"count": 2, "value": "cox-1"}, {"count": 7, "value": "cox-2"}, {"count": 1, "value": "effect"}, {"count": 1, "value": "adenoma"}, {"count": 1, "value": "carcinoma"}, {"count": 2, "value": "phase"}, {"count": 1, "value": "colitis"}, {"count": 1, "value": "population"}, {"count": 1, "value": "term"}, {"count": 5, "value": "inhibitor"}, {"count": 1, "value": "defense"}, {"count": 1, "value": "housekeeping"}, {"count": 2, "value": "cox"}, {"count": 1, "value": "study"}, {"count": 2, "value": "ibd"}, {"count": 1, "value": "disease"}, {"count": 3, "value": "tumor"}, {"count": 1, "value": "mucosal"}, {"count": 2, "value": "carcinogenesis"}, {"count": 1, "value": "action"}, {"count": 2, "value": "model"}, {"count": 1, "value": "gene"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/18159171"}], "year": 2007, "abstract": "The cyclooxygenase (COX) is a key enzyme in the conversion of arachidonic acid to prostaglandins. COX-1 is constitutively expressed and is a critical housekeeping gene, whereas COX-2 is rapidly upregulated by growth factors and cytokines and thus responsible for inflammation. COX-2 is frequently overexpressed in colonic adenoma and carcinoma. Specific inhibitors of COX-2 have been shown to induce apoptosis in tumor cells and to inhibit tumor growth in animal models and in humans. Long-standing IBD patients have increased risk of developing colorectal cancer compared to general population. IBD-associated colorectal carcinogenesis is probably promoted by chronic inflammation and closely related to COX-2. In a recent study, powerful chemopreventive ability of selective COX-2 inhibitor was observed in colitis-related colon carcinogenesis in mouse model. But it was reported that even selective COX inhibitors aggravated the DSS-induced colonic inflammation. It is assumed that endogenous PGs are involved in the mucosal defense against DSS-induced colonic ulcerations which are produced by COX-1 at early phase and by COX-2 at late phase. Long-term use of COX-2 inhibitors for the chemoprevention of colitic cancer is needed to define their mechanism of action, that reduce side effects and have specific tumor target."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/18159171", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/18159171", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/18159171", "mined_sentences": [{"text": "[COX-2 inhibitors in inflammatory bowel disease: friends or foes?].", "section": "title", "t_start": 1, "d_end": 46, "d_start": 21, "t_end": 5}, {"text": "IBD-associated colorectal carcinogenesis is probably promoted by chronic inflammation and closely related to COX-2.", "section": "abstract", "t_start": 109, "d_end": 2, "d_start": 0, "t_end": 113}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 18.4}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2007-12-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.184}, "type": "literature", "id": "bf1b8678a50302893bee14d5b0f2b554"}, {"literature": {"title": "Cyclooxygenase-2 (COX-2) polymorphisms and risk of inflammatory bowel disease in a Scottish and Danish case-control study.", "journal": {"printPublicationDate": "2011-04-01", "journal": {"medlineAbbreviation": "Inflamm Bowel Dis", "isoabbreviation": "Inflamm. Bowel Dis.", "title": "Inflammatory bowel diseases", "issn": "1078-0998", "nlmid": "9508162", "essn": "1536-4844"}, "monthOfPublication": 4, "volume": "17", "yearOfPublication": 2011, "journalIssueId": 1815172, "issue": "4", "dateOfPublication": "2011 Apr"}, "abstract_lemmas": [{"count": 3, "value": "control"}, {"count": 5, "value": "ci"}, {"count": 1, "value": "inflammatory"}, {"count": 1, "value": "inclusion"}, {"count": 1, "value": "cd"}, {"count": 1, "value": "receptor"}, {"count": 3, "value": "result"}, {"count": 1, "value": "year"}, {"count": 1, "value": "regression"}, {"count": 1, "value": "rs689466"}, {"count": 1, "value": "confidence"}, {"count": 1, "value": "ratio"}, {"count": 2, "value": "genotype"}, {"count": 1, "value": "ibd."}, {"count": 1, "value": "crohn"}, {"count": 1, "value": "stimulation"}, {"count": 1, "value": "age"}, {"count": 1, "value": "regulation"}, {"count": 2, "value": "role"}, {"count": 1, "value": "toll"}, {"count": 1, "value": "allele"}, {"count": 1, "value": "rs5275"}, {"count": 1, "value": "evaluation"}, {"count": 1, "value": "method"}, {"count": 2, "value": "pathogen"}, {"count": 1, "value": "conclusion"}, {"count": 1, "value": "status"}, {"count": 2, "value": "cyclooxygenase-2"}, {"count": 4, "value": "risk"}, {"count": 2, "value": "bowel"}, {"count": 2, "value": "variant"}, {"count": 4, "value": "cox-2"}, {"count": 1, "value": "t8473c"}, {"count": 1, "value": "smoking"}, {"count": 1, "value": "background"}, {"count": 1, "value": "g-765c"}, {"count": 3, "value": "a-1195g"}, {"count": 2, "value": "response"}, {"count": 1, "value": "colitis"}, {"count": 4, "value": "case"}, {"count": 3, "value": "polymorphism"}, {"count": 1, "value": "interaction"}, {"count": 1, "value": "predisposition"}, {"count": 1, "value": "rs20417"}, {"count": 2, "value": "study"}, {"count": 1, "value": "interval"}, {"count": 1, "value": "ibd"}, {"count": 3, "value": "disease"}, {"count": 1, "value": "carrier"}, {"count": 1, "value": "diagnosis"}, {"count": 1, "value": "activity"}, {"count": 1, "value": "ibds"}, {"count": 2, "value": "smoker"}, {"count": 1, "value": "cox-2/ptgs2/pghs2"}, {"count": 1, "value": "odds"}, {"count": 6, "value": "uc"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/20803508"}], "year": 2011, "abstract": "BACKGROUND: Inflammatory bowel diseases (IBDs) are a result of interactions between luminal pathogens and the intestinal immune response. Cyclooxygenase-2 (COX-2) plays a key role in the regulation of the inflammatory response upon stimulation by luminal pathogens via Toll-like receptors. METHODS: Genotypes of the COX-2/PTGS2/PGHS2 A-1195G (rs689466), G-765C (rs20417), and T8473C (rs5275) polymorphisms were assessed in a Scottish and Danish case-control study including 732 Crohn's disease (CD) cases, 973 ulcerative colitis (UC) cases, and 1157 healthy controls using logistic regression. RESULTS: Carriers of the COX-2 A-1195G variant allele had increased risk of UC (odds ratio [OR], 95% confidence interval [CI] = 1.25 [1.02-1.54], P = 0.03) and of both UC and IBD among never smokers (OR [95% CI] = 1.47 [1.11-1.96], P = 0.01 and OR [95% CI] = 1.37 [1.06-1.77], P = 0.02, respectively). Furthermore, this variant genotype was associated with increased risk of diagnosis of UC before age 40 years and with extensive UC (OR [95% CI] = 1.34 [1.11-1.62], P = 0.002 and OR [95% CI] = 1.32 [1.03-1.69], P = 0.03, respectively). CONCLUSIONS: COX-2 A-1195G polymorphism was associated with the risk of UC, especially among never-smokers, suggesting that low activity of COX-2 may predispose to UC. Our results suggest that inclusion of smoking status may be essential for the evaluation of the role of genetic predisposition to IBD."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/20803508", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/20803508", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/20803508", "mined_sentences": [{"text": "Cyclooxygenase-2 (COX-2) polymorphisms and risk of inflammatory bowel disease in a Scottish and Danish case-control study.", "section": "title", "t_start": 18, "d_end": 76, "d_start": 51, "t_end": 22}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 15.6}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2011-04-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.156}, "type": "literature", "id": "ed67f9b486dec127a3618cdbe93b83e8"}, {"literature": {"title": "Exacerbation of inflammatory bowel diseases associated with the use of nonsteroidal anti-inflammatory drugs: myth or reality?", "journal": {"printPublicationDate": "2009-10-01", "journal": {"medlineAbbreviation": "Eur J Clin Pharmacol", "isoabbreviation": "Eur. J. Clin. Pharmacol.", "title": "European journal of clinical pharmacology", "issn": "0031-6970", "nlmid": "1256165", "essn": "1432-1041"}, "monthOfPublication": 10, "volume": "65", "yearOfPublication": 2009, "journalIssueId": 1650886, "issue": "10", "dateOfPublication": "2009 Oct"}, "abstract_lemmas": [{"count": 1, "value": "blind"}, {"count": 1, "value": "hallmark"}, {"count": 1, "value": "medication"}, {"count": 1, "value": "direct"}, {"count": 3, "value": "evidence"}, {"count": 1, "value": "paper"}, {"count": 1, "value": "design"}, {"count": 1, "value": "result"}, {"count": 1, "value": "keywords"}, {"count": 2, "value": "nsaid"}, {"count": 1, "value": "prostaglandin"}, {"count": 3, "value": "use"}, {"count": 1, "value": "colitis"}, {"count": 2, "value": "relapse"}, {"count": 1, "value": "scopus"}, {"count": 1, "value": "review"}, {"count": 2, "value": "mechanism"}, {"count": 1, "value": "reality"}, {"count": 1, "value": "nonsteroidal"}, {"count": 1, "value": "aspirin"}, {"count": 1, "value": "reduction"}, {"count": 1, "value": "condition"}, {"count": 2, "value": "objective"}, {"count": 1, "value": "issue"}, {"count": 1, "value": "pathway"}, {"count": 2, "value": "treatment"}, {"count": 1, "value": "coxibs"}, {"count": 1, "value": "literature"}, {"count": 1, "value": "cyclooxygenase-2"}, {"count": 1, "value": "editorial"}, {"count": 1, "value": "myth"}, {"count": 3, "value": "bowel"}, {"count": 1, "value": "cox-1"}, {"count": 5, "value": "cox-2"}, {"count": 1, "value": "effect"}, {"count": 2, "value": "inhibition"}, {"count": 1, "value": "background"}, {"count": 1, "value": "report"}, {"count": 1, "value": "article"}, {"count": 1, "value": "cd"}, {"count": 1, "value": "data"}, {"count": 1, "value": "crohn"}, {"count": 1, "value": "association"}, {"count": 1, "value": "case"}, {"count": 1, "value": "term"}, {"count": 1, "value": "conclusion"}, {"count": 3, "value": "exacerbation"}, {"count": 1, "value": "dose"}, {"count": 1, "value": "science"}, {"count": 2, "value": "study"}, {"count": 2, "value": "database"}, {"count": 4, "value": "ibd"}, {"count": 4, "value": "disease"}, {"count": 4, "value": "drug"}, {"count": 2, "value": "trial"}, {"count": 1, "value": "pubmed"}, {"count": 4, "value": "nsaids"}, {"count": 1, "value": "english"}, {"count": 4, "value": "inhibitor"}, {"count": 1, "value": "uc"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/19711064"}], "year": 2009, "abstract": " BACKGROUND: Nonsteroidal anti-inflammatory drugs (NSAIDs), conventional and selective cyclooxygenase-2 (COX-2) inhibitors, are among the most widely used medications for the treatment of various inflammatory conditions. There is strong evidence of a possible association between the use of these drugs and the relapse of inflammatory bowel diseases (IBD). OBJECTIVE: Our objective was to examine the literature regarding the exacerbation of IBD associated with the use of conventional NSAIDs and selective COX-2 inhibitors and the underlying pathogenetic mechanisms. STUDY DESIGN: We reviewed articles, including original papers, controlled trials, case reports, reviews, and editorials published in English at the PubMed, Scopus Database, and Science Direct database, searching with the following keywords: nonsteroidal anti-inflammatory drugs (NSAIDs), COX-2 inhibitors, Coxibs, inflammatory bowel diseases (IBD), ulcerative colitis (UC), Crohn's disease (CD). RESULTS: There is substantial evidence that exacerbation of IBD happens after treatment with NSAIDs, but the available data remain conflicting, and it is not clear whether selective COX-2 inhibitors are safer than traditional NSAIDs. However, there is some evidence that selective COX-2 inhibition and COX-1 inhibition (with low-dose aspirin) appear to be well-tolerated in the short term. Regarding the mechanisms of relapse, the reduction of prostaglandins appears to be the hallmark of the NSAIDs adverse effects. CONCLUSIONS: Further randomized, double-blind, controlled trials should be performed to address this issue, and more in vitro studies to identify the pathways involved are required."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["IBD"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/19711064", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/19711064", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/19711064", "mined_sentences": [{"text": "Our objective was to examine the literature regarding the exacerbation of IBD associated with the use of conventional NSAIDs and selective COX-2 inhibitors and the underlying pathogenetic mechanisms.", "section": "abstract", "t_start": 139, "d_end": 76, "d_start": 74, "t_end": 143}, {"text": "We reviewed articles, including original papers, controlled trials, case reports, reviews, and editorials published in English at the PubMed, Scopus Database, and Science Direct database, searching with the following keywords: nonsteroidal anti-inflammatory drugs (NSAIDs), COX-2 inhibitors, Coxibs, inflammatory bowel diseases (IBD), ulcerative colitis (UC), Crohn's disease (CD).", "section": "abstract", "t_start": 274, "d_end": 331, "d_start": 329, "t_end": 278}, {"text": "There is substantial evidence that exacerbation of IBD happens after treatment with NSAIDs, but the available data remain conflicting, and it is not clear whether selective COX-2 inhibitors are safer than traditional NSAIDs.", "section": "abstract", "t_start": 173, "d_end": 53, "d_start": 51, "t_end": 177}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 14.2}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2009-10-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.142}, "type": "literature", "id": "2b7e271b9f244bf0d85cce5a2df4c33a"}, {"literature": {"title": "[COX-2 inhibitors to patients with inflammatory bowel disease].", "journal": {"printPublicationDate": "2002-11-01", "journal": {"medlineAbbreviation": "Tidsskr Nor Laegeforen", "isoabbreviation": "Tidsskr. Nor. Laegeforen.", "title": "Tidsskrift for den Norske laegeforening : tidsskrift for praktisk medicin, ny raekke", "issn": "0029-2001", "nlmid": "0413423", "essn": "0807-7096"}, "monthOfPublication": 11, "volume": "122", "yearOfPublication": 2002, "journalIssueId": 1148042, "issue": "27", "dateOfPublication": "2002 Nov"}, "abstract_lemmas": [{"count": 1, "value": "bowel"}, {"count": 1, "value": "inhibitor"}, {"count": 1, "value": "patient"}, {"count": 1, "value": "disease"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/12523201"}], "year": 2002, "abstract": " "}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/12523201", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/12523201", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/12523201", "mined_sentences": [{"text": "[COX-2 inhibitors to patients with inflammatory bowel disease].", "section": "title", "t_start": 1, "d_end": 60, "d_start": 35, "t_end": 5}]}, "provenance_type": {"database": {"version": "2016-07-25", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 14}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2002-11-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.14}, "type": "literature", "id": "dfadaf1467debaf46b62a53e4ce5cfb7"}, {"literature": {"title": "Beneficial effect of shikonin on experimental colitis induced by dextran sulfate sodium in BALB/c mice.", "journal": {"printPublicationDate": "2012-01-01", "journal": {"medlineAbbreviation": "Evid Based Complement Alternat Med", "isoabbreviation": "Evid Based Complement Alternat Med", "title": "Evidence-based complementary and alternative medicine : eCAM", "issn": "1741-427X", "nlmid": "101215021", "essn": "1741-4288"}, "monthOfPublication": 0, "volume": "2012", "yearOfPublication": 2012, "journalIssueId": 1844213, "dateOfPublication": "2012 "}, "abstract_lemmas": [{"count": 1, "value": "tnf-\u03b1"}, {"count": 1, "value": "weight"}, {"count": 1, "value": "stat-3"}, {"count": 1, "value": "stool"}, {"count": 1, "value": "lithospermum"}, {"count": 2, "value": "agent"}, {"count": 2, "value": "sulfate"}, {"count": 1, "value": "production"}, {"count": 1, "value": "manner"}, {"count": 1, "value": "naphthoquinone"}, {"count": 3, "value": "mouse"}, {"count": 1, "value": "dss."}, {"count": 2, "value": "index"}, {"count": 1, "value": "management"}, {"count": 1, "value": "group"}, {"count": 2, "value": "sodium"}, {"count": 1, "value": "administration"}, {"count": 1, "value": "dss"}, {"count": 1, "value": "shortening"}, {"count": 1, "value": "erythrorhizon"}, {"count": 1, "value": "score"}, {"count": 1, "value": "treatment"}, {"count": 1, "value": "bowel"}, {"count": 2, "value": "dextran"}, {"count": 1, "value": "cyclooxygenase-2"}, {"count": 1, "value": "ability"}, {"count": 1, "value": "loss"}, {"count": 1, "value": "il-1\u03b2"}, {"count": 2, "value": "activation"}, {"count": 1, "value": "colorectum"}, {"count": 1, "value": "component"}, {"count": 1, "value": "effect"}, {"count": 1, "value": "myeloperoxidase"}, {"count": 1, "value": "pstat-3"}, {"count": 1, "value": "report"}, {"count": 1, "value": "nf-\u03bab"}, {"count": 1, "value": "dose"}, {"count": 2, "value": "colitis"}, {"count": 1, "value": "macrophage"}, {"count": 1, "value": "acute"}, {"count": 1, "value": "target"}, {"count": 1, "value": "culture"}, {"count": 1, "value": "expression"}, {"count": 1, "value": "study"}, {"count": 1, "value": "appearance"}, {"count": 3, "value": "disease"}, {"count": 6, "value": "shikonin"}, {"count": 1, "value": "feces"}, {"count": 3, "value": "activity"}, {"count": 2, "value": "balb/c"}, {"count": 1, "value": "root"}, {"count": 4, "value": "uc"}, {"count": 1, "value": "result"}], "references": [{"lit_id": "http://europepmc.org/abstract/MED/23346196"}], "year": 2012, "abstract": "The naphthoquinone shikonin, a major component of the root of Lithospermum erythrorhizon, now is studied as an anti-inflammatory agent in the treatment of ulcerative colitis (UC). Acute UC was induced in Balb/C mice by oral administration of 5% dextran sodium sulfate (DSS). The disease activity index was evaluated, and a histologic study was carried out. Orally administered shikonin reduces induced UC in a dose-dependent manner, preventing the shortening of the colorectum and decreasing weight loss by 5% while improving the appearance of feces and preventing bloody stools. The disease activity index score was much lower in shikonin-treated mice than in the colitic group, as well as the myeloperoxidase activity. The expression of cyclooxygenase-2 was reduced by 75%, activation of NF-\u03baB was reduced by 44%, and that of pSTAT-3 by 47%, as well as TNF-\u03b1, IL-1\u03b2, and IL-6 production. Similar results were obtained in primary macrophages culture. This is the first report of shikonin's ability to attenuate acute UC induced by DSS. Shikonin acts by blocking the activation of two major targets: NF-\u03baB and STAT-3, and thus constitutes a promising potential therapeutic agent for the management of the inflammatory bowel disease."}, "target": {"id": "ENSG00000073756", "gene_info": {"symbol": "PTGS2", "name": "prostaglandin-endoperoxide synthase 2", "geneid": "ENSG00000073756"}, "target_type": "protein_evidence", "activity": "up_or_down"}, "validated_against_schema_version": "1.2.3", "sourceID": "europepmc", "disease": {"efo_info": {"therapeutic_area": {"labels": ["immune system disease", "digestive system disease"], "codes": ["EFO_0000405", "EFO_0000540"]}, "path": [["EFO_0000540", "EFO_0005140", "EFO_0003767"], ["EFO_0000405", "EFO_0003767"]], "efo_id": "http://www.ebi.ac.uk/efo/EFO_0003767", "label": "inflammatory bowel disease"}, "name": ["inflammatory bowel disease"], "id": "EFO_0003767"}, "unique_association_fields": {"publicationIDs": "http://europepmc.org/abstract/MED/23346196", "disease_uri": "http://www.ebi.ac.uk/efo/EFO_0003767", "target": "http://identifiers.org/uniprot/P35354"}, "evidence": {"unique_experiment_reference": "http://europepmc.org/abstract/MED/23346196", "evidence_codes_info": [[{"eco_id": "literature_mining", "label": "Literature mining"}], [{"eco_id": "ECO_0000213", "label": "combinatorial evidence used in automatic assertion"}]], "literature_ref": {"lit_id": "http://europepmc.org/abstract/MED/23346196", "mined_sentences": [{"text": "In addition, increased productions of inducible nitric oxide synthase and cyclooxygenase-2 have also been found in inflammatory bowel disease, as well as in models of intestinal inflammation [13].", "section": "introduction_and_background", "t_start": 74, "d_end": 140, "d_start": 115, "t_end": 89}, {"text": "COX-2 plays an important proinflammatory role in the pathogenesis of inflammatory bowel disease.", "section": "results", "t_start": 0, "d_end": 94, "d_start": 69, "t_end": 4}, {"text": "In inflammatory bowel disease, NF-\u03baB activation is observed in inflamed intestinal mucosa, in which it induces the expression of COX-2.", "section": "results", "t_start": 129, "d_end": 28, "d_start": 3, "t_end": 133}]}, "provenance_type": {"database": {"version": "2016-07-26", "id": "EuropePMC"}}, "is_associated": true, "resource_score": {"type": "summed_total", "method": {"description": "Custom text-mining method for target-disease association"}, "value": 11.4}, "evidence_codes": ["literature_mining", "ECO_0000213"], "date_asserted": "2012-01-01T00:00:00Z"}, "access_level": "public", "scores": {"association_score": 0.114}, "type": "literature", "id": "000f50b298a73e64981dc7677ad323db"}], "size": 10};
        
        $scope.abstracts = {'All': [{"title": "Transcultural validation of the ALS-CBS Cognitive Section for the Brazilian population.",
        	                        "abstractText": "Cognitive decline (CD) is common but often under-recognized in ALS due to the scarcity of adequate cognitive screening methods. In this scenario, the Amyotrophic Lateral Sclerosis Cognitive Behavioural Screen (ALS-CBS) is the most investigated instrument and presents high sensitivity to identify CD. Currently, there are no validated cognitive screening tools for ALS patients in the Brazilian population and little is known about the frequency of ALS related CD in the country. We assessed the accuracy of the Brazilian Portuguese version of ALS-CBS Cognitive Section (ALS-CBS-Br) for classifying the cognitive status of Brazilian patients compared to a standard neuropsychological battery, and estimated the prevalence of CD in the Brazilian ALS population. Among 73 initially recruited ALS patients, 49 were included. Twenty-four patients were excluded due to severe motor disability, FTD diagnosis or non-acceptance. Ten healthy controls were also included. Ten ALS patients (20%) were diagnosed with executive dysfunction (ALSci) based on the battery results. ALS-CBS-Br scores were significantly lower in the ALSci group (p\u2009<\u20090.001). The scale accuracy in detecting executive dysfunction was 0.906. Optimal cut-off score was 10/20 (specificity 0.872 and sensitivity 0.900). In conclusion, the ALS-CBS-Br may facilitate the recognition of CD in routine clinical care and complement future studies in our population.",
        	                        "year": "2015"
        							},
        							{"title": "Prevalence of Amyotrophic Lateral Sclerosis - United States, 2012-2013.",
        	                        "abstractText": "Amyotrophic lateral sclerosis (ALS), commonly known as Lou Gehrig's disease, is a progressive and fatal neuromuscular disease for which no cure or viable treatment has been identified. ALS, like most noncommunicable diseases, is not a nationally notifiable disease in the United States.",
        	                        "year": "2005"
        							},
        							{"title": "A novel amyotrophic lateral sclerosis mutation in OPTN induces ER stress and Golgi fragmentation in vitro.",
        	                        "abstractText": "Mutations in the optineurin gene (OPTN) have been identified in a small proportion (<1%) of sporadic and familial ALS cases, and the exact role of optineurin in the pathogenesis of ALS remains unclear. To further examine the role of OPTN in ALS, we sought to identify novel ALS variants in OPTN and examine their potential for pathogenicity in vitro. Whole exome sequence data from 74 familial ALS cases were analysed for the presence of novel OPTN mutations.",
        	                        "year": "2007"
        							},
        							{"title": "Exploring Olfactory Function and Its Relation with Behavioral and Cognitive Impairment in Amyotrophic Lateral Sclerosis Patients: A Cross-Sectional Study.",
        	                        "abstractText": "Behavioral and cognitive impairment are common in amyotrophic lateral sclerosis (ALS) and represent a continuum with frontotemporal dementia (FTD). Olfactory dysfunction has been described in a subset of ALS patients and might be associated with frontotemporal and insular cortex dysfunction.To evaluate olfaction dysfunction in ALS patients and its relationship with either cognition or behavioral impairment.",
        	                        "year": "2001"
        							},
        							{"title": "ALS Mutations Disrupt Phase Separation Mediated by Helical Structure in the TDP-43 Low-Complexity C-Terminal Domain.",
        	                        "abstractText": "RNA-binding protein TDP-43 mediates essential RNA processing but forms cytoplasmic neuronal inclusions via its C-terminal domain (CTD) in amyotrophic lateral sclerosis (ALS). It remains unclear if aggregated TDP-43 is neurotoxic and if \u223c50 ALS-associated missense mutations in TDP-43 CTD promote aggregation, or if loss of normal function plays a role in disease. Recent work points to the ability of related proteins to assemble into functional phase-separated ribonucleoprotein granules via their structurally disordered prion-like domains.",
        	                        "year": "2010"
        							}
        						   ],
        		           'motor': [{"title": "Transcultural validation of the ALS-CBS Cognitive Section for the Brazilian population.",
        	                        "abstractText": "Cognitive decline (CD) is common but often under-recognized in ALS due to the scarcity of adequate cognitive screening methods. In this scenario, the Amyotrophic Lateral Sclerosis Cognitive Behavioural Screen (ALS-CBS) is the most investigated instrument and presents high sensitivity to identify CD. Currently, there are no validated cognitive screening tools for ALS patients in the Brazilian population and little is known about the frequency of ALS related CD in the country. We assessed the accuracy of the Brazilian Portuguese version of ALS-CBS Cognitive Section (ALS-CBS-Br) for classifying the cognitive status of Brazilian patients compared to a standard neuropsychological battery, and estimated the prevalence of CD in the Brazilian ALS population. Among 73 initially recruited ALS patients, 49 were included. Twenty-four patients were excluded due to severe motor disability, FTD diagnosis or non-acceptance. Ten healthy controls were also included. Ten ALS patients (20%) were diagnosed with executive dysfunction (ALSci) based on the battery results. ALS-CBS-Br scores were significantly lower in the ALSci group (p\u2009<\u20090.001). The scale accuracy in detecting executive dysfunction was 0.906. Optimal cut-off score was 10/20 (specificity 0.872 and sensitivity 0.900). In conclusion, the ALS-CBS-Br may facilitate the recognition of CD in routine clinical care and complement future studies in our population.",
        	                        "year": "2015"
        							},
        							{"title": "Prevalence of Amyotrophic Lateral Sclerosis - United States, 2012-2013.",
        	                        "abstractText": "Amyotrophic lateral sclerosis (ALS), commonly known as Lou Gehrig's disease, is a progressive and fatal neuromuscular disease for which no cure or viable treatment has been identified. ALS, like most noncommunicable diseases, is not a nationally notifiable disease in the United States.",
        	                        "year": "2005"
        							}
        							],
        		           'patient': [{"title": "Prevalence of Amyotrophic Lateral Sclerosis - United States, 2012-2013.",
        	                        "abstractText": "Amyotrophic lateral sclerosis (ALS), commonly known as Lou Gehrig's disease, is a progressive and fatal neuromuscular disease for which no cure or viable treatment has been identified. ALS, like most noncommunicable diseases, is not a nationally notifiable disease in the United States.",
        	                        "year": "2005"
        							},
        							{"title": "A novel amyotrophic lateral sclerosis mutation in OPTN induces ER stress and Golgi fragmentation in vitro.",
        	                        "abstractText": "Mutations in the optineurin gene (OPTN) have been identified in a small proportion (<1%) of sporadic and familial ALS cases, and the exact role of optineurin in the pathogenesis of ALS remains unclear. To further examine the role of OPTN in ALS, we sought to identify novel ALS variants in OPTN and examine their potential for pathogenicity in vitro. Whole exome sequence data from 74 familial ALS cases were analysed for the presence of novel OPTN mutations.",
        	                        "year": "2007"
        							}
        							],
        		           'tdp-43': [{"title": "A novel amyotrophic lateral sclerosis mutation in OPTN induces ER stress and Golgi fragmentation in vitro.",
        	                        "abstractText": "Mutations in the optineurin gene (OPTN) have been identified in a small proportion (<1%) of sporadic and familial ALS cases, and the exact role of optineurin in the pathogenesis of ALS remains unclear. To further examine the role of OPTN in ALS, we sought to identify novel ALS variants in OPTN and examine their potential for pathogenicity in vitro. Whole exome sequence data from 74 familial ALS cases were analysed for the presence of novel OPTN mutations.",
        	                        "year": "2007"
        							},
        							{"title": "Exploring Olfactory Function and Its Relation with Behavioral and Cognitive Impairment in Amyotrophic Lateral Sclerosis Patients: A Cross-Sectional Study.",
        	                        "abstractText": "Behavioral and cognitive impairment are common in amyotrophic lateral sclerosis (ALS) and represent a continuum with frontotemporal dementia (FTD). Olfactory dysfunction has been described in a subset of ALS patients and might be associated with frontotemporal and insular cortex dysfunction.To evaluate olfaction dysfunction in ALS patients and its relationship with either cognition or behavioral impairment.",
        	                        "year": "2001"
        							}
        							],
        		           'cell': [{"title": "Exploring Olfactory Function and Its Relation with Behavioral and Cognitive Impairment in Amyotrophic Lateral Sclerosis Patients: A Cross-Sectional Study.",
        	                        "abstractText": "Behavioral and cognitive impairment are common in amyotrophic lateral sclerosis (ALS) and represent a continuum with frontotemporal dementia (FTD). Olfactory dysfunction has been described in a subset of ALS patients and might be associated with frontotemporal and insular cortex dysfunction.To evaluate olfaction dysfunction in ALS patients and its relationship with either cognition or behavioral impairment.",
        	                        "year": "2001"
        							},
        							{"title": "ALS Mutations Disrupt Phase Separation Mediated by Helical Structure in the TDP-43 Low-Complexity C-Terminal Domain.",
        	                        "abstractText": "RNA-binding protein TDP-43 mediates essential RNA processing but forms cytoplasmic neuronal inclusions via its C-terminal domain (CTD) in amyotrophic lateral sclerosis (ALS). It remains unclear if aggregated TDP-43 is neurotoxic and if \u223c50 ALS-associated missense mutations in TDP-43 CTD promote aggregation, or if loss of normal function plays a role in disease. Recent work points to the ability of related proteins to assemble into functional phase-separated ribonucleoprotein granules via their structurally disordered prion-like domains.",
        	                        "year": "2010"
        							}
        						   ],
        		           'sod1': [ {"title": "ALS Mutations Disrupt Phase Separation Mediated by Helical Structure in the TDP-43 Low-Complexity C-Terminal Domain.",
        	                        "abstractText": "RNA-binding protein TDP-43 mediates essential RNA processing but forms cytoplasmic neuronal inclusions via its C-terminal domain (CTD) in amyotrophic lateral sclerosis (ALS). It remains unclear if aggregated TDP-43 is neurotoxic and if \u223c50 ALS-associated missense mutations in TDP-43 CTD promote aggregation, or if loss of normal function plays a role in disease. Recent work points to the ability of related proteins to assemble into functional phase-separated ribonucleoprotein granules via their structurally disordered prion-like domains.",
        	                        "year": "2010"
        							},
        							{"title": "Transcultural validation of the ALS-CBS Cognitive Section for the Brazilian population.",
        	                        "abstractText": "Cognitive decline (CD) is common but often under-recognized in ALS due to the scarcity of adequate cognitive screening methods. In this scenario, the Amyotrophic Lateral Sclerosis Cognitive Behavioural Screen (ALS-CBS) is the most investigated instrument and presents high sensitivity to identify CD. Currently, there are no validated cognitive screening tools for ALS patients in the Brazilian population and little is known about the frequency of ALS related CD in the country. We assessed the accuracy of the Brazilian Portuguese version of ALS-CBS Cognitive Section (ALS-CBS-Br) for classifying the cognitive status of Brazilian patients compared to a standard neuropsychological battery, and estimated the prevalence of CD in the Brazilian ALS population. Among 73 initially recruited ALS patients, 49 were included. Twenty-four patients were excluded due to severe motor disability, FTD diagnosis or non-acceptance. Ten healthy controls were also included. Ten ALS patients (20%) were diagnosed with executive dysfunction (ALSci) based on the battery results. ALS-CBS-Br scores were significantly lower in the ALSci group (p\u2009<\u20090.001). The scale accuracy in detecting executive dysfunction was 0.906. Optimal cut-off score was 10/20 (specificity 0.872 and sensitivity 0.900). In conclusion, the ALS-CBS-Br may facilitate the recognition of CD in routine clinical care and complement future studies in our population.",
        	                        "year": "2015"
        							}
        						   ]}
        
        $scope.displayAbstracts = [];
        $scope.cluster = "All";
        $scope.allData = [];

        // Specifically for foamtree tab
        $scope.setLoaded = function() {
        	$scope.loaded = true;
        }

		$scope.slider = {
				  min: getMinYear(),
				  max: getMaxYear(),
				  options: {
					floor: getMinYear(),
					ceil: getMaxYear(),
					onChange: function(sliderId, modelValue, highValue, pointerType) {
						filterAbstracts(modelValue, highValue);
					} 
				  }
		};
		
		function filterAbstracts(min, max) {

            $scope.displayAbstracts = $scope.allData;
			
			var acceptedAbstracts = [];
			
			$scope.displayAbstracts.forEach(function(item) {
				
				if(item.literature.year >= min && item.literature.year <= max) {
					acceptedAbstracts.push(item);
				}
			});
			
			$scope.displayAbstracts = acceptedAbstracts;
		}
		
		function getMinYear() {
			
			var min = 9999999;

			$scope.allData.forEach(function(item) {
			
				if(item.literature.year < min) {
					min = item.literature.year;
				}

			});
			
			return min;
		}

		function getMaxYear() {
			
			var max = 0;

			$scope.allData.forEach(function(item) {
			
				if(item.literature.year > max) {
					max = item.literature.year;
				}
			});
			
			return max;
		}

        $scope.search = {
            info : {
                data : {},
                efo_path : [],
                efo : {},
                gene : {},
                title : ""
            },

            flower_data : [], // processFlowerData([]), // so we initialize the flower to something
            test:[],
            categories:[],   // use this for sections of the accordion and flower petals
            association_scores : {},

            // tables data:
            tables : {
                genetic_associations : {
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.GENETIC_ASSOCIATION,
                    common_diseases : {
                        data : [],
                        is_open : false,
                        is_loading: false,
                        heading : cttvDictionary.COMMON_DISEASES,
                        source : cttvConfig.evidence_sources.genetic_association.common,
                        source_label : cttvConfig.evidence_sources.genetic_association.common.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                        has_errors: false,
                    },
                    rare_diseases : {
                        data : [],
                        is_open : false,
                        is_loading: false,
                        heading : cttvDictionary.RARE_DISEASES,
                        source : cttvConfig.evidence_sources.genetic_association.rare,
                        source_label : cttvConfig.evidence_sources.genetic_association.rare.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                        has_errors: false,
                    }
                },
                rna_expression : {
                    data : [],
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.RNA_EXPRESSION,
                    source : cttvConfig.evidence_sources.rna_expression,
                    source_label : cttvConfig.evidence_sources.rna_expression.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                    has_errors: false,
                },
                affected_pathways : {
                    data : [],
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.AFFECTED_PATHWAY,
                    source : cttvConfig.evidence_sources.pathway,
                    source_label : cttvConfig.evidence_sources.pathway.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                    has_errors: false,
                },
                known_drugs : {
                    data : [],
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.KNOWN_DRUG,
                    source : cttvConfig.evidence_sources.known_drug,
                    source_label : cttvConfig.evidence_sources.known_drug.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                    has_errors: false,
                },
                somatic_mutations : {
                    data : [],
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.SOMATIC_MUTATION,
                    source : cttvConfig.evidence_sources.somatic_mutation,
                    source_label : cttvConfig.evidence_sources.somatic_mutation.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                    has_errors: false,
                },
                literature : {
                    data : [],
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.LITERATURE,
                    source : cttvConfig.evidence_sources.literature,
                    source_label : cttvConfig.evidence_sources.literature.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                    has_errors: false,
                },
                animal_models : {
                    data : [],
                    is_open : false,
                    is_loading: false,
                    heading : cttvDictionary.ANIMAL_MODEL,
                    source : cttvConfig.evidence_sources.animal_model,
                    source_label : cttvConfig.evidence_sources.animal_model.map(function(s){return {label:cttvDictionary[ cttvConsts.invert(s) ], url:cttvConsts.dbs_info_url[cttvConsts.invert(s)]}; }),
                    has_errors: false,
                }
            }
        };

        $scope.datatypes = datatypes;

        var arrayToList = function(arr, oneToString){
            if(oneToString && arr.length==1){
                return arr[0];
            }
            return "<ul><li>" + arr.join("</li><li>") + "</li></ul>";
        }

        // =================================================
        //  I N F O
        // =================================================


        /**
         * Get the information for target and disease,
         * i.e. to fill the two boxes at the top of the page
         */
        var getInfo = function(){
            // get gene specific info
            cttvAPIservice.getTarget( {
                    target_id:$scope.search.target
                } ).
                then(
                    function(resp) {
                        $scope.search.info.gene = resp.body;
                        //updateTitle();
                    },
                    cttvAPIservice.defaultErrorHandler
                );


            // get disease specific info with the efo() method
            cttvAPIservice.getDisease( {
                    code:$scope.search.disease
                } ).
                then(
                    function(resp) {
                        $scope.search.info.efo = resp.body;
                        // TODO: This is not returned by the api yet. Maybe we need to remove it later
                        $scope.search.info.efo.efo_code = $scope.search.disease;
                        //updateTitle();
                    },
                    cttvAPIservice.defaultErrorHandler
                );

        };



        var updateTitle = function(t, d){
            $scope.search.info.title = (t+"-"+d).split(" ").join("_");
        };



        // =================================================
        //  F L O W E R
        // =================================================


        /*
         * takes a datasources array and returns an array of objects {value: number, label:string}
         */
        function processFlowerData(data){
            var fd = [];

            for (var i=0; i<cttvConsts.datatypesOrder.length; i++) {
                var dkey = cttvConsts.datatypes[cttvConsts.datatypesOrder[i]];
                var key = cttvConsts.datatypesOrder[i];
                fd.push({
                    // "value": lookDatasource(data, cttvConsts.datatypes[key]).score,
                    "value": data[dkey],
                    "label": cttvConsts.datatypesLabels[key],
                    "active": true,
                });
            }

            return fd;
        }



        var getFlowerData = function(){
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                facets: false
            };
            _.extend(opts, searchObj);

            return cttvAPIservice.getAssociation(opts).
                then(
                    function(resp) {
                        $scope.search.flower_data = processFlowerData(resp.body.data[0].association_score.datatypes);
                        updateTitle( resp.body.data[0].target.gene_info.symbol, resp.body.data[0].disease.efo_info.label );
                    },
                    cttvAPIservice.defaultErrorHandler
                );
        };



        // =================================================
        //  G E N E T I C   A S S O C I A T I O N S
        // =================================================



        /*
        Here we need to pull data for two tables via two separte, distinct calls to the API
         - common disease table
         - related rare disease
        */


        // -------------------------------------------------



        var updateGeneticAssociationsSetting = function(){
            //$scope.search.tables.genetic_associations.is_open = $scope.search.tables.genetic_associations.common_diseases.is_open || $scope.search.tables.genetic_associations.rare_diseases.is_open;
            $scope.search.tables.genetic_associations.is_loading = $scope.search.tables.genetic_associations.common_diseases.is_loading || $scope.search.tables.genetic_associations.rare_diseases.is_loading;
        };



        /*
         * Search for given eco_code id in the specified evidence_codes_info array
         * and returns corresponding label, or eco_code id if not found
         */
        var getEcoLabel = function(arr, eco){
            var label = eco;
            for(var i=0; i<arr.length; i++){
                if(arr[i][0].eco_id===eco){
                    label = arr[i][0].label;
                    break;
                }
            }
            return label;
        };


        var getCommonDiseaseData = function(){
            $scope.search.tables.genetic_associations.common_diseases.is_loading = true;
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: 1000,
                datasource: cttvConfig.evidence_sources.genetic_association.common,
                fields:[
                    "disease",
                    "evidence",
                    "variant",
                    "target",
                    "sourceID",
                    "access_level"
                ]
            };
            _.extend(opts, searchObj);
            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {
                        if( resp.body.data ){
                            $scope.search.tables.genetic_associations.common_diseases.data = resp.body.data;
                            initCommonDiseasesTable();
                        } else {
                            $log.warn("Empty response : common disease");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    //$scope.search.tables.genetic_associations.common_diseases.is_open = $scope.search.tables.genetic_associations.common_diseases.data.length>0 || false;
                    $scope.search.tables.genetic_associations.common_diseases.is_loading = false;

                    // update for parent
                    updateGeneticAssociationsSetting();
                });
        };



        /*
         *
         */
        var formatCommonDiseaseDataToArray = function(data){
            var newdata = [];

            data.forEach(function(item){

                // create rows:
                var row = [];

                try{

                    // data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );

                    // disease name
                    row.push( item.disease.efo_info.label );

                    // Variant
                    row.push( "<a class='cttv-external-link' href='http://www.ensembl.org/Homo_sapiens/Variation/Explore?v="+item.variant.id[0].split('/').pop()+"' target='_blank'>"+item.variant.id[0].split('/').pop()+"</a>" );

                    // variant type
                    row.push( clearUnderscores( getEcoLabel(item.evidence.evidence_codes_info, item.evidence.gene2variant.functional_consequence.split('/').pop() ) ) );

                    // evidence source
                    row.push( cttvDictionary.CTTV_PIPELINE );

                    // evidence source
                    row.push( "<a class='cttv-external-link' href='https://www.ebi.ac.uk/gwas/search?query="+item.variant.id[0].split('/').pop()+"' target='_blank'>"
                            + clearUnderscores(item.sourceID)
                            + "</a>");

                    // p-value
                    row.push( item.evidence.variant2disease.resource_score.value.toPrecision(1) );
                    //row.push( item.evidence.variant2disease.resource_score.value.toExponential(1) );

                    // publications
                    var refs = [];
                    if ( checkPath(item, "evidence.variant2disease.provenance_type.literature.references") ) {
                        refs = item.evidence.variant2disease.provenance_type.literature.references;
                    }

                    var pmidsList = cttvUtils.getPmidsList( refs );
                    row.push( cttvUtils.getPublicationsString( pmidsList ) );

                    // Publication ids (hidden)
                    row.push(pmidsList.join(", "));


                    newdata.push(row);

                }catch(e){
                    $scope.search.tables.genetic_associations.common_diseases.has_errors = true;
                    $log.error("Error parsing common disease data:");
                    $log.error(e);
                }
            });

            return newdata;
        };



        var initCommonDiseasesTable = function(){

            $('#common-diseases-table').DataTable( cttvUtils.setTableToolsParams({
                "data": formatCommonDiseaseDataToArray($scope.search.tables.genetic_associations.common_diseases.data),
                "ordering" : true,
                "order": [[1, 'asc']],
                "autoWidth": false,
                "paging" : true,
                "columnDefs" : [
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level,
                        "width" : "3%"
                    },
                    {
                        "targets": [8],
                        "visible": false
                    },
                    {
                        "targets": [3,4,5,7],
                        "width": "14%"
                    },
                    {
                        "targets": [2,6],
                        "width": "10%"
                    }

                ]

            }, $scope.search.info.title+"-common_diseases") );
        };



        // -------------------------------------------------



        var getRareDiseaseData = function(){
            $scope.search.tables.genetic_associations.rare_diseases.is_loading = true;
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: 1000,
                datasource: cttvConfig.evidence_sources.genetic_association.rare,
                fields: [
                    "disease.efo_info",
                    "evidence",
                    "variant",
                    "type",
                    "access_level"
                ]
            };

            _.extend(opts, searchObj);

            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {
                        if( resp.body.data ){
                            $scope.search.tables.genetic_associations.rare_diseases.data = resp.body.data;
                            initRareDiseasesTable();
                        } else {
                            $log.warn("Empty response : rare disease");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    //$scope.search.tables.genetic_associations.rare_diseases.is_open = $scope.search.tables.genetic_associations.rare_diseases.data.length>0 || false;
                    $scope.search.tables.genetic_associations.rare_diseases.is_loading = false;
                    // update for parent
                    updateGeneticAssociationsSetting();
                });
        };



        var formatRareDiseaseDataToArray = function(data){
            var newdata = [];
            data.forEach(function(item){
                // create rows:
                var row = [];

                try{

                    var db = "";
                    if( item.evidence.variant2disease ){
                        db = item.evidence.variant2disease.provenance_type.database.id.toLowerCase();   // or gene2variant
                    }else if ( item.evidence.provenance_type.database ){
                        db = item.evidence.provenance_type.database.id.toLowerCase();
                    }



                    // data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );


                    // disease
                    row.push( item.disease.efo_info.label );


                    // mutation
                    var mut = cttvDictionary.NA;
                    if( checkPath(item, "variant.id") && item.variant.id[0]){
                        var rsId = item.variant.id[0].split('/').pop();
                        mut = "<a class='cttv-external-link' href=http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=" + rsId + " target=_blank>" + rsId + "</a>";
                    }
                    row.push(mut);


                    // mutation consequence
                    if( item.type === 'genetic_association' && checkPath(item, "evidence.gene2variant") ){
                        row.push( clearUnderscores( getEcoLabel(item.evidence.evidence_codes_info, item.evidence.gene2variant.functional_consequence.split('/').pop() ) ) );
                    } else if( item.type === 'somatic_mutation' ){
                        row.push( clearUnderscores(item.type) );
                    } else {
                        row.push( "Curated evidence" );
                    }


                    // evidence source
                    if( item.type === 'genetic_association' && checkPath(item, "evidence.variant2disease") ){
                        row.push( "<a class='cttv-external-link' href='" + item.evidence.variant2disease.urls[0].url + "' target=_blank>" + item.evidence.variant2disease.urls[0].nice_name + "</a>" );

                    } else {
                        // Do some cleaning up for gene2Phenotype:
                        // TODO: this will probably be removed once we reprocess the data and put the nicely formatted text and URL in the data;
                        // I leave the hard coded strings in on purpose, so hopefully I'll remember to remove this in the future.
                        // I'm setting manually:
                        //  1) URL
                        //  2) the text of the link
                        if( db == cttvConsts.dbs.GENE_2_PHENOTYPE ){
                            row.push( "<a class='cttv-external-link' href='http://www.ebi.ac.uk/gene2phenotype/search?panel=ALL&search_term=" + ($scope.search.info.gene.approved_symbol || $scope.search.info.gene.ensembl_external_name) + "' target=_blank>Further details in Gene2Phenotype database</a>" );
                        } else {
                            row.push( "<a class='cttv-external-link' href='" + item.evidence.urls[0].url + "' target=_blank>" + item.evidence.urls[0].nice_name + "</a>" );
                        }

                    }



                    // publications
                    var refs = [];

                    if( item.type === 'genetic_association'){
                        if ( checkPath(item, "evidence.variant2disease.provenance_type.literature") ) {
                            refs = item.evidence.variant2disease.provenance_type.literature.references;
                        } else if( checkPath(item, "evidence.provenance_type.literature.references") ){
                            // this code might be redundant here:
                            // perhaps we don't need to check against genetic_association,
                            // but just check whether there is variant2disease field etc...
                            refs = item.evidence.provenance_type.literature.references;
                        }
                    } else {
                        if( checkPath(item, "evidence.provenance_type.literature.references") ){
                            refs = item.evidence.provenance_type.literature.references;
                        }
                    }

                    var pmidsList = cttvUtils.getPmidsList( refs );
                    row.push( cttvUtils.getPublicationsString( pmidsList ) );

                    // Publication ids (hidden)
                    row.push(pmidsList.join(", "));


                    // add the row to data
                    newdata.push(row);


                }catch(e){
                    $scope.search.tables.genetic_associations.rare_diseases.has_errors = true;
                    $log.warn("Error parsing rare disease data:");
                    $log.warn(e);
                }
            });

            return newdata;
        };


        var initRareDiseasesTable = function(){
            $('#rare-diseases-table').DataTable( cttvUtils.setTableToolsParams({
                "data": formatRareDiseaseDataToArray($scope.search.tables.genetic_associations.rare_diseases.data),
                "ordering" : true,
                "order": [[1, 'asc']],
                "autoWidth": false,
                "paging" : true,
                "columnDefs" : [
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level,
                        "width" : "3%"
                    },
                    {
                        "targets": [6],
                        "visible": false
                    },
                    {
                        "targets": [2,5],
                        "width": "14%"
                    },
                    {
                        "targets": [3,4],
                        "width": "22%"
                    }
                ],
            }, $scope.search.info.title+"-rare_diseases") );
        };



        // =================================================
        //  D R U G S
        // =================================================


        // DRUGS
        var getDrugData = function () {
            $scope.target = $scope.search.target;
            $scope.disease = $scope.search.disease;
        };


        // =================================================
        //  PATHWAYS
        // =================================================

            /*
            pathway 1   Target context  .biological_subject.properties.target_type
            pathway 2   Protein complex members .biological_subject.about
            pathway 3   Activity    .biological_subject.properties.activity
            pathway 4   Additional context  .evidence.properties.experiment_specific.additional_properties
            pathway 5   Provenance - SourceDB   .evidence.urls.linkouts
            pathway 6   Provenance - References .evidence.provenance_type.literature.pubmed_refs
            pathway 7   Date asserted   .evidence.date_asserted
            pathway 8   Evidence codes  .evidence.evidence_codes
            */



        var getPathwaysData = function(){
            $scope.search.tables.affected_pathways.is_loading = true;
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: 1000,
                datasource: $scope.search.tables.affected_pathways.source, //cttvConfig.evidence_sources.pathway,
                fields: [
                    "target",
                    "disease",
                    "evidence",
                    "access_level"
                ]
            };
            _.extend(opts, searchObj);
            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {
                        if( resp.body.data ){
                            $scope.search.tables.affected_pathways.data = resp.body.data;
                            initTablePathways();
                        } else {
                            $log.warn("Empty response : pathway data");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    //$scope.search.pathways.is_open = $scope.search.pathways.data.length>0 || false; // might trigger an error...
                    $scope.search.tables.affected_pathways.is_loading = false;
                });
        };


        /*
         *
         */
        var formatPathwaysDataToArray = function(data){
            var newdata = [];
            data.forEach(function(item){
                // create rows:
                var row = [];

                try{

                    // data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );

                    // disease
                    row.push(item.disease.efo_info.label);

                    // overview
                    row.push("<a class='cttv-external-link' href='" + item.evidence.urls[0].url+"' target='_blank'>" + item.evidence.urls[0].nice_name + "</a>");

                    // activity
                    row.push( cttvDictionary[item.target.activity.toUpperCase()] || clearUnderscores(item.target.activity) ); // "up_or_down"->"unclassified" via dictionary

                    // mutations
                    var mut = cttvDictionary.NA
                    if(item.evidence.known_mutations && item.evidence.known_mutations.length>0){
                        mut = arrayToList( item.evidence.known_mutations.map(function(i){return i.preferred_name || cttvDictionary.NA;}) , true );
                    }
                    row.push(mut);

                    // evidence codes
                    row.push("Curated in " + item.evidence.provenance_type.database.id );

                    // publications
                    var refs = [];
                    if( checkPath(item, "evidence.provenance_type.literature.references") ){
                        refs = item.evidence.provenance_type.literature.references;
                    }
                    var pmidsList = cttvUtils.getPmidsList( refs );
                    row.push( cttvUtils.getPublicationsString( pmidsList ) );

                    // Publication ids (hidden)
                    row.push(pmidsList.join(", "));



                    newdata.push(row); // use push() so we don't end up with empty rows

                }catch(e){
                    $scope.search.tables.affected_pathways.has_errors = true;
                    $log.error("Error parsing pathways data:");
                    $log.error(e);
                }
            });
            return newdata;
        };



        var initTablePathways = function(){
            $('#pathways-table').DataTable( cttvUtils.setTableToolsParams({
                "data" : formatPathwaysDataToArray($scope.search.tables.affected_pathways.data),
                "ordering" : true,
                "order": [[1, 'asc']],
                "autoWidth": false,
                "paging" : true,
                "columnDefs" : [
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level,
                        "width" : "3%"
                    },
                    {
                        "targets" : [7],
                        "visible" : false
                    },
                    {
                        "targets" : [3,4,5,6],
                        "width" : "14%"
                    },
                    {
                        "targets" : [1],
                        "width" : "18%"
                    }
                ],
            }, $scope.search.info.title+"-disrupted_pathways") );
        };



        // =================================================
        //  RNA expression
        // =================================================



        var getRnaExpressionData = function(){
            $scope.search.tables.rna_expression.is_loading = true;
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: 1000,
                datasource: $scope.search.tables.rna_expression.source, //cttvConfig.evidence_sources.rna_expression,
                fields: [
                    "disease",
                    "evidence",
                    "target",
                    "access_level"
                ]
            };
            _.extend(opts, searchObj);
            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {
                        if( resp.body.data ){
                            $scope.search.tables.rna_expression.data = resp.body.data;
                            initTableRNA();
                        } else {
                            $log.warn("Empty response : RNA expression");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    //$scope.search.tables.rna_expression.is_open = $scope.search.tables.rna_expression.data.length>0 || false;
                    $scope.search.tables.rna_expression.is_loading = false;
                });
        };



        /*
         * Takes the data object returned by the API and formats it to an array of arrays
         * to be displayed by the RNA-expression dataTable widget.
         */
        var formatRnaDataToArray = function(data){
            var newdata = [];
            data.forEach(function(item){
                // create rows:
                var row = [];

                try{

                    // data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );

                    // disease
                    row.push( item.disease.efo_info.label );

                    // comparison
                    row.push( item.evidence.comparison_name );

                    // activity
                    var activityUrl = item.evidence.urls[0].url;
                    var activity = item.target.activity.split("_").shift();
                    row.push( "<a class='cttv-external-link' href='"+ activityUrl +"' target='_blank'>" + activity +"</a>" );

                    // tissue / cell
                    row.push( item.disease.biosample.name );
                    // row.push( checkPath(data[i], "biological_object.properties.biosamples") ? data[i].biological_object.properties.biosamples : cttvDictionary.NA );

                    // evidence source
                    row.push( getEcoLabel( item.evidence.evidence_codes_info, item.evidence.evidence_codes[0]) );

                    // fold change
                    row.push( item.evidence.log2_fold_change.value );

                    // p-value
                    row.push( (item.evidence.resource_score.value).toExponential(2) );

                    // percentile rank
                    row.push( item.evidence.log2_fold_change.percentile_rank );

                    // experiment overview
                    var expOverview = (item.evidence.urls[2] || item.evidence.urls[0]).url || cttvDictionary.NA;
                    row.push( "<a class='cttv-external-link' href='"+expOverview+"' target='_blank'>" + (item.evidence.experiment_overview || "Experiment overview and raw data") + "</a>" );


                    // publications
                    var refs = [];
                    if( checkPath(item, "evidence.provenance_type.literature.references") ){
                        refs = item.evidence.provenance_type.literature.references;
                    }
                    var pmidsList = cttvUtils.getPmidsList( refs );
                    row.push( cttvUtils.getPublicationsString( pmidsList ) );

                    // Publication ids (hidden)
                    row.push(pmidsList.join(", "));


                    newdata.push(row); // push, so we don't end up with empty rows

                }catch(e){
                    $scope.search.tables.rna_expression.has_errors = true;
                    $log.log("Error parsing RNA-expression data:");
                    $log.log(e);
                }
            });
            //}

            return newdata;
        };



        var initTableRNA = function(){

            $('#rna-expression-table').DataTable( cttvUtils.setTableToolsParams({
                "data": formatRnaDataToArray($scope.search.tables.rna_expression.data),
                "order": [[1, 'asc']],
                "autoWidth": false,
                "paging" : true,
                "columnDefs" : [
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level,
                        "width" : "3%"
                    },
                    {
                        "targets": [11],
                        "visible": false
                    },
                    {
                        "targets" : [6,7,8],
                        "width" : "6%"
                    },
                    {
                        "targets" : [9,10],
                        "width" : "12%"
                    },
                    {
                        "targets" : [2,5],
                        "width" : "13%"
                    },
                    {
                        "targets" : [3,4],
                        "width" : "10%"
                    }
                ],
            }, $scope.search.info.title+"-RNA_expression") );
        };



        // =================================================
        //  S O M A T I C   M U T A T I O N S
        // =================================================



        var getMutationData = function(){
            //$log.log("getMutationData()");
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: 1000,
                datasource: $scope.search.tables.somatic_mutations.source, //cttvConfig.evidence_sources.somatic_mutation ,
                fields: [
                    "disease.efo_info", // disease
                    "evidence.evidence_codes_info",  // evidence source
                    "evidence.urls",
                    "evidence.known_mutations",
                    "evidence.provenance_type",
                    "evidence.known_mutations",
                    "access_level",
                    "unique_association_fields.mutation_type",
                    "target.activity",
                    "sourceID"
                ]
            };
            _.extend(opts, searchObj);
            $scope.search.tables.somatic_mutations.is_loading = true;
            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {
                        if( resp.body.data ){
                            $scope.search.tables.somatic_mutations.data = resp.body.data;
                            initTableMutations();
                        } else {
                            $log.warn("Empty response : somatic mutations");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    //$scope.search.tables.somatic_mutations.is_open = $scope.search.tables.somatic_mutations.data.length>0 || false;
                    $scope.search.tables.somatic_mutations.is_loading = false;
                });
        };



        /*
         *
         */
        var formatMutationsDataToArray = function(data){
            var newdata = [];
            data.forEach(function(item){
                var row = [];
                try{

                    // col 0: data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );

                    // col 1: disease
                    row.push(item.disease.efo_info.label);


                    var mut = cttvDictionary.NA;
                    var samp = cttvDictionary.NA;
                    var patt = cttvDictionary.NA;


                    if(item.evidence.known_mutations){

                        // col 2: mutation type
                        if(item.sourceID == cttvConsts.dbs.INTOGEN){
                            mut = item.target.activity || mut;
                        } else {
                            mut = item.evidence.known_mutations.preferred_name || mut;
                        }



                        // col 3: samples
                        if( item.evidence.known_mutations.number_samples_with_mutation_type ){
                            samp = item.evidence.known_mutations.number_samples_with_mutation_type+"/"+item.evidence.known_mutations.number_mutated_samples || samp;
                        }


                        // col 4: inheritance pattern
                        patt = item.evidence.known_mutations.inheritance_pattern || patt;
                    }


                    row.push( clearUnderscores( mut ) );
                    row.push( samp );
                    row.push( patt );


                    // col 5: evidence source
                    row.push("<a href='"+item.evidence.urls[0].url+"' target='_blank' class='cttv-external-link'>"+item.evidence.urls[0].nice_name+"</a>");

                    // cols 6: publications
                    var refs = [];
                    if( checkPath(item, "evidence.provenance_type.literature.references") ){
                        refs = item.evidence.provenance_type.literature.references;
                    }
                    var pmidsList = cttvUtils.getPmidsList( refs );
                    row.push( cttvUtils.getPublicationsString( pmidsList ) );

                    // col 7: pub ids (hidden)
                    row.push(pmidsList.join(", "));



                    newdata.push(row); // push, so we don't end up with empty rows
                }catch(e){
                    $scope.search.tables.somatic_mutations.has_errors = true;
                    $log.log("Error parsing somatic mutation data:");
                    $log.log(e);
                }
            });

            return newdata;
        };



        var initTableMutations = function(){

            $('#mutations-table').DataTable( cttvUtils.setTableToolsParams({
                "data": formatMutationsDataToArray($scope.search.tables.somatic_mutations.data),
                //"ordering" : true,
                "order": [[1, 'asc']],
                "autoWidth": false,
                "paging" : true,
                "columnDefs" : [
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level,
                        "width" : "3%"
                    },
                    {
                        "targets" : [7],    // the access-level (public/private icon)
                        "visible" : false
                    },
                    // now set the widths
                    {
                        "targets" : [1,2,4,5],
                        "width" : "18%"
                    },
                    {
                        "targets" : [3],
                        "width" : "9%"
                    },
                    /*{
                        "targets" : [4],
                        "width" : "22%"
                    },
                    {
                        "targets" : [0],
                        "width" : "0%"
                    }*/
                ],
            }, $scope.search.info.title+"-somatic_mutations") );
        };



        // =================================================
        //  M O U S E   D A T A
        // =================================================

        /*
        Probability:
        evidence.association_scrore.probability.value

        Mouse phenotypes:
        show the values for each key (e.g. circling, imapired balance, deafness, etc)
        evidence.properties.evidence_chain[1].biological object.properties.experiment_specific

        Human phenotypes:
        same as for moouse phenotypes
        biological object.properties.experiment specific
        */

        var getMouseData = function(){
            $scope.search.tables.animal_models.is_loading = true;
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: 1000,
                datasource: $scope.search.tables.animal_models.source, //cttvConfig.evidence_sources.animal_model,
                fields: [
                    "disease",
                    "evidence",
                    "scores",
                    "access_level"
                ]
            };
            _.extend(opts, searchObj);
            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {
                        if( resp.body.data ){
                            $scope.search.tables.animal_models.data = resp.body.data;
                            initTableMouse();
                        } else {
                            $log.warn("Empty response : animal models data");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    //$scope.search.mouse.is_open = $scope.search.mouse.data.length>0 || false;
                    $scope.search.tables.animal_models.is_loading = false;
                });
        };



        /*
         *
         */
        var formatMouseDataToArray = function(data){
            var newdata = [];
            data.forEach(function(item){
                // create rows:
                var row = [];

                try{

                    // data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );

                    // disease
                    row.push(item.disease.efo_info.label);    // or item.disease.efo_info.label ???

                    // human
                    row.push( "<ul>" + item.evidence.disease_model_association.human_phenotypes.map(function(hp){return "<li>"+hp.label+"</li>"}).join("") + "</ul>" );

                    // mouse
                    row.push( "<ul>" + item.evidence.disease_model_association.model_phenotypes.map(function(hp){return "<li>"+hp.label+"</li>"}).join("") + "</ul>" );

                    // mouse model
                    var mousemodel = processMouseModelLinks( item.evidence.biological_model.allelic_composition, item.evidence.biological_model.allele_ids )
                                     + "<br/ >"
                                     + "<span class='small text-lowlight'>"+item.evidence.biological_model.genetic_background+"</span>"
                    row.push(mousemodel);


                    // evidence source
                    row.push(cttvDictionary.PHENODIGM);

                    // score -- hidden column now
                    row.push((item.scores.association_score).toFixed(2));


                    newdata.push(row); // push, so we don't end up with empty rows
                }catch(e){
                    $scope.search.tables.animal_models.has_errors = true;
                    $log.error("Error parsing mouse data:");
                    $log.error(e);
                }
            });

            return newdata;
        };



        var initTableMouse = function(){

            $('#mouse-table').DataTable( cttvUtils.setTableToolsParams({
                "data": formatMouseDataToArray($scope.search.tables.animal_models.data),
                "autoWidth": false,
                "paging" : true,
                "ordering" : true,
                "order": [[6, 'des']],
                "columnDefs" : [
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level,
                        "width" : "3%"
                    },
                    {
                        "targets" : [6],    // score
                        "visible" : false
                    },
                    {
                        "targets" : [2,3,4],
                        "width" : "20%"
                    },
                    {
                        "targets" : [5],
                        "width" : "10%"
                    }
                ],
            }, $scope.search.info.title+"-mouse_models") );
        };



        /*
         * Takes a string like "Casr<Nuf>/Casr<+>" and returns "Casr<sup>Nuf</sup>/Casr<sup>+</sup>"
         */
        var processMouseModelData = function(mmd){
            return mmd.replace(/<(.*?)>/g, function(match){return "<sup>"+match.substr(1,match.length-2)+"</sup>";});
        };



        /*
         * Takes a string like "Casr<Nuf>/Casr<+>" and a string of ids like "MGI:3054788|MGI:3054788"
         * returns the original string with <a href> tags around each part "Casr<Nuf>" and "Casr<+>"
         */
        var processMouseModelLinks = function(mmd, id){
            var mmds = mmd.split("/");
            var ids = id.split("|");
            for(var i=0; i<mmds.length; i++){
                if(ids[i]){
                    mmds[i] = "<a href='http://informatics.jax.org/accession/"+ids[i]+"' target='_blank'>" + processMouseModelData(mmds[i]) + "</a>";
                }
            }
            return mmds.join("/");
        };



        // =================================================
        //  L I T E R A T U R E
        // =================================================

        /*
        Literature data for the "Text mining" table. Table fields are:
          - Disease: disease name (string)
          - Publication: publication description (string, long text)
          - Year: number
        */

        function parseResponse (recs, dt) {
        	
            //$log.log("parseResponse():recs", recs);
            //$log.log("parseResponse():dt", dt);
            dt.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
                var data = this.data(); //data is previously preformatted table data that we need to add abstract info that came from pm
                //$log.log("parseResponse():data", data);

                var pmdata = recs.filter(function(item){
                    return item.pmid == data[2];
                });
                //$log.log("parseResponse():pmdata",pmdata);
                if(pmdata.length>0){

                    data[3]="";
                    var pub = pmdata[0];
                    // format author names
                    var auth = pub.authorString;

                    var authArr = [];
                    if (auth) {
                        authArr = auth.split(",");
                        data[9]=pub.authorString;
                    }
                    else{
                    	data[9] = "";
                    }
                    if(auth && auth.length>1){
                        authArr[0] = authArr[0] + " <span class='cttv-author-et-al'>et al.</span>";
                    }

                    if(authArr[0]){
                    	auth = authArr[0];
                    }
                    else{
                    	auth = "";
                    }

                    var abstractSection = "Abstract";
                    var abstractText = pub.abstractText?pub.abstractText:"No abstract supplied.";
                    var abstract = "<div id='"+data[2]+ abstractSection +"'>"+  abstractText+"</div>";

                    var abstractString ="<p class='small'><span onclick='angular.element(this).scope().displaySentences(\""+data[2]+ abstractSection +"\")'style='cursor:pointer'><i class='fa fa-chevron-circle-down' aria-hidden='true'></i>&nbsp;<span class='bold'>Abstract</span></p>";
                    var matchedSentences = $('#literature-table').DataTable().row(rowIdx).data()[5]; //this is details

                    var title = pub.title;
                    var abstractSentences;

                    if ($scope.search.tables.literature.abstractSentences[data[2]][data[6]]) {
                        abstractSentences = $scope.search.tables.literature.abstractSentences[data[2]][data[6]][data[7]];
                    }
                    if (abstractSentences && abstract) {

                        abstractSentences.map (function (f) {
                            var pos = abstract.indexOf(f.raw);
                            // console.log("    POS: " + pos);
                            //abstract = abstract.replace(f.raw, f.formattedHighlighted);
                            abstract = abstract.replace(f.raw, f.formatted);
                            //console.log("f.raw=", f.raw);
                            //console.log("f.formatted=", f.formatted);

                            // If not in the abstract, try the title
                            if (pos === -1) {
                                pos = title.indexOf(f.raw);
                                title = title.replace(f.raw, f.formatted);
                            }
                        });

                    }
                    var journalVolume = pub.journalInfo.volume ? pub.journalInfo.volume:"";
                    var journalIssue = pub.journalInfo.issue  ? "(" + pub.journalInfo.issue + ")":"";
                    var pageInfo     = pub.pageInfo ? ":" + pub.pageInfo:"";
                    var journalInfo = (pub.journalInfo.journal.medlineAbbreviation || pub.journalInfo.journal.title)+ " " + journalVolume + journalIssue + pageInfo;
                    if(!journalInfo){
                    	journalInfo = "";
                    }
                    var titleAndSource = "<span class=large><a href='#' onClick='angular.element(this).scope().openEuropePmc("+pub.pmid+")'>"+title+"</a></span>"
                        + "<br />"
                        + "<span class=small>"+auth +" "+journalInfo+ "</span>";

                    data[3] += titleAndSource + "<br/><br/>" +abstractString +abstract+ " <p class=small>" + (matchedSentences || "no matches available") + "</p>"
                    data[4] = pub.journalInfo.yearOfPublication; //this is column 4

                    data[8]=title;

                    data[10]=journalInfo;
                    var URL = "http://europepmc.org/abstract/MED/"+pub.pmid;

                    if(pub.abstractText){
                    	data[11]= pub.abstractText;
                    }

                    data[13]=URL;
                    //console.log("dataAfter", data);

                }
                this.data(data);

            } );

            dt.draw();
        }



        var getLiteratureData = function(){
            $scope.search.tables.literature.is_loading = true;
            $scope.search.tables.literature.maxShow = 200;
            var opts = {
                target:$scope.search.target,
                disease:$scope.search.disease,
                size: $scope.search.tables.literature.maxShow,
                datasource: $scope.search.tables.literature.source //cttvConfig.evidence_sources.literature,
                // TODO: change to 'datatype: literature' once available in the API; for now disgenet will do the trick.
            };
            _.extend(opts, searchObj);
            return cttvAPIservice.getFilterBy( opts ).
                then(
                    function(resp) {

                        if( resp.body.data ){

                            $scope.search.tables.literature.total = resp.body.total;

                            var unicode_re = /u([\dABCDEF]{4})/gi;
                            var match;

                            var sortedByDate = resp.body.data.sort (function (a, b) {
                                return new Date(b.evidence.date_asserted) - new Date(a.evidence.date_asserted);
                            });

                            var abstractSentences = {};
                            sortedByDate.map (function (paper) {

                                // WARNING: Unicode characters are encoded in the response, we convert them to symbol

                                paper.evidence.literature_ref.mined_sentences.map (function (sentence) {
                                    sentence.breakpoints = [];
                                    var text = sentence.text;
                                    while ((match = unicode_re.exec(text)) !== null) {
                                        var pos = match.index;
                                        sentence.text = sentence.text.replace('u'+match[1], String.fromCharCode(parseInt(match[1], 16)));
                                        sentence.breakpoints.push({
                                            "type": "unicode",
                                            "pos": pos,
                                            "extra": "",
                                            "span": 1
                                        });

                                    }
                                });
                            });

                            // create breakpoints for each sentence (unicodeChars, targets and diseases)
                            // Order the breakpoints
                            sortedByDate.map (function (paper) {
                                var pubmedId = paper.evidence.literature_ref.lit_id.split("/").pop();
                                if (!abstractSentences[pubmedId]) {
                                    abstractSentences[pubmedId] = {};
                                }
                                paper.evidence.literature_ref.mined_sentences.map (function (sentence) {

                                     if (sentence.t_start !== sentence.t_end) {
                                         sentence.breakpoints.push({
                                            "type": "t_start",
                                            "pos": sentence.t_start,
                                            "extra": '<span class="highlight-primary text-content-highlight">'
                                        });
                                        sentence.breakpoints.push({
                                            "type": "t_end",
                                            "pos": sentence.t_end+1,
                                            "extra": "</span>"
                                        });
                                     }

                                    if (sentence.d_start !== sentence.d_end) {
                                        sentence.breakpoints.push({
                                            "type": "d_start",
                                            "pos": sentence.d_start,
                                            "extra": '<span class="highlight-warning text-content-highlight">'
                                        });
                                        sentence.breakpoints.push({
                                            "type": "d_end",
                                            "pos": sentence.d_end+1,
                                            "extra": "</span>"
                                        });
                                    }
                                    // Sort the breakpoints by pos
                                    sentence.breakpoints = sentence.breakpoints.sort(function (a, b) {
                                        return a.pos - b.pos;
                                    });

                                    // Calculate the acc of offsets
                                    sentence.breakpoints = _.reduce(sentence.breakpoints, function (bps, bp, i) {
                                        bp.acc = i? (bps[i-1].acc + bps[i-1].extra.length) : 0;
                                        bps.push (bp);
                                        return bps;
                                    }, []);

                                    var text = sentence.text;
                                    // console.log("ORIG: " + text);
                                    sentence.breakpoints.map (function (bp) {
                                        // console.log(bp);
                                        if (bp.extra) {
                                            text = text.slice(0, bp.pos+bp.acc) + bp.extra + text.slice(bp.pos+bp.acc);
                                        }
                                        // console.log("=> " + text);
                                    });


                                    if (sentence.section === "abstract" || sentence.section === "title") {
                                        var efo = paper.disease.id;
                                        if (!abstractSentences[pubmedId][formatSource(paper.sourceID)]) {
                                            abstractSentences[pubmedId][formatSource(paper.sourceID)] = {};
                                        }
                                        if (!abstractSentences[pubmedId][formatSource(paper.sourceID)][efo]) {
                                            abstractSentences[pubmedId][formatSource(paper.sourceID)][efo] = [];
                                        }

                                        var highlightedSentence = '<span class="highlight-info text-content-highlight">' + text + '</span>';
                                        if (sentence.section === "abstract") {

                                           	abstractSentences[pubmedId][formatSource(paper.sourceID)][efo].push({
                                                'raw': sentence.text.trim(),
                                                'formatted':text,
                                                'formattedHighlighted':highlightedSentence
                                            });
                                        }
                                        else {//title
                                            abstractSentences[pubmedId][formatSource(paper.sourceID)][efo].push({
                                                'raw': sentence.text.trim(),
                                                'formatted':text
                                            });
                                        }
                                    }
                                    if (sentence.section === "abstract"){
                                        sentence.formattedHighlightedText = '<span class="highlight-info text-content-highlight">' + text + '</span>';
                                    }

                                    sentence.formattedText = text;

                                });
                            });


                            $scope.search.tables.literature.data = sortedByDate;
                            $scope.search.tables.literature.abstractSentences = abstractSentences;

                            var dt = initTableLiterature();
                            getLiteratureAbstractsData(dt);
                        } else {
                            $log.warn("Empty response : literature");
                        }
                    },
                    cttvAPIservice.defaultErrorHandler
                ).
                finally(function(){
                    $scope.search.tables.literature.is_loading = false;
                });
        };


        var formatSource = function (id) {
            var formatted;
            switch (id) {
                case 'europepmc':
                    formatted = cttvDictionary.EPMC; //"Europe PMC"; // using the dictionary to avoid duplicate hardcoded content
                    break;
                case 'disgenet':
                    formatted = cttvDictionary.DISGENET; //"DisGeNET";
                    break;
            }
            return formatted;
        };

        var getLiteratureAbstractsData = function(dt){
            $scope.loading = true;
            $scope.loaded = 0;

            // The expans_efo option may be retrieving the same article multiple times
            // Filter unique entries:
            var uniq = {};
            $scope.search.tables.literature.data.map (function (rec) {
                uniq[rec.evidence.literature_ref.lit_id.split("/").pop()] = 1;
            });
            var uniqPMIDs = Object.keys(uniq);
            // Chunk!
            var chunkSize = 10;
            var chunks = Math.ceil(uniqPMIDs.length / chunkSize);

            for (var i=0; i<chunks; i++) {
                var done = 0;
                //var thisRecords = $scope.search.tables.literature.data.slice(i*chunkSize, (i+1)*chunkSize);
                var thisRecords = uniqPMIDs.slice(i*chunkSize, (i+1)*chunkSize);
                var thisPMIDs = thisRecords.map(function (id) {
                    return "EXT_ID:" + id;
                }).join(" OR ");
                var url = "/proxy/www.ebi.ac.uk/europepmc/webservices/rest/search?pagesize=" + thisRecords.length + "&query=" + thisPMIDs + "&format=json&resulttype=core";
                //Should not this be a service call?
                $http.get(url)
                    .then (function (res) {
                        done++;
                        parseResponse(res.data.resultList.result, dt);
                        $scope.loaded = ~~(done * 100 / chunks);
                        if ($scope.loaded === 100) {
                            $timeout (function () {
                                $scope.loading = false;
                            }, 2000);

                        }
                    });
            }
        };

        var formatLiteratureDataToArray = function(data){

            var newdata = [];
            var cat_list = ["title", "intro", "result", "discussion", "conclusion", "other"];   // preferred sorting order

            data.forEach(function(item){

                // create rows:
                var row = [];

                // count number of sentences in a section
                var sectionCount = {};
                // Map that groups all sentences by section
                var sectionSentences = {};
                var sectionSentencesSimple = {};
                try{
                    // 0 data origin: public / private
                    row.push( (item.access_level==cttvConsts.ACCESS_LEVEL_PUBLIC) ? accessLevelPublic : accessLevelPrivate );

                    // 1 disease
                    row.push(item.disease.efo_info.label);

                    // 2 publication ID (hidden)
                    var parts = item.evidence.literature_ref.lit_id.split('/');
                    var id = parts.pop();
                    row.push( id );

                    // 3 publication
                    row.push( "<i class='fa fa-spinner fa-spin'></i>" );

                    // 4 total # of matched sentences
                    //row.push( '<a onclick="angular.element(this).scope().open('+newdata.length+')"><span class=badge>' + item.evidence.literature_ref.mined_sentences.length + '</span> ' + (newdata.length==1 ? ('sentence') : ('sentences')) + '</a>' );
                    //row.push( '<a class="literature-matched-sentences" onclick="angular.element(this).scope().open('+newdata.length+')"><span class=badge>' + item.evidence.literature_ref.mined_sentences.length + '</span></a>' );

                    // 4 year
                    row.push("<i class='fa fa-spinner fa-spin'></i>");

                    //  details (hidden)
                    // first sort the matched sentences by category to preferred order
                    item.evidence.literature_ref.mined_sentences.sort(function(a,b){
                        var a = a.section.toLowerCase();
                        var b = b.section.toLowerCase();

                        var ai = cat_list.length;
                        var bi = cat_list.length;
                        cat_list.forEach(function(li, i){
                            if( a.substr(0, li.length) === li ){
                                ai = i;
                            }
                            if( b.substr(0, li.length) === li ){
                                bi = i;
                            }
                        })

                        return +(ai > bi) || +(ai === bi) - 1;
                    });

                    sectionCount = countSentences(item.evidence.literature_ref.mined_sentences);
                    sectionSentences = prepareSectionSentences(item.evidence.literature_ref.mined_sentences);
                    sectionSentencesSimple = prepareSectionSentencesSimple(item.evidence.literature_ref.mined_sentences);
                    var previousSection = null;

                    // 5 sentences grouped by section and sections are sorted already
                    row.push(
                        item.evidence.literature_ref.mined_sentences.map(function(sent){

                        	var section = upperCaseFirst( clearUnderscores(sent.section));
                        	var sentenceString = "";
                        	if(section != 'Title' && section != 'Abstract') {

								if(previousSection != sent.section) {
									if(previousSection != null){ //this is not the first section with matched sentences
										sentenceString = sentenceString +'</div>';
									}
									sentenceString +="<p class='small'><span onclick='angular.element(this).scope().displaySentences(\""+ id + sent.section +"\")'style='cursor:pointer'><i class='fa fa-chevron-circle-down' aria-hidden='true'></i>&nbsp;<span class='bold'>" + section + ": </span>" + sectionCount[sent.section];
									sentenceString += " matched sentences</span></p>";
									previousSection = sent.section;

								}

								sentenceString += "<div id='" + id + sent.section + "' style='display:none'><ul style='margin-left: 10px;'>" + sectionSentences[sent.section] + "</ul></div>";
                        	}

                        	return sentenceString;
                        }).join("") + "</div>"
                    );

                    // 6 source like EuropePMC
                    row.push(checkPath(item, "sourceID") ? formatSource(item.sourceID) : "");

                    // 7 EFO (hidden)
                    row.push (item.disease.id);

                    // 8 this is hidden, map of categories and their matching sentences
                    row.push("<i class='fa fa-spinner fa-spin'></i>");
                    //9
                    row.push("<i class='fa fa-spinner fa-spin'></i>");
                    //10
                    row.push("<i class='fa fa-spinner fa-spin'></i>");
                    //11
                    row.push("<i class='fa fa-spinner fa-spin'></i>");

                    //12 less formatted matched sentences grouped
                    var previousSection1 = null;
                    var matchString = item.evidence.literature_ref.mined_sentences.map(function(sent){

                    	var sectionTitle = upperCaseFirst( clearUnderscores(sent.section));
                    	var sentenceString = "";

						if(previousSection1 != sent.section) { //see new section

							sentenceString +=  sectionTitle.toUpperCase() +": " ;
							previousSection1 = sent.section;
							sentenceString +=  sectionSentencesSimple[sent.section];
						}

                    	return sentenceString;
                    }).join("") + "</div>";

                    row.push(matchString);

                    //13
                    row.push("<i class='fa fa-spinner fa-spin'></i>");
                    newdata.push(row); // push, so we don't end up with empty rows


                }catch(e){
                    $scope.search.tables.literature.has_errors = true;
                    $log.error("Error parsing literature data:");
                    $log.error(e);
                }
            });


            return newdata;
        };

        // count the number of sentences in each section
        var countSentences = function(sentences) {
        	var count = {};
        	sentences.map(function(sentence) {

        		if(count[sentence.section] === undefined) {
        			count[sentence.section] = 1;
        		}
        		else {
        			count[sentence.section]++;
        		}
        	});

        	return count;
        };

        // group sentences in each section into one sentence
        var prepareSectionSentences = function(sentences) {
        	var sectionSentenceMap = {};
        	sentences.map(function(sentence) {

        		if(sentence.section != "abstract"){
	        		if(sectionSentenceMap[sentence.section] === undefined) {
	        			sectionSentenceMap[sentence.section] = "";
	        			sectionSentenceMap[sentence.section] +=  "<li>"+sentence.formattedText+"</li>";
	        		}
	        		else {
	        			sectionSentenceMap[sentence.section] +=  "<li>"+sentence.formattedText+"</li>";
	        		}
        		}
        	});

        	return sectionSentenceMap;
        };

        // group sentences in each section into one sentence
        var prepareSectionSentencesSimple = function(sentences) {
        	var sectionSentenceMap = {};
        	sentences.map(function(sentence) {
        		if(sectionSentenceMap[sentence.section] === undefined) {
        			sectionSentenceMap[sentence.section] = "";
        			sectionSentenceMap[sentence.section] +=  " "+sentence.formattedText+" ";
        		}
        		else {
        			sectionSentenceMap[sentence.section] +=  " "+sentence.formattedText+" ";
        		}
        	});

        	return sectionSentenceMap;
        };

		$scope.openEuropePmc = function(pmid){
			var URL = "http://europepmc.org/abstract/MED/"+pmid;
			window.open(URL);
		};

		$scope.open = function(id){
            var modalInstance = $uibModal.open({
              animation: true,
              template: '<div onclick="angular.element(this).scope().$dismiss()">'
                       +'    <span class="fa fa-circle" style="position:absolute; top:-12px; right:-12px; color:#000; font-size:24px;"></span>'
                       +'    <span class="fa fa-times"  style="position:absolute; top:-8px; right:-8px; color:#FFF; font-size:16px"></span>'
                       +'</div>'
                       +'<div class="cttv-literature-modal">'
                       +'<h5>Abstract</h5>'
                       +'<div>'+$('#literature-table').DataTable().row(id).data()[9]+'</div>'
                       +'</div>',

              size: 'lg',
              resolve: {
                items: function () {
                    return $scope.search.info;
                }
              }
            });

        };

        $scope.displaySentences = function(id) {

      		//make the collapse content to be shown or hide
      		$('#'+id).toggle("fast");
        };
        
        /**
         * Get the abstracts associated with the cluster cell selected
         */
        $scope.selectedCell = function(event) {
            $scope.cluster = event.group["label"];
            cttvAPIservice.getAbstract( {
            		// TODO: remove this for the real abstract search
                    target:$scope.search.target,
                    disease: $scope.search.disease,
            		datasource:'europepmc',
            		facets:'True',
            		abstract: $scope.cluster
                } ).
                then(
                    function(resp) {
                    	$scope.displayAbstracts = [];
                    	$scope.allData = resp.data;
                    	
                    	console.log("all data: ", $scope.allData);
                    	filterAbstracts($scope.slider.min, $scope.slider.max);
                    },
                    cttvAPIservice.defaultErrorHandler
                );
        }

        
        /**
         * Format the cluster data into groups
         */
        var formatClusterData = function(data) {
        	
        	var groups = [];
        	
        	for(var i=0; i< data.facets.abstract.buckets.length; i++) {
        		
        		var cluster = [];
        		
        		var term = data.facets.abstract.buckets[i];
        		
        		for(var j=0; j< term.cluster_terms.buckets.length; j++) {
        			
        			if(term.cluster_terms.buckets[j].key != term.key) {
        				cluster.push({"label": term.cluster_terms.buckets[j].key, "weight": term.cluster_terms.buckets[j].score});
        			}
        		}
        		
        		groups.push({"label": term.key, "groups": cluster, "weight": term.doc_count});
        	}

        	return groups;
        }

        
        /**
         * Get the cluster information for the foamtree,
         */
        var getCluster = function(){
        	
            // get cluster specific info
            cttvAPIservice.getCluster( {
                    target_id:$scope.search.target,
                    code: $scope.search.disease
                } ).
                then(
                    function(resp) {

                    	$scope.clusterData = formatClusterData(resp);
                    	$scope.displayAbstracts = resp.data;
                    	$scope.allData = resp.data;
		
                    	$scope.slider.min = getMinYear();
                    	$scope.slider.max = getMaxYear();
                    	$scope.slider.options.floor = getMinYear();
                    	$scope.slider.options.ceil = getMaxYear();
                        //$scope.clusterData = [{"groups": [{"label": "sod1"}, {"label": "mutant"}, {"label": "mutation"}, {"label": "mutant sod1"}, {"label": "al"}, {"label": "fals"}, {"label": "protein"}, {"label": "superoxide"}, {"label": "dismutase"}, {"label": "superoxide dismutase"}], "label": "sod1"}, {"groups": [{"label": "tdp-43"}, {"label": "fus"}, {"label": "c9orf72"}, {"label": "al"}, {"label": "repeat"}, {"label": "mutation"}, {"label": "ftld"}, {"label": "protein"}, {"label": "expansion"}, {"label": "inclusion"}], "label": "tdp-43"}, {"groups": [{"label": "motor"}, {"label": "al"}, {"label": "neuron"}, {"label": "mouse"}, {"label": "motor neuron"}, {"label": "spinal"}, {"label": "cord"}, {"label": "spinal cord"}, {"label": "cell"}, {"label": "model"}], "label": "motor"}, {"groups": [{"label": "patient"}, {"label": "al"}, {"label": "study"}, {"label": "al patient"}, {"label": "control"}, {"label": "use"}, {"label": "clinical"}, {"label": "group"}, {"label": "motor"}, {"label": "muscle"}], "label": "patient"}, {"groups": [{"label": "cell"}, {"label": "protein"}, {"label": "neurodegenerative"}, {"label": "brain"}, {"label": "disorder"}, {"label": "gene"}, {"label": "study"}, {"label": "use"}, {"label": "role"}, {"label": "human"}], "label": "cell"}];
                    },
                    cttvAPIservice.defaultErrorHandler
                );
        };
        

        var initTableLiterature = function(){
        	
        	console.log("table data: ", formatLiteratureDataToArray($scope.search.tables.literature.data));
            return $('#literature-table').DataTable( cttvUtils.setTableToolsParamsExportColumns({
                "data": formatLiteratureDataToArray($scope.search.tables.literature.data),
                "autoWidth": false,
                "paging" : true,
                "ordering" : true,
                "order": [ [4, 'desc']],   // order by year
                "columnDefs" : [
                    {
                        "targets" : [2,5,6,7,8,9,10,11,12,13],
                        "visible" : false,
                    },
                    {
                        "targets" : [0],    // the access-level (public/private icon)
                        "visible" : cttvConfig.show_access_level ,
                        "width" : "3%"
                    },
                    {
                        "targets" : [1], //disease?
                        "width" : "12%"
                    }
                ],
            }, $scope.search.info.title+"-text_mining") );
        };

        // =================================================
        //  H E L P E R   M E T H O D S
        // =================================================


        // =================================================
        //  S C O P E   M E T H O D S
        // =================================================

        $scope.sectionOpen=function(who) {
           $log.info("tdc:sectionOpen", who);
            // Fire a target associations tree event for piwik to track
            $analytics.eventTrack('evidence', {"category": "evidence", "label": who});
        };

        // =================================================
        //  M A I N   F L O W
        // =================================================

        $log.info("target-disease-controller");
        var path = $location.path().split("/");
        $log.info(path);
        // parse parameters
        $scope.search.target = path[2];
        $scope.search.disease = path[3];

        // and fire the info search
        getInfo();
        	
        getCluster();


        // get the data for the flower graph
        getFlowerData()
            .then(function(){
                // then get data for all then
                getCommonDiseaseData();
                getRareDiseaseData();
                getMutationData();
                getDrugData();
                getRnaExpressionData();
                getPathwaysData();
                getLiteratureData();
                getMouseData();
            });

        var render = function(new_state, old_state){
            var view = new_state["view"] || {};
            var sec = view.sec;
            if(sec && sec[0] && $scope.search.tables[ sec[0] ]){
                $scope.search.tables[ sec[0] ].is_open = true;

                // scrolling before we have the data is unlikely to work:
                // at best it will scroll a little bit, but not much, because there won't be any height to allow scolling
                // leaving this here for now.
                // TODO: will have to think of a more elegant way of managing this, for example load all data in sequence
                $anchorScroll( "tables" );
            }
        }

        $scope.$on(cttvLocationState.STATECHANGED, function (e, new_state, old_state) {
            // at the moment this shouldn't be trigger other than when rerouting from an old style link
            render( new_state, old_state );
        });

        // if old link, do a rerouting to new style links
        if( !cttvLocationState.getState()["view"] && cttvLocationState.getState()["sec"] ){
            $location.search( 'view=sec:' + cttvLocationState.getState()["sec"]);
        }

        render(cttvLocationState.getState(), cttvLocationState.getOldState());

    }]);
