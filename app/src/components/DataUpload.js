import React, { Component } from 'react';
import Upload from 'rc-upload';

import userStore from '../store/user';
import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

export class DataUpload extends Component {
  state = {};

  componentDidMount() {
    userStore.on('users', this.forceUpdate);
  }

  componentWillUnmount() {
    userStore.removeListener('users', this.forceUpdate);
  }

  handleUserSelected(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const users = userStore.getUsers().filter(user => !user.isResearcher && !user.isInternal);

    return (
      <div>
        <label>Users</label>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Select a user
          </DropdownToggle>
          <DropdownMenu>
            {users.map(user => (
              <DropdownItem key={user.name} onClick={() => this.handleUserSelected(user)}>{user.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        {user && <Upload/>}
      </div>
    );
  }
}
