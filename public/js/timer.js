function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds + ' minutes');

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

$(function() {
    let duration = $('.main').text() * 60,
        display = $('#time');
    startTimer(duration, display);
});
