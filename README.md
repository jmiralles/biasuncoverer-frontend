# biasUncovered

## To run in dev

docker-compose -f docker-compose.dev.yml up

## To run in prod

docker-compose up


## API ENSPOINTS

GET `/api/results/1`  GET result with id 1

GET `/api/analysis/1`  GET analysis with id 1

GET `/api/files`  GET all files

GET `/api/bias`  GET all bias

GET `/api/analysis`  GET all analysis

GET `/api/algorithms`  GET all algorithms

POST `/api/analysis`  Create a new analysis

Schema:
```
{
    file_id: 1,
    bias_id: 2,
    algorithm_id: 3
}
````


POST `/api/file` Upload file

Schema:
```
{
    name: 1,
    providerId: 2
}
````


