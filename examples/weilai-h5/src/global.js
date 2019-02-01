import { Toast, Modal } from 'antd-mobile';
import { setAuthority } from '@/utils/authority';
import initWx from '@/utils/wx';
import debug from '@/utils/debug';
import './global.less';

setAuthority('admin');

const bgmusic = require('@/audio/bgm.mp3');
const shareIcon = require('@/assets/share-icon.jpeg');
const playIcom = require('@/assets/play.png');
const pauseIcom = require('@/assets/pause.png');

// 背景音乐开始
const elAudio = new Audio();
// @ts-ignore
window.el_audio = elAudio;
elAudio.setAttribute('src', bgmusic);
elAudio.loop = true;

const elPlay = document.createElement('img');
elPlay.classList.add('music');
elPlay.setAttribute('src', playIcom);

elPlay.addEventListener('touchstart', play);
document.body.appendChild(elPlay);

function play(e) {
  if (!!e) {
    e.stopPropagation && e.stopPropagation();
    e.preventDefault && e.preventDefault();
  }
  document.removeEventListener('touchstart', play);
  if (!elAudio.paused) {
    elAudio.pause();
    elPlay.classList.remove('play');
    elPlay.setAttribute('src', pauseIcom);
  } else {
    elAudio.play();
    elPlay.classList.add('play');
    elPlay.setAttribute('src', playIcom);
  }
}

try {
  document.addEventListener('WeixinJSBridgeReady', () => {
    WeixinJSBridge.invoke('getNetworkType', {}, play);
  });
} catch (e) {
  console.warn('非微信环境');
}
const isAppInside = /micromessenger/i.test(navigator.userAgent.toLowerCase()) || /yixin/i.test(navigator.userAgent.toLowerCase());
if (!isAppInside) { // 给非微信易信浏览器
                    // @ts-ignore
  play();
  if (elAudio.paused) {
    document.addEventListener('touchstart', play);
  }
}

// 背景音乐结束

function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

if (!isWeixn()) {
  // alert('请在微信客户端打开');
  // window.location.replace('#/404');
} else {
  debug().then(() => {
    initWx({
      title: '试驾蔚来ES8，来测测你的驾驶人格！',
      imgUrl: shareIcon,
      isNeedLogin: true,
      desc: '试驾蔚来ES8，认识路上的自己',
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
