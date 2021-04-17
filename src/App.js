import React from 'react';
import { firestore } from './firebase';

export class App extends React.Component {
  state = {
    taskInput: '',
    tasks: [],
  };

  componentDidMount() {
    this.unsubscribe = firestore.collection('tasks').onSnapshot((snapshot) => {
      const result = [];
      snapshot.forEach((snapshotDoc) =>
        result.push({
          id: snapshotDoc.id,
          data: snapshotDoc.data(),
        })
      );
      this.setState({ tasks: result });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await firestore.collection('tasks').add(
        {
          task: this.state.taskInput,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <div className="flex">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                value={this.state.taskInput}
                onChange={(e) =>
                  this.setState({ ...this.state, taskInput: e.target.value })
                }
              />
            </div>
            <div>
              <button>add</button>
            </div>
          </form>
          <div>
            {this.state.tasks.length > 0
              ? this.state.tasks.map(
                  ({ id, data: { task, userId } }, index) => {
                    return (
                      <div key={index}>
                        <div>
                          {id}: {task} by {userId}
                        </div>
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      </div>
    );
  }
}
