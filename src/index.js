import { registerProxy } from './lib/WebSocketProxy';
import store from './lib/redux/store';

let ws;

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  registerProxy(store.dispatch);
  await import('./lib/ui');
  ws = new WebSocket('wss://demos.kaazing.com/echo');
  ws.addEventListener('open', async evt => {
    await sleep(250);
    ws.send('hey data');
    await sleep(250);
    ws.send('going away');
    await sleep(100);
    ws.close(3000, 'gone');
  });
}

main();
