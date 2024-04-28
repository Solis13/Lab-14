<script setup>


//code here
import { useStudentStore } from '../stores/StudentStore'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()

const { mostRecentStudent } = storeToRefs(studentStore)


</script>

<template>


<!--HTML CODE-->
<div id="welcome-or-goodbye-message" class="m-2">
            
            <!-- TODO show a message when student arrives or leaves  -->

            <div v-if= "mostRecentStudent.name">

            <div v-if = "mostRecentStudent.present"class="alert alert-success">
                Welcome, {{ mostRecentStudent.name }}!
            </div>
            <div v-else class="alert alert-info">
                Goodbye {{ mostRecentStudent.name }} see you later.
            </div>

            </div>
            
        </div>



</template>



<style scoped>


/* CSS CODE*/

</style>