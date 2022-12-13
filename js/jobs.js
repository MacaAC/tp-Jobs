const $ = (selector)=> document.querySelector(selector)
const $$ = (selector)=> document.querySelectorAll(selector)

const hideElement = (selector) => selector.classList.add("hidden")
const showElement = (selector) => selector.classList.remove("hidden")

let page = 1


const getJobsWithAsyncAwait = async () => {
    const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs?page=${page}&limit=5`)
    const jobs = await response.json()
    return jobs
}

getJobsWithAsyncAwait().then(data=>jobsCards(data))
showElement($("#filters"))
getJobsWithAsyncAwait().catch(()=> alert("La información no está disponible"))


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

    $("#container").innerHTML =""

    if(arrayJobs){
        hideElement($("#spinner"))

        for(const {name,description,location,category,seniority, img,id} of arrayJobs){

            $("#container").innerHTML += `

            <div id = "card-{id}" class="w-5/6 h-[350px] my-3 border border-2 rounded-md shadow-2xl sm:w-1/3 sm:m-3 md:w-1/4 lg:w-1/5 xl:w-1/6 hover:scale-110">
            <figure class ="w-full h-1/4 flex mt-2 items-center">
                <img class="w-full h-full" src="${img}" alt="job">
            </figure>
            <div id ="contents" class="h-2/3 p-2 flex flex-col justify-center items-center">
                <h3 class="text-xl font-bold mt-3">${name}</h3>
                <p class="my-4 p-2 text-justify text-base text-ellipsis overflow-hidden">${description}</p>
                <div class="flex flex-row">
                    <div id="locationDiv" class="m-1 p-2 bg-pink-400 text-center text-xs font-bold rounded-md">${location}</div>
                    <div id="categoryDiv" class="m-1 p-2 bg-yellow-400 text-center text-xs font-bold rounded-md">${category}</div>
                    <div id="seniorityDiv" class="m-1 p-2 bg-orange-400 text-center text-xs font-bold rounded-md">${seniority}</div>
                </div>
                <button  data-id="${id}" class="btnSeeDetails bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-2/3 h-10 my-2 rounded-md shadow-md  text-white font-bold ">See Details</button>
            </div>`
     }
     for (const btn of $$(".btnSeeDetails")){
         btn.addEventListener("click",()=>{
            $("#container").innerHTML = ""
            hideElement($("#filters")) //no entiendo pq no se esconde
            hideElement($("#paginationButtons"))
            showElement($("#spinner"))
             const jobId = btn.getAttribute("data-id")
             getJobWithAsyncAwait(jobId).then(data=> viewDetails(data))
         }
         )
     }
    }
    showElement($("#paginationButtons"))
}

const saveJob =()=>{

    return  {
        description: $("#description").value,
        name : $("#title").value,
        location: $("#location").value ,
        category:$("#category").value ,
        seniority:$("#seniority").value,
        img: $("#src").value,
      //  img: $("#src").value.toLowerCase() ,

    }

}

const saveJobEdit =()=>{
   
    return  {
        description: $("#descriptionEdit").value,
        name : $("#titleEdit").value,
        location: $("#locationEdit").value ,
        category:$("#categoryEdit").value ,
        seniority:$("#seniorityEdit").value,
        img: $("#srcEdit").value,

    }
}


$("#navJob").addEventListener('click', () =>{
    hideElement($("#filters"))
    hideElement($("#editJobForm"))
    hideElement($("#paginationButtons"))

    $("#container").innerHTML= ` <div id="spinner" class="flex justify-center hidden">
    <p class="w-40 h-12 rounded-md shadow-md bg-indigo-500 text-white font-bold flex justify-center items-center"><span><i class="fas fa-spinner mx-2 text-3xl animate-spin"></i></span>Cargando...</p>
  </div>
  `
    // resetForm()

    showElement($("#formNewJob"))
})

$("#formNewJob").addEventListener('submit', (e) =>{
    $("#formNewJob").reset()

    //reset() // me trae problemas... buscar como se resetea formularios...
    e.preventDefault()
    hideElement($("#formNewJob"))
    postJob()
})


$("#navHome").addEventListener('click', () => {
    hideElement($("#formNewJob"))
    hideElement($("#confirmation"))
    hideElement($("#editJobForm"))
    showElement ($("#filters"))
    $("#container").innerHTML = ""
    showElement($("#spinner"))
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
    let job= JSON.stringify(saveJobEdit())
    fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs/${idJob}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: job
    }).finally(() => window.location.href="index.html")
}

const deleteJob = (idJob) => {
    fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs/${idJob}`, {
        method: "DELETE"
    }).finally(() => getJobsWithAsyncAwait().then(data=>jobsCards(data)))
}

