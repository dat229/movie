const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '75c4bdc287f4154c52376f5ca7af65b1',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;