import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

// make sure to put error handler (catch err) 
// is very important use catch err and code like this because its a lot coding.

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', ()=> {

    const sortedStudents = ref ([])

    const mostRecentStudent = ref ( {} ) // empty object

    const addNewStudentErrors = ref([])
    
    function getAllStudents(){
        //this new funtion is to get all students and save it into the store - studentList
        // Make an API request


        studentAPI.get().then( students => { //  students is the JSON responde from the API 
            sortedStudents.value = students

        }).catch(err=>{
            console.log(err)
        })
    }

    function addNewStudent(student) {// make API to call a new student
        // call getAllStudents  to re-request list of students from API server
        // when we add new student in the browser should be adding in the system
        studentAPI.post(student).then(()=>{
            getAllStudents()
        }).catch(err =>{
            addNewStudentErrors.value = err.body

        })
    }

    function deleteStudent(studentToDelete) {
       
        //API requeste to deleted
        const deleteStudentAPI = mande (`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( ()=>{
            getAllStudents()
        }).catch(err=>{
            console.log(err)
        })
    }

    function arrivedOrLeft(student){

        //API request when we edit the student status arrived(true) left(false) using patch to requeste match ID
        const editStudentAPI = mande (`/api/students/${student.id}`)
        editStudentAPI.patch(student).then(()=>{
            getAllStudents()

        }).catch(err =>{
            console.log(err)
        })
    }

    const studentCount = computed(()=>{
        return sortedStudents.value.length
    })


    return{
        // reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        //functions
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        //computed properties
        studentCount
    }
})