<template>
      <v-dialog
      :value="true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Edit Task?
        </v-card-title>
        <v-card-text>Edit the title of this task.
        <v-text-field 
        v-model="taskTitle"
        @keyup.enter="updateTask()"
        />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="dark darken-1"
            text
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="updateTask"
            :disabled="taskTitleInvalid"
            color="red darken-1"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['task'],
    data(){
      return {
        taskTitle : null
      }
    },
    mounted(){
      this.taskTitle = this.task.title
    },
    computed : {
      taskTitleInvalid(){
        return !this.taskTitle || this.taskTitle === this.task.title
      }
    },
    methods : {
      updateTask(){
        if(!this.taskTitleInvalid){
          let payload = {
          id: this.task.id,
          title: this.taskTitle
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
        this.$vutify.goTo(0 , {duration: 0})
        }

      }
    }
}
</script>

<style>

</style>