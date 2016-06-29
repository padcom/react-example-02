import React from 'react';

import Title from './title';
import Input from './input';

import styles from './app.less'

const App = () => (
  <div class={styles.app}>
    <Input />
    <Title />
  </div>
)

export default App;
