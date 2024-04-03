@echo off

cd prisma && prisma generate && tsc
cd ../validation && tsc