const $ = (selector)=> document.querySelector(selector)
const $$ = (selector)=> document.querySelectorAll(selector)


// const getJobsWithAsyncAwait = async (jobs = "") => {
//     const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/${jobs}`)
//     const jobs = await response.json()
//     return console.log(jobs)
// }

// getJobsWithAsyncAwait()

const getJobs =()=>{
    fetch("https://637fb96d8efcfcedacf6375c.mockapi.io/jobs")
        .then(res=>res.json())
        .then(data=>jobsCards(data))

}
getJobs()


const jobsCards = (arrayJobs) => {
 for(const {name,description,location,category,seniority} of arrayJobs){
    $(".container").innerHTML += `
    <div class="card">
            <figure>
                <img src="" alt="">
            </figure>
            <div class="contents">
                <h3>${name}</h3>
                <p>${description}</p>
                <div>
                <div class="locationDiv">${location}</div>
                <div class="categoryDiv">${category}</div>
                <div class="seniorityDiv">${seniority}</div>
                </div>
                <button>See Details</button>
            </div>
        </div>
    `
 }
 }
