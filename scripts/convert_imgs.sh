#!/bin/bash

orig="original/"
out="new/"
ctr=0

for img in $(find $orig)
do
  echo $img
  convert -type Grayscale -resize x800 -quality 80 $img "$out$ctr.jpg"
  ctr=$(($ctr+1))
done

echo $ctr
