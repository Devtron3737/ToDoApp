class Api::ToDosController < ApplicationController
  def index
    render json: ToDo.all
  end

  def show
    @todo_item = ToDo.find(params[:id])
    render json: @todo_item
  end

  def create
    @todo_item = ToDo.create!(
      title: params[:title],
      body: params[:body],
      done: false
    )

    render json: @todo_item
  end

  def destroy
    id = params[:id]
    ToDo.delete(id)
    render json: id
  end

  def update
    todo = ToDo.find(params[:id])
    status = todo.done ? false : true

    todo.update!(done: status)
    render json: todo
  end
end
