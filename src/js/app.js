Vue.component('tasks', {    
    template:
        `
            <section class="todoapp">                                
                <header class="header">
                    <h1>Tareas</h1>
                    <input v-on:keyup.13="add" v-model="newTask" type="text" class="new-todo">
                </header>
                <section class="todo-list">
                    <ul>
                        <li class="todo" is="task" v-for="task in tasks" :task="task"></li>
                    </ul>
                </section>
                <footer class="footer">
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
                    <label v-text="task.title"></label>
                </div>                    
            </li>
        `,
    computed: {
        classes: function () {
            return {completed: this.task.completed};
        }
    }      
});

var app = new Vue({
    el: '#app'
})