// @ts-ignore
import inpageUrl from '../inpage/index.ts?script&module';

console.log("OneWallet: Content script running");
const script = document.createElement('script');
script.setAttribute('type', 'module');
script.setAttribute('src', chrome.runtime.getURL(inpageUrl));
script.onload = () => console.log("OneWallet: Inpage script loaded");
script.onerror = (e) => console.error("OneWallet: Inpage script failed to load", e);
(document.head || document.documentElement).appendChild(script);

// Listen for messages from the injected script
window.addEventListener('message', (event) => {
    // We only accept messages from ourselves
    if (event.source !== window) return;

    // Check if the message is from our inpage script
    if (event.data?.target === 'one-wallet-content') {
        // Forward it to the background script
        chrome.runtime.sendMessage(event.data, (response) => {
            // Forward the response back to the inpage script
            window.postMessage({
                target: 'one-wallet-inpage',
                requestId: event.data.requestId,
                ...response
            }, '*');
        });
    }
});
