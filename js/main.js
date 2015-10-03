var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log('MIDI Data:', 'CHANNEL:',data[0], 'NOTE:', data[1], 'VELOCITY:', data[2]); // MIDI data [144, 63, 73]
    
    //ADDING MESSAGES TO PAGE
    // $('#display').append(['CHANNEL:',data[0], 'NOTE:', data[1], 'VELOCITY:', data[2], ' | '].join(' '));
    // $('#display ol').append('<li>' + ['CHANNEL:',data[0], 'NOTE:', data[1], 'VELOCITY:', data[2]].join(' ') + '</li>')
    $('#display ol').prepend('<li>' + ['CHANNEL:',data[0], 'NOTE:', data[1], 'VELOCITY:', data[2], 'DATE:', Date()].join(' ') + '</li>')
    
    boxDo(data);
    boxMove(data);


}

var boxMove = function (data) {

    if ( data[1] === 20 ) {
        

        $('#20').css("left", (data[2]/127 * 100) + '%');    
    }

    if ( data[1] === 21 ) {
        $('#21').css("left", (data[2]/127 * 100) + '%');    
    }
    

}


var boxDo = function(data) {
    

    if ( data[0] === 153 ) {
        $('.box').animate({
            width: data[2] * 10 + 'px',
            opacity: 0.4,
            borderWidth: "10px"
          }, 100 );

    }

    if ( data[0] === 137 ) {
        $('.box').animate({
            width: '50px',
            opacity: 1,
            borderWidth: "10px"
          }, 100 );
    }
    

}