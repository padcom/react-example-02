import React from 'react';

import Title from './Title';
import Input from './Input';

import styles from './App.less'

const App = () => (
  <div class={styles.component}>
    <Input />
    <Title />
  </div>
)

export default App;
