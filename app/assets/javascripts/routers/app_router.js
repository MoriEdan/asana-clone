Breath.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'showRootPage',
    'projects/:id': 'showProjectPage',
    'tasks/:id': 'showTaskEditPage'
  },

  showTaskEditPage: function(id){
    var taskEditPage = new Breath.Views.TaskEdit({
      model: Breath.user.tasks().get(id)
    });

    this._swapTaskView(taskEditPage)
  },

  showRootPage: function(){
    var sidebar = new Breath.Views.SidebarView({
      model: Breath.user
    });
    
    var taskIndex = new Breath.Views.TaskIndex({
      collection: Breath.user.tasks()
    });

    $('.app-sidebar').html(sidebar.render().$el);
    this._swapMainView(taskIndex);
  },

  showProjectPage: function(id){
    var projectPage = new Breath.Views.ProjectView({
      model: Breath.user.projects().get(id)
    });

    this._swapMainView(projectPage);
  },

  _swapMainView: function (newView) {
    if (this._prevMainView) { this._prevMainView.remove(); }
    this._prevMainView = newView;
    newView.render();
    $(".index").html(newView.$el);
  },

  _swapTaskView: function(newView){
    if (this._prevTaskView) { this._prevTaskView.remove(); }
    this._prevTaskView = newView;
    newView.render();
    $(".task-detail").html(newView.$el);
  }
})