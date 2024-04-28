<script setup>

import { onMounted } from 'vue'
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

import { useStudentStore } from './stores/StudentStore'

const studentStore = useStudentStore()

onMounted( () => {
    studentStore.getAllStudents()

})

</script>

<template>


<!--HTML CODE-->

<StudentTable></StudentTable>

<StudentMessage></StudentMessage>


<NewStudentForm></NewStudentForm>



</template>



<style scoped>


/* CSS CODE*/

</style>