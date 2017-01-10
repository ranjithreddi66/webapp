We collect data from various sources and combine them into categories called Data types to allow for target identification and prioritisation using our Open Targets Platform. We list our current data types and their data sources below. Note that data from an individual source can contribute to different Data types, e.g. data from EVA is observed in two data types, Genetic associations and Somatic mutations.




#### Genetic associations

Genetic associations are available for both common and rare (Mendelian) diseases and come from the following sources:

##### GWAS Catalog

The NHGRI-EBI [GWAS catalog](https://www.ebi.ac.uk/gwas/docs/about) provides evidence on the association of genes (targets) and common diseases. This data comes from the manual curation of published Genome Wide Association Studies (GWAS). The catalog gives a list of the genetic variants (e.g. SNPs) that are most associated with a disease, by genomic region. We include all associations with p-values ≤ 10-5, so that we broaden the coverage of diseases. We assess the link between variant and gene using the Open Targets custom annotation pipeline to find the association between a disease and its most likely target. Variants are assigned to a gene by first considering any deleterious consequence within the coding region of that gene, followed by whether the variant is located within introns or regulatory regions. If the variant is intergenic, it will be assigned to the promoter region of the nearest gene. The consequences of these variants are annotated using the [Variant Effect Predictor](http://www.ensembl.org/info/docs/tools/vep/index.html).

##### UniProt

The Universal Protein Resource ([UniProt](http://www.uniprot.org/)) provides protein sequence and functional information. It manually curates associations between genes and rare (Mendelian) diseases from literature and public databases. These curated variants must be in the coding region of a gene, deleterious, observed in patients, and segregating within their families.

##### UniProt literature

UniProt may curate target-disease associations but not provide a specific mutation in the coding region of a gene. We classify these variants as UniProt Literature.

##### European Variation Archive (EVA)

The EMBL-EBI [European Variation Archive](http://www.ebi.ac.uk/eva/?Home) (EVA) is a database of publicly available genetic variants, both short scale (e.g. SNPs) and large structural variants (e.g. larger deletions). For rare (Mendelian) diseases, EVA provides clinically relevant data for the variants that are pathogenic or likely pathogenic. This clinical information comes from [ClinVar](http://www.ncbi.nlm.nih.gov/clinvar/), and includes [](http://www.ncbi.nlm.nih.gov/omim)OMIM data.

##### Gene2Phenotype

The data in [Gene2Phenotype](http://www.ebi.ac.uk/gene2phenotype) (G2P) is produced and curated from the literature by consultant clinical geneticists in the UK. This data is comprised of both short scale (i.e. sequence variants such as SNPs) and large structural variants (e.g. copy number variants), and can allow targeted filtering of genome-wide data for diagnostic purposes. The variants were provided by [DECIPHER](https://decipher.sanger.ac.uk/index), a database of genomic variants and phenotypes in patients with developmental disorders.




#### Somatic mutations

Somatic mutation data refers to mutations that may have clinical or treatment implications in cancer and possibly other diseases. This data type is obtained from the following sources:

##### Cancer Gene Census

Cancer Gene Census is a catalogue of genes for which mutations have been causally implicated in cancer. The Catalogue of Somatic Mutations in Cancer ([COSMIC](http://cancer.sanger.ac.uk/cosmic)) at the Wellcome Trust Sanger Institute provides us with the set of genes associated with specific cancers in the Cancer Gene Census, in addition to other cancers associated with that gene in the COSMIC database.

##### European Variation Archive (EVA)

The EMBL-EBI [European Variation Archive](http://www.ebi.ac.uk/eva/?Home) (EVA) provides data on somatic mutations in both cancer and other diseases.

##### IntOGen

[IntOGen](http://bg.upf.edu/group/tools.php#intogen) provides somatic mutations, genes and pathways involved in tumorigenesis. We have imported the latest data from 6,792 samples across 28 cancer types ([Rubio-Perez et al](http://www.ncbi.nlm.nih.gov/pubmed/25759023)). In these new dataset, false mutation calls have been filtered out and additional expression data is available for a larger number of samples in certain tumour types. This IntOgen analysis is updated and has not yet been released on the IntOgen website; so there can be discrepancies between targetvalidation.org and the IntOgen site.





#### Drugs

This data type is currently comprised of only one data source:

##### ChEMBL

The EMBL-EBI [ChEMBL](https://www.ebi.ac.uk/chembl/) database provides evidence from known drugs that can be linked to a disease and a known target. ChEMBL contains compound bioactivity data against drug targets. We display the data on drugs that have been approved for marketing by the U.S Food and Drug Administration (FDA), in addition to some clinical candidates.





#### Affected pathways

This data type contains pathway information on biochemical reactions sourced from the following database:

##### Reactome

The [Reactome](http://www.reactome.org) database manually curates and identifies reaction pathways that are affected by pathogenic mutations.





#### RNA expression

This data type contains information on gene expression patterns under different biological conditions coming from the following resource:

##### Expression Atlas

The EMBL-EBI [Expression Atlas](https://www.ebi.ac.uk/gxa/home) provides information on genes that are differentially expressed. They report the changes on the levels of gene expression between normal and disease samples, or among disease samples from different studies. In addition to differential expression, they provide baseline expression information for each gene. This is available in the page containing the target profile.





#### Text mining

This data type contains evidence of target-disease association which is extracted automatically by mining the following literature database:

##### Europe PMC

The Europe PubMed Central ([Europe PMC](http://europepmc.org/)) provides evidence of links between targets and diseases. They mine the titles, abstracts and full text research articles from both PubMed and PubMed Central, and use an entity-to-entity recognition approach to detect co-occurrences of target and disease entities.





#### Animal models

Model organisms are a valuable source for the characterisation and identification of disease-gene associations, especially when the molecular basis and/or function of the candidate target are unknown. We use the data on animal models from PhenoDigm:

##### Phenodigm

The Wellcome Trust Sanger Institute [PhenoDigm](http://www.sanger.ac.uk/resources/databases/phenodigm/) database provides evidence on associations of targets and disease. It uses a semantic approach to map between clinical features observed in humans and mouse phenotype annotations. The phenotypic effects in mice are then mapped to phenotypes associated with human diseases, and matches are identified and scored.



