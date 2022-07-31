export default class Timeline {
    timeline = [];
    time = 0;

    addEvent(delay, event) {
        this.time += delay
        this.timeline.push({ time: this.time, event })
    }

    get() {
        return this.timeline
    }
}