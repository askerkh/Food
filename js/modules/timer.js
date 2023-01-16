function timer(timerBlocksSelector, deadline) {
    //timer
        
    function getTimeRemaining(endtime) {
        const t = (Date.parse(endtime) - new Date()) / 1000;
        const days = Math.trunc(t / 86400);
        const hours = Math.trunc(t % 86400 / 3600);
        const minutes = Math.trunc(t % 86400 % 3600 / 60);
        const seconds = Math.trunc(t % 86400 % 3600 % 60);

        return [days, hours, minutes, seconds, t];
    }

    function setTime(selector, endtime) {
        const time = document.querySelectorAll(selector);

        const timeRemaining = getTimeRemaining(endtime);
        
        reloadTimer();

        function reloadTimer() {
            const timeRemaining = getTimeRemaining(endtime);
            timeRemaining.forEach((el, index, arr) => {
                if(el < 10) {
                    arr[index] = `0${el}`;
                }
            });
            time.forEach((el, index) => el.innerHTML = timeRemaining[index]);
        }

        const timer = setInterval(reloadTimer, 1000);
        if(timeRemaining[timeRemaining.length] <= 0) {
            clearInterval(timer);
        }
    }

    setTime(timerBlocksSelector, deadline);
}

export default timer;