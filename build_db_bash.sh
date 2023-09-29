
docker build -t dev_diaries_mongodb .


docker run -d --name dev_diaries_mongodb_container -p 27017:27017 dev_diaries_mongodb
