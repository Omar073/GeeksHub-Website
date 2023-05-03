
export default function Countdown() {
return(
    <div className="stopwatch-container p-4">
        <div className="timer-container flex justify-center items-center space-x-2 font-mono text-3xl text-gray-800 dark:text-gray-200">
            <div className="digit-container flex flex-col items-center">
                <div className="digit top ">0</div>
            </div>
            <div className="digit-container flex flex-col items-center">
                <div className="digit top">0</div>
            </div>
            <div className="digit-separator ">:</div>
            <div className="digit-container flex flex-col items-center">
                <div className="digit top ">0</div>
            </div>
            <div className="digit-container flex flex-col items-center">
                <div className="digit top ">0</div>
            </div>
            <div className="digit-separator ">:</div>
            <div className="digit-container flex flex-col items-center">
                <div className="digit top ">0</div>
            </div>
            <div className="digit-container flex flex-col items-center">
                <div className="digit top ">0</div>
            </div>
        </div>
    </div>
);


}