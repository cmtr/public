#!/bin/bash

echo "Change filename in directory to lower case"

same=0;
changed=0;
for org in $(ls)
do
	new=$(echo $org | awk '{print tolower($0)}')
	if [ "$org" = "$new" ]
	then
		echo "Filename already lower case: $org"
		same=$((same+1))
	else
		mv $org $new
		echo "Filename change to lower case from '$org' to '$new'"
		changed=$((changed+1));
	fi
done

echo "Files not changed: $same"
echo "Files changed: $changed"
echo "Done"