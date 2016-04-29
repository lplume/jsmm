# JSMM • JavaScript MIDIMessage #
----------
JSMM ~~is~~ will be a JavaScript library providing an API for generating MIDIMessage. At the moment it´s still a proof of concept.
## Aims ##
----------
Building a simple pluggable API to generate channel and sysex MIDIMessage. The library would provide both low and high levels way to build message; my main idea is to use this library to help the usage of the WEB MIDI API.
##What about now?##
----------
A skeleton and a proof of concept, just start the development.
The source provide two classes:

 - **CommonMIDIMessage**: provide generic Channel Message s like`midiMessage.NoteOn({note, velocity, channel})`, a low level `midiMessage.ChannelMessage(command, dataOne, dataTwo)`, a generic low level `midiMessage.SysEx(manufacturerId, data)` and a utility `midiMessage.statusBytes(command, channel)`
 - **Generator**: the generator holds the midiMessage `new Generator(MIDIMessage)` (default to CommonMIDIMessage). You can call method of the midi message directly from Generator.mm
```javascript
var g = new JSMM.Generator();
g.ChannelMessage('NoteOn', {note:60, velocity:70});
g.mm.NoteOn({note:60, velocity:70});
 ```
 - **WaldorfM2MidiMessage**: a first attempt to test how pluggable JSMM is

##Why?##
----------
Mainly my lack of hardware, secondly I love to play around WEB AUDIO/MIDI API.
##Thanks so far##
----------
• [grimmdude](https://github.com/grimmdude): my js-midi interest started from his MidiWriterJS
• [kjub](https://sites.google.com/site/dariopizzamiglio/home): for the great insights
• [paco](https://github.com/lucapalomba): for js suggestions


