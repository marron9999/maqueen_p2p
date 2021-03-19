let speed = 0
let b_left = 0
let b_right = 0
let online = 0

radio.setGroup(255)
pins.analogWritePin(AnalogPin.P0, 0)
radio.sendString("O")

radio.onReceivedString(function (str: string) {
    if(str.charAt(0) == "O") {
        online = 1;
        basic.clearScreen()
    }
})
function line(y : number, v : number) {
    if(v == 0) {
        led.unplot(0, y)
        led.unplot(1, y)
        led.unplot(2, y)
        led.unplot(3, y)
        led.unplot(4, y)
    } else {
        led.unplot(0, y)
        led.unplot(1, y)
        led.unplot(2, y)
        led.unplot(3, y)
        led.unplot(4, y)
    }
}
function move() {
    if(speed <= -100) {
        line(0, 0)
        line(1, 0)
        line(2, 0)
        line(3, 0)
        line(4, 1)
    } else if(speed >= 255) {
        line(0, 1)
        line(1, 1)
        line(2, 1)
        line(3, 0)
        line(4, 0)
    } else if(speed >= 150) {
        line(0, 0)
        line(1, 1)
        line(2, 1)
        line(3, 0)
        line(4, 0)
    } else if(speed >= 50) {
        line(0, 0)
        line(1, 0)
        line(2, 1)
        line(3, 0)
        line(4, 0)
    } else {
        line(0, 0)
        line(1, 0)
        line(2, 0)
        line(3, 1)
        line(4, 0)
    }
    if(input.buttonIsPressed(Button.B)) {
        if(b_right != speed) {
            b_right = speed
            radio.sendString("R" + speed)
        }
    } else {    
        if(b_right != 0) {
            b_right = 0
            radio.sendString("R" + 0)
        }
    }
    if(input.buttonIsPressed(Button.A)) {
        if(b_left != speed) {
            b_left = speed
            radio.sendString("L" + speed)
        }
    } else {    
        if(b_left != 0) {
            b_left = 0
            radio.sendString("L" + 0)
        }
    }
}
basic.forever(function () {
    let p = input.rotation(Rotation.Pitch)
    if(p > 60) speed = 255
    else if(p > 35) speed = 150
    else if(p > 30) speed = 50
    else if(p < -30) speed = -100
    else speed = 0
    if(online > 0) {
        move()
    }
	basic.pause(250)
})
