import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder for JSDom
if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();
