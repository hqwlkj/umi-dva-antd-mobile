import { Toast, Modal } from 'antd-mobile';
import { setAuthority } from '@/utils/authority';
import initWx from '@/utils/wx';
import debug from '@/utils/debug';
import './global.less';

setAuthority('admin');

function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

if (!isWeixn()) { // 需要在微信端运行的时候 开启下面的注释
  // alert('请在微信客户端打开');
  // window.location.replace('#/404');
} else {
  debug().then(() => {
    initWx({
      title: '分享标题',
      imgUrl: '', // 分享图标
      isNeedLogin: true,
      desc: '分享描述',
      openid: process.env.NODE_ENV === 'development' ? 'oEgayjggrU06oORZJVeFUJ_KF1Mk' : undefined,
    });
  });
}

// Notify user if offline now
window.addEventListener('sw.offline', () => {
  Toast.offline('当前处于离线状态');
});

// Pop up a prompt on the page asking the user if they want to use the latest version
window.addEventListener('sw.updated', e => {
  console.log('sw.updated');
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
