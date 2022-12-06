const $ = (selector)=> document.querySelector(selector)
const $$ = (selector)=> document.querySelectorAll(selector)

const hideElement = (selector) => selector.classList.add("hidden")
const showElement = (selector) => selector.classList.remove("hidden")


const getJobsWithAsyncAwait = async () => {
    const response = await fetch("https://637fb96d8efcfcedacf6375c.mockapi.io/jobs")
    const jobs = await response.json()
    return jobs
}

getJobsWithAsyncAwait().then(data=>jobsCards(data))

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
    for(const {name,description,location,category,seniority, img,id} of arrayJobs){

       $("#container").innerHTML += `
       <div id = "card-{id}" class="w-5/6 h-full my-3 border border-2 rounded-md shadow-2xl sm:w-1/3 sm:m-3 md:w-1/4 lg:w-1/5 xl:w-1/6">
       <figure class ="w-full h-1/3 flex mt-2 items-center">
           <img class="w-full h-[170px]" src=${img}" alt="job">
       </figure>
       <div id ="contents" class="h-2/3 p-2 flex flex-col justify-center items-center">
           <h3 class="text-xl font-bold underline">${name}</h3>
           <p class="my-4 p-2 text-justify text-sm">${description}</p>
           <div class="flex flex-row">
               <div id="locationDiv" class="m-1 px-1 bg-pink-400 text-center text-xs font-bold rounded-md">${location}</div>
               <div id="categoryDiv" class="m-1 px-1 bg-yellow-400 text-center text-xs font-bold rounded-md">${category}</div>
               <div id="seniorityDiv" class="m-1 px-1 bg-orange-400 text-center text-xs font-bold rounded-md">${seniority}</div>
           </div>
           <button  data-id="${id}" class="btnSeeDetails w-2/3 h-10 my-2 rounded-md shadow-md bg-blue-400 text-white font-bold">See Details</button>
       </div>`
}
for (const btn of $$(".btnSeeDetails")){
    btn.addEventListener("click",()=>{
        const jobId = btn.getAttribute("data-id")
        getJobWithAsyncAwait(jobId).then(data=> viewDetails(data))
        hideElement($("#filters"))

    }
    )

}
}


//--------------
const saveJob =()=>{
   
    return  {
        description: $("#description").value,
        name : $("#title").value,
        location: $("#location").value ,
        category:$("#category").value ,
        seniority:$("#seniority").value,
        img: $("#src").value ,
    }
    
}
const saveJobEdit =()=>{
   
    return  {
        description: $("#descriptionEdit").value,
        name : $("#titleEdit").value,
        location: $("#locationEdit").value ,
        category:$("#categoryEdit").value ,
        seniority:$("#seniorityEdit").value,
        img: $("#srcEdit").value ,
    }
}


$("#navJob").addEventListener('click', () =>{
    hideElement($("#filters"))
    $("#container").innerHTML= ""
    // resetForm()
    showElement($("#formNewJob"))
})

$("#formNewJob").addEventListener('submit', (e) =>{
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



const viewDetails = (objJob) =>{
    const{name,description,location,category,seniority, img,id}= objJob
    $("#container").innerHTML = `
    <div id = "card-{id}" class="w-5/6 h-[450px] my-3 border border-2 rounded-md shadow-2xl sm:w-1/3 sm:m-3 md:w-1/4 lg:w-1/5 xl:w-1/6">
    <figure class ="w-full h-1/3 flex mt-2 items-center justify-center">
        <img class="w-full h-[170px]" src=${img}" alt="job">
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
            <button  data-id="${id}" class="btnDeleteJob w-1/3 h-10 m-2 rounded-md shadow-md bg-red-400 text-white font-bold" >Delete</button>  
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
<button id="${data.id}" class="w-1/3 h-10 m-1 rounded-md shadow-md bg-red-400 text-white font-bold  text-xs md:w-1/12" onclick="effectivelyDelete(${data.id})">Delete Job</button>
<button id="btnCancelToDelete" class="w-1/3 h-10 m-1 rounded-md shadow-md bg-green-400 text-white font-bold text-xs md:w-1/12" onclick="cancel()">Cancel</button>
</div>`)
}

$("#editJobForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    const id =  $("#submitEdit").getAttribute("data-id")
    editJob(id)
    hideElement($("#editJobForm"))
    //getJobsWithAsyncAwait().then(data=>jobsCards(data))

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

    const filter =   () => {
        if($("#chooseFilter").value == "chooseLocation"){
            let jobsLocations = getJobsWithAsyncAwait().then(data => data.filter((job) => job.location === $("#filterLocation").value))
         console.log(jobsLocations)
            //quiero hacer algun alerta por si no hay ningun resultado que coincida con la busquda
           // if(jobsLocations){alert("No hay ningún trabajo que coincida")}

         return jobsLocations.then(data => jobsCards(data))
        }  
        
        if($("#chooseFilter").value == "chooseCategory"){
            let jobsCategory = getJobsWithAsyncAwait().then(data => data.filter((job) => job.category === $("#filterCategory").value))
           // if(jobsSeniority==[]){alert("No hay ningún trabajo que coincida")}


            return jobsCategory.then(data => jobsCards(data))
        } 
        
        if($("#chooseFilter").value == "chooseSeniority"){
            let jobsSeniority = getJobsWithAsyncAwait().then(data => data.filter((job) => job.seniority === $("#filterSeniority").value))
           // if(jobsSeniority==[]){alert("No hay ningún trabajo que coincida")}

            return jobsSeniority.then(data => jobsCards(data))
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

 