<template>
  <div>
    <h1>Movie Search</h1>
    <div class="search">
      <input type="text" v-model="searchQuery" placeholder="Enter movie title">
      <button @click="searchMovies">Search</button>
    </div>
    <div v-if="searchResults.length > 0" class="movies">
      <div v-for="movie in searchResults" :key="movie.id" class="movie-card">
        <h2>{{ movie.title }}</h2>
        <div class="movie-details">
          <img :src="movie.poster_image_url" alt="Movie Poster" class="movie-image">
          <p>{{ movie.popularity_summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  h1 {
    text-align: center;
    color: #456;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }

  .search > input {
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 85%;
  }

  .search > button {
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #456;
    color: #fff;
  }

  .movies {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .movie-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    width: 40%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .movie-details {
    display: flex;
    align-items: center;
  }

  .movie-image {
    width: 100px;
    height: auto;
    margin-right: 10px;
  }
</style>

<script>
  export default {
    name: 'IndexPage',
    data() {
        return {
            searchQuery: '',
            searchResults: []
        };
    },
    methods: {
        async searchMovies() {
            try {
                const response = await fetch(`http://localhost:3001/movies?search=${this.searchQuery}`);
                const data = await response.json();
                this.searchResults = data;
            } catch (error) {
                console.error(error);
            }
        }
    } 
  } 
</script>