
var fakeApiCourses = 'http://localhost:3000/courses'
function start (){
    getCourse(renderCourse)
    var createCourse = document.querySelector('.createCourse')
    createCourse.onclick = function() {

        createHandleForm()
    } 
}

function getCourse(callback) {
    fetch(fakeApiCourses)
        .then(response => response.json())
        .then(callback)
}

function renderCourse(courses){
    var htmls = document.querySelector("#courses")
    var showcourse = courses.map(function(course,index) {
        return `<li>
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <button onclick = "handleDeleteCourse(${course.id})">xoa</button>
        <button onclick = "handleUpdateCourse(${course.id},'${course.name}','${course.description}')">sua</button>
        </li>`
    })
    htmls.innerHTML = showcourse.join('')
}

function handleUpdateCourse(id,name,description){
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="description"]').value = description;

   var dataname =name
   var datadescription = description
    document.querySelector('input[name="name"]').onchange = function(e){
        
        dataname = e.target.value;
    }
    console.log(dataname,datadescription);

    document.querySelector('input[name="description"]').onchange = function(e){
        
        datadescription =e.target.value
    }
   

    var buttonCourse = document.querySelector('.button')
    buttonCourse.innerHTML = `<button class = "updateCourse">Update</button>`
    var updateCourse = document.querySelector('.updateCourse')

    updateCourse.onclick = function(){
        var data = {
            name:dataname,
            description: datadescription
        }
        var optionPost = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(data)
        }
        fetch(fakeApiCourses +'/'+id,optionPost)
            .then(response => response.json())
            .then(getCourse(renderCourse))
    }
}

function handleDeleteCourse(id){
    var optionPost = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(fakeApiCourses+"/" + id,optionPost)
        .then((response) => response.json() )
        .then(getCourse(renderCourse))
}

function createCourse(data,cb){
    var optionPost = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    }
    fetch(fakeApiCourses,optionPost)
        .then((response) => response.json() )
        .then(cb(renderCourse))
    
}

function createHandleForm(dt){
    
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var data = {
            name:name,
            description:description
        }
        createCourse(data,getCourse)
}


start()