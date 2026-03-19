(function () {
    let audioContext = null;

    function getAudioContext() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        if (!audioContext) {
            audioContext = new AudioContextClass();
        }
        if (audioContext.state === "suspended") {
            audioContext.resume().catch(() => {});
        }
        return audioContext;
    }

    function playTone({
        frequency = 440,
        duration = 0.08,
        type = "sine",
        volume = 0.03
    } = {}) {
        const ctx = getAudioContext();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const now = ctx.currentTime;

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, now);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    function playCompareTone(value = 40) {
        playTone({
            frequency: 220 + value * 3,
            duration: 0.035,
            type: "triangle",
            volume: 0.018
        });
    }

    function playPlacedTone(value = 40) {
        playTone({
            frequency: 320 + value * 4,
            duration: 0.08,
            type: "sine",
            volume: 0.024
        });
    }

    function playPairTone(value = 40) {
        playTone({
            frequency: 280 + value * 3.5,
            duration: 0.06,
            type: "square",
            volume: 0.022
        });

        setTimeout(() => {
            playTone({
                frequency: 340 + value * 3.5,
                duration: 0.07,
                type: "square",
                volume: 0.02
            });
        }, 55);
    }

    function playCompleteTone() {
        playTone({
            frequency: 523.25,
            duration: 0.08,
            type: "sine",
            volume: 0.026
        });

        setTimeout(() => {
            playTone({
                frequency: 659.25,
                duration: 0.1,
                type: "sine",
                volume: 0.026
            });
        }, 90);

        setTimeout(() => {
            playTone({
                frequency: 783.99,
                duration: 0.14,
                type: "sine",
                volume: 0.028
            });
        }, 190);
    }

    window.visualizerAudio = {
        playTone,
        playCompareTone,
        playPairTone,
        playPlacedTone,
        playCompleteTone
    };
})();
