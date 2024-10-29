const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2MxMmU2ZjE3MzAwNTAzNmMxZjE0NGNhYTE5MDA1NiIsIm5iZiI6MTczMDA3NjA1My40MzUzNDksInN1YiI6IjY3MWFlOGJjNGJlMTU0NjllNzBkYTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1pINpT1BiCjcA0WVDZpudWnjC5olggjgV1-h3h3jS6c',
   },
}

const url = 'https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1'

const getPlayingTV = async (url) => {
   try {
      const response = await fetch(url, options)
      const data = await response.json()
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      console.log(results)

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= results.length) break

            const tv = results[index]

            rowHtml += `
                    <div class="col-sm-6 p-3">
                       <div class="card">
                          <a href="./tv_detail.html?tv_id=${tv.id}">
                          <img src="https://image.tmdb.org/t/p/w200${tv.poster_path}" alt="${tv.name}">
                          </a>
                          <div class="card-body">
                             <p class="card-text title">${tv.name}</p>
                             <p class="card-text average">${Number(tv.vote_average.toFixed(1)) === 0.0 ? '미반영' : tv.vote_average.toFixed(1)}</p>
                             <p class="card-text overview">${tv.overview == '' ? '줄거리 없음' : tv.overview}</p>
                          </div>
                        </div>
                    </div>
                  `
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('error:', error)
   }
}

getPlayingTV(url)
