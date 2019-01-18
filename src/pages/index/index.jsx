
import React, { PureComponent } from 'react';
import styles from './index.less';

class Index extends PureComponent {
  render() {
    const { route } = this.props;
    const testList = Array.from({ length: 10 }, (v, i) => i);
    return (
      <div className={styles.index}>
        <div className={styles.test}>
          <h2>{route.title}</h2>
          {testList.map(i => (
            <div className={styles.square} key={i}>
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;
