Vue.component('tasks', {    
    template:
        `
            <div>
                <h1 v-if="message.length > 2">Hola <span v-text="message"></span></h1>
                <h1 v-else>Por favor escribe tu nombre</h1>
                <input type="text" v-model="message">
                <button @click="reverseMessage">Reverse</button>

                <h1>Lista de tareas</h1>
                <h4 v-if="completed">Tareas completas: <span v-text="completed"></span></h4>
                <h4 v-if="inCompleted">Tareas incompletas: <span v-text="inCompleted"></span></h4>
                <ol>
                    <li is="task" v-for="task in tasks" :task="task"></li>
                    <li class="form-inline">
                        <input v-model="newTask" type="text" class="form-control">
                        <button @click="add" class="btn btn-primary"><i class="fa fa-plus"></i></button>
                    </li>
                </ol>
            </div>
        `,
    data: function () {
        return {
            message: "",
            newTask: "",
            tasks: [
                { title: "Aprender PHP", completed: true },
                { title: "Aprender laravel", completed: true },
                { title: "Aprender vue", completed: false }
            ]
        }
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        },
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
            <li>
                <span v-text="task.title"></span>
                <span @click="complete()"><i :class="classes"></i></span>
            </li>
        `,
    methods: {
        complete: function () {
            return this.task.completed = !this.task.completed;
        },
        
    },
    computed: {
        classes: function () {
            return ['far', this.task.completed ? 'fa-check-square' : 'fa-square'];
        }
    }      
});

var app = new Vue({
    el: '#app'
})