@echo off
cd gezgezai-backend
start cmd /k "npm start"
cd ../gezgezai
start cmd /k "ionic serve"