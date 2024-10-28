const options = {
   // 서버한테 같이 전달하는 포스트잇같은 느낌
   method: 'GET', // RestFul 방식 중 GET방식으로 요청
   headers: {
      accept: 'application/json', // 저는 json 객체 형태로 데이터를 받을게요~ 라고 서버에게 요청
      // 보안을 위해 서버에서 주는 인증키
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2MxMmU2ZjE3MzAwNTAzNmMxZjE0NGNhYTE5MDA1NiIsIm5iZiI6MTcyOTgyNTM2OC4yNzI2OTIsInN1YiI6IjY3MWFlOGJjNGJlMTU0NjllNzBkYTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FfwnhiSv_HkpJgiet2I9SbNA8_cVaywa5PemPVri064',
   },
}

// fetch : 서버에 request를 요청하는 자바스크립트에서 제공하는 함수
// fetch(request 주소, request 할 때 서버에 같이 전달하는 옵션)

// fetch() 자체가 promise를 객체를 리턴을 해주기 때문에 then 사용 가능
// 물음표 뒤는 쿼리스트링: 서버에 보내는 값들

/* 
왜 fetch는 promise를 사용할까?(왜 비동기일까?)

promise, async, await -> 비동기
request 해주는 과정을 비동기로 동작시키고 있다

서버에 장애가 있거나 네트워크 문제가 있거나 했을 때 동기적으로 실행이 된다면 사용자는 다른 작업을 할 수 X -> 따라서 request 작업은 비동기로 진행된다.
*/

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const response = await fetch(url, options) // 서버에서 데이터 가져올 때까지 기다린다
      //console.log(response) // 기다렸다가 다 가지고 오면 실행

      // ↓await를 지정하는 이유: fetch는 비동기적으로 실행되므로 서버에서 request 해오는 딜레이 시간 중에 실행 된다.

      const data = await response.json() // await fetch(url, options)를 기다렸다가  await response.json() 실행
      const results = data.results // await response.json() 기다렸다가 실행

      const container = document.querySelector('main .container') // main의 container을 가져옴
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         // 5번 반복
         let rowHtml = '<div class="row">' // 모든 row를 담을 문자열 변수

         for (let j = 0; j < 4; j++) {
            // 0,1,2,3 => 4번 반복(col을 4개 만들어준다)
            const index = i + j
            if (index >= results.length) break // results 배열을 벗어나면 중단

            const movie = results[index]
            // 누적연산!!!
            rowHtml += `
                <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="./detail.html?movie_id=${movie.id}">
                           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${Number(movie.vote_average.toFixed(1)) === 0.0 ? '미반영' : movie.vote_average.toFixed(1)}</p>
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
      //console.log('에러 발생:', error)
   }
}

getPlayingMovies(url)

// getPlayingMovies(url)
//    .then((res) => {
//       console.log(res) // response 정보 + 데이터
//       return res.json() // 실제 데이터만 리턴
//    })
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err)) // request할 때 문제 발생시 실행
