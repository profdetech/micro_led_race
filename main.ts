function animation (texte: string) {
    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
    if (texte == "a") {
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
        strip.show()
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        strip.show()
    }
}
function aff_nb_tours () {
    if (nb_tour_a > nb_tour_b) {
        basic.showNumber(nb_tour_a)
    } else {
        basic.showNumber(nb_tour_b)
    }
}
input.onButtonPressed(Button.AB, function () {
    demarrage()
})
function demarrage () {
    fin = 1
    strip.clear()
    strip.show()
    a = 0
    b = 0
    nb_tour_a = 0
    nb_tour_b = 0
    nb_tour_total = 3
    rebours = 5
    for (let index = 0; index < 5; index++) {
        basic.showNumber(rebours)
        basic.pause(1000)
        rebours += -1
    }
    basic.showIcon(IconNames.Happy)
    fin = 0
}
pins.onPulsed(DigitalPin.P13, PulseValue.High, function () {
    if (fin == 0) {
        if (b == 29) {
            nb_tour_b += 1
            aff_nb_tours()
            if (nb_tour_b == nb_tour_total) {
                fin = 1
                animation("b")
            }
            b = 0
        } else {
            b = b + 1
        }
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
    }
})
function aff_led () {
    strip.clear()
    if (a == b) {
        strip.setPixelColor(a, neopixel.colors(NeoPixelColors.Purple))
    } else {
        strip.setPixelColor(a, neopixel.colors(NeoPixelColors.Violet))
        strip.setPixelColor(b, neopixel.colors(NeoPixelColors.Yellow))
    }
    strip.show()
}
pins.onPulsed(DigitalPin.P12, PulseValue.Low, function () {
    if (fin == 0) {
        if (a == 29) {
            nb_tour_a += 1
            aff_nb_tours()
            if (nb_tour_a == nb_tour_total) {
                fin = 1
                animation("a")
            }
            a = 0
        } else {
            a = a + 1
        }
        music.playTone(440, music.beat(BeatFraction.Sixteenth))
    }
})
let rebours = 0
let nb_tour_total = 0
let b = 0
let a = 0
let fin = 0
let nb_tour_b = 0
let nb_tour_a = 0
let strip: neopixel.Strip = null
music.setBuiltInSpeakerEnabled(true)
strip = neopixel.create(DigitalPin.P8, 30, NeoPixelMode.RGB)
demarrage()
basic.forever(function () {
    aff_led()
    basic.pause(100)
})
