# Running the Node.js Backend

The Node.js backend is dependent on a `.env` file being present in the webservice directory. The `.env` file contiains the `ACCESS_TOKEN` for TMDB API. To run the Node.js backend, follow these steps:

1. Open your terminal.

2. Navigate to the `webservice` directory:

    ```bash
    cd webservice
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    node server.js
    ```

The server should now be running at `http://localhost:3001`