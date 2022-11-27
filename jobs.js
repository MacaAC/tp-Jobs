const $ = (selector)=> document.querySelector(selector)
const $$ = (selector)=> document.querySelectorAll(selector)


const getJobsWithAsyncAwait = async () => {
    const response = await fetch("https://637fb96d8efcfcedacf6375c.mockapi.io/jobs")
    const jobs = await response.json()
    return jobs
}

getJobsWithAsyncAwait().then(data=>jobsCards(data))

// const getJobs =()=>{
//     fetch("https://637fb96d8efcfcedacf6375c.mockapi.io/jobs")
//         .then(res=>res.json())
//         .then(data=>jobsCards(data))

// }
// getJobs()


const jobsCards = (arrayJobs) => {
    console.log(arrayJobs)
    for(const {name,description,location,category,seniority, img} of arrayJobs){
        
    
       $("#container").innerHTML += `
       <div id = "card-{id}" class="w-5/6 h-[450px] my-3 border border-2 rounded-md shadow-2xl sm:w-1/3 sm:m-3 md:w-1/4 lg:w-1/5 xl:w-1/6">
       <figure class ="w-full h-1/3 flex mt-2 items-center">
           <img class="h-full" src=${img}" alt="job">
       </figure>
       <div id ="contents" class="h-2/3 p-2 flex flex-col justify-center items-center">
           <h3 class="text-xl font-bold underline">${name}</h3>
           <p class="my-4 p-2 text-justify">${description}</p>
           <div class="flex flex-row">
               <div id="locationDiv" class="m-1 bg-pink-400 text-center text-xs font-bold ">${location}</div>
               <div id="categoryDiv" class="m-1 bg-yellow-400 text-center text-xs font-bold">${category}</div>
               <div id="seniorityDiv" class="m-1 bg-orange-400 text-center text-xs font-bold">${seniority}</div>
           </div>
           <button class="w-2/3 h-10 my-2 rounded-md shadow-md bg-blue-400 text-white font-bold">See Details</button>
       </div>
    `
    }
}

//--------------
$("#navJob").addEventListener('click', () =>{ 
    $("#filters").classList.add("hidden")
    $("#container").innerHTML= ""
    $("#formNewJob").classList.remove("hidden")
})


//-------funcion navbar responsive

$("#btnMenu").addEventListener('click', () => $("#menu").classList.toggle('hidden'))
