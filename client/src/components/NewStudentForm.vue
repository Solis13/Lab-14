<script setup>


//code here
import { ref, watch } from 'vue'

import { useStudentStore } from '../stores/StudentStore'
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore()

const newStudentName = ref('') 
const newStartID = ref('') 

const formErrors = ref([])

const { addNewStudentErrors } = storeToRefs(studentStore)

watch (addNewStudentErrors, ()=>{
    if(addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
        alert( addNewStudentErrors.value.join('\n'))
    }
})


const addStudent = () => {
                
                formErrors.value = [] // reset form errors
                // we add statements

                // checking for Invalid Student Name

                if( newStudentName.value.length == 0){
                    formErrors.value.push('Student name must be entered')
                }

                // cheking for invalid StartID

                if(newStartID.value.length == 0 ){
                    formErrors.value.push('StartID must be enteted')
                }


                // if don't have errors
                if(formErrors.value.length ==0){

                let student = {
                    name:newStudentName.value,
                    startID: newStartID.value,
                    present: false
                }
                //todo how to add student?

                studentStore.addNewStudent(student)
                newStudentName.value = ''// adding this we clear the newStudent after we add a newStudent
                newStartID.value = '' // adding this we clear the newStartId after we add a newStartId

             }
             }

</script>

<template>


<!--HTML CODE-->

<div id="new-student-form-errors" class="m-2">
            <!-- TODO show errors from form validation -->
         <div v-if="formErrors.length>0" class="alert alert-danger"> <!--adding the v-if we dissapear the pink box-->
            <li v-for=" error in formErrors">
                {{ error }}
            </li>
         </div>
        </div>


        <div id="new-student-form" class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group mb-3">
                <label for="name">Name</label>
                <!-- TODO v-model newStudentName -->
                <!-- Adding trim to our v-model we remove empty spaces-->
                <input v-model.trim=" newStudentName" id="name" class="form-control">
            </div>

            <div class="form-group mb-3">
                <label for="starID">Star ID</label>
                 <!-- TODO v-model newStarID -->
                <input v-model.trim="newStartID" id="starID" class="form-control">
            </div>

            <!-- TODO v-on:click event handler -->
            <button v-on:click="addStudent"  class="btn btn-primary">Add</button>
        </div>




</template>



<style scoped>


/* CSS CODE*/

</style>