//IMPORTANTE AGRAGAR A MOCKAPI EL DETAIL



const viewDetails = (objJob) =>{
    hideElement($("#spinner"))
    const{name,description,location,category,seniority, img,id}= objJob
    $("#container").innerHTML = `
    <div class="w-11/12 min-h-full justify-center my-3 shadow-lg shadow-blue-500/50 border border-2 rounded-md shadow-2xl sm:w-1/3 sm:m-3 ">
    <figure class ="w-full h-1/3 flex mt-2 items-center justify-center">
        <img class="w-full h-[170px]" src="${img}" alt="job">
    </figure>
    <div id ="contents" class="h-2/3 p-2 flex flex-col justify-center items-center">
        <h3 class="text-2xl font-bold text-blue-400">${name}</h3>
        <p class="mt-4 p-2 text-justify">${description}</p>
        <div class="flex flex-row">
            <div id="locationDiv" class="m-1 p-3 rounded-md bg-pink-400 text-center text-xs font-bold ">${location}</div>
            <div id="categoryDiv" class="m-1 p-3 rounded-md bg-yellow-400 text-center text-xs font-bold">${category}</div>
            <div id="seniorityDiv" class="m-1 p-3 rounded-md bg-orange-400 text-center text-xs font-bold">${seniority}</div>
        </div>
        <div class="flex w-full justify-center">
            <button data-id="${id}" class="btnEditJob bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 w-1/3 h-10 m-2 rounded-md shadow-md text-white font-bold" >Edit</button>
            <button  data-id="${id}" class="btnDeleteJob w-1/3 h-10 m-2 rounded-md shadow-md bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300  text-white font-bold" >Delete</button>
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
    for (const btn of $$(".btnDeleteJob")){
        btn.addEventListener("click",()=>{
            $("#container").innerHTML=""
            hideElement($("#filters"))
            showElement($("#confirmation"))
            const jobId = btn.getAttribute("data-id")
            alertConfirmation(jobId)
            //$("#btnConfirmToDelete").setAttribute("data-id",jobId)
        })
    }

}



const alertConfirmation = (id) => {
getJobWithAsyncAwait(id).then(data=> $("#confirmation").innerHTML = `
<div class="w-4/5 h-16 border-red-500 bg-red-200 flex justify-center items-center md:w-3/5">
<p class="text-red-500 mr-3">Are you sure to delete ${data.name}?</p>
<button id="${data.id}" class="w-1/3 h-10 m-1 rounded-md shadow-md shadow-md bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white font-bold  text-xs md:w-1/12" onclick="effectivelyDelete(${data.id})">Delete Job</button>
<button id="btnCancelToDelete" class="w-1/3 h-10 m-1 rounded-md shadow-md shadow-md bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 text-white font-bold text-xs md:w-1/12" onclick="cancel()">Cancel</button>
</div>`)
}

$("#editJobForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    const id =  $("#submitEdit").getAttribute("data-id")
    editJob(id)
    hideElement($("#editJobForm"))
})

const cancel = ()=>{
    hideElement($("#confirmation"))
    showElement ($("#filters"))
    getJobsWithAsyncAwait().then(data=>jobsCards(data))
}
const effectivelyDelete =(id)=>{
        deleteJob(id)
        hideElement($("#confirmation"))
        getJobsWithAsyncAwait().then(data=>jobsCards(data))
}


//filters

$("#chooseFilter").addEventListener("change",(e) =>{
    if (e.target.value === "chooseLocation"){
        showElement($("#filterLocation"))
        hideElement($("#filterSeniority"))
        hideElement($("#filterCategory"))
        showElement($("#filterButtons"))
    }
    if (e.target.value === "chooseSeniority"){
        showElement($("#filterSeniority"))
        hideElement($("#filterLocation"))
        hideElement($("#filterCategory"))
        showElement($("#filterButtons"))
    }
    if (e.target.value === "chooseCategory"){
        showElement($("#filterCategory"))
        hideElement($("#filterLocation"))
        hideElement($("#filterSeniority"))
        showElement($("#filterButtons"))
    }
    if(e.target.value === "choice"){
        hideElement($("#filterLocation"))
        hideElement($("#filterSeniority"))
        hideElement($("#filterCategory"))
        hideElement($("#filterButtons"))
        showElement($("#filterButtons"))
    }
    })

    const filterBy = async (by,input) => {
        const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs?${by}=${$(input).value}`)
        const job = await response.json()
        return jobsCards(job)
    }

    // const filterByLocation = async () => {
    //     const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs?location=${$("#filterLocation").value}`)
    //     const job = await response.json()
    //     return jobsCards(job)
    // }
    // const filterByCategory = async () => {
    //     const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs?category=${$("#filterCategory").value}`)
    //     const job = await response.json()
    //     return jobsCards(job)
    // }
    // const filterBySeniority = async () => {
    //     const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs?seniority=${$("#filterSeniority").value}`)
    //     const job = await response.json()
    //     return jobsCards(job)
    // }

    const noMatches = () =>{
        hideElement($("#filters"))
        $("#container").innerHTML = `
        <div class="w-5/6 p-2 mt-14 h-16 border-blue-500 rounded-md bg-blue-200 flex justify-center items-center md:w-3/5">
        <p class="text-blue-500 mr-3">Sorry, there are no results matching your search at this time.</p>
        <button id="btnCancelToDelete" class="w-1/3 h-10 m-1 rounded-md shadow-md bg-blue-400 text-white font-bold text-xs md:w-1/12" onclick="cancel()">Keep searching!</button>
        </div>`
    }


    //IMPORTANTE necesito que me tome el padding !!!

    const isntJob = async (by,input) => {
        const response = await fetch(`https://637fb96d8efcfcedacf6375c.mockapi.io/jobs?${by}=${$(input).value}`)
        const job = await response.json()
        if(job.length==0){
           
           return noMatches()
           
        }
    }

    const filter =   () => {
        if($("#chooseFilter").value == "chooseLocation"){
         filterBy(`location`,"#filterLocation")
         isntJob(`location`,"#filterLocation")
        }


        if($("#chooseFilter").value == "chooseCategory"){
         filterBy(`category`,"#filterCategory")
         isntJob(`category`,"#filterCategory")
        }

        if($("#chooseFilter").value == "chooseSeniority"){
         filterBy(`seniority`,"#filterSeniority")
         isntJob(`seniority`,"#filterSeniority")
        }

        }


       $("#searchBtn").addEventListener("click",()=>{
        
         $("#container").innerHTML= ""
         filter()
       })
       $("#clearBtn").addEventListener("click",()=>{
        
        $("#container").innerHTML= ""
        getJobsWithAsyncAwait().then(data=>jobsCards(data))
        $("#chooseFilter").value = "choice"

        hideElement($("#filterLocation"))
        hideElement($("#filterSeniority"))
        hideElement($("#filterCategory"))
        hideElement($("#filterButtons"))
      })

