<script setup>

import {ref} from 'vue'
const props = defineProps({
    student: Object
})

const emit = defineEmits(['arrived-or-left','delete-student'])

const isStudentPresent = ref(props.student.present)

const notifyArrivedOrLeft=()=> {
    // in here we want to tell the parents when the student arrived or left wiht emmit event.
    emit('arrived-or-left', props.student, isStudentPresent.value)
}

const confirmThenDeleteStudent = ()=> {
    emit ('delete-student', props.student)
}
</script>

<template>

<tr
                     class="align-middle" v-bind:class =" {present:student.present, absent: !student.present }"> 
                          <td>{{ student.name }}</td>  
                          <td>{{ student. startID }}</td>
                          <td>
                            <input type = 'checkbox' v-model= "isStudentPresent" v-on:change="notifyArrivedOrLeft">
                            <span v-if = "student.present" class="mx-3">Here!</span>
                            <span v-else class="mx-3">Not present</span>
                          </td>

                          <td>
                            <button class = "btn btn-danger" v-on:click="confirmThenDeleteStudent">
                                <i class="bi bi-trash-fill"></i> Delete
                         </button>
                          </td>
                        </tr>




</template>


<style scoped>

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}



</style>