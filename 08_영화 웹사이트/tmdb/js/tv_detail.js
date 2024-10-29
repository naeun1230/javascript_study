const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2MxMmU2ZjE3MzAwNTAzNmMxZjE0NGNhYTE5MDA1NiIsIm5iZiI6MTczMDA3NjA1My40MzUzNDksInN1YiI6IjY3MWFlOGJjNGJlMTU0NjllNzBkYTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1pINpT1BiCjcA0WVDZpudWnjC5olggjgV1-h3h3jS6c',
   },
}

const urlParams = new URLSearchParams(window.location.search)

const tvID = urlParams.get('tv_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvID}?language=ko-KR`

const mainContainer = document.querySelector('main .container')

const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      console.log(data)

      const month = new Date(data.last_air_date)

      const rowHtml = `
                  <div class="row">
                    <div class="col-sm-3">
                       <img src="https://image.tmdb.org/t/p/w200${data.poster_path}" alt="poster" class="poster-detail" style="max-width:100%" />
                    </div>
                    <div class="col-sm-9">
                       <h2>${data.name}(${month.getFullYear()})</h2>
                       <ul class="tv-info">
                          <li>원제 ${data.original_name}, ${data.original_language.toUpperCase()}</li>
                          <li>평점 ${data.vote_average.toFixed(1)}</li>
                          <li>최근방영일 ${data.last_air_date}</li>
                          <li>처음방영일 ${data.first_air_date}</li>
                       </ul>
                       <div>
                       <br />
                       <p>줄거리</p>
                       <p class="overview">${data.overview == '' ? '줄거리 없음' : data.overview}</p>
                       </div>
                       </div>
                       </div>
                       <br />`

      mainContainer.innerHTML += rowHtml

      let tvInfo = `<ul class="nav nav-tabs">
                     <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" style="color: #0d6efd;">시리즈</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#" id="recommend">추천</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">상세정보</a>
                     </li>
                  </ul>`

      mainContainer.innerHTML += tvInfo

      let seasonsRowHtml = `<div class="row season">`

      let seasons = data.seasons

      seasons.forEach((season) => {
         let posterImg = !season.poster_path ? './images/logo.svg' : `https://image.tmdb.org/t/p/w200${season.poster_path}`

         seasonsRowHtml += `
         <div class="col-sm-2 p-3 card-seasons">
            <div clas="card-img">
               <img src="${posterImg}" alt="poster" class="poster-detail posterImg"/>
            </div>
            <div class="card-body">
        <p>${season.name} (평점 ${season.vote_average === 0 ? '이 없습니다' : season.vote_average.toFixed(1)}) <br /> 보러가기 - ${!season.air_date ? '미' : season.air_date} 방영</p>
        </div>
        </div>
    `
      })

      mainContainer.innerHTML += seasonsRowHtml
   } catch (error) {
      console.log('에러 발생: ', error)
   }
}

getDetailTv(tvDetailUrl)

const tvRecommendUrl = `https://api.themoviedb.org/3/tv/${tvID}/recommendations?language=ko-KR&page=1`

const getRecommendTv = async (tvRecommendUrl) => {
   try {
      const response = await fetch(tvRecommendUrl, options)
      const data = await response.json()

      console.log(data)
   } catch (error) {
      console.log('error:', error)
   }
}

getRecommendTv(tvRecommendUrl)