//-------funcion navbar responsive

$("#btnMenu").addEventListener('click', () => $("#menu").classList.toggle('hidden'))

//pagination

const nextPage = () => {
    page = page + 1
}

const prevPage = () => {
    if (page > 1) {
        page = page - 1

    }
   
}


$("#prev").addEventListener("click", () => {
    prevPage()
    getJobsWithAsyncAwait().then(data=>jobsCards(data))
    if(page===1){
        
        $("#prev").classList.remove("bg-blue-400")
        $("#prev").classList.remove("hover:bg-blue-600")
        $("#prev").classList.remove("active:bg-blue-700")
        $("#prev").classList.remove("focus:outline-none")
        $("#prev").classList.remove("focus:ring")
        $("#prev").classList.add("bg-blue-200")
    
    }
})
$("#next").addEventListener("click", () => {
    nextPage()
    getJobsWithAsyncAwait().then(data=>jobsCards(data))
        $("#prev").classList.remove("bg-blue-200")
        $("#prev").classList.add("bg-blue-400")
        $("#prev").classList.add("hover:bg-blue-600")
        $("#prev").classList.add("active:bg-blue-700")
        $("#prev").classList.add("focus:outline-none")
        $("#prev").classList.add("focus:ring")
        $("#prev").classList.add("focus:ring-blue-300")
})