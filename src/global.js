import { Toast, Modal } from 'antd-mobile';
import './global.less';

// Notify user if offline now
window.addEventListener('sw.offline', () => {
  Toast.offline('当前处于离线状态');
});

// Pop up a prompt on the page asking the user if they want to use the latest version
window.addEventListener('sw.updated', e => {
  const reloadSW = async () => {
    // Check if there is sw whose state is waiting in ServiceWorkerRegistration
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
    const worker = e.detail && e.detail.waiting;
    if (!worker) {
      return Promise.resolve();
    }
    // Send skip-waiting event to waiting SW with MessageChannel
    await new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = event => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
    });
    // Refresh current page to use the updated HTML and other assets after SW has skiped waiting
    window.location.reload(true);
    return true;
  };
  Modal.alert('有新内容', '请点击“刷新”按钮或者手动刷新页面', [
    {
      text: '刷新',
      onPress: () => {
        reloadSW();
      },
    },
  ]);
});
