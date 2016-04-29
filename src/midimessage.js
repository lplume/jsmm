(function () {
    "use strict";

    var JSMM = this.JSMM = {};

    JSMM.CommonMIDIMessage = function () {};

    JSMM.CommonMIDIMessage.prototype.ChannelMessage = function (command, dataOne, dataTwo) {
        var hexArray = []
            .concat(command)
            .concat(dataOne);
        if (dataTwo) {
            hexArray = hexArray.concat(dataTwo);
        }

        return hexArray;
    }

    JSMM.CommonMIDIMessage.prototype.SysEx = function(manufacturerId, data) {
        return []
            .concat(0xF0)
            .concat(manufacturerId)
            .concat(data)
            .concat(0xF7);
    }

    JSMM.CommonMIDIMessage.prototype.statusBytes = function (command, channel) {
        channel = channel || 0x00;
        return command + channel;
    };

    JSMM.CommonMIDIMessage.prototype.NoteOff = function (args) {
        var command = this.statusBytes(0x80, args.channel);
        return this.ChannelMessage(command, args.note, args.velocity);
    };

    JSMM.CommonMIDIMessage.prototype.NoteOn = function (args) {
        var command = this.statusBytes(0x90, args.channel);
        return this.ChannelMessage(command, args.note, args.velocity);
    };

    JSMM.CommonMIDIMessage.prototype.PolyphonicAftertouch = function (args) {
        var command = this.statusBytes(0xA0, args.channel);
        return this.ChannelMessage(command, args.note, args.pressure);
    };

    JSMM.CommonMIDIMessage.prototype.ControlChange = function (args) {
        var command = this.statusBytes(0xB0, args.channel);
        return this.ChannelMessage(command, args.controller, args.value);
    };

    JSMM.CommonMIDIMessage.prototype.ProgramChange = function (args) {
        var command = this.statusBytes(0xC0, args.channel);
        return this.ChannelMessage(command, args.program);
    };

    JSMM.CommonMIDIMessage.prototype.PitchBand = function (args) {
        var command = this.statusBytes(0xB0, args.channel);
        return this.ChannelMessage(command, args.lsb, args.msb);
    };

    JSMM.Generator = function (midiMessage) {
        this.mm = midiMessage || new JSMM.CommonMIDIMessage();
    };

    JSMM.Generator.prototype.SysEx = function (name, args) {
        return this.mm[name](args)
    };

    JSMM.Generator.prototype.ChannelMessage = function (name, args) {
        return this.mm[name](args);
    };

}).call(this);



(function () {
    "use strict";

    var CUSTOM = this.CUSTOM = {};

    CUSTOM.WaldorfM2MidiMessage = function() {
        JSMM.CommonMIDIMessage.call(this)
        this.IDW = 0xE0;
        this.IDE = 0x0E;
    }

    CUSTOM.WaldorfM2MidiMessage.IDM = {
        SNDR: 0x00,
    };

    CUSTOM.WaldorfM2MidiMessage.LOCATION = {
        BANK_A: 0x00,
        BANK_B: 0x01,
        ALL: 0x10,
        SOUND_EDIT: 0x20,
        MULTI_EDIT: 0x30

    };

    CUSTOM.WaldorfM2MidiMessage.prototype = Object.create(JSMM.CommonMIDIMessage.prototype);

    CUSTOM.WaldorfM2MidiMessage.prototype.constructor = CUSTOM.WaldorfM2MidiMessage;

    CUSTOM.WaldorfM2MidiMessage.prototype.SNDR = function (args) {
        var bb = CUSTOM.WaldorfM2MidiMessage.LOCATION[args.locationData];
        var nn = args.number || 0x00;
        var checksum = (bb + nn)&0x7F;
        var idm = CUSTOM.WaldorfM2MidiMessage.IDM['SNDR'];
        return [0xF0, this.IDW, this.IDE, args.device, idm, bb, nn, checksum, 0xF7];
    };

}).call(this);
