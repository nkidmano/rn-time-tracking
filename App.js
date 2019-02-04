import React from 'react';
import uuidv4 from 'uuid/v4';

import { newTimer } from './utils/TimerUtils';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false
      }
    ]
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          };
        })
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;

    this.setState({
      timers: [newTimer(timer), ...timers]
    });
  };

  handleUpdateFormSubmit = attrs => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;

          return {
            ...timer,
            title,
            project
          };
        }
        return timer;
      })
    });
  };

  handleRemovePress = timerId => {
    const { timers } = this.state;

    this.setState({
      timers: timers.filter(timer => timer.id !== timerId)
    });
  };

  toggleTimer = timerId => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        const { id, isRunning } = timer;

        if (id === timerId) {
          return {
            ...timer,
            isRunning: !isRunning
          };
        }

        return timer;
      })
    });
  };

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.timerListContainer}
          behavior="padding"
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map(({ id, title, project, elapsed, isRunning }) => (
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
                onFormSubmit={this.handleUpdateFormSubmit}
                onRemovePress={this.handleRemovePress}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timerListContainer: {
    flex: 1
  },
  timerList: {
    paddingBottom: 15
  }
});
