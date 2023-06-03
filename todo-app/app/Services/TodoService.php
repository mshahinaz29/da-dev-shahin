<?php

namespace App\Services;

use App\Models\Todo;
use App\Repositories\TodoRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class TodoService
{
    /**
     * @var $todoRepository
     */
    protected $todoRepository;

    /**
     * TodoService constructor.
     *
     * @param TodoRepository $todoRepository
     */
    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    /**
     * Delete todo by id.
     *
     * @param $id
     * @return String
     */
    public function deleteById($id)
    {
        DB::beginTransaction();

        try {
            $todo = $this->todoRepository->delete($id);

        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Unable to delete todo data');
        }

        DB::commit();

        return $todo;

    }

    /**
     * Get all todo.
     *
     * @return String
     */
    public function getAll()
    {
        return $this->todoRepository->getAll();
    }

    /**
     * Get todo by id.
     *
     * @param $id
     * @return String
     */
    public function getById($id)
    {
        return $this->todoRepository->getById($id);
    }

    /**
     * Update todo data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function updateTodo($data, $id)
    {
        $validator = Validator::make($data, [
            'is_completed' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }
        
        DB::beginTransaction();

        try {
            $todo = $this->todoRepository->update($data, $id);

        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Unable to update todo data');
        }

        DB::commit();

        return $todo;

    }

    /**
     * Validate todo data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return String
     */
    public function saveTodoData($data)
    {
        $validator = Validator::make($data, [
            'name' => 'required',
            'is_completed' => 'boolean|required'
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $result = $this->todoRepository->save($data);

        return $result;
    }

}
