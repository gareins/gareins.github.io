#!/bin/bash

orig="orig/"
out="new/"
ctr=199

# Last ones were from 25.10

for img in $(find $orig -type f)
do
  echo $img
  magick "$img" -type Grayscale -resize x800 -quality 100 "$out$ctr.notoptim.jpg"
  cp "$out$ctr.notoptim.jpg" "$out$ctr.jpg"
  jpegoptim -s -m80 "$out$ctr.jpg"

  rm "$out$ctr.notoptim.jpg"

  ctr=$(($ctr+1))
done

echo $ctr
