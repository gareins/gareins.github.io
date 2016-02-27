#!/bin/bash

orig="original/"
out="new/"

for img in $(find $orig)
do
  echo $img
  filename=$(basename "$img")
  convert -type Grayscale -resize x800 -quality 80 $img $out$filename
done
