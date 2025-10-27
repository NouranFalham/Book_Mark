    var themeToggleBtn = document.getElementById('themeToggle');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });


    var siteNameInput = document.getElementById('siteName')
    var siteUrlInput = document.getElementById('siteUrl')
    var tableData = document.getElementById('tableData')
    var nameAlert = document.getElementById('nameAlert')
    var urlAlert = document.getElementById('urlAlert')

    var siteList =[];
    if(localStorage.getItem('sites') !== null){
        siteList= JSON.parse(localStorage.getItem('sites'))
        displayData()
    }

    function addSite(){
        if(validationName() && validationUrl()){
            var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }
        siteList.push(site)
        displayData()
        localStorage.setItem('sites' , JSON.stringify(siteList))
        clearForm()
        siteAdded()
        }
    }

    function clearForm(){
        siteNameInput.value = ""
        siteUrlInput.value = ""
        siteNameInput.classList.remove('is-valid')
        siteUrlInput.classList.remove('is-valid')
    }

    function displayData(){
        var box = "";
        for (var i =0; i< siteList.length; i++){
            box +=`
                <tr class="text-center">
                    <td class="text">${i+1}</td>
                    <td class="text">${siteList[i].name}</td>
                    <td> 
                        <a href="${siteList[i].url}" class="btn btn-success" target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
                    </td>
                    <td><button onclick ="deleteItem(${i})" class="btn btn-danger" id="deleteBtn">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                        </button>
                    </td>
                </tr>
            `
        }
        tableData.innerHTML =box;
    }

    function deleteItem(indexItem){
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {

        siteList.splice(indexItem , 1)
        displayData()
        localStorage.setItem('sites' , JSON.stringify(siteList))

        Swal.fire({
        title: "Deleted!",
        text: "Your site has been deleted.",
        icon: "success"
        });
    }
    });
    }

    function validationName(){
        var regex = /^[A-Z][a-z]{1,}$/
        var text = siteNameInput.value
        if(regex.test(text)){
            siteNameInput.classList.add('is-valid')
            siteNameInput.classList.remove('is-invalid')
            nameAlert.classList.add('visually-hidden')
            return true;
        }
        else{
            siteNameInput.classList.remove('is-valid')
            siteNameInput.classList.add('is-invalid')
            nameAlert.classList.remove('visually-hidden')
            return false;
        }
    }
    function validationUrl(){
        var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/
        var text = siteUrlInput.value
        if(regex.test(text)){
            siteUrlInput.classList.add('is-valid')
            siteUrlInput.classList.remove('is-invalid')
            urlAlert.classList.add('visually-hidden')
            return true;
        }
        else{
            siteUrlInput.classList.remove('is-valid')
            siteUrlInput.classList.add('is-invalid')
            urlAlert.classList.remove('visually-hidden')
            return false;
        }
    }

function siteAdded(){
    Swal.fire({
    title: "Site added successfully",
    icon: "success",
    draggable: true
    });
}

function AreYouSure(){
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
        title: "Deleted!",
        text: "Your site has been deleted.",
        icon: "success"
        });
    }
    });
}