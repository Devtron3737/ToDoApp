//rename to add .jsx to end!
// wrapping it with jquery made it so it
// found the El in the body. before, it was
// running the script before <body> was
//loaded, so it wasnt finding el.

$(function() {

  var DoneButton = React.createClass({
    render: function () {
      var doneText = (this.props.status) ?
        "Undo" :
        "Done";

      return(
        <button onClick={this.handleDone}>
          {doneText}
        </button>
      );
    },

    handleDone: function () {
      TodoStore.toggleDone(this.props.id);
    }
  });

  var TodoListItem = React.createClass({
    handleDestroy: function () {
      TodoStore.destroy(this.props.todoItem.id);
    },

    render: function () {
      return(
        <div>
          <div>{this.props.todoItem.title}</div>
          <div>{this.props.todoItem.body}</div>
          <DoneButton
            status={this.props.todoItem.done}
            id={this.props.todoItem.id}
          />
          <button onClick={this.handleDestroy}>
            Delete
          </button>
        </div>
      );
    }
  });

  var TodoForm = React.createClass({
    getInitialState: function () {
      return {
        title: "",
        body: ""
      };
    },

    updateTitle: function () {
      this.setState({
        title: event.target.value
      });
    },

    updateBody: function () {
      this.setState({
        body: event.target.value
      });
    },

    handleSubmit: function () {
      event.preventDefault();
      //console.log('inside handleSubmit')
      TodoStore.create({
        title: this.state.title,
        body: this.state.body
      });

      this.setState({
        title: "",
        body: ""
      });
    },

    render: function () {
      return(
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='title'
            onChange={this.updateTitle}
            value={this.state.title}
          />
          <input
            placeholder='description'
            onChange={this.updateBody}
            value={this.state.body}
          />
          <button type="submit">
            Submit!
          </button>
        </form>
      );
    }
  });

  var TodoList = React.createClass({
    getInitialState: function () {
      return {items: TodoStore.todoItems};
    },

    todosChanged: function () {
      this.setState({
        items: TodoStore.todoItems
      });
    },

    componentDidMount: function () {
      TodoStore.addChangeHandler(this.todosChanged);
      TodoStore.fetch();
    },

    componentWillUnmount: function () {
      TodoStore.removeChangeHandler(this.todosChanged);
    },

    render: function () {
      return(
        <div>
          {
            this.state.items.map(function (item) {
              return(
                <TodoListItem todoItem={item} />
              );
            })
          }
          <TodoForm />
        </div>
      );
    },
  });

  React.render(
    <TodoList />, document.getElementById('todo-list')
  );
});
