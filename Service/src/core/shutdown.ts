var exec = require('child_process').exec;

export class Shutdown {

    public shutdown(): void {
        exec('shutdown now');
    }
}

var sh = new Shutdown();
sh.shutdown();