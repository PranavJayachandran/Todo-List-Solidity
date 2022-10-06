import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import React, { useEffect, useState, Component } from "react";
import Web3 from "web3";
import myContract from "./myContract";
import { MdOutlineDone } from "react-icons/md";

class App extends Component {
  componentWillMount() {
    this.loadBlockchain();
  }

  async loadBlockchain() {
    this.setState({ wallet: web3.currentProvider.selectedAddress });
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.getdata();
  }
  async getdata() {
    const taskCount = await myContract.methods.taskCount().call();
    console.log(taskCount);

    for (var i = 0; i < taskCount; i++) {
      const task = await myContract.methods.getTask(i).call();
      this.setState({
        tasks: [...this.state.tasks, task],
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      wallet: " ",
      tasks: [],
      taskCount: 0,
      newstate: "",
      account: "",
    };
    this.createTask = this.createTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  async createTask() {
    if (this.state.newstate.length > 0) {
      const p = await myContract.methods
        .createTask(this.state.newstate)
        .send({ from: this.state.account });
      await myContract.methods.taskCount().call();

      this.setState({ tasks: [] });
      this.setState({ newstate: "" });
      this.getdata();
    }
  }
  async toggleCompleted(id) {
    var done = await myContract.methods.isComplete(id).call();
    if (!done) {
      await myContract.methods
        .completedTask(id)
        .send({ from: this.state.account });
      this.setState({ tasks: [] });
      this.setState({ newstate: "" });
      this.getdata();
    }
  }

  render() {
    return (
      <div className="App">
        <p className="your-wallet">Your wallet id {this.state.wallet}</p>
        <div className="tasks-container">
          <h1 className="tasks-header">TASKS</h1>
          <div className="tasks">
            {this.state.tasks.map((item, index) => (
              <div className="task">
                <div
                  className="task-name"
                  style={
                    item.completion ? { textDecoration: "line-through" } : {}
                  }
                >
                  {item.task}
                </div>
                <button
                  className="task-complete"
                  onClick={() => this.toggleCompleted(item.id)}
                >
                  <MdOutlineDone />
                </button>
              </div>
            ))}
          </div>
          <div className="createnewtask">
            <div className="createdata">
              <label className="Create">Add new Task</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter"
                value={this.state.newstate}
                onChange={(e) => this.setState({ newstate: e.target.value })}
              ></input>
            </div>
            <div className="create-button">
              <button className="submit" onClick={this.createTask}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
