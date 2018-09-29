import { registerProxy } from './lib/WebSocketProxy';
import store from './lib/redux/store';

let ws;

const webSocketUrl = 'wss://demos.kaazing.com/echo';
const webSocketProtocols = void 0; // [];

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  registerProxy(store.dispatch);
  await import('./lib/ui');
  ws = new WebSocket(webSocketUrl, webSocketProtocols);
  ws.addEventListener('open', async evt => {
    await sleep(500);
    ws.send('hey data');
    await sleep(500);
    ws.send('going away');
    await sleep(500);
    ws.close(3000, 'gone');
  });
}

main();
