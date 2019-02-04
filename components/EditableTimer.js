import React from 'react';

import Timer from './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
    isRunning: false
  }

  render() {
    const {id,
      title,
      project,
      elapsed,
      isRunning,
      editFormOpen} = this.props;
    return (
      // Nothing
      null
    );
  }
}
export default function EditableTimer({

}) {
  if (editFormOpen) {
    return <TimerForm id={id} title={title} project={project} />;
  }

  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
    />
  );
}
