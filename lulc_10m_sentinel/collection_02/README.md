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