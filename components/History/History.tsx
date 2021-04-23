import { motion, AnimatePresence } from 'framer-motion';
import classnames from 'classnames';
import Item from '@components/History/Item';

export interface HistoryProps {
    displayHistory: boolean;
    history: {
        id: string;
        expression: string;
        value: string;
    }[];
    clearHistory: () => void;
    closeHistory: () => void;
}

const History: React.FC<HistoryProps> = ({
    displayHistory,
    history,
    clearHistory,
    closeHistory
}) => (
    <AnimatePresence>
        {displayHistory ? (
            <motion.div
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Motion Dev note: Awaiting Fix
                positionTransition
                initial={{
                    opacity: 0,
                    y: 10,
                    height: '80%',
                    width: '80%',
                    top: '10%',
                    left: '10%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
            >
                <div
                    className={classnames(
                        'h-full w-full p-5 bg-white dark:bg-gray-500 bg-opacity-90 dark:bg-opacity-95 flex flex-col text-gray-500 dark:text-gray-100 rounded-xl'
                    )}
                    data-testid='history'
                >
                    <strong className='border-gray-200 border-b mb-5 flex justify-between items-center'>
                        History
                        <button
                            type='button'
                            onClick={closeHistory}
                            className='text-3xl min-w-btn-p text-right'
                            aria-label='Hide History'
                        >
                            &times;
                        </button>
                    </strong>

                    <div className='flex-grow overflow-scroll'>
                        {history.map(({ id, expression, value }) => (
                            <Item
                                key={id}
                                value={value}
                                expression={expression}
                            />
                        ))}
                    </div>

                    <strong className='border-gray-200 border-t mt-5 flex justify-between items-center'>
                        Clear
                        <button
                            type='button'
                            onClick={clearHistory}
                            className='text-3xl min-w-btn-p text-right'
                            aria-label='Clear History'
                        >
                            &minus;
                        </button>
                    </strong>
                </div>
            </motion.div>
        ) : null}
    </AnimatePresence>
);

export default History;
