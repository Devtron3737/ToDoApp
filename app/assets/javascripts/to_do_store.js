// defined in global namespace so
// todolist comp has access

TodoStore = {
    todoItems: [],
    callbacks: []
};

TodoStore.changed = function () {
  TodoStore.callbacks.forEach(function (callback) {
    callback();
  });
};

TodoStore.addChangeHandler = function (callback) {
  TodoStore.callbacks.push(callback);
};

// splice(idx, num of items)
TodoStore.removeChangeHandler = function (callback) {
  for (var i=0; i<TodoStore.callbacks.length;i++) {
    if (TodoStore.callbacks[i] === callback) {
      TodoStore.callbacks.splice(i, 1);
    }
  }
};

TodoStore.findId = function (id) {
  for (var i=0; i<TodoStore.todoItems.length;i++) {
    if (TodoStore.todoItems[i].id == id) {
      return i;
    }
  }
};

TodoStore.fetch = function () {
  $.ajax({
    url: 'api/to_dos',
    method: 'GET',
    success: function (todos) {
      // console.log("fetched!");
      // console.log(todos);
      TodoStore.todoItems = todos;
      TodoStore.changed();
    },
    error: function () {
      console.log('failed');
    }
   });
 };

TodoStore.create = function (options) {
  // console.log('inside create func');
  $.ajax({
    url: 'api/to_dos',
    method: 'POST',
    data: options,
    success: function (item) {
      // console.log('created!');
      TodoStore.todoItems.push(item);
      // console.log(TodoStore.todoItems);
      TodoStore.changed();
    }
  });
};

TodoStore.destroy = function (id) {
  $.ajax({
    url: 'api/to_dos/' + id,
    method: 'DELETE',
    success: function (id) {
      var idx = TodoStore.findId(id);
      TodoStore.todoItems.splice(idx, 1);
      TodoStore.changed();
    }
  });
};

TodoStore.toggleDone = function (id) {
  //need to change controller action to switch done attr
  $.ajax({
    url: '/api/to_dos/' + id,
    method: 'PATCH',
    success: function () {
      TodoStore.changed();
    },
    error: function () {
      console.log('failed');
    }
  });
};
