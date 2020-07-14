'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

const completedNotes = [];
const activeNotes = [];
const otherNotes = [];

class NotesStore {

    addNote(state, name) {
        if (name === undefined || name === null || name === '') {
            throw new Error('Name cannot be empty');
        }
        if (!this.isValid(state)) {
            throw new Error('Invalid state ' + state);
        }
        this.getNotesList(state).push(name);
    }

    getNotes(state) {
        if (!this.isValid(state)) {
            throw new Error('Invalid state ' + state);
        }
        return this.getNotesList(state);
    }

    getNotesList(state) {
        if (state === 'completed') {
            return completedNotes;
        } else if (state === 'active') {
            return activeNotes;
        }
        return otherNotes;
    }

    isValid(state) {
        return state === 'completed'
            || state === 'active'
            || state === 'others';
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const obj = new NotesStore();
    const operationCount = parseInt(readLine().trim());

    for(let i = 1; i <= operationCount; i++) {
        const operationInfo = readLine().trim().split(' ');
        try {
            if (operationInfo[0] === 'addNote') {
                obj.addNote(operationInfo[1], operationInfo[2] || '');
            } else if (operationInfo[0] === 'getNotes') {
                const res = obj.getNotes(operationInfo[1]);
                if (res.length === 0) {
                    ws.write('No Notes\n');
                } else {
                    ws.write(`${res.join(',')}\n`);
                }
            }
        } catch (e) {
            ws.write(`${e}\n`);
        }
    }
    ws.end();
}
