<?php

namespace App\Repositories;

use App\Models\Todo;

class TodoRepository
{
    /**
     * @var Todo
     */
    protected $todo;

    /**
     * TodoRepository constructor.
     *
     * @param Todo $todo
     */
    public function __construct(Todo $todo)
    {
        $this->todo = $todo;
    }

    /**
     * Get all todos.
     *
     * @return Todo $todo
     */
    public function getAll()
    {
        return $this->todo
            ->get();
    }

    /**
     * Get todo by id
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->todo
            ->where('id', $id)
            ->get();
    }

    /**
     * Save Todo
     *
     * @param $data
     * @return Todo
     */
    public function save($data)
    {
        $todo = new $this->todo;

        $todo->name = $data['name'];
        $todo->is_completed = $data['is_completed'];

        $todo->save();

        return $todo->fresh();
    }

    /**
     * Update Todo
     *
     * @param $data
     * @return Todo
     */
    public function update($data, $id)
    {
        
        $todo = $this->todo->find($id);

        $todo->is_completed = $data['is_completed'];

        $todo->update();

        return $todo;
    }

    /**
     * Update Todo
     *
     * @param $data
     * @return Todo
     */
    public function delete($id)
    {
        
        $todo = $this->todo->find($id);
        $todo->delete();

        return $todo;
    }

}
