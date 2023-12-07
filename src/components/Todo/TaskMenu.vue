<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DialogDelete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
    <DialogEdit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    />

    <DialogDueDate
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    />
  </div>
</template>

<script>
import DialogDelete from "./Dialogs/DialogDelete";
import DialogDueDateVue from './Dialogs/DialogDueDate.vue';
import DialogEdit from "./Dialogs/DialogEdit";

export default {
  components: {
    DialogDelete: DialogDelete,
    DialogEdit: DialogEdit,
    DialogDueDate : DialogDueDateVue
  },
  props: ['task'],
  data: () => ({
    dialogs: {
      delete: false,
      edit: false,
      dueDate: false
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
            this.dialogs.edit = true
        },
      },
      {
        title: "Due Date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
           this.dialogs.delete = true
        },
      },
      {
        title: "Sort",
        icon: "mdi-reorder-horizontal",
        click() {
          if(!this.$store.state.searchText){
           this.$store.commit('toggleSorting')
          }else{
            this.$store.commit('showSnackbar', 'You can\'t sort when you are searching')
          }

        },
      }
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
};
</script>

<style>
</style>