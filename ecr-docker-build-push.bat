cd "%~dp0"
cd hikidgo.classroomdirector.web
docker build --force-rm -t hikidgoclassroomweb .
cd ..\
aws ecr get-login-password --profile rusull | docker login --username AWS --password-stdin 332001752425.dkr.ecr.ca-central-1.amazonaws.com
docker tag hikidgoclassroomweb:latest 332001752425.dkr.ecr.ca-central-1.amazonaws.com/hikidgoclassroomweb:latest
docker push 332001752425.dkr.ecr.ca-central-1.amazonaws.com/hikidgoclassroomweb:latest