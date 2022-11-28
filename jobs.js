const $ = (selector)=> document.querySelector(selector)
const $$ = (selector)=> document.querySelectorAll(selector)

const hideElement = (selector) => selector.classList.add("hidden")
const showElement = (selector) => selector.classList.remove("hidden")
let isEdit = false

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

// const getJob = (idJob) => {
//     fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs/${idJob}`)
//         .then(res => res.json())
//         .then(data => {
 
//             if (isEdit) {
//             showForm(data)
//             } else {
//             viewDetails(data)
//             console.log(data)
//             }
//         })
// }

const getJobWithAsyncAwait = async (idJob) => {
    const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs/${idJob}`)
    const job = await response.json()
    return job
}





const postJob = () => {
    fetch("https://637fb96d8efcfcedacf6375c.mockapi.io/jobs", {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJob())
    }).finally(() => window.location.href = "index.html")
}



const jobsCards = (arrayJobs) => {
    console.log(arrayJobs)
    for(const {name,description,location,category,seniority, img,id} of arrayJobs){

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
           <button  data-id="${id}" class="btnSeeDetails w-2/3 h-10 my-2 rounded-md shadow-md bg-blue-400 text-white font-bold">See Details</button>
       </div>`
}
for (const btn of $$(".btnSeeDetails")){
    btn.addEventListener("click",()=>{
        const jobId = btn.getAttribute("data-id")
        getJobWithAsyncAwait(jobId).then(data=> viewDetails(data))

    }
    )

}
}


//--------------
const saveJob =()=>{
    return{
        description: $("#description").value,
        name : $("#title").value,
        location: $("#location").value ,
        category:$("#category").value ,
        seniority:$("#seniority").value,
        img: $("#src").value ,
    }
}

$("#navJob").addEventListener('click', () =>{
    hideElement($("#filters")) //no funciona el hidden ni con filters ni con conatiner
    $("#container").innerHTML= ""
    hideElement($("#container"))
    showElement($("#formNewJob"))
})

$("#formNewJob").addEventListener('submit', (e) =>{
    e.preventDefault()
    postJob()

})


$("#navHome").addEventListener('click', () => {
    hideElement($("#formNewJob"))
    showElement ($("#filters"))
    showElement ($("#container"))
    getJobsWithAsyncAwait().then(data=>jobsCards(data))
})


const showForm = (job) =>{

    $("#container").innerHTML = ""
    showElement($("#editJobForm"))

    $("#descriptionEdit").value = job.description
    $("#titleEdit").value = job.name
    $("#locationEdit").value = job.location
    $("#categoryEdit").value = job.category
    $("#seniorityEdit").value = job.seniority
    $("#srcEdit").value = job.img
}


const editJob = (idJob) => {
    fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs/${idJob}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJob())
    }).finally(() => window.location.href = "index.html")
}

const viewDetails = (objJob) =>{
    const{name,description,location,category,seniority, img,id}= objJob
    $("#container").innerHTML = `
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
        <div class="flex w-full justify-center">
            <button data-id="${id}" class="btnEditJob w-1/3 h-10 m-2 rounded-md shadow-md bg-green-400 text-white font-bold" >Edit</button>
            <button  data-id="${id}" class="btnDeleteJob w-1/3 h-10 m-2 rounded-md shadow-md bg-red-400 text-white font-bold" onclick="getJob(${id})" >Delete</button>  
        </div>
       
    </div>`
    for (const btn of $$(".btnEditJob")){
        btn.addEventListener("click",()=>{
            const jobId = btn.getAttribute("data-id")
            $("#submitEdit").setAttribute("data-id",jobId)
            getJobWithAsyncAwait(jobId).then(data=> showForm(data))
    
        }
        )
    
    }

}
$("#editJobForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    const id =  $("#submitEdit").getAttribute("data-id")
    editJob(id)
})

//-------funcion navbar responsive

$("#btnMenu").addEventListener('click', () => $("#menu").classList.toggle('hidden'))

 