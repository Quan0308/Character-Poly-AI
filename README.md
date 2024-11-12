# Agent server

### 1. Build the Docker Image

- Add .env in root dir

```bash
COZE_ACCESS_TOKEN=
COZE_BOT_ID=
```

- Run the following command to build the Docker image:

```bash
docker build -t my-app-image .
```

### 2. Run the Docker Container

- Run the following command to build the Docker image:

```bash
docker run -p 3001:3001 my-app-image
```

### 3. Test the API Endpoints

- Pass this API to browser

```bash
http://localhost:3001/agent/welcoming
```

- View the agent information in the browser
