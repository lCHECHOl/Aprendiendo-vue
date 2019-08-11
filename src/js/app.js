Vue.component('tasks', {    
    template:
        `
            <section class="todoapp">                                
                <header class="header">
                    <h1>Tareas</h1>
                    <input class="new-todo" placeholder="añade una tarea" v-on:keyup.13="add" v-model="newTask" type="text" >
                </header>
                <section class="todo-list">
                    <ul>
                        <li class="todo" is="task" v-for="task in tasks" :task="task"></li>
                    </ul>
                </section>
                <footer class="footer" v-if="tasks.length">
                    <span class="todo-count">Completas: {{ completed }} - Incompletas: {{ inCompleted }}</span>
                </footer>                                
            </section>
        `,
    data: function () {
        return {            
            newTask: "",
            tasks: [
                { title: "Aprender PHP", completed: true },
                { title: "Aprender laravel", completed: true },
                { title: "Aprender vue", completed: false }
            ]
        }
    },
    methods: {        
        add: function () {
            if (this.newTask.length <= 0) return alert("La tarea no puede estar vacía")

            this.tasks.push({
                title: this.newTask,
                completed: false
            });
            this.newTask = "";
        }        
    },
    computed: {
        completed: function () {
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length
        },
        inCompleted: function () {
            return this.tasks.filter(function (task) {
                return !task.completed;
            }).length
        }
    }

});

Vue.component('task', {
    props: ['task'],
    template:
        `            
            <li :class="classes">
                <div class="view">
                    <input class="toggle" type="checkbox" v-model="task.completed"/>                    
                    <label v-text="task.title" @dblclick="edit()"></label>
                    <button class="destroy" @click="remove()"></button>
                </div>
                <input class="edit" 
                    v-model="task.title"  
                    @keyup.enter="doneEdit()"
                    @blur="doneEdit()"
                    @keyup.esc="cancelEdit()"
                    >
            </li>
        `,
    data: function () {
        return {
            editing: false,
            cacheBeforeEdit: ''
        }
    },
    methods: {
        edit: function () {
            this.cacheBeforeEdit = this.task.title;
            this.editing = true;
        },
        doneEdit: function () {
          if (!this.task.title) {
              this.remove();
          }

          this.editing = false;  
        },
        cancelEdit: function () {
            this.editing = false;
            this.task.title = this.cacheBeforeEdit;
        },
        remove: function () {
            let tasks = this.$parent.tasks;

            tasks.splice(tasks.indexOf(this.task),1);
        }
    },
    computed: {
        classes: function () {
            return {completed: this.task.completed, editing: this.editing};
        }
    }      
});

var app = new Vue({
    el: '#app'
})