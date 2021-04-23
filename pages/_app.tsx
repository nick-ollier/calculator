import '@styles/app.scss';
import CalculatorProvider from '@context/CalculatorContext';

const MyApp = ({ Component, pageProps }) => (
    <CalculatorProvider>
        <Component {...pageProps} />
    </CalculatorProvider>
);

export default MyApp;
