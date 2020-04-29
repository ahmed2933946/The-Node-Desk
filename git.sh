#!/bin/bash
echo -n "Enter Commit for Node CRM: "
read commit

git add -A .
git commit -am "${commit}"
git push