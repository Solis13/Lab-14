<script setup>


//code here

import { useStudentStore } from '../stores/StudentStore.js'

import { storeToRefs } from 'pinia'

import { computed } from 'vue'

import StudentRow from './StudentRow.vue'

const studentStore = useStudentStore()

const { sortedStudents, studentCount } = storeToRefs(studentStore)

const deleteStudent = (student) => {
  studentStore.deleteStudent(student)
}

const arrivedOrLeft = (student, isStudentPresent) =>{
  student.present = isStudentPresent
  studentStore.arrivedOrLeft(student)
}

const pluralStudentMessage = computed( () =>{
  if(studentCount.value ===1){
    return 'There is 1 student in class'
  }else{
    return`There are ${studentCount.value} students in class`
  }
})
</script>

<template>


<!--HTML CODE-->

<div id="student-list-table" class="card m-2 p-2">
            <h4 class="card-title">Student List</h4>
            <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>

            <div id="student-table">
                <table class="table">
                    <thead>
                        <tr class="align-middle">
                            <th>Name</th>
                            <th>StartID</th>
                            <th>Present?</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                   <tbody>

                    <StudentRow
                    v-for="student in sortedStudents"
                    v-bind:student="student"
                    v-on:arrived-or-left="arrivedOrLeft"
                    v-on:delete-student="deleteStudent"
                    ></StudentRow>
                    



                   </tbody>

                </table>
            </div>
        </div>



</template>



<style scoped>


/* CSS CODE*/

#student-table {
    max-height: 500px;
    overflow: scroll;
}

th, td {
    width: 25%;
    text-align: center;
}


</style>