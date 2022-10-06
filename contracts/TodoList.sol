// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TodoList{
    uint public taskCount=0;
    struct Todo  {
        uint  id ;
        string task;
        bool completion;
    }

    mapping (uint=>Todo)Todos;
    constructor(){
    }
    function createTask(string memory _task) public returns(string memory) {
        Todos[taskCount]=Todo(taskCount,_task,false);
        taskCount++;
        return _task;
    }
    function getTask(uint _taskCount) public view  returns(Todo memory) {
        return Todos[_taskCount];
    }
    function isComplete(uint _taskid) public view returns(bool){
        return Todos[_taskid].completion;
    }
    function completedTask(uint _taskCount) public {
        Todos[_taskCount].completion=true;
    }
}