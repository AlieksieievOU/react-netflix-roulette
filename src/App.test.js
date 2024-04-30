import {render} from '@testing-library/react';
import App from './App';

describe('Test app Component', () => {
    test('app Component has wrapper with class app', () => {
        const {container} = render(<App/>);
        expect(container.firstChild).toHaveClass('App')
    });
});

