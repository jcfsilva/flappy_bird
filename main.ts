let score = 0
let wally = 0
let wallx = 0
let wall = 0
let bird_y = 2
let bird_x = 1
music.setBuiltInSpeakerEnabled(true)
game.setScore(0)
basic.forever(function on_forever() {
    
    wall = randint(2, 4)
    wallx = 4
    for (let index = 0; index < 5; index++) {
        wally = wall
        for (let index2 = 0; index2 < 6; index2++) {
            if (index2 > wally) {
                led.plot(wallx, index2)
            }
            
            if (index2 < wally - 1) {
                led.plot(wallx, index2)
            }
            
        }
        if (input.buttonIsPressed(Button.A)) {
            bird_y += -1
            music.playTone(622, music.beat(BeatFraction.Sixteenth))
            music.playTone(659, music.beat(BeatFraction.Sixteenth))
        } else {
            if (bird_y < 0) {
                bird_y = 0
            }
            
            bird_y += 0.5
            if (bird_y > 4) {
                bird_y = 4
            }
            
        }
        
        led.plot(bird_x, bird_y)
        basic.pause(500)
        if (bird_x == wallx) {
            if (Math.round(bird_y) == wally || Math.round(bird_y) == wally - 1) {
                score += 1
                music.playTone(880, music.beat(BeatFraction.Sixteenth))
                music.playTone(988, music.beat(BeatFraction.Sixteenth))
            } else {
                music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
                game.setScore(score)
                game.gameOver()
            }
            
        }
        
        led.unplot(bird_x, bird_y)
        wally = wall
        for (let index3 = 0; index3 < 6; index3++) {
            if (index3 > wally) {
                led.unplot(wallx, index3)
            }
            
            if (index3 < wally - 1) {
                led.unplot(wallx, index3)
            }
            
        }
        wallx += -1
    }
})
