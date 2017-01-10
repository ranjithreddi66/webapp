#### What can I search for?

You can search for a disease name (e.g. Alzheimers), a gene name (e.g. apolipoprotein E), official gene symbol (e.g. APOE) and Ensembl gene IDs (e.g. ENSG00000130203) or a protein symbol (e.g. P02649). You may also be able to search for synonyms and abbreviations for both genes (e.g. APO-E) and diseases (e.g. AD).



#### What is a target?

A target can be a protein, protein complex or RNA molecule. We integrate evidence to the target through the gene that codes for it. If you search for a target and cannot find it, please [email us](mailto:support@targetvalidation.org).



#### How are diseases described?

We map diseases to ontology terms in the Experimental Factor Ontology. This enables us to integrate evidence from different sources and to describe relationships between diseases.



#### What is the Experimental Factor Ontology?

The [Experimental Factor Ontology](http://www.ebi.ac.uk/efo/) (EFO) provides a systematic, machine readable description of data elements available in public databases. It combines parts of several ontologies, such as diseases, phenotypes, anatomy, and chemical compounds. The EFO is the core ontology for Open Targets.



#### Where does the data come from?

The data comes from a number of public databases, such as GWAS Catalog, EVA, UniProt, Expression Atlas, ChEMBL, DECIPHER, IntOGen, and others. These databases are the [Open Targets Platform Data Sources](/data_sources).



#### How is the association score calculated?

We calculate a score for each evidence from the different data sources (e.g. GWAS catalog, EVA) to summarise the strength of the evidence. The score will depend on factors that affect the relative strength of an evidence, for example p values and sample size for the GWAS data.

Once we have the scores for each evidence, we calculate an overall score by taking into account the sum of the [harmonic progression](https://en.wikipedia.org/wiki/Harmonic_progression_(mathematics)) of each score and adjusting the contribution of each of them using a heuristic weighting.



#### I’m looking at a target profile and found some articles linked to my target. Where does the bibliography come from?

We link the gene to its protein and get the list of articles from the Publications section in [UniProt](http://www.uniprot.org/).



#### Do you use the information I’ve searched for in platform?

We do not analyse the nature (e.g disease or target names) of any specific queries via the web application. We use standard encryption methods (e.g. https://) to maintain the security of the searches. For further details check the [Terms of use for the Open Targets Platform](/terms_of_use).

Note that some of the components of the site are provided by third parties, or make use of services provided by third parties, mostly from EMBL-EBI resources. We provide links to these external resources, and the use of their services is covered by their own terms of use. We may however use some metrics on the usage of pages and icons on the platform to improve its visualisation aspects.



#### How do I cite the Open Targets Platform?

If you use our platform in your work, please include its URL, i.e. www.targetvalidation.org in your publication or presentation.



#### Can I download data from the Open Targets Platform?

Yes, you can download our data as compressed JSON files. These [file dumps are available](/downloads/data) for the target-disease association objects and the evidence objects, the latter used to calculate each association. Both association and evidence objects are also available programmatically via our API (check our [API documentation](/documentation/api)).



#### How can I contact the team?

If you’ve got questions or feedback, [email us](mailto:support@targetvalidation.org). You can also follow the team and keep up with the latest news on Open Targets and its Open Targets Platform through our social media channels [Twitter](https://twitter.com/targetvalidate), [Facebook](https://www.facebook.com/OpenTargets) and [LinkedIn](https://www.facebook.com/OpenTargets).



