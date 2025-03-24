<div class="fluid-row" id="header">
    <img src='./misc/logo_geokarten.png' height='90' width='auto' align='right'>
    <h1 class="title toc-ignore">Pampa</h1>
    <h4 class="author"><em>Developed by  GeoKarten - schirmbeck.j@gmail.com</em></h4>
</div>

# About
This folder contains the scripts to classify and post-process the Pampa Biome.
 
We recommend that you read the MapBiomas Appendix of the Algorithm Theoretical Basis Document ([ATBD](https://brasil.mapbiomas.org/wp-content/uploads/sites/4/2023/08/Pampa-Appendix-ATBD-Collection-8_v1_30ago2023.pdf)).

# How to use
First, you need to copy these scripts  to your Google Earth Engine (GEE) account. To run these scripts, their  needs adjust to our data assets.
The process has been divided in 5 steps, this steps consist in:
* Step 1 - Prepare samples dataset to train Random Forest classifier.
* Step 2 - Classification by region, the Pampa Biome has been divided in 7 regions
* Step 3 - Post classification process
* Step 4 - Mosaic the pos classification images to obtain the biome map
* Step 5 - export the biome map in different images, one image per year.
# List of scripts:
# Prepare samples dataset to train Random Forest classifier.
* ***Step001A_export_estable_regions_from_coll_8.js***: export stable area maps for al time series            
* ***Step001B_merge_stable_and_reference_samples.js***: use reference map to leiter stable area maps                
* ***Step001C_export_stable_sample_points.js***: apply à random selection on stable map to build the training dataset                
* ***Step001D_export_annual_training_sample.js***: export annual mosaic information tho the training dataset built in previous step.

# Step 2 - Classification by region, the Pampa Biome has been divided in 7 regions
Te following sprits runing the random forest classification to the 7 Pampa regions:

* ***Step002_classify_region_01.js***                        
* ***Step002_classify_region_02.js***                        
* ***Step002_classify_region_03.js***                        
* ***Step002_classify_region_04.js***                        
* ***Step002_classify_region_05.js***                        
* ***Step002_classify_region_06.js***                        
* ***Step002_classify_region_07.js***                        

# Step 3 - Post classification process

* ***Step003_Filter_01_gap_region.js***: filter to replace pixels classified as Non-Observed;
* ***Step003_Filter_02_spatial_region.js***: this filter uses a mask to change only those patches with pixels connected to five or less pixels of the same class;

The following scripts run the temporal filter. The temporal  filter uses the information from the previous year and the year later to identify and correct a pixel misclassification;
* ***Step003_Filter_03a_temporal_region.js***           
* ***Step003_Filter_03a_temporal_region.js***   

* ***Step003_Filter_04_frequency_region.js***: this filter was applied to use the temporal information available for each pixel to correct cases of false positives;

* ***Step003_Filter_05a_arrange_incidence_mode_region.js***: prepare data to run incident filter;

* ***Step003_Filter_05b_incidence_region.js***: this filter was applied to correct the classification of pixels considered with an excessive amount of changes over the 37 years;

* ***Step003_Filter_06_time-series_start-end_region.js***
* ***Step003_Filter_07_temporal_stability_region.js***
* ***Step003_Filter_08_particular_cases_region.js***
* ***Step003_Filter_09a_ending_spatial_region.js***
* ***Step003_Filter_09b_ending_temporal_region.js***

# Step 4 - Mosaic the pos classification images to obtain the biome map
* ***Step004_Mosaic_regions.js***                      

# Step 5 - export the biome map in different images, one image per year.
* ***Step005_Year_by_year_exports.js***
