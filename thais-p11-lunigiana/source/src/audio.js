// ============================================================================
// P11 original synthesized terrestrial ambience — no underwater drone or whale.
let forestAC=null,forestMaster=null,forestMuted=false,forestBirdTimer=null;
function sound(){
 if(!forestAC){
   const AC=window.AudioContext||window.webkitAudioContext;
   if(!AC)return;
   forestAC=new AC({latencyHint:'playback'});
   forestMaster=forestAC.createGain();
   forestMaster.gain.value=.28;
   forestMaster.connect(forestAC.destination);
   const seconds=5,rate=forestAC.sampleRate;
   const noise=forestAC.createBuffer(1,Math.round(rate*seconds),rate);
   const data=noise.getChannelData(0);
   let brown=0,seed=2041;
   for(let i=0;i<data.length;i++){
     seed=(Math.imul(seed,1664525)+1013904223)>>>0;
     const white=seed/2147483648-1;
     brown=(brown+white*.027)*.993;
     data[i]=Math.max(-1,Math.min(1,brown*.9));
   }
   const wind=forestAC.createBufferSource();
   wind.buffer=noise;wind.loop=true;
   const filter=forestAC.createBiquadFilter();filter.type='lowpass';filter.frequency.value=650;
   const windGain=forestAC.createGain();windGain.gain.value=.24;
   wind.connect(filter);filter.connect(windGain);windGain.connect(forestMaster);
   wind.start();
   const lfo=forestAC.createOscillator();lfo.frequency.value=.13;
   const depth=forestAC.createGain();depth.gain.value=.062;
   lfo.connect(depth);depth.connect(windGain.gain);lfo.start();
   let birdSeed=101;
   const chirp=()=>{
     if(!forestAC||forestAC.state!=='running'||forestMuted)return;
     birdSeed=(Math.imul(birdSeed,1664525)+1013904223)>>>0;
     const t=forestAC.currentTime+.02;
     const voice=forestAC.createOscillator();
     voice.type='sine';
     const g=forestAC.createGain();
     const start=1250+(birdSeed%650);
     voice.frequency.setValueAtTime(start,t);
     voice.frequency.exponentialRampToValueAtTime(start*1.45,t+.12);
     voice.frequency.exponentialRampToValueAtTime(start*.84,t+.32);
     g.gain.setValueAtTime(.0001,t);
     g.gain.exponentialRampToValueAtTime(.012,t+.04);
     g.gain.exponentialRampToValueAtTime(.0001,t+.37);
     voice.connect(g);g.connect(forestMaster);
     voice.start(t);voice.stop(t+.40);
     voice.onended=()=>{voice.disconnect();g.disconnect()};
   };
   forestBirdTimer=setInterval(chirp,5700);
 }
 if(forestAC.state==='suspended')forestAC.resume().catch(()=>{});
}
function mute(){
 forestMuted=!forestMuted;
 if(forestAC&&forestMaster)forestMaster.gain.setTargetAtTime(forestMuted?0:.28,forestAC.currentTime,.09);
}
document.addEventListener('visibilitychange',()=>{
 if(!forestAC)return;
 if(document.hidden)forestAC.suspend().catch(()=>{});
 else if(!forestMuted)forestAC.resume().catch(()=>{});
});
