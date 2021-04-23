import { useState } from 'react';
import Head from 'next/head';
import classnames from 'classnames';

import Wrapper from '@components/Wrapper/Wrapper';
import Display from '@components/Display/Display';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import OrientationToggle from '@components/OrientationToggle/OrientationToggle';
import History from '@components/History/History';
import HistoryToggle from '@components/History/Toggle';
import Keypad from '@components/Keypad/Keypad';

import { useLocalStorage, useCalculator } from '@hooks';
import { useKeyboardInput } from '@hooks/useKeyboardInput';

const Calculator: React.FC = () => {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
    const [portrait, setPortrait] = useLocalStorage('portrait', true);

    const [displayHistory, setDisplayHistory] = useState(false);

    const {
        state: { displayValue },

        history,
        setHistory
    } = useCalculator(portrait);

    useKeyboardInput(portrait);

    const toggleHistory = () => {
        setDisplayHistory((p) => !p);
    };

    return (
        <>
            <Head>
                <title>Calculator | Nick Ollier</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div
                className={classnames(
                    'w-full h-full flex justify-center items-center bg-gradient-to-r',
                    {
                        'dark from-gray-400 to-gray-500 text-gray-100': darkMode,
                        'from-gray-100 to-gray-200 text-gray-500': !darkMode
                    }
                )}
            >
                <div className='absolute top-0 right-0 p-6 flex space-x-2'>
                    <ThemeToggle
                        darkMode={darkMode}
                        onClick={() =>
                            setDarkMode((prevDarkMode) => !prevDarkMode)
                        }
                    />
                    <OrientationToggle
                        portrait={portrait}
                        onClick={() =>
                            setPortrait((prevPortrait) => !prevPortrait)
                        }
                    />
                </div>

                <Wrapper
                    darkMode={darkMode}
                    portrait={portrait}
                    overlay={displayHistory}
                >
                    {history.length ? (
                        <div
                            className={classnames(
                                'absolute min-h-btn-l min-w-btn-l p-2',
                                {
                                    'mt-5': portrait,
                                    'mt-3 ml-3': !portrait
                                }
                            )}
                        >
                            <HistoryToggle onClick={toggleHistory} />
                        </div>
                    ) : null}

                    <History
                        displayHistory={displayHistory}
                        clearHistory={() => setHistory([])}
                        history={history}
                        closeHistory={toggleHistory}
                    />

                    <div
                        className={classnames('flex h-full flex-col', {
                            'flex-col justify-end': portrait
                        })}
                    >
                        <div className='mt-3 mb-1'>
                            <Display
                                displayValue={displayValue}
                                portrait={portrait}
                            />
                        </div>

                        <Keypad portrait={portrait} />
                    </div>
                </Wrapper>
            </div>
        </>
    );
};

export default Calculator;
