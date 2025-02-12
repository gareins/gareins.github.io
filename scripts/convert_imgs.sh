#!/bin/bash

orig="original/"
out="new/"
ctr=0
cjpeg="../../gits/mozjpeg/build/cjpeg"

for img in $(find $orig -type f)
do
  echo $img
  convert -type Grayscale -resize x800 -quality 100 $img "$out$ctr.notoptim.jpg"
  $cjpeg -optimize -quality 80 "$out$ctr.notoptim.jpg" >"$out$ctr.jpg"
  jpegoptim -s "$out$ctr.jpg"

  rm "$out$ctr.notoptim.jpg"

  ctr=$(($ctr+1))
done

echo $ctr
