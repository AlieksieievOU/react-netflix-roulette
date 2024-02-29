import {render} from '@testing-library/react';
import App from './App';

describe('Test App Component', () => {
    test('App Component has wrapper with class App', () => {
        const {container} = render(<App/>);
        expect(container.firstChild).toHaveClass('App')
    });
});

