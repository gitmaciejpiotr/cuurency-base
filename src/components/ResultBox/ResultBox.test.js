import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD', output: 'PLN 100.00 = $28.57' },
            { amount: 20, from: 'PLN', to: 'USD', output: 'PLN 20.00 = $5.71' },
            { amount: 200, from: 'PLN', to: 'USD', output: 'PLN 200.00 = $57.14' },
            { amount: 345, from: 'PLN', to: 'USD', output: 'PLN 345.00 = $98.57' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox amount={testObj.amount} from={testObj.from} to={testObj.to} />);
            const conversionInfo = screen.getByTestId('conversion-info');
            expect(conversionInfo).toHaveTextContent(testObj.output);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: 100, from: 'USD', to: 'PLN', output: '$100.00 = PLN 350.00' },
            { amount: 20, from: 'USD', to: 'PLN', output: '$20.00 = PLN 70.00' },
            { amount: 200, from: 'USD', to: 'PLN', output: '$200.00 = PLN 700.00' },
            { amount: 345, from: 'USD', to: 'PLN', output: '$345.00 = PLN 1,207.50' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox amount={testObj.amount} from={testObj.from} to={testObj.to} />);
            const conversionInfo = screen.getByTestId('conversion-info');
            expect(conversionInfo).toHaveTextContent(testObj.output);
            cleanup();
        }
    });
    it('should render proper info about conversion when from and to are the same', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'PLN', output: 'PLN 100.00 = PLN 100.00' },
            { amount: 20, from: 'USD', to: 'USD', output: '$20.00 = $20.00' },
            { amount: 200, from: 'PLN', to: 'PLN', output: 'PLN 200.00 = PLN 200.00' },
            { amount: 345, from: 'USD', to: 'USD', output: '$345.00 = $345.00' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox amount={testObj.amount} from={testObj.from} to={testObj.to} />);
            const conversionInfo = screen.getByTestId('conversion-info');
            expect(conversionInfo).toHaveTextContent(testObj.output);
            cleanup();
        }
    });
    it('should render message “Wrong value…” when amount value is incorrect', () => {
        const testCases = [
            { amount: -100, from: 'PLN', to: 'USD' },
            { amount: -345, from: 'USD', to: 'USD' },
            { amount: -20, from: 'PLN', to: 'PLN' },
            { amount: -200, from: 'USD', to: 'PLN' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox amount={testObj.amount} from={testObj.from} to={testObj.to} />);
            const conversionInfo = screen.getByTestId('conversion-info');
            expect(conversionInfo).toHaveTextContent('Wrong value...');
            cleanup();
        }
    });
});