const ensureDefined = (state) => {
    if (!state.memory[state.pointer] && state.memory[state.pointer] !== 0) {
        state.memory[state.pointer] = 0;
    }
};

const defineAllInMemory = (state) => {
    for (let i = 0; i < state.memory.length; i++) {
        ensureDefined(state.memory, i);
    }
};

const increment = (state) => {
    ensureDefined(state);

    state.memory[state.pointer]++;
};

const decrement = (state) => {
    ensureDefined(state);

    state.memory[state.pointer]--;
};

const shiftRight = (state) => {
    state.pointer++;
};

const shiftLeft = (state) => {
    state.pointer--;
};

const startLoop = (state) => {
    if (state.memory[state.pointer] !== 0) {
        state.loopStack.push(state.currentStep);
    } else {
        jumpToEndOfLoop(state);
    }
};

const jumpToEndOfLoop = (state) => {
    let endLoopsToSkip = 0;
    for (let i = state.currentStep + 1; i < state.program.length; i++) {
        const currentChar = state.program.charAt(i);
        if (currentChar === state.commandDictionary.endLoop) {
            if (endLoopsToSkip == 0) {
                state.currentStep = i;
                return;
            } else {
                endLoopsToSkip--;
            }
        } else if (currentChar === state.commandDictionary.startLoop) {
            endLoopsToSkip++
        }
    }
}

const endLoop = (state) => {
    state.currentStep = state.loopStack.pop();
    state.currentStep--;
}

const saveCell = (state) => {
    ensureDefined(state);
    state.output.push(state.memory[state.pointer]);
}

const printOutput = (output) => {
    console.log(String.fromCharCode.apply(this, output));
}

const readByte = (state) => {
    // do nothing for now
}


const interpret = (program, commandDictionary, inputs = []) => {
    const commandMap = {};
    commandMap[commandDictionary.increment] = increment;
    commandMap[commandDictionary.decrement] = decrement;
    commandMap[commandDictionary.shiftRight] = shiftRight;
    commandMap[commandDictionary.shiftLeft] = shiftLeft;
    commandMap[commandDictionary.startLoop] = startLoop;
    commandMap[commandDictionary.endLoop] = endLoop;
    commandMap[commandDictionary.printCell] = saveCell;
    commandMap[commandDictionary.readByte] = readByte;


    const state = {
        memory: [0],
        pointer: 0,
        loopStack: [],
        currentStep: 0,
        program,
        commandDictionary,
        commandMap,
        inputs,
        output: []
    }

    while (state.currentStep < program.length) {
        const command = program.charAt(state.currentStep);

        const action = state.commandMap[command];
        if (action) {
            action(state);
        }

        state.currentStep++;
    }

    if (state.output) {
        printOutput(state.output);
    }
}


module.exports = { interpret };
