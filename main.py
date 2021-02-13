score = 0
wally = 0
wallx = 0
wall = 0
bird_y = 2
bird_x = 1
music.set_built_in_speaker_enabled(True)
game.set_score(0)

def on_forever():
    global wall, wallx, wally, bird_y, score
    wall = randint(2, 4)
    wallx = 4
    for index in range(5):
        wally = wall
        for index2 in range(6):
            if index2 > wally:
                led.plot(wallx, index2)
            if index2 < wally - 1:
                led.plot(wallx, index2)
        if input.button_is_pressed(Button.A):
            bird_y += -1
            music.play_tone(622, music.beat(BeatFraction.SIXTEENTH))
            music.play_tone(659, music.beat(BeatFraction.SIXTEENTH))
        else:
            if bird_y < 0:
                bird_y = 0
            bird_y += 0.5
            if bird_y > 4:
                bird_y = 4
        led.plot(bird_x, bird_y)
        basic.pause(500)
        if bird_x == wallx:
            if Math.round(bird_y) == wally or Math.round(bird_y) == wally - 1:
                score += 1
                music.play_tone(880, music.beat(BeatFraction.SIXTEENTH))
                music.play_tone(988, music.beat(BeatFraction.SIXTEENTH))
            else:
                music.start_melody(music.built_in_melody(Melodies.FUNERAL), MelodyOptions.ONCE)
                game.set_score(score)
                game.game_over()
        led.unplot(bird_x, bird_y)
        wally = wall
        for index3 in range(6):
            if index3 > wally:
                led.unplot(wallx, index3)
            if index3 < wally - 1:
                led.unplot(wallx, index3)
        wallx += -1
basic.forever(on_forever)
