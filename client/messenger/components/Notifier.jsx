import React, { PropTypes } from 'react';
import striptags from 'striptags';
import { toggleNotifer, toggleNotiferFull } from '../actions/messenger';
import { User, EngageMessage } from '../components';

const propTypes = {
  lastUnreadMessage: PropTypes.object,
  changeConversation: PropTypes.func,
};

class Notifier extends React.Component {
  componentDidMount() {
    this.showUnreadMessage();
  }

  componentDidUpdate() {
    this.showUnreadMessage();
  }

  showUnreadMessage() {
    const lastUnreadMessage = this.props.lastUnreadMessage;

    if (lastUnreadMessage._id) {
      const engageData = lastUnreadMessage.engageData;

      if (engageData && engageData.sentAs === 'fullMessage') {
        toggleNotiferFull();
      } else {
        toggleNotifer();
      }
    }
  }

  renderNotificationBody() {
    const { lastUnreadMessage } = this.props;
    const { engageData, user, content } = lastUnreadMessage;

    if (engageData) {
      return <EngageMessage engageData={engageData} />;
    }

    return (
      <div className="notification-wrapper">
        <div className="user-info">
          <User user={user} />
          {user.details.fullName}
        </div>
        <div className="notification-body">
          {striptags(content)}
        </div>
      </div>
    );
  }

  renderClass() {
    const { lastUnreadMessage } = this.props;
    if (lastUnreadMessage.engageData) {
      return `erxes-notification ${lastUnreadMessage.engageData.sentAs}`;
    }
    return 'erxes-notification';
  }

  render() {
    const { lastUnreadMessage, changeConversation } = this.props;
    if (lastUnreadMessage._id) {
      return (
        <div
          className={this.renderClass()}
          onClick={() => changeConversation(lastUnreadMessage.conversationId)}
        >
          {this.renderNotificationBody()}
        </div>
      );
    }

    return null;
  }
}

Notifier.propTypes = propTypes;

export default Notifier;
