let ope = ""

radio.setGroup(255)
pins.analogWritePin(AnalogPin.P0, 0)
stop_maqueen();
music.playTone(131, music.beat(BeatFraction.Sixteenth))

function stop_maqueen() {
    maqueen.motorRun(maqueen.Motor.All, maqueen.Dir.Forward, 0)
    maqueen.writeLED(maqueen.LED.Left, maqueen.Switch.Off)
    maqueen.writeLED(maqueen.LED.Right, maqueen.Switch.Off)
    music.playTone(131, music.beat(BeatFraction.Sixteenth))
}

radio.onReceivedString(function (str: string) {
    if (ope.length > 0) ope += ","
    ope += str
})
function parse(str: string) {
    let c = str.charAt(0)
    if (c == "O") {
        radio.sendString("O")
        basic.showIcon(IconNames.Heart)
        return
    }
    if (c == "S") {
        stop_maqueen()
        basic.clearScreen()
        return
    }
    let v = parseInt(str.substr(1))
    if (c == "L") {
        maqueen.writeLED(maqueen.LED.Left, (v == 0) ? maqueen.Switch.Off : maqueen.Switch.On)
        if (v >= 0) {
            maqueen.motorRun(maqueen.Motor.Left, maqueen.Dir.Forward, v)
        } else {
            maqueen.motorRun(maqueen.Motor.Left, maqueen.Dir.Backward, Math.abs(v))
        }
        music.playTone(131, music.beat(BeatFraction.Sixteenth))
        return
    }
    if (c == "R") {
        maqueen.writeLED(maqueen.LED.Right, (v == 0) ? maqueen.Switch.Off : maqueen.Switch.On)
        if (v >= 0) {
            maqueen.motorRun(maqueen.Motor.Right, maqueen.Dir.Forward, v)
        } else {
            maqueen.motorRun(maqueen.Motor.Right, maqueen.Dir.Backward, Math.abs(v))
        }
        music.playTone(131, music.beat(BeatFraction.Sixteenth))
        return
    }
    if (c == "B") {
        maqueen.writeLED(maqueen.LED.Left, (v == 0) ? maqueen.Switch.Off : maqueen.Switch.On)
        maqueen.writeLED(maqueen.LED.Right, (v == 0) ? maqueen.Switch.Off : maqueen.Switch.On)
        if (v >= 0) {
            maqueen.motorRun(maqueen.Motor.All, maqueen.Dir.Forward, v)
        } else {
            maqueen.motorRun(maqueen.Motor.All, maqueen.Dir.Backward, Math.abs(v))
        }
        music.playTone(131, music.beat(BeatFraction.Sixteenth))
        return
    }
}

basic.forever(function () {
    let opx = ope;
    ope = ""
    while (opx.length > 0) {
        let p = opx.indexOf(",")
        let str = null
        if (p >= 0) {
            str = opx.substr(0, p)
            opx = opx.substr(p + 1)
        } else {
            str = opx
            opx = ""
        }
        parse(str)
    }
    basic.pause(250)
})
