const ctx = new (window.AudioContext || window.webkitAudioContext)()
const fft = new AnalyserNode(ctx, { fftSize: 2048 })
createWaveCanvas({ element: 'section', analyser: fft })


const keys = [
  440.0000,
  466.1638,
  493.8833,
  523.2511,
  554.3653,
  587.3295,
  622.2540,
  659.2551,
  698.4565,
  739.9888,
  783.9909,
  830.6094,
]

  const lvl = new GainNode(ctx, {
    gain: 1,
  })


  const tone = new OscillatorNode(ctx, {
    frequency: 440,
  })

  lvl.connect(ctx.destination)
  lvl.connect(fft)

  tone.connect(lvl)
  tone.connect(ctx.destination)
  tone.start(ctx.currentTime)
  tone.stop(ctx.currentTime + 100)

function note (iter) {
  //https://stackoverflow.com/a/5915122/10827114
  let note1 = keys[Math.floor(Math.random() * keys.length)]
  tone.frequency.setValueAtTime(note1, ctx.currentTime + iter + 1)
}


  for(let i = 1; i<101; i++) {
    lvl.gain.setValueAtTime(i*i, ctx.currentTime + i)
    note(i)
  }
