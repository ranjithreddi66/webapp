The Open Targets Platform is a comprehensive and robust data integration for access to and visualisation of potential drug targets associated with disease. It brings together multiple data types and aims to assist users to identify and prioritise targets for further investigation.

A drug target can be a protein, protein complex or RNA molecule and it’s displayed by its gene name from the Human Gene Nomenclature Committee, [HGNC](http://www.genenames.org/). We integrate all the evidence to the target using [Ensembl stable IDs](http://www.ensembl.org/info/genome/stable_ids/index.html) and describe relationships between diseases by mapping them to [Experimental Factor Ontology](http://www.ebi.ac.uk/efo/) (EFO) terms.

The Platform supports workflows starting from a target or disease, and shows the available evidence for target – disease associations. Target and Disease profile pages showing specific information for both target (e.g baseline expression) and disease (e.g. Disease Classification) are also available.





#### Getting started with a text search

The search box is available on the [Open Targets Platform](https://www.targetvalidation.org/) homepage and at the top of every other page.

You can search for a disease name, a gene name (or official symbol) or a protein name (or symbol). You can also search for synonyms and abbreviations for both genes (e.g. p53) and diseases (AD for Alzheimers disease), provided these alternative names are listed in the original sources from which we get this data from, e.g. HGNC (for genes) and Experimental Factor Ontology (for diseases and phenotypes).





#### Diseases associated with a target

When you search for a target, you will get an overview of all potential diseases associated with it. You can filter the results of associations by Data types (e.g. Genetic associations, Somatic mutations) and Therapeutic area (e.g. Genetic disorder, Skin disease).

The associations are provided in three different views, Bubbles, Table and Tree, which are organised by tabs:

##### Bubbles View

In this view, we group diseases into 'bubbles' based on the disease ontology. Large bubbles correspond to a therapeutic area and consist of smaller bubbles representing diseases within this area. A disease can belong to several therapeutic areas and therefore can appear within more than one large bubble.

The strength of the association between the target and a disease is represented by the size of the bubble and the shade of its blue colour; the larger the bubble and the darker the blue, the stronger the association.

##### Table View

In this view, we list all diseases associated with target, ordered by the association score, which is colour coded. The darker the blue, the stronger the association. When there is no to support the association, the cells in this table are coloured in white. Evidence from highly specific terms of the disease ontology is aggregated to broader, parent terms. So, if you search for BRAF, you will see evidence for disease associations for higher terms such as neoplasm, or cancer.

You can order the associations by their scores for individual data types (e.g. Genetic associations, Somatic mutations). Use the search box to restrict the diseases displayed in the Table view. In our BRAF example above, if you type "lung", you will restrict the table to show diseases with the word 'lung' in their names.

##### Tree View

In the Tree view, you can visualise the evidence across the therapeutic areas in a tree that represents the relationships of diseases. Therapeutic areas have a square symbol (e.g. Genetic disorders), while the diseases (e.g. ovarian carcinoma) are represented as circles. The squares and circles are colour coded in blue, and the darker the blue, the stronger the association.





#### Targets associated with a disease

When you search for a disease, you will get to a page that shows an overview of all potential targets associated with the disease. This data is provided as a table, with cells ordered by the association score. The colour of the cells represents the strength of the association, ranging from white (no association) to dark blue (strong association). You can filter the targets by the data types supporting the association (e.g. Genetic associations, Somatic mutations), by pathway types containing the target (e.g. Signal Transduction, Metabolism) and by the class of the target associated with the disease (e.g. Surface antigen, Secreted protein).

You can also restrict the target displayed in the table.





#### The data sources for target-disease associations

We provide details of the evidence (e.g. UniProt) used for all the associations we have identified. Check our [Data Sources](/data_sources) to find out which evidence we have used in our computational analyses.

If you start your search with a disease, you can go to the evidence page by clicking on the cells in the table. If you would rather search for a gene, you get to the evidence page by clicking on the bubbles (Bubble view), the cells in the table (Table view) or the nodes in the tree (Tree view).

The evidence page shows a flower, where each petal represents one data source, e.g. Genetics, Somatic mutations. If the petal representing Somatic mutation data for example is coloured in dark blue, this means the association based on the Somatic mutations evidence is strong. In this page, we also display the detailed information for each evidence divided in sections or panels.





#### The target profile

When searching for a target, in addition to the list of diseases associated with it, you will also see at the top of the page the ‘View TARGET profile’ link e.g. <span class="cttv-link-quote">View BRAF profile</span>. Click on this to get information outside the context of a disease for your target of interest. This is the list of information (not disease related) for a target and the original resource the data is from:

*   Protein Information, [UniProt](http://www.uniprot.org/)
*   Variants, isoforms and genomic context, [Ensembl annotation](http://www.ensembl.org/info/genome/genebuild/genome_annotation.html) of genes and [Ensembl Variation](http://www.ensembl.org/info/genome/variation/index.html)
*   Protein baseline expression at the protein (or RNA) level, [Human Protein Atlas:](http://www.proteinatlas.org/)
*   RNA baseline expression, [Expression Atlas](https://www.ebi.ac.uk/gxa/home)
*   Gene Ontology, [Gene Ontology Consortium](http://geneontology.org/)
*   Protein Structure, [Protein Data Bank Europe](https://www.ebi.ac.uk/pdbe/)
*   Pathways, [Reactome](http://www.reactome.org/)
*   Drugs, [ChEMBL](https://www.ebi.ac.uk/chembl/)
*   Gene tree, [Ensembl Protein trees and orthologies](http://www.ensembl.org/info/genome/compara/homology_method.html)
*   Bibliography, UniProt





#### The disease profile

When searching for a disease, in addition to the list of targets associated with it, you will also see on the top of the page the ‘View DISEASE profile’ link e.g. <span class="cttv-link-quote">View Asthma profile</span>. Click on this to get disease specific information:

*   Synonyms: alternative names for the disease from [Experimental Factor Ontology](http://www.ebi.ac.uk/efo/) (EFO)
*   Drugs: all FDA-approved and marketed drugs to treat the disease from [ChEMBL](https://www.ebi.ac.uk/chembl/)
*   Classification: based on the relationships of the disease to parents and children within the EFO hierarchy





#### The score of target-disease associations

We allow for the prioritisation of targets by [scoring target-disease associations](/scoring) based on our data sources. Our scoring system varies from 0 to 1, the latter represents the strongest association, and it’s calculated based on the confidence levels in the evidence.





#### Filtering target-disease associations

You can filter the associations based on four categories:

*   Data types, e.g. Genetic Associations, Somatic mutations, Drugs
*   Therapeutic area, e.g. Genetic disorder, Eye disease
*   Pathway types, e.g. Signal Transduction, Cell Cycle
*   Target class, e.g. Enzyme, Ion channel

Each of those can be further filtered, e.g. you can select the GWAS catalog data under Genetic Associations.





#### Accessing the Open Targets Platform with an API

You can access all this data programmatically via our REST API services. We list the methods available, the supported formats and the endpoints in our [API documentation](/documentation/api).





#### How to cite us

If you use the Open Targets Platform in your work, please cite our latest paper ["Open Targets: a platform for therapeutic target identification and validation"](http://nar.oxfordjournals.org/content/early/2016/11/29/nar.gkw1055.full)





#### Connect with us

You can follow the team and keep up with the latest news on Open Targets through our social media channels [Twitter](https://twitter.com/targetvalidate/), [Facebook](https://www.facebook.com/OpenTargets/) and [LinkedIn](https://www.linkedin.com/company/centre-for-therapeutic-target-validation). If you’ve got questions or feedback, you can also [email us](mailto:support@targetvalidation.org).



