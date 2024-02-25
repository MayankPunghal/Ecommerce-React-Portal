import React from 'react';
import { showToast, ToastUtils } from './UtilComponent/ToastUtil';

const TestToasts = () => {
  return (
    <div>
      <ToastUtils />
      <button onClick={() => showToast('Test Success Toast')}>Show Toast</button>
    </div>
  );
};

export default TestToasts;
