# News list with search and filter 

The user interface of a news aggregator website fetches articles from diverse sources. Users can search articles by keywords and refine results by date, category, and source. Furthermore, users can personalize their news feeds. The website is designed for optimal viewing on mobile devices.

## Technologies

* nextJs
* reactJs
* redux(RTKQuery)
* ant design
* Docker

### Steps to Run the Project

1. Clone the Repository
2. Navigate to Project Directory
3. Build the Docker Image : Build the Docker image using the provided Dockerfile.
```
docker build -t news .

```
4. Run the Docker Container
```
 docker run -d -p 3000:3000 news
```
5. Access the Application : localhost:3000



