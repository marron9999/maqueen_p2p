bluetooth.onBluetoothConnected(function () {
    R_Rotation = 0
})
bluetooth.onBluetoothDisconnected(function () {
    R_Rotation = 0
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    str = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    R_Rotation = parseInt(str)
})
function HEX (v: number) {
    c = "0123456789ABCDEF"
    if (v < 0) {
        v = 0 - v
        v += -1
        c = "FEDCBA9876543210"
    }
    s = c.charAt(v % 16)
    v = Math.floor(v / 16)
    s = "" + c.charAt(v % 16) + s
    v = Math.floor(v / 16)
    s = "" + c.charAt(v % 16) + s
    v = Math.floor(v / 16)
    s = "" + c.charAt(v % 16) + s
    return s
}
let p = 0
let r = 0
let s = ""
let v = 0
let c = ""
let str = ""
let R_Rotation = 0
let V_Rotation = { R: 0, P: 0 }
bluetooth.startUartService()
basic.forever(function () {
    if (R_Rotation != 0) {
        r = input.rotation(Rotation.Roll)
        p = input.rotation(Rotation.Pitch)
        if (R_Rotation != 1) {
            r = Math.floor(r / R_Rotation) * R_Rotation
            p = Math.floor(p / R_Rotation) * R_Rotation
        }
        if (V_Rotation.R != r || V_Rotation.P != p) {
            V_Rotation.R = r
            V_Rotation.P = p
            bluetooth.uartWriteString("R-" + HEX(V_Rotation.R) + HEX(V_Rotation.P))
        }
    }
    basic.pause(250)
})
